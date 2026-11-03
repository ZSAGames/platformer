// ============================================================================
// MODUŁ 8: SILNIK RENDEROWANIA (ŚWIATY, POSTACIE, BROŃ 360°, BOGATE CUTSCENKI)
// ============================================================================
let _skyGradCache = { key: '', grad: null };

function getCachedSkyGradient(c0, c1, c2, stopMid = 0.55) {
    const key = `${canvas.height}|${stopMid}|${c0}|${c1}|${c2}`;
    if (_skyGradCache.key === key && _skyGradCache.grad) {
        return _skyGradCache.grad;
    }
    const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grad.addColorStop(0, c0);
    grad.addColorStop(stopMid, c1);
    grad.addColorStop(1, c2);
    _skyGradCache.key = key;
    _skyGradCache.grad = grad;
    return grad;
}
function drawLowEndEnvironment(theme, nextTheme = null, blend = 0) {
    const effTheme = theme === 'jungle_outpost' ? 'jungle' : theme;
    const skyFlatMap = {
        day: '#0ea5e9',
        forest: '#1e1b4b',
        darkforest: '#1e092b',
        castle: '#0f172a',
        underwater_castle: '#082f49',
        underwater_sand: '#0369a1',
        underwater_shallows: '#0f766e',
        jungle: '#064e3b',
        john_base: '#090d16'
    };
    const horizonFlatMap = {
        day: '#15803d',
        forest: '#0b1324',
        darkforest: '#09090b',
        castle: '#1e293b',
        underwater_castle: '#1e293b',
        underwater_sand: '#ca8a04',
        underwater_shallows: '#78350f',
        jungle: '#052e16',
        john_base: '#020617'
    };
    const rimFlatMap = {
        day: '#22c55e',
        forest: '#1e293b',
        darkforest: '#dc2626',
        castle: '#334155',
        underwater_castle: '#0284c7',
        underwater_sand: '#facc15',
        underwater_shallows: '#15803d',
        jungle: '#16a34a',
        john_base: '#0284c7'
    };

    const nextEff = nextTheme === 'jungle_outpost' ? 'jungle' : (nextTheme || effTheme);
    const skyCol = lerpColor(skyFlatMap[effTheme] || '#0ea5e9', skyFlatMap[nextEff] || skyFlatMap[effTheme] || '#0ea5e9', blend);
    const groundCol = lerpColor(horizonFlatMap[effTheme] || '#15803d', horizonFlatMap[nextEff] || horizonFlatMap[effTheme] || '#15803d', blend);
    const rimCol = lerpColor(rimFlatMap[effTheme] || '#22c55e', rimFlatMap[nextEff] || rimFlatMap[effTheme] || '#22c55e', blend);

    ctx.fillStyle = skyCol;
    ctx.fillRect(0, 0, canvas.width, 496);

    // Proste geometryczne sylwetki w tle (1 pętla prostokątów zamiast dziesiątek krzywych/gradientów)
    if (effTheme === 'john_base') {
        const pillarOff = -(cameraX * 0.3) % 320;
        ctx.fillStyle = '#0f172a';
        for (let px = pillarOff - 100; px < canvas.width + 100; px += 320) {
            ctx.fillRect(px | 0, 0, 48, 496);
        }
    } else if (effTheme === 'castle' || effTheme === 'underwater_castle') {
        ctx.fillStyle = '#090d16';
        for (let x = 90; x < canvas.width; x += 220) {
            ctx.fillRect(x, 0, 46, 496);
        }
    } else {
        // Słońce / Księżyc jako pojedynczy czysty kwadrat bez wielowarstwowych poświat
        ctx.fillStyle = (effTheme === 'darkforest') ? '#ef4444' : ((effTheme === 'forest') ? '#e2e8f0' : '#fde047');
        ctx.fillRect(canvas.width - 170, 64, 56, 56);

        // Uproszczone wzgórza/filary tła w jednym przebiegu
        const mountOff = -(cameraX * 0.2) % 360;
        ctx.fillStyle = lerpColor(skyCol, '#05070e', 0.28);
        for (let mx = mountOff - 180; mx < canvas.width + 180; mx += 360) {
            ctx.fillRect((mx + 40) | 0, 340, 220, 156);
            ctx.fillRect((mx + 85) | 0, 280, 130, 60);
        }
    }

    if (theme === 'jungle_outpost') {
        const outpostOff = -(cameraX * 0.28) % 380;
        ctx.fillStyle = '#0f172a';
        for (let ox = outpostOff - 190; ox < canvas.width + 220; ox += 380) {
            ctx.fillRect((ox + 120) | 0, 360, 120, 136);
        }
    }

    ctx.fillStyle = groundCol;
    ctx.fillRect(0, 496, canvas.width, canvas.height - 496);
    ctx.fillStyle = rimCol;
    ctx.fillRect(0, 494, canvas.width, 4);
}

