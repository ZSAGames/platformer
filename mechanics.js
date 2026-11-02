// ============================================================================
// MODUŁ 7: SILNIK FIZYKI 60HZ, BROŃ 360° (OSTRZE RDZENIOWE), WROGOWIE I BOSS
// ============================================================================
let screenShake = 0;
let cameraX = 0;
let tickCount = 0;
let levelTransitionAlpha = 0;

const MENU_SHOWCASE_LEVELS = [0, 14, 28, 40, 65, 75];
let menuShowcasePos = 0;
let menuCycleTimer = 0;
let menuFadeState = 'NONE';
let menuFadeAlpha = 0;
let menuCamDir = 1;

let isGamepadConnected = false;

const bgMotes = Array.from({ length: 22 }, () => ({
    x: Math.random() * 800,
    y: Math.random() * 540,
    r: Math.random() * 2 + 1,
    vx: (Math.random() - 0.5) * 0.35,
    vy: -Math.random() * 0.35 - 0.1,
    phase: Math.random() * Math.PI * 2
}));

const kbTouchInput = { left: false, right: false, up: false };
const gamepadInput = {
    left: false,
    right: false,
    prevJump: false,
    prevDash: false,
    prevOptions: false,
    prevConfirm: false,
    prevBack: false,
    navCooldownUntil: 0
};
const keys = { left: false, right: false, up: false, jumpPressed: false, dashPressed: false };

const player = {
    x: 80,
    y: 400,
    w: 30,
    h: 30,
    vx: 0,
    vy: 0,
    facing: 1,
    onGround: false,
    wallDir: 0,
    dashTimer: 0,
    dashCooldown: 0,
    wallJumpLock: 0,
    coyoteTimer: 0,
    jumpBufferTimer: 0,
    dead: false,
    deathTimer: 0
};

// Stan Ostrza Rdzeniowego 360° (Broni od Jerry'ego na Poziomach 71 - 80)
const weapon = {
    angle: 0,
    targetAngle: 0,
    length: 54,
    pokeExtension: 0,
    touchActive: false,
    touchId: null
};

function playerHasWeapon() {
    const lvl = LEVELS[currentLevelIdx];
    return Boolean((currentLevelIdx >= 70 && currentLevelIdx <= 79) || (lvl && lvl.hasWeapon));
}

let solids = [];
let invisBlocks = [];
let fallingFloors = [];
let spikeTraps = [];
let enemies = [];
let fakeGoals = [];
let realGoal = null;
let particles = [];
const _particlePool = [];
let floatingTexts = [];
let projectiles = [];
let boss = null;

function rectOverlap(ax, ay, aw, ah, bx, by, bw, bh) {
    return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
}

function allocParticle(x, y, vx, vy, size, color, alpha, decay) {
    const p = _particlePool.length > 0 ? _particlePool.pop() : {};
    p.x = x;
    p.y = y;
    p.vx = vx;
    p.vy = vy;
    p.size = size;
    p.color = color;
    p.alpha = alpha;
    p.decay = decay;
    return p;
}

function spawnParticles(x, y, color, count = 10, speed = 4.5) {
    for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const spd = (Math.random() * 0.7 + 0.3) * speed;
        particles.push(allocParticle(
            x,
            y,
            Math.cos(angle) * spd,
            Math.sin(angle) * spd - 1,
            Math.random() * 4 + 3,
            color,
            1,
            Math.random() * 0.025 + 0.02
        ));
    }
}

function spawnFloatingText(x, y, text, color = '#fbbf24') {
    floatingTexts.push({ x, y, text, color, vy: -1.6, alpha: 1 });
}

let bannerTimeout = null;
function showChapterBanner(title, levelNum = currentLevelIdx + 1) {
    if (!title) return;
    const subtitleEl = document.getElementById('chapter-subtitle');
    const actBadge = document.getElementById('chapter-act-badge');
    const cardInner = document.getElementById('chapter-card-inner');

    const isCh2 = levelNum > 50;
    const secNum = !isCh2
        ? (levelNum <= 14 ? 1 : (levelNum <= 28 ? 2 : (levelNum <= 40 ? 3 : 4)))
        : (levelNum <= 60 ? 1 : (levelNum <= 70 ? 2 : (levelNum <= 75 ? 3 : 4)));

    if (subtitleEl) {
        subtitleEl.textContent = isCh2 ? 'ROZDZIAŁ 2 • GŁĘBINY, DŻUNGLA I BAZA' : 'ROZDZIAŁ 1 • FORTECA EVADA';
    }
    if (actBadge) actBadge.textContent = `SEKCJA ${secNum} • POZ. ${levelNum}`;
    chapterTitleEl.textContent = title;

    chapterBanner.classList.remove('hidden');
    if (cardInner) {
        cardInner.classList.remove('zone-card-enter');
        void cardInner.offsetWidth;
        cardInner.classList.add('zone-card-enter');
    }

    if (bannerTimeout) clearTimeout(bannerTimeout);
    bannerTimeout = setTimeout(() => {
        chapterBanner.classList.add('hidden');
    }, 2500);
}

function syncMusicForState() {
    music.setPaused(false);
    if (!settingsModal.classList.contains('hidden')) {
        music.playTrack('settings');
        return;
    }
    if (!levelsModal.classList.contains('hidden')) {
        music.playTrack('level_select');
        return;
    }
    if (gameState === 'CUTSCENE') {
        if (activeCutsceneKey === 'outro' || activeCutsceneKey === 'john_base_portal') {
            music.playTrack('cutscene_outro');
        } else if (activeCutsceneKey === 'jerry_jungle') {
            music.playTrack('jungle');
        } else {
            music.playTrack('cutscene_intro');
        }
        return;
    }
    if (gameState === 'PAUSED') {
        music.playTrack('pause');
        return;
    }
    if (gameState === 'MENU') {
        music.playTrack('menu');
        return;
    }

    const lvl = LEVELS[currentLevelIdx];
    if (lvl.isBossLevel) {
        music.playTrack('boss');
    } else if (lvl.isUnderwater || lvl.theme.startsWith('underwater')) {
        music.playTrack('underwater');
    } else if (lvl.theme === 'john_base') {
        music.playTrack('castle');
    } else if (lvl.theme === 'jungle' || lvl.theme === 'jungle_outpost') {
        music.playTrack('jungle');
    } else if (lvl.theme === 'castle') {
        music.playTrack('castle');
    } else if (lvl.theme === 'darkforest') {
        music.playTrack('night');
    } else if (lvl.theme === 'forest') {
        music.playTrack('forest');
    } else {
        music.playTrack('hills');
    }
}

function updateBossHUD() {
    if (!boss) return;
    const hp = Math.max(0, Math.ceil(boss.hp));
    const phase = hp <= 200 ? 4 : (hp <= 400 ? 3 : (hp <= 600 ? 2 : 1));
    boss.phase = phase;
    if (bossNameLabel) {
        const phaseNames = {
            1: 'MEGA-ROBO EVAD • FAZA 1/4',
            2: 'MEGA-ROBO EVAD • FAZA 2/4',
            3: 'MEGA-ROBO EVAD • FAZA 3/4',
            4: 'MEGA-ROBO EVAD • FURIA 4/4'
        };
        bossNameLabel.textContent = phaseNames[phase];
    }
    bossHpText.textContent = `${hp} / ${boss.maxHp} HP`;
    bossHpBar.style.width = `${(hp / boss.maxHp) * 100}%`;
}

