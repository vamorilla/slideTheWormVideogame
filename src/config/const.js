export const START = 1;
export const PLAYING = 2;
export const END = 3;

export const DIRECTIONS = {
    LEFT: {x: -15, y: 0},
    RIGHT: {x: 15, y: 0},
    UP: {x: 0, y: -15},
    DOWN:{x: 0, y: 15}
}

export const PLAYER_1 = {
    COLOR: '#941685',
    ID: '1',
    KEYS: {
       '38': DIRECTIONS.UP,
       '39': DIRECTIONS.RIGHT,
       '40': DIRECTIONS.DOWN,
       '37': DIRECTIONS.LEFT 
    },
    direction: DIRECTIONS.RIGHT,
    position: {x: 15 * 6, y: 15 * 6 },
    hasDied: false,
    intructions: 'Utilice las flechas de dirección para moverse'
}

export const PLAYER_2 = {
    COLOR: '#E67E22',
    ID: '2',
    KEYS: {
       '87': DIRECTIONS.UP,
       '68': DIRECTIONS.RIGHT,
       '83': DIRECTIONS.DOWN,
       '65': DIRECTIONS.LEFT
    },
    direction: DIRECTIONS.LEFT,
    position: {x: 15 * 43, y: 15 * 43 },
    hasDied: false,
    intructions: 'Utilice las teclas AWSD para moverse'
}