function drawEnvironment(theme, nextTheme = null, blend = 0) {
    if (typeof lowEndMode !== 'undefined' && lowEndMode) {
        drawLowEndEnvironment(theme, nextTheme, blend);
        return;
    }
    if (theme === 'jungle_outpost') {
        drawEnvironment('jungle', null, 0);
        // Rysuj w tle Dżungli stalowe bunkry, anteny radarowe i hologramy Johna!
        ctx.save();
        const outpostOff = -(cameraX * 0.28) % 380;
        for (let ox = outpostOff - 190; ox < canvas.width + 220; ox += 380) {
            const bx = ox + 120;
            ctx.fillStyle = '#0f172a';
            ctx.fillRect(bx, 350, 130, 150);
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 2.5;
            ctx.strokeRect(bx, 350, 130, 150);

            ctx.fillStyle = '#0284c7';
            ctx.fillRect(bx + 12, 370, 106, 18);
            ctx.fillStyle = (tickCount % 20 < 10) ? '#22d3ee' : '#f43f5e';
            ctx.fillRect(bx + 56, 374, 18, 10);

            ctx.strokeStyle = '#64748b';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(bx + 65, 350);
            ctx.lineTo(bx + 65, 305);
            ctx.stroke();
            ctx.fillStyle = '#38bdf8';
            ctx.fillRect(bx + 48, 298, 34, 10);
        }
        ctx.restore();
        return;
    }

    if (theme === 'john_base') {
        ctx.save();
        ctx.fillStyle = getCachedSkyGradient('#020617', '#0f172a', '#1e1b4b', 0.5);
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = 'rgba(56, 189, 248, 0.14)';
        ctx.lineWidth = 1;
        const gridOff = -(cameraX * 0.2) % 60;
        ctx.beginPath();
        for (let gx = gridOff; gx < canvas.width; gx += 60) {
            ctx.moveTo(gx, 0); ctx.lineTo(gx, 600);
        }
        for (let gy = 0; gy < 600; gy += 60) {
            ctx.moveTo(0, gy); ctx.lineTo(canvas.width, gy);
        }
        ctx.stroke();

        const pillarOff = -(cameraX * 0.35) % 260;
        for (let px = pillarOff - 130; px < canvas.width + 200; px += 260) {
            ctx.fillStyle = '#090d16';
            ctx.fillRect(px, 0, 54, 600);
            ctx.strokeStyle = '#0284c7';
            ctx.lineWidth = 2;
            ctx.strokeRect(px, 0, 54, 600);

            ctx.fillStyle = (tickCount % 16 < 8) ? '#22d3ee' : '#38bdf8';
            ctx.fillRect(px + 20, 80, 14, 440);

            ctx.fillStyle = 'rgba(14, 165, 233, 0.12)';
            ctx.fillRect(px + 85, 190, 96, 64);
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(px + 85, 190, 96, 64);
            ctx.fillStyle = '#67e8f9';
            ctx.font = 'bold 9px JetBrains Mono';
            ctx.textAlign = 'center';
            ctx.fillText('JOHN CORP // LAB', px + 133, 224);
        }
        ctx.restore();
        return;
    }

    const skyColors = {
        day:                 ['#0284c7', '#38bdf8', '#bae6fd'],
        forest:              ['#0f172a', '#1e1b4b', '#4c1d95'],
        darkforest:          ['#05050a', '#2e1065', '#450a0a'],
        castle:              ['#05070e', '#111827', '#1f122b'],
        underwater_castle:   ['#020617', '#082f49', '#0369a1'],
        underwater_sand:     ['#082f49', '#0284c7', '#0e7490'],
        underwater_shallows: ['#042f2e', '#0f766e', '#115e59'],
        jungle:              ['#064e3b', '#047857', '#a7f3d0']
    };
    const cA = skyColors[theme] || skyColors.day;
    const cB = (nextTheme && skyColors[nextTheme]) ? skyColors[nextTheme] : cA;

    ctx.fillStyle = getCachedSkyGradient(
        lerpColor(cA[0], cB[0], blend),
        lerpColor(cA[1], cB[1], blend),
        lerpColor(cA[2], cB[2], blend),
        0.55
    );
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const isUnderwaterTheme = theme.startsWith('underwater');

    if (isUnderwaterTheme) {
        const uwAlpha = (nextTheme === 'jungle') ? Math.max(0.15, 1 - blend * 0.8) : 1;
        ctx.save();

        ctx.globalAlpha = uwAlpha * 0.5;
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(0, 0, canvas.width, 16);
        ctx.fillStyle = '#bae6fd';
        for (let wx = -((cameraX * 0.3) % 60); wx < canvas.width + 60; wx += 60) {
            const waveY = 10 + Math.sin(tickCount * 0.06 + wx * 0.05) * 3.5;
            ctx.fillRect(wx, waveY, 34, 4);
        }

        ctx.globalAlpha = uwAlpha * 0.11;
        ctx.fillStyle = theme === 'underwater_shallows' ? '#5eead4' : '#67e8f9';
        const rayOffset = -(cameraX * 0.12) % 210;
        for (let rx = rayOffset - 100; rx < canvas.width + 200; rx += 210) {
            ctx.beginPath();
            ctx.moveTo(rx, 0);
            ctx.lineTo(rx + 60, 0);
            ctx.lineTo(rx + 175, 600);
            ctx.lineTo(rx + 90, 600);
            ctx.closePath();
            ctx.fill();
        }

        const castleVisibility = theme === 'underwater_castle' ? (nextTheme === 'underwater_sand' ? (1 - blend) : 1) : 0;
        const sandVisibility = theme === 'underwater_sand' ? 1 : (nextTheme === 'underwater_sand' ? blend : (theme === 'underwater_shallows' ? 0.5 : 0));
        const shallowsVisibility = theme === 'underwater_shallows' ? 1 : (nextTheme === 'underwater_shallows' ? blend : 0);

        if (castleVisibility > 0.02) {
            ctx.save();
            ctx.globalAlpha = uwAlpha * castleVisibility * 0.65;
            const ruinOffset = -(cameraX * 0.22) % 240;
            for (let rx = ruinOffset - 120; rx < canvas.width + 240; rx += 240) {
                ctx.fillStyle = '#0f172a';
                ctx.fillRect(rx, 90, 56, 430);
                ctx.strokeStyle = '#1e3a8a';
                ctx.lineWidth = 2;
                ctx.strokeRect(rx, 90, 56, 430);

                ctx.fillStyle = '#020617';
                ctx.fillRect(rx + 12, 180, 32, 64);
                ctx.fillStyle = '#334155';
                ctx.fillRect(rx + 20, 180, 3, 64);
                ctx.fillRect(rx + 32, 180, 3, 64);
                ctx.fillRect(rx + 12, 208, 32, 3);

                ctx.fillStyle = '#0f172a';
                ctx.fillRect(rx + 56, 360, 184, 160);
                for (let bx = rx + 64; bx < rx + 230; bx += 34) {
                    ctx.fillRect(bx, 342, 20, 18);
                }
            }
            ctx.restore();
        }

        if (shallowsVisibility > 0.02) {
            ctx.save();
            ctx.globalAlpha = uwAlpha * shallowsVisibility * 0.32;
            const rootOffset = -(cameraX * 0.2) % 220;
            for (let jx = rootOffset - 100; jx < canvas.width + 200; jx += 220) {
                ctx.fillStyle = '#042f2e';
                ctx.fillRect(jx + 30, 0, 38, 520);
                ctx.beginPath();
                ctx.moveTo(jx + 30, 360);
                ctx.lineTo(jx - 15, 520);
                ctx.lineTo(jx + 15, 520);
                ctx.lineTo(jx + 45, 410);
                ctx.fill();

                ctx.beginPath();
                ctx.moveTo(jx + 68, 360);
                ctx.lineTo(jx + 115, 520);
                ctx.lineTo(jx + 85, 520);
                ctx.lineTo(jx + 55, 410);
                ctx.fill();

                ctx.fillStyle = '#064e3b';
                ctx.fillRect(jx - 20, 0, 140, 68);
                ctx.fillRect(jx + 5, 68, 90, 36);
            }
            ctx.restore();
        }

        ctx.save();
        ctx.globalAlpha = uwAlpha * 0.65;
        for (let f = 0; f < 10; f++) {
            const dir = (f % 2 === 0) ? 1 : -1;
            const speed = 0.65 + (f % 3) * 0.25;
            const rawX = (f * 137 + tickCount * speed * dir - cameraX * 0.18);
            const fx = ((rawX % (canvas.width + 80)) + (canvas.width + 80)) % (canvas.width + 80) - 40;
            const fy = 85 + (f * 41) % 360 + Math.sin(tickCount * 0.05 + f) * 8;

            const fishColor = (f % 3 === 0) ? '#38bdf8' : ((f % 2 === 0) ? '#facc15' : '#fb923c');
            for (let s = 0; s < 3; s++) {
                const sx = fx - dir * s * 14;
                const sy = fy + (s % 2 === 0 ? -5 : 5);
                ctx.fillStyle = fishColor;
                ctx.fillRect(sx, sy, 8, 6);
                ctx.fillRect(sx + (dir > 0 ? -4 : 8), sy + 1, 4, 4);
                ctx.fillStyle = '#020617';
                ctx.fillRect(sx + (dir > 0 ? 5 : 1), sy + 1, 2, 2);
            }
        }
        ctx.restore();

        const seabedTopCol = lerpColor(
            theme === 'underwater_castle' ? '#1e293b' : (theme === 'underwater_shallows' ? '#78350f' : '#eab308'),
            nextTheme === 'underwater_sand' ? '#eab308' : (nextTheme === 'underwater_shallows' ? '#78350f' : (nextTheme === 'jungle' ? '#15803d' : '#eab308')),
            blend
        );
        const seabedBotCol = lerpColor(seabedTopCol, '#020617', 0.45);

        const duneOffset = -(cameraX * 0.3) % 280;
        ctx.globalAlpha = uwAlpha * 0.85;
        ctx.fillStyle = seabedBotCol;
        for (let dx = duneOffset - 140; dx < canvas.width + 200; dx += 280) {
            ctx.fillRect(dx, 488, 160, 112);
            ctx.fillRect(dx + 30, 474, 100, 14);
        }

        ctx.fillStyle = seabedTopCol;
        ctx.fillRect(0, 502, canvas.width, 98);
        ctx.fillStyle = lerpColor(seabedTopCol, '#ffffff', 0.2);
        ctx.fillRect(0, 500, canvas.width, 4);

        const kelpOffset = -(cameraX * 0.45) % 140;
        for (let kx = kelpOffset - 70; kx < canvas.width + 140; kx += 140) {
            const sway = Math.sin(tickCount * 0.05 + kx * 0.03) * 6;
            ctx.fillStyle = theme === 'underwater_shallows' ? '#15803d' : '#0d9488';
            for (let seg = 0; seg < 5; seg++) {
                const segY = 486 - seg * 16;
                const segX = kx + 20 + sway * (seg / 4);
                ctx.fillRect(segX, segY, 8, 15);
            }
            if (sandVisibility > 0.2) {
                ctx.fillStyle = '#f43f5e';
                ctx.fillRect(kx + 72, 486, 14, 16);
                ctx.fillRect(kx + 66, 492, 6, 10);
                ctx.fillRect(kx + 86, 490, 6, 12);
            }
        }

        ctx.globalAlpha = uwAlpha * 0.6;
        ctx.strokeStyle = '#bae6fd';
        ctx.lineWidth = 1.5;
        for (let b = 0; b < 16; b++) {
            const bx = ((b * 73 - cameraX * 0.25) % canvas.width + canvas.width) % canvas.width;
            const by = 600 - ((tickCount * (0.9 + (b % 3) * 0.35) + b * 47) % 580);
            const bSize = (b % 3 === 0) ? 8 : 5;
            ctx.strokeRect(bx + Math.sin(tickCount * 0.05 + b) * 6, by, bSize, bSize);
        }

        ctx.restore();
        return;
    }

    if (theme === 'jungle') {
        ctx.save();

        ctx.globalAlpha = 0.12;
        ctx.fillStyle = '#fef08a';
        const beamOff = -(cameraX * 0.14) % 240;
        for (let bx = beamOff - 100; bx < canvas.width + 200; bx += 240) {
            ctx.beginPath();
            ctx.moveTo(bx, 0);
            ctx.lineTo(bx + 75, 0);
            ctx.lineTo(bx + 210, 600);
            ctx.lineTo(bx + 110, 600);
            ctx.closePath();
            ctx.fill();
        }
        ctx.globalAlpha = 1;

        const zigOffset = -(cameraX * 0.14) % 460;
        for (let zx = zigOffset - 230; zx < canvas.width + 260; zx += 460) {
            ctx.fillStyle = '#064e3b';
            ctx.fillRect(zx - 40, 290, 220, 310);
            ctx.fillRect(zx + 160, 320, 260, 280);

            const tx = zx + 110;
            const baseW = 180;
            const steps = 4;
            for (let s = 0; s < steps; s++) {
                const sw = baseW - s * 36;
                const sh = 34;
                const sx = tx + (baseW - sw) / 2;
                const sy = 340 - s * sh;
                ctx.fillStyle = '#115e59';
                ctx.fillRect(sx, sy, sw, sh + 4);
                ctx.fillStyle = '#0f766e';
                ctx.fillRect(sx, sy, sw, 6);
                ctx.strokeStyle = '#042f2e';
                ctx.lineWidth = 2;
                ctx.strokeRect(sx, sy, sw, sh);
            }
            ctx.fillStyle = '#134e4a';
            ctx.fillRect(tx + baseW / 2 - 14, 340 - (steps - 1) * 34, 28, steps * 34);
            ctx.fillStyle = '#34d399';
            ctx.fillRect(tx + baseW / 2 - 5, 340 - (steps - 1) * 34 + 10, 10, 10);
        }

        // Drzewa dżungli z naturalnymi, ukośnymi konarami i koronami liści (indeksowane w przestrzeni świata)
        const treeSpacing = 260;
        const treeScroll = cameraX * 0.32;
        const firstTreeIdx = Math.floor((treeScroll - 180) / treeSpacing);
        const lastTreeIdx = Math.ceil((treeScroll + canvas.width + 180) / treeSpacing);

        for (let tIdx = firstTreeIdx; tIdx <= lastTreeIdx; tIdx++) {
            const mx = tIdx * treeSpacing - treeScroll;
            const trunkX = mx + 90;

            // Główny pień z cieniowaniem kory
            ctx.fillStyle = '#3f2305';
            ctx.fillRect(trunkX - 18, 95, 36, 415);
            ctx.fillStyle = '#5c3409';
            ctx.fillRect(trunkX - 14, 95, 8, 415);
            ctx.fillStyle = '#291502';
            ctx.fillRect(trunkX + 4, 95, 14, 415);

            // Korzenie przyporowe u podstawy pnia
            ctx.fillStyle = '#3f2305';
            ctx.beginPath();
            ctx.moveTo(trunkX - 18, 385);
            ctx.lineTo(trunkX - 54, 505);
            ctx.lineTo(trunkX - 10, 505);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = '#291502';
            ctx.beginPath();
            ctx.moveTo(trunkX + 18, 385);
            ctx.lineTo(trunkX + 54, 505);
            ctx.lineTo(trunkX + 10, 505);
            ctx.closePath();
            ctx.fill();

            // Naturalne, zwężające się ukośne konary (zamiast płaskich poziomych belek)
            ctx.fillStyle = '#3f2305';
            ctx.beginPath();
            // Lewy dolny konar
            ctx.moveTo(trunkX - 16, 255);
            ctx.lineTo(trunkX - 78, 205);
            ctx.lineTo(trunkX - 72, 195);
            ctx.lineTo(trunkX - 14, 232);
            // Prawy dolny konar
            ctx.moveTo(trunkX + 16, 240);
            ctx.lineTo(trunkX + 76, 192);
            ctx.lineTo(trunkX + 70, 182);
            ctx.lineTo(trunkX + 14, 218);
            // Lewy górny konar
            ctx.moveTo(trunkX - 15, 178);
            ctx.lineTo(trunkX - 88, 128);
            ctx.lineTo(trunkX - 80, 118);
            ctx.lineTo(trunkX - 12, 156);
            // Prawy górny konar
            ctx.moveTo(trunkX + 15, 170);
            ctx.lineTo(trunkX + 86, 122);
            ctx.lineTo(trunkX + 78, 112);
            ctx.lineTo(trunkX + 12, 148);
            ctx.fill();

            // Podświetlenie górnej krawędzi konarów
            ctx.strokeStyle = '#5c3409';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(trunkX - 14, 233); ctx.lineTo(trunkX - 74, 196);
            ctx.moveTo(trunkX + 14, 219); ctx.lineTo(trunkX + 72, 183);
            ctx.moveTo(trunkX - 12, 157); ctx.lineTo(trunkX - 82, 119);
            ctx.moveTo(trunkX + 12, 149); ctx.lineTo(trunkX + 80, 113);
            ctx.stroke();

            // Boczne kępy liści na końcach konarów
            ctx.fillStyle = '#064e3b';
            ctx.fillRect(trunkX - 102, 176, 56, 32);
            ctx.fillRect(trunkX + 46, 164, 56, 32);
            ctx.fillStyle = '#059669';
            ctx.fillRect(trunkX - 96, 172, 44, 22);
            ctx.fillRect(trunkX + 52, 160, 44, 22);
            ctx.fillStyle = '#10b981';
            ctx.fillRect(trunkX - 90, 174, 28, 10);
            ctx.fillRect(trunkX + 58, 162, 28, 10);

            // Główna wielowarstwowa korona drzewa
            ctx.fillStyle = '#064e3b';
            ctx.fillRect(trunkX - 104, 48, 208, 72);
            ctx.fillRect(trunkX - 88, 112, 176, 48);

            ctx.fillStyle = '#065f46';
            ctx.fillRect(trunkX - 96, 54, 192, 58);
            ctx.fillRect(trunkX - 78, 114, 156, 36);

            ctx.fillStyle = '#059669';
            ctx.fillRect(trunkX - 86, 60, 154, 42);
            ctx.fillRect(trunkX - 68, 116, 124, 24);

            ctx.fillStyle = '#10b981';
            ctx.fillRect(trunkX - 74, 64, 110, 20);
        }

        ctx.fillStyle = '#052e16';
        ctx.fillRect(0, 494, canvas.width, 106);
        ctx.fillStyle = '#15803d';
        ctx.fillRect(0, 490, canvas.width, 8);

        const fgOffset = -(cameraX * 0.52) % 180;
        for (let fx = fgOffset - 90; fx < canvas.width + 180; fx += 180) {
            const bamX = fx + 28;
            ctx.fillStyle = '#15803d';
            ctx.fillRect(bamX, 310, 10, 186);
            ctx.fillStyle = '#22c55e';
            ctx.fillRect(bamX, 310, 5, 186);
            ctx.fillStyle = '#052e16';
            for (let by = 335; by < 490; by += 32) {
                ctx.fillRect(bamX - 1, by, 12, 3);
                ctx.fillStyle = '#4ade80';
                ctx.fillRect(bamX + 10, by - 6, 12, 5);
                ctx.fillRect(bamX - 12, by + 6, 12, 5);
                ctx.fillStyle = '#052e16';
            }

            const bushX = fx + 95;
            ctx.fillStyle = '#14532d';
            ctx.fillRect(bushX - 28, 462, 56, 32);
            ctx.fillStyle = '#16a34a';
            ctx.fillRect(bushX - 22, 452, 44, 24);
            ctx.fillStyle = '#4ade80';
            ctx.fillRect(bushX - 14, 446, 28, 12);

            ctx.fillStyle = '#f43f5e';
            ctx.fillRect(bushX - 5, 456, 10, 10);
            ctx.fillStyle = '#facc15';
            ctx.fillRect(bushX - 2, 459, 4, 4);
        }

        // Stabilne, bujające się liany w przestrzeni świata (nigdy nie znikają ani nie skaczą przy ruchu kamery!)
        const vineSpacing = 160;
        const vineScroll = cameraX * 0.42;
        const firstVineIdx = Math.floor((vineScroll - 100) / vineSpacing);
        const lastVineIdx = Math.ceil((vineScroll + canvas.width + 160) / vineSpacing);

        for (let vIdx = firstVineIdx; vIdx <= lastVineIdx; vIdx++) {
            const vx = vIdx * vineSpacing - vineScroll;
            const seed = ((vIdx * 2654435761) >>> 0);
            const vineH = 115 + (seed % 65);
            const phaseOffset = (seed % 628) * 0.01;
            const sway = Math.sin(tickCount * 0.042 + phaseOffset) * 12;

            // Górne sklepienie liści, z którego wyrasta liana
            ctx.fillStyle = '#052e16';
            ctx.fillRect(vx - 12, 0, 114, 26);
            ctx.fillStyle = '#065f46';
            ctx.fillRect(vx + 2, 16, 86, 18);
            ctx.fillStyle = '#10b981';
            ctx.fillRect(vx + 14, 20, 52, 8);

            const x0 = vx + 44;
            const y0 = 24;
            const cx = x0 + sway * 0.65;
            const cy = y0 + (vineH - y0) * 0.52;
            const x1 = x0 + sway * 1.45;
            const y1 = vineH;

            // Ciemny obrys liany (zapobiega zlewaniu się z tłem)
            ctx.lineCap = 'round';
            ctx.strokeStyle = '#022c22';
            ctx.lineWidth = 6.5;
            ctx.beginPath();
            ctx.moveTo(x0, y0);
            ctx.quadraticCurveTo(cx, cy, x1, y1);
            ctx.stroke();

            // Jasny rdzeń liany
            ctx.strokeStyle = '#10b981';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(x0, y0);
            ctx.quadraticCurveTo(cx, cy, x1, y1);
            ctx.stroke();

            // Listki dokładnie na krzywej Béziera liany
            const leafSteps = 5;
            for (let s = 1; s <= leafSteps; s++) {
                const t = s / (leafSteps + 0.4);
                const invT = 1 - t;
                const lx = invT * invT * x0 + 2 * invT * t * cx + t * t * x1;
                const ly = invT * invT * y0 + 2 * invT * t * cy + t * t * y1;
                const side = (s & 1) ? 1 : -1;

                ctx.fillStyle = '#047857';
                ctx.fillRect(lx + side * 3 - 4, ly - 2, 9, 6);
                ctx.fillStyle = '#34d399';
                ctx.fillRect(lx + side * 4 - 3, ly - 3, 7, 4);
            }

            // Tropikalny pąk kwiatowy na końcu liany
            ctx.fillStyle = (vIdx & 1) ? '#f43f5e' : '#facc15';
            ctx.fillRect(x1 - 5, y1 - 3, 10, 10);
            ctx.fillStyle = '#fef08a';
            ctx.fillRect(x1 - 2, y1, 4, 4);
        }

        for (const m of bgMotes) {
            const pulse = 0.45 + Math.sin(tickCount * 0.06 + m.phase) * 0.35;
            ctx.globalAlpha = Math.max(0, pulse);
            ctx.fillStyle = '#fde047';
            ctx.fillRect(m.x, m.y, m.r * 2, m.r * 2);
        }
        ctx.globalAlpha = 1;

        ctx.restore();
        return;
    }

    if ((theme === 'day' || theme === 'jungle' || nextTheme === 'jungle') && blend < 0.95) {
        ctx.save();
        const sunAlpha = (theme === 'day')
            ? Math.max(0, 1 - blend * 1.15)
            : (theme === 'jungle' ? 0.9 : (nextTheme === 'jungle' ? blend * 0.9 : 0));
        if (sunAlpha > 0.02) {
            const sunX = canvas.width - 140;
            const sunY = 96;
            const pulse = Math.sin(tickCount * 0.05) * 4;

            ctx.translate(sunX, sunY);

            ctx.globalAlpha = sunAlpha * 0.16;
            ctx.fillStyle = '#fef08a';
            const outerS = 112 + pulse * 1.5;
            ctx.fillRect(-outerS / 2, -outerS / 2, outerS, outerS);

            ctx.save();
            ctx.rotate(Math.PI / 4);
            ctx.globalAlpha = sunAlpha * 0.28;
            ctx.fillStyle = '#fde047';
            const rotS = 78 + pulse;
            ctx.fillRect(-rotS / 2, -rotS / 2, rotS, rotS);
            ctx.restore();

            ctx.globalAlpha = sunAlpha * 0.45;
            ctx.fillStyle = '#facc15';
            ctx.fillRect(-6, -58 - pulse * 0.5, 12, 10);
            ctx.fillRect(-6, 48 + pulse * 0.5, 12, 10);
            ctx.fillRect(-58 - pulse * 0.5, -6, 10, 12);
            ctx.fillRect(48 + pulse * 0.5, -6, 10, 12);

            ctx.globalAlpha = sunAlpha;
            ctx.fillStyle = '#f59e0b';
            ctx.fillRect(-38, -38, 76, 76);

            ctx.fillStyle = '#fde047';
            ctx.fillRect(-33, -33, 66, 66);

            ctx.strokeStyle = '#fef9c3';
            ctx.lineWidth = 3;
            ctx.strokeRect(-28, -28, 56, 56);

            ctx.fillStyle = '#fef08a';
            ctx.fillRect(-20, -20, 40, 40);

            ctx.fillStyle = '#ffffff';
            ctx.fillRect(-24, -24, 10, 10);
            ctx.fillRect(-11, -24, 5, 5);
            ctx.fillRect(-24, -11, 5, 5);
        }
        ctx.restore();
    }

    if (theme === 'forest' || theme === 'darkforest' || nextTheme === 'forest' || nextTheme === 'darkforest') {
        const moonAlpha = (theme === 'day') ? blend : 1;
        if (moonAlpha > 0.02) {
            ctx.save();
            const crimsonFactor = theme === 'darkforest' ? 1 : (nextTheme === 'darkforest' ? blend : 0);

            const moonMain   = lerpColor('#e2e8f0', '#ef4444', crimsonFactor);
            const moonRim    = lerpColor('#f8fafc', '#fca5a5', crimsonFactor);
            const moonShade  = lerpColor('#94a3b8', '#991b1b', crimsonFactor);
            const craterCol  = lerpColor('#64748b', '#7f1d1d', crimsonFactor);
            const glowCol    = lerpColor('#818cf8', '#dc2626', crimsonFactor);

            const moonX = canvas.width - 150;
            const moonY = 100;
            const pulse = Math.sin(tickCount * 0.04) * 3;

            ctx.translate(moonX, moonY);

            ctx.globalAlpha = moonAlpha * 0.15;
            ctx.fillStyle = glowCol;
            const halo1 = 124 + pulse * 1.5;
            ctx.fillRect(-halo1 / 2, -halo1 / 2, halo1, halo1);

            ctx.globalAlpha = moonAlpha * 0.26;
            const halo2 = 92 + pulse;
            ctx.fillRect(-halo2 / 2, -halo2 / 2, halo2, halo2);

            ctx.globalAlpha = moonAlpha;
            ctx.fillStyle = moonMain;
            ctx.fillRect(-38, -38, 76, 76);

            ctx.fillStyle = moonShade;
            ctx.fillRect(18, -38, 20, 76);
            ctx.fillRect(-38, 20, 76, 18);

            ctx.strokeStyle = moonRim;
            ctx.lineWidth = 3;
            ctx.strokeRect(-37, -37, 74, 74);

            const craters = [
                { x: -24, y: -22, w: 16, h: 16 },
                { x: 2,   y: -12, w: 11, h: 11 },
                { x: -16, y: 4,   w: 13, h: 13 },
                { x: 8,   y: 8,   w: 9,  h: 9 }
            ];
            for (const cr of craters) {
                ctx.fillStyle = craterCol;
                ctx.fillRect(cr.x, cr.y, cr.w, cr.h);
                ctx.fillStyle = moonShade;
                ctx.fillRect(cr.x + 2, cr.y + 2, cr.w - 2, cr.h - 2);
                ctx.fillStyle = moonRim;
                ctx.fillRect(cr.x, cr.y, cr.w, 2);
            }

            ctx.fillStyle = '#ffffff';
            ctx.globalAlpha = moonAlpha * 0.75;
            ctx.fillRect(-31, -31, 8, 8);

            ctx.restore();
        }
    }

    if (theme === 'castle') {
        ctx.strokeStyle = 'rgba(30, 41, 59, 0.45)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let by = 40; by < 600; by += 40) {
            ctx.moveTo(0, by);
            ctx.lineTo(canvas.width, by);
        }
        ctx.stroke();
        for (let x = 70; x < canvas.width; x += 170) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
            ctx.fillRect(x + 8, 0, 56, 600);

            ctx.fillStyle = '#0f1420';
            ctx.fillRect(x, 0, 52, 600);
            ctx.strokeStyle = '#1e293b';
            ctx.lineWidth = 2;
            ctx.strokeRect(x, 0, 52, 600);
            ctx.fillStyle = '#334155';
            ctx.fillRect(x + 22, 180, 8, 22);
            ctx.fillStyle = (tickCount % 12 < 6) ? '#f97316' : '#facc15';
            ctx.beginPath();
            ctx.arc(x + 26, 174, 8, 0, Math.PI * 2);
            ctx.fill();
        }
    } else {
        const farMountColors = { day: '#38bdf8', forest: '#1e1b4b', darkforest: '#180926', underwater: '#075985', jungle: '#065f46' };
        const farBase = lerpColor(farMountColors[theme] || '#38bdf8', farMountColors[nextTheme] || farMountColors[theme] || '#38bdf8', blend);
        const farShadow = lerpColor(farBase, '#090d16', 0.22);
        const farOffset = -(cameraX * 0.08) % 440;
        for (let fx = farOffset - 220; fx < canvas.width + 240; fx += 440) {
            ctx.fillStyle = farBase;
            ctx.beginPath();
            ctx.moveTo(fx, 600);
            ctx.lineTo(fx + 220, 195);
            ctx.lineTo(fx + 220, 600);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = farShadow;
            ctx.beginPath();
            ctx.moveTo(fx + 220, 195);
            ctx.lineTo(fx + 440, 600);
            ctx.lineTo(fx + 220, 600);
            ctx.closePath();
            ctx.fill();
        }

        const mountLightColors = { day: '#64748b', forest: '#312e81', darkforest: '#3b0764', underwater: '#0369a1', jungle: '#047857' };
        const mountDarkColors  = { day: '#475569', forest: '#1e1b4b', darkforest: '#24053d', underwater: '#0c4a6e', jungle: '#064e3b' };
        const snowColors       = { day: '#f1f5f9', forest: '#818cf8', darkforest: '#f43f5e', underwater: '#38bdf8', jungle: '#6ee7b7' };

        const mLight = lerpColor(mountLightColors[theme] || '#64748b', mountLightColors[nextTheme] || mountLightColors[theme] || '#64748b', blend);
        const mDark  = lerpColor(mountDarkColors[theme]  || '#475569', mountDarkColors[nextTheme]  || mountDarkColors[theme]  || '#475569', blend);
        const mSnow  = lerpColor(snowColors[theme]       || '#f1f5f9', snowColors[nextTheme]       || snowColors[theme]       || '#f1f5f9', blend);

        const mountOffset = -(cameraX * 0.16) % 380;
        for (let mx = mountOffset - 200; mx < canvas.width + 220; mx += 380) {
            const peakX = mx + 190;
            const peakY = 205;

            ctx.fillStyle = mLight;
            ctx.beginPath();
            ctx.moveTo(mx, 600);
            ctx.lineTo(peakX, peakY);
            ctx.lineTo(peakX, 600);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = mDark;
            ctx.beginPath();
            ctx.moveTo(peakX, peakY);
            ctx.lineTo(mx + 380, 600);
            ctx.lineTo(peakX, 600);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = mSnow;
            ctx.beginPath();
            ctx.moveTo(peakX, peakY);
            ctx.lineTo(peakX - 46, peakY + 95);
            ctx.lineTo(peakX - 16, peakY + 78);
            ctx.lineTo(peakX, peakY + 102);
            ctx.lineTo(peakX + 20, peakY + 82);
            ctx.lineTo(peakX + 46, peakY + 95);
            ctx.closePath();
            ctx.fill();
        }

        const cloudColors = { day: '#f8fafc', forest: '#475569', darkforest: '#334155', underwater: '#0284c7', jungle: '#ecfdf5' };
        const cloudShadowColors = { day: '#cbd5e1', forest: '#334155', darkforest: '#1e293b', underwater: '#0369a1', jungle: '#a7f3d0' };
        const cFill = lerpColor(cloudColors[theme] || '#f8fafc', cloudColors[nextTheme] || cloudColors[theme] || '#f8fafc', blend);
        const cShad = lerpColor(cloudShadowColors[theme] || '#cbd5e1', cloudShadowColors[nextTheme] || cloudShadowColors[theme] || '#cbd5e1', blend);
        const cEye  = lerpColor(theme === 'day' ? '#1e293b' : '#cbd5e1', (nextTheme || theme) === 'day' ? '#1e293b' : '#cbd5e1', blend);

        const cloudOffset = -(cameraX * 0.22) % 320;
        for (let cx = cloudOffset - 100; cx < canvas.width + 160; cx += 320) {
            ctx.fillStyle = cShad;
            ctx.beginPath();
            ctx.arc(cx, 100, 26, 0, Math.PI * 2);
            ctx.arc(cx + 25, 90, 32, 0, Math.PI * 2);
            ctx.arc(cx + 52, 100, 24, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = cFill;
            ctx.beginPath();
            ctx.arc(cx, 94, 26, 0, Math.PI * 2);
            ctx.arc(cx + 25, 84, 32, 0, Math.PI * 2);
            ctx.arc(cx + 52, 94, 24, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = cEye;
            ctx.fillRect(cx + 15, 79, 4, 9);
            ctx.fillRect(cx + 34, 79, 4, 9);
        }

        const hillMap = { day: '#4ade80', forest: '#1e293b', darkforest: '#111827', underwater: '#0e7490', jungle: '#15803d' };
        const hillHighlightMap = { day: '#86efac', forest: '#334155', darkforest: '#1f2937', underwater: '#22d3ee', jungle: '#4ade80' };
        const hillColor = lerpColor(hillMap[theme] || '#4ade80', hillMap[nextTheme] || hillMap[theme] || '#4ade80', blend);
        const hillRim   = lerpColor(hillHighlightMap[theme] || '#86efac', hillHighlightMap[nextTheme] || hillHighlightMap[theme] || '#86efac', blend);
        const hillShade = lerpColor(hillColor, '#05070e', 0.25);

        const hillOffset = -(cameraX * 0.35) % 360;
        for (let hx = hillOffset - 180; hx < canvas.width + 200; hx += 360) {
            ctx.fillStyle = hillShade;
            ctx.beginPath();
            ctx.arc(hx + 188, 606, 232, Math.PI, 0);
            ctx.fill();

            ctx.fillStyle = hillColor;
            ctx.beginPath();
            ctx.arc(hx + 180, 600, 230, Math.PI, 0);
            ctx.fill();

            ctx.strokeStyle = hillRim;
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(hx + 180, 600, 228, Math.PI * 1.12, Math.PI * 1.88);
            ctx.stroke();

            ctx.fillStyle = lerpColor(hillColor, '#090d16', 0.18);
            ctx.fillRect(hx + 130, 445, 22, 14);
            ctx.fillRect(hx + 210, 465, 18, 12);
        }

        const horizonGroundMap = { day: '#15803d', forest: '#0b1324', darkforest: '#07070c', underwater: '#083344', jungle: '#052e16' };
        const horizonTopMap    = { day: '#22c55e', forest: '#1e293b', darkforest: '#18181b', underwater: '#06b6d4', jungle: '#16a34a' };
        const horizonColor = lerpColor(horizonGroundMap[theme] || '#15803d', horizonGroundMap[nextTheme] || horizonGroundMap[theme] || '#15803d', blend);
        const horizonRim   = lerpColor(horizonTopMap[theme]    || '#22c55e', horizonTopMap[nextTheme]    || horizonTopMap[theme]    || '#22c55e', blend);

        ctx.fillStyle = horizonColor;
        ctx.fillRect(0, 496, canvas.width, 104);
        ctx.fillStyle = horizonRim;
        ctx.fillRect(0, 494, canvas.width, 5);

        const treeLightMap = { day: '#22c55e', forest: '#1e293b', darkforest: '#18181b', underwater: '#0d9488', jungle: '#16a34a' };
        const treeDarkMap  = { day: '#15803d', forest: '#0f172a', darkforest: '#09090b', underwater: '#115e59', jungle: '#14532d' };
        const trunkMap     = { day: '#78350f', forest: '#3f2305', darkforest: '#1c1917', underwater: '#134e4a', jungle: '#451a03' };

        const tLight = lerpColor(treeLightMap[theme] || '#22c55e', treeLightMap[nextTheme] || treeLightMap[theme] || '#22c55e', blend);
        const tDark  = lerpColor(treeDarkMap[theme]  || '#15803d', treeDarkMap[nextTheme]  || treeDarkMap[theme]  || '#15803d', blend);
        const tTrunk = lerpColor(trunkMap[theme]     || '#78350f', trunkMap[nextTheme]     || trunkMap[theme]     || '#78350f', blend);
        const tTrunkDark = lerpColor(tTrunk, '#05070e', 0.35);

        const treeOffset = -(cameraX * 0.55) % 150;
        for (let tx = treeOffset - 80; tx < canvas.width + 150; tx += 150) {
            const centerX = tx + 34;
            const groundY = 504;

            ctx.fillStyle = 'rgba(0, 0, 0, 0.28)';
            ctx.beginPath();
            ctx.ellipse(centerX, groundY + 3, 28, 7, 0, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = tTrunk;
            ctx.fillRect(centerX - 6, groundY - 46, 6, 48);
            ctx.fillStyle = tTrunkDark;
            ctx.fillRect(centerX, groundY - 46, 6, 48);
            ctx.fillRect(centerX - 10, groundY - 4, 20, 6);

            const tiers = [
                { topY: 400, botY: 462, halfW: 34 },
                { topY: 364, botY: 422, halfW: 27 },
                { topY: 330, botY: 382, halfW: 20 }
            ];
            for (const tier of tiers) {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';
                ctx.fillRect(centerX - tier.halfW + 4, tier.botY, (tier.halfW - 4) * 2, 4);

                ctx.fillStyle = tLight;
                ctx.beginPath();
                ctx.moveTo(centerX, tier.topY);
                ctx.lineTo(centerX - tier.halfW, tier.botY);
                ctx.lineTo(centerX, tier.botY);
                ctx.closePath();
                ctx.fill();

                ctx.fillStyle = tDark;
                ctx.beginPath();
                ctx.moveTo(centerX, tier.topY);
                ctx.lineTo(centerX + tier.halfW, tier.botY);
                ctx.lineTo(centerX, tier.botY);
                ctx.closePath();
                ctx.fill();
            }
        }
    }

    if (theme !== 'day' || nextTheme) {
        const moteAlphaScale = (theme === 'day') ? blend : 1;
        for (const m of bgMotes) {
            const pulse = (0.4 + Math.sin(tickCount * 0.06 + m.phase) * 0.3) * moteAlphaScale;
            ctx.globalAlpha = Math.max(0, pulse);
            ctx.fillStyle = (theme === 'forest' || nextTheme === 'forest') ? '#a5f3fc' : '#fca5a5';
            ctx.beginPath();
            ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;
    }
}

const BLOCK_PALETTES = {
    day:                 { body: '#854d0e', dark: '#5f370a', light: '#9a6528', cap: '#22c55e', capTop: '#64d68e', border: '#291502', style: 'earth' },
    forest:              { body: '#451a03', dark: '#2e1102', light: '#623b26', cap: '#10b981', capTop: '#4cce9f', border: '#1c0a01', style: 'earth' },
    darkforest:          { body: '#27272a', dark: '#18181b', light: '#3f3f46', cap: '#dc2626', capTop: '#e75c5c', border: '#09090b', style: 'earth' },
    jungle:              { body: '#422006', dark: '#2c1504', light: '#5c3c24', cap: '#16a34a', capTop: '#50ba77', border: '#1a0c02', style: 'earth' },
    jungle_outpost:      { body: '#422006', dark: '#2c1504', light: '#5c3c24', cap: '#16a34a', capTop: '#50ba77', border: '#1a0c02', style: 'earth' },
    castle:              { body: '#1e293b', dark: '#0f172a', light: '#334155', cap: '#334155', capTop: '#64748b', border: '#64748b', style: 'brick' },
    underwater_castle:   { body: '#0f172a', dark: '#020617', light: '#1e293b', cap: '#0d9488', capTop: '#2dd4bf', border: '#0284c7', style: 'brick' },
    underwater_sand:     { body: '#ca8a04', dark: '#a16207', light: '#fde047', cap: '#facc15', capTop: '#fde047', border: '#713f12', style: 'sand' },
    underwater_shallows: { body: '#5c3a21', dark: '#3f2305', light: '#b45309', cap: '#4d7c0f', capTop: '#22c55e', border: '#291502', style: 'shallows' },
    john_base:           { body: '#0f172a', dark: '#020617', light: '#1e293b', cap: '#0284c7', capTop: '#67e8f9', border: '#38bdf8', style: 'cyber' }
};

function easeOutBack(t) {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) * 0.5;
}

function drawSolidBlock(x, y, w, h, theme, isPlatform, isFalling, nextTheme = null, blend = 0) {
    const isLow = typeof lowEndMode !== 'undefined' && lowEndMode;
    const smoothB = blend <= 0.001 ? 0 : (blend >= 0.999 ? 1 : blend * blend * (3 - 2 * blend));

    const pA = BLOCK_PALETTES[theme] || BLOCK_PALETTES.day;
    const pB = (nextTheme && BLOCK_PALETTES[nextTheme]) ? BLOCK_PALETTES[nextTheme] : pA;

    let bodyA = pA.body;
    let bodyB = pB.body;
    if (isPlatform) {
        if (pA.style === 'brick') bodyA = theme === 'underwater_castle' ? '#334155' : '#475569';
        else if (pA.style === 'cyber') bodyA = '#1e293b';
        if (pB.style === 'brick') bodyB = nextTheme === 'underwater_castle' ? '#334155' : '#475569';
        else if (pB.style === 'cyber') bodyB = '#1e293b';
    }

    const bodyColor   = lerpColor(bodyA, bodyB, smoothB);
    const darkColor   = lerpColor(pA.dark, pB.dark, smoothB);
    const lightColor  = lerpColor(pA.light, pB.light, smoothB);
    const capBaseCol  = (isFalling && (theme === 'john_base' || nextTheme === 'john_base'))
        ? lerpColor(pA.cap, '#f43f5e', theme === 'john_base' ? 1 : smoothB)
        : lerpColor(pA.cap, pB.cap, smoothB);
    const capTopCol   = (isFalling && (theme === 'john_base' || nextTheme === 'john_base'))
        ? lerpColor(pA.capTop, '#fda4af', theme === 'john_base' ? 1 : smoothB)
        : lerpColor(pA.capTop, pB.capTop, smoothB);
    const borderColor = lerpColor(pA.border, pB.border, smoothB);

    const capH = Math.min(theme === 'john_base' || pA.style === 'brick' ? 6 : 10, Math.max(3, Math.floor(h * 0.35)));

    // Szybka ścieżka Low-End (3 operacje rysowania + płynna interpolacja kolorów między wszystkimi biomami!)
    if (isLow) {
        ctx.fillStyle = bodyColor;
        ctx.fillRect(x | 0, y | 0, w | 0, h | 0);
        ctx.fillStyle = capBaseCol;
        ctx.fillRect(x | 0, y | 0, w | 0, capH | 0);
        if (isFalling && h >= 14) {
            ctx.fillStyle = darkColor;
            const crackH = Math.max(4, Math.min(h - capH - 2, (h * 0.6) | 0));
            ctx.fillRect((x + w * 0.32) | 0, (y + capH) | 0, 3, crackH);
        }
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = 1.5;
        ctx.strokeRect((x | 0) + 1, (y | 0) + 1, (w | 0) - 2, (h | 0) - 2);
        return;
    }

    // Ścieżka High Graphics z płynnym przejściem tekstur (np. Zamek -> Piasek -> Płycizna -> Dżungla -> Baza Johna)
    // i ścisłym przycięciem detali do granic bloku [x, y, w, h]
    const visMinX = Math.max(x, Math.floor((cameraX - x) / TILE) * TILE + x);
    const visMaxX = Math.min(x + w, cameraX + canvas.width + TILE);
    const maxInX = x + w - 3;
    const maxInY = y + h - 3;

    // Cień pod blokiem
    ctx.fillStyle = 'rgba(0, 0, 0, 0.24)';
    ctx.fillRect(x + 4, y + 5, w, h);

    // Główna bryła bloku
    ctx.fillStyle = bodyColor;
    ctx.fillRect(x, y, w, h);

    // Wagi stylów powierzchni podczas płynnej tranzycji (0..1)
    const brickWeight = (pA.style === 'brick' ? (1 - smoothB) : 0) + (pB.style === 'brick' ? smoothB : 0);
    const gridWeight  = (pA.style !== 'brick' ? (1 - smoothB) : 0) + (pB.style !== 'brick' ? smoothB : 0);
    const cyberWeight = (pA.style === 'cyber' ? (1 - smoothB) : 0) + (pB.style === 'cyber' ? smoothB : 0);
    const pebbleWeight = ((pA.style === 'earth' || pA.style === 'sand' || pA.style === 'shallows') ? (1 - smoothB) : 0) +
                         ((pB.style === 'earth' || pB.style === 'sand' || pB.style === 'shallows') ? smoothB : 0);
    const grassWeight = (pA.style === 'earth' ? (1 - smoothB) : 0) + (pB.style === 'earth' ? smoothB : 0);

    // 1. Siatka kafelków (dla piasku, ziemi, płycizny i bazy Johna)
    if (gridWeight > 0.05 && (w > TILE || h > TILE)) {
        ctx.save();
        ctx.globalAlpha = gridWeight * (cyberWeight > 0.3 ? 0.22 : 0.16);
        ctx.strokeStyle = cyberWeight > 0.3 ? '#38bdf8' : '#000000';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let gx = Math.max(x + TILE, visMinX); gx < visMaxX - 1; gx += TILE) {
            if (gx > x + 1 && gx < x + w - 1) {
                ctx.moveTo(gx, y + 1);
                ctx.lineTo(gx, y + h - 1);
            }
        }
        for (let gy = y + TILE; gy < y + h - 1; gy += TILE) {
            ctx.moveTo(x + 1, gy);
            ctx.lineTo(x + w - 1, gy);
        }
        ctx.stroke();
        ctx.restore();
    }

    // 2. Cegły zamkowe (płynnie zanikają przy przejściu w piasek na Poz. 54!)
    if (brickWeight > 0.04 && h >= 16 && w >= 20) {
        ctx.save();
        ctx.globalAlpha = brickWeight * 0.5;
        ctx.strokeStyle = (theme === 'underwater_castle' || nextTheme === 'underwater_castle') ? '#0e7490' : '#0f172a';
        ctx.lineWidth = 1.5;
        const brickH = 20;
        const brickW = 40;
        ctx.beginPath();
        for (let by = y + brickH; by < y + h - 2; by += brickH) {
            ctx.moveTo(x + 1, by);
            ctx.lineTo(x + w - 1, by);
        }
        for (let row = 0, by = y; by < y + h - 2; by += brickH, row++) {
            const offset = (row & 1) * (brickW * 0.5);
            const rowBot = Math.min(y + h - 1, by + brickH);
            for (let bx = x + offset; bx < x + w - 2; bx += brickW) {
                if (bx > x + 2 && bx >= visMinX - brickW && bx <= visMaxX) {
                    ctx.moveTo(bx, by + 1);
                    ctx.lineTo(bx, rowBot);
                }
            }
        }
        ctx.stroke();
        ctx.restore();
    }

    // 3. Kamyczki / ziarenka piasku / plamy mułu (ściśle przycięte do wnętrza bloku!)
    if (pebbleWeight > 0.05 && h >= capH + 14 && w >= 20) {
        ctx.save();
        ctx.globalAlpha = pebbleWeight;
        for (let tx = visMinX; tx < visMaxX - 8; tx += TILE) {
            for (let ty = y + capH + 4; ty < y + h - 8; ty += TILE) {
                if (tx + 15 <= maxInX && ty + 11 <= maxInY) {
                    ctx.fillStyle = darkColor;
                    ctx.fillRect(tx + 7, ty + 5, 7, 5);
                }
                if (tx + 30 <= maxInX && ty + 22 <= maxInY) {
                    ctx.fillStyle = darkColor;
                    ctx.fillRect(tx + 22, ty + 16, 7, 5);
                }
                if (tx + 24 <= maxInX && ty + 11 <= maxInY) {
                    ctx.fillStyle = lightColor;
                    ctx.fillRect(tx + 18, ty + 6, 5, 4);
                }
                if (tx + 15 <= maxInX && ty + 24 <= maxInY) {
                    ctx.fillStyle = lightColor;
                    ctx.fillRect(tx + 9, ty + 19, 5, 4);
                }
            }
        }
        ctx.restore();
    }

    // 4. Górna warstwa (trawa / piasek / kamienny gzyms / cyber-listwa)
    ctx.fillStyle = capBaseCol;
    ctx.fillRect(x + 1, y + 1, w - 2, capH);

    ctx.fillStyle = capTopCol;
    ctx.fillRect(x + 1, y + 1, w - 2, Math.min(3, capH));

    // Złote osady piasku na zatopionym zamku / płyciźnie
    if ((theme === 'underwater_castle' || theme === 'underwater_shallows' || nextTheme === 'underwater_shallows') && w >= 28) {
        ctx.fillStyle = '#eab308';
        for (let sx = x + 6; sx + 10 <= x + w - 4; sx += 24) {
            if (sx >= visMinX - 24 && sx <= visMaxX) {
                ctx.fillRect(sx, y + 1, 10, 3);
            }
        }
    }

    // 5. Kępki trawy (ściśle wewnątrz szerokości bloku i bez migotania przy trzęsieniu!)
    if (grassWeight > 0.05 && h >= 20 && w >= 20) {
        const grassShade = lerpColor(capBaseCol, '#05070e', 0.28);
        ctx.save();
        ctx.globalAlpha = grassWeight;
        for (let offsetG = 4; offsetG + 12 <= w - 3; offsetG += 12) {
            const gx = x + offsetG;
            if (gx < visMinX - 12 || gx > visMaxX) continue;
            const tuftH = ((offsetG % 24 === 4) ? 5 : 3);
            if (y + capH + tuftH <= maxInY) {
                ctx.fillStyle = capBaseCol;
                ctx.fillRect(gx, y + capH, 6, tuftH);
                ctx.fillStyle = grassShade;
                ctx.fillRect(gx + 6, y + capH, 5, 2);
            }
        }
        ctx.restore();
    }

    // 6. Pęknięcie na zapadających się podłogach
    if (isFalling && h >= 12) {
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.58)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x + w * 0.3, y + Math.min(capH, h * 0.3));
        ctx.lineTo(x + w * 0.36, y + h * 0.55);
        ctx.lineTo(x + w * 0.28, y + h * 0.85);
        ctx.stroke();
    }

    // 7. Czysty obrys zewnętrzny bloku
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 2;
    ctx.strokeRect(x + 1, y + 1, w - 2, h - 2);
}