function loadLevel(idx, isMenuPreview = false) {
    currentLevelIdx = Math.max(0, Math.min(LEVELS.length - 1, idx));
    const lvl = LEVELS[currentLevelIdx];

    if (!isMenuPreview) {
        levelTransitionAlpha = 0.85;
        // Zawsze zapisuj najwyższy odblokowany poziom (1-80)
        if (currentLevelIdx > unlockedLevelIdx) {
            unlockedLevelIdx = currentLevelIdx;
        }
        try {
            localStorage.setItem(STORAGE_KEYS.UNLOCKED_LEVEL, String(unlockedLevelIdx));
        } catch (e) {}

        // W trybie fabularnym (i Speedrunie powyżej zapisanego poziomu) aktualizuj również ostatni poziom kontynuacji
        if (!isOhkoMode && (!isSpeedrunMode || currentLevelIdx > savedPlayerLevelIdx)) {
            savedPlayerLevelIdx = currentLevelIdx;
            const continueBadge = document.getElementById('menu-continue-badge');
            if (continueBadge) continueBadge.textContent = `POZ. ${savedPlayerLevelIdx + 1}`;
            try {
                localStorage.setItem(STORAGE_KEYS.SAVED_LEVEL, String(savedPlayerLevelIdx));
            } catch (e) {}
        }

        if (isOhkoMode && (currentLevelIdx + 1 > bestOhkoLevel)) {
            bestOhkoLevel = currentLevelIdx + 1;
            try { localStorage.setItem(STORAGE_KEYS.BEST_OHKO, String(bestOhkoLevel)); } catch (e) {}
            refreshBestTimeBadge();
        }
        if (gameState === 'PLAYING') {
            const cardTitle = lvl.chapterTitle || (lvl.name.split('. ')[1] || lvl.name).toUpperCase();
            showChapterBanner(cardTitle, currentLevelIdx + 1);
        }
    }

    hudLevelBadge.textContent = `${currentLevelIdx + 1}/${LEVELS.length}`;
    hudLevelName.textContent = lvl.name;
    document.getElementById('pause-level-label').textContent = lvl.name;

    if (hudWeaponPill) {
        if (playerHasWeapon() && !isMenuPreview) {
            hudWeaponPill.classList.remove('hidden');
            hudWeaponPill.classList.add('flex');
        } else {
            hudWeaponPill.classList.add('hidden');
            hudWeaponPill.classList.remove('flex');
        }
    }

    applyThemeAmbilight(lvl.theme);
    syncMusicForState();

    if (lvl.isBossLevel && gameState === 'PLAYING') {
        bossHud.classList.remove('hidden');
    } else {
        bossHud.classList.add('hidden');
    }

    deathOverlay.classList.add('hidden');
    victoryOverlay.classList.add('hidden');

    player.x = lvl.spawn[0] * TILE;
    player.y = lvl.spawn[1] * TILE;
    player.vx = 0;
    player.vy = 0;
    player.facing = 1;
    player.onGround = false;
    player.wallDir = 0;
    player.dashTimer = 0;
    player.dashCooldown = 0;
    player.wallJumpLock = 0;
    player.coyoteTimer = 0;
    player.jumpBufferTimer = 0;
    player.dead = false;
    player.deathTimer = 0;
    weapon.pokeExtension = 0;

    solids = lvl.solids.map(s => ({
        x: s[0] * TILE,
        y: s[1] * TILE,
        w: s[2] * TILE,
        h: s[3] * TILE,
        isPlatform: s[3] <= 0.8
    }));

    invisBlocks = lvl.invisBlocks.map(b => ({
        x: b[0] * TILE,
        y: b[1] * TILE,
        w: TILE,
        h: TILE,
        revealed: false,
        bumpY: 0
    }));

    fallingFloors = lvl.fallingFloors.map(f => ({
        x: f[0] * TILE,
        y: f[1] * TILE,
        origY: f[1] * TILE,
        w: f[2] * TILE,
        h: f[3] * TILE,
        triggered: false,
        timer: 0,
        vy: 0
    }));

    spikeTraps = lvl.spikeTraps.map(t => ({
        x: t.x * TILE,
        y: t.y * TILE,
        origY: t.y * TILE,
        w: t.w * TILE,
        h: 32,
        dir: t.dir,
        triggerX: t.triggerX * TILE,
        triggered: false,
        vy: 0
    }));

    enemies = lvl.enemies.map(e => ({
        x: e.x * TILE,
        y: e.y * TILE,
        origY: e.y * TILE,
        w: 32,
        h: 32,
        vx: e.speed || 1.8,
        vy: 0,
        onGround: true,
        minX: e.minX * TILE,
        maxX: e.maxX * TILE,
        baseSpeed: e.speed || 1.8,
        type: e.type || 'robo',
        hungTimer: 0,
        maxHungTimer: 125,
        chasingPlayer: false,
        chargeTimer: 0,
        cooldownTimer: 0,
        ramState: 'patrol',
        lockTimer: 0,
        ramVx: 0,
        ramVy: 0,
        fireTimer: undefined,
        trollSpeed: e.trollSpeed || null,
        trollJump: e.trollJump || false,
        jumped: false,
        turboActive: false,
        eyeColor: e.type === 'mimic'
            ? '#facc15'
            : (e.type === 'robo_fish' ? '#fb923c' : (e.type === 'evad_bot' ? '#ef4444' : (e.trollSpeed ? '#ff0055' : (e.trollJump ? '#00f2fe' : '#ef4444'))))
    }));

    fakeGoals = (lvl.fakeGoals || []).map(fg => ({
        x: fg[0] * TILE,
        y: fg[1] * TILE,
        w: 40,
        h: 72,
        triggered: false
    }));

    realGoal = lvl.goal ? {
        x: lvl.goal[0] * TILE,
        y: lvl.goal[1] * TILE,
        w: 42,
        h: 72
    } : null;

    particles = [];
    floatingTexts = [];
    projectiles = [];

    if (lvl.isBossLevel) {
        boss = {
            x: 560,
            y: 392,
            w: 108,
            h: 108,
            vx: -2.4,
            vy: 0,
            hp: 800,
            maxHp: 800,
            phase: 1,
            state: 'patrol',
            stateTimer: 90,
            slamCountRemaining: 0,
            flashTimer: 0,
            postHitSafeTimer: 0,
            facing: -1,
            shockwaves: [],
            laserCooldown: 110,
            orbitalLaser: null
        };
        updateBossHUD();
    } else {
        boss = null;
    }

    if (gameState !== 'MENU') {
        const minCamX = lvl.width * TILE < canvas.width ? -Math.floor((canvas.width - lvl.width * TILE) / 2) : 0;
        const maxCamX = Math.max(minCamX, lvl.width * TILE - canvas.width);
        cameraX = Math.max(minCamX, Math.min(maxCamX, player.x - canvas.width * 0.35));
    } else {
        cameraX = 0;
        menuCamDir = 1;
    }
    updateTouchControlsVisibility();
}

function killPlayer(customReason) {
    if (_dbgM && _dbgG) return;
    if (player.dead) return;
    player.dead = true;
    player.deathTimer = 60;
    deathCount++;
    deathCountEl.textContent = deathCount;

    const deathPill = document.getElementById('hud-death-pill');
    if (deathPill) {
        deathPill.classList.remove('death-pill-pop');
        void deathPill.offsetWidth;
        deathPill.classList.add('death-pill-pop');
    }

    screenShake = 12;
    sfx.play('death');

    spawnParticles(player.x + player.w / 2, player.y + player.h / 2, '#a855f7', 22, 6);
    spawnParticles(player.x + player.w / 2, player.y + player.h / 2, '#f43f5e', 12, 4.5);

    const deathSubmitWrap = document.getElementById('death-submit-wrap');
    if (deathSubmitWrap) {
        // Przycisk wysyłania wyniku po śmierci widoczny WYŁĄCZNIE w trybie OHKO (w Speedrunie tylko na koniec gry!)
        if (isOhkoMode) {
            deathSubmitWrap.classList.remove('hidden');
        } else {
            deathSubmitWrap.classList.add('hidden');
        }
    }

    if (isOhkoMode) {
        trollMessageEl.textContent = `☠️ TRYB OHKO: Zginąłeś na Poziomie ${currentLevelIdx + 1}/${LEVELS.length}! Możesz zapisać wynik OHKO przed restartem!`;
    } else {
        const msg = customReason || TROLL_MESSAGES[Math.floor(Math.random() * TROLL_MESSAGES.length)];
        trollMessageEl.textContent = msg;
    }
    deathOverlay.classList.remove('hidden');
}

function showFinalVictoryModal() {
    gameState = 'VICTORY';
    inGameHud.classList.add('hidden');
    bossHud.classList.add('hidden');

    finalDeathsEl.textContent = deathCount;

    const statsGrid = document.getElementById('victory-stats-grid');
    const timeCol = document.getElementById('victory-time-col');
    const bestCol = document.getElementById('victory-best-col');

    const runTicks = isSpeedrunMode ? speedrunTicks : Math.max(speedrunTicks, sessionPlayTicks);
    if (finalTimeEl) finalTimeEl.textContent = formatSpeedrunTime(runTicks);

    if (isSpeedrunMode || !bestTimeTicks || runTicks < bestTimeTicks) {
        if (runTicks > 0 && (!bestTimeTicks || runTicks < bestTimeTicks)) {
            bestTimeTicks = runTicks;
            try { localStorage.setItem(STORAGE_KEYS.BEST_SPEEDRUN, String(bestTimeTicks)); } catch (e) {}
            refreshBestTimeBadge();
        }
    }

    if (isSpeedrunMode) {
        if (statsGrid) statsGrid.className = 'grid grid-cols-3 gap-2 mb-3 bg-slate-900/90 p-2.5 rounded-xl border border-purple-500/30';
        if (timeCol) timeCol.classList.remove('hidden');
        if (bestCol) bestCol.classList.remove('hidden');
        if (bestTimeEl) bestTimeEl.textContent = bestTimeTicks ? formatSpeedrunTime(bestTimeTicks) : formatSpeedrunTime(runTicks);
    } else {
        if (statsGrid) statsGrid.className = 'grid grid-cols-2 gap-2 mb-3 bg-slate-900/90 p-2.5 rounded-xl border border-purple-500/30';
        if (timeCol) timeCol.classList.remove('hidden');
        if (bestCol) bestCol.classList.add('hidden');
    }

    if (isOhkoMode || bestOhkoLevel < LEVELS.length) {
        if (isOhkoMode) {
            bestOhkoLevel = LEVELS.length;
            try { localStorage.setItem(STORAGE_KEYS.BEST_OHKO, String(bestOhkoLevel)); } catch (e) {}
            refreshBestTimeBadge();
        }
    }

    let rank = "Ranga: Bóg Kwadratów 🏆";
    if (isOhkoMode) rank = "Ranga: Nieśmiertelna Legenda OHKO ☠️👑";
    else if (deathCount > 150) rank = "Ranga: Niezniszczalny Masochista 💀";
    else if (deathCount > 75) rank = "Ranga: Weteran Cat Mario 🔥";
    else if (deathCount > 30) rank = "Ranga: Łowca Pułapek ⚡";
    finalRankEl.textContent = rank;

    victoryOverlay.classList.remove('hidden');
    activeMenuContext = null;
    updateTouchControlsVisibility();
}

