// ============================================================================
// MODUŁ 1: STAŁE, KONFIGURACJA KOLORÓW I ZARZĄDZANIE EKRANEM
// ============================================================================
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const portraitCanvas = document.getElementById('portraitCanvas');
const pCtx = portraitCanvas.getContext('2d');

const TILE = 40;
const FIXED_DT = 1000 / 60;

const THEME_PALETTES = {
    day:                 { left: '#0284c7', right: '#16a34a', top: '#7c3aed' },
    forest:              { left: '#4f46e5', right: '#9333ea', top: '#0d9488' },
    darkforest:          { left: '#e11d48', right: '#7e22ce', top: '#dc2626' },
    castle:              { left: '#ea580c', right: '#0891b2', top: '#dc2626' },
    underwater_castle:   { left: '#0369a1', right: '#1e3a8a', top: '#0284c7' },
    underwater_sand:     { left: '#0284c7', right: '#ca8a04', top: '#06b6d4' },
    underwater_shallows: { left: '#0d9488', right: '#a16207', top: '#14b8a6' },
    jungle:              { left: '#15803d', right: '#65a30d', top: '#0d9488' },
    jungle_outpost:      { left: '#0d9488', right: '#0284c7', top: '#16a34a' },
    john_base:           { left: '#0284c7', right: '#7c3aed', top: '#f43f5e' }
};

function updateViewportMetrics() {
    const wrapper = document.getElementById('game-wrapper');
    if (!wrapper) return;
    const rect = wrapper.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    const isMobileOrCompact = window.innerWidth <= 920 || window.innerHeight <= 580;
    if (isMobileOrCompact && rect.width > rect.height) {
        const aspect = rect.width / rect.height;
        const targetW = Math.max(800, Math.min(1160, Math.round(600 * aspect)));
        if (canvas.width !== targetW || canvas.height !== 600) {
            canvas.width = targetW;
            canvas.height = 600;
        }
    } else {
        if (canvas.width !== 800 || canvas.height !== 600) {
            canvas.width = 800;
            canvas.height = 600;
        }
    }
}
window.addEventListener('resize', updateViewportMetrics);
window.addEventListener('orientationchange', () => setTimeout(updateViewportMetrics, 120));

function hexToRgb(colorStr) {
    if (!colorStr) return [0, 0, 0];
    const str = String(colorStr).trim();
    if (str.startsWith('rgb')) {
        const parts = str.match(/\d+/g);
        if (parts && parts.length >= 3) {
            return [parseInt(parts[0], 10), parseInt(parts[1], 10), parseInt(parts[2], 10)];
        }
    }
    let clean = str.replace('#', '');
    if (clean.length === 3) {
        clean = clean[0] + clean[0] + clean[1] + clean[1] + clean[2] + clean[2];
    }
    const n = parseInt(clean, 16);
    if (isNaN(n)) return [0, 0, 0];
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function lerpColor(hexA, hexB, t) {
    const clamped = Math.max(0, Math.min(1, t || 0));
    if (clamped <= 0.001) return hexA;
    if (clamped >= 0.999) return hexB;
    const [r1, g1, b1] = hexToRgb(hexA);
    const [r2, g2, b2] = hexToRgb(hexB);
    const r = Math.round(r1 + (r2 - r1) * clamped);
    const g = Math.round(g1 + (g2 - g1) * clamped);
    const b = Math.round(b1 + (b2 - b1) * clamped);
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

function applyThemeAmbilight(theme, nextTheme = null, blend = 0) {
    const palA = THEME_PALETTES[theme] || THEME_PALETTES.day;
    if (!nextTheme || blend <= 0.01) {
        document.documentElement.style.setProperty('--glow-left', palA.left);
        document.documentElement.style.setProperty('--glow-right', palA.right);
        document.documentElement.style.setProperty('--glow-top', palA.top);
    } else {
        const palB = THEME_PALETTES[nextTheme] || palA;
        document.documentElement.style.setProperty('--glow-left', lerpColor(palA.left, palB.left, blend));
        document.documentElement.style.setProperty('--glow-right', lerpColor(palA.right, palB.right, blend));
        document.documentElement.style.setProperty('--glow-top', lerpColor(palA.top, palB.top, blend));
    }
}