function drawSpikes(x, y, w, h, dir, extProgress = 1) {
    const isLow = typeof lowEndMode !== 'undefined' && lowEndMode;
    const count = Math.max(2, Math.floor(w / 14));
    const sw = w / count;

    // Płynne nieliniowe wysuwanie kolców (easeOutBack) w trybie High Graphics
    let effH = h;
    if (!isLow && dir === 'up' && extProgress < 1) {
        const eased = Math.max(0.05, Math.min(1.08, easeOutBack(Math.max(0, Math.min(1, extProgress)))));
        effH = h * eased;
    }

    if (!isLow && dir === 'up') {
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(x, y + h - 4, w, 4);
    }

    ctx.fillStyle = '#e2e8f0';
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1.5;

    ctx.beginPath();
    for (let i = 0; i < count; i++) {
        const sx = x + i * sw;
        if (dir === 'up') {
            ctx.moveTo(sx, y + h);
            ctx.lineTo(sx + sw * 0.5, y + h - effH);
            ctx.lineTo(sx + sw, y + h);
        } else {
            ctx.moveTo(sx, y);
            ctx.lineTo(sx + sw * 0.5, y + effH);
            ctx.lineTo(sx + sw, y);
        }
        ctx.closePath();
    }
    ctx.fill();

    if (!isLow) {
        ctx.stroke();
        // Metaliczny połysk na ostrzach kolców w trybie High Graphics
        ctx.fillStyle = '#ffffff';
        for (let i = 0; i < count; i++) {
            const sx = x + i * sw;
            if (dir === 'up') {
                ctx.fillRect(sx + sw * 0.46, y + h - effH + 4, 1.5, Math.max(2, effH * 0.45));
            } else {
                ctx.fillRect(sx + sw * 0.46, y + 3, 1.5, Math.max(2, effH * 0.45));
            }
        }
    }
}

