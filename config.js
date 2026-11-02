// ============================================================================
// MODUŁ 1: STAŁE, KONFIGURACJA KOLORÓW I ZARZĄDZANIE EKRANEM (ZOPTYMALIZOWANY)
// ============================================================================
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true }) || canvas.getContext('2d');
const portraitCanvas = document.getElementById('portraitCanvas');
const pCtx = portraitCanvas ? portraitCanvas.getContext('2d') : null;

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

let cachedCanvasRect = { left: 0, top: 0, width: 800, height: 600 };

function refreshCanvasRectCache() {
    if (!canvas) return;
    const r = canvas.getBoundingClientRect();
    if (r.width > 0 && r.height > 0) {
        cachedCanvasRect = { left: r.left, top: r.top, width: r.width, height: r.height };
    }
}

function updateViewportMetrics() {
    const wrapper = document.getElementById('game-wrapper');
    if (!wrapper) return;
    const rect = wrapper.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    const isLowEnd = typeof lowEndMode !== 'undefined' && lowEndMode;
    const isMobileOrCompact = window.innerWidth <= 920 || window.innerHeight <= 580;

    // W trybie Low-End blokujemy wewnętrzną rozdzielczość bufora na 800x600 (do 45% mniej pikseli do wypełnienia co klatkę)
    if (!isLowEnd && isMobileOrCompact && rect.width > rect.height) {
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
    if (ctx) {
        ctx.imageSmoothingEnabled = !isLowEnd;
    }
    refreshCanvasRectCache();
}
window.addEventListener('resize', updateViewportMetrics, { passive: true });
window.addEventListener('scroll', refreshCanvasRectCache, { passive: true });
window.addEventListener('orientationchange', () => setTimeout(updateViewportMetrics, 120), { passive: true });

const _rgbCache = new Map();
const _lerpCache = new Map();

function hexToRgb(colorStr) {
    if (!colorStr) return [0, 0, 0];
    const cached = _rgbCache.get(colorStr);
    if (cached) return cached;

    const str = String(colorStr).trim();
    let res;
    if (str.startsWith('rgb')) {
        const parts = str.match(/\d+/g);
        res = (parts && parts.length >= 3)
            ? [parseInt(parts[0], 10), parseInt(parts[1], 10), parseInt(parts[2], 10)]
            : [0, 0, 0];
    } else {
        let clean = str.charCodeAt(0) === 35 ? str.slice(1) : str;
        if (clean.length === 3) {
            clean = clean[0] + clean[0] + clean[1] + clean[1] + clean[2] + clean[2];
        }
        const n = parseInt(clean, 16);
        res = isNaN(n) ? [0, 0, 0] : [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    }
    _rgbCache.set(colorStr, res);
    return res;
}

function lerpColor(hexA, hexB, t) {
    if (!hexB || hexA === hexB) return hexA;
    const clamped = t <= 0 ? 0 : (t >= 1 ? 1 : (t || 0));
    if (clamped <= 0.001) return hexA;
    if (clamped >= 0.999) return hexB;

    const q = (clamped * 256) | 0;
    if (q <= 0) return hexA;
    if (q >= 256) return hexB;

    const cacheKey = `${hexA}|${hexB}|${q}`;
    const cachedHex = _lerpCache.get(cacheKey);
    if (cachedHex) return cachedHex;

    const rgb1 = hexToRgb(hexA);
    const rgb2 = hexToRgb(hexB);
    const ratio = q / 256;
    const r = (rgb1[0] + (rgb2[0] - rgb1[0]) * ratio + 0.5) | 0;
    const g = (rgb1[1] + (rgb2[1] - rgb1[1]) * ratio + 0.5) | 0;
    const b = (rgb1[2] + (rgb2[2] - rgb1[2]) * ratio + 0.5) | 0;
    const out = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;

    if (_lerpCache.size > 2048) _lerpCache.clear();
    _lerpCache.set(cacheKey, out);
    return out;
}

let _lastGlowL = '';
let _lastGlowR = '';
let _lastGlowT = '';

function applyThemeAmbilight(theme, nextTheme = null, blend = 0) {
    if (typeof lowEndMode !== 'undefined' && lowEndMode) return;
    const palA = THEME_PALETTES[theme] || THEME_PALETTES.day;
    let l, r, t;
    if (!nextTheme || blend <= 0.01) {
        l = palA.left;
        r = palA.right;
        t = palA.top;
    } else {
        const palB = THEME_PALETTES[nextTheme] || palA;
        l = lerpColor(palA.left, palB.left, blend);
        r = lerpColor(palA.right, palB.right, blend);
        t = lerpColor(palA.top, palB.top, blend);
    }
    const rootStyle = document.documentElement.style;
    if (l !== _lastGlowL) { _lastGlowL = l; rootStyle.setProperty('--glow-left', l); }
    if (r !== _lastGlowR) { _lastGlowR = r; rootStyle.setProperty('--glow-right', r); }
    if (t !== _lastGlowT) { _lastGlowT = t; rootStyle.setProperty('--glow-top', t); }
}