function completeLevel() {
    if (gameState === 'VICTORY' || gameState === 'CUTSCENE') return;
    sfx.play('win');

    if (isOhkoMode && (currentLevelIdx + 1) > bestOhkoLevel) {
        bestOhkoLevel = currentLevelIdx + 1;
        try { localStorage.setItem(STORAGE_KEYS.BEST_OHKO, String(bestOhkoLevel)); } catch (e) {}
        refreshBestTimeBadge();
    }

    spawnParticles(player.x + 15, player.y + 15, '#34d399', 26, 5.5);

    const resetPlayerInputs = () => {
        player.vx = 0; player.vy = 0;
        kbTouchInput.left = false; kbTouchInput.right = false; kbTouchInput.up = false;
        gamepadInput.left = false; gamepadInput.right = false;
        keys.left = false; keys.right = false; keys.up = false;
        keys.jumpPressed = false; keys.dashPressed = false;
    };

    // 1. Koniec Rozdziału 1 (Poziom 50 -> Cutscenka Outro -> Poziom 51: Rozdział 2)
    if (currentLevelIdx === 49) {
        saveUnlockedLevelProgress(50);
        resetPlayerInputs();
        if (!isSpeedrunMode) {
            startCutscene('outro', () => {
                gameState = 'PLAYING';
                inGameHud.classList.remove('hidden');
                updateTouchControlsVisibility();
                loadLevel(50, false);
            });
        } else {
            loadLevel(50, false);
        }
        return;
    }

    // 2. Koniec Poziomu 70 -> Cutscenka z Jerrym -> Poziom 71 z Ostrzem Rdzeniowym 360°!
    if (currentLevelIdx === 69) {
        saveUnlockedLevelProgress(70);
        resetPlayerInputs();
        if (!isSpeedrunMode) {
            startCutscene('jerry_jungle', () => {
                gameState = 'PLAYING';
                inGameHud.classList.remove('hidden');
                updateTouchControlsVisibility();
                loadLevel(70, false);
            });
        } else {
            loadLevel(70, false);
        }
        return;
    }

    // 3. Zwykłe przejście do następnego poziomu
    if (currentLevelIdx < LEVELS.length - 1) {
        saveUnlockedLevelProgress(currentLevelIdx + 1);
        loadLevel(currentLevelIdx + 1, false);
    } else {
        // 4. Finał Poziomu 80 (Tajna Baza Johna -> Cutscenka z Angelą, Czerwonym Przyciskiem i Portalem!)
        saveUnlockedLevelProgress(LEVELS.length - 1);
        resetPlayerInputs();
        if (!isSpeedrunMode) {
            startCutscene('john_base_portal', () => {
                showFinalVictoryModal();
            });
        } else {
            showFinalVictoryModal();
        }
    }
}

const _spearPoints = [
    { x: 0, y: 0, r: 13 },
    { x: 0, y: 0, r: 15 },
    { x: 0, y: 0, r: 17 }
];
let _cachedJoyWrapEl = null;
let _lastJoyWrapVisible = null;

function updateWeaponAndAdvancedBots() {
    const hasWep = playerHasWeapon();
    if (!_cachedJoyWrapEl) _cachedJoyWrapEl = document.getElementById('touch-weapon-joy-wrap');
    if (_cachedJoyWrapEl) {
        const shouldShow = Boolean(hasWep && gameState === 'PLAYING');
        if (shouldShow !== _lastJoyWrapVisible) {
            _lastJoyWrapVisible = shouldShow;
            if (shouldShow) _cachedJoyWrapEl.classList.remove('hidden');
            else _cachedJoyWrapEl.classList.add('hidden');
        }
    }

    if (gameState !== 'PLAYING' || player.dead) return;

    if (hasWep && isGamepadConnected && navigator.getGamepads) {
        const pads = navigator.getGamepads();
        for (let i = 0; i < pads.length; i++) {
            const pad = pads[i];
            if (pad && pad.connected && pad.axes && pad.axes.length >= 4) {
                const rx = pad.axes[2] || 0;
                const ry = pad.axes[3] || 0;
                if (rx * rx + ry * ry > 0.0576) { // 0.24^2 bez Math.hypot
                    weapon.targetAngle = Math.atan2(ry, rx);
                    weapon.angle = weapon.targetAngle;
                }
                break;
            }
        }
    }

    if (weapon.pokeExtension > 0) {
        weapon.pokeExtension = Math.max(0, weapon.pokeExtension - 1.2);
    }

    const px = player.x + player.w * 0.5;
    const py = player.y + player.h * 0.5;
    const totalLen = weapon.length + weapon.pokeExtension;
    const cosA = Math.cos(weapon.angle);
    const sinA = Math.sin(weapon.angle);

    _spearPoints[0].x = px + cosA * (totalLen * 0.55);
    _spearPoints[0].y = py + sinA * (totalLen * 0.55);
    _spearPoints[1].x = px + cosA * (totalLen * 0.82);
    _spearPoints[1].y = py + sinA * (totalLen * 0.82);
    _spearPoints[2].x = px + cosA * (totalLen * 1.06);
    _spearPoints[2].y = py + sinA * (totalLen * 1.06);

    for (let i = enemies.length - 1; i >= 0; i--) {
        const e = enemies[i];
        if (e.type !== 'jetpack_rammer' && e.type !== 'raygun_drone') continue;

        e.vy = 0;
        const ex = e.x + e.w * 0.5;
        const ey = e.y + e.h * 0.5;
        const dx = px - ex;
        const dy = py - ey;
        const dist = Math.hypot(dx, dy);

        if (hasWep) {
            let poked = false;
            for (let s = 0; s < 3; s++) {
                const sp = _spearPoints[s];
                if (rectOverlap(sp.x - sp.r, sp.y - sp.r, sp.r * 2, sp.r * 2, e.x - 2, e.y - 2, e.w + 4, e.h + 4)) {
                    poked = true;
                    break;
                }
            }
            if (poked) {
                weapon.pokeExtension = 13;
                screenShake = 9;
                sfx.play('boss_hit');
                spawnParticles(ex, ey, '#22d3ee', 18, 5.5);
                spawnParticles(ex, ey, '#f97316', 12, 4.5);
                spawnFloatingText(ex, ey - 10, "💥 DZIABNIĘTY!", "#22d3ee");
                enemies.splice(i, 1);
                continue;
            }
        }

        if (e.type === 'jetpack_rammer') {
            if (!e.ramState) e.ramState = 'patrol';
            if (e.ramState === 'patrol') {
                e.y = e.origY + Math.sin(tickCount * 0.08 + e.minX) * 10;
                if (dist < 290) {
                    e.ramState = 'lockon';
                    e.lockTimer = 16;
                    sfx.play('warn');
                }
            } else if (e.ramState === 'lockon') {
                e.x -= Math.sign(e.vx) * e.baseSpeed;
                e.facing = dx >= 0 ? 1 : -1;
                e.lockTimer--;
                if (e.lockTimer <= 0) {
                    e.ramState = 'ramming';
                    const angle = Math.atan2(dy, dx);
                    const ramSpeed = 7.6;
                    e.ramVx = Math.cos(angle) * ramSpeed;
                    e.ramVy = Math.sin(angle) * ramSpeed;
                    sfx.play('boss_charge');
                }
            } else if (e.ramState === 'ramming') {
                e.x -= Math.sign(e.vx) * e.baseSpeed;
                const angleToPlayer = Math.atan2(dy, dx);
                e.ramVx = e.ramVx * 0.92 + Math.cos(angleToPlayer) * 7.6 * 0.08;
                e.ramVy = e.ramVy * 0.92 + Math.sin(angleToPlayer) * 7.6 * 0.08;
                e.x += e.ramVx;
                e.y += e.ramVy;
                e.facing = e.ramVx >= 0 ? 1 : -1;

                if ((tickCount & 1) === 0) {
                    particles.push(allocParticle(
                        ex - Math.sign(e.ramVx) * 14,
                        ey + 6,
                        -e.ramVx * 0.25,
                        (Math.random() - 0.5) * 1.5,
                        5,
                        '#f97316',
                        0.85,
                        0.08
                    ));
                }

                if (rectOverlap(player.x + 3, player.y + 3, player.w - 6, player.h - 6, e.x + 3, e.y + 3, e.w - 6, e.h - 6)) {
                    killPlayer("Wbił się w Ciebie Jetpack-Bot Johna! Wyceluj w niego Ostrzem Rdzeniowym (360°), żeby go dziabnąć zanim Cię dotknie!");
                    return;
                }
            }
        }

        if (e.type === 'raygun_drone') {
            e.y = e.origY + Math.sin(tickCount * 0.06 + e.minX * 0.1) * 16;
            e.facing = dx >= 0 ? 1 : -1;
            if (e.fireTimer === undefined) e.fireTimer = 55 + (i * 19) % 40;
            e.fireTimer--;

            if (e.fireTimer <= 0 && dist < 440) {
                e.fireTimer = 78;
                const aimAngle = Math.atan2(dy, dx);
                const boltSpeed = 6.2;
                const cosAim = Math.cos(aimAngle);
                const sinAim = Math.sin(aimAngle);
                projectiles.push({
                    x: ex + cosAim * 18,
                    y: ey + sinAim * 18,
                    vx: cosAim * boltSpeed,
                    vy: sinAim * boltSpeed,
                    r: 7,
                    isRaygun: true,
                    deflected: false
                });
                sfx.play('laser');
                spawnParticles(ex + cosAim * 18, ey + sinAim * 18, '#4ade80', 6, 3);
            }

            if (rectOverlap(player.x + 4, player.y + 4, player.w - 8, player.h - 8, e.x + 4, e.y + 4, e.w - 8, e.h - 8)) {
                killPlayer("Zderzyłeś się z latającym Raygun-Botem! Odbij w niego pocisk kijem lub dziabnij go z dystansu!");
                return;
            }
        }
    }

    if (hasWep) {
        for (let i = projectiles.length - 1; i >= 0; i--) {
            const p = projectiles[i];
            if (!p.deflected) {
                let hitSpear = false;
                for (let s = 0; s < 3; s++) {
                    const sp = _spearPoints[s];
                    if (Math.hypot(p.x - sp.x, p.y - sp.y) <= p.r + sp.r + 5) {
                        hitSpear = true;
                        break;
                    }
                }
                if (hitSpear) {
                    p.deflected = true;
                    weapon.pokeExtension = 11;
                    sfx.play('walljump');

                    let deflectAngle = weapon.angle;
                    let bestDist = 520;
                    for (let j = 0; j < enemies.length; j++) {
                        const e = enemies[j];
                        const ex = e.x + e.w * 0.5;
                        const ey = e.y + e.h * 0.5;
                        const angToEnemy = Math.atan2(ey - p.y, ex - p.x);
                        const angleDiff = Math.abs(Math.atan2(Math.sin(angToEnemy - weapon.angle), Math.cos(angToEnemy - weapon.angle)));
                        const d = Math.hypot(ex - p.x, ey - p.y);
                        if (angleDiff < 0.85 && d < bestDist) {
                            bestDist = d;
                            deflectAngle = angToEnemy;
                        }
                    }

                    const deflectSpeed = 10.5;
                    p.vx = Math.cos(deflectAngle) * deflectSpeed;
                    p.vy = Math.sin(deflectAngle) * deflectSpeed;
                    spawnParticles(p.x, p.y, '#22d3ee', 12, 4.5);
                    spawnFloatingText(p.x, p.y - 10, "⚡ ODBITY!", "#4ade80");
                }
            } else {
                let hitEnemy = false;
                for (let j = enemies.length - 1; j >= 0; j--) {
                    const e = enemies[j];
                    if (rectOverlap(p.x - p.r - 4, p.y - p.r - 4, (p.r + 4) * 2, (p.r + 4) * 2, e.x, e.y, e.w, e.h)) {
                        const ex = e.x + e.w * 0.5;
                        const ey = e.y + e.h * 0.5;
                        screenShake = 10;
                        sfx.play('boss_hit');
                        spawnParticles(ex, ey, '#4ade80', 22, 6);
                        spawnParticles(ex, ey, '#facc15', 14, 5);
                        spawnFloatingText(ex, ey - 10, "🎯 TRAFIONY!", "#4ade80");
                        enemies.splice(j, 1);
                        hitEnemy = true;
                        break;
                    }
                }
                if (hitEnemy) {
                    projectiles.splice(i, 1);
                }
            }
        }
    }
}