function drawGoalPortal(x, y, w, h, color, label) {
    const isLow = typeof lowEndMode !== 'undefined' && lowEndMode;
    if (isLow) {
        ctx.fillStyle = '#090d16';
        ctx.fillRect(x | 0, y | 0, w | 0, h | 0);
        ctx.fillStyle = color;
        ctx.fillRect((x + 6) | 0, (y + 6) | 0, (w - 12) | 0, (h - 12) | 0);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect((x + 12) | 0, (y + 12) | 0, (w - 24) | 0, (h - 24) | 0);
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.strokeRect(x | 0, y | 0, w | 0, h | 0);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px JetBrains Mono';
        ctx.textAlign = 'center';
        ctx.fillText(label, (x + w * 0.5) | 0, (y - 6) | 0);
        return;
    }

    ctx.save();
    ctx.shadowColor = color;
    ctx.shadowBlur = 16 + Math.sin(tickCount * 0.08) * 5;

    ctx.fillStyle = color;
    ctx.globalAlpha = 0.28 + Math.sin(tickCount * 0.08) * 0.1;
    ctx.fillRect(x - 4, y - 4, w + 8, h + 8);
    ctx.globalAlpha = 1;

    ctx.fillStyle = '#ffffff';
    ctx.globalAlpha = 0.45 + Math.sin(tickCount * 0.12) * 0.18;
    ctx.fillRect(x + 8, y + 8, w - 16, h - 16);
    ctx.globalAlpha = 1;

    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.strokeRect(x, y, w, h);

    ctx.fillStyle = '#334155';
    ctx.fillRect(x - 6, y + h - 4, w + 12, 6);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px JetBrains Mono';
    ctx.textAlign = 'center';
    ctx.fillText(label, x + w / 2, y - 8);
    ctx.restore();
}

