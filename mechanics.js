// ============================================================================
// MODUŁ 7: SILNIK FIZYKI 60HZ, BROŃ 360° (OSTRZE RDZENIOWE), WROGOWIE I BOSS
// ============================================================================
let screenShake = 0;
let cameraX = 0;
let tickCount = 0;
let levelTransitionAlpha = 0;

const MENU_SHOWCASE_LEVELS = [0, 14, 28, 40, 65, 75, 85, 104];
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
    deathTimer: 0,
    visualFacing: 1,
    visualScaleX: 1,
    visualScaleY: 1,
    visualTilt: 0
};

// Stan Broni 360°: Ostrze Rdzeniowe (Kij na Poz. 71-80) oraz Raygun (Sahara Poz. 81-100 oraz komenda "cubelon")
const weapon = {
    type: 'spear', // 'spear' (Kij) lub 'raygun' (Raygun 360°)
    devForceEnabled: false,
    angle: 0,
    prevAngle: 0,
    targetAngle: 0,
    length: 54,
    pokeExtension: 0,
    visualExt: 0,
    visualAngle: 0,
    touchActive: false,
    touchId: null,
    ammo: 20,
    maxAmmo: 20,
    reloadTimer: 0,
    reloadDuration: 120, // ~2.0s bazowego przeładowania (kręcenie bronią 360° przyspiesza ładowanie!)
    reloadSpinAccum: 0,
    spinBoostTimer: 0,
    fireCooldown: 0,
    minFireInterval: 4,  // bardzo szybkie strzelanie (do 15 pocisków/s przy szybkim klikaniu!)
    jamTimer: 0,         // blokada Anti-Autoclicker przy bocie/makrze
    clickTimestamps: [], // historia kliknięć dla detektora Auto-Clickera
    recoilOffset: 0,
    muzzleFlashTimer: 0,
    emptyWarnCooldown: 0
};

function canUseRaygunInCurrentState() {
    const lvl = LEVELS[currentLevelIdx];
    // Raygun dostępny WYŁĄCZNIE po wpisaniu komendy "cubelon" (_dbgM) lub w przyszłych poziomach Sahary (lvl.hasRaygun)
    return Boolean(_dbgM || (lvl && lvl.hasRaygun));
}

function playerHasWeapon() {
    const lvl = LEVELS[currentLevelIdx];
    return Boolean((currentLevelIdx >= 70 && currentLevelIdx <= 79) || (lvl && (lvl.hasWeapon || lvl.hasRaygun)) || (_dbgM && weapon.devForceEnabled));
}

function playerHasRaygun() {
    return Boolean(playerHasWeapon() && canUseRaygunInCurrentState() && weapon.type === 'raygun');
}

function updateWeaponHUD() {
    const pill = document.getElementById('hud-weapon-pill');
    const label = document.getElementById('hud-weapon-label');
    if (!pill) return;

    if (!canUseRaygunInCurrentState() && weapon.type === 'raygun') {
        weapon.type = 'spear';
    }

    if (playerHasWeapon() && gameState === 'PLAYING') {
        pill.classList.remove('hidden');
        pill.classList.add('flex');
    } else if (gameState !== 'PLAYING' || !playerHasWeapon()) {
        pill.classList.add('hidden');
        pill.classList.remove('flex');
    }

    if (!label) return;
    const switchHint = _dbgM ? ' [Q]' : '';
    if (playerHasRaygun()) {
        if (weapon.jamTimer > 0) {
            label.textContent = `🚫 ANTI-CLICKER!`;
            label.className = 'text-[9px] font-extrabold text-rose-300 mono-font';
            pill.className = 'hud-pill-skew flex items-center gap-1 bg-rose-950/95 border border-rose-400 px-1.5 py-0.5 rounded cursor-pointer';
        } else if (weapon.reloadTimer > 0) {
            const pct = Math.max(0, Math.min(99, Math.floor(((weapon.reloadDuration - weapon.reloadTimer) / weapon.reloadDuration) * 100)));
            const isSpinFast = weapon.spinBoostTimer > 0;
            label.textContent = isSpinFast
                ? `⚡ SZYBKO ${pct}%${switchHint}`
                : `🔋 ŁADUJĘ ${pct}% (KRĘĆ 360°!)${switchHint}`;
            label.className = isSpinFast
                ? 'text-[9px] font-extrabold text-cyan-200 mono-font'
                : 'text-[9px] font-extrabold text-amber-300 mono-font';
            pill.className = isSpinFast
                ? 'hud-pill-skew flex items-center gap-1 bg-cyan-950/95 border border-cyan-300 px-1.5 py-0.5 rounded cursor-pointer'
                : 'hud-pill-skew flex items-center gap-1 bg-amber-950/95 border border-amber-400 px-1.5 py-0.5 rounded cursor-pointer';
        } else {
            label.textContent = `🔫 RAYGUN ${weapon.ammo}/${weapon.maxAmmo}${switchHint}`;
            label.className = 'text-[9px] font-extrabold text-emerald-300 mono-font';
            pill.className = 'hud-pill-skew flex items-center gap-1 bg-emerald-950/95 border border-emerald-400 px-1.5 py-0.5 rounded cursor-pointer';
        }
    } else {
        label.textContent = `🗡️ KIJ${switchHint}`;
        label.className = 'text-[9px] font-extrabold text-cyan-300 mono-font';
        pill.className = `hud-pill-skew flex items-center gap-1 bg-cyan-950/95 border border-cyan-400 px-1.5 py-0.5 rounded ${_dbgM ? 'cursor-pointer' : 'cursor-default'}`;
    }
}

function switchPlayerWeaponType() {
    // Bez aktywnej komendy "cubelon" (_dbgM) przełączanie na Rayguna na poziomach 71-80 jest całkowicie wyłączone!
    if (!_dbgM) return;

    if (!playerHasWeapon()) {
        weapon.devForceEnabled = true;
    }
    weapon.type = (weapon.type === 'raygun') ? 'spear' : 'raygun';
    sfx.play('ui_select');
    updateWeaponHUD();
    updateTouchControlsVisibility();
    if (gameState === 'PLAYING' && !player.dead) {
        spawnFloatingText(
            player.x + player.w * 0.5,
            player.y - 10,
            weapon.type === 'raygun' ? `🔫 RAYGUN (${weapon.ammo}/${weapon.maxAmmo})` : '🗡️ OSTRZE RDZENIOWE',
            weapon.type === 'raygun' ? '#4ade80' : '#22d3ee'
        );
    }
}
window.switchPlayerWeaponType = switchPlayerWeaponType;

