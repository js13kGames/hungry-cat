import {lerp} from '../global/utils.ts';
import type {Vector2, Particle, EmitterOptions, EmitterOptionsRequired} from '../types';

export default class Emitter {
    private readonly pool: Particle[];
    private head = 0;
    private opts: EmitterOptionsRequired;
    private emitAccumulator = 0;
    private anchorPos: Vector2 = { x: 0, y: 0 };
    private anchorRot = 0;
    private activeRate = 0;

    constructor(opts: EmitterOptions = {}) {
        this.opts = {
            max: opts.max ?? 200,
            rate: opts.rate ?? 120,
            baseSpeed: opts.baseSpeed ?? 160,
            speedJitter: opts.speedJitter ?? 60,
            spread: opts.spread ?? Math.PI / 10,
            size: opts.size ?? 3,
            life: opts.life ?? 0.35,
            drag: opts.drag ?? 0.92,
            trickleRate: opts.trickleRate ?? 15,
            startColor: opts.startColor ?? [0,0,0],
            endColor: opts.endColor ?? [255, 255, 255],
        };

        this.pool = new Array(this.opts.max).fill(0).map(() => ({
            p: { x: 0, y: 0 },
            v: { x: 0, y: 0 },
            life: 0, max: 0,
            size: this.opts.size,
            r: this.opts.startColor[0],
            g: this.opts.startColor[1],
            b: this.opts.startColor[2],
            a: 0,
            sr: this.opts.startColor[0],
            sg: this.opts.startColor[1],
            sb: this.opts.startColor[2],
            er: this.opts.endColor[0],
            eg: this.opts.endColor[1],
            eb: this.opts.endColor[2],
            alive: false,
        }));
    }

    anchorTo(center: Vector2, rotation: number, offsetPix: number) {
        this.anchorRot = rotation;
        this.anchorPos.x = center.x - Math.cos(rotation) * offsetPix;
        this.anchorPos.y = center.y - Math.sin(rotation) * offsetPix;
    }

    setThrottle(t: number) {
        this.activeRate = t > 0 ? this.opts.rate * t : this.opts.trickleRate;
    }

    private spawnOne() {
        const p = this.pool[this.head++];
        this.head %= this.pool.length;

        const angle = this.anchorRot + Math.PI + (Math.random() - 0.5) * this.opts.spread;
        const speed = this.opts.baseSpeed + (Math.random() * 2 - 1) * this.opts.speedJitter;

        p.p.x = this.anchorPos.x;
        p.p.y = this.anchorPos.y;
        p.v.x = Math.cos(angle) * speed;
        p.v.y = Math.sin(angle) * speed;

        p.max = this.opts.life * (0.85 + Math.random() * 0.3);
        p.life = p.max;
        p.size = Math.max(1, this.opts.size + ((Math.random() * 2 - 1) | 0));

        p.sr = this.opts.startColor[0];
        p.sg = this.opts.startColor[1];
        p.sb = this.opts.startColor[2];

        p.er = this.opts.endColor[0];
        p.eg = this.opts.endColor[1];
        p.eb = this.opts.endColor[2];

        p.r = p.sr; p.g = p.sg; p.b = p.sb;

        p.a = 1;
        p.alive = true;
    }

    update(delta: number) {
        this.emitAccumulator += this.activeRate * delta;
        while (this.emitAccumulator >= 1) {
            this.spawnOne();
            this.emitAccumulator -= 1;
        }

        for (let i = 0; i < this.pool.length; i++) {
            const p = this.pool[i];
            if (!p.alive) continue;

            p.p.x += p.v.x * delta;
            p.p.y += p.v.y * delta;

            p.life -= delta;
            if (p.life <= 0) {
                p.alive = false;
                continue;
            }

            const t = 1 - p.life / p.max;
            p.r = lerp(p.sr, p.er, t);
            p.g = lerp(p.sg, p.eg, t);
            p.b = lerp(p.sb, p.eb, t);
            p.a = 1 - t;
        }
    }

    render(ctx: CanvasRenderingContext2D) {
        for (let i = 0; i < this.pool.length; i++) {
            const p = this.pool[i];
            if (!p.alive) continue;
            const x = p.p.x | 0;
            const y = p.p.y | 0;
            ctx.globalAlpha = p.a;
            ctx.fillStyle = `rgb(${p.r|0},${p.g|0},${p.b|0})`;
            ctx.fillRect(x, y, p.size, p.size);
        }

        ctx.globalAlpha = 1;
    }

    cleanup(): void {}
}
