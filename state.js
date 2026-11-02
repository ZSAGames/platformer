// ============================================================================
// MODUŁ 5: STAN GRY, ZAPIS POSTĘPU (LOCALSTORAGE) I USTAWIENIA
// ============================================================================
const inGameHud = document.getElementById('in-game-hud');
const hudLevelBadge = document.getElementById('hud-level-badge');
const hudLevelName = document.getElementById('hud-level-name');
const hudWeaponPill = document.getElementById('hud-weapon-pill');
const hudTimerPill = document.getElementById('hud-timer-pill');
const hudOhkoPill = document.getElementById('hud-ohko-pill');
const hudTimerEl = document.getElementById('hud-timer');
const dashBar = document.getElementById('dash-bar');
const deathCountEl = document.getElementById('death-count');
const bossHud = document.getElementById('boss-hud');
const bossNameLabel = document.getElementById('boss-name-label');
const bossHpText = document.getElementById('boss-hp-text');
const bossHpBar = document.getElementById('boss-hp-bar');
const chapterBanner = document.getElementById('chapter-banner');
const chapterTitleEl = document.getElementById('chapter-title');

const mainMenuOverlay = document.getElementById('main-menu-overlay');
const pauseMenuOverlay = document.getElementById('pause-menu-overlay');
const settingsModal = document.getElementById('settings-modal');
const levelsModal = document.getElementById('levels-modal');
const cutsceneOverlay = document.getElementById('cutscene-overlay');
const cutsceneSpeakerEl = document.getElementById('cutscene-speaker');
const cutsceneStepEl = document.getElementById('cutscene-step-counter');
const cutsceneTextEl = document.getElementById('cutscene-text');
const deathOverlay = document.getElementById('death-overlay');
const trollMessageEl = document.getElementById('troll-message');
const victoryOverlay = document.getElementById('victory-overlay');
const finalDeathsEl = document.getElementById('final-deaths');
const finalTimeEl = document.getElementById('final-time');
const bestTimeEl = document.getElementById('best-time');
const finalRankEl = document.getElementById('final-rank');
const touchControls = document.getElementById('touch-controls');
const gamepadStatusBadge = document.getElementById('gamepad-status-badge');

const TROLL_MESSAGES = [
    "Serio? Na tym padłeś? Przecież to było oczywiste!",
    "Klasyczny niewidzialny blok! Cat Mario przesyła pozdrowienia.",
    "Ta podłoga wyglądała zbyt stabilnie, żeby być prawdziwą...",
    "Użyj DASH (Shift, K, ◯ lub R2), fioletowy kwadracie!",
    "Pamiętaj: możesz odbijać się od ścian (Wall-Jump)!",
    "Roboty mają mechaniczne oczy, widzą Twój każdy błąd.",
    "Ta flaga była przynętą. Nigdy nie ufaj pierwszemu portalowi!",
    "Kolce z sufitu? Klasyka gatunku. Patrz w górę!",
    "Kto postawił ten blok akurat na trajektorii skoku?! (Ja).",
    "Spokojnie, kontroler jeszcze żyje. Spróbuj skoczyć wcześniej!",
    "Gdyby to było łatwe, nie nazywałoby się Rage Game!"
];

let gameState = 'MENU'; // 'MENU', 'CUTSCENE', 'PLAYING', 'PAUSED', 'VICTORY'
let currentLevelIdx = 0;
let savedPlayerLevelIdx = 0;
let unlockedLevelIdx = 0;
let deathCount = 0;
let audioMuted = false;
let musicVolPercent = 60;
let sfxVolPercent = 80;
let touchMode = 'AUTO';
let orientationLockMode = 'AUTO';
let orientationReminderDismissed = false;

// Ustawienia dostępności
let screenShakeEnabled = true;
let gameSpeedPercent = 100;
let trapRadarEnabled = false;
let highContrastEnabled = false;
let jumpAssistEnabled = false;

// Liczniki czasu i rekordów
let isSpeedrunMode = false;
let isOhkoMode = false;
let speedrunTicks = 0;
let sessionPlayTicks = 0; // Zawsze liczy czas sesji, aby można było wysłać czas w każdym trybie
let bestTimeTicks = null;
let bestOhkoLevel = 0;

