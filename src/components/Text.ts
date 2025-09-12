import {drawText} from '../global/writer.ts';
import {calcTextWidth} from '../global/utils.ts';
import type {Position} from '../types.ts';
import { FONT_SIZE } from '../global/constants.ts';

class Text {
    public readonly width: number;
    public readonly size: number
    public text: string;
    public position: Position;

    constructor(text: string = '', position: Position = {x: 0, y: 0}, size = FONT_SIZE) {
        this.text = text;
        this.size = size;
        this.width = calcTextWidth(text);
        this.position = {x: position.x - this.width / 2, y: position.y - FONT_SIZE / 2};
    }

    update() {}

    render(ctx: CanvasRenderingContext2D) {
        drawText(ctx, this.text, this.position.x, this.position.y, this.size);
    }

    cleanup(): void {}
}

export default Text;