// ============================================================================
// MODUŁ 9: STEROWANIE EKRANAMI, WEJŚCIE (KLAWIATURA, MYSZ, PAD, DOTYK) I PĘTLA GRY
// ============================================================================
function updateTouchControlsVisibility() {
    if (!touchControls) return;
    const submitModal = document.getElementById('submit-score-modal');
    const anyModalOpen =
        !mainMenuOverlay.classList.contains('hidden') ||
        !pauseMenuOverlay.classList.contains('hidden') ||
        !settingsModal.classList.contains('hidden') ||
        !levelsModal.classList.contains('hidden') ||
        !cutsceneOverlay.classList.contains('hidden') ||
        !victoryOverlay.classList.contains('hidden') ||
        (submitModal && !submitModal.classList.contains('hidden'));

    if (gameState !== 'PLAYING' || anyModalOpen || isGamepadConnected || touchMode === 'OFF') {
        touchControls.classList.add('touch-state-hidden');
    } else {
        touchControls.classList.remove('touch-state-hidden');
    }

    const joyWrapEl = document.getElementById('touch-weapon-joy-wrap');
    if (joyWrapEl) {
        if (playerHasWeapon() && gameState === 'PLAYING' && !anyModalOpen) {
            joyWrapEl.classList.remove('hidden');
            const joyTextEl = joyWrapEl.querySelector('div');
            if (joyTextEl) {
                joyTextEl.textContent = (typeof playerHasRaygun === 'function' && playerHasRaygun()) ? 'RAYGUN' : 'KIJ';
            }
        } else {
            joyWrapEl.classList.add('hidden');
        }
    }
}

function startGame(levelIndex = savedPlayerLevelIdx, speedrun = false, ohko = false) {
    const lbWidget = document.getElementById('leaderboard-widget');
    if (lbWidget) lbWidget.classList.add('hidden');

    music.unlock();
    if (orientationLockMode === 'AUTO' || orientationLockMode === 'ON') {
        attemptLandscapeLock(false);
    }
    isSpeedrunMode = speedrun;
    isOhkoMode = ohko;

    if (isSpeedrunMode || isOhkoMode) {
        deathCount = 0;
        deathCountEl.textContent = '0';
        speedrunTicks = 0;
        sessionPlayTicks = 0;
        hudTimerEl.textContent = '00:00.00';
    } else if (levelIndex === 0) {
        sessionPlayTicks = 0;
    }

    if (isSpeedrunMode) {
        hudTimerPill.classList.remove('hidden');
        hudTimerPill.classList.add('flex');
    } else {
        hudTimerPill.classList.add('hidden');
        hudTimerPill.classList.remove('flex');
    }

    if (isOhkoMode) {
        hudOhkoPill.classList.remove('hidden');
        hudOhkoPill.classList.add('flex');
    } else {
        hudOhkoPill.classList.add('hidden');
        hudOhkoPill.classList.remove('flex');
    }

    // Ukryj przycisk wysyłania wyniku w menu pauzy podczas Speedrunu (w Speedrunie wysyłamy tylko na końcu gry)
    const pauseSubmitBtn = document.getElementById('btn-pause-submit-score');
    if (pauseSubmitBtn) {
        if (isSpeedrunMode) {
            pauseSubmitBtn.classList.add('hidden');
        } else {
            pauseSubmitBtn.classList.remove('hidden');
        }
    }

    menuFadeAlpha = 0;
    menuFadeState = 'NONE';
    mainMenuOverlay.classList.add('hidden');
    pauseMenuOverlay.classList.add('hidden');
    settingsModal.classList.add('hidden');
    levelsModal.classList.add('hidden');
    victoryOverlay.classList.add('hidden');
    closeSubmitScoreModal();
    clearGamepadFocusHighlights();

    if (levelIndex === 0 && !isSpeedrunMode && !isOhkoMode && !introSeen) {
        introSeen = true;
        loadLevel(0, false);
        startCutscene('intro', () => {
            gameState = 'PLAYING';
            inGameHud.classList.remove('hidden');
            updateTouchControlsVisibility();
            loadLevel(0, false);
        });
        return;
    }

    gameState = 'PLAYING';
    inGameHud.classList.remove('hidden');
    updateTouchControlsVisibility();
    loadLevel(levelIndex, false);
}

function togglePause() {
    const submitModal = document.getElementById('submit-score-modal');
    if (submitModal && !submitModal.classList.contains('hidden')) {
        closeSubmitScoreModal();
        return;
    }
    if (gameState === 'PLAYING') {
        sfx.play('ui_pause');
        gameState = 'PAUSED';
        pauseMenuOverlay.classList.remove('hidden');
        activeMenuContext = null;
        updateTouchControlsVisibility();
        syncMusicForState();
    } else if (gameState === 'PAUSED') {
        sfx.play('ui_select');
        gameState = 'PLAYING';
        pauseMenuOverlay.classList.add('hidden');
        settingsModal.classList.add('hidden');
        clearGamepadFocusHighlights();
        activeMenuContext = null;
        updateTouchControlsVisibility();
        syncMusicForState();
    }
}

function returnToMainMenu() {
    sfx.play('ui_back');
    gameState = 'MENU';
    isSpeedrunMode = false;
    isOhkoMode = false;
    menuCycleTimer = 0;
    menuFadeState = 'NONE';
    menuFadeAlpha = 0;
    pauseMenuOverlay.classList.add('hidden');
    settingsModal.classList.add('hidden');
    levelsModal.classList.add('hidden');
    cutsceneOverlay.classList.add('hidden');
    victoryOverlay.classList.add('hidden');
    deathOverlay.classList.add('hidden');
    const submitModal = document.getElementById('submit-score-modal');
    if (submitModal) submitModal.classList.add('hidden');
    inGameHud.classList.add('hidden');
    bossHud.classList.add('hidden');
    chapterBanner.classList.add('hidden');
    mainMenuOverlay.classList.remove('hidden');

    const lbWidget = document.getElementById('leaderboard-widget');
    if (lbWidget) {
        lbWidget.classList.remove('hidden');
        if (!isLeaderboardMinimized) {
            lootLocker.fetchLeaderboard(activeLeaderboardTab);
        }
    }

    activeMenuContext = null;
    updateTouchControlsVisibility();
    loadLevel(MENU_SHOWCASE_LEVELS[menuShowcasePos], true);
}


// ============================================================================
// NAWIGACJA KLAWIATURĄ I GAMEPADEM W MENU I MODALACH
// ============================================================================
let activeMenuContext = null;
let activeMenuIndex = 0;

const _submitModalEl = document.getElementById('submit-score-modal');