let _dbgM = false;
let _dbgG = false;
let _dbgSeq = [];
const _dbgTarget = [99, 117, 98, 101, 108, 111, 110]; // "cubelon"

const STORAGE_KEYS = {
    SETTINGS: 'przygoda_davea_settings_v1',
    BEST_SPEEDRUN: 'przygoda_davea_best_speedrun',
    BEST_OHKO: 'przygoda_davea_best_ohko',
    SAVED_LEVEL: 'przygoda_davea_saved_level',
    UNLOCKED_LEVEL: 'przygoda_davea_unlocked_level'
};

function saveUserSettings() {
    try {
        const payload = {
            audioMuted,
            musicVol: musicVolPercent,
            sfxVol: sfxVolPercent,
            touchMode,
            orientationLockMode,
            screenShakeEnabled,
            gameSpeedPercent,
            trapRadarEnabled,
            highContrastEnabled,
            jumpAssistEnabled
        };
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(payload));
    } catch (e) {}
}

function saveUnlockedLevelProgress(levelIdx) {
    if (typeof levelIdx === 'number' && !isNaN(levelIdx)) {
        const clamped = Math.max(0, Math.min(LEVELS.length - 1, levelIdx));
        if (clamped > unlockedLevelIdx) {
            unlockedLevelIdx = clamped;
        }
        if (!isOhkoMode) {
            savedPlayerLevelIdx = clamped;
        }
    }
    try {
        localStorage.setItem(STORAGE_KEYS.UNLOCKED_LEVEL, String(unlockedLevelIdx));
        if (!isOhkoMode) {
            localStorage.setItem(STORAGE_KEYS.SAVED_LEVEL, String(savedPlayerLevelIdx));
        }
    } catch (e) {}
    const continueBadge = document.getElementById('menu-continue-badge');
    if (continueBadge) {
        continueBadge.textContent = `POZ. ${savedPlayerLevelIdx + 1}`;
    }
}

function loadUserSettings() {
    try {
        const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
        if (raw) {
            const data = JSON.parse(raw);
            if (typeof data.audioMuted === 'boolean') audioMuted = data.audioMuted;
            if (typeof data.musicVol === 'number' && !isNaN(data.musicVol)) {
                musicVolPercent = Math.max(0, Math.min(100, Math.round(data.musicVol)));
            }
            if (typeof data.sfxVol === 'number' && !isNaN(data.sfxVol)) {
                sfxVolPercent = Math.max(0, Math.min(100, Math.round(data.sfxVol)));
            }
            if (['AUTO', 'ON', 'OFF'].includes(data.touchMode)) touchMode = data.touchMode;
            if (['AUTO', 'ON', 'OFF'].includes(data.orientationLockMode)) orientationLockMode = data.orientationLockMode;
            if (typeof data.screenShakeEnabled === 'boolean') screenShakeEnabled = data.screenShakeEnabled;
            if ([100, 80, 65].includes(data.gameSpeedPercent)) gameSpeedPercent = data.gameSpeedPercent;
            if (typeof data.trapRadarEnabled === 'boolean') trapRadarEnabled = data.trapRadarEnabled;
            if (typeof data.highContrastEnabled === 'boolean') highContrastEnabled = data.highContrastEnabled;
            if (typeof data.jumpAssistEnabled === 'boolean') jumpAssistEnabled = data.jumpAssistEnabled;
        }

        const storedBest = localStorage.getItem(STORAGE_KEYS.BEST_SPEEDRUN) || localStorage.getItem('dave_reborn_best_time_ticks');
        if (storedBest) {
            const parsedBest = parseInt(storedBest, 10);
            if (!isNaN(parsedBest) && parsedBest > 0) bestTimeTicks = parsedBest;
        }

        const storedOhko = localStorage.getItem(STORAGE_KEYS.BEST_OHKO);
        if (storedOhko) {
            const parsedOhko = parseInt(storedOhko, 10);
            if (!isNaN(parsedOhko) && parsedOhko > 0) bestOhkoLevel = parsedOhko;
        }

        const storedLvl = localStorage.getItem(STORAGE_KEYS.SAVED_LEVEL);
        if (storedLvl !== null) {
            const parsedLvl = parseInt(storedLvl, 10);
            if (!isNaN(parsedLvl) && parsedLvl >= 0) {
                savedPlayerLevelIdx = Math.min(LEVELS.length - 1, parsedLvl);
            }
        }

        const storedUnlocked = localStorage.getItem(STORAGE_KEYS.UNLOCKED_LEVEL);
        if (storedUnlocked !== null) {
            const parsedUnlocked = parseInt(storedUnlocked, 10);
            if (!isNaN(parsedUnlocked) && parsedUnlocked >= 0) {
                unlockedLevelIdx = Math.min(LEVELS.length - 1, parsedUnlocked);
            }
        }

        if (savedPlayerLevelIdx > unlockedLevelIdx) {
            unlockedLevelIdx = savedPlayerLevelIdx;
        }
    } catch (e) {}
}