function firePlayerRaygun(evt = null) {
    if (gameState !== 'PLAYING' || player.dead || !playerHasRaygun()) return false;

    // 1. Odrzucenie syntetycznych (niezaufanych) kliknięć ze skryptów
    if (evt && evt.isTrusted === false) {
        return false;
    }

    // 2. Detektor Anti-Autoclicker (analiza częstotliwości CPS oraz stałych odstępów makro)
    const nowMs = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
    weapon.clickTimestamps.push(nowMs);
    while (weapon.clickTimestamps.length > 0 && nowMs - weapon.clickTimestamps[0] > 800) {
        weapon.clickTimestamps.shift();
    }

    let isMacroPattern = false;
    if (weapon.clickTimestamps.length >= 8) {
        let minDiff = Infinity;
        let maxDiff = 0;
        let sumDiff = 0;
        const len = weapon.clickTimestamps.length;
        for (let i = len - 6; i < len; i++) {
            const d = weapon.clickTimestamps[i] - weapon.clickTimestamps[i - 1];
            if (d < minDiff) minDiff = d;
            if (d > maxDiff) maxDiff = d;
            sumDiff += d;
        }
        const avgDiff = sumDiff / 6;
        // Jeśli 6 kolejnych kliknięć ma robotycznie stały odstęp (< 2.0ms różnicy) i są bardzo szybkie (< 65ms) -> Auto-Clicker!
        if (avgDiff < 65 && (maxDiff - minDiff) < 2.0) {
            isMacroPattern = true;
        }
    }

    if (weapon.clickTimestamps.length >= 16 || isMacroPattern) {
        weapon.jamTimer = 85; // blokada broni za używanie Auto-Clickera (>20 CPS lub stałe makro)
        weapon.clickTimestamps.length = 0;
        sfx.play('troll');
        spawnFloatingText(player.x + player.w * 0.5, player.y - 14, '🚫 ANTI-CLICKER! PRZEGRZANIE!', '#f43f5e');
        updateWeaponHUD();
        return false;
    }

    if (weapon.jamTimer > 0) {
        if (weapon.emptyWarnCooldown <= 0) {
            weapon.emptyWarnCooldown = 25;
            sfx.play('raygun_empty');
            spawnFloatingText(player.x + player.w * 0.5, player.y - 10, '🚫 ZWOLNIJ KLIKANIE!', '#f43f5e');
        }
        return false;
    }

    // 3. Minimalny odstęp między strzałami (4 klatki = pozwala bardzo szybko nawalać pociskami!)
    if (weapon.fireCooldown > 0) {
        return false;
    }

    if (weapon.reloadTimer > 0) {
        sfx.play('raygun_empty');
        if (weapon.emptyWarnCooldown <= 0) {
            weapon.emptyWarnCooldown = 26;
            spawnFloatingText(player.x + player.w * 0.5, player.y - 10, '🌀 KRĘĆ BRONIĄ 360° BY SZYBCIEJ NAŁADOWAĆ!', '#38bdf8');
        }
        return false;
    }

    if (weapon.ammo <= 0) {
        weapon.reloadTimer = weapon.reloadDuration;
        weapon.reloadSpinAccum = 0;
        sfx.play('raygun_empty');
        updateWeaponHUD();
        return false;
    }

    weapon.ammo--;
    weapon.fireCooldown = weapon.minFireInterval;
    weapon.recoilOffset = 6.5;
    weapon.muzzleFlashTimer = 4;

    const px = player.x + player.w * 0.5;
    const py = player.y + player.h * 0.5;
    const cosA = Math.cos(weapon.angle);
    const sinA = Math.sin(weapon.angle);
    const barrelTipX = px + cosA * 38;
    const barrelTipY = py + sinA * 38;
    const boltSpeed = 13.8;

    projectiles.push({
        x: barrelTipX,
        y: barrelTipY,
        vx: cosA * boltSpeed,
        vy: sinA * boltSpeed,
        r: 6.5,
        isRaygun: true,
        isPlayerShot: true,
        deflected: true
    });

    sfx.play('player_raygun');
    spawnParticles(barrelTipX, barrelTipY, '#4ade80', 5, 3.2);

    if (weapon.ammo <= 0) {
        weapon.reloadTimer = weapon.reloadDuration;
        weapon.reloadSpinAccum = 0;
        spawnFloatingText(px, player.y - 12, '🔋 ŁADOWANIE (KRĘĆ 360° = SZYBCIEJ!)', '#fbbf24');
    }

    updateWeaponHUD();
    return true;
}
window.firePlayerRaygun = firePlayerRaygun;

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
    const isLow = typeof lowEndMode !== 'undefined' && lowEndMode;
    if (isLow) {
        if (particles.length >= 10) return;
        count = Math.min(3, Math.max(1, (count * 0.25) | 0));
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            particles.push(allocParticle(
                x | 0,
                y | 0,
                Math.cos(angle) * speed * 0.65,
                Math.sin(angle) * speed * 0.65,
                4,
                color,
                1,
                0.08
            ));
        }
        return;
    }
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

    const isCh3 = levelNum > 80;
    const isCh2 = levelNum > 50 && levelNum <= 80;
    const secNum = isCh3
        ? (levelNum <= 90 ? 1 : (levelNum <= 100 ? 2 : (levelNum <= 112 ? 3 : 4)))
        : (!isCh2
            ? (levelNum <= 14 ? 1 : (levelNum <= 28 ? 2 : (levelNum <= 40 ? 3 : 4)))
            : (levelNum <= 60 ? 1 : (levelNum <= 70 ? 2 : (levelNum <= 75 ? 3 : 4))));

    if (subtitleEl) {
        subtitleEl.textContent = isCh3
            ? (levelNum > 100 ? 'ROZDZIAŁ 3 • GÓRY CUBELONU' : 'ROZDZIAŁ 3 • PREHISTORYCZNA SAHARA')
            : (isCh2 ? 'ROZDZIAŁ 2 • GŁĘBINY, DŻUNGLA I BAZA' : 'ROZDZIAŁ 1 • FORTECA EVADA');
    }
    if (actBadge) actBadge.textContent = `SEKCJA ${secNum} • POZ. ${levelNum}`;
    chapterTitleEl.textContent = title;

    chapterBanner.classList.remove('hidden');
    if (cardInner && (typeof lowEndMode === 'undefined' || !lowEndMode)) {
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
        } else if (activeCutsceneKey === 'jerry_jungle' || activeCutsceneKey === 'sahara_awakening' || activeCutsceneKey === 'sahara_portal_escape') {
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
    } else if (lvl.theme === 'sahara' || lvl.theme === 'jungle' || lvl.theme === 'jungle_outpost') {
        music.playTrack('jungle');
    } else if (lvl.theme === 'castle') {
        music.playTrack('castle');
    } else if (lvl.theme === 'darkforest') {
        music.playTrack('night');
    } else if (lvl.theme === 'forest') {
        music.playTrack('forest');
    } else if (lvl.theme === 'mountain') {
        music.playTrack(lvl.hasJohnOutpost ? 'castle' : 'hills');
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

    if (lvl.hasRaygun) {
        weapon.type = 'raygun';
    } else if (!_dbgM) {
        weapon.type = 'spear';
        weapon.devForceEnabled = false;
    }
    weapon.ammo = weapon.maxAmmo;
    weapon.reloadTimer = 0;
    weapon.reloadSpinAccum = 0;
    weapon.spinBoostTimer = 0;
    weapon.prevAngle = weapon.angle;
    weapon.fireCooldown = 0;
    weapon.jamTimer = 0;
    weapon.clickTimestamps.length = 0;
    weapon.recoilOffset = 0;
    weapon.muzzleFlashTimer = 0;
    weapon.emptyWarnCooldown = 0;

    if (hudWeaponPill) {
        if (playerHasWeapon() && !isMenuPreview) {
            hudWeaponPill.classList.remove('hidden');
            hudWeaponPill.classList.add('flex');
            updateWeaponHUD();
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
    player.visualFacing = 1;
    player.visualScaleX = 1;
    player.visualScaleY = 1;
    player.visualTilt = 0;
    weapon.pokeExtension = 0;
    weapon.visualExt = 0;
    weapon.visualAngle = weapon.angle;

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
        bumpY: 0,
        bumpProgress: 0
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
        vy: 0,
        extProgress: t.dir === 'up' ? 0 : 1
    }));

    enemies = lvl.enemies.map(e => {
        const eType = e.type || 'robo';
        const isRex = eType === 'dino_rex';
        const isTitan = eType === 'john_titan_mech';
        const isVanguard = eType === 'john_vanguard';
        const isRaptor = eType === 'dino_raptor';
        const ew = isRex ? 52 : (isTitan ? 46 : (isVanguard ? 38 : (isRaptor ? 34 : 32)));
        const eh = isRex ? 52 : (isTitan ? 46 : (isVanguard ? 38 : (isRaptor ? 34 : 32)));
        const yOff = eh - 32;
        const maxHp = isRex ? 14 : (isTitan ? 9 : (isVanguard ? 5 : (isRaptor ? 5 : (
            (eType === 'john_dash_bot' || eType === 'john_laser_sniper' || eType === 'john_cryo_drone') ? 2 : 1
        ))));
        return {
            x: e.x * TILE,
            y: e.y * TILE - yOff,
            origY: e.y * TILE - yOff,
            w: ew,
            h: eh,
            hp: maxHp,
            maxHp: maxHp,
            hitFlashTimer: 0,
            jumpCooldown: 0,
            dodgeCooldown: 0,
            dashVisualTimer: 0,
            vx: e.speed || 1.8,
            vy: 0,
            onGround: true,
            minX: e.minX * TILE,
            maxX: e.maxX * TILE,
            baseSpeed: e.speed || 1.8,
            type: eType,
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
            visualDir: Math.sign(e.speed || 1.8) || 1,
            visualScaleY: 1,
            eyeColor: eType === 'mimic'
                ? '#facc15'
                : (eType === 'robo_fish' ? '#fb923c' : (eType === 'evad_bot' ? '#ef4444' : '#38bdf8'))
        };
    });

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

    while (particles.length) _particlePool.push(particles.pop());
    floatingTexts = [];
    projectiles = [];
    _lastDashCooldown = -1;
    _lastDashReadyState = null;

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
    if (deathPill && (typeof lowEndMode === 'undefined' || !lowEndMode)) {
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

    const victorySubmitBtn = document.getElementById('btn-victory-submit-score');
    if (victorySubmitBtn) {
        if (isSpeedrunMode || isOhkoMode) {
            victorySubmitBtn.classList.remove('hidden');
            victorySubmitBtn.classList.add('flex');
            victorySubmitBtn.innerHTML = isOhkoMode
                ? '<span>🏆 WYŚLIJ WYNIK OHKO NA LEADERBOARD</span>'
                : '<span>🏆 WYŚLIJ CZAS SPEEDRUN NA LEADERBOARD</span>';
        } else {
            victorySubmitBtn.classList.add('hidden');
            victorySubmitBtn.classList.remove('flex');
        }
    }

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

    // 3. Koniec Rozdziału 2 (Poziom 80 -> Cutscenka z Portalem -> Cutscenka Przebudzenia na Saharze -> Poziom 81: Rozdział 3 Sahara!)
    if (currentLevelIdx === 79) {
        saveUnlockedLevelProgress(80);
        resetPlayerInputs();
        if (!isSpeedrunMode) {
            startCutscene('john_base_portal', () => {
                startCutscene('sahara_awakening', () => {
                    gameState = 'PLAYING';
                    inGameHud.classList.remove('hidden');
                    updateTouchControlsVisibility();
                    loadLevel(80, false);
                });
            });
        } else {
            loadLevel(80, false);
        }
        return;
    }
    

// 4. Koniec Sahary (Poziom 100 -> Cutscenki ucieczki z Sahary i lądowania w Górach -> Poziom 101: Góry!)
    if (currentLevelIdx === 99 && LEVELS.length > 100) {
        saveUnlockedLevelProgress(100);
        resetPlayerInputs();
        if (!isSpeedrunMode) {
            startCutscene('sahara_portal_escape', () => {
                startCutscene('mountain_cliff_arrival', () => {
                    gameState = 'PLAYING';
                    inGameHud.classList.remove('hidden');
                    updateTouchControlsVisibility();
                    loadLevel(100, false);
                });
            });
        } else {
            loadLevel(100, false);
        }
        return;
    }

    // 5. Zwykłe przejście do następnego poziomu lub Finał Poziomu 125
    if (currentLevelIdx < LEVELS.length - 1) {
        saveUnlockedLevelProgress(currentLevelIdx + 1);
        loadLevel(currentLevelIdx + 1, false);
    } else {
        saveUnlockedLevelProgress(LEVELS.length - 1);
        resetPlayerInputs();
        showFinalVictoryModal();
    }
}