function getActiveMenuInfo() {
    const submitModal = _submitModalEl || document.getElementById('submit-score-modal');
    if (gameState === 'PLAYING' &&
        (!submitModal || submitModal.classList.contains('hidden')) &&
        settingsModal.classList.contains('hidden') &&
        levelsModal.classList.contains('hidden') &&
        pauseMenuOverlay.classList.contains('hidden') &&
        victoryOverlay.classList.contains('hidden') &&
        mainMenuOverlay.classList.contains('hidden')) {
        return null;
    }
    if (submitModal && !submitModal.classList.contains('hidden')) {
        return {
            id: 'SUBMIT_SCORE',
            cols: 1,
            items: [
                document.getElementById('btn-select-mode-speedrun'),
                document.getElementById('btn-select-mode-ohko'),
                document.getElementById('btn-confirm-submit-score'),
                document.getElementById('btn-cancel-submit-score')
            ].filter(Boolean)
        };
    }
    if (!settingsModal.classList.contains('hidden')) {
        return {
            id: 'SETTINGS',
            cols: 1,
            items: [
                document.getElementById('btn-save-nickname'),
                document.getElementById('btn-toggle-mute'),
                document.getElementById('slider-music-vol'),
                document.getElementById('slider-sfx-vol'),
                document.getElementById('btn-toggle-touch'),
                document.getElementById('btn-toggle-graphics'),
                document.getElementById('btn-toggle-shake'),
                document.getElementById('btn-toggle-speed'),
                document.getElementById('btn-toggle-radar'),
                document.getElementById('btn-toggle-contrast'),
                document.getElementById('btn-toggle-jump-assist'),
                document.getElementById('btn-settings-save'),
                document.getElementById('btn-settings-close')
            ].filter(Boolean)
        };
    }
    if (!levelsModal.classList.contains('hidden')) {
        const gridButtons = Array.from(document.querySelectorAll('#levels-grid button'));
        const stepBackBtn = document.getElementById('btn-levels-step-back');
        const unlockAllBtn = document.getElementById('btn-levels-unlock-all');
        const extraBtns = [];
        if (stepBackBtn && !stepBackBtn.classList.contains('hidden')) extraBtns.push(stepBackBtn);
        if (unlockAllBtn && !unlockAllBtn.classList.contains('hidden')) extraBtns.push(unlockAllBtn);
        extraBtns.push(document.getElementById('btn-levels-back'));
        return {
            id: `LEVELS_STEP_${levelSelectStep}_${selectedChapterIdx}_${selectedActIdx}`,
            cols: (levelSelectStep === 1 || levelSelectStep === 3) && window.innerWidth >= 640 ? 2 : 1,
            items: [...gridButtons, ...extraBtns].filter(Boolean)
        };
    }
    if (!victoryOverlay.classList.contains('hidden')) {
        return {
            id: 'VICTORY',
            cols: 1,
            items: [
                (isSpeedrunMode || isOhkoMode) ? document.getElementById('btn-victory-submit-score') : null,
                document.getElementById('btn-play-again'),
                document.getElementById('btn-victory-menu')
            ].filter(Boolean)
        };
    }
    if (!pauseMenuOverlay.classList.contains('hidden')) {
        return {
            id: 'PAUSE',
            cols: 1,
            items: [
                document.getElementById('btn-pause-resume'),
                document.getElementById('btn-pause-restart'),
                !isSpeedrunMode ? document.getElementById('btn-pause-submit-score') : null,
                document.getElementById('btn-pause-settings'),
                document.getElementById('btn-pause-mainmenu')
            ].filter(Boolean)
        };
    }
    if (!mainMenuOverlay.classList.contains('hidden')) {
        return {
            id: 'MAIN_MENU',
            cols: 1,
            items: [
                document.getElementById('btn-menu-play'),
                document.getElementById('btn-menu-speedrun'),
                document.getElementById('btn-menu-ohko'),
                document.getElementById('btn-menu-levels'),
                document.getElementById('btn-menu-settings')
            ].filter(Boolean)
        };
    }
    return null;
}

function clearGamepadFocusHighlights() {
    document.querySelectorAll('.gamepad-focus').forEach(el => el.classList.remove('gamepad-focus'));
}

