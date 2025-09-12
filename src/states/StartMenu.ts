import BaseState from './StateBase.ts';
import {isJustPressed, KEYS} from '../input/keyboard.ts';
import {CENTER, STATE_NAMES} from '../global/constants.ts';
import type StateMachine from './StateMachine.ts';
import StarField from '../decorations/StarField.ts';
import Text from '../components/Text.ts';
import Sound from '../components/Sound.ts';

export default class StartMenu extends BaseState {
    constructor(state: StateMachine) {
        super(state);
        const starField = new StarField();
        const title = new Text('hungry cat', {...CENTER, y: CENTER.y - 300}, 40);
        const text = new Text('space is stuffed with snacks', {...CENTER, y: CENTER.y - 200}, 24);
        const text2 = new Text('you have been chosen as most hungry cat to help', {...CENTER, y: CENTER.y - 150}, 24);
        const text3 = new Text('if you do not make it back we will eat in your honor', {...CENTER, y: CENTER.y - 100}, 24);
        const instruction = new Text('!press space to start!', {...CENTER, y: CENTER.y + 100}, 32);
        const instruction2 = new Text('wasd to control', {...CENTER, y: CENTER.y + 200}, 24);
        this.children.push(starField, title, text, text2, text3, instruction, instruction2);
    }

    cleanup() {}

    update() {

        if (isJustPressed(KEYS.SPACE)) {
            this.stateMachine.changeState(STATE_NAMES.WORLD);
            Sound.play('start');
        }

    }

    render(ctx: CanvasRenderingContext2D) {
        for (let child of this.children) {
            child.render(ctx);
        }
    }
}