function updateBoss() {
    if (boss.flashTimer > 0) boss.flashTimer--;
    if (boss.postHitSafeTimer > 0) boss.postHitSafeTimer--;

    const phase = boss.hp <= 200 ? 4 : (boss.hp <= 400 ? 3 : (boss.hp <= 600 ? 2 : 1));
    boss.phase = phase;

    boss.facing = (player.x < boss.x + boss.w / 2) ? -1 : 1;
    boss.stateTimer--;

    const minArenaX = 46;
    const maxArenaX = 754;
    const floorY = 12.5 * TILE - boss.h;

    if (phase >= 3 && boss.state === 'patrol') {
        if (!boss.orbitalLaser) {
            boss.laserCooldown--;
            if (boss.laserCooldown <= 0) {
                const targetX = Math.max(85, Math.min(715, player.x + player.w / 2));
                boss.orbitalLaser = {
                    x: targetX,
                    warnTimer: phase === 4 ? 48 : 54,
                    fireTimer: 26
                };
                sfx.play('warn');
            }
        } else {
            const ol = boss.orbitalLaser;
            if (ol.warnTimer > 0) {
                if (ol.warnTimer > 18) {
                    ol.x += ((player.x + player.w / 2) - ol.x) * 0.08;
                }
                ol.warnTimer--;
                if (ol.warnTimer === 0) {
                    sfx.play('laser');
                    screenShake = 10;
                }
            } else if (ol.fireTimer > 0) {
                ol.fireTimer--;
                if (rectOverlap(player.x + 4, player.y + 4, player.w - 8, player.h - 8, ol.x - 14, 0, 28, 500)) {
                    killPlayer("Zostałeś trafiony przez Orbitalny Laser! Gdy celownik przestaje się ruszać, zrób Dash w bok!");
                    return;
                }
                if (ol.fireTimer <= 0) {
                    boss.orbitalLaser = null;
                    boss.laserCooldown = phase === 4 ? 95 : 115;
                }
            }
        }
    } else {
        boss.orbitalLaser = null;
    }

    if (boss.state === 'recover') {
        boss.x += boss.vx;
        if (boss.x <= minArenaX) { boss.x = minArenaX; boss.vx = Math.abs(boss.vx); }
        if (boss.x + boss.w >= maxArenaX) { boss.x = maxArenaX - boss.w; boss.vx = -Math.abs(boss.vx); }

        if (boss.stateTimer <= 0) {
            boss.state = 'patrol';
            const dir = (player.x < boss.x + boss.w / 2) ? -1 : 1;
            boss.vx = dir * 2.4;
            boss.stateTimer = phase === 1 ? 90 : (phase === 2 ? 82 : (phase === 3 ? 75 : 68));
        }
    } else if (boss.state === 'patrol') {
        const patrolMult = phase === 1 ? 1.05 : (phase === 2 ? 1.2 : (phase === 3 ? 1.35 : 1.5));
        boss.x += Math.sign(boss.vx || -1) * 2.3 * patrolMult;
        if (boss.x <= minArenaX) { boss.x = minArenaX; boss.vx = Math.abs(boss.vx); }
        if (boss.x + boss.w >= maxArenaX) { boss.x = maxArenaX - boss.w; boss.vx = -Math.abs(boss.vx); }

        const fireInterval = phase === 1 ? 65 : (phase === 2 ? 56 : (phase === 3 ? 50 : 44));
        if (boss.stateTimer > 28 && boss.stateTimer % fireInterval === 0) {
            const eyeX = boss.x + boss.w / 2 + boss.facing * 20;
            const eyeY = boss.y + 42;
            const baseAngle = Math.atan2((player.y + 15) - eyeY, (player.x + 15) - eyeX);
            const projSpeed = phase === 1 ? 6.8 : (phase === 2 ? 7.4 : (phase === 3 ? 7.8 : 8.2));

            if (phase <= 2) {
                projectiles.push({
                    x: eyeX,
                    y: eyeY,
                    vx: Math.cos(baseAngle) * projSpeed,
                    vy: Math.sin(baseAngle) * projSpeed,
                    r: 7.5
                });
            } else {
                for (const offset of [-0.18, 0.18]) {
                    projectiles.push({
                        x: eyeX,
                        y: eyeY,
                        vx: Math.cos(baseAngle + offset) * projSpeed,
                        vy: Math.sin(baseAngle + offset) * projSpeed,
                        r: 7.5
                    });
                }
            }
            sfx.play('laser');
        }

        if (boss.stateTimer <= 0) {
            projectiles = [];
            boss.orbitalLaser = null;
            if (Math.random() < 0.5) {
                boss.state = 'charge_warn';
                boss.stateTimer = phase === 1 ? 38 : (phase === 2 ? 34 : (phase === 3 ? 30 : 26));
                sfx.play('boss_charge_warn');
            } else {
                boss.state = 'slam_jump';
                boss.vy = -14.0;
                boss.stateTimer = 60;
                boss.slamCountRemaining = (phase >= 3) ? 1 : 0;
                sfx.play('jump');
            }
        }
    } else if (boss.state === 'charge_warn') {
        if (boss.stateTimer <= 0) {
            boss.state = 'charge';
            const chargeSpd = phase === 1 ? 9.4 : (phase === 2 ? 10.6 : (phase === 3 ? 11.6 : 12.4));
            boss.vx = boss.facing * chargeSpd;
            boss.stateTimer = 65;
            sfx.play('boss_charge');
        }
    } else if (boss.state === 'charge') {
        boss.x += boss.vx;
        spawnParticles(boss.x + boss.w / 2, boss.y + boss.h - 10, '#ef4444', 2, 3);

        if (boss.x <= minArenaX || boss.x + boss.w >= maxArenaX || boss.stateTimer <= 0) {
            boss.x = Math.max(minArenaX, Math.min(maxArenaX - boss.w, boss.x));
            screenShake = 14;
            sfx.play('boss_wall_crash');
            sfx.play('boss_glitch');
            projectiles = [];
            boss.orbitalLaser = null;
            boss.state = 'vulnerable';
            boss.stateTimer = phase === 1 ? 190 : (phase === 2 ? 175 : (phase === 3 ? 165 : 155));
        }
    } else if (boss.state === 'slam_jump') {
        boss.x += ((player.x - boss.w / 2) - boss.x) * (phase >= 3 ? 0.052 : 0.044);
        boss.x = Math.max(minArenaX, Math.min(maxArenaX - boss.w, boss.x));
        boss.vy += 0.56;
        boss.y += boss.vy;
        if (boss.vy >= 0) {
            boss.state = 'slam_down';
            boss.vy = phase >= 3 ? 15.2 : 14.0;
        }
    } else if (boss.state === 'slam_down') {
        boss.y += boss.vy;
        if (boss.y >= floorY) {
            boss.y = floorY;
            boss.vy = 0;
            screenShake = 16;
            sfx.play('boss_wall_crash');
            const waveSpd = phase === 1 ? 5.8 : (phase === 2 ? 6.5 : (phase === 3 ? 7.2 : 7.8));
            boss.shockwaves.push({ x: boss.x, y: 12.5 * TILE - 20, vx: -waveSpd, w: 24, h: 20 });
            boss.shockwaves.push({ x: boss.x + boss.w - 24, y: 12.5 * TILE - 20, vx: waveSpd, w: 24, h: 20 });

            if (boss.slamCountRemaining > 0) {
                boss.slamCountRemaining--;
                boss.state = 'slam_jump';
                boss.vy = -13.4;
                sfx.play('jump');
            } else {
                sfx.play('boss_glitch');
                projectiles = [];
                boss.orbitalLaser = null;
                boss.state = 'vulnerable';
                boss.stateTimer = phase === 1 ? 190 : (phase === 2 ? 175 : (phase === 3 ? 165 : 155));
            }
        }
    } else if (boss.state === 'vulnerable') {
        if (tickCount % 8 === 0) {
            spawnParticles(boss.x + Math.random() * boss.w, boss.y + 10, '#22d3ee', 3, 2.5);
        }
        if (tickCount % 26 === 0) {
            sfx.play('boss_glitch');
        }
        if (boss.stateTimer <= 0) {
            boss.state = 'patrol';
            boss.vx = (boss.x < 400 ? 1 : -1) * 2.4;
            boss.stateTimer = phase === 1 ? 90 : (phase === 2 ? 80 : (phase === 3 ? 72 : 65));
        }
    }

    for (let i = boss.shockwaves.length - 1; i >= 0; i--) {
        const sw = boss.shockwaves[i];
        sw.x += sw.vx;
        if (sw.x < 40 || sw.x > 760) {
            boss.shockwaves.splice(i, 1);
            continue;
        }
        if (rectOverlap(player.x + 4, player.y + 4, player.w - 8, player.h - 8, sw.x, sw.y, sw.w, sw.h)) {
            killPlayer("Zmiotła Cię fala uderzeniowa! Przeskocz ją lub wejdź na platformę!");
            return;
        }
    }

    if (boss.postHitSafeTimer > 0) return;

    if (rectOverlap(player.x + 2, player.y + 2, player.w - 4, player.h - 4, boss.x + 4, boss.y + 4, boss.w - 8, boss.h - 8)) {
        const playerBottom = player.y + player.h;
        const bossTop = boss.y + 42;

        if (boss.state === 'vulnerable' && player.vy > 0 && playerBottom <= bossTop + 20) {
            player.y = boss.y - player.h - 4;
            player.vy = -11.6;
            const bounceDir = (boss.x + boss.w / 2 < 400) ? 1 : -1;
            player.vx = bounceDir * 5.2;
            player.wallJumpLock = 0;
            player.dashCooldown = 0;

            boss.hp -= 100;
            boss.flashTimer = 16;
            boss.postHitSafeTimer = 48;
            projectiles = [];
            boss.shockwaves = [];
            boss.orbitalLaser = null;

            screenShake = 15;
            sfx.play('stomp');
            sfx.play('boss_hit');
            updateBossHUD();

            spawnParticles(player.x + player.w / 2, boss.y, '#22d3ee', 22, 6);
            spawnParticles(player.x + player.w / 2, boss.y, '#facc15', 14, 5);
            spawnFloatingText(boss.x + boss.w / 2, boss.y - 10, "-100 HP!", "#22d3ee");

            if (boss.hp <= 0) {
                sfx.play('boss_destroy');
                sfx.play('win');
                screenShake = 28;
                spawnParticles(boss.x + boss.w / 2, boss.y + boss.h / 2, '#f97316', 65, 9);
                spawnParticles(boss.x + boss.w / 2, boss.y + boss.h / 2, '#38bdf8', 45, 7);
                realGoal = { x: 380, y: 428, w: 42, h: 72 };
                projectiles = [];
                enemies = [];
                bossHud.classList.add('hidden');
                boss = null;
                return;
            } else {
                boss.state = 'recover';
                boss.vx = (boss.x + boss.w / 2 < 400 ? 1 : -1) * 3.2;
                boss.stateTimer = 45;
            }
        } else {
            if (boss.state !== 'vulnerable' && playerBottom <= bossTop + 18) {
                killPlayer("Nie skacz na Bossa, dopóki nie jest zamrożony (niebieski)! Jego kolce plazmowe na głowie są aktywne!");
            } else {
                killPlayer("Zostałeś zmiażdżony przez pancerz Mega-Robo Evada!");
            }
            return;
        }
    }
}