function applyGamepadMenuFocus(menuInfo) {
    clearGamepadFocusHighlights();
    if (!menuInfo || !menuInfo.items.length) return;
    activeMenuIndex = Math.max(0, Math.min(menuInfo.items.length - 1, activeMenuIndex));
    const targetEl = menuInfo.items[activeMenuIndex];
    if (targetEl) {
        targetEl.classList.add('gamepad-focus');
        if (menuInfo.id.startsWith('LEVELS_STEP_')) {
            targetEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
    }
}

function isBtnPressed(btn, threshold = 0.35) {
    if (!btn) return false;
    return typeof btn === 'object' ? (btn.pressed || btn.value >= threshold) : btn >= threshold;
}

window.addEventListener('gamepadconnected', () => {
    isGamepadConnected = true;
    if (gamepadStatusBadge) {
        gamepadStatusBadge.classList.remove('hidden');
        gamepadStatusBadge.classList.add('inline-flex');
    }
    updateTouchControlsVisibility();
});

window.addEventListener('gamepaddisconnected', () => {
    const pads = navigator.getGamepads ? Array.from(navigator.getGamepads()).filter(Boolean) : [];
    if (pads.length === 0) {
        isGamepadConnected = false;
        if (gamepadStatusBadge) {
            gamepadStatusBadge.classList.add('hidden');
            gamepadStatusBadge.classList.remove('inline-flex');
        }
    }
    gamepadInput.left = false;
    gamepadInput.right = false;
    updateTouchControlsVisibility();
});

function pollGamepad(timestamp) {
    if (!navigator.getGamepads) return;
    const gamepads = navigator.getGamepads();
    let pad = null;
    for (let i = 0; i < gamepads.length; i++) {
        if (gamepads[i] && gamepads[i].connected) {
            pad = gamepads[i];
            break;
        }
    }

    if (!pad) {
        gamepadInput.left = false;
        gamepadInput.right = false;
        return;
    }

    if (!isGamepadConnected) {
        isGamepadConnected = true;
        updateTouchControlsVisibility();
    }

    const btnCross    = isBtnPressed(pad.buttons[0]);
    const btnCircle   = isBtnPressed(pad.buttons[1]);
    const btnSquare   = isBtnPressed(pad.buttons[2]);
    const btnTriangle = isBtnPressed(pad.buttons[3]);
    const btnL1       = isBtnPressed(pad.buttons[4]);
    const btnR1       = isBtnPressed(pad.buttons[5]);
    const btnR2       = isBtnPressed(pad.buttons[7], 0.25);
    const btnShare    = isBtnPressed(pad.buttons[8]);
    const btnOptions  = isBtnPressed(pad.buttons[9]);

    const dpadUp      = isBtnPressed(pad.buttons[12]);
    const dpadDown    = isBtnPressed(pad.buttons[13]);
    const dpadLeft    = isBtnPressed(pad.buttons[14]);
    const dpadRight   = isBtnPressed(pad.buttons[15]);

    const stickX      = pad.axes && pad.axes.length > 0 ? pad.axes[0] : 0;
    const stickY      = pad.axes && pad.axes.length > 1 ? pad.axes[1] : 0;
    const DEADZONE    = 0.28;

    const moveLeft  = dpadLeft  || stickX < -DEADZONE;
    const moveRight = dpadRight || stickX > DEADZONE;
    const moveUp    = dpadUp    || stickY < -0.5;
    const moveDown  = dpadDown  || stickY > 0.5;

    if (gameState === 'CUTSCENE') {
        const confirmNow = btnCross || btnSquare;
        if (confirmNow && !gamepadInput.prevConfirm) {
            music.unlock();
            advanceCutscene();
        }
        gamepadInput.prevConfirm = confirmNow;

        const skipNow = btnCircle || btnOptions;
        if (skipNow && !gamepadInput.prevBack) {
            music.unlock();
            finishCutscene();
        }
        gamepadInput.prevBack = skipNow;
        gamepadInput.prevOptions = btnOptions;
        return;
    }

    if (btnOptions && !gamepadInput.prevOptions) {
        music.unlock();
        togglePause();
    }
    gamepadInput.prevOptions = btnOptions;

    const menuInfo = getActiveMenuInfo();
    if (menuInfo) {
        gamepadInput.left = false;
        gamepadInput.right = false;

        if (activeMenuContext !== menuInfo.id) {
            activeMenuContext = menuInfo.id;
            activeMenuIndex = 0;
            applyGamepadMenuFocus(menuInfo);
        }

        if (timestamp >= gamepadInput.navCooldownUntil) {
            const focusedEl = menuInfo.items[activeMenuIndex];
            const isRangeSlider = focusedEl && focusedEl.tagName === 'INPUT' && focusedEl.type === 'range';

            if (moveUp) {
                activeMenuIndex = (activeMenuIndex - 1 + menuInfo.items.length) % menuInfo.items.length;
                applyGamepadMenuFocus(menuInfo);
                sfx.play('ui_move');
                gamepadInput.navCooldownUntil = timestamp + 180;
            } else if (moveDown) {
                activeMenuIndex = (activeMenuIndex + 1) % menuInfo.items.length;
                applyGamepadMenuFocus(menuInfo);
                sfx.play('ui_move');
                gamepadInput.navCooldownUntil = timestamp + 180;
            } else if (moveLeft && isRangeSlider) {
                focusedEl.value = Math.max(0, parseInt(focusedEl.value, 10) - 5);
                focusedEl.dispatchEvent(new Event('input'));
                sfx.play('ui_move');
                gamepadInput.navCooldownUntil = timestamp + 110;
            } else if (moveRight && isRangeSlider) {
                focusedEl.value = Math.min(100, parseInt(focusedEl.value, 10) + 5);
                focusedEl.dispatchEvent(new Event('input'));
                sfx.play('ui_move');
                gamepadInput.navCooldownUntil = timestamp + 110;
            }
        }

        const confirmPressed = btnCross || btnSquare;
        if (confirmPressed && !gamepadInput.prevConfirm) {
            music.unlock();
            const targetEl = menuInfo.items[activeMenuIndex];
            if (targetEl && typeof targetEl.click === 'function') {
                targetEl.click();
            }
        }
        gamepadInput.prevConfirm = confirmPressed;
        gamepadInput.prevBack = btnCircle;
        return;
    }

    if (activeMenuContext !== null) {
        activeMenuContext = null;
        clearGamepadFocusHighlights();
    }

    gamepadInput.left = moveLeft;
    gamepadInput.right = moveRight;

    const jumpNow = dpadUp || btnCross || btnSquare;
    if (jumpNow && !gamepadInput.prevJump) {
        music.unlock();
        keys.jumpPressed = true;
    }
    gamepadInput.prevJump = jumpNow;

    const dashNow = btnCircle || btnTriangle || btnR2;
    if (dashNow && !gamepadInput.prevDash) {
        music.unlock();
        if (player.dead) keys.jumpPressed = true;
        else keys.dashPressed = true;
    }
    gamepadInput.prevDash = dashNow;

    if (btnL1 && !gamepadInput.prevL1) {
        if (typeof switchPlayerWeaponType === 'function') switchPlayerWeaponType();
    }
    gamepadInput.prevL1 = btnL1;

    if (btnR1 && !gamepadInput.prevR1) {
        if (typeof playerHasRaygun === 'function' && playerHasRaygun()) {
            firePlayerRaygun();
        } else if (playerHasWeapon()) {
            weapon.pokeExtension = 14;
            sfx.play('dash');
        }
    }
    gamepadInput.prevR1 = btnR1;

    if (btnShare && !gamepadInput.prevBack) {
        loadLevel(currentLevelIdx, false);
    }
    gamepadInput.prevBack = btnShare;
    gamepadInput.prevConfirm = btnCross || btnSquare;
}

// ============================================================================
// OBSŁUGA MYSZY, KLAWIATURY, PRZYCISKÓW UI I JOYSTICKA 360°
// ============================================================================
window.addEventListener('mousemove', (e) => {
    if (gameState !== 'PLAYING' || !playerHasWeapon()) return;
    if (cachedCanvasRect.width <= 0 || cachedCanvasRect.height <= 0) refreshCanvasRectCache();

    const scaleX = canvas.width / cachedCanvasRect.width;
    const scaleY = canvas.height / cachedCanvasRect.height;
    const canvasX = (e.clientX - cachedCanvasRect.left) * scaleX;
    const canvasY = (e.clientY - cachedCanvasRect.top) * scaleY;

    const worldMouseX = canvasX + cameraX;
    const worldMouseY = canvasY;
    const px = player.x + player.w * 0.5;
    const py = player.y + player.h * 0.5;

    weapon.targetAngle = Math.atan2(worldMouseY - py, worldMouseX - px);
    weapon.angle = weapon.targetAngle;
}, { passive: true });

canvas.addEventListener('mousedown', (e) => {
    if (gameState !== 'PLAYING' || !playerHasWeapon()) return;
    if (e.button === 2) {
        if (_dbgM) {
            e.preventDefault();
            if (typeof switchPlayerWeaponType === 'function') switchPlayerWeaponType();
        }
        return;
    }
    if (e.button === 0) {
        if (typeof playerHasRaygun === 'function' && playerHasRaygun()) {
            firePlayerRaygun(e);
        } else {
            weapon.pokeExtension = 14;
            sfx.play('dash');
        }
    }
});
canvas.addEventListener('contextmenu', (e) => {
    if (gameState === 'PLAYING' && playerHasWeapon()) e.preventDefault();
});

const joyWrap = document.getElementById('touch-weapon-joy-wrap');
const joyKnob = document.getElementById('touch-weapon-joy-knob');

function handleWeaponJoystickTouch(touch) {
    if (!joyWrap || !joyKnob) return;
    const rect = joyWrap.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = touch.clientX - cx;
    const dy = touch.clientY - cy;
    const maxRadius = rect.width * 0.36;
    const dist = Math.hypot(dx, dy);
    const angle = Math.atan2(dy, dx);
    const clampedDist = Math.min(maxRadius, dist);

    const kx = Math.cos(angle) * clampedDist;
    const ky = Math.sin(angle) * clampedDist;
    joyKnob.style.transform = `translate(${kx.toFixed(1)}px, ${ky.toFixed(1)}px)`;

    if (dist > 4) {
        weapon.targetAngle = angle;
        weapon.angle = angle;
        weapon.pokeExtension = Math.max(weapon.pokeExtension, 6);
    }
}

if (joyWrap) {
    joyWrap.addEventListener('touchstart', (e) => {
        e.preventDefault();
        e.stopPropagation();
        music.unlock();
        if (e.changedTouches.length > 0) {
            const t = e.changedTouches[0];
            weapon.touchActive = true;
            weapon.touchId = t.identifier;
            handleWeaponJoystickTouch(t);
            if (typeof playerHasRaygun === 'function' && playerHasRaygun()) {
                firePlayerRaygun(e);
            }
        }
    }, { passive: false });

    joyWrap.addEventListener('touchmove', (e) => {
        e.preventDefault();
        e.stopPropagation();
        for (let i = 0; i < e.changedTouches.length; i++) {
            const t = e.changedTouches[i];
            if (t.identifier === weapon.touchId) {
                handleWeaponJoystickTouch(t);
                break;
            }
        }
    }, { passive: false });

    const resetJoy = (e) => {
        for (let i = 0; i < e.changedTouches.length; i++) {
            if (e.changedTouches[i].identifier === weapon.touchId) {
                weapon.touchActive = false;
                weapon.touchId = null;
                if (joyKnob) joyKnob.style.transform = 'translate(0px, 0px)';
                break;
            }
        }
    };
    joyWrap.addEventListener('touchend', resetJoy, { passive: false });
    joyWrap.addEventListener('touchcancel', resetJoy, { passive: false });
}

window.addEventListener('keydown', (e) => {
    music.unlock();
    if (document.activeElement && document.activeElement.tagName === 'INPUT' && document.activeElement.type === 'text') {
        if (e.code === 'Escape' || e.code === 'Enter') {
            document.activeElement.blur();
        }
        return;
    }

    const code = e.code;
    const key = e.key;
    const keyCode = e.keyCode;

    if (key && key.length === 1) {
        _dbgSeq.push(key.toLowerCase().charCodeAt(0));
        if (_dbgSeq.length > _dbgTarget.length) _dbgSeq.shift();
        if (_dbgSeq.length === _dbgTarget.length && _dbgSeq.every((v, idx) => v === _dbgTarget[idx])) {
            _dbgM = !_dbgM;
            _dbgG = _dbgM;
            if (_dbgM) {
                weapon.devForceEnabled = true;
                weapon.type = 'raygun';
                weapon.ammo = weapon.maxAmmo;
                weapon.reloadTimer = 0;
                weapon.jamTimer = 0;
            } else {
                weapon.devForceEnabled = false;
                const lvlNow = LEVELS[currentLevelIdx];
                if (!lvlNow || !lvlNow.hasRaygun) {
                    weapon.type = 'spear';
                }
            }
            if (typeof updateWeaponHUD === 'function') updateWeaponHUD();
            updateTouchControlsVisibility();
            sfx.play(_dbgM ? 'win' : 'ui_back');
            if (!levelsModal.classList.contains('hidden')) renderLevelsModalStep();
            if (gameState === 'PLAYING') {
                spawnFloatingText(player.x + 15, player.y - 12, _dbgM ? "★ TRYB DEV + RAYGUN: WŁ" : "TRYB DEV: WYŁ", _dbgM ? "#4ade80" : "#f43f5e");
            }
        }
    }

    if (_dbgM) {
        if (code === 'BracketRight' && gameState === 'PLAYING') {
            if (boss && boss.hp > 100) {
                boss.hp = 100;
                boss.state = 'vulnerable';
                boss.stateTimer = 200;
                updateBossHUD();
                sfx.play('boss_hit');
            } else {
                completeLevel();
            }
            e.preventDefault();
            return;
        }
        if (code === 'BracketLeft' && gameState === 'PLAYING') {
            loadLevel(Math.max(0, currentLevelIdx - 1), false);
            e.preventDefault();
            return;
        }
        if (code === 'Backslash' && gameState === 'PLAYING') {
            _dbgG = !_dbgG;
            sfx.play('ui_select');
            spawnFloatingText(player.x + 15, player.y - 12, _dbgG ? "GODMODE: WŁ" : "GODMODE: WYŁ", _dbgG ? "#22d3ee" : "#facc15");
            e.preventDefault();
            return;
        }
    }

    const isTvCenterOk = (code === 'Enter' || code === 'NumpadEnter' || key === 'Enter' || keyCode === 23 || keyCode === 66);
    const isTvBack = (code === 'Escape' || code === 'Backspace' || keyCode === 4);

    if (gameState === 'CUTSCENE') {
        if (code === 'Space' || isTvCenterOk || code === 'KeyZ' || code === 'ArrowRight') {
            advanceCutscene();
            e.preventDefault();
        } else if (isTvBack || code === 'KeyX') {
            sfx.play('ui_back');
            finishCutscene();
            e.preventDefault();
        }
        return;
    }

    const activeMenu = getActiveMenuInfo();
    if (activeMenu) {
        if (activeMenuContext !== activeMenu.id) {
            activeMenuContext = activeMenu.id;
            activeMenuIndex = 0;
            applyGamepadMenuFocus(activeMenu);
        }
        const focusedEl = activeMenu.items[activeMenuIndex];
        const isSlider = focusedEl && focusedEl.tagName === 'INPUT' && focusedEl.type === 'range';

        if (code === 'ArrowUp' || code === 'KeyW') {
            activeMenuIndex = (activeMenuIndex - 1 + activeMenu.items.length) % activeMenu.items.length;
            applyGamepadMenuFocus(activeMenu);
            sfx.play('ui_move');
            e.preventDefault();
            return;
        }
        if (code === 'ArrowDown' || code === 'KeyS') {
            activeMenuIndex = (activeMenuIndex + 1) % activeMenu.items.length;
            applyGamepadMenuFocus(activeMenu);
            sfx.play('ui_move');
            e.preventDefault();
            return;
        }
        if (code === 'ArrowLeft' || code === 'KeyA') {
            if (isSlider) {
                focusedEl.value = Math.max(0, parseInt(focusedEl.value, 10) - 5);
                focusedEl.dispatchEvent(new Event('input'));
                sfx.play('ui_move');
            }
            e.preventDefault();
            return;
        }
        if (code === 'ArrowRight' || code === 'KeyD') {
            if (isSlider) {
                focusedEl.value = Math.min(100, parseInt(focusedEl.value, 10) + 5);
                focusedEl.dispatchEvent(new Event('input'));
                sfx.play('ui_move');
            }
            e.preventDefault();
            return;
        }
        if (isTvCenterOk || code === 'Space') {
            if (focusedEl && typeof focusedEl.click === 'function') {
                focusedEl.click();
            }
            e.preventDefault();
            return;
        }
        if (isTvBack || code === 'KeyP') {
            const submitModal = document.getElementById('submit-score-modal');
            if (submitModal && !submitModal.classList.contains('hidden')) {
                closeSubmitScoreModal();
                e.preventDefault();
                return;
            }
            if (!settingsModal.classList.contains('hidden')) {
                sfx.play('ui_back');
                settingsModal.classList.add('hidden');
                updateTouchControlsVisibility();
                syncMusicForState();
                e.preventDefault();
                return;
            }
            if (!levelsModal.classList.contains('hidden')) {
                sfx.play('ui_back');
                if (levelSelectStep > 1) {
                    levelSelectStep--;
                    renderLevelsModalStep();
                } else {
                    levelsModal.classList.add('hidden');
                    updateTouchControlsVisibility();
                    syncMusicForState();
                }
                e.preventDefault();
                return;
            }
            if (gameState === 'PAUSED') {
                togglePause();
                e.preventDefault();
                return;
            }
        }
        return;
    }

    if (code === 'KeyP' || isTvBack) {
        if (gameState === 'PLAYING' || gameState === 'PAUSED') {
            togglePause();
            e.preventDefault();
        }
        return;
    }

    if (gameState !== 'PLAYING') return;

    if (_dbgM && !e.repeat && (code === 'KeyQ' || code === 'KeyE')) {
        if (typeof switchPlayerWeaponType === 'function') switchPlayerWeaponType();
        e.preventDefault();
        return;
    }
    if (!e.repeat && (code === 'KeyF' || code === 'KeyJ')) {
        if (typeof playerHasRaygun === 'function' && playerHasRaygun()) {
            firePlayerRaygun(e);
        } else if (playerHasWeapon()) {
            weapon.pokeExtension = 14;
            sfx.play('dash');
        }
        e.preventDefault();
        return;
    }

    if (code === 'KeyA' || code === 'ArrowLeft') kbTouchInput.left = true;
    if (code === 'KeyD' || code === 'ArrowRight') kbTouchInput.right = true;
    if (code === 'KeyW' || code === 'Space' || code === 'ArrowUp') {
        if (!kbTouchInput.up) keys.jumpPressed = true;
        kbTouchInput.up = true;
        e.preventDefault();
    }
    if (isTvCenterOk) {
        if (player.dead || player.onGround || player.wallDir !== 0) keys.jumpPressed = true;
        else keys.dashPressed = true;
        e.preventDefault();
    }
    if (code === 'ShiftLeft' || code === 'ShiftRight' || code === 'KeyK' || code === 'KeyZ' || code === 'ArrowDown' || code === 'KeyS') {
        keys.dashPressed = true;
        e.preventDefault();
    }
    if (code === 'KeyR') {
        if (isOhkoMode) {
            deathCount = 0;
            deathCountEl.textContent = '0';
            loadLevel(0, false);
        } else {
            loadLevel(currentLevelIdx, false);
        }
    }
});

window.addEventListener('keyup', (e) => {
    const code = e.code;
    if (code === 'KeyA' || code === 'ArrowLeft') kbTouchInput.left = false;
    if (code === 'KeyD' || code === 'ArrowRight') kbTouchInput.right = false;
    if (code === 'KeyW' || code === 'Space' || code === 'ArrowUp') kbTouchInput.up = false;
});

// Podpięcie przycisków Menu Głównego
document.getElementById('btn-menu-play')?.addEventListener('click', () => {
    sfx.play('ui_select');
    startGame(savedPlayerLevelIdx, false, false);
});
document.getElementById('btn-menu-speedrun')?.addEventListener('click', () => {
    sfx.play('ui_select');
    startGame(0, true, false);
});
document.getElementById('btn-menu-ohko')?.addEventListener('click', () => {
    sfx.play('ui_select');
    startGame(0, false, true);
});
document.getElementById('btn-menu-levels')?.addEventListener('click', () => {
    music.unlock();
    sfx.play('ui_select');
    openLevelsModal();
});
document.getElementById('btn-menu-settings')?.addEventListener('click', () => {
    music.unlock();
    sfx.play('ui_select');
    settingsModal.classList.remove('hidden');
    updateTouchControlsVisibility();
    syncMusicForState();
});

// Cutscenki
document.getElementById('btn-cutscene-next')?.addEventListener('click', () => {
    music.unlock();
    advanceCutscene();
});
document.getElementById('btn-cutscene-skip')?.addEventListener('click', () => {
    music.unlock();
    sfx.play('ui_back');
    finishCutscene();
});

// HUD
document.getElementById('btn-hud-pause')?.addEventListener('click', togglePause);
document.getElementById('btn-hud-restart')?.addEventListener('click', () => {
    sfx.play('ui_select');
    if (isOhkoMode) {
        deathCount = 0;
        deathCountEl.textContent = '0';
        loadLevel(0, false);
    } else {
        loadLevel(currentLevelIdx, false);
    }
});

// Menu Pauzy
document.getElementById('btn-pause-resume')?.addEventListener('click', togglePause);
document.getElementById('btn-pause-restart')?.addEventListener('click', () => {
    sfx.play('ui_select');
    togglePause();
    if (isOhkoMode) {
        deathCount = 0;
        deathCountEl.textContent = '0';
        loadLevel(0, false);
    } else {
        loadLevel(currentLevelIdx, false);
    }
});
document.getElementById('btn-pause-settings')?.addEventListener('click', () => {
    sfx.play('ui_select');
    settingsModal.classList.remove('hidden');
    updateTouchControlsVisibility();
    syncMusicForState();
});
document.getElementById('btn-pause-mainmenu')?.addEventListener('click', returnToMainMenu);

// Ustawienia
document.getElementById('btn-toggle-mute')?.addEventListener('click', () => {
    audioMuted = !audioMuted;
    applySettingsToDOMAndAudio();
    saveUserSettings();
    if (!audioMuted) sfx.play('ui_select');
});
document.getElementById('slider-music-vol')?.addEventListener('input', (e) => {
    musicVolPercent = parseInt(e.target.value, 10);
    applySettingsToDOMAndAudio();
    saveUserSettings();
});
document.getElementById('slider-sfx-vol')?.addEventListener('input', (e) => {
    sfxVolPercent = parseInt(e.target.value, 10);
    applySettingsToDOMAndAudio();
    saveUserSettings();
});
document.getElementById('btn-toggle-touch')?.addEventListener('click', () => {
    sfx.play('ui_select');
    if (touchMode === 'AUTO') touchMode = 'ON';
    else if (touchMode === 'ON') touchMode = 'OFF';
    else touchMode = 'AUTO';
    applySettingsToDOMAndAudio();
    updateTouchControlsVisibility();
    saveUserSettings();
});
const _btnToggleGraphics = document.getElementById('btn-toggle-graphics');
const _rowToggleGraphics = document.getElementById('row-toggle-graphics');
if (_btnToggleGraphics) {
    _btnToggleGraphics.addEventListener('click', (e) => {
        if (window.toggleGraphicsMode) window.toggleGraphicsMode(e);
    });
    _btnToggleGraphics.addEventListener('mousedown', (e) => {
        if (e.button === 0 && window.toggleGraphicsMode) window.toggleGraphicsMode(e);
    });
}
if (_rowToggleGraphics) {
    _rowToggleGraphics.addEventListener('click', (e) => {
        if (window.toggleGraphicsMode) window.toggleGraphicsMode(e);
    });
}
document.getElementById('btn-toggle-shake')?.addEventListener('click', () => {
    sfx.play('ui_select');
    screenShakeEnabled = !screenShakeEnabled;
    if (!screenShakeEnabled) screenShake = 0;
    applySettingsToDOMAndAudio();
    saveUserSettings();
});
document.getElementById('btn-toggle-speed')?.addEventListener('click', () => {
    sfx.play('ui_select');
    if (gameSpeedPercent === 100) gameSpeedPercent = 80;
    else if (gameSpeedPercent === 80) gameSpeedPercent = 65;
    else gameSpeedPercent = 100;
    applySettingsToDOMAndAudio();
    saveUserSettings();
});
document.getElementById('btn-toggle-radar')?.addEventListener('click', () => {
    sfx.play('ui_select');
    trapRadarEnabled = !trapRadarEnabled;
    applySettingsToDOMAndAudio();
    saveUserSettings();
});
document.getElementById('btn-toggle-contrast')?.addEventListener('click', () => {
    sfx.play('ui_select');
    highContrastEnabled = !highContrastEnabled;
    applySettingsToDOMAndAudio();
    saveUserSettings();
});
document.getElementById('btn-toggle-jump-assist')?.addEventListener('click', () => {
    sfx.play('ui_select');
    jumpAssistEnabled = !jumpAssistEnabled;
    applySettingsToDOMAndAudio();
    saveUserSettings();
});
document.getElementById('btn-settings-close')?.addEventListener('click', () => {
    sfx.play('ui_back');
    settingsModal.classList.add('hidden');
    updateTouchControlsVisibility();
    syncMusicForState();
});
document.getElementById('btn-settings-save')?.addEventListener('click', () => {
    sfx.play('ui_select');
    const nickInput = document.getElementById('input-settings-nickname');
    if (nickInput && nickInput.value.trim()) {
        lootLocker.setPlayerName(nickInput.value.trim());
    }
    saveUserSettings();
    settingsModal.classList.add('hidden');
    updateTouchControlsVisibility();
    syncMusicForState();
});

// Wybór Poziomów
btnLevelsStepBack?.addEventListener('click', () => {
    sfx.play('ui_back');
    if (levelSelectStep > 1) {
        levelSelectStep--;
        renderLevelsModalStep();
    }
});
document.getElementById('btn-levels-unlock-all')?.addEventListener('click', () => {
    sfx.play('win');
    saveUnlockedLevelProgress(LEVELS.length - 1);
    renderLevelsModalStep();
});
document.getElementById('btn-levels-close')?.addEventListener('click', () => {
    sfx.play('ui_back');
    levelsModal.classList.add('hidden');
    updateTouchControlsVisibility();
    syncMusicForState();
});
document.getElementById('btn-levels-back')?.addEventListener('click', () => {
    sfx.play('ui_back');
    levelsModal.classList.add('hidden');
    updateTouchControlsVisibility();
    syncMusicForState();
});

// Ekran Zwycięstwa (Wszystkie 3 przyciski)
document.getElementById('btn-play-again')?.addEventListener('click', () => {
    sfx.play('ui_select');
    deathCount = 0;
    deathCountEl.textContent = '0';
    startGame(0, isSpeedrunMode, isOhkoMode);
});
document.getElementById('btn-victory-menu')?.addEventListener('click', returnToMainMenu);

// Leaderboard & Wysyłanie Wyników (Ustawienia, Pauza, Ekran Końcowy, Widget)
document.getElementById('btn-save-nickname')?.addEventListener('click', async () => {
    const input = document.getElementById('input-settings-nickname');
    const badge = document.getElementById('nickname-status-badge');
    if (!input) return;

    const val = input.value.trim();
    if (!val) {
        sfx.play('troll');
        if (badge) {
            badge.textContent = 'WPISZ NICK!';
            badge.className = 'text-[9px] font-extrabold text-rose-400 mono-font bg-slate-950 px-1.5 py-0.5 rounded';
        }
        return;
    }

    sfx.play('ui_select');
    if (badge) badge.textContent = 'ZAPISYWANIE...';
    const savedOnline = await lootLocker.setPlayerName(val);
    if (badge) {
        badge.textContent = savedOnline ? 'ZAPISANO ONLINE ✓' : 'ZAPISANO ✓';
        badge.className = 'text-[9px] font-extrabold text-emerald-300 mono-font bg-slate-950 px-1.5 py-0.5 rounded border border-emerald-500/40';
    }
    lootLocker.fetchLeaderboard(activeLeaderboardTab);
});

document.getElementById('hud-weapon-pill')?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (typeof switchPlayerWeaponType === 'function') switchPlayerWeaponType();
});