function drawCastleGate(goalX, goalY) {
    ctx.save();
    const gx = goalX - 55;
    const gy = goalY - 148;
    const gw = 150;
    const gh = 220;

    ctx.fillStyle = '#1e293b';
    ctx.fillRect(gx, gy, gw, gh);
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 3;
    ctx.strokeRect(gx, gy, gw, gh);

    for (let bx = gx - 10; bx < gx + gw + 10; bx += 32) {
        ctx.fillStyle = '#334155';
        ctx.fillRect(bx, gy - 22, 22, 22);
        ctx.strokeRect(bx, gy - 22, 22, 22);
    }

    ctx.fillStyle = '#090d16';
    ctx.fillRect(goalX - 18, goalY - 24, 76, 96);

    ctx.fillStyle = '#f97316';
    ctx.fillRect(gx + 18, gy + 70, 8, 14);
    ctx.fillRect(gx + gw - 26, gy + 70, 8, 14);
    ctx.restore();
}

function drawPlayer() {
    const isLow = typeof lowEndMode !== 'undefined' && lowEndMode;
    const lvl = LEVELS[currentLevelIdx];
    if (lvl && lvl.hasBaseGate && realGoal) {
        ctx.save();
        const gx = realGoal.x - 52;
        const gy = realGoal.y - 130;
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(gx, gy, 146, 202);
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 4;
        ctx.strokeRect(gx, gy, 146, 202);
        ctx.fillStyle = '#0284c7';
        ctx.fillRect(gx + 16, gy + 14, 114, 24);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 10px JetBrains Mono';
        ctx.textAlign = 'center';
        ctx.fillText('TAJNA BAZA JOHNA', gx + 73, gy + 30);
        ctx.restore();
    }

    const cx = player.x + player.w * 0.5;
    const cy = player.y + player.h * 0.5;
    const isRaygunMode = (typeof playerHasRaygun === 'function') && playerHasRaygun();

    if (isLow) {
        const px = player.x | 0;
        const py = player.y | 0;
        ctx.fillStyle = '#9333ea';
        ctx.fillRect(px, py, player.w, player.h);
        ctx.strokeStyle = highContrastEnabled ? '#facc15' : (player.dashTimer > 0 ? '#67e8f9' : '#e0c5ed');
        ctx.lineWidth = highContrastEnabled ? 2.5 : 1.5;
        ctx.strokeRect(px + 1, py + 1, player.w - 2, player.h - 2);

        const lookOff = player.facing > 0 ? 3 : -3;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(px + 5 + (lookOff >> 1), py + 9, 7, 7);
        ctx.fillRect(px + 17 + (lookOff >> 1), py + 9, 7, 7);
        ctx.fillStyle = '#090d16';
        ctx.fillRect(px + 7 + lookOff, py + 11, 3, 4);
        ctx.fillRect(px + 19 + lookOff, py + 11, 3, 4);

        if (!playerHasWeapon()) return;
        ctx.save();
        ctx.translate(cx | 0, cy | 0);
        ctx.rotate(weapon.angle);
        if (isRaygunMode) {
            const rec = (weapon.recoilOffset || 0) | 0;
            ctx.fillStyle = '#334155';
            ctx.fillRect(12 - rec, -5, 22, 10);
            ctx.fillStyle = weapon.reloadTimer > 0 ? '#f43f5e' : '#4ade80';
            ctx.fillRect(16 - rec, -3, 12, 6);
            ctx.fillStyle = '#22d3ee';
            ctx.fillRect(34 - rec, -3, 5, 6);
        } else {
            const ext = weapon.pokeExtension | 0;
            ctx.fillStyle = '#78350f';
            ctx.fillRect(8 + (ext >> 1), -3, 36, 6);
            ctx.fillStyle = '#22d3ee';
            ctx.fillRect(44 + ext, -6, 16, 12);
        }
        ctx.restore();
        return;
    }

    ctx.save();
    ctx.translate(cx, cy);

    // Płynne skręcanie w powietrzu i podczas Dasha, bez pochylania w przód podczas zwykłego chodzenia po ziemi
    ctx.rotate(player.visualTilt || 0);

    const stretchX = player.visualScaleX || 1;
    const stretchY = player.visualScaleY || 1;
    ctx.scale(stretchX, stretchY);

    if (highContrastEnabled) {
        ctx.strokeStyle = '#facc15';
        ctx.lineWidth = 3;
        ctx.strokeRect(-player.w / 2 - 2, -player.h / 2 - 2, player.w + 4, player.h + 4);
    }

    ctx.fillStyle = '#9333ea';
    ctx.fillRect(-player.w / 2, -player.h / 2, player.w, player.h);
    ctx.strokeStyle = player.dashTimer > 0 ? '#67e8f9' : '#e0c5ed';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(-player.w / 2 + 1, -player.h / 2 + 1, player.w - 2, player.h - 2);

    const smoothFace = player.visualFacing !== undefined ? player.visualFacing : player.facing;
    const lookX = smoothFace * 3.2;
    const lookY = Math.max(-3, Math.min(3, player.vy * 0.25));
    const eyeH = player.dashTimer > 0 ? 5 : 8;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-10 + lookX * 0.5, -6 + lookY * 0.4, 7, eyeH);
    ctx.fillRect(2 + lookX * 0.5, -6 + lookY * 0.4, 7, eyeH);

    ctx.fillStyle = '#090d16';
    ctx.fillRect(-8 + lookX, -4 + lookY, 3.5, Math.min(4, eyeH - 1));
    ctx.fillRect(4 + lookX, -4 + lookY, 3.5, Math.min(4, eyeH - 1));
    ctx.restore();

    if (!playerHasWeapon()) return;

    const ang = weapon.visualAngle !== undefined ? weapon.visualAngle : weapon.angle;

    if (isRaygunMode) {
        const rec = weapon.recoilOffset || 0;
        const isReloading = weapon.reloadTimer > 0;
        const flipY = Math.cos(ang) < 0 ? -1 : 1;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(ang);
        ctx.scale(1, flipY);

        // Linia celownicza Rayguna 360°
        ctx.strokeStyle = isReloading ? 'rgba(244, 63, 94, 0.28)' : 'rgba(74, 222, 128, 0.32)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 6]);
        ctx.beginPath();
        ctx.moveTo(36 - rec, 0);
        ctx.lineTo(145, 0);
        ctx.stroke();
        ctx.setLineDash([]);

        // Uchwyt pistoletowy
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(12 - rec, 2, 7, 9);
        ctx.strokeStyle = '#090d16';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(12 - rec, 2, 7, 9);

        // Korpus Rayguna
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(10 - rec, -6, 22, 11);
        ctx.strokeStyle = isReloading ? '#f43f5e' : '#38bdf8';
        ctx.lineWidth = 1.8;
        ctx.strokeRect(10 - rec, -6, 22, 11);

        // Rdzeń plazmowy (pokazuje stan baterii / przeładowania)
        const ammoRatio = isReloading
            ? ((weapon.reloadDuration - weapon.reloadTimer) / weapon.reloadDuration)
            : (weapon.ammo / weapon.maxAmmo);
        ctx.fillStyle = '#090d16';
        ctx.fillRect(13 - rec, -3.5, 14, 6);
        ctx.fillStyle = isReloading ? ((tickCount % 6 < 3) ? '#f43f5e' : '#facc15') : '#4ade80';
        ctx.fillRect(13 - rec, -3.5, Math.max(2, 14 * ammoRatio), 6);

        // Lufa i pierścień emisyjny
        ctx.fillStyle = '#475569';
        ctx.fillRect(32 - rec, -3.5, 7, 6);
        ctx.fillStyle = isReloading ? '#fbbf24' : '#22d3ee';
        ctx.fillRect(37 - rec, -5, 3.5, 9);

        // Rozbłysk wystrzału (Muzzle Flash)
        if (weapon.muzzleFlashTimer > 0) {
            ctx.shadowColor = '#4ade80';
            ctx.shadowBlur = 10;
            ctx.fillStyle = '#fef08a';
            ctx.beginPath();
            ctx.arc(43 - rec, -0.5, 5.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
        }
        ctx.restore();

        // Pasek przeładowania nad głową Dave'a, gdy bateria się ładuje
        if (isReloading) {
            const pct = Math.max(0, Math.min(1, (weapon.reloadDuration - weapon.reloadTimer) / weapon.reloadDuration));
            ctx.fillStyle = '#090d16';
            ctx.fillRect(cx - 16, player.y - 12, 32, 5);
            ctx.fillStyle = '#facc15';
            ctx.fillRect(cx - 15, player.y - 11, 30 * pct, 3);
        }
        return;
    }

    const ext = weapon.visualExt !== undefined ? weapon.visualExt : weapon.pokeExtension;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(ang);

    ctx.strokeStyle = 'rgba(34, 211, 238, 0.28)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(20, 0);
    ctx.lineTo(95 + ext, 0);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#78350f';
    ctx.fillRect(8 + ext * 0.5, -3.5, 36, 7);
    ctx.strokeStyle = '#451a03';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(8 + ext * 0.5, -3.5, 36, 7);

    ctx.fillStyle = '#facc15';
    ctx.fillRect(40 + ext * 0.8, -5, 5, 10);

    ctx.shadowColor = '#22d3ee';
    ctx.shadowBlur = 12;
    ctx.fillStyle = '#22d3ee';
    ctx.beginPath();
    ctx.moveTo(45 + ext, -8);
    ctx.lineTo(62 + ext, 0);
    ctx.lineTo(45 + ext, 8);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();
}

