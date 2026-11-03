// ============================================================================
// MODUŁ 3: BAZA WSZYSTKICH 80 POZIOMÓW (ROZDZIAŁ 1: 1-50, ROZDZIAŁ 2: 51-80)
// ============================================================================
const LEVELS = [
    // ========================================================================
    // ROZDZIAŁ 1 - SEKCJA 1: SIELANKOWE WZGÓRZA (POZIOMY 1 - 14)
    // ========================================================================
    {
        name: "1. Ogrodowy Szlak",
        theme: "day",
        chapterTitle: "SEKCJA 1: SIELANKOWE WZGÓRZA",
        width: 30,
        spawn: [2, 10],
        goal: [27.5, 10],
        solids: [
            [0, 12, 8, 3], [10.5, 12, 8.5, 3], [21.5, 12, 8.5, 3],
            [13.5, 9.2, 3.5, 0.6]
        ],
        invisBlocks: [[9.0, 8.5], [20.0, 8.5]],
        fallingFloors: [[22.5, 12, 2, 3]],
        spikeTraps: [{ x: 16.5, y: 11.2, w: 1, dir: 'up', triggerX: 15.6 }],
        enemies: [
            { x: 12.5, y: 11.2, minX: 11.0, maxX: 18.2, speed: 1.7, trollJump: false },
            { x: 25.0, y: 11.2, minX: 24.6, maxX: 27.0, speed: 1.6, trollJump: false }
        ],
        fakeGoals: []
    },
    {
        name: "2. Zdradziecka Polana",
        theme: "day",
        width: 32,
        spawn: [1.5, 10],
        goal: [29.5, 8.2],
        solids: [
            [0, 12, 6, 3], [13, 12, 6.5, 3], [25, 10, 7, 5],
            [18.5, 9.2, 3.0, 0.6]
        ],
        invisBlocks: [[11.8, 8.2]],
        fallingFloors: [[6, 12, 3.5, 3], [9.5, 12, 3.5, 3], [22, 9.5, 2.5, 0.6]],
        spikeTraps: [{ x: 15, y: 0, w: 1.4, dir: 'down', triggerX: 14.1 }],
        enemies: [
            { x: 16, y: 11.2, minX: 13.4, maxX: 18.8, speed: 1.9, trollSpeed: 3.6 },
            { x: 26.5, y: 9.2, minX: 25.3, maxX: 28.8, speed: 1.8, trollJump: true }
        ],
        fakeGoals: []
    },
    {
        name: "3. Ściana Płaczu",
        theme: "day",
        width: 32,
        spawn: [1.5, 10],
        goal: [29.5, 5],
        solids: [
            [0, 12, 9.5, 3],
            [9.5, 5.5, 1.4, 9.5],
            [13.8, 3.0, 1.4, 8.2],
            [15.2, 10.2, 6.5, 4.8],
            [24.5, 6.8, 7.5, 8.2]
        ],
        invisBlocks: [[7.2, 8.5], [22.8, 6.0]],
        fallingFloors: [[21.7, 10.2, 2.5, 1]],
        spikeTraps: [
            { x: 5, y: 11.2, w: 1, dir: 'up', triggerX: 4.2 },
            { x: 17.5, y: 9.4, w: 1, dir: 'up', triggerX: 16.6 }
        ],
        enemies: [
            { x: 18.8, y: 9.4, minX: 15.5, maxX: 21.2, speed: 1.8, trollJump: false },
            { x: 26.2, y: 6.0, minX: 24.8, maxX: 28.8, speed: 1.9, trollJump: true }
        ],
        fakeGoals: []
    },
    {
        name: "4. Rozwidlenie Szlaków",
        theme: "day",
        width: 34,
        spawn: [1.5, 10],
        goal: [30.5, 3.8],
        solids: [
            [0, 12, 8.5, 3],
            [11.5, 12, 11, 3],
            [13.0, 8.2, 7.5, 0.7],
            [25.5, 12, 8.5, 3],
            [24.5, 4.8, 1.3, 6.2],
            [28.0, 5.6, 5.5, 1]
        ],
        invisBlocks: [[9.8, 8.5], [22.8, 8.2]],
        fallingFloors: [[8.5, 12, 3, 3]],
        spikeTraps: [{ x: 16.2, y: 0, w: 1.6, dir: 'down', triggerX: 15.0 }],
        enemies: [
            { x: 14.0, y: 11.2, minX: 12.0, maxX: 21.8, speed: 2.0, trollSpeed: 3.7 },
            { x: 15.5, y: 7.4, minX: 13.2, maxX: 19.8, speed: 1.8, trollJump: true },
            { x: 27.0, y: 11.2, minX: 25.8, maxX: 30.0, speed: 1.9, trollJump: false }
        ],
        fakeGoals: [[31.2, 10.2]]
    },
    {
        name: "5. Kaskada Kamieni",
        theme: "day",
        width: 36,
        spawn: [1.5, 10],
        goal: [33.5, 6.2],
        solids: [
            [0, 12, 6.5, 3],
            [8.5, 10.8, 4.2, 4.2],
            [14.8, 9.4, 4.2, 5.6],
            [21.0, 8.0, 4.5, 7.0],
            [27.8, 8.0, 8.2, 7.0]
        ],
        invisBlocks: [[7.2, 7.8], [13.5, 6.5], [19.8, 5.2]],
        fallingFloors: [[25.5, 8.0, 2.3, 1]],
        spikeTraps: [
            { x: 10.2, y: 0, w: 1.2, dir: 'down', triggerX: 9.0 },
            { x: 29.5, y: 7.2, w: 1.2, dir: 'up', triggerX: 28.4 }
        ],
        enemies: [
            { x: 9.5, y: 10.0, minX: 8.7, maxX: 12.2, speed: 1.8, trollJump: false },
            { x: 16.0, y: 8.6, minX: 15.0, maxX: 18.5, speed: 1.9, trollSpeed: 3.6 },
            { x: 22.2, y: 7.2, minX: 21.2, maxX: 24.8, speed: 1.9, trollJump: true }
        ],
        fakeGoals: []
    },
    {
        name: "6. Niski Przesmyk",
        theme: "day",
        width: 36,
        spawn: [1.5, 10],
        goal: [33.5, 10],
        solids: [
            [0, 12, 6.5, 3],
            [9.0, 12, 5.0, 3],
            [16.5, 12, 5.5, 3],
            [24.5, 12, 11.5, 3],
            [11.0, 5.5, 12.0, 2.2]
        ],
        invisBlocks: [
            [7.0, 9.0], [8.0, 9.0],
            [14.5, 9.0], [15.5, 9.0],
            [22.5, 9.0], [23.5, 9.0]
        ],
        fallingFloors: [[26.5, 12, 2.2, 3]],
        spikeTraps: [
            { x: 11.2, y: 11.2, w: 1, dir: 'up', triggerX: 10.2 },
            { x: 18.8, y: 11.2, w: 1, dir: 'up', triggerX: 17.8 }
        ],
        enemies: [
            { x: 17.5, y: 11.2, minX: 16.8, maxX: 21.4, speed: 1.9, trollSpeed: 3.5 },
            { x: 29.5, y: 11.2, minX: 28.9, maxX: 32.8, speed: 2.0, trollJump: true }
        ],
        fakeGoals: []
    },
    {
        name: "7. Żółty Sobowtór",
        theme: "day",
        width: 36,
        spawn: [1.5, 10],
        goal: [33.5, 9.2],
        solids: [
            [0, 12, 8.5, 3],
            [11.0, 12, 9.5, 3],
            [23.0, 11.0, 13.0, 4],
            [14.0, 8.6, 3.5, 0.6],
            [26.5, 7.6, 3.5, 0.6]
        ],
        invisBlocks: [[9.5, 8.5], [21.5, 8.0]],
        fallingFloors: [],
        spikeTraps: [{ x: 6.0, y: 11.2, w: 1, dir: 'up', triggerX: 5.1 }],
        enemies: [
            { x: 15.0, y: 11.2, minX: 11.4, maxX: 19.8, speed: 1.8, type: 'mimic' },
            { x: 25.5, y: 10.2, minX: 23.4, maxX: 31.0, speed: 1.9, type: 'mimic' },
            { x: 30.5, y: 10.2, minX: 25.0, maxX: 32.5, speed: 1.8, trollJump: false }
        ],
        fakeGoals: []
    },
    {
        name: "8. Wieże Wiatru",
        theme: "day",
        width: 36,
        spawn: [1.5, 10],
        goal: [33.5, 5.2],
        solids: [
            [0, 12, 6.5, 3],
            [6.5, 4.5, 1.3, 9.5],
            [10.5, 2.5, 1.3, 8.5],
            [11.8, 9.5, 6.2, 1],
            [20.5, 4.0, 1.3, 10],
            [24.5, 2.5, 1.3, 8],
            [27.5, 7.0, 8.5, 8]
        ],
        invisBlocks: [[18.5, 6.5]],
        fallingFloors: [[15.5, 9.5, 2.2, 1]],
        spikeTraps: [{ x: 29.0, y: 6.2, w: 1, dir: 'up', triggerX: 28.1 }],
        enemies: [
            { x: 13.0, y: 8.7, minX: 12.0, maxX: 15.2, speed: 1.7, type: 'mimic' },
            { x: 30.8, y: 6.2, minX: 30.2, maxX: 33.0, speed: 1.9, trollSpeed: 3.6 }
        ],
        fakeGoals: []
    },
    {
        name: "9. Słoneczny Kanion",
        theme: "day",
        width: 38,
        spawn: [1.5, 10],
        goal: [35.5, 9],
        solids: [
            [0, 12, 5.5, 3],
            [8.5, 4.5, 1.3, 8],
            [14.0, 4.0, 1.3, 8.5],
            [17.5, 10.5, 4.5, 4.5],
            [24.5, 3.5, 1.3, 8.5],
            [28.5, 10.8, 9.5, 4.2]
        ],
        invisBlocks: [[11.2, 4.0], [22.8, 6.2]],
        fallingFloors: [[29.5, 10.8, 2.2, 4.2]],
        spikeTraps: [{ x: 3.8, y: 11.2, w: 1, dir: 'up', triggerX: 3.0 }],
        enemies: [
            { x: 18.5, y: 9.7, minX: 17.8, maxX: 21.5, speed: 1.8, trollJump: true },
            { x: 32.2, y: 10.0, minX: 31.8, maxX: 35.0, speed: 1.9, type: 'mimic' }
        ],
        fakeGoals: []
    },
    {
        name: "10. Dolina Złudzeń",
        theme: "day",
        width: 38,
        spawn: [1.5, 7],
        goal: [35.5, 7],
        solids: [
            [0, 9, 6.5, 6],
            [9.0, 12, 8.0, 3],
            [11.0, 7.8, 4.0, 0.7],
            [19.5, 10.5, 7.5, 4.5],
            [29.5, 8.8, 8.5, 6.2]
        ],
        invisBlocks: [[7.5, 6.2], [18.0, 7.2], [28.0, 5.8]],
        fallingFloors: [[23.0, 10.5, 2.2, 1]],
        spikeTraps: [
            { x: 13.0, y: 0, w: 1.3, dir: 'down', triggerX: 11.8 },
            { x: 31.0, y: 8.0, w: 1, dir: 'up', triggerX: 30.1 }
        ],
        enemies: [
            { x: 10.5, y: 11.2, minX: 9.3, maxX: 16.4, speed: 1.9, type: 'mimic' },
            { x: 20.5, y: 9.7, minX: 19.8, maxX: 22.8, speed: 1.9, trollSpeed: 3.6 },
            { x: 32.5, y: 8.0, minX: 32.1, maxX: 35.0, speed: 1.9, type: 'mimic' }
        ],
        fakeGoals: []
    },
    {
        name: "11. Tunele Zrywu",
        theme: "day",
        width: 38,
        spawn: [1.5, 10],
        goal: [35.5, 10],
        solids: [
            [0, 12, 6, 3],
            [6.0, 2.0, 19.5, 6.8],
            [9.2, 12, 4.8, 3],
            [17.2, 12, 5.0, 3],
            [25.5, 12, 12.5, 3],
            [28.5, 8.6, 3.5, 0.6]
        ],
        invisBlocks: [[24.2, 8.8]],
        fallingFloors: [[11.0, 12, 2.0, 3], [19.0, 12, 2.0, 3]],
        spikeTraps: [{ x: 26.8, y: 11.2, w: 1, dir: 'up', triggerX: 25.9 }],
        enemies: [
            { x: 28.5, y: 11.2, minX: 28.0, maxX: 34.5, speed: 1.9, type: 'mimic' },
            { x: 32.5, y: 11.2, minX: 28.0, maxX: 34.5, speed: 2.0, trollSpeed: 3.7 }
        ],
        fakeGoals: []
    },
    {
        name: "12. Schody do Chmur",
        theme: "day",
        width: 36,
        spawn: [1.5, 10],
        goal: [15.5, 2.8],
        solids: [
            [0, 12, 8.5, 3],
            [11.0, 12, 10.5, 3],
            [24.0, 12, 10.0, 3],
            [24.5, 4.2, 1.3, 6.8],
            [20.0, 2.5, 1.3, 6.5],
            [14.0, 4.6, 4.8, 0.8]
        ],
        invisBlocks: [[9.5, 8.8], [22.5, 8.5]],
        fallingFloors: [[14.8, 12, 2.4, 3]],
        spikeTraps: [{ x: 18.8, y: 11.2, w: 1, dir: 'up', triggerX: 17.8 }],
        enemies: [
            { x: 12.2, y: 11.2, minX: 11.3, maxX: 14.5, speed: 1.8, type: 'mimic' },
            { x: 26.0, y: 11.2, minX: 24.4, maxX: 30.5, speed: 2.0, trollSpeed: 3.7 },
            { x: 29.0, y: 11.2, minX: 24.4, maxX: 30.5, speed: 1.8, trollJump: true }
        ],
        fakeGoals: [[31.5, 10.2]]
    },
    {
        name: "13. Bastion Wzgórz",
        theme: "day",
        width: 38,
        spawn: [1.5, 10],
        goal: [35.5, 9],
        solids: [
            [0, 12, 6, 3],
            [8.2, 11, 6.2, 4],
            [16.5, 4.8, 1.3, 8.2],
            [20.2, 10.5, 7.0, 4.5],
            [29.5, 10.8, 8.5, 4.2]
        ],
        invisBlocks: [[6.8, 8.2], [18.8, 7.0], [28.0, 7.5]],
        fallingFloors: [[23.2, 10.5, 2.2, 1]],
        spikeTraps: [
            { x: 4.2, y: 11.2, w: 1, dir: 'up', triggerX: 3.3 },
            { x: 30.8, y: 10.0, w: 1, dir: 'up', triggerX: 29.9 }
        ],
        enemies: [
            { x: 9.8, y: 10.2, minX: 8.5, maxX: 14.0, speed: 1.9, type: 'mimic' },
            { x: 21.2, y: 9.7, minX: 20.5, maxX: 26.8, speed: 2.0, trollJump: true },
            { x: 32.8, y: 10.0, minX: 32.0, maxX: 35.0, speed: 1.9, type: 'mimic' }
        ],
        fakeGoals: []
    },
    {
        name: "14. Granica Zmierzchu",
        theme: "day",
        transitionToTheme: "forest",
        width: 38,
        spawn: [1.5, 10],
        goal: [35.5, 10],
        solids: [
            [0, 12, 7, 3],
            [7, 4, 1.3, 8],
            [11, 2, 1.3, 8],
            [12.3, 9, 6.0, 1],
            [20.5, 4, 1.3, 11],
            [24.5, 2, 1.3, 8.5],
            [27.0, 12, 11.0, 3]
        ],
        invisBlocks: [[18.5, 6.2]],
        fallingFloors: [[15.0, 9, 2.2, 1]],
        spikeTraps: [
            { x: 4.5, y: 11.2, w: 1, dir: 'up', triggerX: 3.8 },
            { x: 29.0, y: 11.2, w: 1, dir: 'up', triggerX: 28.1 }
        ],
        enemies: [
            { x: 13.0, y: 8.2, minX: 12.5, maxX: 14.8, speed: 1.8, trollJump: false },
            { x: 31.2, y: 11.2, minX: 30.2, maxX: 34.8, speed: 1.9, type: 'mimic' },
            { x: 33.8, y: 11.2, minX: 30.2, maxX: 34.8, speed: 1.9, trollSpeed: 3.6 }
        ],
        fakeGoals: []
    },

    // ========================================================================
    // ROZDZIAŁ 1 - SEKCJA 2: LAS ZMIERZCHU (POZIOMY 15 - 28)
    // ========================================================================
    {
        name: "15. Las Zmierzchu",
        theme: "forest",
        chapterTitle: "SEKCJA 2: LAS ZMIERZCHU",
        width: 38,
        spawn: [1.5, 10],
        goal: [35.5, 7],
        solids: [
            [0, 12, 7.5, 3],
            [9.8, 10.5, 7.0, 4.5],
            [19.0, 9.0, 7.0, 6.0],
            [28.5, 8.8, 9.5, 6.2],
            [12.0, 7.2, 3.0, 0.6]
        ],
        invisBlocks: [[8.4, 7.8], [17.5, 6.5]],
        fallingFloors: [[26.2, 9.0, 2.2, 1]],
        spikeTraps: [
            { x: 5.8, y: 11.2, w: 1, dir: 'up', triggerX: 5.0 },
            { x: 21.5, y: 0, w: 1.3, dir: 'down', triggerX: 20.2 }
        ],
        enemies: [
            { x: 11.5, y: 9.7, minX: 10.2, maxX: 16.4, speed: 1.9, trollSpeed: 3.6 },
            { x: 20.5, y: 8.2, minX: 19.3, maxX: 25.5, speed: 1.9, trollJump: true },
            { x: 30.5, y: 8.0, minX: 28.8, maxX: 34.8, speed: 2.0, type: 'mimic' }
        ],
        fakeGoals: []
    },
    {
        name: "16. Zgniły Most",
        theme: "forest",
        width: 38,
        spawn: [1.5, 9],
        goal: [35.5, 9],
        solids: [
            [0, 11, 5.5, 4],
            [16.5, 7.2, 4.0, 0.7],
            [30.5, 11, 7.5, 4]
        ],
        invisBlocks: [[11, 7.0], [25, 7.0]],
        fallingFloors: [
            [5.5, 11, 3.2, 0.8],
            [9.2, 11, 3.2, 0.8],
            [13.0, 10.5, 3.2, 0.8],
            [16.8, 10.5, 3.2, 0.8],
            [20.6, 11, 3.2, 0.8],
            [24.4, 11, 3.5, 0.8],
            [28.2, 11, 2.2, 0.8]
        ],
        spikeTraps: [
            { x: 14, y: 0, w: 1.2, dir: 'down', triggerX: 12.8 },
            { x: 22, y: 0, w: 1.2, dir: 'down', triggerX: 20.8 }
        ],
        enemies: [
            { x: 17.5, y: 6.4, minX: 16.7, maxX: 20.0, speed: 1.8, trollJump: false },
            { x: 32.0, y: 10.2, minX: 31.0, maxX: 35.0, speed: 2.0, type: 'mimic' }
        ],
        fakeGoals: []
    },
    {
        name: "17. Dwa Portale",
        theme: "forest",
        width: 36,
        spawn: [1.5, 10],
        goal: [16, 3.2],
        solids: [
            [0, 12, 8.5, 3],
            [11.0, 12, 11.0, 3],
            [24.5, 12, 9.5, 3],
            [24.0, 4.5, 1.3, 6.5],
            [19.5, 3.0, 1.3, 6.0],
            [14.0, 5.0, 4.8, 0.8]
        ],
        invisBlocks: [[9.5, 8.8], [23.0, 8.8]],
        fallingFloors: [[15.0, 12, 2.4, 3]],
        spikeTraps: [{ x: 19.0, y: 11.2, w: 1, dir: 'up', triggerX: 18.0 }],
        enemies: [
            { x: 12.5, y: 11.2, minX: 11.3, maxX: 14.6, speed: 1.9, type: 'mimic' },
            { x: 20.2, y: 11.2, minX: 17.6, maxX: 21.6, speed: 1.9, trollJump: true },
            { x: 27.0, y: 11.2, minX: 25.0, maxX: 30.8, speed: 2.0, trollSpeed: 3.7 }
        ],
        fakeGoals: [[31.5, 10.2]]
    },
    {
        name: "18. Tarasy Strażników",
        theme: "forest",
        width: 40,
        spawn: [1.5, 10],
        goal: [37.5, 6.2],
        solids: [
            [0, 12, 6.0, 3],
            [7.8, 10.8, 6.5, 4.2],
            [16.0, 9.2, 6.5, 5.8],
            [24.2, 7.8, 6.5, 7.2],
            [32.5, 8.0, 7.5, 7.0],
            [10.0, 7.2, 3.0, 0.6],
            [18.2, 5.8, 3.0, 0.6]
        ],
        invisBlocks: [[6.5, 7.8], [14.6, 6.2], [22.8, 5.2]],
        fallingFloors: [[30.8, 8.0, 1.8, 1]],
        spikeTraps: [
            { x: 3.8, y: 11.2, w: 1, dir: 'up', triggerX: 3.0 },
            { x: 34.0, y: 7.2, w: 1, dir: 'up', triggerX: 33.1 }
        ],
        enemies: [
            { x: 9.0, y: 10.0, minX: 8.1, maxX: 13.8, speed: 1.9, trollSpeed: 3.6 },
            { x: 17.5, y: 8.4, minX: 16.3, maxX: 22.0, speed: 2.0, type: 'mimic' },
            { x: 25.5, y: 7.0, minX: 24.5, maxX: 30.2, speed: 2.0, trollJump: true },
            { x: 35.5, y: 7.2, minX: 35.1, maxX: 37.2, speed: 1.9, type: 'mimic' }
        ],
        fakeGoals: []
    },
    {
        name: "19. Komin Śmierci",
        theme: "forest",
        width: 34,
        spawn: [1.5, 10],
        goal: [31.0, 10],
        solids: [
            [0, 12, 6.5, 3],
            [6.5, 4.0, 1.3, 11],
            [10.5, 2.0, 1.3, 8.5],
            [14.5, 4.0, 1.3, 11],
            [18.5, 2.0, 1.3, 8.5],
            [22.5, 12, 11.5, 3],
            [25.5, 8.6, 3.5, 0.6]
        ],
        invisBlocks: [[12.5, 5.0], [20.5, 7.0]],
        fallingFloors: [[22.5, 12, 2.2, 3]],
        spikeTraps: [
            { x: 8.5, y: 0, w: 1.1, dir: 'down', triggerX: 7.0 },
            { x: 16.5, y: 0, w: 1.1, dir: 'down', triggerX: 15.0 },
            { x: 26.0, y: 11.2, w: 1, dir: 'up', triggerX: 25.1 }
        ],
        enemies: [
            { x: 25.2, y: 11.2, minX: 24.8, maxX: 30.5, speed: 2.0, type: 'mimic' },
            { x: 29.0, y: 11.2, minX: 27.2, maxX: 30.8, speed: 1.9, trollSpeed: 3.6 }
        ],
        fakeGoals: []
    },
    {
        name: "20. Podwójne Dno",
        theme: "forest",
        width: 38,
        spawn: [1.5, 6.5],
        goal: [35.5, 10],
        solids: [
            [0, 8.5, 5.5, 6.5],
            [8.0, 12, 8.0, 3],
            [8.5, 7.5, 5.5, 0.7],
            [18.5, 12, 8.5, 3],
            [19.5, 7.5, 5.5, 0.7],
            [29.5, 12, 8.5, 3]
        ],
        invisBlocks: [[6.5, 6.0], [16.8, 6.0], [27.8, 8.5]],
        fallingFloors: [
            [5.5, 8.5, 2.2, 1],
            [29.5, 12, 2.2, 3]
        ],
        spikeTraps: [
            { x: 11.5, y: 11.2, w: 1, dir: 'up', triggerX: 10.5 },
            { x: 22.0, y: 0, w: 1.3, dir: 'down', triggerX: 20.8 }
        ],
        enemies: [
            { x: 9.5, y: 11.2, minX: 8.3, maxX: 15.5, speed: 2.0, trollSpeed: 3.7 },
            { x: 10.0, y: 6.7, minX: 8.8, maxX: 13.5, speed: 1.8, type: 'mimic' },
            { x: 20.5, y: 11.2, minX: 18.8, maxX: 26.5, speed: 2.0, type: 'mimic' },
            { x: 33.0, y: 11.2, minX: 32.0, maxX: 35.2, speed: 2.0, trollJump: true }
        ],
        fakeGoals: []
    },
    {
        name: "21. Polana Sobowtórów",
        theme: "forest",
        width: 38,
        spawn: [1.5, 10],
        goal: [35.5, 8],
        solids: [
            [0, 12, 6.5, 3],
            [8.8, 10.5, 7.5, 4.5],
            [18.5, 9.0, 7.5, 6.0],
            [28.2, 9.8, 9.8, 5.2],
            [20.5, 5.8, 3.2, 0.6]
        ],
        invisBlocks: [[7.5, 7.5], [17.0, 6.2], [26.8, 6.5]],
        fallingFloors: [[14.2, 10.5, 2.0, 1]],
        spikeTraps: [{ x: 29.8, y: 9.0, w: 1, dir: 'up', triggerX: 28.9 }],
        enemies: [
            { x: 10.2, y: 9.7, minX: 9.1, maxX: 13.8, speed: 1.9, type: 'mimic' },
            { x: 20.0, y: 8.2, minX: 18.8, maxX: 25.5, speed: 2.0, type: 'mimic' },
            { x: 31.8, y: 9.0, minX: 31.0, maxX: 35.0, speed: 2.0, type: 'mimic' },
            { x: 33.8, y: 9.0, minX: 31.0, maxX: 35.0, speed: 2.1, trollSpeed: 3.9 }
        ],
        fakeGoals: []
    },
    {
        name: "22. Szmaragdowa Rozpadlina",
        theme: "forest",
        width: 40,
        spawn: [1.5, 10],
        goal: [37.5, 9],
        solids: [
            [0, 12, 5.5, 3],
            [7.5, 3.5, 1.3, 8.5],
            [12.5, 5.0, 1.3, 8.5],
            [15.8, 10.5, 4.5, 4.5],
            [22.5, 3.0, 1.3, 8.5],
            [27.5, 4.5, 1.3, 8.5],
            [31.5, 10.8, 8.5, 4.2]
        ],
        invisBlocks: [[10.0, 4.0], [25.0, 3.8]],
        fallingFloors: [[32.5, 10.8, 2.2, 4.2]],
        spikeTraps: [{ x: 3.8, y: 11.2, w: 1, dir: 'up', triggerX: 3.0 }],
        enemies: [
            { x: 17.0, y: 9.7, minX: 16.0, maxX: 19.8, speed: 1.9, type: 'mimic' },
            { x: 35.2, y: 10.0, minX: 34.8, maxX: 37.2, speed: 2.0, type: 'mimic' }
        ],
        fakeGoals: []
    },
    {
        name: "23. Echo w Koronach",
        theme: "forest",
        width: 40,
        spawn: [1.5, 10],
        goal: [37.5, 4.8],
        solids: [
            [0, 12, 6.5, 3],
            [6.5, 4.5, 1.3, 8.5],
            [10.2, 2.5, 1.3, 7.5],
            [11.5, 8.5, 6.5, 1],
            [20.5, 7.5, 6.5, 1],
            [29.5, 3.0, 1.3, 7.5],
            [32.8, 6.6, 7.2, 8.4]
        ],
        invisBlocks: [[18.8, 5.2], [27.8, 5.0]],
        fallingFloors: [[15.5, 8.5, 2.2, 1], [24.5, 7.5, 2.2, 1]],
        spikeTraps: [{ x: 33.8, y: 5.8, w: 1, dir: 'up', triggerX: 32.9 }],
        enemies: [
            { x: 12.2, y: 7.7, minX: 11.8, maxX: 15.2, speed: 1.8, type: 'mimic' },
            { x: 21.5, y: 6.7, minX: 20.8, maxX: 24.2, speed: 1.9, trollSpeed: 3.7 },
            { x: 35.5, y: 5.8, minX: 35.0, maxX: 37.2, speed: 2.0, type: 'mimic' }
        ],
        fakeGoals: []
    },
    {
        name: "24. Zsynchronizowani",
        theme: "forest",
        width: 40,
        spawn: [1.5, 10],
        goal: [37.5, 10],
        solids: [
            [0, 12, 7.0, 3],
            [9.5, 12, 8.5, 3],
            [20.5, 12, 8.5, 3],
            [31.5, 12, 8.5, 3],
            [12.5, 8.5, 3.0, 0.6],
            [23.5, 8.5, 3.0, 0.6]
        ],
        invisBlocks: [[8.2, 8.5], [19.0, 8.5], [30.0, 8.5]],
        fallingFloors: [[32.5, 12, 2.0, 3]],
        spikeTraps: [{ x: 5.0, y: 11.2, w: 1, dir: 'up', triggerX: 4.1 }],
        enemies: [
            { x: 11.0, y: 11.2, minX: 9.8, maxX: 17.5, speed: 2.0, type: 'mimic' },
            { x: 15.5, y: 11.2, minX: 9.8, maxX: 17.5, speed: 1.9, trollJump: true },
            { x: 22.0, y: 11.2, minX: 20.8, maxX: 28.5, speed: 2.0, type: 'mimic' },
            { x: 26.5, y: 11.2, minX: 20.8, maxX: 28.5, speed: 2.0, trollSpeed: 3.8 }
        ],
        fakeGoals: []
    },
    {
        name: "25. Dziupla Pułapek",
        theme: "forest",
        width: 40,
        spawn: [1.5, 10],
        goal: [36.5, 4.2],
        solids: [
            [0, 12, 7.5, 3],
            [10.0, 12, 9.0, 3],
            [21.5, 10.5, 7.0, 4.5],
            [29.5, 3.5, 1.3, 7.5],
            [33.0, 6.0, 7.0, 9.0]
        ],
        invisBlocks: [[8.5, 8.5], [20.0, 7.5], [31.2, 4.8]],
        fallingFloors: [[7.5, 12, 2.5, 3], [25.5, 10.5, 2.2, 1]],
        spikeTraps: [
            { x: 13.5, y: 0, w: 1.3, dir: 'down', triggerX: 12.2 },
            { x: 34.0, y: 5.2, w: 1, dir: 'up', triggerX: 33.1 }
        ],
        enemies: [
            { x: 11.5, y: 11.2, minX: 10.3, maxX: 18.5, speed: 2.0, type: 'mimic' },
            { x: 16.0, y: 11.2, minX: 10.3, maxX: 18.5, speed: 1.9, trollJump: true },
            { x: 22.5, y: 9.7, minX: 21.8, maxX: 25.2, speed: 2.0, trollSpeed: 3.8 }
        ],
        fakeGoals: [[17.2, 10.2]]
    },
    {
        name: "26. Korzenny Labirynt",
        theme: "forest",
        width: 40,
        spawn: [1.5, 10],
        goal: [37.5, 10],
        solids: [
            [0, 12, 6, 3],
            [6, 4.5, 1.3, 8.5],
            [9.8, 2.5, 1.3, 8.0],
            [13.5, 4.5, 1.3, 8.5],
            [16.5, 10.0, 7.0, 5],
            [26.0, 4.0, 1.3, 8.5],
            [29.8, 2.5, 1.3, 8.0],
            [32.8, 12, 7.2, 3]
        ],
        invisBlocks: [[11.5, 4.5], [24.2, 6.8], [31.2, 7.5]],
        fallingFloors: [[20.5, 10.0, 2.2, 1], [33.5, 12, 2.0, 3]],
        spikeTraps: [{ x: 17.2, y: 9.2, w: 1, dir: 'up', triggerX: 16.4 }],
        enemies: [
            { x: 18.5, y: 9.2, minX: 18.2, maxX: 20.3, speed: 1.9, type: 'mimic' },
            { x: 36.0, y: 11.2, minX: 35.6, maxX: 38.5, speed: 2.0, type: 'mimic' }
        ],
        fakeGoals: []
    },
    {
        name: "27. Ostatni Brzask",
        theme: "forest",
        width: 40,
        spawn: [1.5, 10],
        goal: [37.5, 8],
        solids: [
            [0, 12, 6.5, 3],
            [9.0, 11, 6.5, 4],
            [17.8, 9.5, 6.5, 5.5],
            [26.5, 11, 5.8, 4],
            [34.2, 9.8, 5.8, 5.2]
        ],
        invisBlocks: [[7.5, 8.0], [16.2, 6.8], [25.0, 7.2], [32.8, 6.8]],
        fallingFloors: [[12.5, 11, 2.2, 1], [29.5, 11, 2.2, 1]],
        spikeTraps: [
            { x: 4.5, y: 11.2, w: 1, dir: 'up', triggerX: 3.6 },
            { x: 19.8, y: 0, w: 1.3, dir: 'down', triggerX: 18.5 }
        ],
        enemies: [
            { x: 10.0, y: 10.2, minX: 9.2, maxX: 12.2, speed: 2.0, type: 'mimic' },
            { x: 19.0, y: 8.7, minX: 18.0, maxX: 23.8, speed: 2.0, trollJump: true },
            { x: 22.0, y: 8.7, minX: 18.0, maxX: 23.8, speed: 2.0, trollSpeed: 3.9 },
            { x: 27.2, y: 10.2, minX: 26.8, maxX: 29.3, speed: 2.0, type: 'mimic' }
        ],
        fakeGoals: []
    },
    {
        name: "28. Skok w Mrok",
        theme: "forest",
        transitionToTheme: "darkforest",
        width: 40,
        spawn: [1.5, 10],
        goal: [37.5, 9],
        solids: [
            [0, 12, 5.5, 3],
            [8.0, 5.0, 1.3, 8],
            [14.5, 5.0, 1.3, 8],
            [20.5, 11.0, 6.5, 4],
            [29.5, 4.0, 1.3, 7],
            [33.0, 10.8, 7.0, 4.2]
        ],
        invisBlocks: [[11.2, 4.5], [28.0, 7.5]],
        fallingFloors: [[24.2, 11.0, 2.2, 4]],
        spikeTraps: [{ x: 21.2, y: 10.2, w: 1, dir: 'up', triggerX: 20.4 }],
        enemies: [
            { x: 22.5, y: 10.2, minX: 22.2, maxX: 24.0, speed: 1.9, trollJump: true },
            { x: 34.5, y: 10.0, minX: 33.4, maxX: 37.2, speed: 2.0, type: 'mimic' },
            { x: 36.5, y: 10.0, minX: 33.4, maxX: 37.2, speed: 2.0, trollSpeed: 3.9 }
        ],
        fakeGoals: []
    },

    // ========================================================================
    // ROZDZIAŁ 1 - SEKCJA 3: KRWAWY KSIĘŻYC / NOC (POZIOMY 29 - 40)
    // ========================================================================
    {
        name: "29. Krwawy Księżyc",
        theme: "darkforest",
        chapterTitle: "SEKCJA 3: KRWAWY KSIĘŻYC",
        width: 40,
        spawn: [1.5, 10],
        goal: [37.5, 10],
        solids: [
            [0, 12, 6.5, 3],
            [8.8, 10.5, 6.5, 4.5],
            [17.5, 9.0, 6.5, 6.0],
            [26.2, 10.5, 6.5, 4.5],
            [34.5, 12, 5.5, 3],
            [19.0, 5.8, 3.5, 0.6]
        ],
        invisBlocks: [[7.2, 8.2], [16.0, 6.8], [24.8, 7.2]],
        fallingFloors: [
            [12.8, 10.5, 2.2, 1],
            [30.2, 10.5, 2.2, 1]
        ],
        spikeTraps: [
            { x: 4.0, y: 11.2, w: 1, dir: 'up', triggerX: 3.1 },
            { x: 20.0, y: 0, w: 1.5, dir: 'down', triggerX: 18.8 }
        ],
        enemies: [
            { x: 9.8, y: 9.7, minX: 9.0, maxX: 12.6, speed: 2.1, trollSpeed: 4.1 },
            { x: 18.5, y: 8.2, minX: 17.8, maxX: 23.5, speed: 2.1, type: 'mimic' },
            { x: 22.0, y: 8.2, minX: 17.8, maxX: 23.5, speed: 2.0, trollJump: true },
            { x: 27.2, y: 9.7, minX: 26.5, maxX: 30.0, speed: 2.1, type: 'evad_bot' },
            { x: 35.5, y: 11.2, minX: 34.8, maxX: 37.2, speed: 2.1, trollSpeed: 4.1 }
        ],
        fakeGoals: []
    },
    {
        name: "30. Nocna Zasadzka",
        theme: "darkforest",
        width: 40,
        spawn: [1.5, 10],
        goal: [37.5, 5.8],
        solids: [
            [0, 12, 7.0, 3],
            [9.8, 12, 9.5, 3],
            [12.0, 8.4, 5.0, 0.7],
            [21.5, 10.0, 7.5, 5],
            [30.5, 3.5, 1.3, 8.0],
            [34.0, 7.6, 6.0, 7.4]
        ],
        invisBlocks: [[8.2, 8.5], [20.0, 7.5], [32.2, 5.5]],
        fallingFloors: [[7.0, 12, 2.8, 3], [26.5, 10.0, 2.2, 1]],
        spikeTraps: [
            { x: 14.0, y: 0, w: 1.3, dir: 'down', triggerX: 12.8 },
            { x: 34.8, y: 6.8, w: 1, dir: 'up', triggerX: 34.0 }
        ],
        enemies: [
            { x: 11.5, y: 11.2, minX: 10.2, maxX: 18.8, speed: 2.1, type: 'mimic' },
            { x: 16.5, y: 11.2, minX: 10.2, maxX: 18.8, speed: 2.0, type: 'evad_bot' },
            { x: 13.5, y: 7.6, minX: 12.2, maxX: 16.5, speed: 2.0, trollJump: true },
            { x: 22.5, y: 9.2, minX: 21.8, maxX: 26.2, speed: 2.2, type: 'evad_bot' }
        ],
        fakeGoals: [[17.5, 10.2]]
    },
    {
        name: "31. Ścieżka Cierpienia",
        theme: "darkforest",
        width: 40,
        spawn: [1.5, 10],
        goal: [37.5, 10],
        solids: [
            [0, 12, 5.5, 3],
            [8.0, 12, 4.8, 3],
            [14.0, 4.8, 1.3, 8.2],
            [17.8, 9.5, 6.2, 5.5],
            [26.2, 9.5, 6.2, 5.5],
            [34.2, 12, 5.8, 3]
        ],
        invisBlocks: [[6.0, 8.8], [16.0, 6.0], [24.5, 6.8], [32.8, 8.2]],
        fallingFloors: [
            [8.0, 12, 2.2, 3],
            [20.5, 9.5, 2.2, 1],
            [28.8, 9.5, 2.2, 1]
        ],
        spikeTraps: [
            { x: 18.2, y: 8.7, w: 1, dir: 'up', triggerX: 17.4 },
            { x: 26.6, y: 8.7, w: 1, dir: 'up', triggerX: 25.8 }
        ],
        enemies: [
            { x: 19.5, y: 8.7, minX: 18.0, maxX: 23.5, speed: 2.1, type: 'evad_bot' },
            { x: 27.8, y: 8.7, minX: 26.5, maxX: 32.0, speed: 2.1, type: 'mimic' },
            { x: 35.5, y: 11.2, minX: 34.5, maxX: 37.2, speed: 2.2, trollSpeed: 4.2 }
        ],
        fakeGoals: []
    },
    {
        name: "32. Szkarłatny Wąwóz",
        theme: "darkforest",
        width: 40,
        spawn: [1.5, 10],
        goal: [37.5, 8],
        solids: [
            [0, 12, 6.0, 3],
            [8.2, 11, 6.5, 4],
            [16.8, 9.5, 6.5, 5.5],
            [18.5, 6.0, 3.2, 0.6],
            [25.5, 11, 6.5, 4],
            [34.0, 9.8, 6.0, 5.2]
        ],
        invisBlocks: [[6.8, 8.0], [15.2, 6.8], [23.8, 7.2], [32.5, 6.8]],
        fallingFloors: [[12.0, 11, 2.2, 1], [29.2, 11, 2.2, 1]],
        spikeTraps: [
            { x: 4.0, y: 11.2, w: 1, dir: 'up', triggerX: 3.1 },
            { x: 34.8, y: 9.0, w: 1, dir: 'up', triggerX: 34.0 }
        ],
        enemies: [
            { x: 9.2, y: 10.2, minX: 8.5, maxX: 11.8, speed: 2.1, type: 'evad_bot' },
            { x: 17.8, y: 8.7, minX: 17.0, maxX: 22.8, speed: 2.1, type: 'mimic' },
            { x: 21.2, y: 8.7, minX: 17.0, maxX: 22.8, speed: 2.1, type: 'evad_bot' },
            { x: 26.5, y: 10.2, minX: 25.8, maxX: 29.0, speed: 2.1, type: 'mimic' }
        ],
        fakeGoals: []
    },
    {
        name: "33. Czerwone Iglice",
        theme: "darkforest",
        width: 40,
        spawn: [1.5, 10],
        goal: [37.5, 9],
        solids: [
            [0, 12, 5.5, 3],
            [7.5, 3.8, 1.3, 8.8],
            [12.0, 2.2, 1.3, 8.0],
            [15.0, 10.2, 5.2, 4.8],
            [22.2, 3.8, 1.3, 8.8],
            [26.8, 2.2, 1.3, 8.0],
            [31.0, 4.0, 1.3, 8.5],
            [34.2, 10.8, 5.8, 4.2]
        ],
        invisBlocks: [[9.8, 3.5], [24.5, 3.5], [29.0, 6.2]],
        fallingFloors: [[17.5, 10.2, 2.2, 1]],
        spikeTraps: [{ x: 34.8, y: 10.0, w: 1, dir: 'up', triggerX: 34.0 }],
        enemies: [
            { x: 15.6, y: 9.4, minX: 15.2, maxX: 17.3, speed: 2.0, type: 'evad_bot' },
            { x: 36.2, y: 10.0, minX: 36.0, maxX: 37.2, speed: 2.1, type: 'mimic' }
        ],
        fakeGoals: []
    },
    {
        name: "34. Nocny Mimic",
        theme: "darkforest",
        width: 40,
        spawn: [1.5, 10],
        goal: [37.5, 10],
        solids: [
            [0, 12, 6.5, 3],
            [9.0, 12, 9.0, 3],
            [11.5, 8.2, 4.0, 0.6],
            [20.5, 12, 9.0, 3],
            [23.0, 8.2, 4.0, 0.6],
            [32.0, 12, 8.0, 3]
        ],
        invisBlocks: [[7.5, 8.5], [19.0, 8.5], [30.5, 8.5]],
        fallingFloors: [[32.8, 12, 2.2, 3]],
        spikeTraps: [
            { x: 13.5, y: 0, w: 1.3, dir: 'down', triggerX: 12.2 },
            { x: 25.0, y: 0, w: 1.3, dir: 'down', triggerX: 23.8 }
        ],
        enemies: [
            { x: 10.2, y: 11.2, minX: 9.3, maxX: 17.5, speed: 2.1, type: 'mimic' },
            { x: 15.8, y: 11.2, minX: 9.3, maxX: 17.5, speed: 2.1, type: 'evad_bot' },
            { x: 21.8, y: 11.2, minX: 20.8, maxX: 29.0, speed: 2.2, type: 'mimic' },
            { x: 27.2, y: 11.2, minX: 20.8, maxX: 29.0, speed: 2.1, type: 'evad_bot' },
            { x: 35.8, y: 11.2, minX: 35.2, maxX: 37.2, speed: 2.2, trollSpeed: 4.2 }
        ],
        fakeGoals: []
    },
    {
        name: "35. Krucze Skały",
        theme: "darkforest",
        width: 40,
        spawn: [1.5, 10],
        goal: [16.5, 2.8],
        solids: [
            [0, 12, 8.0, 3],
            [10.5, 12, 11.5, 3],
            [24.5, 12, 10.5, 3],
            [26.0, 4.2, 1.3, 6.8],
            [21.5, 2.5, 1.3, 6.5],
            [15.0, 4.6, 5.0, 0.8]
        ],
        invisBlocks: [[9.0, 8.8], [23.0, 8.8]],
        fallingFloors: [[15.0, 12, 2.5, 3]],
        spikeTraps: [{ x: 19.5, y: 11.2, w: 1, dir: 'up', triggerX: 18.5 }],
        enemies: [
            { x: 11.8, y: 11.2, minX: 10.8, maxX: 14.8, speed: 2.1, type: 'evad_bot' },
            { x: 20.5, y: 11.2, minX: 17.8, maxX: 21.6, speed: 2.1, type: 'mimic' },
            { x: 26.5, y: 11.2, minX: 24.8, maxX: 31.2, speed: 2.2, type: 'evad_bot' },
            { x: 29.8, y: 11.2, minX: 24.8, maxX: 31.2, speed: 2.1, type: 'mimic' }
        ],
        fakeGoals: [[32.5, 10.2]]
    },
    {
        name: "36. Most Cieni",
        theme: "darkforest",
        width: 42,
        spawn: [1.5, 9],
        goal: [39.5, 9],
        solids: [
            [0, 11, 5.5, 4],
            [13.5, 7.0, 4.5, 0.7],
            [24.5, 7.0, 4.5, 0.7],
            [34.5, 11, 7.5, 4]
        ],
        invisBlocks: [[10.5, 6.8], [21.5, 6.8]],
        fallingFloors: [
            [5.5, 11, 3.2, 0.8],
            [9.2, 11, 3.2, 0.8],
            [14.8, 10.5, 3.2, 0.8],
            [19.0, 10.5, 3.2, 0.8],
            [25.5, 11, 3.2, 0.8],
            [29.8, 11, 4.0, 0.8]
        ],
        spikeTraps: [
            { x: 16.0, y: 0, w: 1.2, dir: 'down', triggerX: 14.8 },
            { x: 27.0, y: 0, w: 1.2, dir: 'down', triggerX: 25.8 },
            { x: 35.5, y: 10.2, w: 1, dir: 'up', triggerX: 34.6 }
        ],
        enemies: [
            { x: 14.5, y: 6.2, minX: 13.8, maxX: 17.5, speed: 2.0, type: 'evad_bot' },
            { x: 25.5, y: 6.2, minX: 24.8, maxX: 28.5, speed: 2.0, type: 'mimic' },
            { x: 37.2, y: 10.2, minX: 36.8, maxX: 39.2, speed: 2.2, type: 'evad_bot' }
        ],
        fakeGoals: []
    },
    {
        name: "37. Zewnętrzne Mury",
        theme: "darkforest",
        width: 42,
        spawn: [1.5, 10],
        goal: [39.5, 5],
        solids: [
            [0, 12, 6.0, 3],
            [6.0, 5.0, 1.3, 7.0],
            [9.5, 3.0, 1.3, 7.5],
            [10.8, 9.0, 6.2, 1],
            [19.0, 11.0, 7.5, 4],
            [28.5, 4.5, 1.3, 8.5],
            [32.2, 2.5, 1.3, 8.0],
            [35.2, 6.8, 6.8, 8.2]
        ],
        invisBlocks: [[17.5, 7.5], [26.8, 8.0], [33.8, 4.8]],
        fallingFloors: [[14.5, 9.0, 2.2, 1], [23.8, 11.0, 2.2, 1]],
        spikeTraps: [
            { x: 4.0, y: 11.2, w: 1, dir: 'up', triggerX: 3.1 },
            { x: 21.0, y: 0, w: 1.3, dir: 'down', triggerX: 19.8 }
        ],
        enemies: [
            { x: 11.5, y: 8.2, minX: 11.0, maxX: 14.2, speed: 2.0, type: 'evad_bot' },
            { x: 19.8, y: 10.2, minX: 19.2, maxX: 23.5, speed: 2.2, type: 'mimic' },
            { x: 22.2, y: 10.2, minX: 19.2, maxX: 23.5, speed: 2.1, trollJump: true },
            { x: 36.2, y: 6.0, minX: 35.5, maxX: 39.2, speed: 2.2, type: 'evad_bot' }
        ],
        fakeGoals: []
    },
    {
        name: "38. Wieże Strażnicze",
        theme: "darkforest",
        width: 42,
        spawn: [1.5, 10],
        goal: [39.5, 8],
        solids: [
            [0, 12, 6.0, 3],
            [8.2, 10.5, 7.0, 4.5],
            [17.5, 9.0, 7.0, 6.0],
            [19.5, 5.5, 3.2, 0.6],
            [26.8, 10.5, 7.0, 4.5],
            [35.8, 9.8, 6.2, 5.2]
        ],
        invisBlocks: [[6.8, 7.5], [16.0, 6.0], [25.2, 6.5], [34.2, 6.8]],
        fallingFloors: [[12.8, 10.5, 2.0, 1], [31.2, 10.5, 2.0, 1]],
        spikeTraps: [
            { x: 4.0, y: 11.2, w: 1, dir: 'up', triggerX: 3.2 },
            { x: 36.5, y: 9.0, w: 1, dir: 'up', triggerX: 35.6 }
        ],
        enemies: [
            { x: 9.0, y: 9.7, minX: 8.5, maxX: 12.5, speed: 2.1, type: 'evad_bot' },
            { x: 11.5, y: 9.7, minX: 8.5, maxX: 12.5, speed: 2.1, type: 'mimic' },
            { x: 18.5, y: 8.2, minX: 17.8, maxX: 24.0, speed: 2.2, type: 'evad_bot' },
            { x: 22.5, y: 8.2, minX: 17.8, maxX: 24.0, speed: 2.1, type: 'mimic' },
            { x: 27.8, y: 9.7, minX: 27.0, maxX: 31.0, speed: 2.2, type: 'evad_bot' }
        ],
        fakeGoals: []
    },
    {
        name: "39. Fosa Zamkowa",
        theme: "darkforest",
        width: 42,
        spawn: [1.5, 10],
        goal: [39.5, 10],
        solids: [
            [0, 12, 5.5, 3],
            [8.0, 4.5, 1.3, 8.5],
            [12.5, 2.5, 1.3, 8.0],
            [16.8, 4.5, 1.3, 8.5],
            [20.2, 10.2, 6.5, 4.8],
            [29.2, 4.0, 1.3, 8.5],
            [33.8, 12, 8.2, 3]
        ],
        invisBlocks: [[10.2, 4.2], [18.5, 6.5], [31.5, 7.5]],
        fallingFloors: [[24.2, 10.2, 2.2, 1], [34.5, 12, 2.2, 3]],
        spikeTraps: [{ x: 37.2, y: 11.2, w: 1, dir: 'up', triggerX: 36.3 }],
        enemies: [
            { x: 21.0, y: 9.4, minX: 20.5, maxX: 24.0, speed: 2.2, type: 'evad_bot' },
            { x: 23.0, y: 9.4, minX: 20.5, maxX: 24.0, speed: 2.1, type: 'mimic' },
            { x: 38.2, y: 11.2, minX: 38.0, maxX: 39.3, speed: 2.2, type: 'evad_bot' }
        ],
        fakeGoals: []
    },
    {
        name: "40. Brama Zamku Evada",
        theme: "darkforest",
        hasCastleGate: true,
        width: 44,
        spawn: [1.5, 10],
        goal: [40.5, 9.8],
        solids: [
            [0, 12, 6.0, 3],
            [12.0, 10, 6.0, 5],
            [20.5, 8, 6.0, 7],
            [29.0, 11.5, 15, 3.5],
            [35.2, 4.0, 1.3, 5.5]
        ],
        invisBlocks: [[7.5, 8.5], [10.0, 7.5], [18.5, 7.0], [27.0, 6.0]],
        fallingFloors: [[6.0, 12, 3, 1], [9.0, 11, 3, 1], [30.0, 11.5, 2.5, 3.5]],
        spikeTraps: [
            { x: 14.0, y: 9.2, w: 1, dir: 'up', triggerX: 13.0 },
            { x: 22.5, y: 0, w: 1.3, dir: 'down', triggerX: 21.2 }
        ],
        enemies: [
            { x: 12.8, y: 9.2, minX: 12.2, maxX: 17.5, speed: 2.2, type: 'evad_bot' },
            { x: 16.2, y: 9.2, minX: 12.2, maxX: 17.5, speed: 2.1, type: 'mimic' },
            { x: 21.5, y: 7.2, minX: 20.8, maxX: 26.0, speed: 2.3, type: 'evad_bot' },
            { x: 24.8, y: 7.2, minX: 20.8, maxX: 26.0, speed: 2.2, trollJump: true },
            { x: 37.5, y: 10.7, minX: 36.8, maxX: 39.8, speed: 2.2, type: 'evad_bot' }
        ],
        fakeGoals: [[33.2, 9.7]]
    },

    // ========================================================================
    // ROZDZIAŁ 1 - SEKCJA 4: WNĘTRZE ZAMKU EVADA (POZIOMY 41 - 50)
    // ========================================================================
    {
        name: "41. Przedsionek Zamku",
        theme: "castle",
        chapterTitle: "SEKCJA 4: ZAMEK EVADA",
        width: 42,
        spawn: [1.5, 10],
        goal: [39.0, 8],
        solids: [
            [0, 12, 6.5, 3],
            [9.0, 11, 7.0, 4],
            [11.0, 7.2, 3.5, 0.6],
            [18.5, 9.5, 7.5, 5.5],
            [20.5, 5.8, 3.5, 0.6],
            [28.5, 11, 5.5, 4],
            [35.8, 9.8, 6.2, 5.2]
        ],
        invisBlocks: [[7.5, 8.2], [17.0, 6.8], [27.0, 7.5], [34.2, 6.8]],
        fallingFloors: [[14.0, 11, 2.0, 1], [31.5, 11, 2.0, 1]],
        spikeTraps: [
            { x: 4.2, y: 11.2, w: 1, dir: 'up', triggerX: 3.3 },
            { x: 22.0, y: 0, w: 1.3, dir: 'down', triggerX: 20.8 },
            { x: 36.5, y: 9.0, w: 1, dir: 'up', triggerX: 35.6 }
        ],
        enemies: [
            { x: 9.8, y: 10.2, minX: 9.2, maxX: 13.8, speed: 2.2, type: 'evad_bot' },
            { x: 12.8, y: 10.2, minX: 9.2, maxX: 13.8, speed: 2.2, type: 'mimic' },
            { x: 19.5, y: 8.7, minX: 18.8, maxX: 25.5, speed: 2.2, type: 'evad_bot' },
            { x: 23.8, y: 8.7, minX: 18.8, maxX: 25.5, speed: 2.2, type: 'mimic' },
            { x: 29.2, y: 10.2, minX: 28.8, maxX: 31.2, speed: 2.2, type: 'evad_bot' }
        ],
        fakeGoals: []
    },
    {
        name: "42. Zbrojownia Evada",
        theme: "castle",
        width: 42,
        spawn: [1.5, 10],
        goal: [39.0, 10],
        solids: [
            [0, 12, 5.5, 3],
            [5.5, 2.0, 21.5, 6.6],
            [8.8, 12, 5.8, 3],
            [17.5, 12, 6.0, 3],
            [27.0, 4.5, 1.3, 8.5],
            [31.0, 2.5, 1.3, 8.0],
            [34.0, 12, 8.0, 3],
            [35.5, 8.4, 3.2, 0.6]
        ],
        invisBlocks: [[25.5, 8.8], [32.5, 7.5]],
        fallingFloors: [[12.5, 12, 2.0, 3], [21.2, 12, 2.0, 3], [34.8, 12, 2.0, 3]],
        spikeTraps: [
            { x: 9.5, y: 11.2, w: 1, dir: 'up', triggerX: 8.6 },
            { x: 18.2, y: 11.2, w: 1, dir: 'up', triggerX: 17.4 }
        ],
        enemies: [
            { x: 10.8, y: 11.2, minX: 10.4, maxX: 12.3, speed: 2.1, type: 'mimic' },
            { x: 19.5, y: 11.2, minX: 19.1, maxX: 21.0, speed: 2.1, type: 'evad_bot' },
            { x: 37.2, y: 11.2, minX: 36.8, maxX: 38.8, speed: 2.2, type: 'evad_bot' },
            { x: 36.0, y: 7.6, minX: 35.6, maxX: 38.2, speed: 2.1, type: 'mimic' }
        ],
        fakeGoals: []
    },
    {
        name: "43. Szyb Wspinaczkowy",
        theme: "castle",
        width: 42,
        spawn: [1.5, 10],
        goal: [39.0, 4.5],
        solids: [
            [0, 12, 6.0, 3],
            [6.0, 4.0, 1.3, 9.0],
            [9.8, 2.0, 1.3, 8.5],
            [13.5, 4.0, 1.3, 9.0],
            [16.5, 10.2, 6.5, 4.8],
            [25.5, 3.5, 1.3, 9.5],
            [29.5, 1.8, 1.3, 8.5],
            [33.5, 6.2, 8.5, 8.8]
        ],
        invisBlocks: [[11.5, 4.2], [23.8, 6.8], [31.5, 4.5]],
        fallingFloors: [[20.5, 10.2, 2.2, 1]],
        spikeTraps: [
            { x: 3.8, y: 11.2, w: 1, dir: 'up', triggerX: 3.0 },
            { x: 34.5, y: 5.4, w: 1, dir: 'up', triggerX: 33.6 }
        ],
        enemies: [
            { x: 17.5, y: 9.4, minX: 16.8, maxX: 20.2, speed: 2.2, type: 'evad_bot' },
            { x: 19.2, y: 9.4, minX: 16.8, maxX: 20.2, speed: 2.2, type: 'mimic' },
            { x: 36.2, y: 5.4, minX: 35.8, maxX: 38.8, speed: 2.2, type: 'evad_bot' },
            { x: 38.0, y: 5.4, minX: 35.8, maxX: 38.8, speed: 2.2, type: 'mimic' }
        ],
        fakeGoals: []
    },
    {
        name: "44. Sala Lustrzana",
        theme: "castle",
        width: 42,
        spawn: [1.5, 10],
        goal: [39.0, 10],
        solids: [
            [0, 12, 6.5, 3],
            [9.0, 12, 9.0, 3],
            [11.0, 8.0, 4.5, 0.6],
            [20.5, 12, 9.0, 3],
            [22.5, 8.0, 4.5, 0.6],
            [32.0, 12, 10.0, 3]
        ],
        invisBlocks: [[7.5, 8.5], [19.0, 8.5], [30.5, 8.5]],
        fallingFloors: [[33.0, 12, 2.2, 3]],
        spikeTraps: [
            { x: 13.5, y: 0, w: 1.3, dir: 'down', triggerX: 12.2 },
            { x: 25.0, y: 0, w: 1.3, dir: 'down', triggerX: 23.8 }
        ],
        enemies: [
            { x: 10.2, y: 11.2, minX: 9.3, maxX: 17.5, speed: 2.2, type: 'mimic' },
            { x: 16.0, y: 11.2, minX: 9.3, maxX: 17.5, speed: 2.2, type: 'evad_bot' },
            { x: 12.0, y: 7.2, minX: 11.2, maxX: 15.0, speed: 2.1, type: 'mimic' },
            { x: 21.8, y: 11.2, minX: 20.8, maxX: 29.0, speed: 2.2, type: 'mimic' },
            { x: 27.5, y: 11.2, minX: 20.8, maxX: 29.0, speed: 2.2, type: 'evad_bot' },
            { x: 36.2, y: 11.2, minX: 35.5, maxX: 38.8, speed: 2.2, type: 'evad_bot' }
        ],
        fakeGoals: []
    },
    {
        name: "45. Zapadające Sklepienie",
        theme: "castle",
        width: 42,
        spawn: [1.5, 9],
        goal: [39.5, 9],
        solids: [
            [0, 11, 5.5, 4],
            [13.5, 7.0, 4.5, 0.7],
            [24.5, 7.0, 4.5, 0.7],
            [34.5, 11, 7.5, 4]
        ],
        invisBlocks: [[10.5, 6.8], [21.5, 6.8]],
        fallingFloors: [
            [5.5, 11, 3.2, 0.8],
            [9.2, 11, 3.2, 0.8],
            [14.8, 10.5, 3.2, 0.8],
            [19.0, 10.5, 3.2, 0.8],
            [25.5, 11, 3.2, 0.8],
            [29.8, 11, 4.0, 0.8]
        ],
        spikeTraps: [
            { x: 12.0, y: 0, w: 1.3, dir: 'down', triggerX: 10.8 },
            { x: 20.0, y: 0, w: 1.3, dir: 'down', triggerX: 18.8 },
            { x: 28.0, y: 0, w: 1.3, dir: 'down', triggerX: 26.8 },
            { x: 35.5, y: 10.2, w: 1, dir: 'up', triggerX: 34.6 }
        ],
        enemies: [
            { x: 14.5, y: 6.2, minX: 13.8, maxX: 17.5, speed: 2.1, type: 'evad_bot' },
            { x: 25.5, y: 6.2, minX: 24.8, maxX: 28.5, speed: 2.1, type: 'evad_bot' },
            { x: 37.2, y: 10.2, minX: 36.8, maxX: 39.2, speed: 2.3, type: 'evad_bot' },
            { x: 38.5, y: 10.2, minX: 36.8, maxX: 39.2, speed: 2.2, type: 'mimic' }
        ],
        fakeGoals: []
    },
    {
        name: "46. Korytarz Cieni",
        theme: "castle",
        width: 42,
        spawn: [1.5, 10],
        goal: [16.5, 2.8],
        solids: [
            [0, 12, 8.0, 3],
            [10.5, 12, 11.5, 3],
            [13.0, 8.2, 5.5, 0.7],
            [24.5, 12, 10.5, 3],
            [26.5, 4.2, 1.3, 6.8],
            [22.0, 2.5, 1.3, 6.5],
            [15.0, 4.6, 5.0, 0.8]
        ],
        invisBlocks: [[9.0, 8.8], [23.0, 8.8]],
        fallingFloors: [[15.0, 12, 2.5, 3]],
        spikeTraps: [{ x: 19.5, y: 11.2, w: 1, dir: 'up', triggerX: 18.5 }],
        enemies: [
            { x: 11.5, y: 11.2, minX: 10.8, maxX: 14.8, speed: 2.2, type: 'evad_bot' },
            { x: 14.0, y: 7.4, minX: 13.2, maxX: 18.0, speed: 2.1, type: 'mimic' },
            { x: 26.0, y: 11.2, minX: 24.8, maxX: 31.5, speed: 2.3, type: 'evad_bot' },
            { x: 29.8, y: 11.2, minX: 24.8, maxX: 31.5, speed: 2.2, type: 'mimic' }
        ],
        fakeGoals: [[32.5, 10.2]]
    },
    {
        name: "47. Strażnica Evada",
        theme: "castle",
        width: 44,
        spawn: [1.5, 10],
        goal: [41.0, 9],
        solids: [
            [0, 12, 5.5, 3],
            [7.5, 3.8, 1.3, 8.8],
            [12.0, 2.2, 1.3, 8.0],
            [14.8, 10.2, 6.0, 4.8],
            [23.0, 3.8, 1.3, 8.8],
            [27.5, 2.2, 1.3, 8.0],
            [31.8, 4.0, 1.3, 8.5],
            [35.2, 10.8, 8.8, 4.2]
        ],
        invisBlocks: [[9.8, 3.5], [21.2, 6.2], [29.8, 3.5]],
        fallingFloors: [[36.0, 10.8, 2.2, 4.2]],
        spikeTraps: [{ x: 3.8, y: 11.2, w: 1, dir: 'up', triggerX: 3.0 }],
        enemies: [
            { x: 15.5, y: 9.4, minX: 15.0, maxX: 20.2, speed: 2.2, type: 'evad_bot' },
            { x: 18.8, y: 9.4, minX: 15.0, maxX: 20.2, speed: 2.2, type: 'mimic' },
            { x: 38.8, y: 10.0, minX: 38.4, maxX: 40.8, speed: 2.3, type: 'evad_bot' },
            { x: 40.0, y: 10.0, minX: 38.4, maxX: 40.8, speed: 2.2, type: 'mimic' }
        ],
        fakeGoals: []
    },
    {
        name: "48. Królewskie Schody",
        theme: "castle",
        width: 44,
        spawn: [1.5, 10],
        goal: [41.0, 5],
        solids: [
            [0, 12, 6.0, 3],
            [8.2, 10.5, 7.0, 4.5],
            [17.2, 4.5, 1.3, 8.5],
            [21.0, 2.5, 1.3, 8.0],
            [22.3, 8.8, 7.0, 1],
            [31.5, 4.0, 1.3, 8.5],
            [35.2, 2.0, 1.3, 7.5],
            [38.0, 6.8, 6.0, 8.2]
        ],
        invisBlocks: [[6.8, 7.8], [15.8, 7.0], [30.0, 6.2]],
        fallingFloors: [[12.5, 10.5, 2.2, 1], [26.5, 8.8, 2.2, 1]],
        spikeTraps: [
            { x: 3.8, y: 11.2, w: 1, dir: 'up', triggerX: 3.0 },
            { x: 38.6, y: 6.0, w: 1, dir: 'up', triggerX: 37.8 }
        ],
        enemies: [
            { x: 9.0, y: 9.7, minX: 8.5, maxX: 12.2, speed: 2.2, type: 'evad_bot' },
            { x: 11.2, y: 9.7, minX: 8.5, maxX: 12.2, speed: 2.2, type: 'mimic' },
            { x: 23.0, y: 8.0, minX: 22.5, maxX: 26.2, speed: 2.2, type: 'mimic' },
            { x: 25.2, y: 8.0, minX: 22.5, maxX: 26.2, speed: 2.2, type: 'evad_bot' },
            { x: 40.0, y: 6.0, minX: 39.8, maxX: 40.9, speed: 2.3, type: 'evad_bot' }
        ],
        fakeGoals: []
    },
    {
        name: "49. Wrota Sali Tronowej",
        theme: "castle",
        hasCastleGate: true,
        width: 44,
        spawn: [1.5, 10],
        goal: [40.5, 9.8],
        solids: [
            [0, 12, 6.0, 3],
            [8.2, 4.5, 1.3, 8.0],
            [11.8, 10, 6.5, 5],
            [20.2, 8, 6.5, 7],
            [22.0, 4.8, 3.2, 0.6],
            [29.0, 11.5, 15, 3.5],
            [35.2, 3.8, 1.3, 5.7]
        ],
        invisBlocks: [[6.8, 7.5], [18.5, 7.0], [27.2, 6.0]],
        fallingFloors: [[6.0, 12, 2.2, 1], [30.0, 11.5, 2.5, 3.5]],
        spikeTraps: [
            { x: 14.0, y: 9.2, w: 1, dir: 'up', triggerX: 13.0 },
            { x: 22.8, y: 0, w: 1.3, dir: 'down', triggerX: 21.5 },
            { x: 36.8, y: 10.7, w: 1, dir: 'up', triggerX: 36.0 }
        ],
        enemies: [
            { x: 12.2, y: 9.2, minX: 12.0, maxX: 17.8, speed: 2.3, type: 'evad_bot' },
            { x: 16.5, y: 9.2, minX: 12.0, maxX: 17.8, speed: 2.3, type: 'mimic' },
            { x: 21.0, y: 7.2, minX: 20.5, maxX: 26.2, speed: 2.3, type: 'mimic' },
            { x: 25.0, y: 7.2, minX: 20.5, maxX: 26.2, speed: 2.3, type: 'evad_bot' },
            { x: 38.2, y: 10.7, minX: 38.0, maxX: 39.8, speed: 2.3, type: 'evad_bot' }
        ],
        fakeGoals: [[33.2, 9.7]]
    },
    {
        name: "50. ZAMEK EVADA: MEGA-ROBO EVAD",
        theme: "castle",
        chapterTitle: "FINAŁ ROZDZIAŁU 1: ZAMEK EVADA",
        width: 20,
        spawn: [2.5, 10],
        goal: null,
        solids: [
            [0, 12.5, 20, 2.5],
            [0, 0, 1, 15],
            [19, 0, 1, 15],
            [2.4, 9.0, 3.8, 0.6],
            [13.8, 9.0, 3.8, 0.6],
            [8.1, 6.2, 3.8, 0.6]
        ],
        invisBlocks: [],
        fallingFloors: [],
        spikeTraps: [],
        enemies: [],
        fakeGoals: [],
        isBossLevel: true
    },

    // ========================================================================
    // ROZDZIAŁ 2 - SEKCJA 1: PODWODNA RZEKA I KASKADY (POZIOMY 51 - 60)
    // ========================================================================
    {
        name: "51. Zatopiony Loch Zamku",
        theme: "underwater_castle",
        isUnderwater: true,
        chapterTitle: "ROZDZIAŁ 2 • SEKCJA 1: GŁĘBINY POD ZAMKIEM",
        width: 34,
        spawn: [1.8, 10.2],
        goal: [31.2, 6.2],
        solids: [
            [0, 12, 9.5, 3],
            [4.5, 0, 1.4, 7.5],
            [11.5, 9.5, 4.5, 5.5],
            [18.0, 11.5, 6.5, 3.5],
            [20.0, 6.0, 4.0, 0.7],
            [26.5, 8.0, 7.5, 7.0]
        ],
        invisBlocks: [[10.0, 6.5]],
        fallingFloors: [[18.5, 11.5, 2.2, 3.5]],
        spikeTraps: [{ x: 13.2, y: 8.7, w: 1, dir: 'up', triggerX: 12.2 }],
        enemies: [
            { x: 15.0, y: 6.2, minX: 12.0, maxX: 19.0, speed: 1.7, type: 'robo_fish' },
            { x: 22.0, y: 8.5, minX: 18.5, maxX: 25.5, speed: 1.8, type: 'robo_fish' }
        ],
        fakeGoals: []
    },
    {
        name: "52. Zalana Kolumnada",
        theme: "underwater_castle",
        isUnderwater: true,
        width: 36,
        spawn: [1.5, 10],
        goal: [33.2, 4.8],
        solids: [
            [0, 12, 5.5, 3],
            [7.2, 8.8, 3.2, 6.2],
            [12.2, 6.2, 3.2, 8.8],
            [17.5, 9.8, 4.5, 5.2],
            [23.8, 6.8, 3.5, 8.2],
            [29.2, 6.6, 6.8, 8.4]
        ],
        invisBlocks: [[10.8, 4.5], [22.0, 5.0]],
        fallingFloors: [[18.5, 9.8, 2.2, 5.2]],
        spikeTraps: [{ x: 30.2, y: 5.8, w: 1, dir: 'up', triggerX: 29.4 }],
        enemies: [
            { x: 9.5, y: 5.2, minX: 6.5, maxX: 15.5, speed: 1.8, type: 'robo_fish' },
            { x: 19.5, y: 6.5, minX: 16.5, maxX: 23.5, speed: 1.9, type: 'robo_fish' },
            { x: 27.0, y: 4.5, minX: 24.5, maxX: 29.0, speed: 1.9, type: 'robo_fish' }
        ],
        fakeGoals: []
    },
    {
        name: "53. Pęknięty Akwedukt",
        theme: "underwater_castle",
        isUnderwater: true,
        width: 38,
        spawn: [1.5, 10],
        goal: [35.0, 3.6],
        solids: [
            [0, 12, 7.0, 3],
            [7.0, 4.5, 14.0, 1.2],
            [9.0, 12.2, 11.5, 2.8],
            [23.0, 9.2, 5.5, 5.8],
            [22.5, 2.0, 1.3, 5.5],
            [30.0, 5.4, 8.0, 9.6]
        ],
        invisBlocks: [[21.2, 7.2]],
        fallingFloors: [[13.5, 12.2, 2.5, 2.8]],
        spikeTraps: [
            { x: 11.0, y: 5.7, w: 1.3, dir: 'down', triggerX: 9.8 },
            { x: 17.0, y: 5.7, w: 1.3, dir: 'down', triggerX: 15.8 }
        ],
        enemies: [
            { x: 12.0, y: 9.5, minX: 9.2, maxX: 19.5, speed: 1.8, type: 'robo_fish' },
            { x: 14.0, y: 2.5, minX: 8.0, maxX: 20.0, speed: 1.9, type: 'robo_fish' },
            { x: 26.0, y: 6.0, minX: 23.5, maxX: 29.5, speed: 2.0, type: 'robo_fish' }
        ],
        fakeGoals: [[33.5, 10.2]]
    },
    {
        name: "54. Piasek Pod Murami",
        theme: "underwater_castle",
        transitionToTheme: "underwater_sand",
        isUnderwater: true,
        width: 38,
        spawn: [1.5, 9.5],
        goal: [35.2, 8.2],
        solids: [
            [0, 11.5, 6.5, 3.5],
            [8.5, 12.2, 7.5, 2.8],
            [11.0, 7.5, 4.5, 0.7],
            [18.0, 10.5, 6.5, 4.5],
            [26.5, 10.0, 11.5, 5.0]
        ],
        invisBlocks: [[7.2, 8.0], [16.8, 7.2]],
        fallingFloors: [[27.5, 10.0, 2.4, 5.0]],
        spikeTraps: [{ x: 20.5, y: 9.7, w: 1, dir: 'up', triggerX: 19.6 }],
        enemies: [
            { x: 10.5, y: 9.8, minX: 8.8, maxX: 15.5, speed: 1.9, type: 'robo_fish' },
            { x: 21.0, y: 6.8, minX: 18.2, maxX: 25.5, speed: 1.9, type: 'robo_fish' },
            { x: 31.2, y: 9.2, minX: 30.2, maxX: 34.8, speed: 1.9, type: 'mimic' }
        ],
        fakeGoals: []
    },
    {
        name: "55. Piaszczysty Rów",
        theme: "underwater_sand",
        isUnderwater: true,
        width: 38,
        spawn: [1.5, 6.5],
        goal: [35.2, 6.2],
        solids: [
            [0, 8.5, 6.0, 6.5],
            [8.0, 12.5, 9.5, 2.5],
            [11.5, 8.2, 3.5, 0.7],
            [19.5, 11.0, 7.0, 4.0],
            [28.5, 8.0, 9.5, 7.0]
        ],
        invisBlocks: [[17.8, 8.0], [27.0, 5.5]],
        fallingFloors: [[10.5, 12.5, 2.5, 2.5]],
        spikeTraps: [{ x: 22.5, y: 10.2, w: 1, dir: 'up', triggerX: 21.6 }],
        enemies: [
            { x: 9.5, y: 9.8, minX: 8.2, maxX: 16.8, speed: 1.9, type: 'robo_fish' },
            { x: 15.0, y: 5.5, minX: 11.0, maxX: 18.5, speed: 1.9, type: 'robo_fish' },
            { x: 23.0, y: 7.5, minX: 19.8, maxX: 27.5, speed: 2.0, type: 'robo_fish' }
        ],
        fakeGoals: []
    },
    {
        name: "56. Ławica Robo-Piranii",
        theme: "underwater_sand",
        isUnderwater: true,
        width: 40,
        spawn: [1.5, 10],
        goal: [37.2, 7.2],
        solids: [
            [0, 12, 6.0, 3],
            [8.0, 10.2, 5.0, 0.8],
            [15.0, 7.8, 5.0, 0.8],
            [15.0, 12.2, 6.0, 2.8],
            [23.0, 9.5, 5.0, 0.8],
            [30.5, 9.0, 9.5, 6.0]
        ],
        invisBlocks: [[6.8, 7.5], [21.5, 6.8]],
        fallingFloors: [[8.0, 10.2, 2.2, 0.8], [23.0, 9.5, 2.2, 0.8]],
        spikeTraps: [{ x: 32.0, y: 8.2, w: 1, dir: 'up', triggerX: 31.1 }],
        enemies: [
            { x: 10.0, y: 7.2, minX: 7.5, maxX: 14.5, speed: 1.9, type: 'robo_fish' },
            { x: 17.5, y: 5.2, minX: 14.5, maxX: 21.5, speed: 2.0, type: 'robo_fish' },
            { x: 17.5, y: 10.5, minX: 15.2, maxX: 20.5, speed: 1.9, type: 'robo_fish' },
            { x: 26.0, y: 6.8, minX: 22.5, maxX: 29.8, speed: 2.0, type: 'robo_fish' }
        ],
        fakeGoals: []
    },
    {
        name: "57. Wydmy Prądowe",
        theme: "underwater_sand",
        isUnderwater: true,
        width: 40,
        spawn: [1.5, 10.5],
        goal: [37.2, 4.8],
        solids: [
            [0, 12.2, 6.0, 2.8],
            [12.5, 9.8, 4.5, 5.2],
            [22.5, 7.8, 4.5, 7.2],
            [32.0, 6.6, 8.0, 8.4]
        ],
        invisBlocks: [[10.8, 6.8], [20.8, 5.0]],
        fallingFloors: [
            [6.2, 11.2, 2.8, 0.8],
            [9.4, 10.5, 2.8, 0.8],
            [17.4, 9.0, 2.4, 0.8],
            [20.0, 8.4, 2.2, 0.8],
            [27.4, 7.2, 2.2, 0.8],
            [29.8, 6.8, 2.0, 0.8]
        ],
        spikeTraps: [{ x: 33.5, y: 5.8, w: 1, dir: 'up', triggerX: 32.6 }],
        enemies: [
            { x: 13.5, y: 6.5, minX: 11.5, maxX: 18.0, speed: 1.9, type: 'robo_fish' },
            { x: 23.5, y: 4.8, minX: 21.5, maxX: 28.0, speed: 2.0, type: 'robo_fish' },
            { x: 35.0, y: 5.8, minX: 34.6, maxX: 37.0, speed: 1.9, type: 'mimic' }
        ],
        fakeGoals: []
    },
    {
        name: "58. Koralowy Labirynt",
        theme: "underwater_sand",
        isUnderwater: true,
        width: 40,
        spawn: [1.5, 10],
        goal: [13.5, 2.6],
        solids: [
            [0, 12, 8.5, 3],
            [10.5, 12, 12.5, 3],
            [11.5, 7.2, 9.5, 1.0],
            [25.0, 11.5, 11.0, 3.5],
            [27.5, 3.5, 1.3, 6.8],
            [23.0, 2.2, 1.3, 6.2],
            [12.0, 4.4, 7.5, 0.8]
        ],
        invisBlocks: [[9.2, 8.5], [23.8, 8.2]],
        fallingFloors: [[15.5, 12, 2.5, 3]],
        spikeTraps: [{ x: 20.0, y: 11.2, w: 1, dir: 'up', triggerX: 19.0 }],
        enemies: [
            { x: 13.0, y: 9.8, minX: 11.0, maxX: 21.5, speed: 1.9, type: 'robo_fish' },
            { x: 15.0, y: 5.2, minX: 11.8, maxX: 20.5, speed: 1.9, type: 'robo_fish' },
            { x: 28.5, y: 8.8, minX: 25.5, maxX: 33.5, speed: 2.0, type: 'robo_fish' }
        ],
        fakeGoals: [[33.5, 9.7]]
    },
    {
        name: "59. Pionowy Wodospad",
        theme: "underwater_sand",
        isUnderwater: true,
        width: 36,
        spawn: [1.5, 10.5],
        goal: [32.5, 3.2],
        solids: [
            [0, 12.2, 7.0, 2.8],
            [7.0, 5.5, 1.3, 8.5],
            [11.2, 3.0, 1.3, 8.0],
            [12.5, 9.5, 5.5, 5.5],
            [20.0, 4.5, 1.3, 9.5],
            [24.2, 2.0, 1.3, 8.5],
            [27.5, 5.0, 8.5, 10.0]
        ],
        invisBlocks: [[18.5, 6.8], [26.0, 3.8]],
        fallingFloors: [[28.0, 5.0, 2.0, 10.0]],
        spikeTraps: [{ x: 14.5, y: 8.7, w: 1, dir: 'up', triggerX: 13.6 }],
        enemies: [
            { x: 9.0, y: 4.5, minX: 7.5, maxX: 12.0, speed: 1.8, type: 'robo_fish' },
            { x: 15.5, y: 6.2, minX: 12.8, maxX: 19.2, speed: 1.9, type: 'robo_fish' },
            { x: 22.0, y: 3.5, minX: 20.5, maxX: 25.0, speed: 1.9, type: 'robo_fish' }
        ],
        fakeGoals: []
    },
    {
        name: "60. Ku Płytkiej Wodzie",
        theme: "underwater_sand",
        transitionToTheme: "underwater_shallows",
        isUnderwater: true,
        width: 40,
        spawn: [1.5, 11.0],
        goal: [37.0, 3.4],
        solids: [
            [0, 12.5, 6.0, 2.5],
            [7.8, 10.8, 5.5, 4.2],
            [15.2, 9.0, 5.5, 6.0],
            [22.6, 7.2, 5.5, 7.8],
            [30.0, 5.2, 10.0, 9.8]
        ],
        invisBlocks: [[6.5, 8.2], [14.0, 6.5], [21.4, 4.8], [28.8, 3.2]],
        fallingFloors: [[31.0, 5.2, 2.2, 9.8]],
        spikeTraps: [{ x: 34.0, y: 4.4, w: 1, dir: 'up', triggerX: 33.1 }],
        enemies: [
            { x: 9.5, y: 8.0, minX: 8.0, maxX: 13.5, speed: 1.9, type: 'robo_fish' },
            { x: 17.0, y: 6.2, minX: 15.4, maxX: 20.8, speed: 2.0, type: 'robo_fish' },
            { x: 24.5, y: 4.5, minX: 22.8, maxX: 28.2, speed: 2.0, type: 'robo_fish' },
            { x: 35.2, y: 4.4, minX: 35.0, maxX: 36.8, speed: 2.0, type: 'mimic' }
        ],
        fakeGoals: []
    },

    // ========================================================================
    // ROZDZIAŁ 2 - SEKCJA 2: ZATOPIONA DŻUNGLA I KORONY DRZEW (POZIOMY 61 - 70)
    // ========================================================================
    {
        name: "61. Mętne Korzenie",
        theme: "underwater_shallows",
        isUnderwater: true,
        chapterTitle: "ROZDZIAŁ 2 • SEKCJA 2: ZATOPIONA DŻUNGLA",
        width: 40,
        spawn: [1.5, 10],
        goal: [37.2, 6.8],
        solids: [
            [0, 12, 7.0, 3],
            [9.0, 10.5, 6.5, 4.5],
            [11.0, 6.5, 4.0, 0.7],
            [17.8, 9.2, 6.5, 5.8],
            [26.5, 10.8, 5.5, 4.2],
            [33.8, 8.6, 6.2, 6.4]
        ],
        invisBlocks: [[7.8, 7.8], [16.4, 6.5], [32.2, 6.0]],
        fallingFloors: [[13.2, 10.5, 2.0, 4.5], [28.5, 10.8, 2.0, 4.2]],
        spikeTraps: [{ x: 20.5, y: 8.4, w: 1, dir: 'up', triggerX: 19.6 }],
        enemies: [
            { x: 10.5, y: 8.2, minX: 9.2, maxX: 15.2, speed: 2.0, type: 'robo_fish' },
            { x: 19.5, y: 6.2, minX: 18.0, maxX: 24.0, speed: 2.0, type: 'robo_fish' },
            { x: 28.0, y: 7.5, minX: 26.8, maxX: 32.0, speed: 2.0, type: 'robo_fish' }
        ],
        fakeGoals: []
    },
    {
        name: "62. Zatopiona Grobla",
        theme: "underwater_shallows",
        isUnderwater: true,
        width: 40,
        spawn: [1.5, 9.5],
        goal: [37.2, 8.2],
        solids: [
            [0, 11.5, 5.5, 3.5],
            [10.5, 6.5, 5.0, 0.7],
            [21.5, 6.0, 5.0, 0.7],
            [32.5, 10.0, 7.5, 5.0]
        ],
        invisBlocks: [[8.5, 6.2], [19.5, 5.8]],
        fallingFloors: [
            [5.8, 11.5, 3.2, 0.9],
            [9.5, 11.2, 3.2, 0.9],
            [13.5, 11.5, 3.2, 0.9],
            [17.5, 11.0, 3.2, 0.9],
            [21.5, 11.5, 3.2, 0.9],
            [25.5, 11.0, 3.2, 0.9],
            [29.2, 10.5, 2.8, 0.9]
        ],
        spikeTraps: [{ x: 33.8, y: 9.2, w: 1, dir: 'up', triggerX: 33.0 }],
        enemies: [
            { x: 8.0, y: 8.5, minX: 6.0, maxX: 13.5, speed: 1.9, type: 'robo_fish' },
            { x: 17.5, y: 8.2, minX: 14.5, maxX: 21.0, speed: 2.0, type: 'robo_fish' },
            { x: 26.5, y: 8.0, minX: 23.0, maxX: 30.5, speed: 2.0, type: 'robo_fish' },
            { x: 35.5, y: 9.2, minX: 35.0, maxX: 37.0, speed: 2.0, type: 'mimic' }
        ],
        fakeGoals: []
    },
    {
        name: "63. Podwodny Gąszcz",
        theme: "underwater_shallows",
        isUnderwater: true,
        width: 40,
        spawn: [1.5, 10],
        goal: [37.2, 4.5],
        solids: [
            [0, 12, 6.0, 3],
            [6.0, 4.2, 1.3, 8.8],
            [10.0, 0, 1.3, 8.2],
            [10.0, 11.8, 5.5, 3.2],
            [17.5, 5.0, 1.3, 10.0],
            [21.5, 0, 1.3, 7.8],
            [21.5, 11.2, 6.0, 3.8],
            [29.5, 3.5, 1.3, 8.5],
            [33.5, 6.2, 6.5, 8.8]
        ],
        invisBlocks: [[15.8, 7.0], [27.8, 6.2]],
        fallingFloors: [[34.2, 6.2, 2.0, 8.8]],
        spikeTraps: [
            { x: 12.2, y: 11.0, w: 1, dir: 'up', triggerX: 11.4 },
            { x: 24.0, y: 10.4, w: 1, dir: 'up', triggerX: 23.2 }
        ],
        enemies: [
            { x: 13.0, y: 8.5, minX: 11.5, maxX: 17.0, speed: 1.9, type: 'robo_fish' },
            { x: 24.5, y: 7.8, minX: 23.0, maxX: 29.0, speed: 2.0, type: 'robo_fish' },
            { x: 36.2, y: 5.4, minX: 36.4, maxX: 37.0, speed: 2.0, type: 'mimic' }
        ],
        fakeGoals: []
    },
    {
        name: "64. Bagienne Dno",
        theme: "underwater_shallows",
        isUnderwater: true,
        width: 42,
        spawn: [1.5, 10],
        goal: [15.5, 2.6],
        solids: [
            [0, 12, 8.0, 3],
            [10.5, 11.5, 11.0, 3.5],
            [13.0, 7.5, 5.5, 0.7],
            [24.0, 11.5, 11.5, 3.5],
            [27.5, 3.5, 1.3, 6.8],
            [23.0, 2.0, 1.3, 6.2],
            [14.0, 4.4, 6.0, 0.8]
        ],
        invisBlocks: [[9.0, 8.2], [22.5, 8.0]],
        fallingFloors: [[15.5, 11.5, 2.5, 3.5]],
        spikeTraps: [{ x: 19.5, y: 10.7, w: 1, dir: 'up', triggerX: 18.6 }],
        enemies: [
            { x: 12.0, y: 10.7, minX: 10.8, maxX: 15.0, speed: 2.0, type: 'mimic' },
            { x: 15.5, y: 5.2, minX: 12.5, maxX: 20.0, speed: 2.0, type: 'robo_fish' },
            { x: 26.5, y: 8.5, minX: 24.5, maxX: 32.0, speed: 2.1, type: 'robo_fish' }
        ],
        fakeGoals: [[33.2, 9.7]]
    },
    {
        name: "65. Tafla Dżungli",
        theme: "underwater_shallows",
        transitionToTheme: "jungle",
        isUnderwater: true,
        width: 40,
        spawn: [1.5, 11.2],
        goal: [36.8, 3.0],
        solids: [
            [0, 12.8, 6.5, 2.2],
            [8.2, 10.8, 5.5, 4.2],
            [15.5, 8.8, 5.5, 6.2],
            [22.8, 6.8, 5.5, 8.2],
            [30.2, 4.8, 9.8, 10.2]
        ],
        invisBlocks: [[7.0, 8.2], [14.2, 6.2], [21.5, 4.2], [28.8, 2.8]],
        fallingFloors: [[31.2, 4.8, 2.2, 10.2]],
        spikeTraps: [{ x: 34.2, y: 4.0, w: 1, dir: 'up', triggerX: 33.4 }],
        enemies: [
            { x: 9.8, y: 8.2, minX: 8.4, maxX: 13.5, speed: 2.0, type: 'robo_fish' },
            { x: 17.2, y: 6.2, minX: 15.8, maxX: 20.8, speed: 2.0, type: 'robo_fish' },
            { x: 24.5, y: 4.2, minX: 23.0, maxX: 28.0, speed: 2.1, type: 'robo_fish' },
            { x: 35.5, y: 4.0, minX: 35.2, maxX: 36.6, speed: 2.1, type: 'evad_bot' }
        ],
        fakeGoals: []
    },
    {
        name: "66. Wyjście na Brzeg",
        theme: "jungle",
        chapterTitle: "ROZDZIAŁ 2 • DŻUNGLA CUBELONU",
        width: 42,
        spawn: [1.5, 10.5],
        goal: [39.0, 4.8],
        solids: [
            [0, 12.2, 7.0, 2.8],
            [9.0, 10.8, 6.5, 4.2],
            [17.5, 9.2, 6.5, 5.8],
            [26.0, 7.8, 6.5, 7.2],
            [34.2, 6.6, 7.8, 8.4]
        ],
        invisBlocks: [[7.6, 8.0], [16.0, 6.5], [24.5, 5.0], [32.8, 4.0]],
        fallingFloors: [[13.0, 10.8, 2.0, 1], [29.8, 7.8, 2.0, 1]],
        spikeTraps: [
            { x: 4.5, y: 11.4, w: 1, dir: 'up', triggerX: 3.6 },
            { x: 35.5, y: 5.8, w: 1, dir: 'up', triggerX: 34.6 }
        ],
        enemies: [
            { x: 10.0, y: 10.0, minX: 9.2, maxX: 12.8, speed: 2.1, type: 'mimic' },
            { x: 18.5, y: 8.4, minX: 17.8, maxX: 23.5, speed: 2.1, type: 'evad_bot' },
            { x: 27.0, y: 7.0, minX: 26.2, maxX: 29.5, speed: 2.1, type: 'mimic' },
            { x: 37.0, y: 5.8, minX: 36.6, maxX: 38.8, speed: 2.1, type: 'evad_bot' }
        ],
        fakeGoals: []
    },
    {
        name: "67. Skarpa Korzeni",
        theme: "jungle",
        width: 42,
        spawn: [1.5, 10.5],
        goal: [39.0, 3.6],
        solids: [
            [0, 12.2, 6.0, 2.8],
            [6.0, 5.0, 1.3, 8.0],
            [9.8, 9.5, 5.5, 1.0],
            [17.2, 3.5, 1.3, 7.5],
            [21.0, 7.5, 6.0, 1.0],
            [29.0, 2.5, 1.3, 7.0],
            [33.0, 5.4, 9.0, 9.6]
        ],
        invisBlocks: [[15.5, 6.5], [27.2, 4.8]],
        fallingFloors: [[13.0, 9.5, 2.0, 1.0], [24.8, 7.5, 2.0, 1.0]],
        spikeTraps: [{ x: 34.2, y: 4.6, w: 1, dir: 'up', triggerX: 33.4 }],
        enemies: [
            { x: 10.5, y: 8.7, minX: 10.0, maxX: 12.8, speed: 2.1, type: 'mimic' },
            { x: 21.8, y: 6.7, minX: 21.2, maxX: 24.5, speed: 2.1, type: 'evad_bot' },
            { x: 36.0, y: 4.6, minX: 35.4, maxX: 38.6, speed: 2.2, type: 'evad_bot' },
            { x: 37.8, y: 4.6, minX: 35.4, maxX: 38.6, speed: 2.1, type: 'mimic' }
        ],
        fakeGoals: []
    },
    {
        name: "68. Wspinaczka po Lianach",
        theme: "jungle",
        width: 42,
        spawn: [1.5, 10.5],
        goal: [39.2, 3.2],
        solids: [
            [0, 12.2, 5.5, 2.8],
            [5.5, 4.5, 1.3, 8.5],
            [9.2, 2.5, 1.3, 8.0],
            [10.5, 8.8, 5.5, 6.2],
            [18.2, 3.5, 1.3, 8.5],
            [22.0, 1.8, 1.3, 7.8],
            [23.3, 7.2, 5.8, 7.8],
            [31.2, 2.5, 1.3, 7.8],
            [35.0, 5.0, 7.0, 10.0]
        ],
        invisBlocks: [[16.5, 5.8], [29.5, 4.5]],
        fallingFloors: [[35.5, 5.0, 2.0, 10.0]],
        spikeTraps: [
            { x: 11.2, y: 8.0, w: 1, dir: 'up', triggerX: 10.4 },
            { x: 24.0, y: 6.4, w: 1, dir: 'up', triggerX: 23.4 }
        ],
        enemies: [
            { x: 13.0, y: 8.0, minX: 12.4, maxX: 15.6, speed: 2.1, type: 'evad_bot' },
            { x: 25.8, y: 6.4, minX: 25.2, maxX: 28.8, speed: 2.2, type: 'mimic' },
            { x: 37.8, y: 4.2, minX: 37.6, maxX: 39.0, speed: 2.2, type: 'evad_bot' }
        ],
        fakeGoals: []
    },
    {
        name: "69. Tarasy Wielkich Drzew",
        theme: "jungle",
        width: 44,
        spawn: [1.5, 10.8],
        goal: [41.2, 3.0],
        solids: [
            [0, 12.5, 6.0, 2.5],
            [8.2, 10.5, 6.5, 1.0],
            [16.8, 8.6, 6.5, 1.0],
            [18.5, 5.0, 3.5, 0.6],
            [25.5, 6.8, 6.5, 1.0],
            [34.2, 4.8, 9.8, 10.2]
        ],
        invisBlocks: [[6.8, 8.0], [15.2, 6.2], [24.0, 4.4], [32.8, 2.8]],
        fallingFloors: [[12.2, 10.5, 2.2, 1.0], [29.5, 6.8, 2.2, 1.0], [35.0, 4.8, 2.2, 10.2]],
        spikeTraps: [{ x: 38.0, y: 4.0, w: 1, dir: 'up', triggerX: 37.2 }],
        enemies: [
            { x: 9.0, y: 9.7, minX: 8.4, maxX: 12.0, speed: 2.1, type: 'mimic' },
            { x: 17.8, y: 7.8, minX: 17.0, maxX: 22.8, speed: 2.2, type: 'evad_bot' },
            { x: 26.5, y: 6.0, minX: 25.8, maxX: 29.2, speed: 2.2, type: 'evad_bot' },
            { x: 39.5, y: 4.0, minX: 39.2, maxX: 41.0, speed: 2.2, type: 'mimic' }
        ],
        fakeGoals: []
    },
    {
        name: "70. Szczyt Koron Cubelonu",
        theme: "jungle",
        width: 44,
        spawn: [1.5, 11.0],
        goal: [41.0, 2.6],
        solids: [
            [0, 12.6, 5.5, 2.4],
            [7.5, 10.6, 6.0, 4.4],
            [15.5, 8.6, 6.0, 6.4],
            [23.5, 6.6, 6.0, 8.4],
            [31.5, 2.0, 1.3, 6.5],
            [35.0, 4.4, 9.0, 10.6]
        ],
        invisBlocks: [[6.2, 8.2], [14.2, 6.2], [22.2, 4.2], [33.2, 2.8]],
        fallingFloors: [[11.2, 10.6, 2.0, 1.0], [19.2, 8.6, 2.0, 1.0], [27.2, 6.6, 2.0, 1.0]],
        spikeTraps: [
            { x: 36.0, y: 3.6, w: 1, dir: 'up', triggerX: 35.2 }
        ],
        enemies: [
            { x: 8.2, y: 9.8, minX: 7.8, maxX: 11.0, speed: 2.1, type: 'evad_bot' },
            { x: 16.2, y: 7.8, minX: 15.8, maxX: 19.0, speed: 2.2, type: 'mimic' },
            { x: 24.2, y: 5.8, minX: 23.8, maxX: 27.0, speed: 2.2, type: 'evad_bot' },
            { x: 37.8, y: 3.6, minX: 37.2, maxX: 40.6, speed: 2.2, type: 'evad_bot' },
            { x: 39.5, y: 3.6, minX: 37.2, maxX: 40.6, speed: 2.2, type: 'mimic' }
        ],
        fakeGoals: [[29.8, 4.8]]
    },

    // ========================================================================
    // ROZDZIAŁ 2 - SEKCJA 3: POSTERUNKI JOHNA W DŻUNGLI (POZIOMY 71 - 75)
    // Dave używa Ostrza Rdzeniowego 360° od Jerry'ego przeciwko Jetpack-Botom!
    // ========================================================================
    {
        name: "71. Zwiadowcy z Jetpackiem",
        theme: "jungle_outpost",
        hasWeapon: true,
        hasJohnOutpost: true,
        chapterTitle: "ROZDZIAŁ 2 • SEKCJA 3: POSTERUNKI JOHNA",
        width: 42,
        spawn: [1.5, 10],
        goal: [39.0, 6.2],
        solids: [
            [0, 12, 8.5, 3],
            [10.5, 10.5, 7.5, 4.5],
            [20.0, 9.0, 7.5, 6.0],
            [29.5, 8.0, 12.5, 7.0]
        ],
        invisBlocks: [[9.2, 7.8], [18.5, 6.2]],
        fallingFloors: [[27.8, 9.0, 1.8, 1]],
        spikeTraps: [{ x: 32.0, y: 7.2, w: 1, dir: 'up', triggerX: 31.0 }],
        enemies: [
            { x: 14.0, y: 6.5, minX: 10.5, maxX: 18.0, speed: 2.2, type: 'jetpack_rammer' },
            { x: 23.5, y: 5.0, minX: 20.0, maxX: 27.5, speed: 2.3, type: 'jetpack_rammer' },
            { x: 35.0, y: 4.2, minX: 30.0, maxX: 38.5, speed: 2.4, type: 'jetpack_rammer' }
        ],
        fakeGoals: []
    },
    {
        name: "72. Stalowe Bunkry w Gąszczu",
        theme: "jungle_outpost",
        hasWeapon: true,
        hasJohnOutpost: true,
        width: 44,
        spawn: [1.5, 10],
        goal: [41.0, 5.2],
        solids: [
            [0, 12, 7.0, 3],
            [9.0, 11.0, 8.0, 4.0],
            [11.0, 7.0, 4.5, 0.7],
            [19.5, 9.5, 8.0, 5.5],
            [29.5, 7.0, 14.5, 8.0]
        ],
        invisBlocks: [[7.8, 8.2], [18.0, 6.8]],
        fallingFloors: [[17.2, 11.0, 2.0, 1]],
        spikeTraps: [{ x: 33.5, y: 6.2, w: 1.2, dir: 'up', triggerX: 32.5 }],
        enemies: [
            { x: 13.0, y: 4.5, minX: 9.5, maxX: 17.0, speed: 2.3, type: 'jetpack_rammer' },
            { x: 22.0, y: 5.2, minX: 19.5, maxX: 27.0, speed: 2.4, type: 'jetpack_rammer' },
            { x: 25.5, y: 8.7, minX: 20.0, maxX: 26.8, speed: 2.1, type: 'evad_bot' },
            { x: 37.0, y: 3.5, minX: 31.0, maxX: 40.5, speed: 2.5, type: 'jetpack_rammer' }
        ],
        fakeGoals: []
    },
    {
        name: "73. Korytarz Kamikaze",
        theme: "jungle_outpost",
        hasWeapon: true,
        hasJohnOutpost: true,
        width: 44,
        spawn: [1.5, 10],
        goal: [41.2, 8.2],
        solids: [
            [0, 12, 6.5, 3],
            [8.5, 10.2, 6.5, 4.8],
            [17.0, 8.5, 6.5, 6.5],
            [25.5, 10.2, 6.5, 4.8],
            [34.0, 10.0, 10.0, 5.0]
        ],
        invisBlocks: [[7.2, 7.5], [15.5, 5.8], [24.0, 7.0]],
        fallingFloors: [[32.0, 10.2, 2.0, 1]],
        spikeTraps: [{ x: 20.0, y: 0, w: 1.4, dir: 'down', triggerX: 18.8 }],
        enemies: [
            { x: 11.5, y: 5.8, minX: 8.5, maxX: 15.0, speed: 2.4, type: 'jetpack_rammer' },
            { x: 19.5, y: 4.5, minX: 17.0, maxX: 23.5, speed: 2.5, type: 'jetpack_rammer' },
            { x: 28.5, y: 5.8, minX: 25.5, maxX: 32.0, speed: 2.5, type: 'jetpack_rammer' },
            { x: 38.0, y: 5.5, minX: 34.5, maxX: 41.0, speed: 2.6, type: 'jetpack_rammer' }
        ],
        fakeGoals: []
    },
    {
        name: "74. Zewnętrzny Peremetr",
        theme: "jungle_outpost",
        hasWeapon: true,
        hasJohnOutpost: true,
        width: 46,
        spawn: [1.5, 10],
        goal: [43.0, 4.6],
        solids: [
            [0, 12, 6.5, 3],
            [8.5, 10.5, 7.5, 4.5],
            [18.0, 8.8, 7.5, 6.2],
            [27.5, 7.2, 7.0, 7.8],
            [36.5, 6.4, 9.5, 8.6]
        ],
        invisBlocks: [[7.2, 8.0], [16.5, 6.2], [26.0, 4.8]],
        fallingFloors: [[14.0, 10.5, 2.0, 1], [34.5, 7.2, 2.0, 1]],
        spikeTraps: [{ x: 38.5, y: 5.6, w: 1, dir: 'up', triggerX: 37.6 }],
        enemies: [
            { x: 11.5, y: 6.2, minX: 8.5, maxX: 15.5, speed: 2.4, type: 'jetpack_rammer' },
            { x: 21.0, y: 4.5, minX: 18.0, maxX: 25.0, speed: 2.4, type: 'raygun_drone' },
            { x: 30.5, y: 3.5, minX: 27.5, maxX: 34.5, speed: 2.5, type: 'jetpack_rammer' },
            { x: 40.5, y: 3.0, minX: 37.0, maxX: 43.5, speed: 2.5, type: 'jetpack_rammer' }
        ],
        fakeGoals: []
    },
    {
        name: "75. Wrota Tajnej Bazy Johna",
        theme: "jungle_outpost",
        transitionToTheme: "john_base",
        hasWeapon: true,
        hasJohnOutpost: true,
        hasBaseGate: true,
        width: 46,
        spawn: [1.5, 10],
        goal: [42.0, 8.2],
        solids: [
            [0, 12, 7.0, 3],
            [9.0, 10.5, 7.5, 4.5],
            [18.5, 9.0, 8.0, 6.0],
            [28.5, 10.0, 17.5, 5.0]
        ],
        invisBlocks: [[7.5, 7.8], [17.0, 6.5]],
        fallingFloors: [[26.5, 9.0, 2.0, 1]],
        spikeTraps: [{ x: 33.0, y: 9.2, w: 1.2, dir: 'up', triggerX: 32.0 }],
        enemies: [
            { x: 12.5, y: 6.0, minX: 9.0, maxX: 16.5, speed: 2.5, type: 'jetpack_rammer' },
            { x: 22.0, y: 4.8, minX: 18.5, maxX: 26.0, speed: 2.4, type: 'raygun_drone' },
            { x: 31.0, y: 5.5, minX: 28.5, maxX: 36.5, speed: 2.6, type: 'jetpack_rammer' },
            { x: 37.5, y: 5.2, minX: 33.5, maxX: 40.5, speed: 2.5, type: 'raygun_drone' }
        ],
        fakeGoals: []
    },

    // ========================================================================
    // ROZDZIAŁ 2 - SEKCJA 4: TAJNA BAZA JOHNA (POZIOMY 76 - 80)
    // Odbijaj pociski Raygun-Botów Ostrzem Rdzeniowym i odnajdź Angelę!
    // ========================================================================
    {
        name: "76. Śluza Cyber-Bunkra",
        theme: "john_base",
        hasWeapon: true,
        chapterTitle: "ROZDZIAŁ 2 • SEKCJA 4: TAJNA BAZA JOHNA",
        width: 44,
        spawn: [1.5, 10],
        goal: [41.0, 7.2],
        solids: [
            [0, 12, 7.5, 3],
            [9.5, 10.5, 8.0, 4.5],
            [19.5, 9.0, 8.0, 6.0],
            [29.5, 9.0, 14.5, 6.0]
        ],
        invisBlocks: [[8.2, 7.8], [18.0, 6.5]],
        fallingFloors: [[27.5, 9.0, 2.0, 1]],
        spikeTraps: [{ x: 33.5, y: 8.2, w: 1, dir: 'up', triggerX: 32.5 }],
        enemies: [
            { x: 13.5, y: 5.8, minX: 9.5, maxX: 17.5, speed: 2.2, type: 'raygun_drone' },
            { x: 23.5, y: 4.6, minX: 19.5, maxX: 27.5, speed: 2.3, type: 'raygun_drone' },
            { x: 35.5, y: 4.8, minX: 30.5, maxX: 39.5, speed: 2.5, type: 'jetpack_rammer' },
            { x: 38.5, y: 4.5, minX: 32.0, maxX: 40.5, speed: 2.3, type: 'raygun_drone' }
        ],
        fakeGoals: []
    },
    {
        name: "77. Hala Raygun-Dronów",
        theme: "john_base",
        hasWeapon: true,
        width: 44,
        spawn: [1.5, 10],
        goal: [41.0, 5.2],
        solids: [
            [0, 12, 6.5, 3],
            [8.5, 10.8, 7.5, 4.2],
            [18.0, 9.2, 7.5, 5.8],
            [27.5, 7.6, 6.5, 7.4],
            [36.0, 7.0, 8.0, 8.0]
        ],
        invisBlocks: [[7.2, 8.0], [16.5, 6.5], [26.0, 5.2]],
        fallingFloors: [[34.0, 7.6, 2.0, 1]],
        spikeTraps: [{ x: 12.0, y: 0, w: 1.3, dir: 'down', triggerX: 10.8 }],
        enemies: [
            { x: 12.0, y: 6.2, minX: 8.5, maxX: 16.0, speed: 2.3, type: 'raygun_drone' },
            { x: 21.5, y: 4.8, minX: 18.0, maxX: 25.5, speed: 2.4, type: 'raygun_drone' },
            { x: 24.0, y: 5.2, minX: 18.5, maxX: 25.5, speed: 2.5, type: 'jetpack_rammer' },
            { x: 30.5, y: 3.6, minX: 27.5, maxX: 34.0, speed: 2.4, type: 'raygun_drone' },
            { x: 38.5, y: 3.4, minX: 36.0, maxX: 41.0, speed: 2.5, type: 'raygun_drone' }
        ],
        fakeGoals: []
    },
    {
        name: "78. Reaktor Plazmowy",
        theme: "john_base",
        hasWeapon: true,
        width: 46,
        spawn: [1.5, 10],
        goal: [43.0, 6.2],
        solids: [
            [0, 12, 6.5, 3],
            [8.5, 11.0, 8.5, 4.0],
            [10.5, 7.2, 4.5, 0.7],
            [19.5, 9.5, 8.5, 5.5],
            [21.5, 5.8, 4.5, 0.7],
            [30.5, 8.0, 15.5, 7.0]
        ],
        invisBlocks: [[7.2, 8.0], [18.0, 6.8], [29.0, 5.8]],
        fallingFloors: [[33.0, 8.0, 2.2, 7.0]],
        spikeTraps: [{ x: 37.0, y: 7.2, w: 1.2, dir: 'up', triggerX: 36.0 }],
        enemies: [
            { x: 12.5, y: 4.2, minX: 8.5, maxX: 17.0, speed: 2.4, type: 'raygun_drone' },
            { x: 15.0, y: 6.5, minX: 9.0, maxX: 16.5, speed: 2.5, type: 'jetpack_rammer' },
            { x: 23.5, y: 3.2, minX: 19.5, maxX: 28.0, speed: 2.4, type: 'raygun_drone' },
            { x: 35.0, y: 4.2, minX: 30.5, maxX: 41.5, speed: 2.6, type: 'jetpack_rammer' },
            { x: 40.0, y: 4.0, minX: 32.0, maxX: 42.5, speed: 2.5, type: 'raygun_drone' }
        ],
        fakeGoals: []
    },
    {
        name: "79. Szyb Laboratoryjny",
        theme: "john_base",
        hasWeapon: true,
        width: 46,
        spawn: [1.5, 10],
        goal: [43.0, 4.2],
        solids: [
            [0, 12, 6.0, 3],
            [6.0, 4.5, 1.3, 8.5],
            [10.0, 9.8, 6.5, 5.2],
            [18.5, 8.2, 6.5, 6.8],
            [27.0, 6.8, 6.5, 8.2],
            [35.5, 6.0, 10.5, 9.0]
        ],
        invisBlocks: [[8.5, 7.2], [17.0, 5.8], [25.5, 4.5], [34.0, 3.8]],
        fallingFloors: [[36.5, 6.0, 2.0, 9.0]],
        spikeTraps: [{ x: 40.0, y: 5.2, w: 1, dir: 'up', triggerX: 39.0 }],
        enemies: [
            { x: 13.0, y: 5.8, minX: 10.0, maxX: 16.5, speed: 2.4, type: 'raygun_drone' },
            { x: 21.5, y: 4.2, minX: 18.5, maxX: 25.0, speed: 2.6, type: 'jetpack_rammer' },
            { x: 30.0, y: 3.2, minX: 27.0, maxX: 33.5, speed: 2.5, type: 'raygun_drone' },
            { x: 39.0, y: 2.6, minX: 35.5, maxX: 42.5, speed: 2.6, type: 'jetpack_rammer' },
            { x: 41.5, y: 2.5, minX: 36.0, maxX: 43.0, speed: 2.5, type: 'raygun_drone' }
        ],
        fakeGoals: []
    },
    {
        name: "80. Komora Angeli • Pułapka Johna",
        theme: "john_base",
        hasWeapon: true,
        width: 46,
        spawn: [1.5, 10],
        goal: [42.5, 6.2],
        solids: [
            [0, 12, 7.0, 3],
            [9.0, 10.5, 8.0, 4.5],
            [19.0, 9.0, 8.0, 6.0],
            [29.0, 8.0, 17.0, 7.0]
        ],
        invisBlocks: [[7.8, 7.8], [17.5, 6.2]],
        fallingFloors: [[27.0, 9.0, 2.0, 1]],
        spikeTraps: [{ x: 34.0, y: 7.2, w: 1.2, dir: 'up', triggerX: 33.0 }],
        enemies: [
            { x: 12.5, y: 6.2, minX: 9.0, maxX: 17.0, speed: 2.5, type: 'jetpack_rammer' },
            { x: 15.5, y: 5.5, minX: 9.5, maxX: 17.0, speed: 2.4, type: 'raygun_drone' },
            { x: 22.5, y: 4.8, minX: 19.0, maxX: 27.0, speed: 2.5, type: 'raygun_drone' },
            { x: 32.0, y: 4.2, minX: 29.0, maxX: 38.0, speed: 2.7, type: 'jetpack_rammer' },
            { x: 37.5, y: 3.8, minX: 31.0, maxX: 41.0, speed: 2.5, type: 'raygun_drone' },
            { x: 40.0, y: 4.2, minX: 33.0, maxX: 41.5, speed: 2.7, type: 'jetpack_rammer' }
        ],
        fakeGoals: []
    }    ,
    // ========================================================================
    // ROZDZIAŁ 3 - SEKCJA 1: ROZŻARZONE WYDMY SAHARY (POZIOMY 81 - 90)
    // Dave budzi się z Raygunem 360° wśród fal gorąca, kaktusów i Dino-Raptorów!
    // ========================================================================
    {
        name: "81. Przebudzenie na Saharze",
        theme: "sahara",
        hasRaygun: true,
        chapterTitle: "ROZDZIAŁ 3 • SEKCJA 1: ROZŻARZONE WYDMY",
        width: 42,
        spawn: [1.5, 10],
        goal: [39.0, 8.2],
        solids: [
            [0, 12, 9.5, 3],
            [11.5, 11.0, 8.5, 4.0],
            [22.0, 10.0, 8.0, 5.0],
            [32.0, 10.0, 10.0, 5.0]
        ],
        invisBlocks: [[10.2, 7.8]],
        fallingFloors: [[20.2, 11.0, 1.8, 1]],
        spikeTraps: [
            { x: 6.5, y: 11.2, w: 1, dir: 'up', triggerX: 5.5 },
            { x: 25.0, y: 9.2, w: 1, dir: 'up', triggerX: 24.0 }
        ],
        enemies: [
            { x: 15.0, y: 10.2, minX: 11.8, maxX: 19.5, speed: 2.5, type: 'dino_raptor' },
            { x: 35.5, y: 9.2, minX: 32.5, maxX: 38.5, speed: 2.6, type: 'dino_raptor' }
        ],
        fakeGoals: []
    },
    {
        name: "82. Kaktusowy Szlak",
        theme: "sahara",
        hasRaygun: true,
        width: 44,
        spawn: [1.5, 10],
        goal: [41.0, 7.2],
        solids: [
            [0, 12, 7.5, 3],
            [9.5, 11.0, 8.5, 4.0],
            [12.0, 7.5, 3.8, 0.7],
            [20.0, 10.0, 9.0, 5.0],
            [31.0, 9.0, 13.0, 6.0]
        ],
        invisBlocks: [[8.2, 8.0], [18.5, 7.0]],
        fallingFloors: [[29.0, 10.0, 2.0, 1]],
        spikeTraps: [
            { x: 11.5, y: 10.2, w: 1, dir: 'up', triggerX: 10.6 },
            { x: 23.5, y: 9.2, w: 1.2, dir: 'up', triggerX: 22.5 },
            { x: 34.0, y: 8.2, w: 1, dir: 'up', triggerX: 33.0 }
        ],
        enemies: [
            { x: 15.5, y: 10.2, minX: 12.8, maxX: 17.6, speed: 2.6, type: 'dino_raptor' },
            { x: 26.0, y: 9.2, minX: 25.0, maxX: 28.6, speed: 2.7, type: 'dino_raptor' },
            { x: 38.0, y: 8.2, minX: 35.2, maxX: 40.5, speed: 2.7, type: 'dino_raptor' }
        ],
        fakeGoals: []
    },
    {
        name: "83. Pierwszy Dino-Rex",
        theme: "sahara",
        hasRaygun: true,
        width: 44,
        spawn: [1.5, 10],
        goal: [41.0, 6.2],
        solids: [
            [0, 12, 7.0, 3],
            [9.0, 11.0, 10.5, 4.0],
            [12.5, 7.2, 4.0, 0.7],
            [21.5, 9.5, 10.5, 5.5],
            [25.0, 5.8, 4.0, 0.7],
            [34.0, 8.0, 10.0, 7.0]
        ],
        invisBlocks: [[7.8, 8.2], [20.2, 6.8]],
        fallingFloors: [[32.0, 9.5, 2.0, 1]],
        spikeTraps: [{ x: 36.0, y: 7.2, w: 1, dir: 'up', triggerX: 35.0 }],
        enemies: [
            { x: 14.5, y: 10.2, minX: 9.4, maxX: 19.0, speed: 2.6, type: 'dino_raptor' },
            { x: 26.5, y: 8.7, minX: 22.0, maxX: 31.2, speed: 1.65, type: 'dino_rex' },
            { x: 38.5, y: 7.2, minX: 37.2, maxX: 40.6, speed: 2.7, type: 'dino_raptor' }
        ],
        fakeGoals: []
    },
    {
        name: "84. Ruchome Piaski",
        theme: "sahara",
        hasRaygun: true,
        width: 44,
        spawn: [1.5, 9],
        goal: [41.0, 9],
        solids: [
            [0, 11, 6.0, 4],
            [14.0, 7.2, 5.5, 0.7],
            [25.5, 7.2, 5.5, 0.7],
            [35.5, 11, 8.5, 4]
        ],
        invisBlocks: [[11.0, 7.0], [22.5, 7.0]],
        fallingFloors: [
            [6.2, 11, 3.4, 0.9],
            [10.2, 11, 3.4, 0.9],
            [14.5, 10.8, 3.8, 0.9],
            [19.0, 10.8, 3.4, 0.9],
            [23.2, 11, 3.6, 0.9],
            [27.5, 11, 3.6, 0.9],
            [31.8, 11, 3.2, 0.9]
        ],
        spikeTraps: [
            { x: 16.5, y: 0, w: 1.3, dir: 'down', triggerX: 15.2 },
            { x: 28.0, y: 0, w: 1.3, dir: 'down', triggerX: 26.8 }
        ],
        enemies: [
            { x: 15.5, y: 6.4, minX: 14.2, maxX: 19.0, speed: 2.5, type: 'dino_raptor' },
            { x: 27.0, y: 6.4, minX: 25.8, maxX: 30.5, speed: 2.6, type: 'dino_raptor' },
            { x: 38.5, y: 10.2, minX: 36.0, maxX: 40.6, speed: 1.7, type: 'dino_rex' }
        ],
        fakeGoals: []
    },
    {
        name: "85. Oaza Mirażu",
        theme: "sahara",
        hasRaygun: true,
        width: 44,
        spawn: [1.5, 10],
        goal: [16.5, 2.8],
        solids: [
            [0, 12, 8.0, 3],
            [10.5, 12, 12.0, 3],
            [13.5, 8.2, 6.0, 0.7],
            [25.0, 12, 11.5, 3],
            [27.5, 4.2, 1.3, 6.8],
            [23.0, 2.5, 1.3, 6.5],
            [15.0, 4.6, 5.5, 0.8]
        ],
        invisBlocks: [[9.0, 8.8], [23.5, 8.8]],
        fallingFloors: [[16.0, 12, 2.5, 3]],
        spikeTraps: [{ x: 20.2, y: 11.2, w: 1, dir: 'up', triggerX: 19.2 }],
        enemies: [
            { x: 12.0, y: 11.2, minX: 10.8, maxX: 15.6, speed: 2.6, type: 'dino_raptor' },
            { x: 15.0, y: 7.4, minX: 13.8, maxX: 19.0, speed: 2.6, type: 'dino_raptor' },
            { x: 28.5, y: 11.2, minX: 25.5, maxX: 32.5, speed: 1.7, type: 'dino_rex' }
        ],
        fakeGoals: [[33.8, 10.2]]
    },
    {
        name: "86. Stado Raptorów",
        theme: "sahara",
        hasRaygun: true,
        width: 46,
        spawn: [1.5, 10],
        goal: [43.0, 7.2],
        solids: [
            [0, 12, 7.0, 3],
            [9.0, 11.0, 8.5, 4.0],
            [19.5, 9.8, 8.5, 5.2],
            [30.0, 9.0, 16.0, 6.0],
            [34.0, 5.6, 4.5, 0.7]
        ],
        invisBlocks: [[7.8, 8.2], [18.2, 7.0]],
        fallingFloors: [[28.0, 9.8, 2.0, 1]],
        spikeTraps: [
            { x: 13.0, y: 0, w: 1.3, dir: 'down', triggerX: 11.8 },
            { x: 32.0, y: 8.2, w: 1, dir: 'up', triggerX: 31.0 }
        ],
        enemies: [
            { x: 11.5, y: 10.2, minX: 9.3, maxX: 17.0, speed: 2.7, type: 'dino_raptor' },
            { x: 15.2, y: 10.2, minX: 9.3, maxX: 17.0, speed: 2.5, type: 'dino_raptor' },
            { x: 22.5, y: 9.0, minX: 19.8, maxX: 27.5, speed: 2.7, type: 'dino_raptor' },
            { x: 36.5, y: 8.2, minX: 33.4, maxX: 42.5, speed: 2.8, type: 'dino_raptor' },
            { x: 40.5, y: 8.2, minX: 33.4, maxX: 42.5, speed: 2.6, type: 'dino_raptor' }
        ],
        fakeGoals: []
    },
    {
        name: "87. Słoneczny Krater",
        theme: "sahara",
        hasRaygun: true,
        width: 46,
        spawn: [1.5, 10],
        goal: [43.0, 5.0],
        solids: [
            [0, 12, 6.0, 3],
            [6.0, 4.5, 1.3, 8.5],
            [10.0, 10.2, 7.5, 4.8],
            [19.5, 8.6, 7.5, 6.4],
            [29.0, 3.5, 1.3, 8.0],
            [33.0, 6.8, 13.0, 8.2]
        ],
        invisBlocks: [[8.5, 7.5], [18.0, 6.0], [31.0, 4.8]],
        fallingFloors: [[27.0, 8.6, 2.0, 1]],
        spikeTraps: [
            { x: 3.8, y: 11.2, w: 1, dir: 'up', triggerX: 3.0 },
            { x: 35.0, y: 6.0, w: 1, dir: 'up', triggerX: 34.0 }
        ],
        enemies: [
            { x: 13.0, y: 9.4, minX: 10.4, maxX: 17.0, speed: 2.7, type: 'dino_raptor' },
            { x: 22.5, y: 7.8, minX: 19.8, maxX: 26.5, speed: 1.75, type: 'dino_rex' },
            { x: 38.5, y: 6.0, minX: 36.4, maxX: 42.5, speed: 2.8, type: 'dino_raptor' },
            { x: 41.0, y: 6.0, minX: 36.4, maxX: 42.5, speed: 1.75, type: 'dino_rex' }
        ],
        fakeGoals: []
    },
    {
        name: "88. Burza Piaskowa",
        theme: "sahara",
        hasRaygun: true,
        width: 46,
        spawn: [1.5, 10],
        goal: [43.0, 8.2],
        solids: [
            [0, 12, 6.5, 3],
            [8.5, 10.8, 8.0, 4.2],
            [10.5, 7.0, 4.0, 0.7],
            [18.5, 9.5, 8.5, 5.5],
            [20.5, 5.8, 4.0, 0.7],
            [29.0, 10.8, 6.0, 4.2],
            [37.0, 10.0, 9.0, 5.0]
        ],
        invisBlocks: [[7.2, 8.0], [17.2, 6.8], [35.5, 7.2]],
        fallingFloors: [[27.0, 9.5, 2.0, 1], [33.0, 10.8, 2.0, 4.2]],
        spikeTraps: [
            { x: 12.5, y: 10.0, w: 1, dir: 'up', triggerX: 11.5 },
            { x: 22.5, y: 0, w: 1.4, dir: 'down', triggerX: 21.2 },
            { x: 38.2, y: 9.2, w: 1, dir: 'up', triggerX: 37.3 }
        ],
        enemies: [
            { x: 14.5, y: 10.0, minX: 13.8, maxX: 16.2, speed: 2.6, type: 'dino_raptor' },
            { x: 21.5, y: 8.7, minX: 18.8, maxX: 26.5, speed: 1.8, type: 'dino_rex' },
            { x: 30.0, y: 10.0, minX: 29.3, maxX: 32.6, speed: 2.7, type: 'dino_raptor' },
            { x: 40.5, y: 9.2, minX: 39.5, maxX: 42.6, speed: 2.8, type: 'dino_raptor' }
        ],
        fakeGoals: []
    },
    {
        name: "89. Kościste Wydmy",
        theme: "sahara",
        hasRaygun: true,
        width: 46,
        spawn: [1.5, 10],
        goal: [43.0, 6.2],
        solids: [
            [0, 12, 6.5, 3],
            [8.5, 11.0, 9.5, 4.0],
            [20.0, 9.6, 9.5, 5.4],
            [22.5, 5.8, 4.5, 0.7],
            [31.5, 8.0, 14.5, 7.0]
        ],
        invisBlocks: [[7.2, 8.2], [18.8, 6.8], [30.2, 5.5]],
        fallingFloors: [[18.0, 11.0, 2.0, 1]],
        spikeTraps: [
            { x: 11.0, y: 10.2, w: 1, dir: 'up', triggerX: 10.0 },
            { x: 34.0, y: 7.2, w: 1.2, dir: 'up', triggerX: 33.0 }
        ],
        enemies: [
            { x: 14.0, y: 10.2, minX: 12.4, maxX: 17.6, speed: 1.8, type: 'dino_rex' },
            { x: 23.0, y: 8.8, minX: 20.4, maxX: 29.0, speed: 2.8, type: 'dino_raptor' },
            { x: 26.8, y: 8.8, minX: 20.4, maxX: 29.0, speed: 2.7, type: 'dino_raptor' },
            { x: 37.5, y: 7.2, minX: 35.6, maxX: 42.5, speed: 1.85, type: 'dino_rex' },
            { x: 41.0, y: 7.2, minX: 35.6, maxX: 42.5, speed: 2.8, type: 'dino_raptor' }
        ],
        fakeGoals: []
    },
    {
        name: "90. Brama Kanionu Rexa",
        theme: "sahara",
        hasRaygun: true,
        width: 48,
        spawn: [1.5, 10],
        goal: [44.5, 5.2],
        solids: [
            [0, 12, 6.5, 3],
            [8.5, 10.5, 8.5, 4.5],
            [19.0, 9.0, 8.5, 6.0],
            [29.5, 10.5, 7.0, 4.5],
            [36.5, 3.5, 1.3, 6.5],
            [39.5, 7.0, 8.5, 8.0]
        ],
        invisBlocks: [[7.2, 7.8], [17.6, 6.2], [28.2, 7.0]],
        fallingFloors: [[27.5, 9.0, 2.0, 1]],
        spikeTraps: [
            { x: 12.5, y: 0, w: 1.3, dir: 'down', triggerX: 11.2 },
            { x: 40.5, y: 6.2, w: 1, dir: 'up', triggerX: 39.6 }
        ],
        enemies: [
            { x: 11.5, y: 9.7, minX: 8.8, maxX: 16.5, speed: 1.85, type: 'dino_rex' },
            { x: 15.0, y: 9.7, minX: 8.8, maxX: 16.5, speed: 2.8, type: 'dino_raptor' },
            { x: 22.0, y: 8.2, minX: 19.4, maxX: 27.0, speed: 1.85, type: 'dino_rex' },
            { x: 42.5, y: 6.2, minX: 41.8, maxX: 44.2, speed: 2.8, type: 'dino_raptor' }
        ],
        fakeGoals: [[34.2, 8.7]]
    },

    // ========================================================================
    // ROZDZIAŁ 3 - SEKCJA 2: KANION WIELKICH DINOZAURÓW (POZIOMY 91 - 100)
    // ========================================================================
    {
        name: "91. Wąwóz T-Rexów",
        theme: "sahara",
        hasRaygun: true,
        chapterTitle: "ROZDZIAŁ 3 • SEKCJA 2: KANION DINOZAURÓW",
        width: 48,
        spawn: [1.5, 10],
        goal: [45.0, 7.2],
        solids: [
            [0, 12, 7.0, 3],
            [9.0, 11.0, 10.5, 4.0],
            [12.0, 7.2, 4.5, 0.7],
            [21.5, 9.6, 10.5, 5.4],
            [24.5, 5.8, 4.5, 0.7],
            [34.0, 9.0, 14.0, 6.0]
        ],
        invisBlocks: [[7.8, 8.0], [20.2, 6.8], [32.6, 6.2]],
        fallingFloors: [[32.0, 9.6, 2.0, 1]],
        spikeTraps: [
            { x: 4.5, y: 11.2, w: 1, dir: 'up', triggerX: 3.6 },
            { x: 36.5, y: 8.2, w: 1.2, dir: 'up', triggerX: 35.5 }
        ],
        enemies: [
            { x: 13.5, y: 10.2, minX: 9.4, maxX: 19.0, speed: 1.85, type: 'dino_rex' },
            { x: 17.5, y: 10.2, minX: 9.4, maxX: 19.0, speed: 2.8, type: 'dino_raptor' },
            { x: 25.5, y: 8.8, minX: 22.0, maxX: 31.4, speed: 1.9, type: 'dino_rex' },
            { x: 40.0, y: 8.2, minX: 38.0, maxX: 44.5, speed: 1.9, type: 'dino_rex' },
            { x: 43.2, y: 8.2, minX: 38.0, maxX: 44.5, speed: 2.8, type: 'dino_raptor' }
        ],
        fakeGoals: []
    },
    {
        name: "92. Półki Piaskowca",
        theme: "sahara",
        hasRaygun: true,
        width: 48,
        spawn: [1.5, 10],
        goal: [45.0, 4.6],
        solids: [
            [0, 12, 6.0, 3],
            [6.0, 4.5, 1.3, 8.5],
            [9.8, 2.5, 1.3, 8.0],
            [11.2, 9.5, 7.5, 5.5],
            [20.8, 8.0, 7.5, 7.0],
            [30.5, 3.5, 1.3, 8.0],
            [34.2, 6.4, 13.8, 8.6]
        ],
        invisBlocks: [[19.2, 5.8], [32.4, 4.5]],
        fallingFloors: [[28.3, 8.0, 2.0, 1]],
        spikeTraps: [
            { x: 12.2, y: 8.7, w: 1, dir: 'up', triggerX: 11.4 },
            { x: 36.2, y: 5.6, w: 1, dir: 'up', triggerX: 35.3 }
        ],
        enemies: [
            { x: 15.0, y: 8.7, minX: 13.5, maxX: 18.2, speed: 2.8, type: 'dino_raptor' },
            { x: 23.5, y: 7.2, minX: 21.2, maxX: 27.8, speed: 1.85, type: 'dino_rex' },
            { x: 39.5, y: 5.6, minX: 37.6, maxX: 44.5, speed: 1.9, type: 'dino_rex' },
            { x: 43.0, y: 5.6, minX: 37.6, maxX: 44.5, speed: 2.85, type: 'dino_raptor' }
        ],
        fakeGoals: []
    },
    {
        name: "93.Skamieniały Most",
        theme: "sahara",
        hasRaygun: true,
        width: 48,
        spawn: [1.5, 9],
        goal: [45.0, 9],
        solids: [
            [0, 11, 5.5, 4],
            [12.5, 6.8, 6.5, 0.7],
            [25.0, 6.8, 6.5, 0.7],
            [38.0, 11, 10.0, 4]
        ],
        invisBlocks: [[9.5, 6.8], [22.0, 6.8], [35.0, 7.5]],
        fallingFloors: [
            [5.8, 11, 3.2, 0.8],
            [9.5, 11, 3.2, 0.8],
            [14.0, 10.8, 3.5, 0.8],
            [18.5, 10.8, 3.5, 0.8],
            [23.0, 11, 3.5, 0.8],
            [27.5, 11, 3.5, 0.8],
            [32.0, 11, 3.2, 0.8],
            [35.5, 11, 2.5, 0.8]
        ],
        spikeTraps: [
            { x: 15.5, y: 0, w: 1.3, dir: 'down', triggerX: 14.2 },
            { x: 28.0, y: 0, w: 1.3, dir: 'down', triggerX: 26.8 },
            { x: 39.0, y: 10.2, w: 1, dir: 'up', triggerX: 38.2 }
        ],
        enemies: [
            { x: 14.5, y: 6.0, minX: 12.8, maxX: 18.5, speed: 1.8, type: 'dino_rex' },
            { x: 27.0, y: 6.0, minX: 25.3, maxX: 31.0, speed: 2.85, type: 'dino_raptor' },
            { x: 41.5, y: 10.2, minX: 40.3, maxX: 44.5, speed: 1.9, type: 'dino_rex' }
        ],
        fakeGoals: []
    },
    {
        name: "94. Gniazdo Drapieżników",
        theme: "sahara",
        hasRaygun: true,
        width: 48,
        spawn: [1.5, 10],
        goal: [45.0, 8.2],
        solids: [
            [0, 12, 6.5, 3],
            [8.5, 11.0, 11.0, 4.0],
            [11.5, 7.2, 5.0, 0.7],
            [21.5, 11.0, 11.0, 4.0],
            [24.5, 7.2, 5.0, 0.7],
            [34.5, 10.0, 13.5, 5.0]
        ],
        invisBlocks: [[7.2, 8.2], [20.2, 8.2], [33.2, 7.5]],
        fallingFloors: [[35.5, 10.0, 2.2, 5.0]],
        spikeTraps: [
            { x: 14.0, y: 0, w: 1.3, dir: 'down', triggerX: 12.8 },
            { x: 27.0, y: 0, w: 1.3, dir: 'down', triggerX: 25.8 }
        ],
        enemies: [
            { x: 10.5, y: 10.2, minX: 8.8, maxX: 19.0, speed: 2.8, type: 'dino_raptor' },
            { x: 15.5, y: 10.2, minX: 8.8, maxX: 19.0, speed: 1.85, type: 'dino_rex' },
            { x: 23.5, y: 10.2, minX: 21.8, maxX: 32.0, speed: 2.85, type: 'dino_raptor' },
            { x: 28.5, y: 10.2, minX: 21.8, maxX: 32.0, speed: 1.9, type: 'dino_rex' },
            { x: 40.5, y: 9.2, minX: 38.2, maxX: 44.5, speed: 2.9, type: 'dino_raptor' }
        ],
        fakeGoals: []
    },
    {
        name: "95. Rozżarzony Labirynt",
        theme: "sahara",
        hasRaygun: true,
        width: 48,
        spawn: [1.5, 10],
        goal: [16.5, 2.8],
        solids: [
            [0, 12, 8.0, 3],
            [10.5, 12, 12.5, 3],
            [13.0, 8.2, 6.5, 0.7],
            [25.5, 12, 12.0, 3],
            [28.5, 4.2, 1.3, 6.8],
            [24.0, 2.5, 1.3, 6.5],
            [15.0, 4.6, 6.0, 0.8]
        ],
        invisBlocks: [[9.0, 8.8], [24.0, 8.8]],
        fallingFloors: [[16.0, 12, 2.5, 3]],
        spikeTraps: [{ x: 20.5, y: 11.2, w: 1, dir: 'up', triggerX: 19.5 }],
        enemies: [
            { x: 12.0, y: 11.2, minX: 10.8, maxX: 15.6, speed: 2.8, type: 'dino_raptor' },
            { x: 15.0, y: 7.4, minX: 13.4, maxX: 19.0, speed: 1.85, type: 'dino_rex' },
            { x: 28.0, y: 11.2, minX: 26.0, maxX: 34.0, speed: 1.9, type: 'dino_rex' },
            { x: 32.0, y: 11.2, minX: 26.0, maxX: 34.0, speed: 2.85, type: 'dino_raptor' }
        ],
        fakeGoals: [[35.0, 10.2]]
    },
    {
        name: "96. Kaktusowa Forteca",
        theme: "sahara",
        hasRaygun: true,
        width: 48,
        spawn: [1.5, 10],
        goal: [45.0, 6.2],
        solids: [
            [0, 12, 6.5, 3],
            [8.5, 10.8, 8.5, 4.2],
            [19.0, 9.4, 8.5, 5.6],
            [29.5, 8.0, 18.5, 7.0],
            [34.5, 4.6, 5.0, 0.7]
        ],
        invisBlocks: [[7.2, 8.0], [17.6, 6.5], [28.0, 5.2]],
        fallingFloors: [[27.5, 9.4, 2.0, 1]],
        spikeTraps: [
            { x: 10.5, y: 10.0, w: 1, dir: 'up', triggerX: 9.6 },
            { x: 21.0, y: 8.6, w: 1, dir: 'up', triggerX: 20.1 },
            { x: 32.0, y: 7.2, w: 1.2, dir: 'up', triggerX: 31.0 },
            { x: 40.5, y: 7.2, w: 1, dir: 'up', triggerX: 39.5 }
        ],
        enemies: [
            { x: 14.0, y: 10.0, minX: 11.8, maxX: 16.6, speed: 2.85, type: 'dino_raptor' },
            { x: 24.5, y: 8.6, minX: 22.3, maxX: 27.0, speed: 1.9, type: 'dino_rex' },
            { x: 36.0, y: 7.2, minX: 33.6, maxX: 39.8, speed: 1.95, type: 'dino_rex' },
            { x: 43.0, y: 7.2, minX: 41.8, maxX: 44.6, speed: 2.9, type: 'dino_raptor' }
        ],
        fakeGoals: []
    },
    {
        name: "97. Dolina Tyranozaurów",
        theme: "sahara",
        hasRaygun: true,
        width: 50,
        spawn: [1.5, 10],
        goal: [47.0, 7.2],
        solids: [
            [0, 12, 6.5, 3],
            [8.5, 11.0, 11.5, 4.0],
            [11.5, 7.2, 5.0, 0.7],
            [22.0, 10.0, 11.5, 5.0],
            [25.0, 6.2, 5.0, 0.7],
            [35.5, 9.0, 14.5, 6.0]
        ],
        invisBlocks: [[7.2, 8.2], [20.6, 7.2], [34.2, 6.2]],
        fallingFloors: [[33.5, 10.0, 2.0, 1]],
        spikeTraps: [
            { x: 14.0, y: 0, w: 1.4, dir: 'down', triggerX: 12.8 },
            { x: 38.0, y: 8.2, w: 1.2, dir: 'up', triggerX: 37.0 }
        ],
        enemies: [
            { x: 12.5, y: 10.2, minX: 8.8, maxX: 19.5, speed: 1.9, type: 'dino_rex' },
            { x: 17.0, y: 10.2, minX: 8.8, maxX: 19.5, speed: 1.9, type: 'dino_rex' },
            { x: 26.0, y: 9.2, minX: 22.4, maxX: 33.0, speed: 1.95, type: 'dino_rex' },
            { x: 30.5, y: 9.2, minX: 22.4, maxX: 33.0, speed: 2.9, type: 'dino_raptor' },
            { x: 42.5, y: 8.2, minX: 39.6, maxX: 46.5, speed: 1.95, type: 'dino_rex' },
            { x: 45.2, y: 8.2, minX: 39.6, maxX: 46.5, speed: 2.9, type: 'dino_raptor' }
        ],
        fakeGoals: []
    },
    {
        name: "98. Piekielny Upał",
        theme: "sahara",
        hasRaygun: true,
        width: 50,
        spawn: [1.5, 10],
        goal: [47.0, 4.6],
        solids: [
            [0, 12, 6.0, 3],
            [6.0, 4.5, 1.3, 8.5],
            [9.8, 2.5, 1.3, 8.0],
            [11.2, 10.0, 8.0, 5.0],
            [21.2, 8.5, 8.0, 6.5],
            [31.2, 7.0, 8.0, 8.0],
            [41.0, 6.4, 9.0, 8.6]
        ],
        invisBlocks: [[19.6, 6.2], [29.6, 4.8], [39.6, 4.2]],
        fallingFloors: [[19.2, 10.0, 1.8, 1], [39.2, 7.0, 1.8, 1]],
        spikeTraps: [
            { x: 3.8, y: 11.2, w: 1, dir: 'up', triggerX: 3.0 },
            { x: 24.5, y: 0, w: 1.4, dir: 'down', triggerX: 23.2 },
            { x: 42.2, y: 5.6, w: 1, dir: 'up', triggerX: 41.3 }
        ],
        enemies: [
            { x: 14.5, y: 9.2, minX: 11.5, maxX: 18.8, speed: 2.9, type: 'dino_raptor' },
            { x: 24.5, y: 7.7, minX: 21.5, maxX: 28.8, speed: 1.95, type: 'dino_rex' },
            { x: 34.5, y: 6.2, minX: 31.5, maxX: 38.8, speed: 1.95, type: 'dino_rex' },
            { x: 37.5, y: 6.2, minX: 31.5, maxX: 38.8, speed: 2.9, type: 'dino_raptor' },
            { x: 45.0, y: 5.6, minX: 43.6, maxX: 46.6, speed: 2.9, type: 'dino_raptor' }
        ],
        fakeGoals: []
    },
    {
        name: "99. Marsz Prehistorii",
        theme: "sahara",
        hasRaygun: true,
        width: 50,
        spawn: [1.5, 10],
        goal: [47.0, 6.2],
        solids: [
            [0, 12, 6.5, 3],
            [8.5, 10.8, 9.5, 4.2],
            [11.0, 7.0, 4.5, 0.7],
            [20.0, 9.4, 9.5, 5.6],
            [22.5, 5.6, 4.5, 0.7],
            [31.5, 8.0, 18.5, 7.0]
        ],
        invisBlocks: [[7.2, 8.0], [18.6, 6.5], [30.2, 5.2]],
        fallingFloors: [[34.0, 8.0, 2.2, 7.0]],
        spikeTraps: [
            { x: 9.5, y: 10.0, w: 1, dir: 'up', triggerX: 8.6 },
            { x: 38.0, y: 7.2, w: 1.2, dir: 'up', triggerX: 37.0 }
        ],
        enemies: [
            { x: 14.0, y: 10.0, minX: 11.0, maxX: 17.6, speed: 1.95, type: 'dino_rex' },
            { x: 16.5, y: 10.0, minX: 11.0, maxX: 17.6, speed: 2.9, type: 'dino_raptor' },
            { x: 24.0, y: 8.6, minX: 20.4, maxX: 29.0, speed: 1.95, type: 'dino_rex' },
            { x: 27.5, y: 8.6, minX: 20.4, maxX: 29.0, speed: 2.9, type: 'dino_raptor' },
            { x: 41.5, y: 7.2, minX: 39.6, maxX: 46.5, speed: 2.0, type: 'dino_rex' },
            { x: 45.0, y: 7.2, minX: 39.6, maxX: 46.5, speed: 2.95, type: 'dino_raptor' }
        ],
        fakeGoals: []
    },
    {
        name: "100. Król Sahary • Wyrwa Czasu",
        theme: "sahara",
        hasRaygun: true,
        width: 52,
        spawn: [1.5, 10],
        goal: [48.5, 6.2],
        solids: [
            [0, 12, 7.0, 3],
            [9.0, 10.5, 10.0, 4.5],
            [11.5, 6.8, 5.0, 0.7],
            [21.0, 9.0, 10.0, 6.0],
            [23.5, 5.2, 5.0, 0.7],
            [33.0, 8.0, 19.0, 7.0]
        ],
        invisBlocks: [[7.8, 7.8], [19.6, 6.2], [31.6, 5.0]],
        fallingFloors: [[31.0, 9.0, 2.0, 1]],
        spikeTraps: [
            { x: 36.0, y: 7.2, w: 1.2, dir: 'up', triggerX: 35.0 },
            { x: 42.5, y: 0, w: 1.4, dir: 'down', triggerX: 41.2 }
        ],
        enemies: [
            { x: 13.0, y: 9.7, minX: 9.4, maxX: 18.5, speed: 1.95, type: 'dino_rex' },
            { x: 17.0, y: 9.7, minX: 9.4, maxX: 18.5, speed: 2.9, type: 'dino_raptor' },
            { x: 25.0, y: 8.2, minX: 21.4, maxX: 30.5, speed: 2.0, type: 'dino_rex' },
            { x: 29.0, y: 8.2, minX: 21.4, maxX: 30.5, speed: 2.95, type: 'dino_raptor' },
            { x: 40.0, y: 7.2, minX: 37.6, maxX: 47.8, speed: 2.0, type: 'dino_rex' },
            { x: 44.5, y: 7.2, minX: 37.6, maxX: 47.8, speed: 2.0, type: 'dino_rex' },
            { x: 46.8, y: 7.2, minX: 37.6, maxX: 47.8, speed: 3.0, type: 'dino_raptor' }
        ],
        fakeGoals: []
    }

    ,
    // ========================================================================
    // ROZDZIAŁ 3 - SEKCJA 3: OŚNIEŻONE GRANIE I LAWINY (POZIOMY 101 - 112)
    // Dave schodzi ze szczytu góry (4200m -> 120m) walcząc z nowymi botami Johna!
    // ========================================================================
    {
        name: "101. Urwisko nad Chmurami",
        theme: "mountain",
        hasRaygun: true,
        chapterTitle: "ROZDZIAŁ 3 • SEKCJA 3: SZCZYT GÓRY (4200m)",
        width: 46,
        spawn: [1.5, 3.8],
        goal: [42.5, 8.6],
        solids: [
            [0, 5.8, 6.5, 9.2],
            [9.8, 7.2, 8.8, 7.8],
            [21.8, 8.8, 9.2, 6.2],
            [23.8, 5.4, 4.5, 0.7],
            [34.2, 10.4, 11.8, 4.6]
        ],
        invisBlocks: [[8.0, 4.2], [20.0, 5.6], [32.4, 7.0]],
        fallingFloors: [
            [6.8, 6.4, 2.4, 0.8],
            [19.0, 8.0, 2.2, 0.8],
            [31.4, 9.6, 2.2, 0.8]
        ],
        spikeTraps: [
            { x: 13.0, y: 0, w: 1.6, dir: 'boulder', triggerX: 11.5 },
            { x: 25.3, y: 0, w: 1.6, dir: 'boulder', triggerX: 23.8 },
            { x: 37.2, y: 0, w: 1.6, dir: 'boulder', triggerX: 35.7 },
            { x: 36.4, y: 9.6, w: 1.2, dir: 'up', triggerX: 35.4 }
        ],
        enemies: [
            { x: 13.0, y: 6.4, minX: 10.2, maxX: 18.1, speed: 2.6, type: 'john_dash_bot' },
            { x: 28.0, y: 8.0, minX: 22.2, maxX: 30.5, speed: 2.45, type: 'evad_bot' },
            { x: 39.4, y: 9.6, minX: 38.0, maxX: 42.0, speed: 2.6, type: 'john_dash_bot' }
        ],
        fakeGoals: []
    },
    {
        name: "102. Kamienna Lawina",
        theme: "mountain",
        hasRaygun: true,
        width: 48,
        spawn: [1.5, 3.2],
        goal: [44.5, 9.4],
        solids: [
            [0, 5.2, 6.0, 9.8],
            [9.2, 6.8, 8.5, 8.2],
            [21.0, 8.4, 9.0, 6.6],
            [33.2, 9.8, 8.5, 5.2],
            [44.2, 11.2, 3.8, 3.8]
        ],
        invisBlocks: [[7.5, 3.8], [19.2, 5.2], [31.5, 6.8], [42.6, 8.0]],
        fallingFloors: [
            [6.3, 5.8, 2.3, 0.8],
            [18.1, 7.5, 2.3, 0.8],
            [30.4, 9.0, 2.2, 0.8],
            [41.9, 10.4, 2.0, 0.8]
        ],
        spikeTraps: [
            { x: 12.4, y: 0, w: 1.6, dir: 'boulder', triggerX: 10.9 },
            { x: 24.5, y: 0, w: 1.6, dir: 'boulder', triggerX: 23.0 },
            { x: 36.2, y: 0, w: 1.6, dir: 'boulder', triggerX: 34.7 },
            { x: 46.4, y: 10.4, w: 1.2, dir: 'up', triggerX: 45.4 }
        ],
        enemies: [
            { x: 12.3, y: 6.0, minX: 9.6, maxX: 17.2, speed: 2.47, type: 'john_laser_sniper' },
            { x: 27.1, y: 7.6, minX: 21.4, maxX: 29.5, speed: 2.62, type: 'john_dash_bot' },
            { x: 36.3, y: 9.0, minX: 33.6, maxX: 41.2, speed: 2.47, type: 'evad_bot' },
            { x: 45.2, y: 10.4, minX: 48.0, maxX: 44.0, speed: 2.47, type: 'john_laser_sniper' }
        ],
        fakeGoals: []
    },
    {
        name: "103. Przełęcz Snajperów",
        theme: "mountain",
        hasRaygun: true,
        width: 48,
        spawn: [1.5, 3.5],
        goal: [44.5, 9.6],
        solids: [
            [0, 5.5, 6.2, 9.5],
            [9.5, 7.0, 9.2, 8.0],
            [11.8, 3.8, 4.2, 0.7],
            [22.0, 8.6, 9.5, 6.4],
            [24.5, 5.2, 4.2, 0.7],
            [34.8, 10.2, 8.5, 4.8],
            [45.5, 11.4, 2.5, 3.6]
        ],
        invisBlocks: [[7.8, 4.0], [20.2, 5.5], [33.0, 7.2]],
        fallingFloors: [
            [6.6, 6.2, 2.3, 0.8],
            [19.1, 7.8, 2.3, 0.8],
            [31.9, 9.4, 2.3, 0.8],
            [43.5, 10.8, 1.8, 0.8]
        ],
        spikeTraps: [
            { x: 12.7, y: 0, w: 1.6, dir: 'boulder', triggerX: 11.2 },
            { x: 25.5, y: 0, w: 1.6, dir: 'boulder', triggerX: 24.0 },
            { x: 37.8, y: 0, w: 1.6, dir: 'boulder', triggerX: 36.3 },
            { x: 47.7, y: 10.6, w: 1.2, dir: 'up', triggerX: 46.7 }
        ],
        enemies: [
            { x: 12.8, y: 6.2, minX: 9.9, maxX: 18.2, speed: 2.49, type: 'john_laser_sniper' },
            { x: 28.4, y: 7.8, minX: 22.4, maxX: 31.0, speed: 2.64, type: 'john_dash_bot' },
            { x: 37.9, y: 6.4, minX: 35.2, maxX: 42.8, speed: 2.49, type: 'john_cryo_drone' },
            { x: 45.6, y: 10.6, minX: 49.3, maxX: 44.0, speed: 2.49, type: 'john_laser_sniper' }
        ],
        fakeGoals: []
    },
    {
        name: "104. Rozpadlina Wichrów",
        theme: "mountain",
        hasRaygun: true,
        width: 50,
        spawn: [1.5, 3.8],
        goal: [46.5, 8.6],
        solids: [
            [0, 5.8, 6.5, 9.2],
            [9.8, 7.2, 8.8, 7.8],
            [21.8, 8.8, 9.2, 6.2],
            [23.8, 5.4, 4.5, 0.7],
            [34.2, 10.4, 15.8, 4.6]
        ],
        invisBlocks: [[8.0, 4.2], [20.0, 5.6], [32.4, 7.0]],
        fallingFloors: [
            [6.8, 6.4, 2.4, 0.8],
            [19.0, 8.0, 2.2, 0.8],
            [31.4, 9.6, 2.2, 0.8]
        ],
        spikeTraps: [
            { x: 13.0, y: 0, w: 1.6, dir: 'boulder', triggerX: 11.5 },
            { x: 25.3, y: 0, w: 1.6, dir: 'boulder', triggerX: 23.8 },
            { x: 37.2, y: 0, w: 1.6, dir: 'boulder', triggerX: 35.7 },
            { x: 36.4, y: 9.6, w: 1.2, dir: 'up', triggerX: 35.4 }
        ],
        enemies: [
            { x: 13.0, y: 6.4, minX: 10.2, maxX: 18.1, speed: 2.66, type: 'john_dash_bot' },
            { x: 28.0, y: 5.0, minX: 22.2, maxX: 30.5, speed: 2.51, type: 'john_cryo_drone' },
            { x: 40.8, y: 9.6, minX: 38.0, maxX: 46.0, speed: 2.51, type: 'john_laser_sniper' },
            { x: 43.6, y: 9.6, minX: 38.0, maxX: 46.0, speed: 2.51, type: 'evad_bot' }
        ],
        fakeGoals: []
    },
    {
        name: "105. Pancerny Patrol Johna",
        theme: "mountain",
        hasRaygun: true,
        width: 50,
        spawn: [1.5, 3.2],
        goal: [46.5, 9.4],
        solids: [
            [0, 5.2, 6.0, 9.8],
            [9.2, 6.8, 8.5, 8.2],
            [21.0, 8.4, 9.0, 6.6],
            [33.2, 9.8, 8.5, 5.2],
            [44.2, 11.2, 5.8, 3.8]
        ],
        invisBlocks: [[7.5, 3.8], [19.2, 5.2], [31.5, 6.8], [42.6, 8.0]],
        fallingFloors: [
            [6.3, 5.8, 2.3, 0.8],
            [18.1, 7.5, 2.3, 0.8],
            [30.4, 9.0, 2.2, 0.8],
            [41.9, 10.4, 2.0, 0.8]
        ],
        spikeTraps: [
            { x: 12.4, y: 0, w: 1.6, dir: 'boulder', triggerX: 10.9 },
            { x: 24.5, y: 0, w: 1.6, dir: 'boulder', triggerX: 23.0 },
            { x: 36.2, y: 0, w: 1.6, dir: 'boulder', triggerX: 34.7 },
            { x: 46.4, y: 10.4, w: 1.2, dir: 'up', triggerX: 45.4 }
        ],
        enemies: [
            { x: 12.3, y: 6.0, minX: 9.6, maxX: 17.2, speed: 2.21, type: 'john_vanguard' },
            { x: 27.1, y: 7.6, minX: 21.4, maxX: 29.5, speed: 2.68, type: 'john_dash_bot' },
            { x: 36.3, y: 6.0, minX: 33.6, maxX: 41.2, speed: 2.53, type: 'john_cryo_drone' },
            { x: 46.6, y: 10.4, minX: 48.0, maxX: 46.0, speed: 2.21, type: 'john_vanguard' }
        ],
        fakeGoals: []
    },
    {
        name: "106. Stromy Żleb Głazów",
        theme: "mountain",
        hasRaygun: true,
        width: 50,
        spawn: [1.5, 3.5],
        goal: [46.5, 9.6],
        solids: [
            [0, 5.5, 6.2, 9.5],
            [9.5, 7.0, 9.2, 8.0],
            [11.8, 3.8, 4.2, 0.7],
            [22.0, 8.6, 9.5, 6.4],
            [24.5, 5.2, 4.2, 0.7],
            [34.8, 10.2, 8.5, 4.8],
            [45.5, 11.4, 4.5, 3.6]
        ],
        invisBlocks: [[7.8, 4.0], [20.2, 5.5], [33.0, 7.2]],
        fallingFloors: [
            [6.6, 6.2, 2.3, 0.8],
            [19.1, 7.8, 2.3, 0.8],
            [31.9, 9.4, 2.3, 0.8],
            [43.5, 10.8, 1.8, 0.8]
        ],
        spikeTraps: [
            { x: 12.7, y: 0, w: 1.6, dir: 'boulder', triggerX: 11.2 },
            { x: 25.5, y: 0, w: 1.6, dir: 'boulder', triggerX: 24.0 },
            { x: 37.8, y: 0, w: 1.6, dir: 'boulder', triggerX: 36.3 },
            { x: 47.7, y: 10.6, w: 1.2, dir: 'up', triggerX: 46.7 }
        ],
        enemies: [
            { x: 12.8, y: 6.2, minX: 9.9, maxX: 18.2, speed: 2.7, type: 'john_dash_bot' },
            { x: 28.4, y: 7.8, minX: 22.4, maxX: 31.0, speed: 2.55, type: 'evad_bot' },
            { x: 37.9, y: 9.4, minX: 35.2, maxX: 42.8, speed: 2.55, type: 'john_laser_sniper' },
            { x: 47.0, y: 10.6, minX: 49.3, maxX: 46.0, speed: 2.23, type: 'john_vanguard' }
        ],
        fakeGoals: []
    },
    {
        name: "107. Lodowcowy Most",
        theme: "mountain",
        hasRaygun: true,
        width: 50,
        spawn: [1.5, 3.8],
        goal: [46.5, 8.6],
        solids: [
            [0, 5.8, 6.5, 9.2],
            [9.8, 7.2, 8.8, 7.8],
            [21.8, 8.8, 9.2, 6.2],
            [23.8, 5.4, 4.5, 0.7],
            [34.2, 10.4, 15.8, 4.6]
        ],
        invisBlocks: [[8.0, 4.2], [20.0, 5.6], [32.4, 7.0]],
        fallingFloors: [
            [6.8, 6.4, 2.4, 0.8],
            [19.0, 8.0, 2.2, 0.8],
            [31.4, 9.6, 2.2, 0.8]
        ],
        spikeTraps: [
            { x: 13.0, y: 0, w: 1.6, dir: 'boulder', triggerX: 11.5 },
            { x: 25.3, y: 0, w: 1.6, dir: 'boulder', triggerX: 23.8 },
            { x: 37.2, y: 0, w: 1.6, dir: 'boulder', triggerX: 35.7 },
            { x: 36.4, y: 9.6, w: 1.2, dir: 'up', triggerX: 35.4 }
        ],
        enemies: [
            { x: 13.0, y: 6.4, minX: 10.2, maxX: 18.1, speed: 2.57, type: 'john_laser_sniper' },
            { x: 28.0, y: 5.0, minX: 22.2, maxX: 30.5, speed: 2.57, type: 'john_cryo_drone' },
            { x: 40.8, y: 9.6, minX: 38.0, maxX: 46.0, speed: 2.72, type: 'john_dash_bot' },
            { x: 43.6, y: 9.6, minX: 38.0, maxX: 46.0, speed: 2.57, type: 'evad_bot' }
        ],
        fakeGoals: []
    },
    {
        name: "108. Zejście Przez Chmury",
        theme: "mountain",
        hasRaygun: true,
        width: 52,
        spawn: [1.5, 3.2],
        goal: [48.5, 9.4],
        solids: [
            [0, 5.2, 6.0, 9.8],
            [9.2, 6.8, 8.5, 8.2],
            [21.0, 8.4, 9.0, 6.6],
            [33.2, 9.8, 8.5, 5.2],
            [44.2, 11.2, 7.8, 3.8]
        ],
        invisBlocks: [[7.5, 3.8], [19.2, 5.2], [31.5, 6.8], [42.6, 8.0]],
        fallingFloors: [
            [6.3, 5.8, 2.3, 0.8],
            [18.1, 7.5, 2.3, 0.8],
            [30.4, 9.0, 2.2, 0.8],
            [41.9, 10.4, 2.0, 0.8]
        ],
        spikeTraps: [
            { x: 12.4, y: 0, w: 1.6, dir: 'boulder', triggerX: 10.9 },
            { x: 24.5, y: 0, w: 1.6, dir: 'boulder', triggerX: 23.0 },
            { x: 36.2, y: 0, w: 1.6, dir: 'boulder', triggerX: 34.7 },
            { x: 46.4, y: 10.4, w: 1.2, dir: 'up', triggerX: 45.4 }
        ],
        enemies: [
            { x: 12.3, y: 6.0, minX: 9.6, maxX: 17.2, speed: 2.74, type: 'john_dash_bot' },
            { x: 27.1, y: 4.6, minX: 21.4, maxX: 29.5, speed: 2.59, type: 'john_cryo_drone' },
            { x: 36.3, y: 9.0, minX: 33.6, maxX: 41.2, speed: 2.25, type: 'john_vanguard' },
            { x: 48.0, y: 10.4, minX: 48.0, maxX: 48.0, speed: 2.59, type: 'john_laser_sniper' }
        ],
        fakeGoals: []
    },
    {
        name: "109. Gniazdo Krio-Dronów",
        theme: "mountain",
        hasRaygun: true,
        width: 52,
        spawn: [1.5, 3.5],
        goal: [48.5, 9.6],
        solids: [
            [0, 5.5, 6.2, 9.5],
            [9.5, 7.0, 9.2, 8.0],
            [11.8, 3.8, 4.2, 0.7],
            [22.0, 8.6, 9.5, 6.4],
            [24.5, 5.2, 4.2, 0.7],
            [34.8, 10.2, 8.5, 4.8],
            [45.5, 11.4, 6.5, 3.6]
        ],
        invisBlocks: [[7.8, 4.0], [20.2, 5.5], [33.0, 7.2]],
        fallingFloors: [
            [6.6, 6.2, 2.3, 0.8],
            [19.1, 7.8, 2.3, 0.8],
            [31.9, 9.4, 2.3, 0.8],
            [43.5, 10.8, 1.8, 0.8]
        ],
        spikeTraps: [
            { x: 12.7, y: 0, w: 1.6, dir: 'boulder', triggerX: 11.2 },
            { x: 25.5, y: 0, w: 1.6, dir: 'boulder', triggerX: 24.0 },
            { x: 37.8, y: 0, w: 1.6, dir: 'boulder', triggerX: 36.3 },
            { x: 47.7, y: 10.6, w: 1.2, dir: 'up', triggerX: 46.7 }
        ],
        enemies: [
            { x: 12.8, y: 3.2, minX: 9.9, maxX: 18.2, speed: 2.61, type: 'john_cryo_drone' },
            { x: 28.4, y: 7.8, minX: 22.4, maxX: 31.0, speed: 2.76, type: 'john_dash_bot' },
            { x: 37.9, y: 6.4, minX: 35.2, maxX: 42.8, speed: 2.61, type: 'john_cryo_drone' },
            { x: 48.4, y: 10.6, minX: 49.3, maxX: 48.0, speed: 2.61, type: 'john_laser_sniper' }
        ],
        fakeGoals: []
    },
    {
        name: "110. Pierwszy Egzoszkielet Johna",
        theme: "mountain",
        hasRaygun: true,
        width: 52,
        spawn: [1.5, 3.8],
        goal: [48.5, 8.6],
        solids: [
            [0, 5.8, 6.5, 9.2],
            [9.8, 7.2, 8.8, 7.8],
            [21.8, 8.8, 9.2, 6.2],
            [23.8, 5.4, 4.5, 0.7],
            [34.2, 10.4, 17.8, 4.6]
        ],
        invisBlocks: [[8.0, 4.2], [20.0, 5.6], [32.4, 7.0]],
        fallingFloors: [
            [6.8, 6.4, 2.4, 0.8],
            [19.0, 8.0, 2.2, 0.8],
            [31.4, 9.6, 2.2, 0.8]
        ],
        spikeTraps: [
            { x: 13.0, y: 0, w: 1.6, dir: 'boulder', triggerX: 11.5 },
            { x: 25.3, y: 0, w: 1.6, dir: 'boulder', triggerX: 23.8 },
            { x: 37.2, y: 0, w: 1.6, dir: 'boulder', triggerX: 35.7 },
            { x: 36.4, y: 9.6, w: 1.2, dir: 'up', triggerX: 35.4 }
        ],
        enemies: [
            { x: 13.0, y: 6.4, minX: 10.2, maxX: 18.1, speed: 2.78, type: 'john_dash_bot' },
            { x: 28.0, y: 8.0, minX: 22.2, maxX: 30.5, speed: 1.99, type: 'john_titan_mech' },
            { x: 41.5, y: 6.6, minX: 38.0, maxX: 48.0, speed: 2.63, type: 'john_cryo_drone' },
            { x: 45.0, y: 9.6, minX: 38.0, maxX: 48.0, speed: 2.29, type: 'john_vanguard' }
        ],
        fakeGoals: []
    },
    {
        name: "111. Grań Bez Odwrotu",
        theme: "mountain",
        hasRaygun: true,
        width: 52,
        spawn: [1.5, 3.2],
        goal: [48.5, 9.4],
        solids: [
            [0, 5.2, 6.0, 9.8],
            [9.2, 6.8, 8.5, 8.2],
            [21.0, 8.4, 9.0, 6.6],
            [33.2, 9.8, 8.5, 5.2],
            [44.2, 11.2, 7.8, 3.8]
        ],
        invisBlocks: [[7.5, 3.8], [19.2, 5.2], [31.5, 6.8], [42.6, 8.0]],
        fallingFloors: [
            [6.3, 5.8, 2.3, 0.8],
            [18.1, 7.5, 2.3, 0.8],
            [30.4, 9.0, 2.2, 0.8],
            [41.9, 10.4, 2.0, 0.8]
        ],
        spikeTraps: [
            { x: 12.4, y: 0, w: 1.6, dir: 'boulder', triggerX: 10.9 },
            { x: 24.5, y: 0, w: 1.6, dir: 'boulder', triggerX: 23.0 },
            { x: 36.2, y: 0, w: 1.6, dir: 'boulder', triggerX: 34.7 },
            { x: 46.4, y: 10.4, w: 1.2, dir: 'up', triggerX: 45.4 }
        ],
        enemies: [
            { x: 12.3, y: 6.0, minX: 9.6, maxX: 17.2, speed: 2.65, type: 'john_laser_sniper' },
            { x: 27.1, y: 7.6, minX: 21.4, maxX: 29.5, speed: 2.8, type: 'john_dash_bot' },
            { x: 36.3, y: 6.0, minX: 33.6, maxX: 41.2, speed: 2.65, type: 'john_cryo_drone' },
            { x: 48.0, y: 10.4, minX: 48.0, maxX: 48.0, speed: 2.0, type: 'john_titan_mech' }
        ],
        fakeGoals: []
    },
    {
        name: "112. Kaskada Graniowa",
        theme: "mountain",
        hasRaygun: true,
        width: 54,
        spawn: [1.5, 3.5],
        goal: [50.5, 9.6],
        solids: [
            [0, 5.5, 6.2, 9.5],
            [9.5, 7.0, 9.2, 8.0],
            [11.8, 3.8, 4.2, 0.7],
            [22.0, 8.6, 9.5, 6.4],
            [24.5, 5.2, 4.2, 0.7],
            [34.8, 10.2, 8.5, 4.8],
            [45.5, 11.4, 8.5, 3.6]
        ],
        invisBlocks: [[7.8, 4.0], [20.2, 5.5], [33.0, 7.2]],
        fallingFloors: [
            [6.6, 6.2, 2.3, 0.8],
            [19.1, 7.8, 2.3, 0.8],
            [31.9, 9.4, 2.3, 0.8],
            [43.5, 10.8, 1.8, 0.8]
        ],
        spikeTraps: [
            { x: 12.7, y: 0, w: 1.6, dir: 'boulder', triggerX: 11.2 },
            { x: 25.5, y: 0, w: 1.6, dir: 'boulder', triggerX: 24.0 },
            { x: 37.8, y: 0, w: 1.6, dir: 'boulder', triggerX: 36.3 },
            { x: 47.7, y: 10.6, w: 1.2, dir: 'up', triggerX: 46.7 }
        ],
        enemies: [
            { x: 12.8, y: 6.2, minX: 9.9, maxX: 18.2, speed: 2.31, type: 'john_vanguard' },
            { x: 28.4, y: 7.8, minX: 22.4, maxX: 31.0, speed: 2.82, type: 'john_dash_bot' },
            { x: 37.9, y: 9.4, minX: 35.2, maxX: 42.8, speed: 2.01, type: 'john_titan_mech' },
            { x: 49.8, y: 10.6, minX: 49.3, maxX: 50.0, speed: 2.67, type: 'john_laser_sniper' }
        ],
        fakeGoals: []
    },

    // ========================================================================
    // ROZDZIAŁ 3 - SEKCJA 4: GÓRSKIE TWIERDZE JOHNA (POZIOMY 113 - 125)
    // Elitarne garnizony Johna na dolnych zboczach góry tuż nad Zamkiem Dave'a!
    // ========================================================================
    {
        name: "113. Górski Posterunek Radarowy",
        theme: "mountain",
        hasRaygun: true,
        hasJohnOutpost: true,
        chapterTitle: "ROZDZIAŁ 3 • SEKCJA 4: ZBOCZA TWIERDZY JOHNA",
        width: 52,
        spawn: [1.5, 3.8],
        goal: [48.5, 8.6],
        solids: [
            [0, 5.8, 6.5, 9.2],
            [9.8, 7.2, 8.8, 7.8],
            [21.8, 8.8, 9.2, 6.2],
            [23.8, 5.4, 4.5, 0.7],
            [34.2, 10.4, 17.8, 4.6]
        ],
        invisBlocks: [[8.0, 4.2], [20.0, 5.6], [32.4, 7.0]],
        fallingFloors: [
            [6.8, 6.4, 2.4, 0.8],
            [19.0, 8.0, 2.2, 0.8],
            [31.4, 9.6, 2.2, 0.8]
        ],
        spikeTraps: [
            { x: 13.0, y: 0, w: 1.6, dir: 'boulder', triggerX: 11.5 },
            { x: 25.3, y: 0, w: 1.6, dir: 'boulder', triggerX: 23.8 },
            { x: 37.2, y: 0, w: 1.6, dir: 'boulder', triggerX: 35.7 },
            { x: 36.4, y: 9.6, w: 1.2, dir: 'up', triggerX: 35.4 }
        ],
        enemies: [
            { x: 13.0, y: 6.4, minX: 10.2, maxX: 18.1, speed: 2.84, type: 'john_dash_bot' },
            { x: 28.0, y: 8.0, minX: 22.2, maxX: 30.5, speed: 2.69, type: 'evad_bot' },
            { x: 41.5, y: 9.6, minX: 38.0, maxX: 48.0, speed: 2.69, type: 'john_laser_sniper' },
            { x: 45.0, y: 9.6, minX: 38.0, maxX: 48.0, speed: 2.33, type: 'john_vanguard' }
        ],
        fakeGoals: []
    },
    {
        name: "114. Stalowy Wąwóz",
        theme: "mountain",
        hasRaygun: true,
        hasJohnOutpost: true,
        width: 52,
        spawn: [1.5, 3.2],
        goal: [48.5, 9.4],
        solids: [
            [0, 5.2, 6.0, 9.8],
            [9.2, 6.8, 8.5, 8.2],
            [21.0, 8.4, 9.0, 6.6],
            [33.2, 9.8, 8.5, 5.2],
            [44.2, 11.2, 7.8, 3.8]
        ],
        invisBlocks: [[7.5, 3.8], [19.2, 5.2], [31.5, 6.8], [42.6, 8.0]],
        fallingFloors: [
            [6.3, 5.8, 2.3, 0.8],
            [18.1, 7.5, 2.3, 0.8],
            [30.4, 9.0, 2.2, 0.8],
            [41.9, 10.4, 2.0, 0.8]
        ],
        spikeTraps: [
            { x: 12.4, y: 0, w: 1.6, dir: 'boulder', triggerX: 10.9 },
            { x: 24.5, y: 0, w: 1.6, dir: 'boulder', triggerX: 23.0 },
            { x: 36.2, y: 0, w: 1.6, dir: 'boulder', triggerX: 34.7 },
            { x: 46.4, y: 10.4, w: 1.2, dir: 'up', triggerX: 45.4 }
        ],
        enemies: [
            { x: 12.3, y: 6.0, minX: 9.6, maxX: 17.2, speed: 2.03, type: 'john_titan_mech' },
            { x: 27.1, y: 7.6, minX: 21.4, maxX: 29.5, speed: 2.86, type: 'john_dash_bot' },
            { x: 36.3, y: 6.0, minX: 33.6, maxX: 41.2, speed: 2.71, type: 'john_cryo_drone' },
            { x: 48.0, y: 10.4, minX: 48.0, maxX: 48.0, speed: 2.71, type: 'john_laser_sniper' }
        ],
        fakeGoals: []
    },
    {
        name: "115. Pole Ostrzału Orbitalnego",
        theme: "mountain",
        hasRaygun: true,
        hasJohnOutpost: true,
        width: 54,
        spawn: [1.5, 3.5],
        goal: [50.5, 9.6],
        solids: [
            [0, 5.5, 6.2, 9.5],
            [9.5, 7.0, 9.2, 8.0],
            [11.8, 3.8, 4.2, 0.7],
            [22.0, 8.6, 9.5, 6.4],
            [24.5, 5.2, 4.2, 0.7],
            [34.8, 10.2, 8.5, 4.8],
            [45.5, 11.4, 8.5, 3.6]
        ],
        invisBlocks: [[7.8, 4.0], [20.2, 5.5], [33.0, 7.2]],
        fallingFloors: [
            [6.6, 6.2, 2.3, 0.8],
            [19.1, 7.8, 2.3, 0.8],
            [31.9, 9.4, 2.3, 0.8],
            [43.5, 10.8, 1.8, 0.8]
        ],
        spikeTraps: [
            { x: 12.7, y: 0, w: 1.6, dir: 'boulder', triggerX: 11.2 },
            { x: 25.5, y: 0, w: 1.6, dir: 'boulder', triggerX: 24.0 },
            { x: 37.8, y: 0, w: 1.6, dir: 'boulder', triggerX: 36.3 },
            { x: 47.7, y: 10.6, w: 1.2, dir: 'up', triggerX: 46.7 }
        ],
        enemies: [
            { x: 12.8, y: 6.2, minX: 9.9, maxX: 18.2, speed: 2.73, type: 'john_laser_sniper' },
            { x: 28.4, y: 7.8, minX: 22.4, maxX: 31.0, speed: 2.88, type: 'john_dash_bot' },
            { x: 37.9, y: 6.4, minX: 35.2, maxX: 42.8, speed: 2.73, type: 'john_cryo_drone' },
            { x: 49.8, y: 10.6, minX: 49.3, maxX: 50.0, speed: 2.36, type: 'john_vanguard' }
        ],
        fakeGoals: []
    },
    {
        name: "116. Wiszące Platformy nad Otchłanią",
        theme: "mountain",
        hasRaygun: true,
        hasJohnOutpost: true,
        width: 54,
        spawn: [1.5, 3.8],
        goal: [50.5, 8.6],
        solids: [
            [0, 5.8, 6.5, 9.2],
            [9.8, 7.2, 8.8, 7.8],
            [21.8, 8.8, 9.2, 6.2],
            [23.8, 5.4, 4.5, 0.7],
            [34.2, 10.4, 19.8, 4.6]
        ],
        invisBlocks: [[8.0, 4.2], [20.0, 5.6], [32.4, 7.0]],
        fallingFloors: [
            [6.8, 6.4, 2.4, 0.8],
            [19.0, 8.0, 2.2, 0.8],
            [31.4, 9.6, 2.2, 0.8]
        ],
        spikeTraps: [
            { x: 13.0, y: 0, w: 1.6, dir: 'boulder', triggerX: 11.5 },
            { x: 25.3, y: 0, w: 1.6, dir: 'boulder', triggerX: 23.8 },
            { x: 37.2, y: 0, w: 1.6, dir: 'boulder', triggerX: 35.7 },
            { x: 36.4, y: 9.6, w: 1.2, dir: 'up', triggerX: 35.4 }
        ],
        enemies: [
            { x: 13.0, y: 6.4, minX: 10.2, maxX: 18.1, speed: 2.9, type: 'john_dash_bot' },
            { x: 28.0, y: 5.0, minX: 22.2, maxX: 30.5, speed: 2.75, type: 'john_cryo_drone' },
            { x: 42.2, y: 9.6, minX: 38.0, maxX: 50.0, speed: 2.75, type: 'john_laser_sniper' },
            { x: 46.4, y: 9.6, minX: 38.0, maxX: 50.0, speed: 2.05, type: 'john_titan_mech' }
        ],
        fakeGoals: []
    },
    {
        name: "117. Bunkier Tytanów",
        theme: "mountain",
        hasRaygun: true,
        hasJohnOutpost: true,
        width: 54,
        spawn: [1.5, 3.2],
        goal: [50.5, 9.4],
        solids: [
            [0, 5.2, 6.0, 9.8],
            [9.2, 6.8, 8.5, 8.2],
            [21.0, 8.4, 9.0, 6.6],
            [33.2, 9.8, 8.5, 5.2],
            [44.2, 11.2, 9.8, 3.8]
        ],
        invisBlocks: [[7.5, 3.8], [19.2, 5.2], [31.5, 6.8], [42.6, 8.0]],
        fallingFloors: [
            [6.3, 5.8, 2.3, 0.8],
            [18.1, 7.5, 2.3, 0.8],
            [30.4, 9.0, 2.2, 0.8],
            [41.9, 10.4, 2.0, 0.8]
        ],
        spikeTraps: [
            { x: 12.4, y: 0, w: 1.6, dir: 'boulder', triggerX: 10.9 },
            { x: 24.5, y: 0, w: 1.6, dir: 'boulder', triggerX: 23.0 },
            { x: 36.2, y: 0, w: 1.6, dir: 'boulder', triggerX: 34.7 },
            { x: 46.4, y: 10.4, w: 1.2, dir: 'up', triggerX: 45.4 }
        ],
        enemies: [
            { x: 12.3, y: 6.0, minX: 9.6, maxX: 17.2, speed: 2.06, type: 'john_titan_mech' },
            { x: 27.1, y: 7.6, minX: 21.4, maxX: 29.5, speed: 2.92, type: 'john_dash_bot' },
            { x: 36.3, y: 9.0, minX: 33.6, maxX: 41.2, speed: 2.39, type: 'john_vanguard' },
            { x: 49.4, y: 10.4, minX: 48.0, maxX: 50.0, speed: 2.77, type: 'john_laser_sniper' }
        ],
        fakeGoals: []
    },
    {
        name: "118. Pionowy Klif Evada i Johna",
        theme: "mountain",
        hasRaygun: true,
        hasJohnOutpost: true,
        width: 54,
        spawn: [1.5, 3.5],
        goal: [50.5, 9.6],
        solids: [
            [0, 5.5, 6.2, 9.5],
            [9.5, 7.0, 9.2, 8.0],
            [11.8, 3.8, 4.2, 0.7],
            [22.0, 8.6, 9.5, 6.4],
            [24.5, 5.2, 4.2, 0.7],
            [34.8, 10.2, 8.5, 4.8],
            [45.5, 11.4, 8.5, 3.6]
        ],
        invisBlocks: [[7.8, 4.0], [20.2, 5.5], [33.0, 7.2]],
        fallingFloors: [
            [6.6, 6.2, 2.3, 0.8],
            [19.1, 7.8, 2.3, 0.8],
            [31.9, 9.4, 2.3, 0.8],
            [43.5, 10.8, 1.8, 0.8]
        ],
        spikeTraps: [
            { x: 12.7, y: 0, w: 1.6, dir: 'boulder', triggerX: 11.2 },
            { x: 25.5, y: 0, w: 1.6, dir: 'boulder', triggerX: 24.0 },
            { x: 37.8, y: 0, w: 1.6, dir: 'boulder', triggerX: 36.3 },
            { x: 47.7, y: 10.6, w: 1.2, dir: 'up', triggerX: 46.7 }
        ],
        enemies: [
            { x: 12.8, y: 6.2, minX: 9.9, maxX: 18.2, speed: 2.79, type: 'evad_bot' },
            { x: 28.4, y: 7.8, minX: 22.4, maxX: 31.0, speed: 2.94, type: 'john_dash_bot' },
            { x: 37.9, y: 9.4, minX: 35.2, maxX: 42.8, speed: 2.79, type: 'john_laser_sniper' },
            { x: 49.8, y: 10.6, minX: 49.3, maxX: 50.0, speed: 2.4, type: 'john_vanguard' }
        ],
        fakeGoals: []
    },
    {
        name: "119. Zdradziecka Przełęcz",
        theme: "mountain",
        hasRaygun: true,
        hasJohnOutpost: true,
        width: 54,
        spawn: [1.5, 3.8],
        goal: [50.5, 8.6],
        solids: [
            [0, 5.8, 6.5, 9.2],
            [9.8, 7.2, 8.8, 7.8],
            [21.8, 8.8, 9.2, 6.2],
            [23.8, 5.4, 4.5, 0.7],
            [34.2, 10.4, 19.8, 4.6]
        ],
        invisBlocks: [[8.0, 4.2], [20.0, 5.6], [32.4, 7.0]],
        fallingFloors: [
            [6.8, 6.4, 2.4, 0.8],
            [19.0, 8.0, 2.2, 0.8],
            [31.4, 9.6, 2.2, 0.8]
        ],
        spikeTraps: [
            { x: 13.0, y: 0, w: 1.6, dir: 'boulder', triggerX: 11.5 },
            { x: 25.3, y: 0, w: 1.6, dir: 'boulder', triggerX: 23.8 },
            { x: 37.2, y: 0, w: 1.6, dir: 'boulder', triggerX: 35.7 },
            { x: 36.4, y: 9.6, w: 1.2, dir: 'up', triggerX: 35.4 }
        ],
        enemies: [
            { x: 13.0, y: 6.4, minX: 10.2, maxX: 18.1, speed: 2.96, type: 'john_dash_bot' },
            { x: 28.0, y: 8.0, minX: 22.2, maxX: 30.5, speed: 2.81, type: 'john_laser_sniper' },
            { x: 42.2, y: 9.6, minX: 38.0, maxX: 50.0, speed: 2.08, type: 'john_titan_mech' },
            { x: 46.4, y: 9.6, minX: 38.0, maxX: 50.0, speed: 2.81, type: 'evad_bot' }
        ],
        fakeGoals: []
    },
    {
        name: "120. Lawina Kamieni i Laserów",
        theme: "mountain",
        hasRaygun: true,
        hasJohnOutpost: true,
        width: 56,
        spawn: [1.5, 3.2],
        goal: [52.5, 9.4],
        solids: [
            [0, 5.2, 6.0, 9.8],
            [9.2, 6.8, 8.5, 8.2],
            [21.0, 8.4, 9.0, 6.6],
            [33.2, 9.8, 8.5, 5.2],
            [44.2, 11.2, 11.8, 3.8]
        ],
        invisBlocks: [[7.5, 3.8], [19.2, 5.2], [31.5, 6.8], [42.6, 8.0]],
        fallingFloors: [
            [6.3, 5.8, 2.3, 0.8],
            [18.1, 7.5, 2.3, 0.8],
            [30.4, 9.0, 2.2, 0.8],
            [41.9, 10.4, 2.0, 0.8]
        ],
        spikeTraps: [
            { x: 12.4, y: 0, w: 1.6, dir: 'boulder', triggerX: 10.9 },
            { x: 24.5, y: 0, w: 1.6, dir: 'boulder', triggerX: 23.0 },
            { x: 36.2, y: 0, w: 1.6, dir: 'boulder', triggerX: 34.7 },
            { x: 46.4, y: 10.4, w: 1.2, dir: 'up', triggerX: 45.4 }
        ],
        enemies: [
            { x: 12.3, y: 6.0, minX: 9.6, maxX: 17.2, speed: 2.98, type: 'john_dash_bot' },
            { x: 27.1, y: 7.6, minX: 21.4, maxX: 29.5, speed: 2.44, type: 'john_vanguard' },
            { x: 36.3, y: 6.0, minX: 33.6, maxX: 41.2, speed: 2.83, type: 'john_cryo_drone' },
            { x: 50.8, y: 10.4, minX: 48.0, maxX: 52.0, speed: 2.09, type: 'john_titan_mech' }
        ],
        fakeGoals: []
    },
    {
        name: "121. Kaskada Pięciu Regimów",
        theme: "mountain",
        hasRaygun: true,
        hasJohnOutpost: true,
        width: 56,
        spawn: [1.5, 3.5],
        goal: [52.5, 9.6],
        solids: [
            [0, 5.5, 6.2, 9.5],
            [9.5, 7.0, 9.2, 8.0],
            [11.8, 3.8, 4.2, 0.7],
            [22.0, 8.6, 9.5, 6.4],
            [24.5, 5.2, 4.2, 0.7],
            [34.8, 10.2, 8.5, 4.8],
            [45.5, 11.4, 10.5, 3.6]
        ],
        invisBlocks: [[7.8, 4.0], [20.2, 5.5], [33.0, 7.2]],
        fallingFloors: [
            [6.6, 6.2, 2.3, 0.8],
            [19.1, 7.8, 2.3, 0.8],
            [31.9, 9.4, 2.3, 0.8],
            [43.5, 10.8, 1.8, 0.8]
        ],
        spikeTraps: [
            { x: 12.7, y: 0, w: 1.6, dir: 'boulder', triggerX: 11.2 },
            { x: 25.5, y: 0, w: 1.6, dir: 'boulder', triggerX: 24.0 },
            { x: 37.8, y: 0, w: 1.6, dir: 'boulder', triggerX: 36.3 },
            { x: 47.7, y: 10.6, w: 1.2, dir: 'up', triggerX: 46.7 }
        ],
        enemies: [
            { x: 12.8, y: 6.2, minX: 9.9, maxX: 18.2, speed: 3.0, type: 'john_dash_bot' },
            { x: 28.4, y: 7.8, minX: 22.4, maxX: 31.0, speed: 2.85, type: 'john_laser_sniper' },
            { x: 37.9, y: 6.4, minX: 35.2, maxX: 42.8, speed: 2.85, type: 'john_cryo_drone' },
            { x: 51.2, y: 10.6, minX: 49.3, maxX: 52.0, speed: 2.45, type: 'john_vanguard' },
            { x: 12.8, y: 6.2, minX: 9.9, maxX: 18.2, speed: 2.1, type: 'john_titan_mech' }
        ],
        fakeGoals: []
    },
    {
        name: "122. Most nad Przepaścią Królestwa",
        theme: "mountain",
        hasRaygun: true,
        hasJohnOutpost: true,
        width: 56,
        spawn: [1.5, 3.8],
        goal: [52.5, 8.6],
        solids: [
            [0, 5.8, 6.5, 9.2],
            [9.8, 7.2, 8.8, 7.8],
            [21.8, 8.8, 9.2, 6.2],
            [23.8, 5.4, 4.5, 0.7],
            [34.2, 10.4, 21.8, 4.6]
        ],
        invisBlocks: [[8.0, 4.2], [20.0, 5.6], [32.4, 7.0]],
        fallingFloors: [
            [6.8, 6.4, 2.4, 0.8],
            [19.0, 8.0, 2.2, 0.8],
            [31.4, 9.6, 2.2, 0.8]
        ],
        spikeTraps: [
            { x: 13.0, y: 0, w: 1.6, dir: 'boulder', triggerX: 11.5 },
            { x: 25.3, y: 0, w: 1.6, dir: 'boulder', triggerX: 23.8 },
            { x: 37.2, y: 0, w: 1.6, dir: 'boulder', triggerX: 35.7 },
            { x: 36.4, y: 9.6, w: 1.2, dir: 'up', triggerX: 35.4 }
        ],
        enemies: [
            { x: 13.0, y: 6.4, minX: 10.2, maxX: 18.1, speed: 2.87, type: 'john_laser_sniper' },
            { x: 28.0, y: 5.0, minX: 22.2, maxX: 30.5, speed: 2.87, type: 'john_cryo_drone' },
            { x: 42.9, y: 9.6, minX: 38.0, maxX: 52.0, speed: 3.02, type: 'john_dash_bot' },
            { x: 47.8, y: 9.6, minX: 38.0, maxX: 52.0, speed: 2.46, type: 'john_vanguard' },
            { x: 13.0, y: 6.4, minX: 10.2, maxX: 18.1, speed: 2.87, type: 'evad_bot' }
        ],
        fakeGoals: []
    },
    {
        name: "123. Bastion Cyber-Snajperów",
        theme: "mountain",
        transitionToTheme: "day",
        hasRaygun: true,
        hasJohnOutpost: true,
        width: 56,
        spawn: [1.5, 3.2],
        goal: [52.5, 9.4],
        solids: [
            [0, 5.2, 6.0, 9.8],
            [9.2, 6.8, 8.5, 8.2],
            [21.0, 8.4, 9.0, 6.6],
            [33.2, 9.8, 8.5, 5.2],
            [44.2, 11.2, 11.8, 3.8]
        ],
        invisBlocks: [[7.5, 3.8], [19.2, 5.2], [31.5, 6.8], [42.6, 8.0]],
        fallingFloors: [
            [6.3, 5.8, 2.3, 0.8],
            [18.1, 7.5, 2.3, 0.8],
            [30.4, 9.0, 2.2, 0.8],
            [41.9, 10.4, 2.0, 0.8]
        ],
        spikeTraps: [
            { x: 12.4, y: 0, w: 1.6, dir: 'boulder', triggerX: 10.9 },
            { x: 24.5, y: 0, w: 1.6, dir: 'boulder', triggerX: 23.0 },
            { x: 36.2, y: 0, w: 1.6, dir: 'boulder', triggerX: 34.7 },
            { x: 46.4, y: 10.4, w: 1.2, dir: 'up', triggerX: 45.4 }
        ],
        enemies: [
            { x: 12.3, y: 6.0, minX: 9.6, maxX: 17.2, speed: 2.89, type: 'john_laser_sniper' },
            { x: 27.1, y: 7.6, minX: 21.4, maxX: 29.5, speed: 3.04, type: 'john_dash_bot' },
            { x: 36.3, y: 9.0, minX: 33.6, maxX: 41.2, speed: 2.48, type: 'john_vanguard' },
            { x: 50.8, y: 10.4, minX: 48.0, maxX: 52.0, speed: 2.12, type: 'john_titan_mech' },
            { x: 12.3, y: 6.0, minX: 9.6, maxX: 17.2, speed: 2.89, type: 'john_laser_sniper' }
        ],
        fakeGoals: []
    },
    {
        name: "124. Przedpole Doliny Zamkowej",
        theme: "mountain",
        transitionToTheme: "day",
        hasRaygun: true,
        hasJohnOutpost: true,
        width: 56,
        spawn: [1.5, 3.5],
        goal: [52.5, 9.6],
        solids: [
            [0, 5.5, 6.2, 9.5],
            [9.5, 7.0, 9.2, 8.0],
            [11.8, 3.8, 4.2, 0.7],
            [22.0, 8.6, 9.5, 6.4],
            [24.5, 5.2, 4.2, 0.7],
            [34.8, 10.2, 8.5, 4.8],
            [45.5, 11.4, 10.5, 3.6]
        ],
        invisBlocks: [[7.8, 4.0], [20.2, 5.5], [33.0, 7.2]],
        fallingFloors: [
            [6.6, 6.2, 2.3, 0.8],
            [19.1, 7.8, 2.3, 0.8],
            [31.9, 9.4, 2.3, 0.8],
            [43.5, 10.8, 1.8, 0.8]
        ],
        spikeTraps: [
            { x: 12.7, y: 0, w: 1.6, dir: 'boulder', triggerX: 11.2 },
            { x: 25.5, y: 0, w: 1.6, dir: 'boulder', triggerX: 24.0 },
            { x: 37.8, y: 0, w: 1.6, dir: 'boulder', triggerX: 36.3 },
            { x: 47.7, y: 10.6, w: 1.2, dir: 'up', triggerX: 46.7 }
        ],
        enemies: [
            { x: 12.8, y: 6.2, minX: 9.9, maxX: 18.2, speed: 3.06, type: 'john_dash_bot' },
            { x: 28.4, y: 7.8, minX: 22.4, maxX: 31.0, speed: 2.13, type: 'john_titan_mech' },
            { x: 37.9, y: 6.4, minX: 35.2, maxX: 42.8, speed: 2.91, type: 'john_cryo_drone' },
            { x: 51.2, y: 10.6, minX: 49.3, maxX: 52.0, speed: 2.5, type: 'john_vanguard' },
            { x: 12.8, y: 6.2, minX: 9.9, maxX: 18.2, speed: 2.91, type: 'john_laser_sniper' }
        ],
        fakeGoals: []
    },
    {
        name: "125. Ostatni Bastion Gór • Bramy Domu",
        theme: "mountain",
        transitionToTheme: "day",
        hasRaygun: true,
        hasJohnOutpost: true,
        hasCastleGate: true,
        width: 58,
        spawn: [1.5, 3.8],
        goal: [54.5, 8.6],
        solids: [
            [0, 5.8, 6.5, 9.2],
            [9.8, 7.2, 8.8, 7.8],
            [21.8, 8.8, 9.2, 6.2],
            [23.8, 5.4, 4.5, 0.7],
            [34.2, 10.4, 23.8, 4.6]
        ],
        invisBlocks: [[8.0, 4.2], [20.0, 5.6], [32.4, 7.0]],
        fallingFloors: [
            [6.8, 6.4, 2.4, 0.8],
            [19.0, 8.0, 2.2, 0.8],
            [31.4, 9.6, 2.2, 0.8]
        ],
        spikeTraps: [
            { x: 13.0, y: 0, w: 1.6, dir: 'boulder', triggerX: 11.5 },
            { x: 25.3, y: 0, w: 1.6, dir: 'boulder', triggerX: 23.8 },
            { x: 37.2, y: 0, w: 1.6, dir: 'boulder', triggerX: 35.7 },
            { x: 36.4, y: 9.6, w: 1.2, dir: 'up', triggerX: 35.4 }
        ],
        enemies: [
            { x: 13.0, y: 6.4, minX: 10.2, maxX: 18.1, speed: 3.08, type: 'john_dash_bot' },
            { x: 28.0, y: 8.0, minX: 22.2, maxX: 30.5, speed: 2.93, type: 'john_laser_sniper' },
            { x: 43.6, y: 9.6, minX: 38.0, maxX: 54.0, speed: 2.14, type: 'john_titan_mech' },
            { x: 49.2, y: 6.6, minX: 38.0, maxX: 54.0, speed: 2.93, type: 'john_cryo_drone' },
            { x: 13.0, y: 6.4, minX: 10.2, maxX: 18.1, speed: 2.51, type: 'john_vanguard' },
            { x: 28.0, y: 8.0, minX: 22.2, maxX: 30.5, speed: 2.93, type: 'evad_bot' }
        ],
        fakeGoals: []
    }
];


