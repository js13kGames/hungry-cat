import Loading from './Loading.ts';
import {STATE_NAMES} from '../global/constants.ts';
import type {IGameScene} from '../types.ts';
import states from './states.ts';

type StateConstructor = new (newState: StateMachine) => IGameScene;

export default class StateMachine {
    private static instance: StateMachine | null = null;
    private readonly states: Record<string, StateConstructor>;
    private currentState: IGameScene;

    constructor(states: Record<string, StateConstructor>) {
        this.states = states;
        this.currentState = new Loading(this); // initial state

    }

    public static getInstance(): StateMachine {
        if (!StateMachine.instance) {
            if (!states) {
                throw new Error("StateMachine requires states for the first initialization.");
            }
            StateMachine.instance = new StateMachine(states);
        }
        return StateMachine.instance;
    }

    changeState(stateName: keyof typeof STATE_NAMES) {
        const StateClass = this.states[stateName];
        if (!StateClass) {
            throw new Error(`State "${stateName}" does not exist`);
        }
        this.currentState.cleanup()
        this.currentState = new StateClass(this);
    }

    update(delta: number) {
        this.currentState.update(delta);
    }

    render(ctx: CanvasRenderingContext2D) {
        this.currentState.render(ctx);
    }
}