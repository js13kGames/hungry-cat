import type {IGameScene, Position} from '../types.ts';
import { CENTER, STATE_NAMES } from '../global/constants.ts';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../global/constants.ts';
import {collisions, updateScore} from '../global/sessionData.ts';
import {detectCollision} from '../global/utils.ts';
import AssetManager from '../managers/AssetsManager.ts';
import {isPressed, KEYS} from '../input/keyboard.ts';
import type StateMachine from '../states/StateMachine.ts'
import Emitter from '../components/Emitter.ts';
import Text from '../components/Text.ts';
import Food from '../objects/Food.ts';
import Sound from '../components/Sound.ts';

const friction = 0.99999999;
const rotationAcceleration = 2;
const angularFriction = 0.997;
const bounce = 0.7;

class Player {
    public position: Position = {x: WINDOW_WIDTH / 2 - 64, y: WINDOW_HEIGHT / 2 - 64}; // as size 128
    private velocity: { x: number, y: number } = { x: 1, y: 1 };
    private thrust = 180;
    private readonly sprite: HTMLImageElement = AssetManager.getInstance().get('cat');
    private rotation: number = 0;
    public readonly size: number = 128;
    private angularVelocity = 0.5;
    private children: IGameScene[] = [];
    private stateMachine: StateMachine;
    private timerCollision: number;
    private timerLife: number;
    private life: number = 25;
    private lifeText: Text;

    constructor(state: StateMachine) {
        this.stateMachine = state;
        const emitter = new Emitter({
            endColor: [255, 0, 68],
            startColor: [254, 231, 97],
            life: 0.35,
            size: 16,
            spread: Math.PI / 3,
            baseSpeed: 220,
            speedJitter: 180,
            rate: 160,
            trickleRate: 0
        });
        this.lifeText = new Text(this.life.toString(), {...CENTER, y: 80});
        this.children.push(emitter, this.lifeText);
        this.timerCollision = setInterval(() => {
            this.handleCollisions();
        }, 50);
        this.timerLife = setInterval(() => {
            this.life -= 1;
            if (this.life <= 0) {
                this.stateMachine.changeState(STATE_NAMES.END_SCREEN);
            }
        }, 1000)
    }

    updateMovement(delta: number) {
        if (isPressed(KEYS.A) || isPressed(KEYS.LEFT)) {
            this.angularVelocity -= rotationAcceleration * delta;

        }
        if (isPressed(KEYS.D) || isPressed(KEYS.RIGHT)) {
            this.angularVelocity += rotationAcceleration * delta;
        }

        this.rotation += this.angularVelocity * delta;
        this.angularVelocity *= angularFriction;

        if (isPressed(KEYS.W) || isPressed(KEYS.UP)) {
            this.velocity.x += Math.cos(this.rotation) * this.thrust * delta;
            this.velocity.y += Math.sin(this.rotation) * this.thrust * delta;
            Sound.play('power');
        }

        if (isPressed(KEYS.S) || isPressed(KEYS.DOWN)) {
            this.velocity.x -= Math.cos(this.rotation) * this.thrust * delta;
            this.velocity.y -= Math.sin(this.rotation) * this.thrust * delta;
        }


        this.position.x += this.velocity.x * delta;
        this.position.y += this.velocity.y * delta;

        this.velocity.x *= friction;
        this.velocity.y *= friction;
    }

    handleBounce() {
        if (this.position.x < 0) {
            this.position.x = 0;
            this.velocity.x *= -bounce;
            Sound.play('bounce');
        }
        if (this.position.x + this.size > WINDOW_WIDTH) {
            this.position.x = WINDOW_WIDTH - this.size;
            this.velocity.x *= -bounce;
            Sound.play('bounce');
        }
        if (this.position.y < 0) {
            this.position.y = 0;
            this.velocity.y *= -bounce;
            Sound.play('bounce');
        }
        if (this.position.y + this.size > WINDOW_HEIGHT) {
            this.position.y = WINDOW_HEIGHT - this.size;
            this.velocity.y *= -bounce;
            Sound.play('bounce');
        }
    }

    handleParticles() {
        const half = this.size / 2;
        const cx = Math.floor(this.position.x + half);
        const cy = Math.floor(this.position.y + half);
        const emitter: Emitter = this.children[0] as Emitter;
        emitter.anchorTo({ x: cx, y: cy }, this.rotation, 8);
        emitter.setThrottle((isPressed(KEYS.W) || isPressed(KEYS.UP)) ? 1 : 0);
    }

    handleCollisions() {
        for (let collision of collisions) {
            if (detectCollision(this, collision)) {
                if (collision instanceof Food) {
                    updateScore(collision.score);
                    this.life += collision.score;
                    if (collision.score) Sound.play('food');
                    collision.free();

                } else {
                    // asteroid
                    this.stateMachine.changeState(STATE_NAMES.END_SCREEN);
                    Sound.play('death');
                }
            }
        }
    }

    update(delta: number) {
        this.updateMovement(delta);
        this.handleBounce();
        this.handleParticles();
        this.lifeText.text = this.life.toString();

        for (let child of this.children) {
            child.update(delta);
        }
    }

    render(ctx: CanvasRenderingContext2D) {
        for (let child of this.children) {
            child.render(ctx);
        }

        const half = this.size / 2;
        ctx.save();
        ctx.translate(Math.floor(this.position.x + half) , Math.floor(this.position.y + half));
        ctx.rotate(this.rotation);
        ctx.drawImage(this.sprite, 0, 0, 32, 32, Math.floor(-half) , Math.floor(-half), this.size, this.size);
        ctx.restore();
    }

    cleanup(): void {
        clearInterval(this.timerCollision);
        clearInterval(this.timerLife);
    }
}

export default Player;
