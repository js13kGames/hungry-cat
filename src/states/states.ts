import StartMenu from './StartMenu.ts';
import World from './World.ts';
import Loading from './Loading.ts';
import EndScreen from './EndScreen.ts';
import {STATE_NAMES} from '../global/constants.ts';

export default {
    [STATE_NAMES.START_MENU]: StartMenu,
    [STATE_NAMES.WORLD]: World,
    [STATE_NAMES.LOADING]: Loading,
    [STATE_NAMES.END_SCREEN]: EndScreen,
} as const;