// ============================================================================
// MODUŁ 4: SCENARIUSZE CUTSCENEK I PORTRETY POSTACI
// ============================================================================
const CUTSCENE_SCRIPTS = {
    intro: [
        {
            speaker: "DAVE",
            color: "#c084fc",
            portrait: "dave",
            pitch: 310,
            scenePhase: 0,
            text: "* Nareszcie spokój pod naszym zamkiem! Królewskie ogrody kwitną, a woda w rzece przyjemnie szumi..."
        },
        {
            speaker: "ANGELA",
            color: "#f472b6",
            portrait: "angela",
            pitch: 520,
            scenePhase: 0,
            text: "* Jest tu prześlicznie, Dave! Ale spójrz na bramę zamkową... Czy to nie dziwne, że strażnicy zniknęli, a most zwodzony sam się opuścił?"
        },
        {
            speaker: "ANGELA",
            color: "#f472b6",
            portrait: "angela_panic",
            pitch: 595,
            scenePhase: 1,
            text: "* AAA! Dave, z naszego zamku wybiegają mechaniczne kwadraty Evada! Przedostały się przez mury do ogrodów!"
        },
        {
            speaker: "ANGELA",
            color: "#f472b6",
            portrait: "angela_panic",
            pitch: 615,
            scenePhase: 2,
            text: "* DAAAVE! ZŁAPAŁY MNIE! ZABIERAJĄ MNIE DO FORTECY EVADA! RATUNKU!"
        },
        {
            speaker: "DAVE",
            color: "#c084fc",
            portrait: "dave_determined",
            pitch: 335,
            scenePhase: 2,
            text: "* ANGELA! Puśćcie ją, wy blaszane puszki! ...Uciekają z nią za rzekę w stronę Zamku Evada! Trzymaj się, skarbie, już po ciebie biegnę!"
        }
    ],
    outro: [
        {
            speaker: "ANGELA",
            color: "#f472b6",
            portrait: "angela",
            pitch: 520,
            scenePhase: 0,
            text: "* Dave! Zniszczyłeś tego potwornego Mega-Robo Evada! Bałam się, że już nigdy nie wydostanę się z tego mrocznego zamczyska!"
        },
        {
            speaker: "DAVE",
            color: "#c084fc",
            portrait: "dave",
            pitch: 310,
            scenePhase: 0,
            text: "* Już dobrze, Angela. Forteca Evada leży w gruzach. Chodźmy stąd, wracamy do domu..."
        },
        {
            speaker: "JOHN",
            color: "#38bdf8",
            portrait: "john",
            pitch: 195,
            scenePhase: 1,
            text: "* [TRZASK WITRAŻU!] CEL ZLOKALIZOWANY W ZAMKU EVADA: OBIEKT ANGELA. PRZEJMUJĘ ŁADUNEK."
        },
        {
            speaker: "DAVE",
            color: "#c084fc",
            portrait: "dave_determined",
            pitch: 345,
            scenePhase: 1,
            text: "* Angela, schowaj się za mną! Nie wiem kim jesteś w tym kosmicznym pancerzu, ale nie pozwolę ci jej tknąć!"
        },
        {
            speaker: "JOHN",
            color: "#38bdf8",
            portrait: "john",
            pitch: 185,
            scenePhase: 2,
            text: "* ZEJDŹ MI Z DROGI, FIOLETOWY KWADRACIE. ODPALAM ŁADUNEK WYBUCHOWY!"
        },
        {
            speaker: "DAVE",
            color: "#c084fc",
            portrait: "dave_determined",
            pitch: 325,
            scenePhase: 3,
            text: "* UGH!! Odrzuciło mnie przez wybite okno... Spadam prosto w głęboką wodę pod zamkiem Evada!"
        },
        {
            speaker: "ANGELA",
            color: "#f472b6",
            portrait: "angela_panic",
            pitch: 625,
            scenePhase: 3,
            text: "* DAAAAAVE!! POMOCY! ZOSTAW MNIE! RAAatunku...!"
        }
    ],
    jerry_jungle: [
        {
            speaker: "JERRY",
            color: "#4ade80",
            portrait: "jerry",
            pitch: 420,
            scenePhase: 0,
            text: "* O, siema Dave! Co ty tu robisz cały przemoczony na szczycie dżungli? Myślałem, że siedzisz sobie wygodnie z Angelą!"
        },
        {
            speaker: "DAVE",
            color: "#c084fc",
            portrait: "dave_determined",
            pitch: 315,
            scenePhase: 0,
            text: "* Nawet mi nie mów, Jerry... Dopiero co rozwaliłem Mega-Robo Evada i uratowałem Angelę, a sekundę później przez okno wleciał jakiś typ z jetpackiem, wystrzelił mnie do rzeki i znowu ją porwał!"
        },
        {
            speaker: "JERRY",
            color: "#4ade80",
            portrait: "jerry",
            pitch: 410,
            scenePhase: 0,
            text: "* Stary, to brzmi grubo... Chciałbym ci pomóc jej szukać, ale sam ledwo co skaczę przez te korzenie i nie wiem jak ugryźć gościa z kosmosu. Ale czekaj... masz swój zamek?!"
        },
        {
            speaker: "JERRY",
            color: "#4ade80",
            portrait: "jerry_alert",
            pitch: 440,
            scenePhase: 1,
            text: "* W ogóle uważaj, brachu. Kręciłem się wcześniej dalej w dżungli i widziałem tam jakieś nowe, mega zaawansowane roboty z jetpackami i raygunami."
        },
        {
            speaker: "JERRY",
            color: "#4ade80",
            portrait: "jerry",
            pitch: 425,
            scenePhase: 1,
            text: "* Znalazłem przy rozbitym dronie to Ostrze Rdzeniowe na kiju! Łap – możesz nim celować wokół siebie, dziabać szarżujące boty i odbijać ich lasery!"
        },
        {
            speaker: "DAVE",
            color: "#c084fc",
            portrait: "dave",
            pitch: 320,
            scenePhase: 2,
            text: "* Dzięki, Jerry! Taka broń w zupełności mi wystarczy na te blaszaki. A ty nie stercz tu w dżungli – idź prosto do naszego zamku i po prostu się tam wychilluj, dopóki nie wrócę z Angelą!"
        },
        {
            speaker: "JERRY",
            color: "#4ade80",
            portrait: "jerry",
            pitch: 435,
            scenePhase: 2,
            text: "* Serio?! Cały zamek do chillowania?! Nie musisz mi dwa razy powtarzać! Powodzenia, Dave – przebij się przez posterunki Johna i wracajcie cali!"
        }
    ],
    john_base_portal: [
        {
            speaker: "ANGELA",
            color: "#f472b6",
            portrait: "angela_panic",
            pitch: 610,
            scenePhase: 0,
            text: "* DAVE!! Dotarłeś do głównego laboratorium! Pomóż mi, te robotyczne ramiona zakładają mi jakiś cyber-hełm i uprząż energetyczną! Nie mogę się wydostać z komory!"
        },
        {
            speaker: "DAVE",
            color: "#c084fc",
            portrait: "dave_determined",
            pitch: 330,
            scenePhase: 0,
            text: "* Trzymaj się, Angela! Już rozbijam szybę komory Ostrzem Rdzeniowym od Jerry'ego!"
        },
        {
            speaker: "JOHN",
            color: "#38bdf8",
            portrait: "john",
            pitch: 190,
            scenePhase: 1,
            text: "* [ALARM BAZY!] INTRUZ W SEKTORZE RDZENIA! Jakim cudem przebiłeś się przez moje Jetpack-Boty i Raygun-Drony tym kijem?! JEDNOSTKI BOJOWE – OTOCZYĆ GO!"
        },
        {
            speaker: "DAVE",
            color: "#c084fc",
            portrait: "dave_determined",
            pitch: 345,
            scenePhase: 1,
            text: "* Dawajcie, blaszaki! Odbiję każdy wasz laser z Rayguna prosto w wasze pancerze! Wypuść Angelę z tej aparatury, John!"
        },
        {
            speaker: "JOHN",
            color: "#38bdf8",
            portrait: "john_button",
            pitch: 180,
            scenePhase: 2,
            text: "* Walczyć z tobą i twoim kijem? Nie bądź śmieszny. Mam na tę okazję coś znacznie skuteczniejszego... [WYCIĄGA TAJEMNICZY CZERWONY PRZYCISK]"
        },
        {
            speaker: "DAVE",
            color: "#c084fc",
            portrait: "dave_determined",
            pitch: 360,
            scenePhase: 3,
            text: "* Co jest?! Za moimi plecami otworzyła się wyrwa portalowa! UGH!! Boty spychają mnie wiązką grawitacyjną... Mój kij wypadł mi z ręki!! ANGEELAAA!!"
        },
        {
            speaker: "ANGELA",
            color: "#f472b6",
            portrait: "angela_panic",
            pitch: 630,
            scenePhase: 3,
            text: "* NIEEEE! DAAAAVE!! Wepchnęły go w portal, a jego Ostrze Rdzeniowe zostało na podłodze bazy...! Dokąd go wysłałeś, ty potworze?!"
        }
    ]
};


