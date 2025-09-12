import { getRandomInt } from '../global/utils.ts';

class Timer {
    private timerId: number | null = null;
    private readonly waitTime: number | [number, number];
    private readonly callback: () => void;
    private running = false;

    constructor(waitTime: number | [number, number], callback: () => void) {
        this.waitTime = waitTime;
        this.callback = callback;
    }

    private getDelay(): number {
        if (typeof this.waitTime === 'number') {
            return this.waitTime;
        }
        return getRandomInt(this.waitTime[0], this.waitTime[1]);
    }

    private tick = () => {
        this.callback();
        if (this.running) {
            this.timerId = setTimeout(this.tick, this.getDelay());
        }
    };

    start() {
        if (this.running) return;
        this.running = true;
        this.timerId = setTimeout(this.tick, this.getDelay());
    }

    stop() {
        if (this.timerId !== null) {
            clearTimeout(this.timerId);
            this.timerId = null;
        }
        this.running = false;
    }
}

export default Timer;