// ============================================================================
// MODUŁ 6: INTEGRACJA LOOTLOCKER LEADERBOARD & ZARZĄDZANIE NICKNAME'EM
// ============================================================================
const LOOTLOCKER_CONFIG = {
    gameKey: 'dev_e6290efcdd1c47ba93e693410e95816d',
    gameVersion: '1.0.0.0',
    speedrunKey: '37700',
    ohkoKey: '37701',
    apiUrl: 'https://api.lootlocker.io/game',
    llVersion: '2021-03-01'
};

const LL_STORAGE_KEYS = {
    PLAYER_IDENTIFIER: 'przygoda_davea_ll_player_ulid',
    NICKNAME: 'przygoda_davea_player_nickname',
    LOCAL_LB_SPEEDRUN: 'przygoda_davea_local_lb_speedrun_v1',
    LOCAL_LB_OHKO: 'przygoda_davea_local_lb_ohko_v1'
};

let playerNickname = localStorage.getItem(LL_STORAGE_KEYS.NICKNAME) || '';
let activeLeaderboardTab = 'speedrun';
let selectedSubmitMode = 'speedrun';

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

class LootLockerService {
    constructor(config) {
        this.config = config;
        this.sessionToken = null;
        this.playerId = null;
        this.playerUlid = localStorage.getItem(LL_STORAGE_KEYS.PLAYER_IDENTIFIER) || null;
        this.lastErrorMsg = '';
        this.isInitializing = false;
    }

    isConfigured() {
        return Boolean(this.config.gameKey && !this.config.gameKey.includes('TUTAJ_WPISZ'));
    }