let activeCutsceneKey = null;
let cutsceneIndex = 0;
let cutsceneCharIndex = 0;
let cutsceneTick = 0;
let cutscenePhaseTick = 0;
let lastCutscenePhase = 0;
let cutsceneOnFinish = null;
let introSeen = false;


function drawAngela(targetCtx, x, y, w, h, facing = -1, isPanic = false) {
    targetCtx.save();

    targetCtx.fillStyle = '#db2777';
    targetCtx.beginPath();
    targetCtx.moveTo(x + w / 2, y);
    targetCtx.lineTo(x + w / 2 - 11, y - 8);
    targetCtx.lineTo(x + w / 2 - 11, y + 2);
    targetCtx.closePath();
    targetCtx.fill();

    targetCtx.beginPath();
    targetCtx.moveTo(x + w / 2, y);
    targetCtx.lineTo(x + w / 2 + 11, y - 8);
    targetCtx.lineTo(x + w / 2 + 11, y + 2);
    targetCtx.closePath();
    targetCtx.fill();

    targetCtx.fillStyle = '#fbcfe8';
    targetCtx.fillRect(x + w / 2 - 3, y - 4, 6, 5);

    targetCtx.fillStyle = '#ec4899';
    targetCtx.fillRect(x, y, w, h);
    targetCtx.strokeStyle = '#fbcfe8';
    targetCtx.lineWidth = 2;
    targetCtx.strokeRect(x + 1, y + 1, w - 2, h - 2);

    targetCtx.fillStyle = 'rgba(244, 63, 94, 0.55)';
    targetCtx.fillRect(x + 3, y + h * 0.56, 5, 3.5);
    targetCtx.fillRect(x + w - 8, y + h * 0.56, 5, 3.5);

    const eyeW = Math.max(7, Math.round(w * 0.24));
    const eyeH = isPanic ? Math.max(9, Math.round(h * 0.31)) : Math.max(8, Math.round(h * 0.27));
    const leftEyeX = x + Math.round(w * 0.17);
    const rightEyeX = x + Math.round(w * 0.57);
    const eyeY = y + Math.round(h * 0.27);

    targetCtx.strokeStyle = '#090d16';
    targetCtx.lineWidth = 2;
    targetCtx.beginPath();
    targetCtx.moveTo(leftEyeX + 1, eyeY);
    targetCtx.lineTo(leftEyeX - 3, eyeY - 4);
    targetCtx.moveTo(leftEyeX + eyeW / 2, eyeY);
    targetCtx.lineTo(leftEyeX + eyeW / 2 - 1, eyeY - 5);

    targetCtx.moveTo(rightEyeX + eyeW - 1, eyeY);
    targetCtx.lineTo(rightEyeX + eyeW + 3, eyeY - 4);
    targetCtx.moveTo(rightEyeX + eyeW / 2, eyeY);
    targetCtx.lineTo(rightEyeX + eyeW / 2 + 1, eyeY - 5);
    targetCtx.stroke();

    targetCtx.fillStyle = '#ffffff';
    targetCtx.fillRect(leftEyeX, eyeY, eyeW, eyeH);
    targetCtx.fillRect(rightEyeX, eyeY, eyeW, eyeH);

    const pupilSize = isPanic ? Math.max(3, Math.round(eyeW * 0.45)) : Math.max(4, Math.round(eyeW * 0.55));
    const lookOffset = facing < 0 ? 1 : Math.max(2, eyeW - pupilSize - 1);
    const pupilY = eyeY + 2;

    targetCtx.fillStyle = '#090d16';
    targetCtx.fillRect(leftEyeX + lookOffset, pupilY, pupilSize, pupilSize);
    targetCtx.fillRect(rightEyeX + lookOffset, pupilY, pupilSize, pupilSize);

    targetCtx.fillStyle = '#ffffff';
    targetCtx.fillRect(leftEyeX + lookOffset + 1, pupilY + 1, 1.5, 1.5);
    targetCtx.fillRect(rightEyeX + lookOffset + 1, pupilY + 1, 1.5, 1.5);

    if (isPanic) {
        targetCtx.fillStyle = '#831843';
        targetCtx.beginPath();
        targetCtx.arc(x + w / 2, y + h * 0.76, 3.2, 0, Math.PI * 2);
        targetCtx.fill();
    }

    targetCtx.restore();
}

function drawSpeakerPortrait(type) {
    if (!pCtx) return;
    pCtx.clearRect(0, 0, 72, 72);
    pCtx.fillStyle = '#090d16';
    pCtx.fillRect(0, 0, 72, 72);

    if (type === 'dave' || type === 'dave_determined') {
        pCtx.fillStyle = '#9333ea';
        pCtx.fillRect(14, 16, 44, 44);
        pCtx.strokeStyle = '#e9d5ff';
        pCtx.lineWidth = 2.5;
        pCtx.strokeRect(14, 16, 44, 44);

        pCtx.fillStyle = '#ffffff';
        pCtx.fillRect(22, 28, 10, 11);
        pCtx.fillRect(40, 28, 10, 11);
        pCtx.fillStyle = '#090d16';
        pCtx.fillRect(26, 31, 5, 6);
        pCtx.fillRect(44, 31, 5, 6);

        if (type === 'dave_determined') {
            pCtx.strokeStyle = '#3b0764';
            pCtx.lineWidth = 3;
            pCtx.beginPath();
            pCtx.moveTo(20, 25);
            pCtx.lineTo(33, 29);
            pCtx.moveTo(52, 25);
            pCtx.lineTo(39, 29);
            pCtx.stroke();
        }
    } else if (type === 'angela' || type === 'angela_panic') {
        drawAngela(pCtx, 15, 20, 42, 42, 1, type === 'angela_panic');
    } else if (type === 'jerry' || type === 'jerry_alert') {
        pCtx.fillStyle = '#16a34a';
        pCtx.fillRect(18, 22, 36, 36);
        pCtx.strokeStyle = '#86efac';
        pCtx.lineWidth = 2.5;
        pCtx.strokeRect(18, 22, 36, 36);

        pCtx.fillStyle = '#0284c7';
        pCtx.fillRect(18, 25, 36, 5);
        pCtx.fillStyle = '#facc15';
        pCtx.fillRect(48, 25, 6, 5);

        pCtx.fillStyle = '#ffffff';
        pCtx.fillRect(24, 33, 9, 9);
        pCtx.fillRect(39, 33, 9, 9);
        pCtx.fillStyle = '#090d16';
        pCtx.fillRect(26, 36, 4.5, 5);
        pCtx.fillRect(41, 36, 4.5, 5);

        if (type === 'jerry') {
            pCtx.fillStyle = '#15803d';
            pCtx.fillRect(24, 33, 9, 3.5);
            pCtx.fillRect(39, 33, 9, 3.5);
        }
    } else if (type === 'john' || type === 'john_button') {
        pCtx.fillStyle = '#1e293b';
        pCtx.fillRect(12, 16, 44, 44);
        pCtx.strokeStyle = '#38bdf8';
        pCtx.lineWidth = 2.5;
        pCtx.strokeRect(12, 16, 44, 44);

        pCtx.fillStyle = '#0284c7';
        pCtx.fillRect(16, 26, 36, 14);
        pCtx.fillStyle = '#67e8f9';
        pCtx.fillRect(19, 29, 30, 8);

        if (type === 'john_button') {
            pCtx.fillStyle = '#334155';
            pCtx.fillRect(46, 42, 18, 16);
            pCtx.strokeStyle = '#94a3b8';
            pCtx.lineWidth = 1.5;
            pCtx.strokeRect(46, 42, 18, 16);
            pCtx.fillStyle = '#ef4444';
            pCtx.fillRect(50, 36, 10, 6);
        }
    }
}


function startCutscene(key, onFinishCallback) {
    activeCutsceneKey = key;
    cutsceneIndex = 0;
    cutsceneCharIndex = 0;
    cutsceneTick = 0;
    cutscenePhaseTick = 0;
    lastCutscenePhase = 0;
    cutsceneOnFinish = onFinishCallback;
    gameState = 'CUTSCENE';

    inGameHud.classList.add('hidden');
    bossHud.classList.add('hidden');
    mainMenuOverlay.classList.add('hidden');
    pauseMenuOverlay.classList.add('hidden');
    cutsceneOverlay.classList.remove('hidden');

    updateTouchControlsVisibility();
    syncMusicForState();
    syncCutsceneSlideUI();
}

