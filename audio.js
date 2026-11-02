// ============================================================================
// MODUŁ 2: SYSTEM AUDIO (MUSIC MANAGER & WEB AUDIO SYNTHESIZER SFX)
// ============================================================================
const MUSIC_TRACK_PATHS = {
    menu:           'menu_music.mp3',
    level_select:   'level_select.mp3',
    settings:       'settings_music.mp3',
    pause:          'pause_music.mp3',
    cutscene_intro: 'cutscene_intro.mp3',
    cutscene_outro: 'cutscene_outro.mp3',
    hills:          'hills_forest.mp3',
    forest:         'forest_music.mp3',
    night:          'night_music.mp3',
    castle:         'castle_music.mp3',
    underwater:     'underwater_music.mp3',
    jungle:         'jungle_music.mp3',
    boss:           'boss_battle.mp3'
};

const MUSIC_FALLBACK_PATHS = {
    level_select:   'menu_music.mp3',
    settings:       'menu_music.mp3',
    pause:          'menu_music.mp3',
    cutscene_intro: 'hills_forest.mp3',
    cutscene_outro: 'night_castle.mp3',
    forest:         'hills_forest.mp3',
    night:          'night_castle.mp3',
    castle:         'night_castle.mp3',
    underwater:     'hills_forest.mp3',
    jungle:         'hills_forest.mp3'
};

const SYNCED_MENU_STEMS = new Set(['menu', 'level_select', 'settings', 'pause']);

class MusicManager {
    constructor(trackPaths) {
        this.tracks = {};
        this.virtualVol = {};
        this.currentKey = 'menu';
        this.targetVolume = 0.6;
        this.muted = false;
        this.isPaused = false;
        this.unlocked = false;
        this.volumeReadOnly = false;

        for (const [key, src] of Object.entries(trackPaths)) {
            const audio = new Audio();
            audio.src = src;
            audio.loop = true;
            audio.preload = 'auto';
            audio.playsInline = true;
            audio.setAttribute('playsinline', '');
            audio.setAttribute('webkit-playsinline', '');

            if (MUSIC_FALLBACK_PATHS[key]) {
                audio.addEventListener('error', () => {
                    if (!audio.dataset.fallbackApplied) {
                        audio.dataset.fallbackApplied = 'true';
                        audio.src = MUSIC_FALLBACK_PATHS[key];
                    }
                });
            }

            try {
                audio.volume = 0;
                if (audio.volume === 1) {
                    this.volumeReadOnly = true;
                }
            } catch (e) {
                this.volumeReadOnly = true;
            }
            this.tracks[key] = audio;
            this.virtualVol[key] = 0;
        }

        setInterval(() => this.updateFade(), 50);
    }

    ensureSyncedStemsPlaying(referenceKey) {
        if (this.volumeReadOnly) return;
        const refTrack = this.tracks[referenceKey] || this.tracks.menu;
        const refTime = (refTrack && !isNaN(refTrack.currentTime)) ? refTrack.currentTime : 0;

        for (const stemKey of SYNCED_MENU_STEMS) {
            const stemAudio = this.tracks[stemKey];
            if (!stemAudio) continue;
            if (stemAudio.paused) {
                try {
                    if (refTime > 0 && Math.abs(stemAudio.currentTime - refTime) > 0.15) {
                        stemAudio.currentTime = refTime;
                    }
                } catch (e) {}
                stemAudio.play().catch(() => {});
            } else if (stemAudio !== refTrack && refTrack && !refTrack.paused) {
                const drift = Math.abs(stemAudio.currentTime - refTime);
                if (drift > 0.22) {
                    try { stemAudio.currentTime = refTime; } catch (e) {}
                }
            }
        }
    }

