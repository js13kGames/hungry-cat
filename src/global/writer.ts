import type {Position} from '../types.ts';
import {LETTER_SPACING, FONT_SIZE} from './constants.ts';
import AssetManager from '../managers/AssetsManager.ts';

const alphabetMap: Record<string, Position> = {};
const tileSize = 8;
const row1 = "abcdefghijklm";
const row2 = "nopqrstuvwxyz";
const row3 = "1234567890-+!";

for (let i = 0; i < row1.length; i++) {
    alphabetMap[row1[i]] = { x: i * tileSize, y: 0 };
    alphabetMap[row2[i]] = { x: i * tileSize, y: tileSize };
    alphabetMap[row3[i]] = { x: i * tileSize, y: tileSize * 2 };
}

export const drawText = (
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    size: number = FONT_SIZE
) => {
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const coords = alphabetMap[char];
        if (!coords) continue;
        ctx.drawImage(
            AssetManager.getInstance().get('alfabet'),
            coords.x, coords.y, tileSize, tileSize,
            x + i * LETTER_SPACING, y, size, size
        );
    }
};