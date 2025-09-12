const pressedKeys = new Set<string>();
const justPressed = new Set<string>();

export const KEYS = {
    'SPACE': 'Space',
    'W': 'KeyW',
    'A': 'KeyA',
    'S': 'KeyS',
    'D': 'KeyD',
    'Q': 'KeyQ',
    'E': 'KeyE',
    'LEFT': 'ArrowLeft',
    'RIGHT': 'ArrowRight',
    'DOWN': 'ArrowDown',
    'UP': 'ArrowUp',
}

export const isPressed = (key: string) => pressedKeys.has(key);

export const isJustPressed = (key: string) => {
    if (justPressed.has(key)) {
        justPressed.delete(key);
        return true;
    }
    return false;
};

document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (!pressedKeys.has(e.code)) {
        justPressed.add(e.code);
    }
    pressedKeys.add(e.code);
});

document.addEventListener('keyup', (e: KeyboardEvent) => {
    pressedKeys.delete(e.code);
    justPressed.delete(e.code);
});