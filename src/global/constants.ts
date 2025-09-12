import type { Position } from '../types.ts';

export const WINDOW_WIDTH = window.innerWidth;
export const WINDOW_HEIGHT = window.innerHeight;

export const CENTER: Position = {x: Math.floor(WINDOW_WIDTH / 2), y: Math.floor(WINDOW_HEIGHT / 2)};

export const BACKGROUND: string = '#333333';

export const STATE_NAMES: Record<string, string> = {
    'START_MENU': 'START_MENU',
    'WORLD': 'WORLD',
    'LOADING': 'LOADING',
    'END_SCREEN': 'END_SCREEN',
} as const;

export const FONT_SIZE = 32;
export const LETTER_SPACING = Math.floor(FONT_SIZE / 1.25);

export const BUTTON_WIDTH = 240;

export const WINDOW_MARGIN = 40;