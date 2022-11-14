import type { Ref } from 'vue';
import type { Filters } from './constants';

export type CameraControl = 'button' | 'flash' | 'filter' | 'swap' | 'timer';

export type CameraControlState = 'active' | 'enabled' | 'disabled';

export type CameraFilter = {
  label: string;
  value: string;
};

export type CameraSettings = {
  [K in CameraControl]: CameraControlState;
};

export type CanvasRef = Ref<HTMLCanvasElement | null>;

export type VideoRef = Ref<HTMLVideoElement | null>;

export type Photo = {
  image?: string;
  metadata: {
    dateCreated: number;
    filter: Filters;
  };
};
