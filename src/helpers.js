// i did it again... i made a helpers file
export const keyMap = [
    { keys: "~1234567890-=", offset: 0 }, // row 1 
    { keys: "qwertyuiop[]\\", offset: 1.5 }, // row 2
    { keys: "asdfghjkl;'", offset: 1.75 }, // row 3
    { keys: "zxcvbnm,./", offset: 2.25 } // row 4
];



export class vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    
    clone() {
        return (new vector2(this.x, this.y));
    }
}

export const specialKeys = [
    { key: "tab", position: new vector2 (0, 1), length: 1.5 }, // position is vector2(col, row)
    { key: "caps lock", position: new vector2(0, 2), length: 1.75 },
    { key: "shift", position: new vector2(0, 3), length: 2.25 },
    { key: "delete", position: new vector2(13, 0), length: 1.5 },
    { key: "return", position: new vector2(12.75, 2), length: 1.75 },
    { key: "shift", position: new vector2(12.25, 3), length: 2.25 },
]