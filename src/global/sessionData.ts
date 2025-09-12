import type {Collision} from '../types.ts';
import {outOfWindow} from './utils.ts';

export let collisions: Collision[] = [];

export const clearCollisions = () => {
    collisions = collisions.filter((collision: Collision) => !(collision.isOld && outOfWindow(collision)));
}

export let score = 0;
export const updateScore = (value: number) => score += value;

export const clearSessionData = () => {
    score = 0;
    collisions = [];
}

export const filterCollision = (collisionToFree: Collision) => {
    collisions = collisions.filter((collision: Collision) => collision !== collisionToFree);
}