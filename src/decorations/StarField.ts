import {WINDOW_HEIGHT, WINDOW_WIDTH, BACKGROUND} from '../global/constants.ts';
import { getRandomInt } from '../global/utils.ts';

type Star = {x: number, y: number, brightness: number, size: number, pulse: number};

class StarField {
    private stars: Star[] = [];
    private numStars = 300;

    constructor() {
        this.generate();
    }

    generate() {
        this.stars = [];
        for (let i = 0; i < this.numStars; i++) {
            this.stars.push({
                x: Math.floor(Math.random() * WINDOW_WIDTH),
                y: Math.floor(Math.random() * WINDOW_HEIGHT),
                brightness: Math.random() * 0.3 + 0.2,
                size: [4, 8, 12][getRandomInt(0, 2)],
                pulse: (Math.random() - 0.5) * 0.3
            });
        }
    }

    update(delta: number) {
        for (const star of this.stars) {
            star.brightness += star.pulse * delta;

            if (star.brightness > 1) {
                star.brightness = 1;
                star.pulse *= -1;
            } else if (star.brightness < 0.2) {
                star.brightness = 0.2;
                star.pulse *= -1;
            }
        }
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = BACKGROUND;

        for (const star of this.stars) {
            const gray = Math.floor(255 * star.brightness);
            ctx.fillStyle = `rgb(${gray}, ${gray}, ${gray})`;
            ctx.fillRect(star.x, star.y, star.size, star.size);
        }
    }

    cleanup(): void {}
}

export default StarField;