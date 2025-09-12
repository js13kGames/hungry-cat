import type {Position, Vector2} from '../types.ts';
import AssetManager from '../managers/AssetsManager.ts';

class Asteroid {
    public position: Position = {x: 0, y: 0};
    private velocity: Vector2 = { x: 1, y: 1 };
    private rotation = 0;
    private angularVelocity = 0.5;
    private readonly sprite: HTMLImageElement;
    public readonly size = 128;
    public isOld = false;
    public timerId: number;

    constructor(position: Position, velocity: Vector2) {
        this.sprite = AssetManager.getInstance().get('asteroid');
        this.position = position;
        this.velocity = velocity;

        this.timerId = setTimeout(() => {
            this.isOld = false;
            clearTimeout(this.timerId);
        }, 10000);
    }

    update(delta: number) {
        this.rotation += this.angularVelocity * delta;

        this.position.x += this.velocity.x * delta;
        this.position.y += this.velocity.y * delta;

        this.velocity.x;
        this.velocity.y;
    }

    render(ctx: CanvasRenderingContext2D) {
        const half = this.size / 2;
        ctx.save();
        ctx.translate(Math.floor(this.position.x + half) , Math.floor(this.position.y + half));
        ctx.rotate(this.rotation);
        ctx.drawImage(this.sprite, 0, 0, 32, 32, Math.floor(-half) , Math.floor(-half), this.size, this.size);
        ctx.restore();
    }
}

export default Asteroid;