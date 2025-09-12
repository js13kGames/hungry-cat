import BaseState from './StateBase.ts';
import { CENTER } from '../global/constants.ts';

class Loading extends BaseState {
    update() {}
    render(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'white';
        ctx.fillRect(CENTER.x - 100, CENTER.y - 100, 200, 200);
    }
    cleanup() {}
}

export default Loading;