function drawRoboEnemy(e) {
    const isLow = typeof lowEndMode !== 'undefined' && lowEndMode;
    const isMimic = e.type === 'mimic';
    const isEvadBot = e.type === 'evad_bot';
    const isRoboFish = e.type === 'robo_fish';
    const isHung = (isMimic || isEvadBot) && e.hungTimer > 0;

    // Szybkie, maksymalnie uproszczone renderowanie wrogów w trybie Low-End
    if (isLow) {
        const ex = e.x | 0;
        const ey = e.y | 0;
        const ew = e.w | 0;
        const eh = e.h | 0;
        const dir = e.facing || Math.sign(e.vx) || 1;

        if (e.type === 'jetpack_rammer') {
            ctx.fillStyle = e.ramState === 'ramming' ? '#991b1b' : '#0f172a';
            ctx.fillRect(ex, ey, ew, eh);
            ctx.strokeStyle = e.ramState === 'ramming' ? '#facc15' : '#38bdf8';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(ex + 1, ey + 1, ew - 2, eh - 2);
            ctx.fillStyle = e.ramState === 'ramming' ? '#ef4444' : '#67e8f9';
            ctx.fillRect(ex + 8 + dir * 2, ey + 10, 16, 6);
            return;
        }
        if (e.type === 'raygun_drone') {
            ctx.fillStyle = '#1e1b4b';
            ctx.fillRect(ex, ey, ew, eh);
            ctx.strokeStyle = '#4ade80';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(ex + 1, ey + 1, ew - 2, eh - 2);
            ctx.fillStyle = '#4ade80';
            ctx.fillRect(ex + 8 + dir * 2, ey + 10, 16, 6);
            return;
        }
        if (isRoboFish) {
            ctx.fillStyle = e.turboActive ? '#7f1d1d' : '#1e293b';
            ctx.fillRect(ex, ey + 2, ew, eh - 4);
            ctx.strokeStyle = e.turboActive ? '#facc15' : '#38bdf8';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(ex + 1, ey + 3, ew - 2, eh - 6);
            ctx.fillStyle = e.turboActive ? '#ef4444' : '#fb923c';
            ctx.fillRect(dir > 0 ? ex + 18 : ex + 6, ey + 9, 8, 6);
            return;
        }
        if (isEvadBot) {
            if (e.chargeTimer > 0 && !isHung) {
                ctx.strokeStyle = '#ef4444';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(ex + (ew >> 1), ey + (eh >> 1));
                ctx.lineTo(ex + (ew >> 1) + dir * 200, ey + (eh >> 1));
                ctx.stroke();
            }
            ctx.fillStyle = isHung ? '#1e293b' : (e.chargeTimer > 0 ? '#991b1b' : '#7f1d1d');
            ctx.fillRect(ex, ey, ew, eh);
            ctx.strokeStyle = isHung ? '#38bdf8' : '#ef4444';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(ex + 1, ey + 1, ew - 2, eh - 2);
            ctx.fillStyle = isHung ? '#38bdf8' : '#facc15';
            ctx.fillRect(ex + 9 + dir * 2, ey + 10, 14, 8);
            return;
        }
        if (isMimic) {
            ctx.fillStyle = isHung ? '#713f12' : (e.turboActive ? '#f59e0b' : '#eab308');
            ctx.fillRect(ex, ey, ew, eh);
            ctx.strokeStyle = isHung ? '#22d3ee' : '#fef08a';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(ex + 1, ey + 1, ew - 2, eh - 2);
            ctx.fillStyle = isHung ? '#22d3ee' : '#090d16';
            ctx.fillRect(ex + 6 + dir * 2, ey + 10, 20, 8);
            return;
        }
        ctx.fillStyle = '#334155';
        ctx.fillRect(ex, ey, ew, eh);
        ctx.strokeStyle = e.turboActive ? '#f43f5e' : '#94a3b8';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(ex + 1, ey + 1, ew - 2, eh - 2);
        ctx.fillStyle = e.eyeColor;
        ctx.fillRect(ex + 6 + dir * 2, ey + 11, 7, 6);
        ctx.fillRect(ex + 18 + dir * 2, ey + 11, 7, 6);
        return;
    }

    // Płynny kierunek patrzenia i obrotu (-1..+1) w trybie High Graphics
    const rawDir = (isEvadBot || isRoboFish || e.type === 'jetpack_rammer' || e.type === 'raygun_drone')
        ? (e.facing || Math.sign(e.vx) || 1)
        : (Math.sign(e.vx) || 1);
    const smoothDir = e.visualDir !== undefined ? e.visualDir : rawDir;
    const scaleY = e.visualScaleY !== undefined ? e.visualScaleY : 1;
    const scaleX = 2 - scaleY;

    if (e.type === 'jetpack_rammer') {
        ctx.save();
        ctx.translate(e.x + e.w / 2, e.y + e.h / 2);
        ctx.rotate(smoothDir * (e.ramState === 'ramming' ? 0.14 : 0.05));

        const flameH = 12 + Math.sin(tickCount * 0.6) * 5;
        const jpX = -smoothDir * 18;
        ctx.fillStyle = '#f97316';
        ctx.fillRect(jpX - 4, 2, 8, flameH);
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(jpX - 2, 2, 4, flameH * 0.6);

        ctx.fillStyle = '#475569';
        ctx.fillRect(jpX - 5, -12, 10, 16);
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(jpX - 5, -12, 10, 16);

        ctx.fillStyle = e.ramState === 'ramming' ? '#991b1b' : '#0f172a';
        ctx.fillRect(-e.w / 2, -e.h / 2, e.w, e.h);
        ctx.strokeStyle = e.ramState === 'ramming' ? '#facc15' : '#38bdf8';
        ctx.lineWidth = 2.2;
        ctx.strokeRect(-e.w / 2 + 1, -e.h / 2 + 1, e.w - 2, e.h - 2);

        ctx.fillStyle = '#f43f5e';
        ctx.fillRect(smoothDir * 14 - 2.5, -8, 5, 5);
        ctx.fillRect(smoothDir * 14 - 2.5, 3, 5, 5);

        ctx.fillStyle = '#0284c7';
        ctx.fillRect(-10, -7, 20, 10);
        ctx.fillStyle = e.ramState === 'ramming' ? '#ef4444' : '#67e8f9';
        ctx.fillRect(-7 + smoothDir * 3, -5, 14, 6);
        ctx.restore();
        return;
    }

    if (e.type === 'raygun_drone') {
        ctx.save();
        ctx.translate(e.x + e.w / 2, e.y + e.h / 2);
        ctx.rotate(smoothDir * 0.05);

        ctx.fillStyle = '#22d3ee';
        ctx.fillRect(-10, e.h / 2, 20, 4);

        ctx.fillStyle = '#1e1b4b';
        ctx.fillRect(-e.w / 2, -e.h / 2, e.w, e.h);
        ctx.strokeStyle = '#4ade80';
        ctx.lineWidth = 2.2;
        ctx.strokeRect(-e.w / 2 + 1, -e.h / 2 + 1, e.w - 2, e.h - 2);

        ctx.fillStyle = '#334155';
        ctx.fillRect(smoothDir * 12 - 7, -2, 14, 8);
        ctx.fillStyle = '#4ade80';
        ctx.fillRect(smoothDir * 22 - 2, -3, 4, 10);

        ctx.fillStyle = '#090d16';
        ctx.fillRect(-10, -8, 20, 10);
        ctx.fillStyle = '#4ade80';
        ctx.fillRect(-6 + smoothDir * 3, -6, 12, 6);
        ctx.restore();
        return;
    }

    ctx.save();
    const shakeX = isHung ? Math.sin(tickCount * 0.85) * 2.2 : (e.chargeTimer > 0 ? Math.sin(tickCount * 1.1) * 2.5 : 0);
    const walkBob = (!isRoboFish && !isHung && e.onGround) ? Math.abs(Math.sin(tickCount * 0.24 + e.minX)) * 0.8 : 0;

    ctx.translate(e.x + e.w / 2 + shakeX, e.y + e.h / 2 - walkBob);

    if (isRoboFish) {
        // Płynny obrót ryby 3D przy zmianie kierunku pływania (zamiast skokowego -1 / +1)
        const turnScaleX = Math.abs(smoothDir) < 0.18
            ? (smoothDir >= 0 ? 0.18 : -0.18)
            : Math.sin(smoothDir * Math.PI * 0.5);
        ctx.scale(turnScaleX, 1);
        ctx.rotate(Math.sin(tickCount * 0.12 + e.minX) * 0.04);

        const tailWag = Math.sin(tickCount * (e.turboActive ? 0.55 : 0.25)) * 4.5;
        ctx.fillStyle = e.turboActive ? '#ef4444' : '#0284c7';
        ctx.beginPath();
        ctx.moveTo(-e.w / 2, 0);
        ctx.lineTo(-e.w / 2 - 11, -9 + tailWag);
        ctx.lineTo(-e.w / 2 - 11, 9 + tailWag);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = e.turboActive ? '#f97316' : '#38bdf8';
        ctx.beginPath();
        ctx.moveTo(-6, -e.h / 2);
        ctx.lineTo(-2, -e.h / 2 - 8);
        ctx.lineTo(8, -e.h / 2);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = e.turboActive ? '#7f1d1d' : '#1e293b';
        ctx.fillRect(-e.w / 2, -e.h / 2 + 2, e.w, e.h - 4);
        ctx.strokeStyle = e.turboActive ? '#facc15' : '#38bdf8';
        ctx.lineWidth = 2;
        ctx.strokeRect(-e.w / 2 + 1, -e.h / 2 + 3, e.w - 2, e.h - 6);

        ctx.fillStyle = '#090d16';
        ctx.fillRect(-8, -4, 2, 8);
        ctx.fillRect(-4, -4, 2, 8);

        ctx.fillStyle = '#090d16';
        ctx.fillRect(2, -7, 11, 9);
        ctx.fillStyle = e.turboActive ? '#ef4444' : '#fb923c';
        ctx.fillRect(4, -5, 7, 5);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(8, -4, 2.5, 2.5);

        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(3, 5, 3, 4);
        ctx.fillRect(8, 5, 3, 4);
        ctx.fillRect(13, 5, 3, 4);

        ctx.restore();
        return;
    }

    ctx.rotate((isHung || e.onGround) ? 0 : smoothDir * 0.048);
    ctx.scale(scaleX, scaleY);

    if (isEvadBot) {
        if (e.chargeTimer > 0 && !isHung) {
            const aimDir = e.facing || -1;
            ctx.save();
            ctx.strokeStyle = (tickCount % 4 < 2) ? 'rgba(239, 68, 68, 0.85)' : 'rgba(250, 204, 21, 0.85)';
            ctx.lineWidth = 2;
            ctx.setLineDash([6, 4]);
            ctx.beginPath();
            ctx.moveTo(aimDir * 14, -1);
            ctx.lineTo(aimDir * 210, -1);
            ctx.stroke();
            ctx.restore();
        }

        ctx.fillStyle = isHung ? '#38bdf8' : '#ef4444';
        ctx.beginPath();
        ctx.moveTo(-e.w / 2 + 2, -e.h / 2);
        ctx.lineTo(-e.w / 2 - 5, -e.h / 2 - 10);
        ctx.lineTo(-e.w / 2 + 10, -e.h / 2);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(e.w / 2 - 2, -e.h / 2);
        ctx.lineTo(e.w / 2 + 5, -e.h / 2 - 10);
        ctx.lineTo(e.w / 2 - 10, -e.h / 2);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = isHung ? '#1e293b' : (e.chargeTimer > 0 ? '#991b1b' : '#7f1d1d');
        ctx.fillRect(-e.w / 2, -e.h / 2, e.w, e.h);
        ctx.strokeStyle = isHung ? '#38bdf8' : (e.chargeTimer > 0 ? '#facc15' : '#ef4444');
        ctx.lineWidth = 2.2;
        ctx.strokeRect(-e.w / 2 + 1, -e.h / 2 + 1, e.w - 2, e.h - 2);

        ctx.fillStyle = '#090d16';
        ctx.fillRect(-10, -8, 20, 14);

        if (isHung) {
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 2.2;
            ctx.beginPath();
            ctx.moveTo(-5, -5); ctx.lineTo(5, 3);
            ctx.moveTo(5, -5); ctx.lineTo(-5, 3);
            ctx.stroke();

            const pct = Math.max(0, e.hungTimer / 135);
            ctx.fillStyle = '#090d16';
            ctx.fillRect(-14, -e.h / 2 - 15, 28, 5);
            ctx.fillStyle = '#38bdf8';
            ctx.fillRect(-13, -e.h / 2 - 14, 26 * pct, 3);
        } else {
            ctx.fillStyle = (e.chargeTimer > 0 && tickCount % 4 < 2) ? '#facc15' : '#ef4444';
            ctx.fillRect(-6 + smoothDir * 3, -6, 12, 10);
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(-2 + smoothDir * 4, -3, 4, 4);
        }

        ctx.restore();
        return;
    }

    if (isMimic) {
        ctx.strokeStyle = isHung ? '#22d3ee' : '#facc15';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-4, -e.h / 2);
        ctx.lineTo(-7 + smoothDir * 1.5, -e.h / 2 - 7);
        ctx.moveTo(4, -e.h / 2);
        ctx.lineTo(7 + smoothDir * 1.5, -e.h / 2 - 7);
        ctx.stroke();

        ctx.fillStyle = isHung ? '#090d16' : '#facc15';
        ctx.fillRect(-11, -e.h / 2 - 9, 22, 3);

        ctx.fillStyle = isHung ? '#713f12' : (e.turboActive ? '#f59e0b' : '#eab308');
        ctx.fillRect(-e.w / 2, -e.h / 2, e.w, e.h);

        ctx.strokeStyle = isHung ? '#22d3ee' : '#fef08a';
        ctx.lineWidth = 2.2;
        ctx.strokeRect(-e.w / 2 + 1, -e.h / 2 + 1, e.w - 2, e.h - 2);

        ctx.fillStyle = '#090d16';
        ctx.fillRect(-e.w / 2 + 3, -6, e.w - 6, 11);

        if (isHung) {
            ctx.strokeStyle = '#22d3ee';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(-9, -4); ctx.lineTo(-3, 2);
            ctx.moveTo(-3, -4); ctx.lineTo(-9, 2);
            ctx.moveTo(3, -4);  ctx.lineTo(9, 2);
            ctx.moveTo(9, -4);  ctx.lineTo(3, 2);
            ctx.stroke();

            const pct = Math.max(0, e.hungTimer / (e.maxHungTimer || 125));
            ctx.fillStyle = '#090d16';
            ctx.fillRect(-14, -e.h / 2 - 15, 28, 5);
            ctx.fillStyle = '#22d3ee';
            ctx.fillRect(-13, -e.h / 2 - 14, 26 * pct, 3);
        } else {
            ctx.fillStyle = e.turboActive ? '#ef4444' : '#fde047';
            ctx.fillRect(-9 + smoothDir * 2.6, -4, 6, 6);
            ctx.fillRect(3 + smoothDir * 2.6, -4, 6, 6);
            ctx.fillStyle = '#090d16';
            ctx.fillRect(-7 + smoothDir * 3.2, -2, 2.5, 2.5);
            ctx.fillRect(5 + smoothDir * 3.2, -2, 2.5, 2.5);
        }

        ctx.restore();
        return;
    }

    const antBend = -smoothDir * 2.2;
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, -e.h / 2);
    ctx.lineTo(antBend, -e.h / 2 - 7);
    ctx.stroke();

    ctx.fillStyle = e.eyeColor;
    ctx.beginPath();
    ctx.arc(antBend, -e.h / 2 - 8, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#334155';
    ctx.fillRect(-e.w / 2, -e.h / 2, e.w, e.h);

    ctx.strokeStyle = e.turboActive ? '#f43f5e' : '#94a3b8';
    ctx.lineWidth = 2;
    ctx.strokeRect(-e.w / 2 + 1, -e.h / 2 + 1, e.w - 2, e.h - 2);

    ctx.fillStyle = '#090d16';
    ctx.fillRect(-e.w / 2 + 3, -6, e.w - 6, 10);

    ctx.fillStyle = e.eyeColor;
    ctx.fillRect(-9 + smoothDir * 2.6, -4, 6, 6);
    ctx.fillRect(3 + smoothDir * 2.6, -4, 6, 6);

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-7 + smoothDir * 3.2, -2, 2, 2);
    ctx.fillRect(5 + smoothDir * 3.2, -2, 2, 2);

    ctx.restore();
}