const spearPoints = [
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

    // Prawy joystick pada (axes[2], axes[3]) do celowania 360°
    if (hasWep && isGamepadConnected && navigator.getGamepads) {
        const pads = navigator.getGamepads();
        for (let i = 0; i < pads.length; i++) {
            const pad = pads[i];
            if (pad && pad.connected && pad.axes && pad.axes.length >= 4) {
                const rx = pad.axes[2] || 0;
                const ry = pad.axes[3] || 0;
                if (rx * rx + ry * ry > 0.0576) {
                    weapon.targetAngle = Math.atan2(ry, rx);
                    weapon.angle = weapon.targetAngle;
                }
                break;
            }
        }
    }

    if (weapon.emptyWarnCooldown > 0) weapon.emptyWarnCooldown--;
    if (weapon.fireCooldown > 0) weapon.fireCooldown--;
    if (weapon.jamTimer > 0) {
        weapon.jamTimer--;
        if (weapon.jamTimer === 0) updateWeaponHUD();
    }
    if (weapon.muzzleFlashTimer > 0) weapon.muzzleFlashTimer--;
    if (weapon.recoilOffset > 0) {
        weapon.recoilOffset = Math.max(0, weapon.recoilOffset - 1.8);
    }

    // Obliczanie prędkości kątowej obrotu broni 360° (kręcenie bronią przyspiesza przeładowanie Rayguna!)
    const angleDelta = Math.abs(Math.atan2(
        Math.sin(weapon.angle - (weapon.prevAngle ?? weapon.angle)),
        Math.cos(weapon.angle - (weapon.prevAngle ?? weapon.angle))
    ));
    weapon.prevAngle = weapon.angle;

    if (weapon.spinBoostTimer > 0) weapon.spinBoostTimer--;

    if (weapon.reloadTimer > 0) {
        weapon.reloadTimer--;

        if (angleDelta > 0.035) {
            weapon.spinBoostTimer = 10;
            const spinAccel = Math.min(3.4, angleDelta * 10.5);
            weapon.reloadSpinAccum = (weapon.reloadSpinAccum || 0) + spinAccel;
            const bonusTicks = Math.floor(weapon.reloadSpinAccum);
            if (bonusTicks > 0) {
                weapon.reloadTimer = Math.max(0, weapon.reloadTimer - bonusTicks);
                weapon.reloadSpinAccum -= bonusTicks;
            }
            if ((tickCount & 1) === 0) {
                const sparkX = player.x + player.w * 0.5 + Math.cos(weapon.angle) * 28;
                const sparkY = player.y + player.h * 0.5 + Math.sin(weapon.angle) * 28;
                spawnParticles(sparkX, sparkY, '#22d3ee', 2, 2.6);
            }
        }

        if (weapon.reloadTimer <= 0) {
            weapon.reloadTimer = 0;
            weapon.reloadSpinAccum = 0;
            weapon.spinBoostTimer = 0;
            weapon.ammo = weapon.maxAmmo;
            sfx.play('raygun_reload');
            spawnFloatingText(player.x + player.w * 0.5, player.y - 12, '⚡ NAŁADOWANO (20/20)!', '#4ade80');
            updateWeaponHUD();
        } else if (weapon.reloadTimer % 5 === 0) {
            updateWeaponHUD();
        }
    }

    if (weapon.pokeExtension > 0) {
        weapon.pokeExtension = Math.max(0, weapon.pokeExtension - 1.2);
    }
    if (typeof lowEndMode !== 'undefined' && lowEndMode) {
        weapon.visualExt = weapon.pokeExtension;
        weapon.visualAngle = weapon.angle;
    } else {
        weapon.visualExt += (weapon.pokeExtension - weapon.visualExt) * 0.35;
        const diffA = Math.atan2(Math.sin(weapon.angle - (weapon.visualAngle || 0)), Math.cos(weapon.angle - (weapon.visualAngle || 0)));
        weapon.visualAngle = (weapon.visualAngle || 0) + diffA * 0.42;
    }

    const px = player.x + player.w * 0.5;
    const py = player.y + player.h * 0.5;
    const totalLen = weapon.length + weapon.pokeExtension;
    const cosA = Math.cos(weapon.angle);
    const sinA = Math.sin(weapon.angle);

    spearPoints[0].x = px + cosA * (totalLen * 0.55);
    spearPoints[0].y = py + sinA * (totalLen * 0.55);
    spearPoints[1].x = px + cosA * (totalLen * 0.82);
    spearPoints[1].y = py + sinA * (totalLen * 0.82);
    spearPoints[2].x = px + cosA * (totalLen * 1.06);
    spearPoints[2].y = py + sinA * (totalLen * 1.06);

    for (let i = enemies.length - 1; i >= 0; i--) {
        const e = enemies[i];
        if (e.type !== 'jetpack_rammer' && e.type !== 'raygun_drone') continue;

        e.vy = 0;
        const ex = e.x + e.w / 2;
        const ey = e.y + e.h / 2;
        const dx = px - ex;
        const dy = py - ey;
        const dist = Math.hypot(dx, dy);

        // Dziabnięcie bota Ostrzem Rdzeniowym 360° (tylko gdy wybrany jest Kij)
        if (hasWep && weapon.type === 'spear') {
            let poked = false;
            for (const sp of spearPoints) {
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
                projectiles.push({
                    x: ex + Math.cos(aimAngle) * 18,
                    y: ey + Math.sin(aimAngle) * 18,
                    vx: Math.cos(aimAngle) * boltSpeed,
                    vy: Math.sin(aimAngle) * boltSpeed,
                    r: 7,
                    isRaygun: true,
                    deflected: false
                });
                sfx.play('laser');
                spawnParticles(ex + Math.cos(aimAngle) * 18, ey + Math.sin(aimAngle) * 18, '#4ade80', 6, 3);
            }

            if (rectOverlap(player.x + 4, player.y + 4, player.w - 8, player.h - 8, e.x + 4, e.y + 4, e.w - 8, e.h - 8)) {
                killPlayer("Zderzyłeś się z latającym Raygun-Botem! Odbij w niego pocisk kijem lub dziabnij go z dystansu!");
                return;
            }
        }
    }

    // Odbijanie pocisków Kijem oraz trafianie pociskami gracza (Raygun / Odbite) we wrogów i ściany
    if (hasWep) {
        for (let i = projectiles.length - 1; i >= 0; i--) {
            const p = projectiles[i];
            if (!p.deflected && !p.isPlayerShot) {
                if (weapon.type === 'spear') {
                    let hitSpear = false;
                    for (const sp of spearPoints) {
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
                        for (const e of enemies) {
                            const ex = e.x + e.w / 2;
                            const ey = e.y + e.h / 2;
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
                }
            } else {
                // Kolizja pocisku gracza ze ścianą
                let hitWall = false;
                if (p.isPlayerShot) {
                    for (let sIdx = 0; sIdx < solids.length; sIdx++) {
                        const s = solids[sIdx];
                        if (!s.isPlatform && rectOverlap(p.x - p.r, p.y - p.r, p.r * 2, p.r * 2, s.x, s.y, s.w, s.h)) {
                            spawnParticles(p.x, p.y, '#22d3ee', 5, 3);
                            projectiles.splice(i, 1);
                            hitWall = true;
                            break;
                        }
                    }
                }
                if (hitWall) continue;

                // Kolizja pocisku gracza z wrogim pociskiem (zbijanie pocisków wroga!)
                let canceledEnemyProj = false;
                if (p.isPlayerShot) {
                    for (let k = projectiles.length - 1; k >= 0; k--) {
                        if (k === i) continue;
                        const other = projectiles[k];
                        if (!other.deflected && !other.isPlayerShot && Math.hypot(p.x - other.x, p.y - other.y) <= p.r + other.r + 4) {
                            spawnParticles(p.x, p.y, '#4ade80', 10, 4);
                            sfx.play('walljump');
                            const hi = Math.max(i, k);
                            const lo = Math.min(i, k);
                            projectiles.splice(hi, 1);
                            projectiles.splice(lo, 1);
                            i = Math.min(i, projectiles.length);
                            canceledEnemyProj = true;
                            break;
                        }
                    }
                }
                if (canceledEnemyProj) continue;

                // Trafienie we wroga (z obsługą wielokrotnego HP dla wytrzymałych Dinozaurów na Saharze!)
                let hitEnemy = false;
                for (let j = enemies.length - 1; j >= 0; j--) {
                    const e = enemies[j];
                    if (rectOverlap(p.x - p.r - 4, p.y - p.r - 4, (p.r + 4) * 2, (p.r + 4) * 2, e.x, e.y, e.w, e.h)) {
                        const ex = e.x + e.w / 2;
                        const ey = e.y + e.h / 2;
                        e.hp = (e.hp !== undefined ? e.hp : 1) - 1;
                        e.hitFlashTimer = 6;
                        e.chasingPlayer = true;

                        if (e.hp > 0) {
                            const kb = e.type === 'dino_rex' ? 2.2 : 4.5;
                            e.x = Math.max(e.minX, Math.min(e.maxX - e.w, e.x + Math.sign(p.vx) * kb));
                            sfx.play('stomp');
                            spawnParticles(p.x, p.y, '#facc15', 6, 3.5);
                        } else {
                            screenShake = e.type === 'dino_rex' ? 14 : 10;
                            sfx.play('boss_hit');
                            spawnParticles(ex, ey, '#4ade80', e.type === 'dino_rex' ? 30 : 20, 6);
                            spawnParticles(ex, ey, '#facc15', 16, 5);
                            const killLabel = (e.type === 'dino_rex' || e.type === 'dino_raptor') ? "🦖 POKONANY!" : "🎯 TRAFIONY!";
                            spawnFloatingText(ex, ey - 10, killLabel, "#4ade80");
                            enemies.splice(j, 1);
                        }
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

const activeColliders = [];
let _cachedDashLabel = null;
let _lastDashCooldown = -1;
let _lastDashReadyState = null;

function update() {
    tickCount++;
    const lvl = LEVELS[currentLevelIdx];

    keys.left = kbTouchInput.left || gamepadInput.left;
    keys.right = kbTouchInput.right || gamepadInput.right;

    if (!lowEndMode && (lvl.theme !== 'day' || lvl.transitionToTheme)) {
        for (const m of bgMotes) {
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
            if (cutsceneCharIndex < slide.text.length && tickCount % 2 === 0) {
                cutsceneCharIndex++;
                cutsceneTextEl.textContent = slide.text.slice(0, cutsceneCharIndex);
                const ch = slide.text[cutsceneCharIndex - 1];
                if (ch && ch !== ' ' && ch !== '*' && cutsceneCharIndex % 2 === 0) {
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

        for (const e of enemies) {
            e.x += Math.sign(e.vx) * e.baseSpeed;
            if (e.x <= e.minX) { e.x = e.minX; e.vx = Math.abs(e.vx); }
            else if (e.x + e.w >= e.maxX) { e.x = e.maxX - e.w; e.vx = -Math.abs(e.vx); }
            const tDir = Math.sign(e.vx) || 1;
            e.visualDir = lowEndMode ? tDir : ((e.visualDir ?? tDir) + (tDir - (e.visualDir ?? tDir)) * 0.18);
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
        const timerMod = lowEndMode ? 6 : 3;
        if (tickCount % timerMod === 0) {
            hudTimerEl.textContent = formatSpeedrunTime(speedrunTicks);
        }
    }

    if (levelTransitionAlpha > 0) {
        levelTransitionAlpha = Math.max(0, levelTransitionAlpha - (lowEndMode ? 0.12 : 0.055));
    }

    if (screenShake > 0) screenShake *= 0.85;
    if (screenShake < 0.4) screenShake = 0;

    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (!lowEndMode) p.vy += 0.18;
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
    if (player.dashCooldown !== _lastDashCooldown) {
        const shouldUpdateBar = !lowEndMode || player.dashCooldown === 0 || player.dashCooldown === 36 || (player.dashCooldown % 6 === 0);
        if (shouldUpdateBar) {
            _lastDashCooldown = player.dashCooldown;
            const dashPct = Math.max(0, Math.min(100, ((36 - player.dashCooldown) / 36) * 100));
            dashBar.style.width = `${dashPct}%`;
        }

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
        if (!lowEndMode || (tickCount & 1) === 0) particles.push(allocParticle(
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

    activeColliders.length = 0;
    for (let i = 0; i < solids.length; i++) activeColliders.push(solids[i]);
    for (let i = 0; i < invisBlocks.length; i++) {
        const ib = invisBlocks[i];
        if (ib.revealed) activeColliders.push(ib);
        if (ib.bumpProgress > 0) {
            ib.bumpProgress = Math.max(0, ib.bumpProgress - (lowEndMode ? 0.25 : 0.11));
            ib.bumpY = lowEndMode ? (ib.bumpProgress > 0 ? -4 : 0) : (-Math.sin(ib.bumpProgress * Math.PI) * 9);
        } else {
            ib.bumpY = 0;
        }
    }
    for (let i = 0; i < fallingFloors.length; i++) {
        activeColliders.push(fallingFloors[i]);
    }

    player.x += player.vx;
    if (player.x < 0) { player.x = 0; player.vx = 0; }
    const maxWorldW = lvl.width * TILE;
    if (player.x + player.w > maxWorldW) { player.x = maxWorldW - player.w; player.vx = 0; }

    player.wallDir = 0;
    for (const c of activeColliders) {
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
        for (const c of solids) {
            if (c.isPlatform || c.h < TILE * 1.5) continue;
            if (rectOverlap(player.x - 3, player.y + 4, player.w + 6, player.h - 8, c.x, c.y, c.w, c.h)) {
                player.wallDir = (player.x + player.w / 2 < c.x + c.w / 2) ? 1 : -1;
            }
        }
    }

    if (!player.onGround && player.wallDir !== 0 && player.vy > (isUnderwater ? 1.25 : 2.1) && ((player.wallDir === 1 && keys.right) || (player.wallDir === -1 && keys.left))) {
        player.vy = isUnderwater ? 1.25 : 2.1;
    }

    const wasPlayerOnGround = player.onGround;
    const prevY = player.y;
    player.y += player.vy;
    player.onGround = false;

    if (player.vy < 0) {
        for (const ib of invisBlocks) {
            if (!ib.revealed && prevY >= ib.y + ib.h - 6 && rectOverlap(player.x + 2, player.y, player.w - 4, player.h, ib.x, ib.y, ib.w, ib.h)) {
                ib.revealed = true;
                ib.bumpProgress = 1;
                ib.bumpY = -6;
                player.y = ib.y + ib.h;
                player.vy = 2.5;
                player.dashTimer = 0;
                sfx.play('troll');
                spawnParticles(ib.x + TILE / 2, ib.y + TILE, '#fbbf24', 10, 4);
                spawnFloatingText(ib.x + 20, ib.y - 4, "BĘC!", "#facc15");
            }
        }
    }

    for (const c of activeColliders) {
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

    if (!wasPlayerOnGround && player.onGround && !lowEndMode) {
        player.visualScaleX = 1.24;
        player.visualScaleY = 0.78;
    }

    if (wantsJump) {
        if (canJumpNow) {
            player.vy = isUnderwater ? -10.8 : -12.3;
            player.onGround = false;
            player.coyoteTimer = 0;
            player.jumpBufferTimer = 0;
            if (!lowEndMode) {
                player.visualScaleX = 0.78;
                player.visualScaleY = 1.26;
            }
            sfx.play('jump');
            spawnParticles(player.x + player.w / 2, player.y + player.h, isUnderwater ? '#bae6fd' : '#e2e8f0', 6, 2.5);
        } else if (player.wallDir !== 0) {
            player.vy = isUnderwater ? -10.2 : -11.8;
            player.vx = -player.wallDir * (isUnderwater ? 6.4 : 7.8);
            player.facing = -player.wallDir;
            player.wallJumpLock = 9;
            player.dashCooldown = 0;
            player.jumpBufferTimer = 0;
            if (!lowEndMode) {
                player.visualScaleX = 0.76;
                player.visualScaleY = 1.28;
            }
            sfx.play('walljump');
            spawnParticles(player.wallDir === 1 ? player.x + player.w : player.x, player.y + player.h / 2, '#c084fc', 10, 4);
        }
    }
    keys.jumpPressed = false;

    if (!lowEndMode) {
        player.visualFacing = (player.visualFacing ?? player.facing) + (player.facing - (player.visualFacing ?? player.facing)) * 0.25;
        const targetSX = player.dashTimer > 0 ? 1.26 : (player.onGround ? 1 : (1 - Math.min(0.14, Math.abs(player.vy) * 0.01)));
        const targetSY = player.dashTimer > 0 ? 0.78 : (player.onGround ? 1 : (1 + Math.min(0.16, Math.abs(player.vy) * 0.012)));
        player.visualScaleX = (player.visualScaleX ?? 1) + (targetSX - (player.visualScaleX ?? 1)) * 0.24;
        player.visualScaleY = (player.visualScaleY ?? 1) + (targetSY - (player.visualScaleY ?? 1)) * 0.24;

        // Brak pochylenia do przodu podczas zwykłego chodzenia po ziemi, zachowane płynne skręcanie w powietrzu i podczas Dasha
        const targetTilt = player.dashTimer > 0
            ? (player.facing * 0.075)
            : (player.onGround ? 0 : (player.vx * 0.022 - player.vy * player.facing * 0.005));
        player.visualTilt = (player.visualTilt ?? 0) + (targetTilt - (player.visualTilt ?? 0)) * 0.25;
    } else {
        player.visualFacing = player.facing;
        player.visualScaleX = 1;
        player.visualScaleY = 1;
        player.visualTilt = 0;
    }

    if (player.y > canvas.height + 24) {
        if (_dbgM && _dbgG) {
            player.y = 80;
            player.vy = -6;
        } else {
            killPlayer("Grawitacja zawsze wygrywa. Wpadłeś w przepaść!");
            return;
        }
    }

    for (const ff of fallingFloors) {
        if (ff.triggered) {
            if (ff.timer > 0) {
                ff.timer--;
            } else {
                ff.vy += 0.72;
                ff.y += ff.vy;
            }
        }
    }

for (const st of spikeTraps) {
        if (!st.triggered && player.x + player.w >= st.triggerX) {
            st.triggered = true;
            if (st.dir === 'up') st.extProgress = lowEndMode ? 1 : 0.08;
            sfx.play(st.dir === 'boulder' ? 'boss_wall_crash' : 'troll');
            if (st.dir === 'boulder') {
                spawnParticles(st.x + st.w * 0.5, st.y + 12, '#94a3b8', 8, 3.5);
            }
        }
        if (st.triggered && st.dir === 'up' && st.extProgress < 1) {
            st.extProgress = lowEndMode ? 1 : Math.min(1, st.extProgress + 0.15);
        }
        if (st.triggered && (st.dir === 'down' || st.dir === 'boulder')) {
            st.vy += st.dir === 'boulder' ? 0.76 : 0.68;
            st.y += st.vy;
            st.rot = (st.rot || 0) + 0.14;
        }
        const spikeActive = st.dir === 'up' ? (st.triggered && st.extProgress >= 0.45) : true;
        if (spikeActive) {
            const hitX = st.x + 5;
            const hitY = st.dir === 'up' ? st.y + 6 : st.y;
            const hitW = st.w - 10;
            const hitH = st.h - 8;
            if (rectOverlap(player.x + 3, player.y + 3, player.w - 6, player.h - 6, hitX, hitY, hitW, hitH)) {
                if (lvl.theme === 'mountain') {
                    killPlayer(st.dir === 'up' ? "Wpadłeś na lodowo-skalne kolce górskie!" : "Zmiażdżył Cię spadający z góry głaz! Użyj Dasha, gdy słyszysz huk kamieni!");
                } else if (lvl.theme === 'sahara') {
                    killPlayer(st.dir === 'up' ? "Wpadłeś na kolczastego kaktusa Sahary! Patrz pod nogi!" : "Spadający głaz piaskowca! Uważaj na sufit kanionu!");
                } else {
                    killPlayer(st.dir === 'up' ? "Zaskoczony kolcami z podłogi? Klasyk!" : "Patrz w górę! Spadające kolce!");
                }
                return;
            }
        }
    }

    // Aktualizacja Ostrza Rdzeniowego 360° oraz Jetpack-Botów i Raygun-Dronów
    updateWeaponAndAdvancedBots();
    if (player.dead) return;

    // Pozostali wrogowie (Robo, Mimic, Evad-Bot, Robo-Fish)
    for (const e of enemies) {
        if (e.type === 'jetpack_rammer' || e.type === 'raygun_drone') {
            // Ruch patrolowy w poziomie (gdy nie szarżują)
            if (e.type === 'raygun_drone' || e.ramState === 'patrol') {
                e.x += Math.sign(e.vx) * e.baseSpeed;
                if (e.x <= e.minX) { e.x = e.minX; e.vx = Math.abs(e.vx); }
                else if (e.x + e.w >= e.maxX) { e.x = e.maxX - e.w; e.vx = -Math.abs(e.vx); }
            }
            continue;
        }

        if (e.hitFlashTimer > 0) e.hitFlashTimer--;
        if (e.jumpCooldown > 0) e.jumpCooldown--;

        const dxToPlayer = (player.x + player.w / 2) - (e.x + e.w / 2);
        const distX = Math.abs(dxToPlayer);
        const distY = Math.abs((player.y + player.h / 2) - (e.y + e.h / 2));

        const applyEnemyVerticalPhysics = (triggerMimicHangOnLand = false) => {
            const wasJumping = e.jumped;
            e.vy += 0.55;
            if (e.vy > 12) e.vy = 12;
            e.y += e.vy;
            e.onGround = false;

            for (const c of activeColliders) {
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
                            spawnParticles(e.x + e.w / 2, e.y + e.h / 2, '#22d3ee', 12, 4);
                            spawnFloatingText(e.x + e.w / 2, e.y - 8, "⚡ ZAWIESZONY!", "#22d3ee");
                        }
                    } else if (e.vy < 0 && e.y - e.vy >= c.y + c.h - 14) {
                        e.y = c.y + c.h;
                        e.vy = 0;
                    }
                }
            }
        };
        
        // ====================================================================
        // NOWE ROBOTY JOHNA W GÓRACH (OD-DASHOWANIE OD POCISKÓW + LASERY)
        // ====================================================================
        if (
            e.type === 'john_dash_bot' ||
            e.type === 'john_laser_sniper' ||
            e.type === 'john_cryo_drone' ||
            e.type === 'john_vanguard' ||
            e.type === 'john_titan_mech'
        ) {
            if (e.dodgeCooldown > 0) e.dodgeCooldown--;
            if (e.dashVisualTimer > 0) e.dashVisualTimer--;
            if (e.cooldownTimer > 0) e.cooldownTimer--;

            const ex = e.x + e.w * 0.5;
            const ey = e.y + e.h * 0.5;
            const dyToPlayer = (player.y + player.h * 0.5) - ey;
            const dirToPlayer = dxToPlayer >= 0 ? 1 : -1;
            e.facing = dirToPlayer;

            // 1. RADAR BALISTYCZNY: Wykrywanie nadlatujących pocisków Dave'a i szybki OD-DASH!
            if (e.dodgeCooldown <= 0) {
                for (let pi = 0; pi < projectiles.length; pi++) {
                    const pr = projectiles[pi];
                    if (!pr.isPlayerShot && !pr.deflected) continue;
                    const pDistX = ex - pr.x;
                    const pDistY = ey - pr.y;
                    const pDist = Math.hypot(pDistX, pDistY);
                    // Sprawdź, czy pocisk leci w stronę tego bota
                    const headingTowardBot = (pr.vx * pDistX + pr.vy * pDistY) > 0;
                    if (headingTowardBot && pDist < 175 && Math.abs(pDistY) < e.h + 34) {
                        e.dodgeCooldown = e.type === 'john_dash_bot' ? 38 : (e.type === 'john_cryo_drone' ? 42 : 58);
                        e.dashVisualTimer = 14;
                        sfx.play('dash');
                        spawnParticles(ex, ey, '#38bdf8', 10, 4.5);
                        spawnFloatingText(ex, e.y - 10, "⚡ UNIK DASH!", "#38bdf8");

                        if (e.type === 'john_cryo_drone') {
                            // Powietrzny unik drona w górę lub w dół od linii strzału
                            const dodgeSignY = (pr.y >= ey) ? -1 : 1;
                            e.y = Math.max(48, Math.min(440, e.y + dodgeSignY * 54));
                            e.x = Math.max(e.minX, Math.min(e.maxX - e.w, e.x - Math.sign(pr.vx) * 36));
                        } else {
                            // Naziemny bot Johna od-dashowuje w górę i w bok
                            if (e.onGround) {
                                e.vy = e.type === 'john_titan_mech' ? -8.8 : -10.6;
                                e.onGround = false;
                                e.jumped = true;
                            }
                            const dashStep = (e.type === 'john_dash_bot' ? 56 : 42) * (Math.random() < 0.5 ? dirToPlayer : -dirToPlayer);
                            e.x = Math.max(e.minX, Math.min(e.maxX - e.w, e.x + dashStep));
                        }
                        break;
                    }
                }
            }

            // 2. Specyficzne zachowanie i wystrzeliwanie laserów (jak u Robota Evada, ale ulepszone!)
            if (e.type === 'john_cryo_drone') {
                const targetY = e.origY + Math.sin(tickCount * 0.07 + e.minX * 0.1) * 18;
                e.y += (targetY - e.y) * 0.12;
                e.x += Math.sign(e.vx) * e.baseSpeed;
                if (e.x <= e.minX) { e.x = e.minX; e.vx = Math.abs(e.baseSpeed); }
                else if (e.x + e.w >= e.maxX) { e.x = e.maxX - e.w; e.vx = -Math.abs(e.baseSpeed); }

                if (e.fireTimer === undefined) e.fireTimer = 50;
                e.fireTimer--;
                if (e.fireTimer <= 0 && distX < 420 && distY < 260) {
                    e.fireTimer = 68;
                    const aimA = Math.atan2(dyToPlayer, dxToPlayer);
                    projectiles.push({
                        x: ex + Math.cos(aimA) * 18,
                        y: ey + Math.sin(aimA) * 18,
                        vx: Math.cos(aimA) * 7.4,
                        vy: Math.sin(aimA) * 7.4,
                        r: 6.5
                    });
                    sfx.play('laser');
                    spawnParticles(ex + Math.cos(aimA) * 18, ey + Math.sin(aimA) * 18, '#38bdf8', 7, 3.2);
                }
            } else {
                // Jednostki naziemne: john_dash_bot, john_laser_sniper, john_vanguard, john_titan_mech
                const sightRange = e.type === 'john_laser_sniper' ? 340 : 280;
                const inLaserSight = (distX < sightRange && distY < 95 && e.cooldownTimer <= 0);

                if (e.chargeTimer > 0) {
                    e.chargeTimer--;
                    e.turboActive = true;
                    if (e.chargeTimer === 0) {
                        const shotDir = dirToPlayer;
                        const laserSpeed = e.type === 'john_laser_sniper' ? 8.6 : 7.6;
                        // Poziomy laser w stylu Evad-Bota (Snajper i Tytan strzelają podwójną wiązką!)
                        projectiles.push({
                            x: ex + shotDir * (e.w * 0.5 + 6),
                            y: ey - 2,
                            vx: shotDir * laserSpeed,
                            vy: 0,
                            r: 6.5
                        });
                        if (e.type === 'john_laser_sniper' || e.type === 'john_titan_mech') {
                            const aimAng = Math.atan2(dyToPlayer, dxToPlayer);
                            projectiles.push({
                                x: ex + shotDir * (e.w * 0.5 + 6),
                                y: ey + 5,
                                vx: Math.cos(aimAng) * (laserSpeed * 0.92),
                                vy: Math.sin(aimAng) * (laserSpeed * 0.92),
                                r: 6
                            });
                        }
                        sfx.play('laser');
                        spawnParticles(ex + shotDir * 18, ey, '#ef4444', 9, 3.5);
                        e.cooldownTimer = e.type === 'john_laser_sniper' ? 72 : (e.type === 'john_dash_bot' ? 82 : 90);
                        e.turboActive = false;
                    }
                } else if (inLaserSight) {
                    e.chargeTimer = e.type === 'john_laser_sniper' ? 24 : 30;
                    sfx.play('warn');
                } else {
                    // Aktywne ściganie i taktyczne dashe na platformie
                    const moveSpd = (distX < 260 ? e.baseSpeed * 1.35 : e.baseSpeed);
                    e.turboActive = distX < 260;
                    if (distX < 260 && distX > 18) {
                        e.vx = dirToPlayer * Math.abs(e.baseSpeed);
                    }
                    e.x += Math.sign(e.vx) * moveSpd;
                    if (e.x <= e.minX) { e.x = e.minX; e.vx = Math.abs(e.baseSpeed); }
                    else if (e.x + e.w >= e.maxX) { e.x = e.maxX - e.w; e.vx = -Math.abs(e.baseSpeed); }

                    // Skok szturmowy Tytana lub Dash-Bota, gdy gracz skacze wyżej
                    if (e.onGround && e.jumpCooldown <= 0 && distX < 150 && player.y + player.h < e.y + 10) {
                        e.vy = e.type === 'john_titan_mech' ? -9.5 : -10.8;
                        e.onGround = false;
                        e.jumped = true;
                        e.jumpCooldown = 55;
                        sfx.play('jump');
                    }
                }

                applyEnemyVerticalPhysics(false);
            }

            if (rectOverlap(player.x + 4, player.y + 4, player.w - 8, player.h - 8, e.x + 3, e.y + 3, e.w - 6, e.h - 6)) {
                killPlayer("Zostałeś zlikwidowany przez zaawansowanego bota górskiego Johna! Uważaj na ich uniki Dash i wiązki laserowe!");
                return;
            }
            continue;
        }
        
        if (e.type === 'dino_raptor') {
            if (distX < 360 && distY < 210) {
                e.chasingPlayer = true;
            } else if (distX > 520) {
                e.chasingPlayer = false;
            }

            const dirToPlayer = dxToPlayer >= 0 ? 1 : -1;

            if (e.chasingPlayer) {
                e.turboActive = true;
                e.facing = dirToPlayer;

                // Sprawdź, czy przed stopami Raptora kończy się platforma (przepaść między platformami)
                let groundAhead = false;
                const probeX = dirToPlayer > 0 ? (e.x + e.w + 6) : (e.x - 6);
                const probeY = e.y + e.h + 6;
                for (let ci = 0; ci < activeColliders.length; ci++) {
                    const col = activeColliders[ci];
                    if (probeX >= col.x && probeX <= col.x + col.w && probeY >= col.y && probeY <= col.y + col.h + 14) {
                        groundAhead = true;
                        break;
                    }
                }

                // Jeśli Raptor jest na ziemi i dobiega do krawędzi platformy (lub gracz jest wyżej/w zasięgu skoku),
                // przeskakuje przez przepaść prosto w stronę platformy Dave'a!
                const playerOnHigherPlatform = (player.y + player.h <= e.y + 6 && distX < 185);
                const atPlatformEdgeTowardPlayer = (!groundAhead && distX > 18);
                const inDirectPounceRange = (distX < 145 && distX > 26 && distY < 90);

                if (e.onGround && e.jumpCooldown <= 0 && (atPlatformEdgeTowardPlayer || playerOnHigherPlatform || inDirectPounceRange)) {
                    e.vy = (player.y < e.y - 24 || atPlatformEdgeTowardPlayer) ? -11.8 : -10.4;
                    e.leapVx = dirToPlayer * Math.max(4.6, e.baseSpeed * 1.92);
                    e.vx = e.leapVx;
                    e.jumped = true;
                    e.onGround = false;
                    e.jumpCooldown = 38;
                    sfx.play('jump');
                }

                const moveVx = !e.onGround
                    ? (e.leapVx !== undefined ? e.leapVx : dirToPlayer * e.baseSpeed * 1.8)
                    : (distX > 8 ? dirToPlayer * e.baseSpeed * 1.62 : 0);

                e.x += moveVx;

                // Kolizja ze ścianą boczną (jeśli trafi na wyższy stopień, wskakuje na niego!)
                for (let ci = 0; ci < activeColliders.length; ci++) {
                    const col = activeColliders[ci];
                    if (!col.isPlatform && rectOverlap(e.x, e.y + 4, e.w, e.h - 8, col.x, col.y, col.w, col.h)) {
                        if (moveVx > 0) e.x = col.x - e.w;
                        else if (moveVx < 0) e.x = col.x + col.w;
                        if (e.onGround && e.jumpCooldown <= 0) {
                            e.vy = -11.6;
                            e.leapVx = dirToPlayer * Math.max(4.2, e.baseSpeed * 1.75);
                            e.onGround = false;
                            e.jumped = true;
                            e.jumpCooldown = 32;
                            sfx.play('jump');
                        }
                        break;
                    }
                }
            } else {
                // Zwykły patrol, gdy gracz jest daleko
                e.turboActive = false;
                e.x += Math.sign(e.vx) * e.baseSpeed;
                if (e.x <= e.minX) { e.x = e.minX; e.vx = Math.abs(e.baseSpeed); }
                else if (e.x + e.w >= e.maxX) { e.x = e.maxX - e.w; e.vx = -Math.abs(e.baseSpeed); }
                e.facing = Math.sign(e.vx) || 1;
            }

            // Fizyka pionowa Raptora + aktualizacja granic nowej platformy po wylądowaniu
            e.vy += 0.55;
            if (e.vy > 12) e.vy = 12;
            e.y += e.vy;
            e.onGround = false;
            for (let ci = 0; ci < activeColliders.length; ci++) {
                const c = activeColliders[ci];
                if (rectOverlap(e.x, e.y, e.w, e.h, c.x, c.y, c.w, c.h)) {
                    if (e.vy >= 0 && e.y + e.h - e.vy <= c.y + 16) {
                        e.y = c.y - e.h;
                        e.vy = 0;
                        e.onGround = true;
                        e.jumped = false;
                        e.leapVx = undefined;
                        // Aktualizuj granice platformy na tę, na której wylądował Raptor
                        e.minX = c.x;
                        e.maxX = c.x + c.w;
                    } else if (!c.isPlatform && e.vy < 0 && e.y - e.vy >= c.y + c.h - 14) {
                        e.y = c.y + c.h;
                        e.vy = 0;
                    }
                }
            }

            // Jeśli Raptor wpadł w przepaść poza ekranem, usuń go bezpiecznie
            if (e.y > canvas.height + 70) {
                e.hp = 0;
                const idxR = enemies.indexOf(e);
                if (idxR !== -1) enemies.splice(idxR, 1);
                continue;
            }

            if (rectOverlap(player.x + 4, player.y + 4, player.w - 8, player.h - 8, e.x + 3, e.y + 3, e.w - 6, e.h - 6)) {
                killPlayer("Dopadł Cię skaczący między platformami Dino-Raptor! Używaj Rayguna w biegu!");
                return;
            }
            continue;
        }

        if (e.type === 'dino_rex') {
            if (distX < 400 && distY < 200) {
                e.chasingPlayer = true;
            } else if (distX > 520) {
                e.chasingPlayer = false;
            }

            const playerCenterX = player.x + player.w * 0.5;
            const dirToPlayer = dxToPlayer >= 0 ? 1 : -1;
            const playerOnRexPlatform = (
                playerCenterX >= e.minX - 24 &&
                playerCenterX <= e.maxX + 24 &&
                Math.abs((player.y + player.h) - (e.y + e.h)) < 75
            );

            if (e.chasingPlayer) {
                e.facing = dirToPlayer;
                if (playerOnRexPlatform) {
                    // Gracz jest na tej samej platformie -> T-Rex szarżuje na niego!
                    e.roaring = false;
                    e.turboActive = true;
                    if (distX > 12) {
                        e.vx = dirToPlayer * Math.abs(e.baseSpeed);
                        e.x += dirToPlayer * (e.baseSpeed * 1.38);
                    }
                    e.x = Math.max(e.minX, Math.min(e.maxX - e.w, e.x));

                    // Ciężki podskok tylko gdy gracz próbuje przeskoczyć bezpośrednio nad T-Rexem
                    if (e.onGround && e.jumpCooldown <= 0 && distX < 92 && player.y + player.h < e.y + 18 && player.y > e.y - 90) {
                        e.vy = -8.2;
                        e.jumped = true;
                        e.onGround = false;
                        e.jumpCooldown = 78;
                        sfx.play('boss_wall_crash');
                    }
                } else {
                    // Gracz jest na INNEJ platformie -> T-Rex podchodzi blisko krawędzi, czeka zwrócony w stronę Dave'a i DRZE SIĘ (RYCZY)!
                    const targetEdgeX = Math.max(e.minX + 2, Math.min(e.maxX - e.w - 2, playerCenterX - e.w * 0.5));
                    const diffEdge = targetEdgeX - e.x;

                    if (Math.abs(diffEdge) > 6) {
                        e.roaring = false;
                        e.turboActive = true;
                        const stepDir = Math.sign(diffEdge);
                        e.vx = stepDir * Math.abs(e.baseSpeed);
                        e.x += stepDir * (e.baseSpeed * 1.22);
                        e.x = Math.max(e.minX, Math.min(e.maxX - e.w, e.x));
                    } else {
                        // Stoi przy samej krawędzi bliżej gracza, czeka i ryczy!
                        e.x = targetEdgeX;
                        e.turboActive = false;
                        e.roaring = true;
                        e.roarTimer = (e.roarTimer || 0) + 1;
                        if (e.roarTimer % 75 === 8) {
                            sfx.play('boss_charge_warn');
                            if (distX < 310 && screenShake < 4) screenShake = 3.5;
                            spawnFloatingText(e.x + e.w * 0.5, e.y - 18, "🦖 ROOOAAAR!!", "#fb923c");
                        }
                    }
                }
            } else {
                // Spokojny patrol, gdy gracz jest daleko
                e.roaring = false;
                e.turboActive = false;
                e.x += Math.sign(e.vx) * e.baseSpeed;
                if (e.x <= e.minX) { e.x = e.minX; e.vx = Math.abs(e.baseSpeed); }
                else if (e.x + e.w >= e.maxX) { e.x = e.maxX - e.w; e.vx = -Math.abs(e.baseSpeed); }
                e.facing = Math.sign(e.vx) || 1;
            }

            applyEnemyVerticalPhysics(false);

            if (rectOverlap(player.x + 4, player.y + 4, player.w - 8, player.h - 8, e.x + 4, e.y + 4, e.w - 8, e.h - 8)) {
                killPlayer("Zostałeś stratowany przez potężnego Dino-Rexa! Trzymaj dystans i ostrzeliwuj go z Rayguna!");
                return;
            }
            continue;
        }

        if (e.type === 'robo_fish') {
            const dyToPlayer = (player.y + player.h / 2) - (e.y + e.h / 2);
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
                for (const c of activeColliders) {
                    if (rectOverlap(e.x, e.y, e.w, e.h, c.x, c.y, c.w, c.h)) { e.x -= e.vx; break; }
                }
                e.y += e.vy;
                for (const c of activeColliders) {
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
                applyEnemyVerticalPhysics(false);

                if (player.vy > 0 && rectOverlap(player.x + 2, player.y + 2, player.w - 4, player.h - 2, e.x + 2, e.y - 4, e.w - 4, 16)) {
                    player.y = e.y - player.h - 2;
                    player.vy = -12.0;
                    player.dashCooldown = 0;
                    e.hungTimer = e.maxHungTimer;
                    sfx.play('walljump');
                    spawnParticles(e.x + e.w / 2, e.y, '#22d3ee', 10, 4);
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
                    spawnParticles(e.x + e.w / 2, e.y + e.h / 2, '#facc15', 10, 3.5);
                    spawnFloatingText(e.x + e.w / 2, e.y - 8, "⚡ ZAWIESZONY!", "#22d3ee");
                }
            } else if (e.x + e.w >= e.maxX) {
                e.x = e.maxX - e.w;
                e.vx = -Math.abs(e.vx);
                if (e.chasingPlayer && playerNear) {
                    e.hungTimer = e.maxHungTimer;
                    e.chasingPlayer = false;
                    sfx.play('boss_glitch');
                    spawnParticles(e.x + e.w / 2, e.y + e.h / 2, '#facc15', 10, 3.5);
                    spawnFloatingText(e.x + e.w / 2, e.y - 8, "⚡ ZAWIESZONY!", "#22d3ee");
                }
            }

            applyEnemyVerticalPhysics(true);

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
                applyEnemyVerticalPhysics(false);
                if (player.vy > 0 && rectOverlap(player.x + 2, player.y + 2, player.w - 4, player.h - 2, e.x + 2, e.y - 4, e.w - 4, 16)) {
                    player.y = e.y - player.h - 2;
                    player.vy = -12.4;
                    player.dashCooldown = 0;
                    e.hungTimer = 135;
                    sfx.play('stomp');
                    spawnParticles(e.x + e.w / 2, e.y, '#38bdf8', 12, 4);
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
                        x: e.x + e.w / 2 + shotDir * 16,
                        y: e.y + 15,
                        vx: shotDir * 6.4,
                        vy: 0,
                        r: 6
                    });
                    sfx.play('laser');
                    spawnParticles(e.x + e.w / 2 + shotDir * 16, e.y + 15, '#ef4444', 8, 3);
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

            applyEnemyVerticalPhysics(false);

            if (player.vy > 0 && e.chargeTimer <= 0 && rectOverlap(player.x + 2, player.y + 2, player.w - 4, player.h - 2, e.x + 2, e.y - 4, e.w - 4, 15)) {
                player.y = e.y - player.h - 2;
                player.vy = -12.2;
                player.dashCooldown = 0;
                e.hungTimer = 135;
                sfx.play('stomp');
                spawnParticles(e.x + e.w / 2, e.y, '#ef4444', 12, 4);
                spawnFloatingText(e.x + e.w / 2, e.y - 8, "⚡ OGŁUSZONY!", "#38bdf8");
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

        applyEnemyVerticalPhysics(false);

        if (rectOverlap(player.x + 4, player.y + 4, player.w - 8, player.h - 8, e.x + 4, e.y + 4, e.w - 8, e.h - 8)) {
            killPlayer("Zostałeś zezłomowany przez Robo-Kwadrat!");
            return;
        }
    }

    if (!lowEndMode) {
        for (let i = 0; i < enemies.length; i++) {
            const e = enemies[i];
            const rawDir = (e.type === 'evad_bot' || e.type === 'robo_fish' || e.type === 'jetpack_rammer' || e.type === 'raygun_drone' || e.type === 'dino_raptor' || e.type === 'dino_rex' || e.type === 'john_dash_bot' || e.type === 'john_laser_sniper' || e.type === 'john_cryo_drone' || e.type === 'john_vanguard' || e.type === 'john_titan_mech')
                ? (e.facing || Math.sign(e.vx) || 1)
                : (Math.sign(e.vx) || 1);
            e.visualDir = (e.visualDir ?? rawDir) + (rawDir - (e.visualDir ?? rawDir)) * 0.18;
            const targetSY = (!e.onGround && e.vy < -1) ? 1.18 : 1;
            e.visualScaleY = (e.visualScaleY ?? 1) + (targetSY - (e.visualScaleY ?? 1)) * 0.22;
        }
    }

    for (const fg of fakeGoals) {
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

