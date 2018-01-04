import { logger } from './logger';

export interface IColor {
  r: number;
  g: number;
  b: number;
}

const hexShortPattern = /#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/;
const hexLongPattern = /#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})/;

export const parseColor = (rgbColor: string): IColor => {
  if (rgbColor.match(hexShortPattern)) {
    const match = hexShortPattern.exec(rgbColor);
    if (match !== null) {
      return { r: parseInt(match[1], 16) * 16, g: parseInt(match[2], 16) * 16, b: parseInt(match[3], 16) * 16 };
    }
  }
  if (rgbColor.match(hexLongPattern)) {
    const match = hexLongPattern.exec(rgbColor);
    if (match !== null) {
      return { r: parseInt(match[1], 16), g: parseInt(match[2], 16), b: parseInt(match[3], 16) };
    }
  }
  logger.warn('unrecognized color format' + rgbColor);
  return { r: 0, g: 0, b: 0 };
};

export const toRgba = (rgbColor: string, opacity: number): string => {
  const c = parseColor(rgbColor);
  return `rgba(${c.r}, ${c.g}, ${c.b}, ${opacity})`;
};