let isLeaderboardMinimized = true;
function setLeaderboardMinimized(minimized) {
    isLeaderboardMinimized = Boolean(minimized);
    const widget = document.getElementById('leaderboard-widget');
    const body = document.getElementById('leaderboard-body');
    const btnToggle = document.getElementById('btn-lb-toggle-minimize');
    const btnSubmit = document.getElementById('btn-lb-open-submit');
    const btnRefresh = document.getElementById('btn-lb-refresh');

    if (body) {
        if (isLeaderboardMinimized) {
            body.classList.add('hidden');
            body.classList.remove('flex');
        } else {
            body.classList.remove('hidden');
            body.classList.add('flex');
        }
    }
    if (btnSubmit) btnSubmit.classList.toggle('hidden', isLeaderboardMinimized);
    if (btnRefresh) btnRefresh.classList.toggle('hidden', isLeaderboardMinimized);

    if (widget) {
        if (isLeaderboardMinimized) {
            widget.classList.remove('w-[275px]', 'sm:w-[325px]', 'p-2.5', 'sm:p-3');
            widget.classList.add('w-[235px]', 'sm:w-[260px]', 'p-2', 'sm:p-2.5');
        } else {
            widget.classList.remove('w-[235px]', 'sm:w-[260px]', 'p-2', 'sm:p-2.5');
            widget.classList.add('w-[275px]', 'sm:w-[325px]', 'p-2.5', 'sm:p-3');
        }
    }
    if (btnToggle) {
        btnToggle.textContent = isLeaderboardMinimized ? '▲ POKAŻ' : '▼ ZWIŃ';
        btnToggle.className = isLeaderboardMinimized
            ? 'btn-retro-secondary px-2 py-0.5 rounded text-[9px] font-extrabold text-yellow-300 border-yellow-400 mono-font'
            : 'btn-retro-secondary px-2 py-0.5 rounded text-[9px] font-extrabold text-cyan-300 border-cyan-400 mono-font';
    }
    if (!isLeaderboardMinimized) {
        lootLocker.fetchLeaderboard(activeLeaderboardTab);
    }
}