function formatSpeedrunTime(ticks) {
    const totalMs = Math.floor((ticks * 1000) / 60);
    const mins = Math.floor(totalMs / 60000);
    const secs = Math.floor((totalMs % 60000) / 1000);
    const cs = Math.floor((totalMs % 1000) / 10);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${String(cs).padStart(2, '0')}`;
}

function refreshBestTimeBadge() {
    const badge = document.getElementById('menu-best-time-badge');
    if (badge) {
        badge.textContent = bestTimeTicks ? `PB ${formatSpeedrunTime(bestTimeTicks)}` : 'OD POZ. 1';
    }
    const ohkoBadge = document.getElementById('menu-best-ohko-badge');
    if (ohkoBadge) {
        if (bestOhkoLevel >= LEVELS.length) {
            ohkoBadge.textContent = `★ ${LEVELS.length}/${LEVELS.length}!`;
        } else if (bestOhkoLevel > 0) {
            ohkoBadge.textContent = `REKORD ${bestOhkoLevel}/${LEVELS.length}`;
        } else {
            ohkoBadge.textContent = '1 ŻYCIE';
        }
    }
}

function applySettingsToDOMAndAudio() {
    music.setVolume(musicVolPercent / 100);
    music.setMuted(audioMuted);
    sfx.volume = sfxVolPercent / 100;
    sfx.muted = audioMuted;

    const btnMute = document.getElementById('btn-toggle-mute');
    if (btnMute) {
        btnMute.textContent = audioMuted ? 'WYCISZONY' : 'DŹWIĘK: WŁ';
        btnMute.className = audioMuted
            ? 'btn-retro-secondary px-2.5 py-1 rounded-lg font-bold text-rose-400 mono-font text-[11px] shrink-0'
            : 'btn-retro-secondary px-2.5 py-1 rounded-lg font-bold text-emerald-300 mono-font text-[11px] shrink-0';
    }

    const sliderMusic = document.getElementById('slider-music-vol');
    const labelMusic = document.getElementById('music-vol-label');
    if (sliderMusic) sliderMusic.value = String(musicVolPercent);
    if (labelMusic) labelMusic.textContent = `${musicVolPercent}%`;

    const sliderSfx = document.getElementById('slider-sfx-vol');
    const labelSfx = document.getElementById('sfx-vol-label');
    if (sliderSfx) sliderSfx.value = String(sfxVolPercent);
    if (labelSfx) labelSfx.textContent = `${sfxVolPercent}%`;

    const btnTouch = document.getElementById('btn-toggle-touch');
    if (btnTouch) btnTouch.textContent = touchMode;
    if (touchControls) {
        touchControls.classList.remove('touch-auto', 'touch-force-on', 'touch-force-off');
        if (touchMode === 'AUTO') touchControls.classList.add('touch-auto');
        else if (touchMode === 'ON') touchControls.classList.add('touch-force-on');
        else touchControls.classList.add('touch-force-off');
    }

    const btnShake = document.getElementById('btn-toggle-shake');
    if (btnShake) {
        btnShake.textContent = screenShakeEnabled ? 'WŁ' : 'WYŁ';
        btnShake.className = screenShakeEnabled
            ? 'btn-retro-secondary px-2.5 py-1 rounded-lg font-bold text-emerald-300 mono-font text-[11px] shrink-0'
            : 'btn-retro-secondary px-2.5 py-1 rounded-lg font-bold text-rose-400 mono-font text-[11px] shrink-0';
    }

    const btnSpeed = document.getElementById('btn-toggle-speed');
    if (btnSpeed) {
        btnSpeed.textContent = `${gameSpeedPercent}%`;
        btnSpeed.className = gameSpeedPercent === 100
            ? 'btn-retro-secondary px-2.5 py-1 rounded-lg font-bold text-cyan-300 mono-font text-[11px] shrink-0'
            : 'btn-retro-secondary px-2.5 py-1 rounded-lg font-bold text-yellow-300 mono-font text-[11px] shrink-0';
    }

    const btnRadar = document.getElementById('btn-toggle-radar');
    if (btnRadar) {
        btnRadar.textContent = trapRadarEnabled ? 'WŁ' : 'WYŁ';
        btnRadar.className = trapRadarEnabled
            ? 'btn-retro-secondary px-2.5 py-1 rounded-lg font-bold text-yellow-300 mono-font text-[11px] shrink-0'
            : 'btn-retro-secondary px-2.5 py-1 rounded-lg font-bold text-slate-300 mono-font text-[11px] shrink-0';
    }

    const btnContrast = document.getElementById('btn-toggle-contrast');
    if (btnContrast) {
        btnContrast.textContent = highContrastEnabled ? 'WŁ' : 'WYŁ';
        btnContrast.className = highContrastEnabled
            ? 'btn-retro-secondary px-2.5 py-1 rounded-lg font-bold text-yellow-300 mono-font text-[11px] shrink-0'
            : 'btn-retro-secondary px-2.5 py-1 rounded-lg font-bold text-slate-300 mono-font text-[11px] shrink-0';
    }

    const btnJumpAssist = document.getElementById('btn-toggle-jump-assist');
    if (btnJumpAssist) {
        btnJumpAssist.textContent = jumpAssistEnabled ? 'WŁ' : 'WYŁ';
        btnJumpAssist.className = jumpAssistEnabled
            ? 'btn-retro-secondary px-2.5 py-1 rounded-lg font-bold text-emerald-300 mono-font text-[11px] shrink-0'
            : 'btn-retro-secondary px-2.5 py-1 rounded-lg font-bold text-slate-300 mono-font text-[11px] shrink-0';
    }

    const continueBadge = document.getElementById('menu-continue-badge');
    if (continueBadge) {
        continueBadge.textContent = `POZ. ${savedPlayerLevelIdx + 1}`;
    }
}

const orientationReminder = document.getElementById('orientation-reminder');
async function attemptLandscapeLock(forceFullscreen = false) {
    try {
        if (forceFullscreen && document.documentElement.requestFullscreen && !document.fullscreenElement) {
            await document.documentElement.requestFullscreen().catch(() => {});
        }
        if (screen.orientation && typeof screen.orientation.lock === 'function') {
            await screen.orientation.lock('landscape').catch(() => {});
        }
    } catch (e) {}
    checkOrientationReminder();
}

function checkOrientationReminder() {
    if (!orientationReminder) return;
    if (orientationLockMode === 'OFF' || orientationReminderDismissed) {
        orientationReminder.classList.add('hidden');
        return;
    }
    const isMobileDevice = window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 900;
    const isPortrait = window.innerHeight > window.innerWidth * 1.05;
    if (isMobileDevice && isPortrait) {
        orientationReminder.classList.remove('hidden');
    } else {
        orientationReminder.classList.add('hidden');
    }
}
window.addEventListener('resize', checkOrientationReminder);
window.addEventListener('orientationchange', () => setTimeout(checkOrientationReminder, 150));

loadUserSettings();
applySettingsToDOMAndAudio();
refreshBestTimeBadge();
setTimeout(checkOrientationReminder, 100);

