import type { CameraSettings } from './types';

export enum Filters {
  Original = 'Original',
  Grayscale = 'Grayscale',
  Sepia = 'Sepia',
  Invert = 'Invert',
  Saturate = 'Saturate',
  'High Contrast' = 'High Contrast',
  'Hue Rotate' = 'Hue Rotate',
  Sharpen = 'Sharpen',
  Blur = 'Blur',
  Threshold = 'Threshold'
}

export const defaultSettings: CameraSettings = {
  button: 'enabled',
  flash: 'disabled',
  filter: 'enabled',
  swap: 'disabled',
  timer: 'disabled'
};

export const initialFilters = [
  {
    label: Filters.Original,
    value: 'none'
  },
  {
    label: Filters.Grayscale,
    value: 'grayscale(100%)'
  },
  {
    label: Filters.Sepia,
    value: 'sepia(100%)'
  },
  {
    label: Filters.Invert,
    value: 'invert(100%)'
  },
  {
    label: Filters.Saturate,
    value: 'saturate(250%)'
  },
  {
    label: Filters['High Contrast'],
    value: 'contrast(400%)'
  },
  {
    label: Filters['Hue Rotate'],
    value: 'hue-rotate(180deg)'
  },
  {
    label: Filters.Sharpen,
    value: 'url(#svgSharpen)'
  },
  {
    label: Filters.Blur,
    value: 'blur(4px)'
  },
  {
    label: Filters.Threshold,
    value: 'url(#svgThreshold)'
  }
];