    unlock() {
        if (!this.currentKey) this.currentKey = 'menu';
        const active = this.tracks[this.currentKey];
        if (!active) return;

        if (this.muted || this.isPaused) {
            this.unlocked = true;
            return;
        }

        if (SYNCED_MENU_STEMS.has(this.currentKey) && !this.volumeReadOnly) {
            for (const stemKey of SYNCED_MENU_STEMS) {
                const stemAudio = this.tracks[stemKey];
                if (!stemAudio) continue;
                const isTarget = (stemKey === this.currentKey);
                const startVol = isTarget ? this.targetVolume : 0;
                this.virtualVol[stemKey] = startVol;
                try { stemAudio.volume = startVol; } catch (e) {}
                stemAudio.muted = false;
            }
            const playPromise = active.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    this.unlocked = true;
                    this.ensureSyncedStemsPlaying(this.currentKey);
                }).catch(() => {
                    this.unlocked = false;
                });
            }
            return;
        }

        for (const [k, a] of Object.entries(this.tracks)) {
            if (k !== this.currentKey && !SYNCED_MENU_STEMS.has(k)) {
                this.virtualVol[k] = 0;
                if (!a.paused) a.pause();
            }
        }

        active.muted = false;
        this.virtualVol[this.currentKey] = this.targetVolume;
        if (!this.volumeReadOnly) {
            try { active.volume = this.targetVolume; } catch (e) {}
        }

        if (active.paused) {
            const playPromise = active.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    this.unlocked = true;
                }).catch(() => {
                    this.unlocked = false;
                });
            } else {
                this.unlocked = true;
            }
        } else {
            this.unlocked = true;
        }
    }

    playTrack(key) {
        if (this.currentKey === key && this.unlocked) {
            const currentAudio = this.tracks[key];
            if (currentAudio && currentAudio.paused && !this.isPaused && !this.muted) {
                currentAudio.play().catch(() => {});
            }
            return;
        }

        const prevKey = this.currentKey;
        this.currentKey = key;
        const nextTrack = this.tracks[key];

        if (this.volumeReadOnly) {
            for (const [k, a] of Object.entries(this.tracks)) {
                if (k !== key) {
                    this.virtualVol[k] = 0;
                    a.muted = true;
                    if (!a.paused) a.pause();
                }
            }
        } else {
            for (const [k, a] of Object.entries(this.tracks)) {
                if (k !== key && !SYNCED_MENU_STEMS.has(k)) {
                    this.virtualVol[k] = 0;
                    try { a.volume = 0; } catch (e) {}
                    if (!a.paused) a.pause();
                    try { a.currentTime = 0; } catch (e) {}
                }
            }
        }

        if (nextTrack && !this.isPaused && !this.muted) {
            nextTrack.muted = false;
            if (SYNCED_MENU_STEMS.has(key) && !this.volumeReadOnly) {
                this.ensureSyncedStemsPlaying(prevKey && SYNCED_MENU_STEMS.has(prevKey) ? prevKey : key);
            } else {
                if (this.volumeReadOnly) {
                    this.virtualVol[key] = this.targetVolume;
                } else {
                    try { nextTrack.volume = this.virtualVol[key] || 0; } catch (e) {}
                }
                if (nextTrack.paused) {
                    nextTrack.play().then(() => {
                        this.unlocked = true;
                    }).catch(() => {});
                }
            }
        }
    }

    setPaused(paused) {
        this.isPaused = paused;
        if (!this.currentKey) return;
        const active = this.tracks[this.currentKey];
        if (!active) return;

        if (paused) {
            if (this.volumeReadOnly) {
                active.pause();
            }
        } else if (!this.muted) {
            active.muted = false;
            if (active.paused) {
                active.play().then(() => { this.unlocked = true; }).catch(() => {});
            }
        }
    }

    setVolume(vol0to1) {
        this.targetVolume = Math.max(0, Math.min(1, vol0to1));
        if (this.targetVolume <= 0.005) {
            for (const [k, a] of Object.entries(this.tracks)) {
                this.virtualVol[k] = 0;
                if (!this.volumeReadOnly) {
                    try { a.volume = 0; } catch (e) {}
                }
                if (!SYNCED_MENU_STEMS.has(k) && !a.paused) {
                    a.pause();
                }
            }
        }
    }

    setMuted(muted) {
        this.muted = muted;
        if (muted) {
            for (const [k, a] of Object.entries(this.tracks)) {
                this.virtualVol[k] = 0;
                if (!this.volumeReadOnly) {
                    try { a.volume = 0; } catch (e) {}
                }
                if (this.volumeReadOnly || !SYNCED_MENU_STEMS.has(k)) {
                    a.muted = true;
                    if (!a.paused) a.pause();
                }
            }
        } else if (this.currentKey && !this.isPaused) {
            const active = this.tracks[this.currentKey];
            if (active) {
                active.muted = false;
                this.virtualVol[this.currentKey] = this.targetVolume;
                if (!this.volumeReadOnly) {
                    try { active.volume = this.targetVolume; } catch (e) {}
                }
                if (active.paused) {
                    active.play().then(() => { this.unlocked = true; }).catch(() => {});
                }
            }
        }
    }

    updateFade() {
        if (!this.unlocked) return;
        const fadeStep = Math.max(0.015, this.targetVolume * 0.14);

        if (!this.muted && !this.isPaused && SYNCED_MENU_STEMS.has(this.currentKey) && !this.volumeReadOnly) {
            this.ensureSyncedStemsPlaying(this.currentKey);
        }

        for (const [key, audio] of Object.entries(this.tracks)) {
            const isTarget = (key === this.currentKey) && !this.isPaused && !this.muted && (this.targetVolume > 0.005);
            const desiredVol = isTarget ? this.targetVolume : 0;
            const isMenuStem = SYNCED_MENU_STEMS.has(key);

            if (this.volumeReadOnly) {
                if (isTarget) {
                    audio.muted = false;
                    this.virtualVol[key] = desiredVol;
                    if (audio.paused) audio.play().catch(() => {});
                } else {
                    this.virtualVol[key] = 0;
                    audio.muted = true;
                    if (!audio.paused) audio.pause();
                }
                continue;
            }

            let curVol = this.virtualVol[key] || 0;
            if (Math.abs(curVol - desiredVol) > 0.01) {
                if (curVol < desiredVol) {
                    audio.muted = false;
                    if (audio.paused) audio.play().catch(() => {});
                    curVol = Math.min(desiredVol, curVol + fadeStep);
                } else {
                    curVol = Math.max(0, curVol - fadeStep);
                }
            } else {
                curVol = desiredVol;
            }

            this.virtualVol[key] = curVol;
            try { audio.volume = curVol; } catch (e) {}

            if (curVol <= 0.001) {
                if (isMenuStem) {
                    try { audio.volume = 0; } catch (e) {}
                } else if (!audio.paused) {
                    audio.pause();
                    try { audio.currentTime = 0; } catch (e) {}
                }
            }
        }
    }
}

