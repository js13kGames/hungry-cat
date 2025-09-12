import type {direction, Position, food, Collision} from '../types.ts';
import Food from './Food.ts';
import Timer from './Timer.ts';
import {calculateMarginPosition, calculateVelocity} from '../global/utils.ts';
import Asteroid from './Asteroid.ts';
import {collisions} from '../global/sessionData.ts';

class Spawn{
    private readonly position: Position;
    private readonly direction: direction;
    private timer: Timer;

    constructor(direction: direction) {
        this.position = calculateMarginPosition(direction);
        this.direction = direction;
        this.timer = new Timer([1000, 7000], this.spawn.bind(this));
        this.timer.start();
    }

    getRandomFood() {
        const foods: ({name: food, weight: number})[] = [
            { name: "fish", weight: 6 },
            { name: "cheese", weight: 5 },
            { name: "watermelon", weight: 1 },
            { name: "coffee", weight: 2 },
            { name: "donut", weight: 3 },
            { name: "susha", weight: 4 },
        ];

        const totalWeight = foods.reduce((sum, food) => sum + food.weight, 0);
        let random = Math.random() * totalWeight;

        for (const food of foods) {
            if (random < food.weight) {
                return food.name;
            }
            random -= food.weight;
        }

        return 'watermelon';
    }

    spawn() {
        let obj: Collision;
        if (Math.random() > 0.70) { // 30% chance of asteroids
            obj = new Asteroid({...this.position}, calculateVelocity(this.direction, 150));
        } else {
            obj = new Food(
                this.getRandomFood(),
                {...this.position},
                calculateVelocity(this.direction, 100)
            );
        }
        collisions.push(obj);
    }

    cleanup(): void {
        this.timer.stop();
    }
}

export default Spawn;