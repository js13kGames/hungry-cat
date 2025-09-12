import StateMachine from './states/StateMachine.ts';
import AssetManager from './managers/AssetsManager.ts';
import {clearCanvas} from './global/utils.ts';
import {WINDOW_WIDTH, WINDOW_HEIGHT, STATE_NAMES} from './global/constants.ts';

const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext('2d', {alpha: false})!;

const ratio = window.devicePixelRatio;
ctx.scale(ratio, ratio);
ctx.canvas.width = WINDOW_WIDTH * ratio;
ctx.canvas.height = WINDOW_HEIGHT * ratio;
ctx.imageSmoothingEnabled = false;

const stateMachine = StateMachine.getInstance();
const assetManager = AssetManager.getInstance();
let deltaTime = 0;
let last = performance.now();

const frameUpdate = (hrt: number) => {
    deltaTime = (hrt - last) / 1000;
    clearCanvas(ctx);
    stateMachine.update(deltaTime);
    stateMachine.render(ctx);
    last = hrt;
    requestAnimationFrame(frameUpdate);
};

assetManager.loadAll({
    alfabet: 'alefbet.png',
    cat: 'cat.png',
    cheese: 'cheese.png',
    donut: 'donut.png',
    fish: 'fish.png',
    susha: 'susha.png',
    asteroid: 'asteroid.png',
    coffee: 'coffee.png',
    watermelon: 'watermelon.png',
}).then(() => {
    stateMachine.changeState(STATE_NAMES.START_MENU);
    requestAnimationFrame(frameUpdate);
});