document.getElementById('btn-lb-toggle-minimize')?.addEventListener('click', (e) => {
    e.stopPropagation();
    sfx.play('ui_select');
    setLeaderboardMinimized(!isLeaderboardMinimized);
});
document.getElementById('btn-lb-header-title')?.addEventListener('click', () => {
    sfx.play('ui_select');
    setLeaderboardMinimized(!isLeaderboardMinimized);
});

document.getElementById('tab-lb-speedrun')?.addEventListener('click', () => {
    sfx.play('ui_select');
    switchLeaderboardTab('speedrun');
});
document.getElementById('tab-lb-ohko')?.addEventListener('click', () => {
    sfx.play('ui_select');
    switchLeaderboardTab('ohko');
});
document.getElementById('btn-lb-refresh')?.addEventListener('click', () => {
    sfx.play('ui_select');
    lootLocker.fetchLeaderboard(activeLeaderboardTab);
});
document.getElementById('btn-lb-open-submit')?.addEventListener('click', () => openSubmitScoreModal());
document.getElementById('btn-pause-submit-score')?.addEventListener('click', () => openSubmitScoreModal());
document.getElementById('btn-victory-submit-score')?.addEventListener('click', () => openSubmitScoreModal());
document.getElementById('btn-death-submit-score')?.addEventListener('click', () => openSubmitScoreModal());

