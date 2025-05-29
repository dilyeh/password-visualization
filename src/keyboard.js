import { keyMap, specialKeys, vector2 } from "./helpers"
import React, { useState } from 'react';
import data from "./norm_data.json";

export function Keyboard() {
    // create list of keys
    let keys = []
    // get all the normal keys
    for (const row of keyMap) {
        for (const char of row.keys) {
            // TODO: actually implement the data functionality, i'm too lazy rn
            let charFound = false;
            for (const entry of data) {
                if (entry["char"] === char) {
                    keys.push(new Key(char, entry["frequency"]));
                    charFound = true;
                }
            }
            if (!charFound) {
                keys.push(new Key(char, 0));
            }
        }
    }
    // get all the special keys
    for (const key of specialKeys) {
        if (key.key === "shift") { // shift case 
            // get the frequency of shift because i made a poor decision with my data structures and am too lazy to fix it rn
            for (const entry of data) { // this code is kind of sad
                if (entry["char"] === "SHIFT") {
                    keys.push(new Key(key.key, entry["frequency"], true, key.length, key.position))
                    break;
                }
            }
        }
        else {
            keys.push(new Key(key.key, 0, true, key.length, key.position))
        }
    }

    console.log(keys)

    const keySize = 50;
    const padding = 2;
    // generate html
    let keyHtml = [];
    for (const key of keys) {
        keyHtml.push( // here we go again with the svgs
            <svg class="key" x={key.position.x * keySize} y={key.position.y * keySize}>
                <rect 
                    x="0" y="0" 
                    width={(key.length * keySize) - 2*padding} height={keySize - 2*padding} 
                    fill={key.color}
                    rx="5" ry="5"
                >

                </rect>
                <text x="10" y="20">{ key.char }</text>
            </svg>
        );
    }
    return (
        <svg id="keyboard">
            { keyHtml }
        </svg>
    );
}



class Key {
    // start is the min color, end is the max color
    static minColor = {hue: 50, saturation: 100, lightness: 90};
    static maxColor = {hue: 15, saturation: 100, lightness: 55};

    constructor(char, frequency, specialKey=false, keyLength=1, keyPosition) {
        this.char = char;
        this.frequency = frequency;
        //console.log("key: " + this.char + "    frequency: " + this.frequency);
        this.length = keyLength;
        this.color = this.getColor();
        if (specialKey) {
            this.position = keyPosition;
        }
        else {
            this.position = this.getPosition();
        }
    }

    getPosition() {
        for (let row=0; row<keyMap.length; row++) {
            for (let col=0; col<keyMap[row].keys.length; col++) {
                if (keyMap[row].keys[col] == this.char) { // this is cooked
                    let position = new vector2(keyMap[row].offset + col, row);
                    return position;
                }
            }
        }
    }

    getColor() {
        const amplifier = 1;
        // put the frequency on like a quadratic scale idk
        // lets follow the equation y=-(x-1)^2 + 1
        // this should emphasize the smaller ones a bit more
        // to change the exponent to increase emphasis (must be even though)
        let adjustedFrequency = Math.min(-1 * ((this.frequency * amplifier) - 1) ** 2 + 1, 1);

        // note, if we wanna use something like magma, use rgb instead of hsl
        let color = { // this is disgusting
            hue: ((Key.maxColor.hue - Key.minColor.hue) * adjustedFrequency) + Key.minColor.hue, // so it's (difference * value) + min
            saturation: ((Key.maxColor.saturation - Key.minColor.saturation) * adjustedFrequency) + Key.minColor.saturation,
            lightness: ((Key.maxColor.lightness - Key.minColor.lightness) * adjustedFrequency) + Key.minColor.lightness,
        };

        let colorString = `hsl(${color.hue}, ${color.saturation}%, ${color.lightness}%)`;
        console.log(colorString);
        return colorString;
    }
}