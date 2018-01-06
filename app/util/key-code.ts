import { AcceleratorKeyCode, IAccelerator } from '../model/action';

const keyCodeMap = {
  'Space': 32,
  'Tab': 9,
  'Backspace': 8,
  'Delete': 46,
  'Insert': 45,
  'Enter': 13,
  'Up': 38,
  'Down': 40,
  'Left': 37,
  'Right': 39,
  'Home': 36,
  'End': 35,
  'PageUp': 33,
  'PageDown': 34,
  'Esc': 27,
  'A': 65,
  'B': 66,
  'C': 67,
  'D': 68,
  'E': 69,
  'F': 70,
  'G': 71,
  'H': 72,
  'I': 73,
  'J': 74,
  'K': 75,
  'L': 76,
  'M': 77,
  'N': 78,
  'O': 79,
  'P': 80,
  'Q': 81,
  'R': 82,
  'S': 83,
  'T': 84,
  'U': 85,
  'V': 86,
  'W': 87,
  'X': 88,
  'Y': 89,
  'Z': 90,
  '0': 48,
  '1': 49,
  '2': 50,
  '3': 51,
  '4': 52,
  '5': 53,
  '6': 54,
  '7': 55,
  '8': 56,
  '9': 57,
  'F1': 112,
  'F2': 113,
  'F3': 114,
  'F4': 115,
  'F5': 116,
  'F6': 117,
  'F7': 118,
  'F8': 119,
  'F9': 120,
  'F10': 121,
  'F11': 122,
  'F12': 123,
  ',': 188,
  '.': 190,
  '/': 191,
  ';': 186,
  '\'': 222,
  '[': 219,
  ']': 221,
  '-': 189,
  '=': 187,
};

export const translateAcceleratorKeyCode = (keyCode: AcceleratorKeyCode): number => {
  return keyCodeMap[keyCode] || 0;
};

export const unifyKeyCode = (code: number): number => {
  return code;
};

export const encodeKeyModifier = (opts: {
  withShift?: boolean,
  withCmdOrCtrl?: boolean,
  withMeta?: boolean,
  withAlt?: boolean,
}) => {
  const withShift = !!opts.withShift ? 1 : 0;
  const withCmdOrCtrl = !!opts.withCmdOrCtrl ? 2 : 0;
  const withMeta = !!opts.withMeta ? 4 : 0;
  const withAlt = !!opts.withAlt ? 8 : 0;
  return toString36(withShift + withCmdOrCtrl + withMeta + withAlt, 1);
};

export const hashAccelerator = (acc: IAccelerator): string => {
  const keyCode = toString36(translateAcceleratorKeyCode(acc.keyCode), 2);
  const modifier = encodeKeyModifier(acc);
  return modifier + keyCode;
};

const hashKeyEventImpl = (ev: {
  keyCode: number,
  altKey: boolean,
  shiftKey: boolean,
  metaKey: boolean,
  ctrlKey: boolean,
}) => {
  const keyCode = toString36(unifyKeyCode(ev.keyCode), 2);
  const modifier = encodeKeyModifier({
    withShift: ev.shiftKey,
    withAlt: ev.altKey,
    withMeta: ev.metaKey,
    withCmdOrCtrl: ev.ctrlKey,
  });
  return modifier + keyCode;
};

export const hashKeyEvent = (ev: React.KeyboardEvent<Element>) => {
  return hashKeyEventImpl(ev);
};

export const hashDomKeyEvent = (ev: KeyboardEvent) => {
  return hashKeyEventImpl(ev);
};

const toString36 = (n: number, len: number = 0): string => {
  const str = n.toString(36);
  if (str.length < len) {
    return '+'.repeat(len - str.length) + str;
  }
  return str;
};