const _activeColliders = [];
let _cachedDashLabel = null;
let _lastDashCooldown = -1;
let _lastDashReadyState = null;

function applyEnemyVerticalPhysics(e, triggerMimicHangOnLand = false) {
    const wasJumping = e.jumped;
    e.vy += 0.55;
    if (e.vy > 12) e.vy = 12;
    e.y += e.vy;
    e.onGround = false;

    for (let i = 0, len = _activeColliders.length; i < len; i++) {
        const c = _activeColliders[i];
        if (rectOverlap(e.x, e.y, e.w, e.h, c.x, c.y, c.w, c.h)) {
            if (e.vy >= 0 && e.y + e.h - e.vy <= c.y + 14) {
                e.y = c.y - e.h;
                e.vy = 0;
                e.onGround = true;
                e.jumped = false;
                if (triggerMimicHangOnLand && wasJumping) {
                    e.hungTimer = e.maxHungTimer;
                    e.chasingPlayer = false;
                    sfx.play('boss_glitch');
                    spawnParticles(e.x + e.w * 0.5, e.y + e.h * 0.5, '#22d3ee', 12, 4);
                    spawnFloatingText(e.x + e.w * 0.5, e.y - 8, "⚡ ZAWIESZONY!", "#22d3ee");
                }
            } else if (e.vy < 0 && e.y - e.vy >= c.y + c.h - 14) {
                e.y = c.y + c.h;
                e.vy = 0;
            }
        }
    }
}