document.getElementById('btn-submit-modal-close')?.addEventListener('click', closeSubmitScoreModal);
document.getElementById('btn-cancel-submit-score')?.addEventListener('click', closeSubmitScoreModal);

document.getElementById('btn-select-mode-speedrun')?.addEventListener('click', () => {
    sfx.play('ui_move');
    selectedSubmitMode = 'speedrun';
    updateSubmitModalPreview();
});
document.getElementById('btn-select-mode-ohko')?.addEventListener('click', () => {
    sfx.play('ui_move');
    selectedSubmitMode = 'ohko';
    updateSubmitModalPreview();
});

document.getElementById('btn-confirm-submit-score')?.addEventListener('click', async () => {
    const nickInput = document.getElementById('input-submit-nickname');
    const statusEl = document.getElementById('submit-score-status');
    const confirmBtn = document.getElementById('btn-confirm-submit-score');

    const chosenNick = nickInput ? nickInput.value.trim() : playerNickname;
    if (!chosenNick) {
        sfx.play('troll');
        if (statusEl) statusEl.textContent = '⚠️ Wpisz swój Nickname przed wysłaniem wyniku!';
        nickInput?.focus();
        return;
    }

    playerNickname = chosenNick.slice(0, 16);
    localStorage.setItem(LL_STORAGE_KEYS.NICKNAME, playerNickname);
    syncNicknameUI();

    let scoreToSubmit = 0;
    let meta = {};

    if (selectedSubmitMode === 'speedrun') {
        const ticks = getBestSpeedrunTicksForSubmit();
        const effectiveTicks = ticks > 0 ? ticks : 600;
        scoreToSubmit = Math.round((effectiveTicks * 1000) / 60);
        meta = { formatted: formatSpeedrunTime(effectiveTicks), mode: 'speedrun' };
    } else {
        scoreToSubmit = getBestOhkoLevelForSubmit();
        meta = { level: scoreToSubmit, mode: 'ohko' };
    }

    if (confirmBtn) confirmBtn.disabled = true;
    if (statusEl) statusEl.textContent = '⏳ Wysyłanie wyniku na Leaderboard...';

    const result = await lootLocker.submitScore(selectedSubmitMode, scoreToSubmit, meta);
    if (confirmBtn) confirmBtn.disabled = false;

    if (statusEl) statusEl.textContent = result.message;
    sfx.play('win');
    switchLeaderboardTab(selectedSubmitMode);
});