function drawBoss() {
    const isLow = typeof lowEndMode !== 'undefined' && lowEndMode;
    ctx.save();

    if (boss.orbitalLaser) {
        const ol = boss.orbitalLaser;
        ctx.save();
        if (ol.warnTimer > 0) {
            const isLocked = ol.warnTimer <= 18;
            ctx.strokeStyle = isLocked ? '#facc15' : 'rgba(239, 68, 68, 0.75)';
            ctx.lineWidth = isLocked ? 3.5 : 2;
            if (!isLocked && !isLow) ctx.setLineDash([8, 6]);
            ctx.beginPath();
            ctx.moveTo(ol.x, 0);
            ctx.lineTo(ol.x, 500);
            ctx.stroke();
            if (!isLow) ctx.setLineDash([]);

            ctx.fillStyle = isLocked ? '#facc15' : '#ef4444';
            ctx.fillRect(ol.x - 14, 0, 28, 10);
            ctx.strokeRect(ol.x - 16, 482, 32, 16);
        } else if (ol.fireTimer > 0) {
            ctx.fillStyle = 'rgba(239, 68, 68, 0.45)';
            ctx.fillRect(ol.x - 22, 0, 44, 500);
            ctx.fillStyle = '#38bdf8';
            ctx.fillRect(ol.x - 12, 0, 24, 500);
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(ol.x - 5, 0, 10, 500);
        }
        ctx.restore();
    }

    for (const sw of boss.shockwaves) {
        ctx.fillStyle = '#f97316';
        ctx.fillRect(sw.x, sw.y, sw.w, sw.h);
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(sw.x + 4, sw.y + 4, sw.w - 8, sw.h - 8);
    }

    const isVulnerable = boss.state === 'vulnerable';
    const isRecovering = boss.state === 'recover' || boss.postHitSafeTimer > 0;
    const shakeX = isLow ? 0 : (boss.state === 'charge_warn'
        ? Math.sin(tickCount * 1.4) * 5
        : (isVulnerable ? Math.sin(tickCount * 0.9) * 2 : 0));

    ctx.translate(boss.x + boss.w / 2 + shakeX, boss.y + boss.h / 2);

    if (isRecovering && Math.floor(tickCount / 3) % 2 === 0) {
        ctx.globalAlpha = 0.72;
    }

    if (isVulnerable) {
        ctx.fillStyle = (Math.floor(tickCount / 6) % 2 === 0) ? '#22d3ee' : '#facc15';
        ctx.fillRect(-boss.w / 2 + 10, -boss.h / 2 - 8, boss.w - 20, 8);

        const maxStun = boss.phase === 1 ? 190 : (boss.phase === 2 ? 175 : (boss.phase === 3 ? 165 : 155));
        const pct = Math.max(0, Math.min(1, boss.stateTimer / maxStun));
        ctx.fillStyle = '#090d16';
        ctx.fillRect(-38, -boss.h / 2 - 20, 76, 7);
        ctx.fillStyle = '#22d3ee';
        ctx.fillRect(-36, -boss.h / 2 - 18, 72 * pct, 3);
    } else if (!isRecovering) {
        const spikeCount = 5;
        const spikeRegionW = boss.w - 24;
        const sw = spikeRegionW / spikeCount;
        const startX = -spikeRegionW / 2;
        ctx.fillStyle = '#ef4444';
        ctx.strokeStyle = '#fca5a5';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let i = 0; i < spikeCount; i++) {
            const sx = startX + i * sw;
            ctx.moveTo(sx + 2, -boss.h / 2);
            ctx.lineTo(sx + sw / 2, -boss.h / 2 - 14);
            ctx.lineTo(sx + sw - 2, -boss.h / 2);
            ctx.closePath();
        }
        ctx.fill();
        if (!isLow) ctx.stroke();
    }

    ctx.fillStyle = isVulnerable ? '#22d3ee' : '#dc2626';
    ctx.beginPath();
    ctx.moveTo(-boss.w / 2, -boss.h / 2 + 12);
    ctx.lineTo(-boss.w / 2 - 14, -boss.h / 2 - 14);
    ctx.lineTo(-boss.w / 2 + 14, -boss.h / 2);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(boss.w / 2, -boss.h / 2 + 12);
    ctx.lineTo(boss.w / 2 + 14, -boss.h / 2 - 14);
    ctx.lineTo(boss.w / 2 - 14, -boss.h / 2);
    ctx.closePath();
    ctx.fill();

    const baseBodyColor = boss.phase === 4 ? '#3b071e' : (boss.phase === 3 ? '#27173a' : '#1e293b');
    ctx.fillStyle = boss.flashTimer > 0 ? '#ffffff' : (isVulnerable ? '#164e63' : baseBodyColor);
    ctx.fillRect(-boss.w / 2, -boss.h / 2, boss.w, boss.h);

    ctx.strokeStyle = isVulnerable
        ? '#22d3ee'
        : (boss.state === 'charge_warn' || boss.phase === 4 ? '#ef4444' : '#94a3b8');
    ctx.lineWidth = 5;
    ctx.strokeRect(-boss.w / 2 + 2, -boss.h / 2 + 2, boss.w - 4, boss.h - 4);

    const lookX = boss.facing * 6;
    ctx.fillStyle = '#090d16';
    ctx.fillRect(-boss.w / 2 + 12, -24, boss.w - 24, 30);

    if (isVulnerable) {
        ctx.strokeStyle = (tickCount % 6 < 3) ? '#22d3ee' : '#facc15';
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(-30, -17); ctx.lineTo(-14, -3);
        ctx.moveTo(-14, -17); ctx.lineTo(-30, -3);
        ctx.moveTo(14, -17);  ctx.lineTo(30, -3);
        ctx.moveTo(30, -17);  ctx.lineTo(14, -3);
        ctx.stroke();
    } else {
        const eyeGlow = boss.phase >= 3 ? '#ef4444' : '#f97316';
        ctx.fillStyle = boss.flashTimer > 0 ? '#ffffff' : eyeGlow;
        ctx.fillRect(-34 + lookX, -18, 22, 18);
        ctx.fillRect(12 + lookX, -18, 22, 18);

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(-26 + lookX, -12, 6, 6);
        ctx.fillRect(20 + lookX, -12, 6, 6);
    }

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-28, 18, 56, 16);
    ctx.fillStyle = isVulnerable ? '#22d3ee' : '#64748b';
    for (let gx = -22; gx <= 22; gx += 11) {
        ctx.fillRect(gx, 20, 5, 12);
    }

    ctx.restore();
}