function syncCutsceneSlideUI() {
    const script = CUTSCENE_SCRIPTS[activeCutsceneKey];
    if (!script || !script[cutsceneIndex]) return;
    const slide = script[cutsceneIndex];
    if (slide.scenePhase !== lastCutscenePhase) {
        cutscenePhaseTick = 0;
        lastCutscenePhase = slide.scenePhase || 0;
    }
    cutsceneSpeakerEl.textContent = slide.speaker;
    cutsceneSpeakerEl.style.color = slide.color;
    cutsceneStepEl.textContent = `${cutsceneIndex + 1}/${script.length}`;
    cutsceneTextEl.textContent = '';
    cutsceneCharIndex = 0;
    drawSpeakerPortrait(slide.portrait);

    if (slide.scenePhase === 1 && (activeCutsceneKey === 'outro' || activeCutsceneKey === 'john_base_portal')) {
        if (screenShakeEnabled) screenShake = 16;
        sfx.play('death');
    } else if (slide.scenePhase === 2 && (activeCutsceneKey === 'outro' || activeCutsceneKey === 'john_base_portal')) {
        if (screenShakeEnabled) screenShake = 20;
        sfx.play('laser');
    } else if (slide.scenePhase === 3 && activeCutsceneKey === 'john_base_portal') {
        if (screenShakeEnabled) screenShake = 22;
        sfx.play('boss_glitch');
    } else if (slide.scenePhase === 1 && activeCutsceneKey === 'intro') {
        sfx.play('troll');
    }
}

function advanceCutscene() {
    if (gameState !== 'CUTSCENE') return;
    const script = CUTSCENE_SCRIPTS[activeCutsceneKey];
    if (!script) return;
    const slide = script[cutsceneIndex];

    if (cutsceneCharIndex < slide.text.length) {
        cutsceneCharIndex = slide.text.length;
        cutsceneTextEl.textContent = slide.text;
        sfx.play('ui_move');
        return;
    }

    cutsceneIndex++;
    if (cutsceneIndex >= script.length) {
        sfx.play('ui_select');
        finishCutscene();
    } else {
        sfx.play('ui_select');
        syncCutsceneSlideUI();
    }
}