    // 1. Autoryzacja sesji gościa (Guest Login) z flagą development_mode dla kluczy dev_
    async ensureSession() {
        if (this.sessionToken) return true;
        if (!this.isConfigured()) {
            this.lastErrorMsg = 'Brak klucza gameKey w LOOTLOCKER_CONFIG.';
            return false;
        }
        if (this.isInitializing) {
            await new Promise(r => setTimeout(r, 450));
            return Boolean(this.sessionToken);
        }

        this.isInitializing = true;
        try {
            const attemptGuestSession = async (includeStoredId) => {
                const payload = {
                    game_key: this.config.gameKey.trim(),
                    game_version: this.config.gameVersion,
                    development_mode: this.config.gameKey.trim().startsWith('dev_')
                };
                if (includeStoredId && this.playerUlid) {
                    payload.player_identifier = this.playerUlid;
                }
                return fetch(`${this.config.apiUrl}/v2/session/guest`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
            };

            let res = await attemptGuestSession(true);
            if (!res.ok && this.playerUlid) {
                this.playerUlid = null;
                localStorage.removeItem(LL_STORAGE_KEYS.PLAYER_IDENTIFIER);
                res = await attemptGuestSession(false);
            }

            const data = await res.json().catch(() => ({}));
            if (res.ok && data && data.session_token) {
                this.sessionToken = data.session_token;
                this.playerId = data.player_id;
                this.lastErrorMsg = '';
                if (data.player_identifier) {
                    this.playerUlid = data.player_identifier;
                    localStorage.setItem(LL_STORAGE_KEYS.PLAYER_IDENTIFIER, data.player_identifier);
                }
                if (data.player_name && !playerNickname) {
                    playerNickname = data.player_name;
                    localStorage.setItem(LL_STORAGE_KEYS.NICKNAME, playerNickname);
                    syncNicknameUI();
                } else if (playerNickname && data.player_name !== playerNickname) {
                    await this.setPlayerName(playerNickname);
                }
                return true;
            } else {
                const rawMsg = (data && (data.message || data.error)) ? String(data.message || data.error) : `HTTP ${res.status}`;
                this.lastErrorMsg = `Błąd sesji LootLocker (${rawMsg})`;
            }
        } catch (err) {
            console.warn('LootLocker session error:', err);
            this.lastErrorMsg = 'Błąd połączenia z serwerem LootLocker.';
        } finally {
            this.isInitializing = false;
        }
        return false;
    }

    // 2. Zapisanie Nickname gracza w LootLocker
    async setPlayerName(newName) {
        const clean = String(newName || '').trim().slice(0, 16);
        if (!clean) return false;

        playerNickname = clean;
        localStorage.setItem(LL_STORAGE_KEYS.NICKNAME, clean);
        syncNicknameUI();

        const ok = await this.ensureSession();
        if (!ok) return false;

        try {
            const res = await fetch(`${this.config.apiUrl}/player/name`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'x-session-token': this.sessionToken,
                    'LL-Version': this.config.llVersion
                },
                body: JSON.stringify({ name: clean })
            });
            return res.ok;
        } catch (err) {
            return false;
        }
    }

    // 3. Pobranie Top 10 wyników bezpośrednio z tabeli LootLocker (37700 / 37701)
    async fetchLeaderboard(mode = 'speedrun') {
        const listEl = document.getElementById('leaderboard-list');
        if (!listEl) return;

        if (!this.isConfigured()) {
            listEl.innerHTML = `<div class="text-amber-300 p-2 text-[9px]">⚠️ Skonfiguruj LOOTLOCKER_CONFIG!</div>`;
            return;
        }

        listEl.innerHTML = `<div class="text-center text-slate-400 py-5">⏳ Pobieranie wyników z LootLocker...</div>`;

        const ok = await this.ensureSession();
        if (!ok) {
            listEl.innerHTML = `<div class="text-center text-rose-400 py-4 text-[10px]">❌ ${escapeHtml(this.lastErrorMsg || 'Błąd połączenia z LootLocker.')}</div>`;
            return;
        }

        const lbKey = (mode === 'ohko') ? this.config.ohkoKey.trim() : this.config.speedrunKey.trim();

        try {
            const res = await fetch(`${this.config.apiUrl}/leaderboards/${encodeURIComponent(lbKey)}/list?count=10`, {
                method: 'GET',
                headers: {
                    'x-session-token': this.sessionToken,
                    'LL-Version': this.config.llVersion
                }
            });

            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
                const errDetail = data.message || data.error || `HTTP ${res.status}`;
                listEl.innerHTML = `<div class="text-rose-300 p-2 text-[9px]">⚠️ Błąd tabeli "${escapeHtml(lbKey)}": ${escapeHtml(errDetail)}</div>`;
                return;
            }

            const items = (data && Array.isArray(data.items)) ? data.items : [];
            if (items.length === 0) {
                listEl.innerHTML = `<div class="text-center text-slate-400 py-5">Brak wyników w tabeli. Kliknij <b>+ WYŚLIJ</b> i bądź pierwszy! 🏆</div>`;
                return;
            }

            listEl.innerHTML = items.map((item) => {
                const rank = item.rank;
                const isMe = Boolean(
                    (this.playerId && item.player && item.player.id === this.playerId) ||
                    (playerNickname && item.member_id && String(item.member_id).toLowerCase() === playerNickname.toLowerCase())
                );

                let metaObj = {};
                if (item.metadata) {
                    try { metaObj = JSON.parse(item.metadata); } catch (e) {}
                }

                let name = (item.player && item.player.name) ? item.player.name : '';
                if (!name && metaObj.nickname) name = metaObj.nickname;
                if (!name && item.member_id && isNaN(Number(item.member_id))) name = item.member_id;
                if (!name) name = `Gracz #${item.member_id || rank}`;

                let formattedScore = '';
                if (mode === 'speedrun') {
                    const totalMs = Number(item.score) || 0;
                    const mins = Math.floor(totalMs / 60000);
                    const secs = Math.floor((totalMs % 60000) / 1000);
                    const cs = Math.floor((totalMs % 1000) / 10);
                    formattedScore = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${String(cs).padStart(2, '0')}`;
                } else {
                    const lvlReached = Number(item.score) || 1;
                    formattedScore = `POZ. ${lvlReached}/${LEVELS.length}`;
                }

                const medal = rank === 1 ? '🥇' : (rank === 2 ? '🥈' : (rank === 3 ? '🥉' : `#${rank}`));
                const rowClass = isMe
                    ? 'bg-purple-950/90 border border-yellow-400 text-yellow-200'
                    : 'bg-slate-900/85 border border-slate-800 text-slate-200';

                return `
                    <div class="flex items-center justify-between px-2 py-1 rounded-lg ${rowClass}">
                        <div class="flex items-center gap-1.5 min-w-0 pr-2">
                            <span class="font-extrabold text-yellow-300 w-6 shrink-0">${medal}</span>
                            <span class="truncate font-bold">${escapeHtml(name)}</span>
                        </div>
                        <span class="font-extrabold ${mode === 'speedrun' ? 'text-amber-300' : 'text-rose-300'} shrink-0">
                            ${formattedScore}
                        </span>
                    </div>
                `;
            }).join('');
        } catch (err) {
            console.warn('LootLocker fetchLeaderboard error:', err);
            listEl.innerHTML = `<div class="text-center text-rose-400 py-4">⚠️ Błąd sieci podczas pobierania tabeli.</div>`;
        }
    }

    // 4. Wysłanie wyniku na wybrany Leaderboard (obsługuje tabele Player oraz Generic)
    async submitScore(mode, rawScoreInteger, metadataObj = {}) {
        const ok = await this.ensureSession();
        if (!ok) {
            return { ok: false, message: `❌ ${this.lastErrorMsg || 'Brak połączenia z LootLocker.'}` };
        }

        if (playerNickname) {
            await this.setPlayerName(playerNickname);
        }

        const lbKey = (mode === 'ohko') ? this.config.ohkoKey.trim() : this.config.speedrunKey.trim();
        const scoreVal = Math.max(1, Math.round(rawScoreInteger));
        const metaStr = JSON.stringify({
            nickname: playerNickname || 'Anonim',
            deaths: deathCount,
            ...metadataObj
        });

        try {
            let res = await fetch(`${this.config.apiUrl}/leaderboards/${encodeURIComponent(lbKey)}/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-session-token': this.sessionToken,
                    'LL-Version': this.config.llVersion
                },
                body: JSON.stringify({
                    member_id: String(this.playerId || playerNickname || 'guest'),
                    score: scoreVal,
                    metadata: metaStr
                })
            });

            if (!res.ok) {
                res = await fetch(`${this.config.apiUrl}/leaderboards/${encodeURIComponent(lbKey)}/submit`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-session-token': this.sessionToken,
                        'LL-Version': this.config.llVersion
                    },
                    body: JSON.stringify({
                        member_id: playerNickname || String(this.playerId || 'guest'),
                        score: scoreVal,
                        metadata: metaStr
                    })
                });
            }

            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
                return { ok: false, message: `❌ Błąd zapisu (${data.message || data.error || res.status})` };
            }
            return { ok: true, message: '✅ Wynik został zapisany na Leaderboardzie!' };
        } catch (err) {
            console.warn('LootLocker submitScore error:', err);
            return { ok: false, message: '❌ Błąd sieci podczas wysyłania wyniku.' };
        }
    }
}

const lootLocker = new LootLockerService(LOOTLOCKER_CONFIG);

function getBestSpeedrunTicksForSubmit() {
    if (bestTimeTicks && bestTimeTicks > 0) return bestTimeTicks;
    if (speedrunTicks && speedrunTicks > 0) return speedrunTicks;
    if (sessionPlayTicks && sessionPlayTicks > 0) return sessionPlayTicks;
    return 0;
}

function getBestOhkoLevelForSubmit() {
    const currentReached = currentLevelIdx + 1;
    const unlockedReached = unlockedLevelIdx + 1;
    return Math.max(bestOhkoLevel || 0, currentReached, unlockedReached, 1);
}

function syncNicknameUI() {
    const settingsInput = document.getElementById('input-settings-nickname');
    const submitInput = document.getElementById('input-submit-nickname');
    const footerNick = document.getElementById('lb-footer-nick');
    const footerPb = document.getElementById('lb-footer-pb');

    if (settingsInput && document.activeElement !== settingsInput) {
        settingsInput.value = playerNickname;
    }
    if (submitInput && document.activeElement !== submitInput) {
        submitInput.value = playerNickname;
    }
    if (footerNick) {
        footerNick.textContent = `Nick: ${playerNickname || 'Gość'}`;
    }
    if (footerPb) {
        if (activeLeaderboardTab === 'speedrun') {
            const ticks = getBestSpeedrunTicksForSubmit();
            footerPb.textContent = ticks > 0 ? `PB: ${formatSpeedrunTime(ticks)}` : 'PB: Brak';
        } else {
            footerPb.textContent = `Max Poz.: ${getBestOhkoLevelForSubmit()}/${LEVELS.length}`;
        }
    }
}

function switchLeaderboardTab(tab) {
    activeLeaderboardTab = (tab === 'ohko') ? 'ohko' : 'speedrun';
    const tabSpeedrun = document.getElementById('tab-lb-speedrun');
    const tabOhko = document.getElementById('tab-lb-ohko');

    if (tabSpeedrun && tabOhko) {
        if (activeLeaderboardTab === 'speedrun') {
            tabSpeedrun.className = 'btn-retro py-1 px-2 rounded-lg text-[9px] sm:text-[10px] font-extrabold text-yellow-300 mono-font flex items-center justify-center gap-1';
            tabOhko.className = 'btn-retro-secondary py-1 px-2 rounded-lg text-[9px] sm:text-[10px] font-extrabold text-slate-300 mono-font flex items-center justify-center gap-1';
        } else {
            tabOhko.className = 'btn-retro py-1 px-2 rounded-lg text-[9px] sm:text-[10px] font-extrabold text-rose-300 mono-font flex items-center justify-center gap-1';
            tabSpeedrun.className = 'btn-retro-secondary py-1 px-2 rounded-lg text-[9px] sm:text-[10px] font-extrabold text-slate-300 mono-font flex items-center justify-center gap-1';
        }
    }
    syncNicknameUI();
    lootLocker.fetchLeaderboard(activeLeaderboardTab);
}

function updateSubmitModalPreview() {
    const srTicks = getBestSpeedrunTicksForSubmit();
    const ohkoLvl = getBestOhkoLevelForSubmit();

    const prevSr = document.getElementById('submit-preview-speedrun');
    const prevOhko = document.getElementById('submit-preview-ohko');
    const summaryEl = document.getElementById('submit-score-summary');
    const btnSr = document.getElementById('btn-select-mode-speedrun');
    const btnOhko = document.getElementById('btn-select-mode-ohko');

    if (prevSr) prevSr.textContent = srTicks > 0 ? formatSpeedrunTime(srTicks) : '00:10.00';
    if (prevOhko) prevOhko.textContent = `POZ. ${ohkoLvl}/${LEVELS.length}`;

    if (btnSr && btnOhko) {
        if (selectedSubmitMode === 'speedrun') {
            btnSr.className = 'btn-retro py-2 px-2.5 rounded-xl font-extrabold text-yellow-300 text-xs flex flex-col items-center gap-0.5';
            btnOhko.className = 'btn-retro-secondary py-2 px-2.5 rounded-xl font-extrabold text-rose-300 text-xs flex flex-col items-center gap-0.5';
        } else {
            btnOhko.className = 'btn-retro py-2 px-2.5 rounded-xl font-extrabold text-yellow-300 text-xs flex flex-col items-center gap-0.5';
            btnSr.className = 'btn-retro-secondary py-2 px-2.5 rounded-xl font-extrabold text-amber-300 text-xs flex flex-col items-center gap-0.5';
        }
    }

    if (summaryEl) {
        if (selectedSubmitMode === 'speedrun') {
            summaryEl.textContent = srTicks > 0
                ? `⏱️ SPEEDRUN WR • ${formatSpeedrunTime(srTicks)}`
                : `⏱️ SPEEDRUN WR • Gotowy do wysłania`;
        } else {
            summaryEl.textContent = `☠️ TRYB OHKO • POZIOM ${ohkoLvl} / ${LEVELS.length}`;
        }
    }
}

function openSubmitScoreModal(preferredMode = null) {
    sfx.play('ui_select');
    if (preferredMode) {
        selectedSubmitMode = preferredMode;
    } else if (isOhkoMode) {
        selectedSubmitMode = 'ohko';
    } else if (isSpeedrunMode) {
        selectedSubmitMode = 'speedrun';
    } else {
        selectedSubmitMode = (bestTimeTicks > 0 || speedrunTicks > 0) ? 'speedrun' : 'ohko';
    }

    syncNicknameUI();
    updateSubmitModalPreview();

    const statusEl = document.getElementById('submit-score-status');
    if (statusEl) statusEl.textContent = '';

    const modal = document.getElementById('submit-score-modal');
    if (modal) modal.classList.remove('hidden');
    activeMenuContext = null;
}

function closeSubmitScoreModal() {
    sfx.play('ui_back');
    const modal = document.getElementById('submit-score-modal');
    if (modal) modal.classList.add('hidden');
    activeMenuContext = null;
}

