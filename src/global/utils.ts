import { WINDOW_HEIGHT, WINDOW_WIDTH, BACKGROUND, LETTER_SPACING, WINDOW_MARGIN, CENTER } from './constants.ts';
import type { Collision, direction, food, Vector2 } from '../types.ts';
import type Player from '../characters/Player.ts';
import Asteroid from '../objects/Asteroid.ts';

export const clearCanvas = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = BACKGROUND;
    ctx.fillRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
};

export const calcTextWidth = (text: string): number => {
    return text.length * LETTER_SPACING;
}

export const lerp = (a: number, b: number, t: number): number => {
    return a + (b - a) * t;
}

export const getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const calculateMarginPosition = (direction: direction) => {
    if (direction === 'left') {
       return {x: -WINDOW_MARGIN, y: CENTER.y}
    } else if (direction === 'right') {
        return {x: WINDOW_WIDTH + WINDOW_MARGIN, y: CENTER.y}
    } else if (direction === 'bottom') {
        return {x: CENTER.x, y: WINDOW_HEIGHT + WINDOW_MARGIN}
    } // top
    return {x: CENTER.x, y: -WINDOW_MARGIN};
}

export const calculateVelocity = (direction: direction, speed: number = 1) => {
    const randOffset = () => (Math.random() - 0.5) * 10;
    const velocity: Vector2 = {x: 1, y: 1};

    if (direction === 'left') {
        velocity.y = randOffset();
    } else if (direction === 'right') {
        velocity.x = -1;
        velocity.y = randOffset();
    } else if (direction === 'bottom') {
        velocity.x = randOffset();
        velocity.y = -1;
    } else { // top
        velocity.x = randOffset();
        velocity.y = 1;
    }

    const len = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);
    velocity.x = velocity.x / len * speed;
    velocity.y = velocity.y / len * speed;

    return velocity;
};

export const detectCollision = (player: Player, collider: Collision) => {
    const quartPlayer = player.size / 4;
    const colliderSize = collider instanceof Asteroid ? collider.size / 4: collider.size / 2;

    return !(
        player.position.x + quartPlayer < collider.position.x - colliderSize ||
        player.position.x - quartPlayer > collider.position.x + colliderSize ||
        player.position.y + quartPlayer < collider.position.y - colliderSize ||
        player.position.y - quartPlayer > collider.position.y + colliderSize
    );
};

export const outOfWindow = (obj: Collision) => {
    return (
        obj.position.x + obj.size < 0 ||
        obj.position.x > WINDOW_WIDTH ||
        obj.position.y + obj.size < 0 ||
        obj.position.y > WINDOW_HEIGHT
    );
};

export const calculateScore = (eat: food): number => {
    switch (eat) {
        case 'fish':
            return 2;
        case 'cheese':
            return 3;
        case 'donut':
            return 4;
        case 'susha':
            return 5;
        case 'coffee':
            return 6;
        case 'watermelon':
            return 7;
    }
}