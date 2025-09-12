import type {Position, Vector2, food} from '../types.ts';
import AssetManager from '../managers/AssetsManager.ts';
import {filterCollision} from '../global/sessionData.ts';
import {calculateScore} from '../global/utils.ts';

const friction = 0.999;

class Food {
    public position: Position = {x: 0, y: 0};
    private velocity: Vector2 = { x: 1, y: 1 };
    private rotation = 0;
    private angularVelocity = 0.5;
    private readonly sprite: HTMLImageElement;
    public size = 128;
    public score = 0;
    public isOld = false;
    public timerId: number;
    public isOver = false;

    constructor(eat: food, position: Position, velocity: Vector2) {
        this.sprite = AssetManager.getInstance().get(eat);
        this.position = position;
        this.velocity = velocity;
        this.score = calculateScore(eat);

        this.timerId = setTimeout(() => {
            this.isOld = true;
            clearTimeout(this.timerId);
        }, 10000);
    }

    free() {
        this.score = 0;
        this.isOver = true;
    }

    update(delta: number) {
        this.rotation += this.angularVelocity * delta;

        this.position.x += this.velocity.x * delta;
        this.position.y += this.velocity.y * delta;

        this.velocity.x *= friction;
        this.velocity.y *= friction;
        if (this.isOver) {
            this.size -= 1;
            if (this.size <= 0) {
                filterCollision(this);
            }
        }
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


export default Food;