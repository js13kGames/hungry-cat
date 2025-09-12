import type StateMachine from './StateMachine.ts';
import {STATE_NAMES} from '../global/constants.ts';
import {CENTER} from '../global/constants.ts';
import {score} from '../global/sessionData.ts';
import BaseState from './StateBase.ts';
import {isJustPressed, KEYS} from '../input/keyboard.ts';
import Text from '../components/Text.ts';
import StarField from '../decorations/StarField.ts';
import Sound from '../components/Sound.ts';

class EndScreen extends BaseState {
    private starField: StarField;

    constructor(state: StateMachine) {
        super(state);
        this.starField = new StarField();
        const scoreText = new Text(`score ${score}`, {x: CENTER.x, y: CENTER.y - 200});
        const text = new Text('the cat is gone but the menu lives on', {x: CENTER.x, y: CENTER.y - 100});
        const instructionText = new Text('press space to restart', {x: CENTER.x, y: CENTER.y + 200,});
        this.children.push(this.starField, text, scoreText, instructionText);
    }

    update() {
        if (isJustPressed(KEYS.SPACE)) {
            this.stateMachine.changeState(STATE_NAMES.WORLD);
            Sound.play('start');
        }
        this.starField.generate();

    }

    render(ctx: CanvasRenderingContext2D) {
        for (let child of this.children) {
            child.render(ctx);
        }
    }

    cleanup(): void {
        Sound.stopMusic();
    }
}

export default EndScreen;