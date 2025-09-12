import type {IGameScene} from '../types.ts';
import StateMachine from './StateMachine';

export default abstract class BaseState {
    protected stateMachine: StateMachine;
    public children: IGameScene[] = [];

    constructor(state: StateMachine) {
        this.stateMachine = state;
    }

    abstract update(delta: number): void;
    abstract render(ctx: CanvasRenderingContext2D): void;
    abstract cleanup(): void;
};