// ============================================================================
// 3-KROKOWY WYBÓR POZIOMÓW (ROZDZIAŁ 1 & 2 -> SEKCJE -> POZIOMY 1 - 80)
// ============================================================================
const CHAPTER_DEFINITIONS = [
    {
        id: 0,
        badge: "ROZDZIAŁ 1 • 4 SEKCJE (POZIOMY 1 - 50)",
        title: "Rozdział 1: Forteca Evada",
        desc: "Przemierz Sielankowe Wzgórza, Las Zmierzchu i Krwawy Księżyc, aż do sali tronowej Mega-Robo Evada!",
        minIdx: 0,
        maxIdx: 49,
        accent: "border-yellow-400 text-yellow-300"
    },
    {
        id: 1,
        badge: "ROZDZIAŁ 2 • 4 SEKCJE (POZIOMY 51 - 80)",
        title: "Rozdział 2: Głębiny, Dżungla i Baza Johna",
        desc: "Wypłyń z rzeki, zdobądź Ostrze Rdzeniowy Kij od Jerry'ego, pokonaj Jetpack-Boty i wejdź do Tajnej Bazy Johna!",
        minIdx: 50,
        maxIdx: 79,
        accent: "border-cyan-400 text-cyan-300"
    },
    {
        id: 2,
        badge: "ROZDZIAŁ 3 • 4 SEKCJE (POZIOMY 81 - 125)",
        title: "Rozdział 3: Sahara i Góry Johna",
        desc: "Przebij się z Raygunem 360° przez wydmy Dinozaurów, wyskocz z portalu w Górach i pokonaj elitarne boty Johna!",
        minIdx: 80,
        maxIdx: 124,
        accent: "border-orange-400 text-orange-300"
    }
];