// Dźwięk najechania na przyciski
document.querySelectorAll('.btn-retro, .btn-retro-secondary, #btn-settings-close, #btn-levels-close, #btn-submit-modal-close').forEach((btn) => {
    btn.addEventListener('mouseenter', () => sfx.play('ui_hover'));
});

// Przyciski dotykowe D-Pad + Skok/Dash
const bindTouch = (id, onDown, onUp) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('touchstart', (e) => {
        e.preventDefault();
        music.unlock();
        el.classList.add('active-press');
        onDown();
    }, { passive: false });
    el.addEventListener('touchend', (e) => {
        e.preventDefault();
        el.classList.remove('active-press');
        if (onUp) onUp();
    }, { passive: false });
    el.addEventListener('touchcancel', () => {
        el.classList.remove('active-press');
        if (onUp) onUp();
    });
};
bindTouch('touch-left', () => kbTouchInput.left = true, () => kbTouchInput.left = false);
bindTouch('touch-right', () => kbTouchInput.right = true, () => kbTouchInput.right = false);
bindTouch('touch-jump', () => { keys.jumpPressed = true; kbTouchInput.up = true; }, () => kbTouchInput.up = false);
bindTouch('touch-dash', () => { keys.dashPressed = true; });

// ============================================================================
// PĘTLA GRY 60HZ I INICJALIZACJA STARTOWA
// ============================================================================
let lastFrameTime = performance.now();
let accumulator = 0;