function update() {
    tickCount++;
    const lvl = LEVELS[currentLevelIdx];

    keys.left = kbTouchInput.left || gamepadInput.left;
    keys.right = kbTouchInput.right || gamepadInput.right;

    if (lvl.theme !== 'day' || lvl.transitionToTheme) {
        for (let i = 0; i < bgMotes.length; i++) {
            const m = bgMotes[i];
            m.x += m.vx;
            m.y += m.vy;
            if (m.y < -10) { m.y = 580; m.x = Math.random() * canvas.width; }
            if (m.x < -10) m.x = canvas.width + 10;
            if (m.x > canvas.width + 10) m.x = -10;
        }
    }

    if (gameState === 'CUTSCENE') {
        cutsceneTick++;
        cutscenePhaseTick++;
        if (screenShake > 0) screenShake *= 0.85;
        if (screenShake < 0.4) screenShake = 0;

        const script = CUTSCENE_SCRIPTS[activeCutsceneKey];
        if (script && script[cutsceneIndex]) {
            const slide = script[cutsceneIndex];
            if (cutsceneCharIndex < slide.text.length && (tickCount & 1) === 0) {
                cutsceneCharIndex++;
                cutsceneTextEl.textContent = slide.text.slice(0, cutsceneCharIndex);
                const ch = slide.text[cutsceneCharIndex - 1];
                if (ch && ch !== ' ' && ch !== '*' && (cutsceneCharIndex & 1) === 0) {
                    sfx.play('talk', slide.pitch || 360);
                }
            }
        }
        return;
    }

    if (gameState === 'MENU') {
        const maxCamX = Math.max(0, lvl.width * TILE - canvas.width);
        cameraX += menuCamDir * 1.1;
        if (cameraX >= maxCamX) {
            cameraX = maxCamX;
            menuCamDir = -1;
        } else if (cameraX <= 0) {
            cameraX = 0;
            menuCamDir = 1;
        }

        for (let i = 0; i < enemies.length; i++) {
            const e = enemies[i];
            e.x += Math.sign(e.vx) * e.baseSpeed;
            if (e.x <= e.minX) { e.x = e.minX; e.vx = Math.abs(e.vx); }
            else if (e.x + e.w >= e.maxX) { e.x = e.maxX - e.w; e.vx = -Math.abs(e.vx); }
        }

        if (menuFadeState === 'NONE') {
            menuCycleTimer++;
            if (menuCycleTimer >= 360) {
                menuFadeState = 'FADING_OUT';
            }
        } else if (menuFadeState === 'FADING_OUT') {
            menuFadeAlpha = Math.min(1, menuFadeAlpha + 0.03);
            if (menuFadeAlpha >= 1) {
                menuShowcasePos = (menuShowcasePos + 1) % MENU_SHOWCASE_LEVELS.length;
                loadLevel(MENU_SHOWCASE_LEVELS[menuShowcasePos], true);
                menuFadeState = 'FADING_IN';
            }
        } else if (menuFadeState === 'FADING_IN') {
            menuFadeAlpha = Math.max(0, menuFadeAlpha - 0.03);
            if (menuFadeAlpha <= 0) {
                menuFadeState = 'NONE';
                menuCycleTimer = 0;
            }
        }
        return;
    }

    if (gameState === 'PAUSED' || gameState === 'VICTORY') {
        return;
    }

    sessionPlayTicks++;
    if (isSpeedrunMode) {
        speedrunTicks++;
        if (tickCount % 3 === 0) {
            hudTimerEl.textContent = formatSpeedrunTime(speedrunTicks);
        }
    }

    if (levelTransitionAlpha > 0) {
        levelTransitionAlpha = Math.max(0, levelTransitionAlpha - 0.055);
    }

    if (screenShake > 0) screenShake *= 0.85;
    if (screenShake < 0.4) screenShake = 0;

    // Usuwanie cząsteczek Swap-and-Pop w czasie O(1) ze zwrotem do puli (_particlePool)
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.18;
        p.alpha -= p.decay;
        if (p.alpha <= 0) {
            _particlePool.push(p);
            const lastIdx = particles.length - 1;
            if (i !== lastIdx) particles[i] = particles[lastIdx];
            particles.pop();
        }
    }

    for (let i = floatingTexts.length - 1; i >= 0; i--) {
        const ft = floatingTexts[i];
        ft.y += ft.vy;
        ft.alpha -= 0.022;
        if (ft.alpha <= 0) floatingTexts.splice(i, 1);
    }

    if (lvl.transitionToTheme && tickCount % 6 === 0) {
        const maxCam = Math.max(1, lvl.width * TILE - canvas.width);
        const rawProgress = Math.max(0, Math.min(1, cameraX / maxCam));
        const smoothBlend = rawProgress * rawProgress * (3 - 2 * rawProgress);
        applyThemeAmbilight(lvl.theme, lvl.transitionToTheme, smoothBlend);
    }

    if (player.dead) {
        player.deathTimer--;
        if (player.deathTimer <= 0 || keys.jumpPressed) {
            keys.jumpPressed = false;
            if (isOhkoMode) {
                deathCount = 0;
                deathCountEl.textContent = '0';
                loadLevel(0, false);
            } else {
                loadLevel(currentLevelIdx, false);
            }
        }
        return;
    }

    if (player.dashCooldown > 0) player.dashCooldown--;

    // Dirty-flag dla paska Dasha: aktualizuj DOM wyłącznie przy zmianie stanu!
    if (player.dashCooldown !== _lastDashCooldown) {
        _lastDashCooldown = player.dashCooldown;
        const dashPct = Math.max(0, Math.min(100, ((36 - player.dashCooldown) / 36) * 100));
        dashBar.style.width = `${dashPct}%`;

        const isReady = player.dashCooldown <= 0;
        if (isReady !== _lastDashReadyState) {
            _lastDashReadyState = isReady;
            if (!_cachedDashLabel) _cachedDashLabel = document.getElementById('hud-dash-label');
            if (isReady) {
                dashBar.classList.add('dash-ready-pulse');
                if (_cachedDashLabel) {
                    _cachedDashLabel.textContent = 'GOTOWY';
                    _cachedDashLabel.className = 'text-[8px] sm:text-[9px] font-extrabold text-yellow-300 mono-font hidden xs:inline';
                }
            } else {
                dashBar.classList.remove('dash-ready-pulse');
                if (_cachedDashLabel) {
                    _cachedDashLabel.textContent = 'ŁADUJĘ';
                    _cachedDashLabel.className = 'text-[8px] sm:text-[9px] font-extrabold text-cyan-400/70 mono-font hidden xs:inline';
                }
            }
        }
    }

    const isUnderwater = Boolean(lvl.isUnderwater);

    if (keys.dashPressed && player.dashCooldown <= 0 && player.dashTimer <= 0) {
        keys.dashPressed = false;
        player.dashTimer = isUnderwater ? 6 : 9;
        player.dashCooldown = 36;
        const dir = keys.left ? -1 : (keys.right ? 1 : player.facing);
        player.facing = dir;
        player.vx = dir * (isUnderwater ? 5.6 : 13.0);
        player.vy = isUnderwater ? -0.8 : 0;
        sfx.play('dash');
        spawnParticles(player.x + player.w * 0.5, player.y + player.h * 0.5, isUnderwater ? '#bae6fd' : '#22d3ee', 8, isUnderwater ? 2.2 : 4);
    }
    keys.dashPressed = false;

    if (player.dashTimer > 0) {
        player.dashTimer--;
        particles.push(allocParticle(
            player.x + player.w * 0.5,
            player.y + player.h * 0.5,
            -player.vx * 0.08,
            (Math.random() - 0.5) * 0.5,
            isUnderwater ? 4 : 5,
            isUnderwater ? '#bae6fd' : '#22d3ee',
            0.65,
            0.09
        ));
    } else {
        if (player.wallJumpLock > 0) {
            player.wallJumpLock--;
        } else {
            const accel = isUnderwater ? (player.onGround ? 0.85 : 0.65) : (player.onGround ? 1.15 : 0.75);
            const maxSpd = isUnderwater ? 3.85 : 4.7;
            if (keys.left) {
                player.vx = Math.max(player.vx - accel, -maxSpd);
                player.facing = -1;
            } else if (keys.right) {
                player.vx = Math.min(player.vx + accel, maxSpd);
                player.facing = 1;
            } else {
                player.vx *= player.onGround ? 0.72 : (isUnderwater ? 0.84 : 0.88);
                if (Math.abs(player.vx) < 0.1) player.vx = 0;
            }
        }
        if (isUnderwater) {
            player.vy += (player.vy < 0) ? 0.25 : 0.22;
            if (player.vy > 4.6) player.vy = 4.6;
        } else {
            player.vy += 0.58;
            if (player.vy > 14) player.vy = 14;
        }
    }

    // Reużywana prealokowana tablica koliderów (Zero alokacji tablicy co klatkę)
    _activeColliders.length = 0;
    for (let i = 0; i < solids.length; i++) _activeColliders.push(solids[i]);
    for (let i = 0; i < invisBlocks.length; i++) {
        const ib = invisBlocks[i];
        if (ib.revealed) _activeColliders.push(ib);
        if (ib.bumpY < 0) ib.bumpY += 1;
    }
    for (let i = 0; i < fallingFloors.length; i++) _activeColliders.push(fallingFloors[i]);

    player.x += player.vx;
    if (player.x < 0) { player.x = 0; player.vx = 0; }
    const maxWorldW = lvl.width * TILE;
    if (player.x + player.w > maxWorldW) { player.x = maxWorldW - player.w; player.vx = 0; }

    player.wallDir = 0;
    for (let i = 0; i < _activeColliders.length; i++) {
        const c = _activeColliders[i];
        if (rectOverlap(player.x, player.y, player.w, player.h, c.x, c.y, c.w, c.h)) {
            if (player.vx > 0) {
                player.x = c.x - player.w;
                player.vx = 0;
                if (!c.isPlatform && c.h >= TILE * 1.5) player.wallDir = 1;
            } else if (player.vx < 0) {
                player.x = c.x + c.w;
                player.vx = 0;
                if (!c.isPlatform && c.h >= TILE * 1.5) player.wallDir = -1;
            }
        }
    }

    if (!player.onGround && player.wallDir === 0) {
        for (let i = 0; i < solids.length; i++) {
            const c = solids[i];
            if (c.isPlatform || c.h < TILE * 1.5) continue;
            if (rectOverlap(player.x - 3, player.y + 4, player.w + 6, player.h - 8, c.x, c.y, c.w, c.h)) {
                player.wallDir = (player.x + player.w * 0.5 < c.x + c.w * 0.5) ? 1 : -1;
            }
        }
    }

    if (!player.onGround && player.wallDir !== 0 && player.vy > (isUnderwater ? 1.25 : 2.1) && ((player.wallDir === 1 && keys.right) || (player.wallDir === -1 && keys.left))) {
        player.vy = isUnderwater ? 1.25 : 2.1;
    }

    const prevY = player.y;
    player.y += player.vy;
    player.onGround = false;

    if (player.vy < 0) {
        for (let i = 0; i < invisBlocks.length; i++) {
            const ib = invisBlocks[i];
            if (!ib.revealed && prevY >= ib.y + ib.h - 6 && rectOverlap(player.x + 2, player.y, player.w - 4, player.h, ib.x, ib.y, ib.w, ib.h)) {
                ib.revealed = true;
                ib.bumpY = -6;
                player.y = ib.y + ib.h;
                player.vy = 2.5;
                player.dashTimer = 0;
                sfx.play('troll');
                spawnParticles(ib.x + TILE * 0.5, ib.y + TILE, '#fbbf24', 10, 4);
                spawnFloatingText(ib.x + 20, ib.y - 4, "BĘC!", "#facc15");
            }
        }
    }

    for (let i = 0; i < _activeColliders.length; i++) {
        const c = _activeColliders[i];
        if (rectOverlap(player.x, player.y, player.w, player.h, c.x, c.y, c.w, c.h)) {
            if (player.vy > 0) {
                player.y = c.y - player.h;
                player.vy = 0;
                player.onGround = true;
                player.dashCooldown = Math.min(player.dashCooldown, 6);

                if (c.triggered !== undefined && !c.triggered) {
                    c.triggered = true;
                    c.timer = 9;
                    sfx.play('troll');
                }
            } else if (player.vy < 0) {
                player.y = c.y + c.h;
                player.vy = 0;
            }
        }
    }

    if (player.onGround) {
        player.coyoteTimer = jumpAssistEnabled ? 11 : 3;
    } else if (player.coyoteTimer > 0) {
        player.coyoteTimer--;
    }

    if (keys.jumpPressed) {
        player.jumpBufferTimer = jumpAssistEnabled ? 10 : 2;
        keys.jumpPressed = false;
    } else if (player.jumpBufferTimer > 0) {
        player.jumpBufferTimer--;
    }

    const canJumpNow = player.onGround || (jumpAssistEnabled && player.coyoteTimer > 0);
    const wantsJump = player.jumpBufferTimer > 0 || (jumpAssistEnabled && kbTouchInput.up && player.onGround);

    if (wantsJump) {
        if (canJumpNow) {
            player.vy = isUnderwater ? -10.8 : -12.3;
            player.onGround = false;
            player.coyoteTimer = 0;
            player.jumpBufferTimer = 0;
            sfx.play('jump');
            spawnParticles(player.x + player.w * 0.5, player.y + player.h, isUnderwater ? '#bae6fd' : '#e2e8f0', 6, 2.5);
        } else if (player.wallDir !== 0) {
            player.vy = isUnderwater ? -10.2 : -11.8;
            player.vx = -player.wallDir * (isUnderwater ? 6.4 : 7.8);
            player.facing = -player.wallDir;
            player.wallJumpLock = 9;
            player.dashCooldown = 0;
            player.jumpBufferTimer = 0;
            sfx.play('walljump');
            spawnParticles(player.wallDir === 1 ? player.x + player.w : player.x, player.y + player.h * 0.5, '#c084fc', 10, 4);
        }
    }
    keys.jumpPressed = false;

    if (player.y > canvas.height + 24) {
        if (_dbgM && _dbgG) {
            player.y = 80;
            player.vy = -6;
        } else {
            killPlayer("Grawitacja zawsze wygrywa. Wpadłeś w przepaść!");
            return;
        }
    }

    for (let i = 0; i < fallingFloors.length; i++) {
        const ff = fallingFloors[i];
        if (ff.triggered) {
            if (ff.timer > 0) {
                ff.timer--;
            } else {
                ff.vy += 0.72;
                ff.y += ff.vy;
            }
        }
    }

    for (let i = 0; i < spikeTraps.length; i++) {
        const st = spikeTraps[i];
        if (!st.triggered && player.x + player.w >= st.triggerX) {
            st.triggered = true;
            sfx.play('troll');
        }
        if (st.triggered && st.dir === 'down') {
            st.vy += 0.68;
            st.y += st.vy;
        }
        const spikeActive = st.dir === 'up' ? st.triggered : true;
        if (spikeActive) {
            const hitX = st.x + 5;
            const hitY = st.dir === 'up' ? st.y + 6 : st.y;
            const hitW = st.w - 10;
            const hitH = st.h - 8;
            if (rectOverlap(player.x + 3, player.y + 3, player.w - 6, player.h - 6, hitX, hitY, hitW, hitH)) {
                killPlayer(st.dir === 'up' ? "Zaskoczony kolcami z podłogi? Klasyk!" : "Patrz w górę! Spadające kolce!");
                return;
            }
        }
    }

    updateWeaponAndAdvancedBots();
    if (player.dead) return;

    for (let i = 0; i < enemies.length; i++) {
        const e = enemies[i];
        if (e.type === 'jetpack_rammer' || e.type === 'raygun_drone') {
            if (e.type === 'raygun_drone' || e.ramState === 'patrol') {
                e.x += Math.sign(e.vx) * e.baseSpeed;
                if (e.x <= e.minX) { e.x = e.minX; e.vx = Math.abs(e.vx); }
                else if (e.x + e.w >= e.maxX) { e.x = e.maxX - e.w; e.vx = -Math.abs(e.vx); }
            }
            continue;
        }

        const dxToPlayer = (player.x + player.w * 0.5) - (e.x + e.w * 0.5);
        const distX = Math.abs(dxToPlayer);
        const distY = Math.abs((player.y + player.h * 0.5) - (e.y + e.h * 0.5));

        if (e.type === 'robo_fish') {
            const dyToPlayer = (player.y + player.h * 0.5) - (e.y + e.h * 0.5);
            const dist2D = Math.hypot(dxToPlayer, dyToPlayer);
            const chaseRadius = e.chasingPlayer ? 215 : 175;

            if (dist2D < chaseRadius) {
                e.chasingPlayer = true;
                e.turboActive = true;
                const angle = Math.atan2(dyToPlayer, dxToPlayer);
                const chaseSpd = e.baseSpeed * 1.55;
                e.vx = Math.cos(angle) * chaseSpd;
                e.vy = Math.sin(angle) * chaseSpd;
                e.facing = dxToPlayer >= 0 ? 1 : -1;

                e.x += e.vx;
                for (let j = 0; j < _activeColliders.length; j++) {
                    const c = _activeColliders[j];
                    if (rectOverlap(e.x, e.y, e.w, e.h, c.x, c.y, c.w, c.h)) { e.x -= e.vx; break; }
                }
                e.y += e.vy;
                for (let j = 0; j < _activeColliders.length; j++) {
                    const c = _activeColliders[j];
                    if (rectOverlap(e.x, e.y, e.w, e.h, c.x, c.y, c.w, c.h)) { e.y -= e.vy; break; }
                }
            } else {
                e.chasingPlayer = false;
                e.turboActive = false;
                const targetBobY = e.origY + Math.sin(tickCount * 0.06 + e.minX * 0.05) * 8;
                e.vy = (targetBobY - e.y) * 0.07;
                e.y += e.vy;

                const dir = Math.sign(e.vx) || 1;
                e.vx = dir * e.baseSpeed;
                e.x += e.vx;
                if (e.x <= e.minX) { e.x = e.minX; e.vx = Math.abs(e.baseSpeed); }
                else if (e.x + e.w >= e.maxX) { e.x = e.maxX - e.w; e.vx = -Math.abs(e.baseSpeed); }
                e.facing = Math.sign(e.vx) || 1;
            }

            if (rectOverlap(player.x + 4, player.y + 4, player.w - 8, player.h - 8, e.x + 4, e.y + 4, e.w - 8, e.h - 8)) {
                killPlayer("Dorwała Cię podwodna Robo-Pirania! Odpłyń od niej dalej, a przestanie Cię gonić!");
                return;
            }
            continue;
        }

        if (e.type === 'mimic') {
            if (e.hungTimer > 0) {
                e.hungTimer--;
                e.turboActive = false;
                e.chasingPlayer = false;
                if (tickCount % 12 === 0) {
                    spawnParticles(e.x + Math.random() * e.w, e.y + 4, '#facc15', 2, 2);
                }
                applyEnemyVerticalPhysics(e, false);

                if (player.vy > 0 && rectOverlap(player.x + 2, player.y + 2, player.w - 4, player.h - 2, e.x + 2, e.y - 4, e.w - 4, 16)) {
                    player.y = e.y - player.h - 2;
                    player.vy = -12.0;
                    player.dashCooldown = 0;
                    e.hungTimer = e.maxHungTimer;
                    sfx.play('walljump');
                    spawnParticles(e.x + e.w * 0.5, e.y, '#22d3ee', 10, 4);
                }
                continue;
            }

            const playerNear = (distX < 135 && distY < 85);
            let currentSpeed = e.baseSpeed;
            e.turboActive = false;

            if (playerNear) {
                currentSpeed = e.baseSpeed * 2.05;
                e.turboActive = true;
                e.chasingPlayer = true;
                if (distX > 10) e.vx = Math.sign(dxToPlayer) * Math.abs(e.baseSpeed);
                if (e.onGround && !e.jumped && (player.vy < -3.0 || player.dashTimer > 0)) {
                    e.vy = -10.0;
                    e.jumped = true;
                    e.onGround = false;
                    sfx.play('jump');
                }
            } else {
                e.chasingPlayer = false;
            }

            e.x += Math.sign(e.vx) * currentSpeed;
            if (e.x <= e.minX) {
                e.x = e.minX;
                e.vx = Math.abs(e.vx);
                if (e.chasingPlayer && playerNear) {
                    e.hungTimer = e.maxHungTimer;
                    e.chasingPlayer = false;
                    sfx.play('boss_glitch');
                    spawnParticles(e.x + e.w * 0.5, e.y + e.h * 0.5, '#facc15', 10, 3.5);
                    spawnFloatingText(e.x + e.w * 0.5, e.y - 8, "⚡ ZAWIESZONY!", "#22d3ee");
                }
            } else if (e.x + e.w >= e.maxX) {
                e.x = e.maxX - e.w;
                e.vx = -Math.abs(e.vx);
                if (e.chasingPlayer && playerNear) {
                    e.hungTimer = e.maxHungTimer;
                    e.chasingPlayer = false;
                    sfx.play('boss_glitch');
                    spawnParticles(e.x + e.w * 0.5, e.y + e.h * 0.5, '#facc15', 10, 3.5);
                    spawnFloatingText(e.x + e.w * 0.5, e.y - 8, "⚡ ZAWIESZONY!", "#22d3ee");
                }
            }

            applyEnemyVerticalPhysics(e, true);

            if (e.hungTimer <= 0 && rectOverlap(player.x + 4, player.y + 4, player.w - 8, player.h - 8, e.x + 4, e.y + 4, e.w - 8, e.h - 8)) {
                killPlayer("Złapał Cię Żółty Mimic! Zmuś go do skoku lub szarży tuż obok siebie, żeby się ZAWIESIŁ!");
                return;
            }
            continue;
        }

        if (e.type === 'evad_bot') {
            if (e.hungTimer > 0) {
                e.hungTimer--;
                e.chargeTimer = 0;
                e.turboActive = false;
                if (tickCount % 10 === 0) {
                    spawnParticles(e.x + Math.random() * e.w, e.y + 4, '#38bdf8', 2, 2);
                }
                applyEnemyVerticalPhysics(e, false);
                if (player.vy > 0 && rectOverlap(player.x + 2, player.y + 2, player.w - 4, player.h - 2, e.x + 2, e.y - 4, e.w - 4, 16)) {
                    player.y = e.y - player.h - 2;
                    player.vy = -12.4;
                    player.dashCooldown = 0;
                    e.hungTimer = 135;
                    sfx.play('stomp');
                    spawnParticles(e.x + e.w * 0.5, e.y, '#38bdf8', 12, 4);
                }
                continue;
            }

            if (e.cooldownTimer > 0) e.cooldownTimer--;

            const inSight = (distX < 210 && distY < 52 && e.cooldownTimer <= 0);
            if (e.chargeTimer > 0) {
                e.chargeTimer--;
                e.facing = dxToPlayer >= 0 ? 1 : -1;
                e.turboActive = true;
                if (e.chargeTimer === 0) {
                    const shotDir = e.facing || (dxToPlayer >= 0 ? 1 : -1);
                    projectiles.push({
                        x: e.x + e.w * 0.5 + shotDir * 16,
                        y: e.y + 15,
                        vx: shotDir * 6.4,
                        vy: 0,
                        r: 6
                    });
                    sfx.play('laser');
                    spawnParticles(e.x + e.w * 0.5 + shotDir * 16, e.y + 15, '#ef4444', 8, 3);
                    e.cooldownTimer = 115;
                    e.turboActive = false;
                }
            } else if (inSight) {
                e.chargeTimer = 38;
                e.facing = dxToPlayer >= 0 ? 1 : -1;
                sfx.play('warn');
            } else {
                e.turboActive = false;
                e.x += Math.sign(e.vx) * e.baseSpeed;
                if (e.x <= e.minX) { e.x = e.minX; e.vx = Math.abs(e.vx); }
                else if (e.x + e.w >= e.maxX) { e.x = e.maxX - e.w; e.vx = -Math.abs(e.vx); }
                e.facing = Math.sign(e.vx) || 1;
            }

            applyEnemyVerticalPhysics(e, false);

            if (player.vy > 0 && e.chargeTimer <= 0 && rectOverlap(player.x + 2, player.y + 2, player.w - 4, player.h - 2, e.x + 2, e.y - 4, e.w - 4, 15)) {
                player.y = e.y - player.h - 2;
                player.vy = -12.2;
                player.dashCooldown = 0;
                e.hungTimer = 135;
                sfx.play('stomp');
                spawnParticles(e.x + e.w * 0.5, e.y, '#ef4444', 12, 4);
                spawnFloatingText(e.x + e.w * 0.5, e.y - 8, "⚡ OGŁUSZONY!", "#38bdf8");
                continue;
            }

            if (rectOverlap(player.x + 4, player.y + 4, player.w - 8, player.h - 8, e.x + 4, e.y + 4, e.w - 8, e.h - 8)) {
                killPlayer("Zostałeś trafiony przez Evad-Bota! Przeskocz nad wiązką lub wskocz mu na głowę po strzale!");
                return;
            }
            continue;
        }

        let currentSpeed = e.baseSpeed;
        e.turboActive = false;
        if (e.trollSpeed && distX < 145 && distY < 90) {
            currentSpeed = e.trollSpeed;
            e.turboActive = true;
        }
        if (e.trollJump && !e.jumped && distX < 115 && distY < 90 && player.y < e.y + 20) {
            e.vy = -9.2;
            e.jumped = true;
            e.onGround = false;
            sfx.play('jump');
        }

        e.x += Math.sign(e.vx) * currentSpeed;
        if (e.x <= e.minX) { e.x = e.minX; e.vx = Math.abs(e.vx); }
        else if (e.x + e.w >= e.maxX) { e.x = e.maxX - e.w; e.vx = -Math.abs(e.vx); }

        applyEnemyVerticalPhysics(e, false);

        if (rectOverlap(player.x + 4, player.y + 4, player.w - 8, player.h - 8, e.x + 4, e.y + 4, e.w - 8, e.h - 8)) {
            killPlayer("Zostałeś zezłomowany przez Robo-Kwadrat!");
            return;
        }
    }

    for (let i = 0; i < fakeGoals.length; i++) {
        const fg = fakeGoals[i];
        if (!fg.triggered && rectOverlap(player.x, player.y, player.w, player.h, fg.x, fg.y, fg.w, fg.h)) {
            fg.triggered = true;
            killPlayer("HAHA! Ten portal był FAŁSZYWY! Prawdziwe wyjście jest wyżej lub dalej!");
            return;
        }
    }

    if (realGoal && rectOverlap(player.x, player.y, player.w, player.h, realGoal.x, realGoal.y, realGoal.w, realGoal.h)) {
        completeLevel();
        return;
    }

    if (boss) {
        updateBoss();
    }

    for (let i = projectiles.length - 1; i >= 0; i--) {
        const p = projectiles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < cameraX - 80 || p.x > cameraX + canvas.width + 80 || p.y < -60 || p.y > 640) {
            projectiles.splice(i, 1);
            continue;
        }
        if (!p.deflected && rectOverlap(player.x + 4, player.y + 4, player.w - 8, player.h - 8, p.x - p.r, p.y - p.r, p.r * 2, p.r * 2)) {
            killPlayer(playerHasWeapon() ? "Trafił Cię pocisk z Rayguna! Dotknij go swoim Ostrzem Rdzeniowym 360°, żeby odbić go w bota!" : "Trafił Cię pocisk plazmowy! Przeskocz nad nim lub użyj Dasha!");
            return;
        }
    }

    const worldPixelW = lvl.width * TILE;
    if (worldPixelW <= canvas.width) {
        cameraX = -Math.floor((canvas.width - worldPixelW) / 2);
    } else {
        const targetCamX = player.x - canvas.width * 0.36;
        const maxCamX = Math.max(0, worldPixelW - canvas.width);
        cameraX += (Math.max(0, Math.min(maxCamX, targetCamX)) - cameraX) * 0.14;
    }
}

