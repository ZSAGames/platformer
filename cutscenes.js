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
    ],
    sahara_awakening: [
        {
            speaker: "DAVE",
            color: "#c084fc",
            portrait: "dave_dizzy",
            pitch: 295,
            scenePhase: 0,
            text: "* UGH... Moja głowa... Gdzie ja wylądowałem?! Wszędzie tylko palące słońce i gorący piasek... Czy ten portal Johna wyrzucił mnie na środku Sahary?!"
        },
        {
            speaker: "DAVE",
            color: "#c084fc",
            portrait: "dave",
            pitch: 315,
            scenePhase: 0,
            text: "* Moje Ostrze Rdzeniowe od Jerry'ego zostało na podłodze w bazie Johna, a wyrwa portalowa na niebie właśnie się zamknęła..."
        },
        {
            speaker: "DAVE",
            color: "#c084fc",
            portrait: "dave_surprised",
            pitch: 350,
            scenePhase: 1,
            text: "* Chwila... a co to błyszczy tuż obok mnie w wydmie?! Przecież to Raygun! Nie mam pojęcia skąd się tu wziął – musiał wypaść z wiru portalu razem ze mną!"
        },
        {
            speaker: "DAVE",
            color: "#c084fc",
            portrait: "dave_raygun",
            pitch: 335,
            scenePhase: 1,
            text: "* Bateria plazmowa jest pełna! Biorę go ze sobą – na tym pustkowiu przyda mi się każda broń, jeśli chcę przeżyć."
        },
        {
            speaker: "DAVE",
            color: "#c084fc",
            portrait: "dave_surprised",
            pitch: 365,
            scenePhase: 2,
            text: "* [ZIEMIA DRŻY!] Zaraz... co to za gigantyczne sylwetki w oddali na horyzoncie?! Przecież tam chodzą prawdziwe DINOZAURY! Gdzie ten portal mnie wysłał?!"
        },
        {
            speaker: "DAVE",
            color: "#c084fc",
            portrait: "dave_raygun",
            pitch: 345,
            scenePhase: 3,
            text: "* Nie mogę tu zostać ani chwili dłużej! Nawet jeśli nie wiem jeszcze jak stąd wrócić, muszę się pospieszyć, przebić przez Saharę z Raygunem i wydostać się stąd, żeby uratować Angelę!"
        }
    ],
    sahara_portal_escape: [
        {
            speaker: "DAVE",
            color: "#c084fc",
            portrait: "dave_dizzy",
            pitch: 350,
            scenePhase: 0,
            text: "* Uff... Przebiłem się przez cały kanion dinozaurów! Zaraz... O CO JA SIĘ WŁAŚNIE POTKNĄŁEM?! ŁAAA— [ŁUP PROSTO NA TWARZ!]"
        },
        {
            speaker: "DAVE",
            color: "#c084fc",
            portrait: "dave_dizzy",
            pitch: 290,
            scenePhase: 0,
            text: "* Ałć... moja twarz... Nawet na prehistorycznej pustyni pełnej T-Rexów musiałem wywinąć orła i zaryć nosem w piach..."
        },
        {
            speaker: "DAVE",
            color: "#c084fc",
            portrait: "dave_surprised",
            pitch: 360,
            scenePhase: 1,
            text: "* Czekaj... co tu wystaje z tej wydmy?! Przecież to ten CZERWONY PRZYCISK, który miał John! Musiał wypaść do portalu podczas spięcia w jego bazie!"
        },
        {
            speaker: "DAVE",
            color: "#c084fc",
            portrait: "dave_button",
            pitch: 340,
            scenePhase: 2,
            text: "* To jest moja szansa, żeby stąd uciec! Skoro John otworzył nim wyrwę wymiarową, to ja zrobię dokładnie to samo! Biorę go i klikam! [KLIK!]"
        },
        {
            speaker: "DAVE",
            color: "#c084fc",
            portrait: "dave_surprised",
            pitch: 370,
            scenePhase: 2,
            text: "* [WIR CZASOPRZESTRZENI!] Zadziałało!! Portal właśnie się otworzył, a stado dinozaurów z tyłu już tu biegnie!"
        },
        {
            speaker: "DAVE",
            color: "#c084fc",
            portrait: "dave_determined",
            pitch: 345,
            scenePhase: 3,
            text: "* Nie czekam ani sekundy! Zabieram Rayguna oraz czerwony przycisk i wskakuję w portal! Trzymaj się, Angela, nadchodzę!!"
        }
    ],
    mountain_cliff_arrival: [
        {
            speaker: "DAVE",
            color: "#c084fc",
            portrait: "dave_surprised",
            pitch: 360,
            scenePhase: 0,
            text: "* ŁOOO!! Portal otworzył się wysoko w górach i wyrzucił mnie z pełnym pędem na jakąś skalną półkę! Zaraz... przecież tu się kończy skała!!"
        },
        {
            speaker: "DAVE",
            color: "#c084fc",
            portrait: "dave_dizzy",
            pitch: 385,
            scenePhase: 1,
            text: "* AAA!! Urwisko!! Kamienie kruszą się pod moimi stopami... Jeszcze chwila i spadłbym w przepaść z samego szczytu góry!!"
        },
        {
            speaker: "DAVE",
            color: "#c084fc",
            portrait: "dave",
            pitch: 315,
            scenePhase: 1,
            text: "* [COFA SIĘ OD KRAWĘDZI] Uff... Mało brakowało! Dobrze, że w ostatniej sekundzie cofnąłem się od tej przepaści na stabilną skałę..."
        },
        {
            speaker: "DAVE",
            color: "#c084fc",
            portrait: "dave_surprised",
            pitch: 355,
            scenePhase: 2,
            text: "* [ROZGLĄDA SIĘ WOKÓŁ] Czekaj... gdzie ja właściwie wylądowałem? Spójrzmy w dół ponad chmurami... Przecież tam w oddali widać NASZ ZAMEK! Zamek mój i Angeli!"
        },
        {
            speaker: "DAVE",
            color: "#c084fc",
            portrait: "dave_determined",
            pitch: 340,
            scenePhase: 3,
            text: "* Czerwony przycisk Johna przeniósł mnie z powrotem na Cubelon, tylko na sam szczyt tych stromych gór! Muszę teraz jakoś zejść z tej góry i dostać się do naszego zamku!"
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

    if (type === 'dave' || type === 'dave_determined' || type === 'dave_dizzy' || type === 'dave_surprised' || type === 'dave_raygun' || type === 'dave_button') {
        pCtx.fillStyle = '#9333ea';
        pCtx.fillRect(14, 16, 44, 44);
        pCtx.strokeStyle = '#e9d5ff';
        pCtx.lineWidth = 2.5;
        pCtx.strokeRect(14, 16, 44, 44);

        if (type === 'dave_dizzy') {
            // Przymknięte oczy i gwiazdki nad głową po twardym lądowaniu na Saharze
            pCtx.fillStyle = '#ffffff';
            pCtx.fillRect(22, 32, 10, 6);
            pCtx.fillRect(40, 32, 10, 6);
            pCtx.fillStyle = '#090d16';
            pCtx.fillRect(25, 34, 4, 3);
            pCtx.fillRect(43, 34, 4, 3);
            pCtx.fillStyle = '#facc15';
            pCtx.fillRect(20, 8, 5, 5);
            pCtx.fillRect(35, 5, 6, 6);
            pCtx.fillRect(49, 9, 5, 5);
        } else if (type === 'dave_surprised') {
            // Szeroko otwarte oczy ze zdziwienia (Raygun / Dinozaury)
            pCtx.fillStyle = '#ffffff';
            pCtx.fillRect(21, 25, 12, 14);
            pCtx.fillRect(39, 25, 12, 14);
            pCtx.fillStyle = '#090d16';
            pCtx.fillRect(25, 30, 5, 5);
            pCtx.fillRect(43, 30, 5, 5);
            pCtx.fillStyle = '#ffffff';
            pCtx.fillRect(26, 31, 2, 2);
            pCtx.fillRect(44, 31, 2, 2);
        } else {
            pCtx.fillStyle = '#ffffff';
            pCtx.fillRect(22, 28, 10, 11);
            pCtx.fillRect(40, 28, 10, 11);
            pCtx.fillStyle = '#090d16';
            pCtx.fillRect(26, 31, 5, 6);
            pCtx.fillRect(44, 31, 5, 6);
        }

        if (type === 'dave_determined' || type === 'dave_raygun' || type === 'dave_button') {
            pCtx.strokeStyle = '#3b0764';
            pCtx.lineWidth = 3;
            pCtx.beginPath();
            pCtx.moveTo(20, 25);
            pCtx.lineTo(33, 29);
            pCtx.moveTo(52, 25);
            pCtx.lineTo(39, 29);
            pCtx.stroke();
        }

        if (type === 'dave_raygun') {
            // Miniaturowy Raygun w rogu portretu Dave'a
            pCtx.fillStyle = '#0f172a';
            pCtx.fillRect(42, 46, 22, 10);
            pCtx.strokeStyle = '#38bdf8';
            pCtx.lineWidth = 1.5;
            pCtx.strokeRect(42, 46, 22, 10);
            pCtx.fillStyle = '#4ade80';
            pCtx.fillRect(45, 48, 12, 6);
            pCtx.fillStyle = '#22d3ee';
            pCtx.fillRect(64, 48, 4, 6);
        } else if (type === 'dave_button') {
            // Czerwony Przycisk Johna w dłoni Dave'a
            pCtx.fillStyle = '#334155';
            pCtx.fillRect(44, 44, 20, 15);
            pCtx.strokeStyle = '#94a3b8';
            pCtx.lineWidth = 1.5;
            pCtx.strokeRect(44, 44, 20, 15);
            pCtx.fillStyle = '#ef4444';
            pCtx.fillRect(48, 38, 12, 6);
            pCtx.strokeStyle = '#fecaca';
            pCtx.lineWidth = 1;
            pCtx.strokeRect(48, 38, 12, 6);
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
    } else if (activeCutsceneKey === 'sahara_awakening') {
        if (slide.scenePhase === 0 && cutsceneIndex === 0) {
            if (screenShakeEnabled) screenShake = 16;
            sfx.play('boss_wall_crash');
        } else if (slide.scenePhase === 1 && cutsceneIndex === 2) {
            sfx.play('raygun_reload');
        } else if (slide.scenePhase === 1 && cutsceneIndex === 3) {
            sfx.play('player_raygun');
        } else if (slide.scenePhase === 2) {
            if (screenShakeEnabled) screenShake = 14;
            sfx.play('boss_charge_warn');
        } else if (slide.scenePhase === 3) {
            sfx.play('dash');
        }
    } else if (activeCutsceneKey === 'sahara_portal_escape') {
        if (slide.scenePhase === 0 && cutsceneIndex === 0) {
            if (screenShakeEnabled) screenShake = 18;
            sfx.play('boss_wall_crash');
            sfx.play('troll');
        } else if (slide.scenePhase === 1) {
            sfx.play('warn');
        } else if (slide.scenePhase === 2 && cutsceneIndex === 3) {
            sfx.play('ui_select');
            sfx.play('laser');
        } else if (slide.scenePhase === 2 && cutsceneIndex === 4) {
            if (screenShakeEnabled) screenShake = 20;
            sfx.play('boss_glitch');
        } else if (slide.scenePhase === 3) {
            sfx.play('dash');
            sfx.play('win');
        }
    } else if (activeCutsceneKey === 'mountain_cliff_arrival') {
        if (slide.scenePhase === 0 && cutsceneIndex === 0) {
            if (screenShakeEnabled) screenShake = 14;
            sfx.play('boss_glitch');
            sfx.play('jump');
        } else if (slide.scenePhase === 1 && cutsceneIndex === 1) {
            if (screenShakeEnabled) screenShake = 16;
            sfx.play('troll');
        } else if (slide.scenePhase === 1 && cutsceneIndex === 2) {
            sfx.play('walljump');
        } else if (slide.scenePhase === 2) {
            sfx.play('win');
        } else if (slide.scenePhase === 3) {
            sfx.play('dash');
        }
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

    // ========================================================================
    // 5. CUTSCENKA PRZEBUDZENIA NA SAHARZE (`sahara_awakening`)
    // Dave wypada z portalu na pustynię, znajduje Rayguna, widzi w oddali
    // prehistoryczne dinozaury i rusza pędem przez wydmy!
    // ========================================================================
    if (activeCutsceneKey === 'sahara_awakening') {
        ctx.save();

        // 1. Rozżarzone niebo Sahary (złoto-pomarańczowy gradient pustynny)
        const skyGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        skyGrad.addColorStop(0, '#7c2d12');
        skyGrad.addColorStop(0.45, '#ea580c');
        skyGrad.addColorStop(0.82, '#fbbf24');
        skyGrad.addColorStop(1, '#fef08a');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 2. Wielkie palące słońce Sahary z pulsującą poświatą
        const sunX = canvas.width - 155;
        const sunY = 108;
        const sunPulse = Math.sin(tickCount * 0.05) * 5;
        ctx.save();
        ctx.translate(sunX, sunY);
        ctx.globalAlpha = 0.18;
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(-72 - sunPulse, -72 - sunPulse, 144 + sunPulse * 2, 144 + sunPulse * 2);
        ctx.globalAlpha = 0.32;
        ctx.fillStyle = '#fde047';
        ctx.fillRect(-52 - sunPulse * 0.5, -52 - sunPulse * 0.5, 104 + sunPulse, 104 + sunPulse);
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#fffbeb';
        ctx.fillRect(-36, -36, 72, 72);
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 3;
        ctx.strokeRect(-36, -36, 72, 72);
        ctx.restore();

        // 3. Dalekie pasmo wulkanicznych gór stołowych (Mesas) i wielowarstwowe wydmy Sahary
        ctx.fillStyle = '#9a3412';
        ctx.beginPath();
        ctx.moveTo(0, 385);
        ctx.lineTo(70, 285);
        ctx.lineTo(175, 285);
        ctx.lineTo(225, 345);
        ctx.lineTo(440, 345);
        ctx.lineTo(490, 268);
        ctx.lineTo(635, 268);
        ctx.lineTo(695, 350);
        ctx.lineTo(canvas.width, 330);
        ctx.lineTo(canvas.width, 420);
        ctx.lineTo(0, 420);
        ctx.closePath();
        ctx.fill();

        // Dalekie wydmy (Horyzont, po którym chodzą dinozaury)
        ctx.fillStyle = '#b45309';
        ctx.beginPath();
        ctx.moveTo(0, 355);
        ctx.quadraticCurveTo(200, 308, 410, 342);
        ctx.quadraticCurveTo(610, 372, canvas.width, 326);
        ctx.lineTo(canvas.width, 430);
        ctx.lineTo(0, 430);
        ctx.closePath();
        ctx.fill();

        // 4. DINOZAURY W DYSTANSIE NA HORYZONCIE SAHARY!
        // W Fazie 0 i 1 widoczne jako tajemnicze sylwetki w mgiełce gorąca, a od Fazy 2 wyraźne i ożywione!
        const dinoVisibility = phase >= 2 ? 1.0 : 0.42;
        ctx.save();
        ctx.globalAlpha = dinoVisibility;

        // A) Olbrzymi Brachiozaur (Długoszyi Zauropod) kroczący powoli po grzbiecie dalekiej wydmy
        const brachioX = cx + 45 + Math.sin(tickCount * 0.015) * 18;
        const brachioY = 334;
        const neckSway = Math.sin(tickCount * 0.05) * 4;
        const legStep = Math.sin(tickCount * 0.12) * 3;
        const dinoCol = phase >= 2 ? '#451a03' : '#78350f';
        const dinoRim = phase >= 2 ? '#d97706' : '#9a3412';

        ctx.fillStyle = dinoCol;
        // Tułów Brachiozaura
        ctx.fillRect(brachioX, brachioY - 28, 46, 22);
        ctx.fillRect(brachioX + 6, brachioY - 34, 32, 8);
        // Cztery masywne nogi
        ctx.fillRect(brachioX + 4, brachioY - 8, 8, 14 + legStep);
        ctx.fillRect(brachioX + 15, brachioY - 8, 7, 14 - legStep);
        ctx.fillRect(brachioX + 27, brachioY - 8, 7, 14 + legStep);
        ctx.fillRect(brachioX + 37, brachioY - 8, 8, 14 - legStep);
        // Długa wygięta szyja i głowa sięgająca chmur
        ctx.beginPath();
        ctx.moveTo(brachioX + 8, brachioY - 26);
        ctx.lineTo(brachioX - 8 + neckSway, brachioY - 78);
        ctx.lineTo(brachioX + 2 + neckSway, brachioY - 78);
        ctx.lineTo(brachioX + 18, brachioY - 26);
        ctx.closePath();
        ctx.fill();
        // Głowa z grzebieniem
        ctx.fillRect(brachioX - 18 + neckSway, brachioY - 84, 20, 9);
        ctx.fillRect(brachioX - 10 + neckSway, brachioY - 88, 10, 4);
        // Długi ogon
        ctx.beginPath();
        ctx.moveTo(brachioX + 46, brachioY - 24);
        ctx.lineTo(brachioX + 82, brachioY - 10 + Math.cos(tickCount * 0.06) * 4);
        ctx.lineTo(brachioX + 46, brachioY - 14);
        ctx.closePath();
        ctx.fill();
        if (phase >= 2) {
            ctx.fillStyle = '#facc15';
            ctx.fillRect(brachioX - 13 + neckSway, brachioY - 82, 3, 3);
        }

        // B) Groźny T-Rex / Karnozaur na prawej wydmie (w Fazie 2 otwiera paszczę i ryczy!)
        const trexX = cx + 195;
        const trexY = 330;
        const trexBob = Math.abs(Math.sin(tickCount * 0.18)) * 3;
        const jawOpen = (phase >= 2) ? (4 + Math.abs(Math.sin(tickCount * 0.25)) * 6) : 1;

        ctx.fillStyle = dinoCol;
        // Ogon T-Rexa
        ctx.beginPath();
        ctx.moveTo(trexX + 16, trexY - 24 - trexBob);
        ctx.lineTo(trexX + 58, trexY - 32 - trexBob);
        ctx.lineTo(trexX + 18, trexY - 12 - trexBob);
        ctx.closePath();
        ctx.fill();
        // Masywne uda i nogi
        ctx.fillRect(trexX + 2, trexY - 14, 10, 18);
        ctx.fillRect(trexX + 14, trexY - 14, 9, 18);
        // Tułów i kark
        ctx.fillRect(trexX - 6, trexY - 34 - trexBob, 28, 22);
        ctx.fillRect(trexX - 14, trexY - 46 - trexBob, 20, 16);
        // Krótkie łapki
        ctx.fillRect(trexX - 12, trexY - 26 - trexBob, 7, 4);
        // Wielka szczęka górna i dolna (otwierana przy ryku)
        ctx.fillRect(trexX - 32, trexY - 54 - trexBob, 28, 11);
        ctx.fillRect(trexX - 28, trexY - 43 - trexBob + jawOpen * 0.6, 22, 6);

        if (phase >= 2) {
            // Świecące oko T-Rexa, białe kły i fale dźwiękowe ryku!
            ctx.fillStyle = '#ef4444';
            ctx.fillRect(trexX - 16, trexY - 51 - trexBob, 4, 4);
            ctx.fillStyle = '#ffffff';
            for (let t = 0; t < 4; t++) {
                ctx.fillRect(trexX - 30 + t * 5, trexY - 43 - trexBob, 2.5, 3);
            }
            ctx.strokeStyle = 'rgba(254, 240, 138, 0.65)';
            ctx.lineWidth = 2;
            for (let r = 1; r <= 3; r++) {
                const rad = ((tickCount * 1.4 + r * 12) % 38);
                ctx.beginPath();
                ctx.arc(trexX - 32, trexY - 46 - trexBob, rad, Math.PI * 0.65, Math.PI * 1.35);
                ctx.stroke();
            }
        }

        // C) Latający Pterodaktyl szybujący na tle pustynnego słońca
        const pteroX = ((canvas.width + 120) - ((tickCount * 1.35) % (canvas.width + 240)));
        const pteroY = 122 + Math.sin(tickCount * 0.08) * 14;
        const wingFlap = Math.sin(tickCount * 0.22) * 12;
        ctx.fillStyle = dinoCol;
        ctx.fillRect(pteroX - 8, pteroY - 3, 18, 6);
        // Dziób i grzebień na głowie
        ctx.beginPath();
        ctx.moveTo(pteroX - 8, pteroY);
        ctx.lineTo(pteroX - 22, pteroY + 2);
        ctx.lineTo(pteroX - 8, pteroY - 4);
        ctx.lineTo(pteroX + 4, pteroY - 9);
        ctx.closePath();
        ctx.fill();
        // Skrzydła
        ctx.beginPath();
        ctx.moveTo(pteroX, pteroY);
        ctx.lineTo(pteroX - 6, pteroY - 14 + wingFlap);
        ctx.lineTo(pteroX + 12, pteroY);
        ctx.lineTo(pteroX + 4, pteroY + 12 - wingFlap * 0.7);
        ctx.closePath();
        ctx.fill();

        ctx.restore();

        // 5. Środkowe pasmo złotych wydm
        ctx.fillStyle = '#d97706';
        ctx.beginPath();
        ctx.moveTo(0, 372);
        ctx.quadraticCurveTo(160, 338, 350, 366);
        ctx.quadraticCurveTo(560, 394, canvas.width, 352);
        ctx.lineTo(canvas.width, 440);
        ctx.lineTo(0, 440);
        ctx.closePath();
        ctx.fill();

        // Kaktusy Saguaro i pustynne skały na drugim planie
        const cactiPos = [cx - 260, cx + 95, cx + 305];
        cactiPos.forEach((kx, idx) => {
            const ky = idx === 1 ? 356 : 362;
            ctx.fillStyle = '#15803d';
            ctx.fillRect(kx, ky - 42, 10, 44);
            ctx.fillRect(kx - 10, ky - 28, 10, 6);
            ctx.fillRect(kx - 10, ky - 38, 6, 14);
            ctx.fillRect(kx + 10, ky - 22, 10, 6);
            ctx.fillRect(kx + 14, ky - 34, 6, 16);
            ctx.fillStyle = '#22c55e';
            ctx.fillRect(kx + 2, ky - 40, 3, 40);
        });

        // 6. Pierwszy plan: Piaszczysta podstawa Sahary, na której ląduje Dave
        drawSolidBlock(0, stageFloorY, canvas.width, 215, 'underwater_sand', false, false);

        // Lej w piasku po upadku Dave'a z portalu
        const craterX = cx - 140;
        ctx.fillStyle = '#a16207';
        ctx.fillRect(craterX - 28, stageFloorY - 3, 88, 10);
        ctx.fillStyle = '#fde047';
        ctx.fillRect(craterX - 34, stageFloorY - 6, 14, 6);
        ctx.fillRect(craterX + 50, stageFloorY - 6, 16, 6);

        // 7. WYRWA PORTALOWA WYSOKO NA NIEBIE (Otwarta w Fazie 0, zamyka się w Fazie 1)
        const skyPortalX = cx - 185;
        const skyPortalY = 92;
        let portalScale = 0;
        if (phase === 0) {
            portalScale = cutsceneIndex === 0 ? 1 : Math.max(0.18, 1 - cutscenePhaseTick * 0.015);
        } else if (phase === 1 && cutsceneIndex === 2 && cutscenePhaseTick < 20) {
            portalScale = Math.max(0, 0.25 * (1 - cutscenePhaseTick / 20));
        }

        if (portalScale > 0.02) {
            ctx.save();
            ctx.translate(skyPortalX, skyPortalY);
            ctx.scale(portalScale, portalScale * 0.65);

            ctx.globalAlpha = 0.3;
            ctx.fillStyle = '#a855f7';
            ctx.fillRect(-68, -68, 136, 136);
            ctx.globalAlpha = 1;

            const ringCols = ['#7e22ce', '#ec4899', '#38bdf8', '#facc15', '#ffffff'];
            for (let r = 54, idx = 0; r >= 12; r -= 11, idx++) {
                ctx.save();
                ctx.rotate((tickCount * 0.1 + idx * 0.5) * (idx % 2 === 0 ? 1 : -1));
                ctx.fillStyle = ringCols[idx % ringCols.length];
                ctx.fillRect(-r, -r, r * 2, r * 2);
                ctx.strokeStyle = '#090d16';
                ctx.lineWidth = 2;
                ctx.strokeRect(-r, -r, r * 2, r * 2);
                ctx.restore();
            }
            ctx.restore();
        }

        // 8. POZYCJA I ANIMACJA DAVE'A ORAZ RAYGUNA W KAŻDEJ FAZIE
        let daveX = craterX;
        let daveY = stageFloorY - 34;
        let daveRot = 0;
        let isDizzy = false;
        let hasPickedRaygun = false;

        let gunX = cx - 32;
        let gunY = stageFloorY - 9;
        let gunRot = -0.28;

        if (phase === 0) {
            if (cutsceneIndex === 0 && cutscenePhaseTick < 26) {
                // Dave i Raygun wypadają z portalu na niebie i uderzają w piasek!
                const fallT = cutscenePhaseTick / 26;
                daveX = skyPortalX + (craterX - skyPortalX) * fallT;
                daveY = skyPortalY + ((stageFloorY - 28) - skyPortalY) * (fallT * fallT);
                daveRot = fallT * Math.PI * 3.2;

                const gunT = Math.max(0, Math.min(1, (cutscenePhaseTick - 4) / 22));
                gunX = skyPortalX + ((cx - 32) - skyPortalX) * gunT;
                gunY = skyPortalY + ((stageFloorY - 9) - skyPortalY) * (gunT * gunT);
                gunRot = gunT * Math.PI * 4 - 0.28;

                // Rozbryzg piasku przy uderzeniu
                if (cutscenePhaseTick >= 22) {
                    ctx.fillStyle = '#fde047';
                    for (let sp = 0; sp < 8; sp++) {
                        const ang = -Math.PI * 0.15 - (sp / 7) * Math.PI * 0.7;
                        const dist = (cutscenePhaseTick - 21) * 7;
                        ctx.fillRect(craterX + 17 + Math.cos(ang) * dist, stageFloorY - 8 + Math.sin(ang) * dist, 6, 6);
                    }
                }
            } else {
                isDizzy = (cutsceneIndex === 0);
                daveX = craterX;
                daveY = isDizzy ? (stageFloorY - 30) : (stageFloorY - 34 - Math.abs(Math.sin(tickCount * 0.08)) * 2);
                daveRot = isDizzy ? -0.18 : 0;
            }
        } else if (phase === 1) {
            if (cutsceneIndex === 2) {
                // Dave podchodzi do błyszczącego w piasku Rayguna
                const walkT = Math.min(1, cutscenePhaseTick / 28);
                daveX = craterX + ((cx - 72) - craterX) * walkT;
                const walkBob = walkT < 1 ? Math.abs(Math.sin(cutscenePhaseTick * 0.35)) * 5 : 0;
                daveY = stageFloorY - 34 - walkBob;
            } else {
                // Dave podnosi Rayguna i ogląda go w dłoni
                daveX = cx - 64;
                daveY = stageFloorY - 34 - Math.abs(Math.sin(tickCount * 0.1)) * 2.5;
                hasPickedRaygun = true;
            }
        } else if (phase === 2) {
            // Dave patrzy w stronę dinozaurów na horyzoncie, trzymając Rayguna w pogotowiu
            daveX = cx - 64;
            daveY = stageFloorY - 34 - Math.abs(Math.sin(tickCount * 0.16)) * 3;
            hasPickedRaygun = true;
        } else if (phase === 3) {
            // Dave pędzi z Raygunem w prawo przez Saharę, zostawiając smugi Dasha i tumany piasku!
            hasPickedRaygun = true;
            const runT = Math.min(1, cutscenePhaseTick / 70);
            daveX = (cx - 64) + runT * 430;
            const runBob = Math.abs(Math.sin(cutscenePhaseTick * 0.45)) * 7;
            daveY = stageFloorY - 34 - runBob;
            daveRot = 0.08;

            // Smugi po-obrazowe i wyrzucany piasek spod stóp Dave'a
            for (let g = 1; g <= 3; g++) {
                ctx.globalAlpha = 0.32 - g * 0.08;
                ctx.fillStyle = '#22d3ee';
                ctx.fillRect(daveX - g * 18, daveY + g * 1.5, 34, 34);
            }
            ctx.globalAlpha = 1;
            ctx.fillStyle = '#fde047';
            for (let d = 0; d < 5; d++) {
                const dx = daveX - 10 - ((cutscenePhaseTick * 4 + d * 14) % 45);
                const dy = stageFloorY - 4 - ((cutscenePhaseTick + d * 7) % 16);
                ctx.fillRect(dx, dy, 5, 5);
            }
        }

        // Rysowanie Rayguna leżącego w piasku (zanim Dave go podniesie)
        if (!hasPickedRaygun) {
            ctx.save();
            ctx.translate(gunX, gunY);
            ctx.rotate(gunRot);

            // Zielona poświata tajemniczego Rayguna w piasku
            const glowR = 14 + Math.sin(tickCount * 0.15) * 4;
            ctx.globalAlpha = 0.28;
            ctx.fillStyle = '#4ade80';
            ctx.beginPath();
            ctx.arc(4, -2, glowR, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;

            ctx.fillStyle = '#1e293b';
            ctx.fillRect(-6, 2, 7, 9);
            ctx.fillStyle = '#0f172a';
            ctx.fillRect(-10, -6, 22, 11);
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 1.8;
            ctx.strokeRect(-10, -6, 22, 11);
            ctx.fillStyle = '#4ade80';
            ctx.fillRect(-7, -3.5, 14, 6);
            ctx.fillStyle = '#22d3ee';
            ctx.fillRect(12, -4.5, 5, 8);
            ctx.restore();

            if (tickCount % 16 < 8) {
                ctx.fillStyle = '#fef08a';
                ctx.fillRect(gunX - 4, gunY - 16 - (tickCount % 8), 4, 4);
                ctx.fillRect(gunX + 12, gunY - 12 - ((tickCount + 4) % 8), 3, 3);
            }
        }

        // Rysowanie Dave'a
        ctx.save();
        ctx.translate(daveX + 17, daveY + 17);
        ctx.rotate(daveRot);
        ctx.fillStyle = '#9333ea';
        ctx.fillRect(-17, -17, 34, 34);
        ctx.strokeStyle = (phase === 3) ? '#67e8f9' : '#e9d5ff';
        ctx.lineWidth = 2;
        ctx.strokeRect(-17, -17, 34, 34);

        if (isDizzy) {
            // Przymknięte oczy i kręcące się gwiazdki po upadku z portalu
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(-8, -4, 8, 5);
            ctx.fillRect(4, -4, 8, 5);
            ctx.fillStyle = '#090d16';
            ctx.fillRect(-5, -3, 4, 3);
            ctx.fillRect(7, -3, 4, 3);

            for (let st = 0; st < 3; st++) {
                const ang = tickCount * 0.12 + st * ((Math.PI * 2) / 3);
                const sx = Math.cos(ang) * 16;
                const sy = -24 + Math.sin(ang) * 5;
                ctx.fillStyle = (st % 2 === 0) ? '#facc15' : '#38bdf8';
                ctx.fillRect(sx - 2.5, sy - 2.5, 5, 5);
            }
        } else {
            const isShocked = (phase === 1 && cutsceneIndex === 2) || (phase === 2);
            const eyeH = isShocked ? 10 : 8;
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(-6, -8, 7, eyeH);
            ctx.fillRect(6, -8, 7, eyeH);
            ctx.fillStyle = '#090d16';
            ctx.fillRect(-3, -6, 3.5, 4.5);
            ctx.fillRect(9, -6, 3.5, 4.5);

            if (phase === 3 || (phase === 1 && cutsceneIndex === 3)) {
                ctx.strokeStyle = '#3b0764';
                ctx.lineWidth = 2.5;
                ctx.beginPath();
                ctx.moveTo(-7, -10); ctx.lineTo(1, -7);
                ctx.moveTo(14, -10); ctx.lineTo(6, -7);
                ctx.stroke();
            }
        }

        // Jeśli Dave podniósł już Rayguna, trzyma go w dłoni!
        if (hasPickedRaygun) {
            ctx.save();
            const aimAngle = (phase === 2) ? -0.22 : (phase === 3 ? -0.05 : -0.15 + Math.sin(tickCount * 0.15) * 0.1);
            ctx.translate(12, 2);
            ctx.rotate(aimAngle);

            // Celownik laserowy Rayguna
            ctx.strokeStyle = 'rgba(74, 222, 128, 0.45)';
            ctx.lineWidth = 1.5;
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            ctx.moveTo(28, 0);
            ctx.lineTo(95, 0);
            ctx.stroke();
            ctx.setLineDash([]);

            ctx.fillStyle = '#1e293b';
            ctx.fillRect(2, 2, 7, 9);
            ctx.fillStyle = '#0f172a';
            ctx.fillRect(0, -6, 22, 11);
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 1.8;
            ctx.strokeRect(0, -6, 22, 11);
            ctx.fillStyle = '#4ade80';
            ctx.fillRect(3, -3.5, 14, 6);
            ctx.fillStyle = '#22d3ee';
            ctx.fillRect(22, -4.5, 5, 8);
            ctx.restore();
        }
        ctx.restore();

        // 9. Drobinki gorącego piasku niesione wiatrem przez ekran Sahary
        ctx.fillStyle = 'rgba(254, 240, 138, 0.55)';
        for (let m = 0; m < 14; m++) {
            const mx = ((m * 97 - tickCount * (2.2 + (m % 3) * 0.6)) % canvas.width + canvas.width) % canvas.width;
            const my = 70 + ((m * 53) % 310) + Math.sin(tickCount * 0.08 + m) * 6;
            ctx.fillRect(mx, my, 4, 2);
        }

        ctx.restore();
        return;
    }


    // ========================================================================
    // 6. CUTSCENKA FINAŁOWA ROZDZIAŁU 3 (`sahara_portal_escape`)
    // Dave biegnie przez Saharę, potyka się o wystający z piasku Czerwony
    // Przycisk Johna i pada na twarz, po czym wstaje, klika przycisk,
    // otwiera portal i wskakuje w niego!
    // ========================================================================
    if (activeCutsceneKey === 'sahara_portal_escape') {
        ctx.save();

        // 1. Rozżarzone niebo Sahary i wielkie słońce
        const skyGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        skyGrad.addColorStop(0, '#7c2d12');
        skyGrad.addColorStop(0.45, '#ea580c');
        skyGrad.addColorStop(0.82, '#fbbf24');
        skyGrad.addColorStop(1, '#fef08a');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const sunX = canvas.width - 155;
        const sunY = 104;
        const sunPulse = Math.sin(tickCount * 0.05) * 5;
        ctx.save();
        ctx.translate(sunX, sunY);
        ctx.globalAlpha = 0.18;
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(-68 - sunPulse, -68 - sunPulse, 136 + sunPulse * 2, 136 + sunPulse * 2);
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#fffbeb';
        ctx.fillRect(-34, -34, 68, 68);
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 3;
        ctx.strokeRect(-34, -34, 68, 68);
        ctx.restore();

        // 2. Góry stołowe i dalekie wydmy z sylwetkami goniących dinozaurów
        ctx.fillStyle = '#9a3412';
        ctx.beginPath();
        ctx.moveTo(0, 385);
        ctx.lineTo(65, 285);
        ctx.lineTo(185, 285);
        ctx.lineTo(240, 350);
        ctx.lineTo(460, 350);
        ctx.lineTo(515, 275);
        ctx.lineTo(650, 275);
        ctx.lineTo(710, 355);
        ctx.lineTo(canvas.width, 335);
        ctx.lineTo(canvas.width, 420);
        ctx.lineTo(0, 420);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#d97706';
        ctx.beginPath();
        ctx.moveTo(0, 372);
        ctx.quadraticCurveTo(180, 332, 380, 365);
        ctx.quadraticCurveTo(580, 392, canvas.width, 348);
        ctx.lineTo(canvas.width, 440);
        ctx.lineTo(0, 440);
        ctx.closePath();
        ctx.fill();

        // Sylwetki goniących kwadratowych Dinozaurów z lewej strony na wydmie
        const chaseShift = (phase >= 2) ? Math.min(48, cutscenePhaseTick * 0.5) : 0;
        const rexBgX = 68 + chaseShift;
        const rexBgY = 344 - Math.abs(Math.sin(tickCount * 0.2)) * 3;
        ctx.fillStyle = '#451a03';
        ctx.fillRect(rexBgX, rexBgY - 36, 36, 36);
        ctx.strokeStyle = '#f97316';
        ctx.lineWidth = 2;
        ctx.strokeRect(rexBgX, rexBgY - 36, 36, 36);
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(rexBgX + 22, rexBgY - 28, 7, 6);

        const rapBgX = 118 + chaseShift * 1.2;
        const rapBgY = 348 - Math.abs(Math.sin(tickCount * 0.32 + 1)) * 5;
        ctx.fillStyle = '#14532d';
        ctx.fillRect(rapBgX, rapBgY - 24, 24, 24);
        ctx.strokeStyle = '#4ade80';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(rapBgX, rapBgY - 24, 24, 24);
        ctx.fillStyle = '#facc15';
        ctx.fillRect(rapBgX + 15, rapBgY - 18, 5, 5);

        // Kaktusy na drugim planie
        [cx - 250, cx + 260].forEach((kx) => {
            ctx.fillStyle = '#15803d';
            ctx.fillRect(kx, 320, 10, 44);
            ctx.fillRect(kx - 10, 334, 10, 6);
            ctx.fillRect(kx - 10, 324, 6, 14);
            ctx.fillRect(kx + 10, 340, 10, 6);
            ctx.fillRect(kx + 14, 328, 6, 16);
        });

        // 3. Pierwszy plan: Piaszczysta ziemia Sahary
        drawSolidBlock(0, stageFloorY, canvas.width, 215, 'sahara', false, false);

        // Kopczyk piasku, o który potyka się Dave
        const moundX = cx - 45;
        ctx.fillStyle = '#d97706';
        ctx.beginPath();
        ctx.moveTo(moundX - 24, stageFloorY);
        ctx.quadraticCurveTo(moundX, stageFloorY - 14, moundX + 28, stageFloorY);
        ctx.closePath();
        ctx.fill();

        // 4. MIĘDZYWYMIAROWY PORTAL POWROTNY (Otwiera się w Fazie 2 po kliknięciu przycisku!)
        const portalX = cx + 175;
        const portalY = stageFloorY - 64;
        const showPortal = (phase === 2 && cutsceneIndex >= 4) || (phase === 3);
        let portalScale = 0;
        if (showPortal) {
            portalScale = (phase === 2) ? Math.min(1, cutscenePhaseTick / 18) : 1;
        } else if (phase === 2 && cutsceneIndex === 3 && cutscenePhaseTick > 22) {
            portalScale = Math.min(0.65, (cutscenePhaseTick - 22) / 25);
        }

        if (portalScale > 0.02) {
            ctx.save();
            ctx.translate(portalX, portalY);
            ctx.scale(portalScale, portalScale);

            ctx.globalAlpha = 0.3;
            ctx.fillStyle = '#a855f7';
            ctx.fillRect(-74, -74, 148, 148);
            ctx.globalAlpha = 1;

            const ringColors = ['#7e22ce', '#ec4899', '#38bdf8', '#facc15', '#ffffff'];
            for (let r = 58, idx = 0; r >= 12; r -= 11, idx++) {
                ctx.save();
                ctx.rotate((tickCount * 0.1 + idx * 0.5) * (idx % 2 === 0 ? 1 : -1));
                ctx.fillStyle = ringColors[idx % ringColors.length];
                ctx.fillRect(-r, -r, r * 2, r * 2);
                ctx.strokeStyle = '#090d16';
                ctx.lineWidth = 2;
                ctx.strokeRect(-r, -r, r * 2, r * 2);
                ctx.restore();
            }

            // Pioruny energetyczne wokół portalu
            ctx.strokeStyle = (tickCount % 4 < 2) ? '#22d3ee' : '#f472b6';
            ctx.lineWidth = 2.5;
            for (let a = 0; a < 4; a++) {
                const ang = tickCount * 0.16 + a * (Math.PI / 2);
                ctx.beginPath();
                ctx.moveTo(Math.cos(ang) * 44, Math.sin(ang) * 44);
                ctx.lineTo(Math.cos(ang + 0.22) * 70, Math.sin(ang + 0.22) * 70);
                ctx.stroke();
            }
            ctx.restore();
        }

        // 5. CZERWONY PRZYCISK JOHNA (Wystaje z piasku w Fazie 0 i 1, w ręku Dave'a w Fazie 2 i 3)
        if (phase < 2) {
            ctx.save();
            ctx.translate(moundX + 2, stageFloorY - 6);
            ctx.rotate(-0.25);

            // Pulsowanie czerwonego przycisku w piasku
            if (phase === 1 || (tickCount % 16 < 8)) {
                ctx.globalAlpha = 0.32;
                ctx.fillStyle = '#ef4444';
                ctx.beginPath();
                ctx.arc(0, -4, 15 + Math.sin(tickCount * 0.18) * 4, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1;
            }

            ctx.fillStyle = '#334155';
            ctx.fillRect(-11, -6, 22, 14);
            ctx.strokeStyle = '#94a3b8';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(-11, -6, 22, 14);

            ctx.fillStyle = (tickCount % 8 < 4) ? '#ef4444' : '#dc2626';
            ctx.fillRect(-7, -12, 14, 6);
            ctx.strokeStyle = '#fecaca';
            ctx.lineWidth = 1;
            ctx.strokeRect(-7, -12, 14, 6);
            ctx.restore();
        }

        // 6. ANIMACJA DAVE'A: BIEG -> POTKNIĘCIE I UPADEK NA TWARZ -> WSTANIE -> KLIKNIĘCIE -> SKOK W PORTAL!
        let daveX = cx - 22;
        let daveY = stageFloorY - 34;
        let daveRot = 0;
        let daveScaleX = 1;
        let daveScaleY = 1;
        let isFaceplanted = false;

        if (phase === 0) {
            if (cutsceneIndex === 0 && cutscenePhaseTick < 18) {
                // Dave biegnie z lewej strony i zahacza o wystający z piasku przycisk
                const runT = cutscenePhaseTick / 18;
                daveX = (moundX - 115) + 110 * runT;
                daveY = stageFloorY - 34 - Math.abs(Math.sin(cutscenePhaseTick * 0.5)) * 7;
                daveRot = 0.12;
            } else if (cutsceneIndex === 0 && cutscenePhaseTick < 32) {
                // Dave potyka się w locie i leci prosto na twarz w piasek!
                const tripT = (cutscenePhaseTick - 18) / 14;
                daveX = (moundX - 5) + tripT * 52;
                daveY = (stageFloorY - 34) - Math.sin(tripT * Math.PI) * 34 + tripT * 6;
                daveRot = tripT * (Math.PI * 0.5);

                if (cutscenePhaseTick >= 29) {
                    // Rozbryzg piasku przy uderzeniu twarzą w wydmę!
                    ctx.fillStyle = '#fde047';
                    for (let sp = 0; sp < 8; sp++) {
                        const ang = -Math.PI * 0.15 - (sp / 7) * Math.PI * 0.7;
                        const dist = (cutscenePhaseTick - 28) * 9;
                        ctx.fillRect(daveX + 20 + Math.cos(ang) * dist, stageFloorY - 4 + Math.sin(ang) * dist, 6, 6);
                    }
                }
            } else {
                // Dave leży plackiem na twarzy w piasku, lekko spłaszczony, z gwiazdkami nad głową!
                daveX = moundX + 47;
                daveY = stageFloorY - 27;
                daveRot = Math.PI * 0.5;
                daveScaleX = 0.86;
                daveScaleY = 1.16;
                isFaceplanted = true;
            }
        } else if (phase === 1) {
            // Dave wstaje z piasku, otrzepuje się i patrzy w dół na Czerwony Przycisk Johna
            const standT = Math.min(1, cutscenePhaseTick / 16);
            daveX = (moundX + 47) - standT * 16;
            daveY = stageFloorY - 34 - (standT < 1 ? Math.sin(standT * Math.PI) * 10 : Math.abs(Math.sin(tickCount * 0.1)) * 2);
            daveRot = (1 - standT) * (Math.PI * 0.5);
        } else if (phase === 2) {
            // Dave trzyma w ręku Czerwony Przycisk Johna i wciska go!
            daveX = moundX + 18;
            daveY = stageFloorY - 34 - Math.abs(Math.sin(tickCount * 0.16)) * 3;
        } else if (phase === 3) {
            // Dave wskakuje z impetem w otwarty portal powrotny!
            const jumpT = Math.min(1, cutscenePhaseTick / 56);
            const easeJump = jumpT * jumpT * (3 - 2 * jumpT);
            const startX = moundX + 18;
            daveX = startX + ((portalX - 17) - startX) * easeJump;
            daveY = (stageFloorY - 34) + ((portalY - 17) - (stageFloorY - 34)) * easeJump - Math.sin(jumpT * Math.PI) * 58;
            daveRot = jumpT * Math.PI * 4;
            const shrink = Math.max(0.04, 1 - Math.pow(jumpT, 2.2) * 0.96);
            daveScaleX = shrink;
            daveScaleY = shrink;

            // Smugi Dasha za wskakującym w portal Dave'em
            if (jumpT < 0.85) {
                for (let g = 1; g <= 3; g++) {
                    ctx.globalAlpha = 0.3 - g * 0.08;
                    ctx.fillStyle = '#22d3ee';
                    ctx.fillRect(daveX - g * 14, daveY + g * 4, 34 * shrink, 34 * shrink);
                }
                ctx.globalAlpha = 1;
            }
        }

        // Rysowanie Dave'a
        ctx.save();
        ctx.translate(daveX + 17, daveY + 17);
        ctx.rotate(daveRot);
        ctx.scale(daveScaleX, daveScaleY);

        ctx.fillStyle = '#9333ea';
        ctx.fillRect(-17, -17, 34, 34);
        ctx.strokeStyle = (phase === 3) ? '#67e8f9' : '#e9d5ff';
        ctx.lineWidth = 2;
        ctx.strokeRect(-17, -17, 34, 34);

        if (isFaceplanted || (phase === 0)) {
            // Oszołomione oczy Dave'a podczas potknięcia i leżenia na twarzy
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(-4, -8, 6, 6);
            ctx.fillRect(6, -8, 6, 6);
            ctx.fillStyle = '#090d16';
            ctx.fillRect(-2, -6, 3, 3);
            ctx.fillRect(8, -6, 3, 3);
        } else {
            // Oczy Dave'a (w Fazie 1 patrzy w lewo-dół na przycisk, w Fazie 2 i 3 w prawo na portal)
            const lookX = (phase === 1) ? -5 : 4;
            const lookY = (phase === 1) ? 3 : -1;
            const eyeH = (phase === 1 || (phase === 2 && cutsceneIndex === 4)) ? 10 : 8;
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(-9 + lookX * 0.5, -8 + lookY * 0.4, 7, eyeH);
            ctx.fillRect(3 + lookX * 0.5, -8 + lookY * 0.4, 7, eyeH);
            ctx.fillStyle = '#090d16';
            ctx.fillRect(-7 + lookX, -6 + lookY, 3.5, 4.5);
            ctx.fillRect(5 + lookX, -6 + lookY, 3.5, 4.5);

            if (phase >= 2) {
                ctx.strokeStyle = '#3b0764';
                ctx.lineWidth = 2.5;
                ctx.beginPath();
                ctx.moveTo(-8, -10); ctx.lineTo(0, -7);
                ctx.moveTo(14, -10); ctx.lineTo(6, -7);
                ctx.stroke();
            }
        }

        // W Fazie 2 i 3 Dave trzyma Czerwony Przycisk Johna i klika w niego!
        if (phase >= 2) {
            const remX = 16;
            const remY = -4;
            const waveR = 10 + ((cutscenePhaseTick * 3.0) % 34);

            ctx.strokeStyle = 'rgba(239, 68, 68, 0.85)';
            ctx.lineWidth = 2;
            ctx.strokeRect(remX + 10 - waveR / 2, remY - waveR / 2, waveR, waveR);

            ctx.fillStyle = '#334155';
            ctx.fillRect(remX, remY, 20, 14);
            ctx.strokeStyle = '#94a3b8';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(remX, remY, 20, 14);

            const pressDepth = (cutscenePhaseTick > 10 || cutsceneIndex >= 4 || phase === 3) ? 3 : 0;
            ctx.fillStyle = (tickCount % 6 < 3) ? '#ef4444' : '#dc2626';
            ctx.fillRect(remX + 4, remY - 6 + pressDepth, 12, 6 - pressDepth * 0.5);
        }
        ctx.restore();

        // Gwiazdki oszołomienia i kupka piasku przy nosie, gdy Dave leży na twarzy
        if (isFaceplanted) {
            ctx.fillStyle = '#facc15';
            ctx.fillRect(daveX + 26, stageFloorY - 6, 14, 6);
            for (let st = 0; st < 3; st++) {
                const ang = tickCount * 0.14 + st * ((Math.PI * 2) / 3);
                const sx = daveX + 17 + Math.cos(ang) * 18;
                const sy = daveY - 8 + Math.sin(ang) * 5;
                ctx.fillStyle = (st % 2 === 0) ? '#fde047' : '#38bdf8';
                ctx.fillRect(sx - 2.5, sy - 2.5, 5, 5);
            }
        }

        ctx.restore();
        return;
    }


    // ========================================================================
    // 7. CUTSCENKA WYSKOKU Z PORTALU W GÓRACH (`mountain_cliff_arrival`)
    // Portal otwiera się nad górskim urwiskiem, Dave wyskakuje z niego,
    // niemal spada w przepaść, cofa się od krawędzi, rozgląda się, widzi
    // w oddali Zamek Dave'a i Angeli i rusza w dół górskiego szlaku!
    // ========================================================================
    if (activeCutsceneKey === 'mountain_cliff_arrival') {
        ctx.save();

        // 1. Wysokogórskie niebo (chłodny błękit alpejski przechodzący w złotą mgiełkę nad doliną)
        const skyGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        skyGrad.addColorStop(0, '#0f172a');
        skyGrad.addColorStop(0.38, '#0284c7');
        skyGrad.addColorStop(0.75, '#7dd3fc');
        skyGrad.addColorStop(1, '#e0f2fe');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Słońce wysoko nad doliną
        const sunX = canvas.width - 135;
        const sunY = 88;
        const sunPulse = Math.sin(tickCount * 0.05) * 4;
        ctx.save();
        ctx.translate(sunX, sunY);
        ctx.globalAlpha = 0.16;
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(-58 - sunPulse, -58 - sunPulse, 116 + sunPulse * 2, 116 + sunPulse * 2);
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#fde047';
        ctx.fillRect(-28, -28, 56, 56);
        ctx.strokeStyle = '#fef9c3';
        ctx.lineWidth = 2.5;
        ctx.strokeRect(-28, -28, 56, 56);
        ctx.restore();

        // 2. Dalekie ośnieżone szczyty górskie po drugiej stronie doliny
        const farPeaks = [
            { x: 180, w: 220, peakY: 190, colL: '#475569', colR: '#334155' },
            { x: 350, w: 260, peakY: 165, colL: '#64748b', colR: '#475569' },
            { x: 540, w: 280, peakY: 180, colL: '#475569', colR: '#1e293b' }
        ];
        for (const pk of farPeaks) {
            const midX = pk.x + pk.w * 0.5;
            ctx.fillStyle = pk.colL;
            ctx.beginPath();
            ctx.moveTo(pk.x, 460);
            ctx.lineTo(midX, pk.peakY);
            ctx.lineTo(midX, 460);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = pk.colR;
            ctx.beginPath();
            ctx.moveTo(midX, pk.peakY);
            ctx.lineTo(pk.x + pk.w, 460);
            ctx.lineTo(midX, 460);
            ctx.closePath();
            ctx.fill();

            // Śnieżna czapa na szczycie góry
            ctx.fillStyle = '#f8fafc';
            ctx.beginPath();
            ctx.moveTo(midX, pk.peakY);
            ctx.lineTo(midX - pk.w * 0.18, pk.peakY + 62);
            ctx.lineTo(midX - pk.w * 0.05, pk.peakY + 48);
            ctx.lineTo(midX + pk.w * 0.04, pk.peakY + 65);
            ctx.lineTo(midX + pk.w * 0.18, pk.peakY + 58);
            ctx.closePath();
            ctx.fill();
        }

        // 3. Zielona dolina w oddali oraz ZAMEK DAVE'A I ANGELI widoczny z daleka!
        const valleyX = cx + 195;
        const valleyY = 335;

        // Zielone wzgórze królewskie w dolinie
        ctx.fillStyle = '#15803d';
        ctx.beginPath();
        ctx.arc(valleyX, valleyY + 95, 145, Math.PI, 0);
        ctx.fill();
        ctx.fillStyle = '#22c55e';
        ctx.beginPath();
        ctx.arc(valleyX - 10, valleyY + 95, 125, Math.PI * 1.08, Math.PI * 1.92);
        ctx.fill();

        // Miniaturowy Zamek Dave'a i Angeli w oddali (z fioletowymi dachami i różowymi flagami!)
        const casX = valleyX - 42;
        const casY = valleyY - 46;
        const casW = 84;
        const casH = 54;

        ctx.save();
        // Poświata / ramka skupienia wzroku w Fazie 2, gdy Dave dostrzega swój zamek!
        if (phase >= 2) {
            const pulseGlow = 0.4 + Math.sin(tickCount * 0.14) * 0.25;
            ctx.fillStyle = `rgba(254, 240, 138, ${(pulseGlow * 0.45).toFixed(3)})`;
            ctx.beginPath();
            ctx.arc(valleyX, casY + 18, 66 + Math.sin(tickCount * 0.1) * 5, 0, Math.PI * 2);
            ctx.fill();
        }

        // Boczne wieże zamku
        ctx.fillStyle = '#475569';
        ctx.fillRect(casX - 8, casY - 12, 24, casH + 12);
        ctx.fillRect(casX + casW - 16, casY - 12, 24, casH + 12);
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(casX - 8, casY - 12, 24, casH + 12);
        ctx.strokeRect(casX + casW - 16, casY - 16 + 4, 24, casH + 12);

        // Charakterystyczne fioletowe dachy wież zamku Dave'a i Angeli
        ctx.fillStyle = '#7e22ce';
        ctx.fillRect(casX - 11, casY - 20, 30, 8);
        ctx.fillRect(casX - 6, casY - 27, 20, 7);
        ctx.fillRect(casX + casW - 19, casY - 20, 30, 8);
        ctx.fillRect(casX + casW - 14, casY - 27, 20, 7);

        // Powiewające różowe flagi Angeli na szczytach wież
        const flagW = Math.sin(tickCount * 0.14) * 2.5;
        ctx.strokeStyle = '#f8fafc';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(casX + 4, casY - 27); ctx.lineTo(casX + 4, casY - 40);
        ctx.moveTo(casX + casW - 4, casY - 27); ctx.lineTo(casX + casW - 4, casY - 40);
        ctx.stroke();

        ctx.fillStyle = '#ec4899';
        ctx.fillRect(casX + 4, casY - 40, 12 + flagW * 0.4, 6);
        ctx.fillRect(casX + casW - 4, casY - 40, 12 + flagW * 0.4, 6);

        // Główny mur zamkowy i blanki
        ctx.fillStyle = '#64748b';
        ctx.fillRect(casX + 12, casY, casW - 24, casH);
        ctx.strokeStyle = '#1e293b';
        ctx.strokeRect(casX + 12, casY, casW - 24, casH);
        for (let bx = casX + 14; bx < casX + casW - 16; bx += 11) {
            ctx.fillRect(bx, casY - 6, 7, 6);
        }

        // Brama zamkowa i jasnoniebieskie okna
        ctx.fillStyle = '#090d16';
        ctx.fillRect(valleyX - 12, casY + casH - 26, 24, 26);
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(casX - 1, casY - 4, 8, 12);
        ctx.fillRect(casX + casW - 7, casY - 4, 8, 12);

        if (phase >= 2) {
            ctx.strokeStyle = '#facc15';
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 4]);
            ctx.strokeRect(casX - 20, casY - 46, casW + 40, casH + 54);
            ctx.setLineDash([]);
            ctx.fillStyle = '#fef08a';
            ctx.font = 'bold 10px JetBrains Mono';
            ctx.textAlign = 'center';
            ctx.fillText('🏰 ZAMEK DAVE\'A I ANGELI', valleyX, casY - 52);
        }
        ctx.restore();

        // 4. Morze chmur płynące w dole przepaści pod górskim urwiskiem
        for (let c = 0; c < 7; c++) {
            const cloudX = ((c * 145 - tickCount * 0.35) % (canvas.width + 160) + (canvas.width + 160)) % (canvas.width + 160) - 80;
            const cloudY = 398 + (c % 3) * 24;
            ctx.fillStyle = 'rgba(226, 232, 240, 0.78)';
            ctx.beginPath();
            ctx.arc(cloudX, cloudY, 32, 0, Math.PI * 2);
            ctx.arc(cloudX + 28, cloudY - 6, 38, 0, Math.PI * 2);
            ctx.arc(cloudX + 58, cloudY, 30, 0, Math.PI * 2);
            ctx.fill();
        }

        // 5. Pierwszy plan: Strome Górskie Urwisko po lewej stronie (kończy się przepaścią na cliffEdgeX!)
        const cliffEdgeX = cx + 32;

        // Zejściowe schody skalne po lewej stronie góry (szlak w dół góry dla Fazy 3)
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(0, stageFloorY + 34, 65, 200);
        ctx.fillRect(55, stageFloorY + 16, 65, 200);

        // Główna bryła urwiska górskiego
        ctx.fillStyle = '#334155';
        ctx.beginPath();
        ctx.moveTo(0, stageFloorY);
        ctx.lineTo(cliffEdgeX, stageFloorY);
        ctx.lineTo(cliffEdgeX - 8, stageFloorY + 48);
        ctx.lineTo(cliffEdgeX - 26, stageFloorY + 115);
        ctx.lineTo(cliffEdgeX - 18, 600);
        ctx.lineTo(0, 600);
        ctx.closePath();
        ctx.fill();

        // Cieniowanie skalnych warstw urwiska
        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.moveTo(cliffEdgeX - 42, stageFloorY + 12);
        ctx.lineTo(cliffEdgeX, stageFloorY);
        ctx.lineTo(cliffEdgeX - 8, stageFloorY + 48);
        ctx.lineTo(cliffEdgeX - 26, stageFloorY + 115);
        ctx.lineTo(cliffEdgeX - 18, 600);
        ctx.lineTo(cliffEdgeX - 68, 600);
        ctx.closePath();
        ctx.fill();

        // Ośnieżona półka skalna na szczycie urwiska
        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(0, stageFloorY, cliffEdgeX - 2, 10);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, stageFloorY, cliffEdgeX - 2, 4);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2.5;
        ctx.strokeRect(1, stageFloorY, cliffEdgeX - 2, 215);

        // Górskie głazy i drogowskaz szlaku po lewej stronie
        ctx.fillStyle = '#475569';
        ctx.fillRect(36, stageFloorY - 22, 34, 22);
        ctx.fillStyle = '#64748b';
        ctx.fillRect(54, stageFloorY - 14, 24, 14);
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(38, stageFloorY - 22, 30, 4);

        // 6. PORTAL OTWIERAJĄCY SIĘ W GÓRACH (Faza 0)
        const portalX = cx - 105;
        const portalY = stageFloorY - 118;
        let portalScale = 0;
        if (phase === 0) {
            portalScale = cutscenePhaseTick < 14
                ? (cutscenePhaseTick / 14)
                : Math.max(0, 1 - (cutscenePhaseTick - 14) / 38);
        }

        if (portalScale > 0.02) {
            ctx.save();
            ctx.translate(portalX, portalY);
            ctx.scale(portalScale, portalScale);

            ctx.globalAlpha = 0.28;
            ctx.fillStyle = '#a855f7';
            ctx.fillRect(-68, -68, 136, 136);
            ctx.globalAlpha = 1;

            const ringCols = ['#7e22ce', '#ec4899', '#38bdf8', '#facc15', '#ffffff'];
            for (let r = 54, idx = 0; r >= 12; r -= 11, idx++) {
                ctx.save();
                ctx.rotate((tickCount * 0.1 + idx * 0.5) * (idx % 2 === 0 ? 1 : -1));
                ctx.fillStyle = ringCols[idx % ringCols.length];
                ctx.fillRect(-r, -r, r * 2, r * 2);
                ctx.strokeStyle = '#090d16';
                ctx.lineWidth = 2;
                ctx.strokeRect(-r, -r, r * 2, r * 2);
                ctx.restore();
            }
            ctx.restore();
        }

        // 7. ANIMACJA DAVE'A: WYSKOK Z PORTALU -> CHWIANIE SIĘ NAD PRZEPAŚCIĄ -> COFNIĘCIE SIĘ -> ROZGLĄDANIE SIĘ -> ZEJŚCIE Z GÓRY
        let daveX = cx - 72;
        let daveY = stageFloorY - 34;
        let daveRot = 0;
        let lookDirX = 3;
        let lookDirY = 0;
        let isTeetering = false;

        if (phase === 0) {
            // Dave wyskakuje z portalu w powietrzu i ląduje z poślizgiem tuż przy krawędzi urwiska!
            const leapT = Math.min(1, cutscenePhaseTick / 26);
            daveX = portalX + ((cliffEdgeX - 18) - portalX) * leapT;
            daveY = portalY + ((stageFloorY - 34) - portalY) * (leapT * leapT) - Math.sin(leapT * Math.PI) * 35;
            daveRot = (1 - leapT) * Math.PI * 2.2 + (leapT >= 1 ? 0.18 : 0);
            lookDirX = 4;
        } else if (phase === 1) {
            if (cutsceneIndex === 1) {
                // Dave stoi na samym czubku krawędzi urwiska, chwieje się nad przepaścią i prawie spada z góry!
                isTeetering = true;
                daveX = cliffEdgeX - 15;
                daveY = stageFloorY - 34;
                daveRot = 0.42 + Math.sin(tickCount * 0.55) * 0.18;
                lookDirX = 5;
                lookDirY = 3;

                // Kruszące się kamyki spadające z krawędzi urwiska w przepaść!
                for (let rk = 0; rk < 5; rk++) {
                    const fallProg = ((tickCount * 3.2 + rk * 37) % 190);
                    const rx = cliffEdgeX - 2 + (rk % 3) * 6 + fallProg * 0.12;
                    const ry = stageFloorY + 4 + fallProg;
                    ctx.fillStyle = (rk & 1) ? '#94a3b8' : '#475569';
                    ctx.fillRect(rx, ry, 6, 6);
                }
            } else {
                // Slide 2: Dave gwałtownie cofa się od krawędzi przepaści na bezpieczną skałę!
                const backT = Math.min(1, cutscenePhaseTick / 22);
                const easeBack = 1 - Math.pow(1 - backT, 3);
                daveX = (cliffEdgeX - 15) - easeBack * 68;
                const hopBob = backT < 1 ? Math.abs(Math.sin(backT * Math.PI * 2)) * 12 : 0;
                daveY = stageFloorY - 34 - hopBob;
                daveRot = (1 - easeBack) * 0.25;
                lookDirX = backT < 0.7 ? -3 : 3;
            }
        } else if (phase === 2) {
            // Dave stoi na skale, rozgląda się w lewo i w prawo, po czym wpatruje się w Zamek Dave'a i Angeli w oddali!
            daveX = (cliffEdgeX - 83);
            daveY = stageFloorY - 34 - Math.abs(Math.sin(tickCount * 0.1)) * 2;
            if (cutscenePhaseTick < 32) {
                lookDirX = Math.sin(cutscenePhaseTick * 0.28) * 5;
            } else {
                lookDirX = 4.5;
                lookDirY = -1;
            }
        } else if (phase === 3) {
            // Dave odwraca się w stronę górskiego szlaku po lewej i schodzi po stopniach w dół góry!
            const walkT = Math.min(1, cutscenePhaseTick / 58);
            const startWalkX = cliffEdgeX - 83;
            daveX = startWalkX - walkT * 210;
            const stepDrop = daveX < 75 ? 18 : (daveX < 130 ? 8 : 0);
            const walkBob = Math.abs(Math.sin(cutscenePhaseTick * 0.42)) * 6;
            daveY = stageFloorY - 34 + stepDrop - walkBob;
            daveRot = -0.06;
            lookDirX = -4;
        }

        // Rysowanie Dave'a
        ctx.save();
        // Gdy Dave chwieje się nad przepaścią, obracamy go wokół dolnego prawego rogu stopy na krawędzi!
        if (isTeetering) {
            ctx.translate(cliffEdgeX, stageFloorY);
            ctx.rotate(daveRot);
            ctx.translate(-17, -17);
        } else {
            ctx.translate(daveX + 17, daveY + 17);
            ctx.rotate(daveRot);
        }

        ctx.fillStyle = '#9333ea';
        ctx.fillRect(-17, -17, 34, 34);
        ctx.strokeStyle = isTeetering ? '#f43f5e' : (phase === 3 ? '#67e8f9' : '#e9d5ff');
        ctx.lineWidth = 2;
        ctx.strokeRect(-17, -17, 34, 34);

        const eyeH = (isTeetering || phase === 0 || phase === 2) ? 10 : 8;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(-10 + lookDirX * 0.5, -8 + lookDirY * 0.4, 7, eyeH);
        ctx.fillRect(3 + lookDirX * 0.5, -8 + lookDirY * 0.4, 7, eyeH);
        ctx.fillStyle = '#090d16';
        ctx.fillRect(-8 + lookDirX, -6 + lookDirY, 3.5, 4.5);
        ctx.fillRect(5 + lookDirX, -6 + lookDirY, 3.5, 4.5);

        if (phase === 3) {
            ctx.strokeStyle = '#3b0764';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(-12, -10); ctx.lineTo(-4, -7);
            ctx.moveTo(8, -10);   ctx.lineTo(0, -7);
            ctx.stroke();
        }

        // Kropelki potu i wykrzyknik, gdy Dave niemal spada z urwiska!
        if (isTeetering) {
            ctx.fillStyle = '#38bdf8';
            const sweatY = -22 - (tickCount % 10);
            ctx.fillRect(-14, sweatY, 4, 6);
            ctx.fillRect(12, sweatY + 3, 4, 6);
            ctx.fillStyle = '#facc15';
            ctx.font = 'bold 16px Fredoka';
            ctx.textAlign = 'center';
            ctx.fillText('!!', 0, -24);
        }
        ctx.restore();

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