function drawCutsceneScene() {
    const script = CUTSCENE_SCRIPTS[activeCutsceneKey];
    const slide = (script && script[cutsceneIndex]) ? script[cutsceneIndex] : { scenePhase: 0 };
    const phase = slide.scenePhase || 0;
    const cx = Math.floor(canvas.width / 2);
    const stageFloorY = 385;

    if (activeCutsceneKey === 'intro') {
        ctx.save();
        drawEnvironment('day', null, 0);

        const castleX = cx - 290;
        const castleY = 145;
        const castleW = 240;
        const castleH = stageFloorY - castleY;
        const gateX = castleX + 82;
        const gateY = stageFloorY - 92;

        ctx.fillStyle = 'rgba(0, 0, 0, 0.28)';
        ctx.fillRect(castleX + 8, castleY + 6, castleW, castleH);

        ctx.fillStyle = '#475569';
        ctx.fillRect(castleX - 18, castleY - 38, 64, castleH + 38);
        ctx.fillRect(castleX + castleW - 46, castleY - 38, 64, castleH + 38);
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 2.5;
        ctx.strokeRect(castleX - 18, castleY - 38, 64, castleH + 38);
        ctx.strokeRect(castleX + castleW - 46, castleY - 38, 64, castleH + 38);

        ctx.fillStyle = '#7e22ce';
        ctx.fillRect(castleX - 24, castleY - 56, 76, 18);
        ctx.fillRect(castleX - 12, castleY - 72, 52, 16);
        ctx.fillRect(castleX + castleW - 52, castleY - 56, 76, 18);
        ctx.fillRect(castleX + castleW - 40, castleY - 72, 52, 16);

        const flagWave = Math.sin(tickCount * 0.12) * 4;
        ctx.strokeStyle = '#f8fafc';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(castleX + 14, castleY - 72);
        ctx.lineTo(castleX + 14, castleY - 102);
        ctx.moveTo(castleX + castleW - 14, castleY - 72);
        ctx.lineTo(castleX + castleW - 14, castleY - 102);
        ctx.stroke();

        ctx.fillStyle = '#ec4899';
        ctx.beginPath();
        ctx.moveTo(castleX + 14, castleY - 102);
        ctx.lineTo(castleX + 42, castleY - 94 + flagWave);
        ctx.lineTo(castleX + 14, castleY - 86);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(castleX + castleW - 14, castleY - 102);
        ctx.lineTo(castleX + castleW + 14, castleY - 94 + flagWave);
        ctx.lineTo(castleX + castleW - 14, castleY - 86);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#64748b';
        ctx.fillRect(castleX + 26, castleY, castleW - 52, castleH);
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 2.5;
        ctx.strokeRect(castleX + 26, castleY, castleW - 52, castleH);

        ctx.strokeStyle = 'rgba(15, 23, 42, 0.35)';
        ctx.lineWidth = 1.5;
        for (let by = castleY + 24; by < stageFloorY; by += 24) {
            ctx.beginPath();
            ctx.moveTo(castleX - 16, by);
            ctx.lineTo(castleX + castleW + 16, by);
            ctx.stroke();
        }

        ctx.fillStyle = '#64748b';
        for (let bx = castleX + 30; bx < castleX + castleW - 36; bx += 28) {
            ctx.fillRect(bx, castleY - 14, 18, 14);
            ctx.strokeStyle = '#1e293b';
            ctx.lineWidth = 2;
            ctx.strokeRect(bx, castleY - 14, 18, 14);
        }

        ctx.fillStyle = '#0f172a';
        ctx.fillRect(castleX + 2, castleY - 12, 20, 32);
        ctx.fillRect(castleX + castleW - 22, castleY - 12, 20, 32);
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(castleX + 5, castleY - 9, 14, 26);
        ctx.fillRect(castleX + castleW - 19, castleY - 9, 14, 26);

        ctx.fillStyle = '#334155';
        ctx.fillRect(gateX - 10, gateY - 10, 96, 102);
        ctx.fillStyle = '#090d16';
        ctx.fillRect(gateX, gateY, 76, 92);

        const grateH = phase >= 1 ? 18 : 34;
        ctx.fillStyle = '#94a3b8';
        for (let gx = gateX + 8; gx < gateX + 72; gx += 14) {
            ctx.fillRect(gx, gateY, 3, grateH);
        }
        ctx.fillRect(gateX, gateY + grateH - 5, 76, 4);

        const riverX = cx + 125;
        const riverW = 115;

        drawSolidBlock(0, stageFloorY, riverX, 215, 'day', false, false);
        drawSolidBlock(riverX + riverW, stageFloorY, canvas.width - (riverX + riverW), 215, 'day', false, false);

        ctx.fillStyle = '#0369a1';
        ctx.fillRect(riverX, stageFloorY + 6, riverW, 210);
        ctx.fillStyle = '#0284c7';
        ctx.fillRect(riverX, stageFloorY + 6, riverW, 28);
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(riverX, stageFloorY + 6, riverW, 6);

        ctx.fillStyle = '#bae6fd';
        for (let wy = stageFloorY + 18; wy < 580; wy += 28) {
            const waveShift = ((tickCount * 1.4 + wy) % 36);
            ctx.fillRect(riverX + 10 + waveShift, wy, 20, 4);
            ctx.fillRect(riverX + 55 + (36 - waveShift), wy + 10, 18, 4);
        }

        ctx.fillStyle = '#78350f';
        ctx.fillRect(riverX - 8, stageFloorY - 6, riverW + 16, 10);
        ctx.fillStyle = '#451a03';
        for (let px = riverX - 4; px < riverX + riverW + 8; px += 16) {
            ctx.fillRect(px, stageFloorY - 6, 3, 10);
        }
        ctx.fillStyle = '#92400e';
        ctx.fillRect(riverX + 4, stageFloorY - 24, 6, 18);
        ctx.fillRect(riverX + riverW / 2 - 3, stageFloorY - 24, 6, 18);
        ctx.fillRect(riverX + riverW - 10, stageFloorY - 24, 6, 18);
        ctx.fillRect(riverX + 2, stageFloorY - 24, riverW - 4, 4);

        const hedgePositions = [cx - 175, cx - 55, cx + 18, cx + 72];
        const flowerColors = ['#f472b6', '#facc15', '#38bdf8', '#fb923c'];
        hedgePositions.forEach((hx, idx) => {
            ctx.fillStyle = '#15803d';
            ctx.fillRect(hx, stageFloorY - 26, 40, 26);
            ctx.fillStyle = '#22c55e';
            ctx.fillRect(hx + 2, stageFloorY - 24, 36, 8);
            ctx.strokeStyle = '#052e16';
            ctx.lineWidth = 2;
            ctx.strokeRect(hx, stageFloorY - 26, 40, 26);

            ctx.fillStyle = flowerColors[idx % flowerColors.length];
            ctx.fillRect(hx + 7, stageFloorY - 20, 6, 6);
            ctx.fillRect(hx + 20, stageFloorY - 14, 6, 6);
            ctx.fillRect(hx + 28, stageFloorY - 21, 6, 6);
        });

        const fountX = cx - 95;
        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(fountX - 24, stageFloorY - 14, 48, 14);
        ctx.fillRect(fountX - 8, stageFloorY - 36, 16, 22);
        ctx.fillRect(fountX - 18, stageFloorY - 42, 36, 6);
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 2;
        ctx.strokeRect(fountX - 24, stageFloorY - 14, 48, 14);

        const jetH = 12 + Math.sin(tickCount * 0.2) * 4;
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(fountX - 4, stageFloorY - 42 - jetH, 8, jetH);
        ctx.fillStyle = '#bae6fd';
        ctx.fillRect(fountX - 12, stageFloorY - 40 - (tickCount % 10), 4, 4);
        ctx.fillRect(fountX + 8, stageFloorY - 40 - ((tickCount + 5) % 10), 4, 4);

        const daveX = phase === 2
            ? Math.min(cx + 35, (cx - 115) + cutscenePhaseTick * 2.1)
            : (phase === 1 ? cx - 122 : cx - 115);
        const daveRunBob = (phase === 2 && daveX < cx + 35) ? Math.abs(Math.sin(cutscenePhaseTick * 0.35)) * 6 : 0;

        ctx.fillStyle = '#9333ea';
        ctx.fillRect(daveX, stageFloorY - 34 - daveRunBob, 34, 34);
        ctx.strokeStyle = '#e9d5ff';
        ctx.lineWidth = 2;
        ctx.strokeRect(daveX, stageFloorY - 34 - daveRunBob, 34, 34);
        ctx.fillStyle = '#fff';
        ctx.fillRect(daveX + 10, stageFloorY - 25 - daveRunBob, 7, 8);
        ctx.fillRect(daveX + 22, stageFloorY - 25 - daveRunBob, 7, 8);
        ctx.fillStyle = '#090d16';
        ctx.fillRect(daveX + 13, stageFloorY - 23 - daveRunBob, 3.5, 4.5);
        ctx.fillRect(daveX + 25, stageFloorY - 23 - daveRunBob, 3.5, 4.5);

        const kidnapOffset = phase === 2 ? Math.min(340, cutscenePhaseTick * 3.0) : 0;
        const angelaX = cx + 45 + kidnapOffset;
        const angelaBounce = phase >= 1 ? Math.abs(Math.sin(cutsceneTick * 0.28)) * 10 : 0;
        drawAngela(ctx, angelaX, stageFloorY - 38 - angelaBounce, 34, 34, -1, phase >= 1);

        if (phase >= 1) {
            const approachProgress = phase === 1 ? Math.min(1, cutscenePhaseTick / 32) : 1;
            const bot1TargetX = angelaX - 38;
            const bot2TargetX = angelaX + 38;
            const bot3TargetX = angelaX + 76;

            const botPositions = [
                (gateX + 24) + (bot1TargetX - (gateX + 24)) * approachProgress,
                (cx - 10)    + (bot2TargetX - (cx - 10))    * approachProgress,
                (cx + 30)    + (bot3TargetX - (cx + 30))    * approachProgress
            ];
            const botBob = Math.abs(Math.sin(cutsceneTick * 0.32)) * 4;

            for (const rx of botPositions) {
                const ry = stageFloorY - 34 - botBob;
                ctx.fillStyle = '#7f1d1d';
                ctx.fillRect(rx, ry, 32, 32);
                ctx.strokeStyle = '#ef4444';
                ctx.lineWidth = 2;
                ctx.strokeRect(rx, ry, 32, 32);
                ctx.fillStyle = '#ef4444';
                ctx.beginPath();
                ctx.moveTo(rx + 2, ry); ctx.lineTo(rx - 4, ry - 8); ctx.lineTo(rx + 9, ry);
                ctx.moveTo(rx + 30, ry); ctx.lineTo(rx + 36, ry - 8); ctx.lineTo(rx + 23, ry);
                ctx.fill();
                const eyeDir = phase === 2 ? 2 : 0;
                ctx.fillStyle = '#090d16';
                ctx.fillRect(rx + 6, ry + 8, 20, 12);
                ctx.fillStyle = '#ef4444';
                ctx.fillRect(rx + 10 + eyeDir, ry + 10, 12, 8);
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(rx + 14 + eyeDir, ry + 12, 4, 4);
            }
        }
        ctx.restore();
        return;
    }

    if (activeCutsceneKey === 'jerry_jungle') {
        ctx.save();
        drawEnvironment('jungle', null, 0);
        drawSolidBlock(0, stageFloorY, canvas.width, 215, 'jungle', false, false);

        const ruinX = cx - 75;
        const ruinY = stageFloorY - 125;
        ctx.fillStyle = '#334155';
        ctx.fillRect(ruinX, ruinY, 26, 125);
        ctx.fillRect(ruinX + 124, ruinY, 26, 125);
        ctx.fillRect(ruinX - 12, ruinY - 22, 174, 24);
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 2;
        ctx.strokeRect(ruinX, ruinY, 26, 125);
        ctx.strokeRect(ruinX + 124, ruinY, 26, 125);
        ctx.strokeRect(ruinX - 12, ruinY - 22, 174, 24);

        ctx.fillStyle = '#15803d';
        ctx.fillRect(ruinX - 8, ruinY - 22, 54, 10);
        ctx.fillRect(ruinX + 95, ruinY - 22, 50, 10);
        ctx.fillRect(ruinX + 4, ruinY + 20, 18, 32);

        const crateX = cx + 118;
        const crateY = stageFloorY - 26;
        ctx.fillStyle = '#78350f';
        ctx.fillRect(crateX, crateY, 32, 26);
        ctx.strokeStyle = '#451a03';
        ctx.lineWidth = 2;
        ctx.strokeRect(crateX, crateY, 32, 26);
        ctx.fillStyle = '#0f766e';
        ctx.fillRect(crateX + 10, crateY - 11, 12, 11);
        ctx.strokeStyle = '#f43f5e';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(crateX + 16, crateY - 11);
        ctx.lineTo(crateX + 22, crateY - 19);
        ctx.stroke();

        const daveX = cx - 92;
        const daveBob = Math.abs(Math.sin(tickCount * 0.08)) * 3;
        const daveY = stageFloorY - 34 - daveBob;

        ctx.fillStyle = '#9333ea';
        ctx.fillRect(daveX, daveY, 34, 34);
        ctx.strokeStyle = '#e9d5ff';
        ctx.lineWidth = 2;
        ctx.strokeRect(daveX, daveY, 34, 34);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(daveX + 11, daveY + 9, 7, 8);
        ctx.fillRect(daveX + 22, daveY + 9, 7, 8);
        ctx.fillStyle = '#090d16';
        ctx.fillRect(daveX + 14, daveY + 11, 3.5, 4.5);
        ctx.fillRect(daveX + 25, daveY + 11, 3.5, 4.5);

        let jerryX = cx + 68;
        if (phase === 2 && cutsceneIndex >= 6) {
            jerryX = (cx + 68) + Math.min(180, cutscenePhaseTick * 1.8);
        }
        const jerryBounce = (phase === 1)
            ? Math.abs(Math.sin(tickCount * 0.22)) * 5
            : Math.abs(Math.sin(tickCount * 0.1 + 1)) * 2.5;
        const jerryY = stageFloorY - 26 - jerryBounce;

        ctx.fillStyle = '#16a34a';
        ctx.fillRect(jerryX, jerryY, 26, 26);
        ctx.strokeStyle = '#86efac';
        ctx.lineWidth = 2;
        ctx.strokeRect(jerryX, jerryY, 26, 26);

        ctx.fillStyle = '#0284c7';
        ctx.fillRect(jerryX, jerryY + 3, 26, 4);
        ctx.fillStyle = '#facc15';
        ctx.fillRect(jerryX + 21, jerryY + 3, 5, 4);

        const jLook = (phase === 2 && cutsceneIndex >= 6) ? 3 : -2;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(jerryX + 4 + (jLook > 0 ? 2 : 0), jerryY + 9, 6, 6);
        ctx.fillRect(jerryX + 14 + (jLook > 0 ? 2 : 0), jerryY + 9, 6, 6);
        ctx.fillStyle = '#090d16';
        ctx.fillRect(jerryX + 5 + (jLook > 0 ? 3 : 0), jerryY + 11, 3, 3.5);
        ctx.fillRect(jerryX + 15 + (jLook > 0 ? 3 : 0), jerryY + 11, 3, 3.5);

        if (phase !== 1) {
            ctx.fillStyle = '#15803d';
            ctx.fillRect(jerryX + 4 + (jLook > 0 ? 2 : 0), jerryY + 9, 6, 2.2);
            ctx.fillRect(jerryX + 14 + (jLook > 0 ? 2 : 0), jerryY + 9, 6, 2.2);
        }

        if (phase === 1 || phase === 2) {
            let staffX = jerryX - 14;
            let staffY = jerryY + 8;
            let staffAngle = -0.35;

            if (phase === 1 && cutsceneIndex === 4) {
                const t = Math.min(1, cutscenePhaseTick / 36);
                staffX = (jerryX - 10) + ((daveX + 38) - (jerryX - 10)) * t;
                staffY = (jerryY + 6) - Math.sin(t * Math.PI) * 55;
                staffAngle = -0.35 - t * Math.PI * 2;
            } else if (phase === 2) {
                staffX = daveX + 38;
                staffY = daveY + 14;
                staffAngle = 0.25 + Math.sin(tickCount * 0.1) * 0.08;
            }

            ctx.save();
            ctx.translate(staffX, staffY);
            ctx.rotate(staffAngle);
            ctx.fillStyle = '#78350f';
            ctx.fillRect(-3, -22, 6, 44);
            ctx.strokeStyle = '#451a03';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(-3, -22, 6, 44);
            ctx.fillStyle = '#22d3ee';
            ctx.fillRect(-5, -30, 10, 10);
            ctx.strokeStyle = '#facc15';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(-5, -30, 10, 10);
            ctx.restore();
        }

        ctx.restore();
        return;
    }

    if (activeCutsceneKey === 'outro') {
        ctx.save();
        drawEnvironment('castle', null, 0);

        const waterSurfaceY = stageFloorY + 46;

        // 1. Głęboka nocna rzeka pod oknem Zamku Evada
        const waterGrad = ctx.createLinearGradient(0, waterSurfaceY, 0, 600);
        waterGrad.addColorStop(0, '#0284c7');
        waterGrad.addColorStop(0.35, '#0369a1');
        waterGrad.addColorStop(1, '#082f49');
        ctx.fillStyle = waterGrad;
        ctx.fillRect(0, waterSurfaceY, canvas.width, 600 - waterSurfaceY);

        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(0, waterSurfaceY, canvas.width, 6);
        ctx.fillStyle = '#bae6fd';
        for (let wx = 0; wx < canvas.width; wx += 48) {
            const waveShift = ((tickCount * 1.5 + wx) % 36);
            ctx.fillRect(wx + waveShift, waterSurfaceY + 10, 20, 3);
            ctx.fillRect(wx + (36 - waveShift), waterSurfaceY + 24, 16, 3);
        }

        // 2. Posadzka Sali Tronowej Evada i krawędź balkonu
        drawSolidBlock(80, stageFloorY, canvas.width - 80, 46, 'castle', false, false);
        ctx.fillStyle = '#334155';
        ctx.fillRect(74, stageFloorY - 12, 14, 58);
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 2;
        ctx.strokeRect(74, stageFloorY - 12, 14, 58);

        // 3. Dymiący i iskrzący wrak Mega-Robo Evada w tle
        const wreckX = cx - 225;
        const wreckY = stageFloorY - 46;
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(wreckX + 6, wreckY + 6, 62, 46);
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(wreckX, wreckY, 62, 46);
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2.5;
        ctx.strokeRect(wreckX, wreckY, 62, 46);
        ctx.fillStyle = '#090d16';
        ctx.fillRect(wreckX + 10, wreckY + 12, 42, 14);
        ctx.strokeStyle = (tickCount % 10 < 5) ? '#22d3ee' : '#ef4444';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(wreckX + 16, wreckY + 15); ctx.lineTo(wreckX + 24, wreckY + 23);
        ctx.moveTo(wreckX + 24, wreckY + 15); ctx.lineTo(wreckX + 16, wreckY + 23);
        ctx.moveTo(wreckX + 38, wreckY + 15); ctx.lineTo(wreckX + 46, wreckY + 23);
        ctx.moveTo(wreckX + 46, wreckY + 15); ctx.lineTo(wreckX + 38, wreckY + 23);
        ctx.stroke();

        for (let s = 0; s < 4; s++) {
            const smokeProgress = ((tickCount * 0.8 + s * 18) % 60) / 60;
            ctx.globalAlpha = (1 - smokeProgress) * 0.45;
            ctx.fillStyle = '#64748b';
            const smSize = 8 + smokeProgress * 14;
            ctx.fillRect(
                wreckX + 18 + Math.sin(tickCount * 0.08 + s) * 10,
                wreckY - smokeProgress * 55,
                smSize,
                smSize
            );
        }
        ctx.globalAlpha = 1;
        if (tickCount % 8 < 3) {
            ctx.fillStyle = '#facc15';
            ctx.fillRect(wreckX + 12 + (tickCount % 35), wreckY - 4, 4, 4);
        }

        // 4. Wielki witraż Zamku Evada (cały w Fazie 0, rozbity w Fazie 1+)
        const winX = cx - 64;
        const winY = 44;
        const winW = 128;
        const winH = 168;

        ctx.fillStyle = '#090d16';
        ctx.fillRect(winX - 6, winY - 6, winW + 12, winH + 12);

        if (phase === 0) {
            const glassGrad = ctx.createLinearGradient(winX, winY, winX, winY + winH);
            glassGrad.addColorStop(0, '#7f1d1d');
            glassGrad.addColorStop(0.5, '#991b1b');
            glassGrad.addColorStop(1, '#450a0a');
            ctx.fillStyle = glassGrad;
            ctx.fillRect(winX, winY, winW, winH);

            const approachSize = 6 + Math.min(26, cutscenePhaseTick * 0.25);
            ctx.fillStyle = 'rgba(56, 189, 248, 0.55)';
            ctx.fillRect(cx - approachSize / 2, winY + 75 - approachSize / 2, approachSize, approachSize);

            ctx.strokeStyle = '#1e293b';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(cx, winY); ctx.lineTo(cx, winY + winH);
            ctx.moveTo(winX, winY + 56); ctx.lineTo(winX + winW, winY + 56);
            ctx.moveTo(winX, winY + 112); ctx.lineTo(winX + winW, winY + 112);
            ctx.stroke();
        } else {
            const nightGrad = ctx.createLinearGradient(winX, winY, winX, winY + winH);
            nightGrad.addColorStop(0, '#020617');
            nightGrad.addColorStop(1, '#0c4a6e');
            ctx.fillStyle = nightGrad;
            ctx.fillRect(winX, winY, winW, winH);

            ctx.fillStyle = '#ef4444';
            ctx.fillRect(winX + 20, winY + 22, 24, 24);
            ctx.strokeStyle = '#fca5a5';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(winX + 20, winY + 22, 24, 24);

            ctx.fillStyle = '#dc2626';
            for (let gx = winX + 4; gx < winX + winW - 8; gx += 18) {
                ctx.beginPath();
                ctx.moveTo(gx, winY);
                ctx.lineTo(gx + 9, winY + 14);
                ctx.lineTo(gx + 18, winY);
                ctx.fill();

                ctx.beginPath();
                ctx.moveTo(gx, winY + winH);
                ctx.lineTo(gx + 9, winY + winH - 12);
                ctx.lineTo(gx + 18, winY + winH);
                ctx.fill();
            }
        }

        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 4;
        ctx.strokeRect(winX, winY, winW, winH);

        ctx.fillStyle = '#dc2626';
        ctx.fillRect(cx - 20, 22, 40, 20);
        ctx.fillStyle = '#facc15';
        ctx.fillRect(cx - 6, 27, 12, 10);

        if (phase >= 1) {
            const shardTick = (phase === 1) ? cutscenePhaseTick : 90;
            for (let i = 0; i < 12; i++) {
                const dir = (i % 2 === 0 ? 1 : -1);
                const vx = dir * (1.2 + (i % 5) * 0.65);
                const startX = cx + ((i % 5) - 2) * 18;
                const startY = winY + 40 + (i % 4) * 28;
                const sx = startX + vx * shardTick;
                const rawY = startY - 3.5 * shardTick + 0.14 * shardTick * shardTick;
                const sy = Math.min(stageFloorY - 6, rawY);

                ctx.save();
                ctx.translate(sx, sy);
                if (sy < stageFloorY - 6) ctx.rotate(shardTick * 0.15 * dir);
                ctx.fillStyle = (i % 3 === 0) ? '#facc15' : ((i % 2 === 0) ? '#f43f5e' : '#fda4af');
                ctx.fillRect(-5, -4, 10, 8);
                ctx.restore();
            }
        }

        // 5. ANGELA
        let angelaX = cx + 78;
        let angelaY = stageFloorY - 34;
        if (phase === 0) {
            angelaY -= Math.abs(Math.sin(tickCount * 0.08)) * 4;
        } else if (phase === 1 || phase === 2) {
            angelaX = cx + 88;
            angelaY -= Math.abs(Math.sin(tickCount * 0.28)) * 6;
        } else if (phase === 3) {
            const flyT = Math.min(1, cutscenePhaseTick / 95);
            angelaX = (cx + 88) + flyT * 135;
            angelaY = (stageFloorY - 34) - flyT * 210 + Math.sin(cutscenePhaseTick * 0.35) * 4;
        }

        if (phase === 3) {
            ctx.save();
            ctx.strokeStyle = 'rgba(34, 211, 238, 0.75)';
            ctx.fillStyle = 'rgba(34, 211, 238, 0.18)';
            ctx.lineWidth = 2;
            ctx.fillRect(angelaX - 4, angelaY - 6, 42, 46);
            ctx.strokeRect(angelaX - 4, angelaY - 6, 42, 46);
            ctx.restore();
        }
        drawAngela(ctx, angelaX, angelaY, 34, 34, -1, phase >= 1);

        // 6. JOHN
        if (phase >= 1) {
            let johnX = cx - 42;
            let johnY = stageFloorY - 92;

            if (phase === 1) {
                const swoopT = Math.min(1, cutscenePhaseTick / 26);
                const easeOut = 1 - Math.pow(1 - swoopT, 3);
                johnX = (cx - 18) + ((cx - 42) - (cx - 18)) * easeOut;
                johnY = (winY + 45) + ((stageFloorY - 92) - (winY + 45)) * easeOut + Math.sin(cutsceneTick * 0.14) * 6;
            } else if (phase === 2) {
                johnX = cx - 42 - Math.min(8, cutscenePhaseTick * 0.2);
                johnY = stageFloorY - 92 + Math.sin(cutsceneTick * 0.18) * 5;
            } else if (phase === 3) {
                johnX = angelaX - 36;
                johnY = angelaY - 18;
            }

            const flameH = 16 + Math.sin(tickCount * 0.6) * 7;
            ctx.fillStyle = '#f97316';
            ctx.fillRect(johnX - 9, johnY + 26, 9, flameH);
            ctx.fillStyle = '#fef08a';
            ctx.fillRect(johnX - 7, johnY + 26, 5, flameH * 0.6);

            ctx.fillStyle = '#475569';
            ctx.fillRect(johnX - 11, johnY + 6, 11, 22);
            ctx.strokeStyle = '#94a3b8';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(johnX - 11, johnY + 6, 11, 22);

            ctx.fillStyle = '#0f172a';
            ctx.fillRect(johnX, johnY, 38, 38);
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 2.5;
            ctx.strokeRect(johnX, johnY, 38, 38);

            ctx.fillStyle = '#38bdf8';
            ctx.fillRect(johnX + 16, johnY - 7, 6, 7);
            ctx.fillStyle = '#0284c7';
            ctx.fillRect(johnX + 5, johnY + 8, 28, 13);
            ctx.fillStyle = (phase === 2 && tickCount % 4 < 2) ? '#facc15' : '#67e8f9';
            ctx.fillRect(johnX + 8, johnY + 11, 22, 7);

            ctx.fillStyle = '#334155';
            ctx.fillRect(johnX + 32, johnY + 18, 14, 10);
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(johnX + 32, johnY + 18, 14, 10);

            if (phase === 1 && cutscenePhaseTick > 22) {
                ctx.save();
                ctx.strokeStyle = 'rgba(239, 68, 68, 0.75)';
                ctx.lineWidth = 2;
                ctx.setLineDash([6, 4]);
                ctx.beginPath();
                ctx.moveTo(johnX + 46, johnY + 23);
                ctx.lineTo(cx + 28, stageFloorY - 17);
                ctx.stroke();
                ctx.restore();
            }
        }

        // 7. DAVE
        let daveX = cx - 95;
        let daveY = stageFloorY - 34;
        let daveRot = 0;

        if (phase === 0) {
            daveX = cx - 85;
            daveY = stageFloorY - 34 - Math.abs(Math.sin(tickCount * 0.08 + 1)) * 3;
        } else if (phase === 1) {
            const dashT = Math.min(1, Math.max(0, (cutscenePhaseTick - 8) / 18));
            const easeDash = 1 - Math.pow(1 - dashT, 3);
            daveX = (cx - 85) + ((cx + 26) - (cx - 85)) * easeDash;
            daveY = stageFloorY - 34;

            if (dashT > 0 && dashT < 1) {
                for (let g = 1; g <= 3; g++) {
                    ctx.globalAlpha = 0.35 - g * 0.09;
                    ctx.fillStyle = '#22d3ee';
                    ctx.fillRect(daveX - g * 14, daveY, 34, 34);
                }
                ctx.globalAlpha = 1;
            }
        } else if (phase === 2) {
            const pushBack = Math.min(12, cutscenePhaseTick * 0.35);
            daveX = (cx + 26) - pushBack + (Math.random() - 0.5) * 4;
            daveY = stageFloorY - 34;
        } else if (phase === 3) {
            const launchT = Math.min(1, cutscenePhaseTick / 48);
            const startX = cx + 14;
            const targetRiverX = 36;
            daveX = startX + (targetRiverX - startX) * launchT;

            if (launchT < 1) {
                daveY = (stageFloorY - 34) - Math.sin(launchT * Math.PI) * 115 + (launchT * launchT * 95);
                daveRot = -launchT * Math.PI * 3.5;
            } else {
                const sinkTicks = cutscenePhaseTick - 48;
                daveY = Math.min(552, waterSurfaceY + 12 + sinkTicks * 1.1);
                daveRot = -0.35 + Math.sin(sinkTicks * 0.1) * 0.15;
            }
        }

        ctx.save();
        ctx.translate(daveX + 17, daveY + 17);
        ctx.rotate(daveRot);
        ctx.fillStyle = '#9333ea';
        ctx.fillRect(-17, -17, 34, 34);
        ctx.strokeStyle = (phase === 2) ? '#67e8f9' : '#e9d5ff';
        ctx.lineWidth = 2;
        ctx.strokeRect(-17, -17, 34, 34);
        const eyeLook = (phase === 1 || phase === 2) ? -3 : 2;
        ctx.fillStyle = '#fff';
        ctx.fillRect(-8 + eyeLook, -8, 7, 8);
        ctx.fillRect(4 + eyeLook, -8, 7, 8);
        ctx.fillStyle = '#090d16';
        ctx.fillRect(-6 + eyeLook, -6, 3.5, 4.5);
        ctx.fillRect(6 + eyeLook, -6, 3.5, 4.5);
        if (phase === 1 || phase === 2) {
            ctx.strokeStyle = '#3b0764';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(-10 + eyeLook, -10); ctx.lineTo(-1 + eyeLook, -7);
            ctx.moveTo(12 + eyeLook, -10);  ctx.lineTo(3 + eyeLook, -7);
            ctx.stroke();
        }
        ctx.restore();

        if (phase === 2) {
            const beamStartX = (cx - 42) + 46;
            const beamStartY = (stageFloorY - 92) + 23;
            const beamEndX = daveX + 17;
            const beamEndY = daveY + 17;

            ctx.strokeStyle = 'rgba(34, 211, 238, 0.55)';
            ctx.lineWidth = 18 + Math.sin(tickCount * 0.8) * 6;
            ctx.beginPath();
            ctx.moveTo(beamStartX, beamStartY);
            ctx.lineTo(beamEndX, beamEndY);
            ctx.stroke();

            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 6;
            ctx.beginPath();
            ctx.moveTo(beamStartX, beamStartY);
            ctx.lineTo(beamEndX, beamEndY);
            ctx.stroke();

            const ringRadius = 16 + ((cutscenePhaseTick * 4) % 52);
            ctx.strokeStyle = '#facc15';
            ctx.lineWidth = 3;
            ctx.strokeRect(beamEndX - ringRadius, beamEndY - ringRadius, ringRadius * 2, ringRadius * 2);

            ctx.fillStyle = (cutscenePhaseTick % 4 < 2) ? '#ffffff' : '#38bdf8';
            ctx.fillRect(beamEndX - 22, beamEndY - 22, 44, 44);
        }

        if (phase === 3 && cutscenePhaseTick >= 44) {
            const splashT = cutscenePhaseTick - 44;
            if (splashT < 35) {
                const splashH = Math.max(0, 46 - splashT * 1.3);
                ctx.fillStyle = '#bae6fd';
                ctx.fillRect(24 - splashT * 0.4, waterSurfaceY - splashH, 10, splashH);
                ctx.fillRect(38, waterSurfaceY - splashH * 1.25, 12, splashH * 1.25);
                ctx.fillRect(54 + splashT * 0.4, waterSurfaceY - splashH * 0.9, 10, splashH * 0.9);
            }
            ctx.strokeStyle = '#bae6fd';
            ctx.lineWidth = 1.5;
            for (let b = 0; b < 5; b++) {
                const bx = daveX + 8 + Math.sin(tickCount * 0.1 + b * 2) * 12;
                const by = daveY - ((tickCount * 1.5 + b * 18) % Math.max(12, daveY - waterSurfaceY));
                if (by > waterSurfaceY + 4) {
                    ctx.strokeRect(bx, by, 6, 6);
                }
            }
        }

        ctx.restore();
        return;
    }
    // ========================================================================
    // 4. ROZBUDOWANA CUTSCENKA FINAŁOWA W TAJNEJ BAZIE JOHNA (`john_base_portal`)
    // ========================================================================
    if (activeCutsceneKey === 'john_base_portal') {
        ctx.save();
        drawEnvironment('john_base', null, 0);

        // 1. Pancerna szyba obserwacyjna w głębi laboratorium (widać za nią nocną Dżunglę Cubelonu!)
        const winX = cx - 95;
        const winY = 38;
        const winW = 190;
        const winH = 115;
        ctx.fillStyle = '#022c22';
        ctx.fillRect(winX, winY, winW, winH);
        // Sylwetki drzew dżungli i księżyca za szybą bazy
        ctx.fillStyle = '#facc15';
        ctx.fillRect(winX + 140, winY + 18, 22, 22);
        ctx.fillStyle = '#064e3b';
        ctx.fillRect(winX + 12, winY + 58, 70, 57);
        ctx.fillRect(winX + 95, winY + 46, 85, 69);
        ctx.fillStyle = '#047857';
        ctx.fillRect(winX + 26, winY + 42, 46, 30);
        // Stalowe szprosy okna bazy
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 4;
        ctx.strokeRect(winX, winY, winW, winH);
        ctx.beginPath();
        ctx.moveTo(winX + winW / 2, winY);
        ctx.lineTo(winX + winW / 2, winY + winH);
        ctx.stroke();

        // 2. Czerwony puls alarmowy i obrotowe koguty alarmowe pod sufitem od Fazy 1
        if (phase >= 1) {
            const alarmAlpha = (Math.sin(tickCount * 0.24) * 0.5 + 0.5) * 0.18;
            ctx.fillStyle = `rgba(239, 68, 68, ${alarmAlpha.toFixed(3)})`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            for (let lx = 110; lx < canvas.width; lx += 210) {
                ctx.fillStyle = '#1e293b';
                ctx.fillRect(lx - 18, 0, 36, 12);
                const isLit = (tickCount % 14 < 7);
                ctx.fillStyle = isLit ? '#ef4444' : '#7f1d1d';
                ctx.fillRect(lx - 10, 12, 20, 10);
                if (isLit) {
                    ctx.fillStyle = 'rgba(239, 68, 68, 0.14)';
                    ctx.beginPath();
                    ctx.moveTo(lx, 22);
                    ctx.lineTo(lx - 55, 160);
                    ctx.lineTo(lx + 55, 160);
                    ctx.closePath();
                    ctx.fill();
                }
            }
        }

        // 3. Posadzka laboratorium z pasami ostrzegawczymi i przewodami wysokiego napięcia
        drawSolidBlock(0, stageFloorY, canvas.width, 215, 'john_base', false, false);
        for (let sx = 0; sx < canvas.width; sx += 32) {
            ctx.fillStyle = (sx / 32) % 2 === 0 ? '#facc15' : '#090d16';
            ctx.fillRect(sx, stageFloorY, 16, 6);
        }
        ctx.fillStyle = (phase >= 2) ? ((tickCount % 6 < 3) ? '#ef4444' : '#facc15') : '#22d3ee';
        ctx.fillRect(0, stageFloorY + 16, canvas.width, 4);

        // 4. Rozbudowana Komora Stazy po prawej stronie + przerażona Angela i zakładany Cyber-Equipment
        const podX = cx + 168;
        const podY = stageFloorY - 132;
        const podW = 90;
        const podH = 132;

        // Cokół i głowica komory
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(podX - 10, stageFloorY - 14, podW + 20, 14);
        ctx.fillRect(podX - 12, podY - 20, podW + 24, 22);
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2.5;
        ctx.strokeRect(podX - 10, stageFloorY - 14, podW + 20, 14);
        ctx.strokeRect(podX - 12, podY - 20, podW + 24, 22);

        // Szklana tuba energetyczna z ruchomymi pierścieniami skanującymi
        const podGrad = ctx.createLinearGradient(podX, podY, podX + podW, podY);
        podGrad.addColorStop(0, 'rgba(14, 165, 233, 0.32)');
        podGrad.addColorStop(0.5, 'rgba(56, 189, 248, 0.12)');
        podGrad.addColorStop(1, 'rgba(14, 165, 233, 0.32)');
        ctx.fillStyle = podGrad;
        ctx.fillRect(podX, podY, podW, podH - 14);

        const scanRingY = podY + 12 + ((tickCount * 1.6) % (podH - 36));
        ctx.fillStyle = 'rgba(34, 211, 238, 0.45)';
        ctx.fillRect(podX + 2, scanRingY, podW - 4, 4);

        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 3;
        ctx.strokeRect(podX, podY, podW, podH - 14);

        // Przerażona Angela wewnątrz kapsuły
        const angelaX = podX + 28;
        const angelaBounce = Math.abs(Math.sin(tickCount * 0.28)) * 4;
        const angelaY = stageFloorY - 48 - angelaBounce;
        drawAngela(ctx, angelaX, angelaY, 34, 34, -1, true);

        // Dwa przegubowe ramiona robotyczne zakładające Angeli Cyber-Hełm i Uprząż!
        const servoOffset = Math.sin(tickCount * 0.15) * 7;
        ctx.fillStyle = '#475569';
        ctx.fillRect(podX + 16, podY + 2, 8, 44 + servoOffset);
        ctx.fillRect(podX + podW - 24, podY + 2, 8, 44 + servoOffset);
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 2.5;
        ctx.strokeRect(podX + 12, podY + 44 + servoOffset, 16, 8);
        ctx.strokeRect(podX + podW - 28, podY + 44 + servoOffset, 16, 8);

        // Cyber-Hełm z wizjerem opuszczany na głowę Angeli
        const helmY = angelaY - 10 + servoOffset * 0.6;
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(angelaX - 4, helmY, 42, 12);
        ctx.strokeStyle = '#f43f5e';
        ctx.lineWidth = 2;
        ctx.strokeRect(angelaX - 4, helmY, 42, 12);
        ctx.fillStyle = (tickCount % 8 < 4) ? '#ef4444' : '#22d3ee';
        ctx.fillRect(angelaX + 6, helmY + 3, 22, 5);

        // Magnetyczna uprząż energetyczna zaciskana wokół Angeli
        ctx.strokeStyle = '#22d3ee';
        ctx.lineWidth = 2.5;
        ctx.strokeRect(angelaX - 5, angelaY + 15, 44, 10);

        // 5. JOHN NA JETPACKU + TAJEMNICZY CZERWONY PRZYCISK
        let johnX = cx + 52;
        let johnY = stageFloorY - 96 + Math.sin(tickCount * 0.14) * 5;
        if (phase === 0) {
            johnX = cx + 70;
            johnY = stageFloorY - 135 + Math.sin(tickCount * 0.1) * 4;
        } else if (phase === 1) {
            const swoopT = Math.min(1, cutscenePhaseTick / 22);
            johnY = (stageFloorY - 135) + ((stageFloorY - 96) - (stageFloorY - 135)) * swoopT + Math.sin(tickCount * 0.14) * 5;
        }

        const jFlame = 16 + Math.sin(tickCount * 0.6) * 6;
        ctx.fillStyle = '#f97316';
        ctx.fillRect(johnX + 36, johnY + 26, 9, jFlame);
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(johnX + 38, johnY + 26, 5, jFlame * 0.6);

        ctx.fillStyle = '#475569';
        ctx.fillRect(johnX + 35, johnY + 6, 11, 22);
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(johnX + 35, johnY + 6, 11, 22);

        ctx.fillStyle = '#0f172a';
        ctx.fillRect(johnX, johnY, 38, 38);
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2.5;
        ctx.strokeRect(johnX, johnY, 38, 38);

        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(johnX + 16, johnY - 7, 6, 7);
        ctx.fillStyle = '#0284c7';
        ctx.fillRect(johnX + 4, johnY + 8, 26, 13);
        ctx.fillStyle = (phase >= 2 && tickCount % 4 < 2) ? '#ef4444' : '#67e8f9';
        ctx.fillRect(johnX + 6, johnY + 11, 20, 7);

        // Tajemniczy Czerwony Przycisk w dłoni Johna (Faza 2 i 3)
        if (phase >= 2) {
            const remX = johnX - 30;
            const remY = johnY + 12;

            const waveR = 12 + ((cutscenePhaseTick * 2.8) % 34);
            ctx.strokeStyle = 'rgba(239, 68, 68, 0.78)';
            ctx.lineWidth = 2;
            ctx.strokeRect(remX + 11 - waveR / 2, remY - waveR / 2, waveR, waveR);

            ctx.fillStyle = '#334155';
            ctx.fillRect(remX, remY, 22, 16);
            ctx.strokeStyle = '#94a3b8';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(remX, remY, 22, 16);

            const isPressed = phase === 3 ? 3 : 0;
            ctx.fillStyle = (tickCount % 6 < 3) ? '#ef4444' : '#dc2626';
            ctx.fillRect(remX + 4, remY - 7 + isPressed, 14, 7 - isPressed * 0.5);
            ctx.strokeStyle = '#fecaca';
            ctx.lineWidth = 1;
            ctx.strokeRect(remX + 4, remY - 7 + isPressed, 14, 7 - isPressed * 0.5);
        }

        // 6. MIĘDZYWYMIAROWY PORTAL ZA PLECAMI DAVE'A (Otwiera się w Fazie 3!)
        const portalX = cx - 230;
        const portalY = stageFloorY - 62;
        if (phase === 3) {
            const portalOpenScale = Math.min(1, cutscenePhaseTick / 16);
            ctx.save();
            ctx.translate(portalX, portalY);
            ctx.scale(portalOpenScale, portalOpenScale);

            ctx.globalAlpha = 0.28;
            ctx.fillStyle = '#a855f7';
            ctx.fillRect(-72, -72, 144, 144);
            ctx.globalAlpha = 1;

            const ringColors = ['#7e22ce', '#ec4899', '#38bdf8', '#facc15', '#ffffff'];
            for (let r = 58, idx = 0; r >= 12; r -= 11, idx++) {
                ctx.save();
                ctx.rotate((tickCount * 0.09 + idx * 0.5) * (idx % 2 === 0 ? 1 : -1));
                ctx.fillStyle = ringColors[idx % ringColors.length];
                ctx.fillRect(-r, -r, r * 2, r * 2);
                ctx.strokeStyle = '#090d16';
                ctx.lineWidth = 2;
                ctx.strokeRect(-r, -r, r * 2, r * 2);
                ctx.restore();
            }

            // Pioruny wymiarowe wokół portalu
            ctx.strokeStyle = (tickCount % 4 < 2) ? '#22d3ee' : '#f472b6';
            ctx.lineWidth = 2.5;
            for (let a = 0; a < 4; a++) {
                const ang = tickCount * 0.15 + a * (Math.PI / 2);
                ctx.beginPath();
                ctx.moveTo(Math.cos(ang) * 42, Math.sin(ang) * 42);
                ctx.lineTo(Math.cos(ang + 0.2) * 68, Math.sin(ang + 0.2) * 68);
                ctx.stroke();
            }
            ctx.restore();
        }

        // 7. DAVE + UPUSZCZENIE OSTRZA RDZENIOWEGO + WEPCHNIĘCIE W PORTAL
        let daveX = cx - 115;
        let daveY = stageFloorY - 34;
        let daveRot = 0;
        let daveScale = 1;

        if (phase === 0) {
            const runIn = Math.min(1, cutscenePhaseTick / 20);
            daveX = (cx - 170) + ((cx - 105) - (cx - 170)) * runIn;
            daveY = stageFloorY - 34 - (runIn < 1 ? Math.abs(Math.sin(cutscenePhaseTick * 0.35)) * 5 : 0);
        } else if (phase === 1 || phase === 2) {
            daveX = cx - 102;
            daveY = stageFloorY - 34 - Math.abs(Math.sin(tickCount * 0.15)) * 3;
        } else if (phase === 3) {
            const t = Math.min(1, cutscenePhaseTick / 68);
            const easeIn = t * t;
            daveX = (cx - 102) + ((portalX - 17) - (cx - 102)) * easeIn;
            daveY = (stageFloorY - 34) + ((portalY - 17) - (stageFloorY - 34)) * easeIn - Math.sin(t * Math.PI) * 30;
            daveRot = -t * Math.PI * 4.5;
            daveScale = Math.max(0.03, 1 - Math.pow(t, 2.1) * 0.97);

            // Ostrze Rdzeniowe (kij) wypada Dave'owi z ręki, koziołkuje w powietrzu i zostaje na podłodze bazy!
            const dropT = Math.min(1, cutscenePhaseTick / 32);
            const stickX = (cx - 78) + dropT * 44;
            const stickY = dropT < 1
                ? (stageFloorY - 24) - Math.sin(dropT * Math.PI) * 42 + dropT * 19
                : stageFloorY - 5;
            const stickAngle = dropT < 1 ? (0.2 + dropT * Math.PI * 2.5) : 1.55;

            ctx.save();
            ctx.translate(stickX, stickY);
            ctx.rotate(stickAngle);
            ctx.fillStyle = '#78350f';
            ctx.fillRect(-22, -3.5, 36, 7);
            ctx.strokeStyle = '#451a03';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(-22, -3.5, 36, 7);
            ctx.fillStyle = '#facc15';
            ctx.fillRect(10, -5, 5, 10);
            ctx.fillStyle = '#22d3ee';
            ctx.fillRect(15, -7, 11, 14);
            ctx.restore();

            if (cutscenePhaseTick >= 30 && cutscenePhaseTick <= 45) {
                ctx.fillStyle = '#22d3ee';
                ctx.fillRect(stickX + 12, stageFloorY - 12, 4, 4);
                ctx.fillStyle = '#facc15';
                ctx.fillRect(stickX - 8, stageFloorY - 10, 4, 4);
            }
        }

        // Rysowanie Dave'a
        ctx.save();
        ctx.translate(daveX + 17, daveY + 17);
        ctx.rotate(daveRot);
        ctx.scale(daveScale, daveScale);
        ctx.fillStyle = '#9333ea';
        ctx.fillRect(-17, -17, 34, 34);
        ctx.strokeStyle = '#e9d5ff';
        ctx.lineWidth = 2;
        ctx.strokeRect(-17, -17, 34, 34);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(-5, -8, 7, 8);
        ctx.fillRect(6, -8, 7, 8);
        ctx.fillStyle = '#090d16';
        ctx.fillRect(-2, -6, 3.5, 4.5);
        ctx.fillRect(9, -6, 3.5, 4.5);

        // Zdeterminowane brwi Dave'a
        ctx.strokeStyle = '#3b0764';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(-7, -10); ctx.lineTo(1, -7);
        ctx.moveTo(14, -10); ctx.lineTo(6, -7);
        ctx.stroke();

        // W Fazie 0, 1 i 2 Dave trzyma swoje Ostrze Rdzeniowe
        if (phase < 3) {
            ctx.save();
            ctx.translate(16, 2);
            ctx.rotate(phase >= 1 ? -0.35 + Math.sin(tickCount * 0.2) * 0.08 : -0.15);
            ctx.fillStyle = '#78350f';
            ctx.fillRect(0, -3.5, 34, 7);
            ctx.fillStyle = '#facc15';
            ctx.fillRect(30, -5, 5, 10);
            ctx.fillStyle = '#22d3ee';
            ctx.fillRect(35, -7, 11, 14);
            ctx.restore();
        }
        ctx.restore();

        // 8. Boty Johna (Raygun-Dron oraz Jetpack-Bot) zlatujące się w Fazie 1 i wpychające Dave'a w portal w Fazie 3!
        if (phase >= 1) {
            const swoopIn = phase === 1 ? Math.min(1, cutscenePhaseTick / 22) : 1;
            const pushLeft = phase === 3 ? Math.min(96, cutscenePhaseTick * 1.9) : 0;

            const bots = [
                {
                    x: (cx - 12) - pushLeft,
                    y: (stageFloorY - 142) + swoopIn * 54 + Math.sin(tickCount * 0.18) * 5,
                    type: 'raygun'
                },
                {
                    x: (cx + 6) - pushLeft,
                    y: (stageFloorY - 122) + swoopIn * 84 + Math.cos(tickCount * 0.18) * 4,
                    type: 'jetpack'
                }
            ];

            for (const b of bots) {
                if (b.type === 'raygun') {
                    ctx.fillStyle = '#22d3ee';
                    ctx.fillRect(b.x + 6, b.y + 32, 20, 4);
                    ctx.fillStyle = '#1e1b4b';
                    ctx.fillRect(b.x, b.y, 32, 32);
                    ctx.strokeStyle = '#4ade80';
                    ctx.lineWidth = 2;
                    ctx.strokeRect(b.x, b.y, 32, 32);
                    ctx.fillStyle = '#4ade80';
                    ctx.fillRect(b.x + 4, b.y + 9, 14, 6);
                    ctx.fillStyle = '#334155';
                    ctx.fillRect(b.x - 12, b.y + 12, 12, 7);
                } else {
                    ctx.fillStyle = '#f97316';
                    ctx.fillRect(b.x + 32, b.y + 18, 7, 12);
                    ctx.fillStyle = '#0f172a';
                    ctx.fillRect(b.x, b.y, 32, 32);
                    ctx.strokeStyle = '#38bdf8';
                    ctx.lineWidth = 2;
                    ctx.strokeRect(b.x, b.y, 32, 32);
                    ctx.fillStyle = '#ef4444';
                    ctx.fillRect(b.x + 4, b.y + 9, 14, 6);
                }

                // Wiązki grawitacyjne wpychające Dave'a do portalu w Fazie 3
                if (phase === 3 && daveScale > 0.12) {
                    ctx.strokeStyle = b.type === 'raygun' ? 'rgba(74, 222, 128, 0.75)' : 'rgba(56, 189, 248, 0.75)';
                    ctx.lineWidth = 4.5;
                    ctx.beginPath();
                    ctx.moveTo(b.x - 10, b.y + 16);
                    ctx.lineTo(daveX + 24, daveY + 17);
                    ctx.stroke();
                }
            }
        }

        ctx.restore();
        return;
    }
}

function finishCutscene() {
    cutsceneOverlay.classList.add('hidden');
    if (document.activeElement && typeof document.activeElement.blur === 'function') {
        document.activeElement.blur();
    }
    const cb = cutsceneOnFinish;
    activeCutsceneKey = null;
    cutsceneOnFinish = null;
    if (cb) {
        cb();
    } else if (gameState === 'CUTSCENE') {
        gameState = 'PLAYING';
        inGameHud.classList.remove('hidden');
    }
    updateTouchControlsVisibility();
    syncMusicForState();
}