const music = new MusicManager(MUSIC_TRACK_PATHS);

class SoundSystem {
    constructor() {
        this.ctx = null;
        this.volume = 0.8;
        this.muted = false;
    }
    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) this.ctx = new AudioCtx();
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }
    play(type, customFreq = 440) {
        if (this.muted || this.volume <= 0.01) return;
        this.init();
        if (!this.ctx) return;

        const v = this.volume;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        if (type === 'jump') {
            osc.type = 'square';
            osc.frequency.setValueAtTime(190, now);
            osc.frequency.exponentialRampToValueAtTime(520, now + 0.11);
            gain.gain.setValueAtTime(0.12 * v, now);
            gain.gain.linearRampToValueAtTime(0.005, now + 0.11);
            osc.start(now);
            osc.stop(now + 0.11);
        } else if (type === 'walljump') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(280, now);
            osc.frequency.exponentialRampToValueAtTime(680, now + 0.12);
            gain.gain.setValueAtTime(0.16 * v, now);
            gain.gain.linearRampToValueAtTime(0.005, now + 0.12);
            osc.start(now);
            osc.stop(now + 0.12);
        } else if (type === 'dash') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(620, now);
            osc.frequency.exponentialRampToValueAtTime(140, now + 0.14);
            gain.gain.setValueAtTime(0.14 * v, now);
            gain.gain.linearRampToValueAtTime(0.005, now + 0.14);
            osc.start(now);
            osc.stop(now + 0.14);
        } else if (type === 'troll') {
            osc.type = 'square';
            osc.frequency.setValueAtTime(580, now);
            osc.frequency.setValueAtTime(740, now + 0.05);
            gain.gain.setValueAtTime(0.15 * v, now);
            gain.gain.linearRampToValueAtTime(0.005, now + 0.13);
            osc.start(now);
            osc.stop(now + 0.13);
        } else if (type === 'death') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(240, now);
            osc.frequency.linearRampToValueAtTime(60, now + 0.35);
            gain.gain.setValueAtTime(0.18 * v, now);
            gain.gain.linearRampToValueAtTime(0.005, now + 0.35);
            osc.start(now);
            osc.stop(now + 0.35);
        } else if (type === 'win') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(330, now);
            osc.frequency.setValueAtTime(440, now + 0.08);
            osc.frequency.setValueAtTime(554, now + 0.16);
            osc.frequency.setValueAtTime(660, now + 0.24);
            gain.gain.setValueAtTime(0.18 * v, now);
            gain.gain.linearRampToValueAtTime(0.005, now + 0.42);
            osc.start(now);
            osc.stop(now + 0.42);
        } else if (type === 'stomp') {
            osc.type = 'square';
            osc.frequency.setValueAtTime(160, now);
            osc.frequency.exponentialRampToValueAtTime(640, now + 0.18);
            gain.gain.setValueAtTime(0.22 * v, now);
            gain.gain.linearRampToValueAtTime(0.005, now + 0.18);
            osc.start(now);
            osc.stop(now + 0.18);
        } else if (type === 'laser') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(860, now);
            osc.frequency.exponentialRampToValueAtTime(150, now + 0.24);
            gain.gain.setValueAtTime(0.15 * v, now);
            gain.gain.linearRampToValueAtTime(0.005, now + 0.24);
            osc.start(now);
            osc.stop(now + 0.24);
        } else if (type === 'warn') {
            osc.type = 'square';
            osc.frequency.setValueAtTime(720, now);
            osc.frequency.setValueAtTime(920, now + 0.04);
            gain.gain.setValueAtTime(0.09 * v, now);
            gain.gain.linearRampToValueAtTime(0.005, now + 0.09);
            osc.start(now);
            osc.stop(now + 0.09);
        } else if (type === 'boss_charge_warn') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(110, now);
            osc.frequency.exponentialRampToValueAtTime(420, now + 0.34);
            gain.gain.setValueAtTime(0.16 * v, now);
            gain.gain.linearRampToValueAtTime(0.01, now + 0.34);
            osc.start(now);
            osc.stop(now + 0.34);
        } else if (type === 'boss_charge') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(340, now);
            osc.frequency.exponentialRampToValueAtTime(85, now + 0.28);
            gain.gain.setValueAtTime(0.22 * v, now);
            gain.gain.linearRampToValueAtTime(0.008, now + 0.28);
            osc.start(now);
            osc.stop(now + 0.28);
        } else if (type === 'boss_wall_crash') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(140, now);
            osc.frequency.exponentialRampToValueAtTime(32, now + 0.38);
            gain.gain.setValueAtTime(0.28 * v, now);
            gain.gain.linearRampToValueAtTime(0.005, now + 0.38);
            osc.start(now);
            osc.stop(now + 0.38);
        } else if (type === 'boss_glitch') {
            osc.type = 'square';
            const f1 = 220 + Math.random() * 680;
            const f2 = 140 + Math.random() * 520;
            const f3 = 380 + Math.random() * 720;
            osc.frequency.setValueAtTime(f1, now);
            osc.frequency.setValueAtTime(f2, now + 0.035);
            osc.frequency.setValueAtTime(f3, now + 0.07);
            gain.gain.setValueAtTime(0.11 * v, now);
            gain.gain.linearRampToValueAtTime(0.004, now + 0.11);
            osc.start(now);
            osc.stop(now + 0.11);
        } else if (type === 'boss_hit') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(520, now);
            osc.frequency.setValueAtTime(260, now + 0.05);
            osc.frequency.setValueAtTime(680, now + 0.10);
            osc.frequency.exponentialRampToValueAtTime(140, now + 0.26);
            gain.gain.setValueAtTime(0.24 * v, now);
            gain.gain.linearRampToValueAtTime(0.005, now + 0.26);
            osc.start(now);
            osc.stop(now + 0.26);
        } else if (type === 'boss_destroy') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(380, now);
            osc.frequency.setValueAtTime(290, now + 0.12);
            osc.frequency.setValueAtTime(460, now + 0.24);
            osc.frequency.exponentialRampToValueAtTime(38, now + 0.95);
            gain.gain.setValueAtTime(0.28 * v, now);
            gain.gain.linearRampToValueAtTime(0.005, now + 0.95);
            osc.start(now);
            osc.stop(now + 0.95);
        } else if (type === 'talk') {
            osc.type = 'square';
            osc.frequency.setValueAtTime(customFreq + (Math.random() * 30 - 15), now);
            gain.gain.setValueAtTime(0.055 * v, now);
            gain.gain.linearRampToValueAtTime(0.002, now + 0.038);
            osc.start(now);
            osc.stop(now + 0.038);
        } else if (type === 'ui' || type === 'ui_move' || type === 'ui_hover') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(540, now);
            osc.frequency.exponentialRampToValueAtTime(780, now + 0.045);
            gain.gain.setValueAtTime(0.075 * v, now);
            gain.gain.linearRampToValueAtTime(0.002, now + 0.045);
            osc.start(now);
            osc.stop(now + 0.045);
        } else if (type === 'ui_select') {
            osc.type = 'square';
            osc.frequency.setValueAtTime(523.25, now);
            osc.frequency.setValueAtTime(659.25, now + 0.055);
            osc.frequency.exponentialRampToValueAtTime(1046.5, now + 0.13);
            gain.gain.setValueAtTime(0.11 * v, now);
            gain.gain.linearRampToValueAtTime(0.003, now + 0.13);
            osc.start(now);
            osc.stop(now + 0.13);
        } else if (type === 'ui_back') {
            osc.type = 'square';
            osc.frequency.setValueAtTime(587.33, now);
            osc.frequency.setValueAtTime(392.0, now + 0.06);
            gain.gain.setValueAtTime(0.1 * v, now);
            gain.gain.linearRampToValueAtTime(0.003, now + 0.13);
            osc.start(now);
            osc.stop(now + 0.13);
        } else if (type === 'ui_pause') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(440, now);
            osc.frequency.setValueAtTime(554.37, now + 0.045);
            osc.frequency.setValueAtTime(659.25, now + 0.09);
            gain.gain.setValueAtTime(0.13 * v, now);
            gain.gain.linearRampToValueAtTime(0.003, now + 0.16);
            osc.start(now);
            osc.stop(now + 0.16);
        } else if (type === 'sega_chime') {
            // Klasyczny dwudźwiękowy akord chóralny w stylu SEGA ("ZSA-GAMES!")
            osc.disconnect();
            const chord1 = [311.13, 392.00, 466.16, 622.25]; // D#4, G4, A#4, D#5 ("ZSA-")
            const chord2 = [349.23, 440.00, 523.25, 698.46]; // F4, A4, C5, F5 ("-GAMES!")
            const playChord = (freqs, startTime, duration) => {
                freqs.forEach((f, idx) => {
                    const o = this.ctx.createOscillator();
                    const g = this.ctx.createGain();
                    o.type = idx % 2 === 0 ? 'sawtooth' : 'triangle';
                    o.frequency.setValueAtTime(f, startTime);
                    g.gain.setValueAtTime(0.001, startTime);
                    g.gain.linearRampToValueAtTime(0.065 * v, startTime + 0.04);
                    g.gain.exponentialRampToValueAtTime(0.002, startTime + duration);
                    o.connect(g);
                    g.connect(this.ctx.destination);
                    o.start(startTime);
                    o.stop(startTime + duration);
                });
            };
            playChord(chord1, now, 0.42);
            playChord(chord2, now + 0.38, 1.05);
        } else if (type === 'mania_transition') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(220, now);
            osc.frequency.exponentialRampToValueAtTime(880, now + 0.22);
            gain.gain.setValueAtTime(0.12 * v, now);
            gain.gain.linearRampToValueAtTime(0.003, now + 0.24);
            osc.start(now);
            osc.stop(now + 0.24);
        }
    }
}

const sfx = new SoundSystem();