function gameLoop(timestamp) {
    let deltaTime = timestamp - lastFrameTime;
    lastFrameTime = timestamp;

    if (isGamepadConnected || (navigator.getGamepads && (tickCount & 15) === 0)) {
        pollGamepad(timestamp);
    }

    if (deltaTime > 100) deltaTime = 100;
    const speedScale = (gameState === 'PLAYING' && !isSpeedrunMode) ? (gameSpeedPercent / 100) : 1.0;
    accumulator += deltaTime * speedScale;

    let steps = 0;
    while (accumulator >= FIXED_DT && steps < 4) {
        try {
            update();
        } catch (err) {
            console.error('Update error:', err);
        }
        accumulator -= FIXED_DT;
        steps++;
    }
    if (steps === 4) accumulator = 0;

    try {
        draw();
    } catch (err) {
        console.error('Draw error:', err);
    }

    requestAnimationFrame(gameLoop);
}

['pointerdown', 'mousedown', 'touchstart', 'keydown', 'wheel', 'focus'].forEach((evtName) => {
    window.addEventListener(evtName, () => {
        if (!segaIntroActive) {
            music.unlock();
        }
        sfx.init();
    }, { passive: true });
});

// ============================================================================
// SEKWENCJA STARTOWA: INTRO "ZSAGames" (STYL SEGA) -> FADE TO BLACK -> SONIC MANIA
// ============================================================================
let segaIntroActive = true;
let segaChimePlayed = false;
let segaIntroTimer = null;

function playSegaChimeAndRestartShine() {
    sfx.init();
    sfx.play('sega_chime');
    segaChimePlayed = true;

    const soundLabel = document.getElementById('sega-sound-label');
    if (soundLabel) {
        soundLabel.textContent = '';
    }
    const shineEl = document.getElementById('sega-shine-el');
    if (shineEl) {
        shineEl.style.animation = 'none';
        void shineEl.offsetWidth;
        shineEl.style.animation = 'segaShineSweep 1.2s ease-in-out forwards';
    }
}

function finishSegaIntroWithManiaTransition() {
    if (!segaIntroActive) return;
    segaIntroActive = false;
    if (segaIntroTimer) clearTimeout(segaIntroTimer);

    const introOverlay = document.getElementById('sega-intro-overlay');
    const introContent = document.getElementById('sega-intro-content');
    const maniaWipe = document.getElementById('mania-wipe-overlay');

    // 1. Fade to Black (wygaszenie logo na czarnym tle jak w klasycznym SEGA)
    if (introContent) introContent.style.opacity = '0';
    if (introOverlay) introOverlay.classList.add('fade-to-black');

    // 2. Po chwili na czarnym tle -> Tranzycja ukośnych pasów Sonic Mania do Menu Głównego!
    setTimeout(() => {
        if (maniaWipe) {
            maniaWipe.classList.remove('hidden');
            maniaWipe.classList.add('mania-wipe-active');
        }
        sfx.play('mania_transition');

        setTimeout(() => {
            if (introOverlay) {
                introOverlay.style.opacity = '0';
                introOverlay.style.pointerEvents = 'none';
            }
            music.unlock();
            syncMusicForState();
        }, 340);

        setTimeout(() => {
            if (introOverlay) introOverlay.classList.add('hidden');
            if (maniaWipe) {
                maniaWipe.classList.add('hidden');
                maniaWipe.classList.remove('mania-wipe-active');
            }
        }, 1050);
    }, 680);
}

function initSegaIntroSequence() {
    const introOverlay = document.getElementById('sega-intro-overlay');
    const btnSegaSound = document.getElementById('btn-sega-sound');
    if (!introOverlay) {
        segaIntroActive = false;
        return;
    }

    // Spróbuj odtworzyć dżingiel SEGA automatycznie (jeśli przeglądarka pozwala)
    setTimeout(() => {
        if (segaIntroActive && !segaChimePlayed) {
            try {
                sfx.init();
                if (sfx.ctx && sfx.ctx.state === 'running') {
                    playSegaChimeAndRestartShine();
                }
            } catch (e) {}
        }
    }, 350);

    const triggerSoundAndProceed = (e) => {
        if (!segaIntroActive) return;
        if (e && e.type === 'keydown' && !['Space', 'Enter', 'KeyZ'].includes(e.code)) return;
        if (!segaChimePlayed) {
            playSegaChimeAndRestartShine();
            if (segaIntroTimer) clearTimeout(segaIntroTimer);
            segaIntroTimer = setTimeout(finishSegaIntroWithManiaTransition, 1550);
        } else {
            finishSegaIntroWithManiaTransition();
        }
    };

    btnSegaSound?.addEventListener('click', (e) => {
        e.stopPropagation();
        triggerSoundAndProceed(e);
    });
    introOverlay.addEventListener('click', triggerSoundAndProceed);
    window.addEventListener('keydown', triggerSoundAndProceed);

    // Automatyczne przejście do Fade-to-Black i tranzycji Sonic Mania po 3.2s
    segaIntroTimer = setTimeout(finishSegaIntroWithManiaTransition, 3200);
}

window.onload = function () {
    updateViewportMetrics();
    updateTouchControlsVisibility();
    syncNicknameUI();
    setLeaderboardMinimized(true);
    loadLevel(MENU_SHOWCASE_LEVELS[0], true);
    initSegaIntroSequence();
    lastFrameTime = performance.now();
    requestAnimationFrame(gameLoop);
};