const SECTION_DEFINITIONS = [
    {
        id: 0,
        chapterId: 0,
        badge: "ROZDZIAŁ 1 • SEKCJA 1 (POZIOMY 1 - 14)",
        title: "1. Sielankowe Wzgórza",
        desc: "Słoneczne wzgórza, klasyczne pułapki i pierwsze wyzwania na planecie Cubelon.",
        minIdx: 0,
        maxIdx: 13,
        accent: "border-emerald-400 text-emerald-300"
    },
    {
        id: 1,
        chapterId: 0,
        badge: "ROZDZIAŁ 1 • SEKCJA 2 (POZIOMY 15 - 28)",
        title: "2. Las Zmierzchu",
        desc: "Gęsty las o zmierzchu, zgniłe mosty, kominy wspinaczkowe i leśne rozpadliny.",
        minIdx: 14,
        maxIdx: 27,
        accent: "border-purple-400 text-purple-300"
    },
    {
        id: 2,
        chapterId: 0,
        badge: "ROZDZIAŁ 1 • SEKCJA 3 (POZIOMY 29 - 40)",
        title: "3. Krwawy Księżyc (Noc)",
        desc: "Mroczna noc przed Zamkiem, czerwone iglice, mury obronne i fosa zamkowa.",
        minIdx: 28,
        maxIdx: 39,
        accent: "border-rose-500 text-rose-300"
    },
    {
        id: 3,
        chapterId: 0,
        badge: "ROZDZIAŁ 1 • SEKCJA 4 (POZIOMY 41 - 50)",
        title: "4. Wnętrze Zamku Evada",
        desc: "Kamienne lochy, zbrojownia, królewskie schody i finałowe starcie z Mega-Robo Evadem!",
        minIdx: 40,
        maxIdx: 49,
        accent: "border-amber-400 text-amber-300"
    },
    {
        id: 4,
        chapterId: 1,
        badge: "ROZDZIAŁ 2 • SEKCJA 1 (POZIOMY 51 - 60)",
        title: "1. Podwodna Rzeka i Kaskady",
        desc: "Wypłyń spod murów zamku, pokonaj piaszczyste dno, podwodne wodospady i Robo-Piranie!",
        minIdx: 50,
        maxIdx: 59,
        accent: "border-cyan-400 text-cyan-300"
    },
    {
        id: 5,
        chapterId: 1,
        badge: "ROZDZIAŁ 2 • SEKCJA 2 (POZIOMY 61 - 70)",
        title: "2. Dżungla Cubelonu i Spotkanie z Jerrym",
        desc: "Wyjdź z wody na brzeg gęstej dżungli i spotkaj brata Jerry'ego na szczycie koron drzew!",
        minIdx: 60,
        maxIdx: 69,
        accent: "border-lime-400 text-lime-300"
    },
    {
        id: 6,
        chapterId: 1,
        badge: "ROZDZIAŁ 2 • SEKCJA 3 (POZIOMY 71 - 75)",
        title: "3. Posterunki Johna (Ostrze)",
        desc: "Celuj Ostrzem Rdzeniowym Kijem, aby dziabać szarżujące Jetpack-Boty i dotrzeć do wrót bazy!",
        minIdx: 70,
        maxIdx: 74,
        accent: "border-amber-400 text-amber-300"
    },
    {
        id: 7,
        chapterId: 1,
        badge: "ROZDZIAŁ 2 • SEKCJA 4 (POZIOMY 76 - 80)",
        title: "4. Tajna Baza Johna (Finał)",
        desc: "Odbijaj pociski latających Raygun-Botów swoim kijem i odnajdź Angelę w komorze głównej!",
        minIdx: 75,
        maxIdx: 79,
        accent: "border-rose-400 text-rose-300"
    },
    {
        id: 8,
        chapterId: 2,
        badge: "ROZDZIAŁ 3 • SEKCJA 1 (POZIOMY 81 - 90)",
        title: "1. Rozżarzone Wydmy Sahary",
        desc: "Palące słońce, efekt fali gorąca (Heatwave), kolczaste kaktusy i szybkie skaczące Dino-Raptory!",
        minIdx: 80,
        maxIdx: 89,
        accent: "border-amber-400 text-amber-300"
    },
    {
        id: 9,
        chapterId: 2,
        badge: "ROZDZIAŁ 3 • SEKCJA 2 (POZIOMY 91 - 100)",
        title: "2. Kanion Wielkich Dinozaurów",
        desc: "Ruchome piaski, kaniony piaskowca i potężne pancerne Dino-Rexy o ogromnym HP goniące Dave'a!",
        minIdx: 90,
        maxIdx: 99,
        accent: "border-orange-500 text-orange-300"
    }
    ,
    {
        id: 10,
        chapterId: 2,
        badge: "ROZDZIAŁ 3 • SEKCJA 3 (POZIOMY 101 - 112)",
        title: "3. Ośnieżone Granie i Lawiny",
        desc: "Strome górskie przepaści, spadające głazy i nowe Cyber-Dashery Johna unikające Twoich pocisków!",
        minIdx: 100,
        maxIdx: 111,
        accent: "border-sky-400 text-sky-300"
    },
    {
        id: 11,
        chapterId: 2,
        badge: "ROZDZIAŁ 3 • SEKCJA 4 (POZIOMY 113 - 125)",
        title: "4. Górskie Twierdze Johna (Finał)",
        desc: "Elitarne Laser-Snajpery, Krio-Drony, Pancerne Gwardie i Egzoszkielety Johna na szlaku do zamku!",
        minIdx: 112,
        maxIdx: 124,
        accent: "border-indigo-400 text-indigo-300"
    }
];

