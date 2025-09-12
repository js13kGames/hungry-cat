import type StateMachine from './StateMachine.ts';
import {CENTER} from '../global/constants.ts';
import {collisions, clearCollisions, score, clearSessionData} from '../global/sessionData.ts';
import BaseState from './StateBase.ts';
import Player from '../characters/Player.ts';
import StarField from '../decorations/StarField.ts';
import Spawn from '../objects/Spawn.ts';
import Text from '../components/Text.ts';
import Sound from '../components/Sound.ts';

export default class World extends BaseState {
    private spawns: Spawn[] = [];
    private readonly scoreText: Text;

    constructor(state: StateMachine) {
        super(state);
        clearSessionData();
        this.spawns.push(new Spawn('top'), new Spawn('bottom'), new Spawn('left'), new Spawn('right'));
        this.scoreText = new Text(`score-${score.toString()}`, {...CENTER, y: 36})
        this.children.push(
            new StarField(),
            new Player(state),
            this.scoreText,
        );

        Sound.music();

        setInterval(() => clearCollisions(), 10000);
    }

    update(delta: number) {
        for (let child of this.children) {
            child.update(delta);
        }

        for (let collision of collisions) {
            collision.update(delta);
        }

        this.scoreText.text = `score-${score.toString()}`;
    }

    render(ctx: CanvasRenderingContext2D) {
        for (let child of this.children) {
            child.render(ctx);
        }

        for (let collision of collisions) {
            collision.render(ctx);
        }
    }


    cleanup() {
        for (let child of this.children) {
            child.cleanup();
        }
        this.spawns.forEach(spawn => spawn.cleanup());
    }
}