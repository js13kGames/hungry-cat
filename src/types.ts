import type Food from './objects/Food.ts';
import type Asteroid from './objects/Asteroid.ts';

export interface IGameScene {
    update(delta: number): void;
    render(ctx: CanvasRenderingContext2D): void;
    cleanup(): void;
}

export type Position = {
    x: number,
    y: number,
};

export type Vector2 = Position;

export type Size = {
    width: number,
    height: number,
}

export type ButtonState = 'active' | 'inactive';

export type Particle = {
    p: Vector2; v: Vector2;
    life: number; max: number;
    size: number;
    r: number; g: number; b: number; a: number;
    sr: number; sg: number; sb: number;
    er: number; eg: number; eb: number;
    alive: boolean;
};

export type EmitterOptions = {
    max?: number;
    rate?: number;
    baseSpeed?: number;
    speedJitter?: number;
    spread?: number;
    size?: number;
    life?: number;
    startColor?: [number, number, number];
    endColor?: [number, number, number];
    drag?: number;
    trickleRate?: number;
};

export type EmitterOptionsRequired = Required<EmitterOptions>;

export type food = 'cheese' | 'fish' | 'susha' | 'donut' | 'coffee' | 'watermelon';

export type direction = 'left' | 'right' | 'top' | 'bottom';

export type Collision = Food | Asteroid;
