// A subset of all supported accelerator key code
// refer to https://electronjs.org/docs/api/accelerator#available-key-codes for full code set
export type AcceleratorKeyCode =
  'Space' | 'Tab' | 'Backspace' | 'Delete' | 'Insert' | 'Enter' |
  'Up' | 'Down' | 'Left' | 'Right' | 'Home' | 'End' | 'PageUp' | 'PageDown' |
  'Esc' |
  'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' |
  'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z' |
  '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' |
  'F1' | 'F2' | 'F3' | 'F4' | 'F5' | 'F6' | 'F7' | 'F8' | 'F9' | 'F10' | 'F11' | 'F12' |
  ',' | '.' | '/' | ';' | '\'' | '[' | ']' | '-' | '=';

export interface IAccelerator {
  keyCode: AcceleratorKeyCode;
  withShift?: boolean;
  withCmdOrCtrl?: boolean; // TODO: test Cmd key on Mac environment
  withMeta?: boolean;
  withAlt?: boolean;
}

export interface IApplicationAction<T = any> {
  key: string;
  displayName: string;
  description: string;
  accelerator?: IAccelerator;
  getParams?: () => T;
}

export interface IApplicationActionClass<T = any> {
  actionBody: (params: T) => void;
}