function draw() {
    const isLow = typeof lowEndMode !== 'undefined' && lowEndMode;
    const lvl = LEVELS[currentLevelIdx];
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.save();

    if (screenShakeEnabled && screenShake > 0) {
        const sx = (Math.random() - 0.5) * screenShake;
        const sy = (Math.random() - 0.5) * screenShake;
        ctx.translate(sx, sy);
    }

    if (gameState === 'CUTSCENE') {
        drawCutsceneScene();
        ctx.restore();
        return;
    }

    let blend = 0;
    if (lvl.transitionToTheme) {
        const maxCam = Math.max(1, lvl.width * TILE - canvas.width);
        const rawProgress = Math.max(0, Math.min(1, cameraX / maxCam));
        blend = rawProgress * rawProgress * (3 - 2 * rawProgress);
    }

    drawEnvironment(lvl.theme, lvl.transitionToTheme, blend);

    const camFloor = Math.floor(cameraX);
    const viewL = camFloor - 80;
    const viewR = camFloor + canvas.width + 80;

    ctx.save();
    ctx.translate(-camFloor, 0);

    if (lvl.hasCastleGate && realGoal && realGoal.x + 120 >= viewL && realGoal.x - 80 <= viewR) {
        drawCastleGate(realGoal.x, realGoal.y);
    }

    for (let i = 0; i < solids.length; i++) {
        const s = solids[i];
        if (s.x + s.w < viewL || s.x > viewR) continue;
        drawSolidBlock(s.x, s.y, s.w, s.h, lvl.theme, s.isPlatform, false, lvl.transitionToTheme, blend);
    }

    for (let i = 0; i < fallingFloors.length; i++) {
        const ff = fallingFloors[i];
        if (ff.x + ff.w < viewL || ff.x > viewR || ff.y > canvas.height + 60) continue;
        const shakeX = (ff.triggered && ff.timer > 0) ? (isLow ? ((tickCount & 1) ? 2 : -2) : Math.sin(tickCount * 1.3) * 3.5) : 0;
        drawSolidBlock(ff.x + shakeX, ff.y, ff.w, ff.h, lvl.theme, true, true, lvl.transitionToTheme, blend);
        if (trapRadarEnabled && !ff.triggered) {
            ctx.save();
            ctx.strokeStyle = '#facc15';
            ctx.lineWidth = 2.5;
            if (!isLow) ctx.setLineDash([6, 4]);
            ctx.strokeRect(ff.x + 2, ff.y + 2, ff.w - 4, ff.h - 4);
            ctx.restore();
        }
    }

    for (let i = 0; i < invisBlocks.length; i++) {
        const ib = invisBlocks[i];
        if (ib.x + ib.w < viewL || ib.x > viewR) continue;
        if (ib.revealed) {
            const by = ib.y + ib.bumpY;
            ctx.fillStyle = '#f59e0b';
            ctx.fillRect(ib.x, by, ib.w, ib.h);
            ctx.strokeStyle = '#78350f';
            ctx.lineWidth = 3;
            ctx.strokeRect(ib.x + 1.5, by + 1.5, ib.w - 3, ib.h - 3);

            ctx.fillStyle = '#451a03';
            ctx.font = 'bold 18px Fredoka';
            ctx.textAlign = 'center';
            ctx.fillText('>:)', ib.x + ib.w * 0.5, by + 26);
        } else if (trapRadarEnabled) {
            ctx.save();
            ctx.fillStyle = 'rgba(250, 204, 21, 0.16)';
            ctx.fillRect(ib.x, ib.y, ib.w, ib.h);
            ctx.strokeStyle = 'rgba(250, 204, 21, 0.78)';
            ctx.lineWidth = 2;
            if (!isLow) ctx.setLineDash([4, 4]);
            ctx.strokeRect(ib.x + 2, ib.y + 2, ib.w - 4, ib.h - 4);
            if (!isLow) ctx.setLineDash([]);
            ctx.fillStyle = '#fde047';
            ctx.font = 'bold 14px JetBrains Mono';
            ctx.textAlign = 'center';
            ctx.fillText('?', ib.x + ib.w * 0.5, ib.y + 25);
            ctx.restore();
        }
    }

    for (let i = 0; i < spikeTraps.length; i++) {
        const st = spikeTraps[i];
        if (st.x + st.w < viewL || st.x > viewR || st.y > canvas.height + 60) continue;
        if (st.dir === 'down' || st.triggered || trapRadarEnabled) {
            ctx.save();
            const extP = (!st.triggered && st.dir === 'up' && trapRadarEnabled) ? 1 : (st.extProgress !== undefined ? st.extProgress : 1);
            if (!st.triggered && st.dir === 'up' && trapRadarEnabled) {
                ctx.globalAlpha = 0.48;
            }
            drawSpikes(st.x, st.y, st.w, st.h, st.dir, extP);
            if (!st.triggered && trapRadarEnabled) {
                ctx.strokeStyle = '#f43f5e';
                ctx.lineWidth = 1.5;
                if (!isLow) ctx.setLineDash([3, 3]);
                ctx.strokeRect(st.x, st.y, st.w, st.h);
            }
            ctx.restore();
        }
    }

    for (let i = 0; i < fakeGoals.length; i++) {
        const fg = fakeGoals[i];
        if (fg.x + fg.w < viewL || fg.x > viewR) continue;
        const fakeLabel = (highContrastEnabled || trapRadarEnabled) ? '✕ PUŁAPKA' : 'META';
        const fakeColor = highContrastEnabled ? '#f43f5e' : '#a855f7';
        drawGoalPortal(fg.x, fg.y, fg.w, fg.h, fakeColor, fakeLabel);
    }
    if (realGoal && realGoal.x + realGoal.w >= viewL && realGoal.x <= viewR) {
        const realLabel = highContrastEnabled ? '✓ META' : 'META';
        drawGoalPortal(realGoal.x, realGoal.y, realGoal.w, realGoal.h, '#10b981', realLabel);
    }

    for (let i = 0; i < enemies.length; i++) {
        const e = enemies[i];
        if (e.x + e.w < viewL - 160 || e.x > viewR + 160) continue;
        drawRoboEnemy(e);
    }

    if (boss) {
        drawBoss();
    }

    for (let i = 0; i < projectiles.length; i++) {
        const p = projectiles[i];
        if (isLow) {
            ctx.fillStyle = p.deflected ? '#4ade80' : (p.isRaygun ? '#22c55e' : '#f43f5e');
            ctx.fillRect((p.x - p.r) | 0, (p.y - p.r) | 0, (p.r * 2) | 0, (p.r * 2) | 0);
            continue;
        }
        if (highContrastEnabled || p.deflected) {
            ctx.strokeStyle = p.deflected ? '#22d3ee' : '#facc15';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r + 2, 0, Math.PI * 2);
            ctx.stroke();
        }
        ctx.fillStyle = p.deflected ? '#4ade80' : (p.isRaygun ? '#22c55e' : '#f43f5e');
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 0.48, 0, Math.PI * 2);
        ctx.fill();
    }

    if (!player.dead && gameState !== 'MENU') {
        drawPlayer();
    }

    // Ultra-proste cząsteczki w trybie Low-End (bez zmian globalAlpha co cząsteczkę!)
    if (isLow) {
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            if (p.x < viewL || p.x > viewR) continue;
            ctx.fillStyle = p.color;
            ctx.fillRect(p.x | 0, p.y | 0, 4, 4);
        }
    } else {
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            if (p.x < viewL || p.x > viewR) continue;
            ctx.globalAlpha = Math.max(0, p.alpha);
            ctx.fillStyle = p.color;
            ctx.fillRect(p.x - p.size * 0.5, p.y - p.size * 0.5, p.size, p.size);
        }
        ctx.globalAlpha = 1;
    }

    if (floatingTexts.length > 0) {
        ctx.font = '800 15px Fredoka';
        ctx.textAlign = 'center';
        for (let i = 0; i < floatingTexts.length; i++) {
            const ft = floatingTexts[i];
            if (!isLow) {
                ctx.globalAlpha = Math.max(0, ft.alpha);
                ctx.fillStyle = '#000';
                ctx.fillText(ft.text, ft.x + 1.5, ft.y + 1.5);
            }
            ctx.fillStyle = ft.color;
            ctx.fillText(ft.text, ft.x, ft.y);
        }
        ctx.globalAlpha = 1;
    }

    ctx.restore();

    if (gameState === 'MENU' && menuFadeAlpha > 0) {
        const smoothFade = isLow ? menuFadeAlpha : easeInOutCubic(Math.max(0, Math.min(1, menuFadeAlpha)));
        ctx.fillStyle = `rgba(6, 8, 17, ${smoothFade})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else if (gameState === 'PLAYING' && levelTransitionAlpha > 0) {
        const smoothTrans = isLow ? levelTransitionAlpha : easeInOutCubic(Math.max(0, Math.min(1, levelTransitionAlpha)));
        ctx.fillStyle = `rgba(6, 8, 17, ${smoothTrans})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    ctx.restore();
}