let levelSelectStep = 1;
let selectedChapterIdx = 0;
let selectedActIdx = 0;

const levelsGrid = document.getElementById('levels-grid');
const levelsModalTitle = document.getElementById('levels-modal-title');
const levelsModalBreadcrumb = document.getElementById('levels-modal-breadcrumb');
const btnLevelsStepBack = document.getElementById('btn-levels-step-back');

function renderLevelsModalStep() {
    if (!levelsGrid) return;
    levelsGrid.innerHTML = '';
    activeMenuContext = null;

    // Przycisk "Odblokuj wszystkie (1-80)" widoczny WYŁĄCZNIE gdy Tryb Dev (_dbgM) jest włączony!
    const unlockAllBtn = document.getElementById('btn-levels-unlock-all');
    if (unlockAllBtn) {
        if (_dbgM) {
            unlockAllBtn.classList.remove('hidden');
        } else {
            unlockAllBtn.classList.add('hidden');
        }
    }

    if (levelSelectStep === 1) {
        levelsModalTitle.textContent = '🗺️ KROK 1/3: WYBIERZ ROZDZIAŁ';
        levelsModalBreadcrumb.textContent = `Odblokowano: ${unlockedLevelIdx + 1} / ${LEVELS.length} poziomów • Przechodź poziomy, aby odblokować kolejne!`;
        levelsModalBreadcrumb.className = 'text-[10px] text-cyan-300 font-bold mono-font mt-0.5';
        levelsGrid.className = 'grid grid-cols-1 sm:grid-cols-2 gap-3.5 px-3 py-2 my-auto max-h-[72dvh]';
        btnLevelsStepBack.classList.add('hidden');

        CHAPTER_DEFINITIONS.forEach((chap) => {
            const totalInChap = chap.maxIdx - chap.minIdx + 1;
            const effUnlocked = _dbgM ? (LEVELS.length - 1) : unlockedLevelIdx;
            const unlockedInChap = Math.max(0, Math.min(totalInChap, effUnlocked - chap.minIdx + 1));
            const isChapReached = effUnlocked >= chap.minIdx;

            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = `btn-retro-secondary w-full py-4 px-4 rounded-xl flex items-center justify-between text-left border-l-4 ${isChapReached ? chap.accent : 'border-slate-600 opacity-65'}`;
            btn.innerHTML = `
                <div class="pr-2">
                    <div class="flex items-center gap-1.5 flex-wrap">
                        <span class="text-[9px] font-extrabold ${isChapReached ? 'text-yellow-300' : 'text-slate-400'} mono-font tracking-wider">${chap.badge}</span>
                        <span class="text-[8px] font-extrabold px-1.5 py-0.2 rounded mono-font ${isChapReached ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-400/50' : 'bg-slate-900 text-rose-400 border border-slate-700'}">
                            ${isChapReached ? `ODBLOKOWANO ${unlockedInChap}/${totalInChap}` : `🔒 WYMAGA UKOŃCZENIA POZ. #${chap.minIdx}`}
                        </span>
                    </div>
                    <div class="text-sm sm:text-base font-extrabold text-white mt-1">${chap.title}</div>
                    <div class="text-[10px] sm:text-[11px] text-slate-300 mt-1 leading-snug">${chap.desc}</div>
                </div>
                <span class="mania-arrow ${isChapReached ? 'text-yellow-300' : 'text-slate-500'} text-base font-black shrink-0">${isChapReached ? '▶' : '🔒'}</span>
            `;
            btn.addEventListener('mouseenter', () => sfx.play('ui_hover'));
            btn.addEventListener('click', () => {
                if (!isChapReached) {
                    sfx.play('troll');
                    levelsModalBreadcrumb.textContent = `🔒 ${chap.title} jest zablokowany! Musisz najpierw ukończyć Poziom #${chap.minIdx} (aktualnie odblokowany: #${unlockedLevelIdx + 1}).`;
                    levelsModalBreadcrumb.className = 'text-[10px] text-rose-400 font-extrabold mono-font mt-0.5';
                    return;
                }
                sfx.play('ui_select');
                selectedChapterIdx = chap.id;
                levelSelectStep = 2;
                renderLevelsModalStep();
            });
            levelsGrid.appendChild(btn);
        });
    } else if (levelSelectStep === 2) {
        const chap = CHAPTER_DEFINITIONS[selectedChapterIdx] || CHAPTER_DEFINITIONS[0];
        levelsModalTitle.textContent = `🗺️ KROK 2/3: ${chap.title.toUpperCase()}`;
        levelsModalBreadcrumb.textContent = `Wybierz odblokowaną sekcję w ramach ${chap.title}`;
        levelsModalBreadcrumb.className = 'text-[10px] text-cyan-300 font-bold mono-font mt-0.5';
        levelsGrid.className = 'grid grid-cols-1 sm:grid-cols-2 gap-3 px-3 py-2 my-auto max-h-[72dvh]';
        btnLevelsStepBack.classList.remove('hidden');
        btnLevelsStepBack.textContent = '◀ WRÓĆ DO ROZDZIAŁÓW';

        const chapSections = SECTION_DEFINITIONS.filter(s => s.chapterId === selectedChapterIdx);
        chapSections.forEach((sec) => {
            const totalInSec = sec.maxIdx - sec.minIdx + 1;
            const effUnlocked = _dbgM ? (LEVELS.length - 1) : unlockedLevelIdx;
            const unlockedInSec = Math.max(0, Math.min(totalInSec, effUnlocked - sec.minIdx + 1));
            const isSectionReached = effUnlocked >= sec.minIdx;

            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = `btn-retro-secondary w-full py-3 px-4 rounded-xl flex items-center justify-between text-left border-l-4 ${isSectionReached ? sec.accent : 'border-slate-600 opacity-65'}`;
            btn.innerHTML = `
                <div class="pr-2">
                    <div class="flex items-center gap-1.5 flex-wrap">
                        <span class="text-[9px] font-extrabold ${isSectionReached ? 'text-yellow-300' : 'text-slate-400'} mono-font tracking-wider">${sec.badge}</span>
                        <span class="text-[8px] font-extrabold px-1.5 py-0.2 rounded mono-font ${isSectionReached ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-400/50' : 'bg-slate-900 text-rose-400 border border-slate-700'}">
                            ${isSectionReached ? `ODBLOKOWANO ${unlockedInSec}/${totalInSec}` : `🔒 WYMAGA POZ. #${sec.minIdx + 1}`}
                        </span>
                    </div>
                    <div class="text-xs sm:text-sm font-extrabold text-white mt-0.5">${sec.title}</div>
                    <div class="text-[10px] text-slate-300 mt-1 leading-snug">${sec.desc}</div>
                </div>
                <span class="mania-arrow ${isSectionReached ? 'text-yellow-300' : 'text-slate-500'} text-sm font-black shrink-0">${isSectionReached ? '▶' : '🔒'}</span>
            `;
            btn.addEventListener('mouseenter', () => sfx.play('ui_hover'));
            btn.addEventListener('click', () => {
                if (!isSectionReached) {
                    sfx.play('troll');
                    levelsModalBreadcrumb.textContent = `🔒 Sekcja "${sec.title}" jest zablokowana! Przejdź najpierw do Poziomu #${sec.minIdx + 1}.`;
                    levelsModalBreadcrumb.className = 'text-[10px] text-rose-400 font-extrabold mono-font mt-0.5';
                    return;
                }
                sfx.play('ui_select');
                selectedActIdx = sec.id;
                levelSelectStep = 3;
                renderLevelsModalStep();
            });
            levelsGrid.appendChild(btn);
        });
    } else if (levelSelectStep === 3) {
        const sec = SECTION_DEFINITIONS.find(s => s.id === selectedActIdx) || SECTION_DEFINITIONS[0];
        levelsModalTitle.textContent = `🗺️ KROK 3/3: ${sec.title.toUpperCase()}`;
        levelsModalBreadcrumb.textContent = `${sec.badge} • Ukończ aktualny poziom, aby odblokować następny!`;
        levelsModalBreadcrumb.className = 'text-[10px] text-cyan-300 font-bold mono-font mt-0.5';
        levelsGrid.className = 'grid grid-cols-1 sm:grid-cols-2 gap-2.5 px-3 py-2 my-auto max-h-[72dvh]';
        btnLevelsStepBack.classList.remove('hidden');
        btnLevelsStepBack.textContent = '◀ WRÓĆ DO SEKCJI';

        for (let i = sec.minIdx; i <= sec.maxIdx; i++) {
            const lvl = LEVELS[i];
            const cleanName = lvl.name.split('. ')[1] || lvl.name;
            const effUnlocked = _dbgM ? (LEVELS.length - 1) : unlockedLevelIdx;
            const isUnlocked = (i <= effUnlocked);
            const isCompleted = (i < effUnlocked);

            const btn = document.createElement('button');
            btn.type = 'button';
            if (isUnlocked) {
                btn.className = 'btn-retro-secondary w-full py-2.5 px-3.5 rounded-xl flex items-center justify-between text-left';
                btn.innerHTML = `
                    <div class="flex items-center gap-2.5 min-w-0 pr-2">
                        <span class="${isCompleted ? 'bg-emerald-700 border-emerald-300/80 text-emerald-100' : 'bg-purple-700 border-yellow-300/70 text-yellow-200'} border text-[10px] font-extrabold px-2 py-0.5 rounded mono-font shrink-0">
                            ${isCompleted ? '✓' : ''} #${i + 1}
                        </span>
                        <span class="text-xs sm:text-sm font-extrabold text-white truncate">${cleanName}</span>
                    </div>
                    <span class="mania-arrow text-yellow-300 text-xs font-black shrink-0">GRAJ ▶</span>
                `;
                btn.addEventListener('mouseenter', () => sfx.play('ui_hover'));
                btn.addEventListener('click', () => {
                    sfx.play('ui_select');
                    startGame(i, false, false);
                });
            } else {
                btn.className = 'btn-retro-secondary w-full py-2.5 px-3.5 rounded-xl flex items-center justify-between text-left opacity-60 border-slate-700';
                btn.innerHTML = `
                    <div class="flex items-center gap-2.5 min-w-0 pr-2">
                        <span class="bg-slate-800 border border-slate-600 text-slate-400 text-[10px] font-extrabold px-2 py-0.5 rounded mono-font shrink-0">
                            🔒 #${i + 1}
                        </span>
                        <span class="text-xs sm:text-sm font-bold text-slate-400 truncate">${cleanName}</span>
                    </div>
                    <span class="text-[10px] text-rose-400 font-extrabold mono-font shrink-0">ZABLOKOWANY</span>
                `;
                btn.addEventListener('click', () => {
                    sfx.play('troll');
                    levelsModalBreadcrumb.textContent = `🔒 Poziom #${i + 1} jest zablokowany! Przejdź najpierw Poziom #${unlockedLevelIdx + 1}.`;
                    levelsModalBreadcrumb.className = 'text-[10px] text-rose-400 font-extrabold mono-font mt-0.5';
                });
            }
            levelsGrid.appendChild(btn);
        }
    }
}

function openLevelsModal() {
    levelSelectStep = 1;
    selectedChapterIdx = savedPlayerLevelIdx >= 80 ? 2 : (savedPlayerLevelIdx >= 50 ? 1 : 0);
    renderLevelsModalStep();
    levelsModal.classList.remove('hidden');
    updateTouchControlsVisibility();
    syncMusicForState();
}

