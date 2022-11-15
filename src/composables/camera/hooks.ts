import { computed, onMounted, reactive, ref, watch } from 'vue';
import {
  getMobileOperatingSystem,
  toKebabCase
} from '@/composables/browser/helpers';
import { useLocalStorage, useVideoCanvas } from '@/composables/browser/hooks';
import { defaultSettings, Filters, initialFilters } from './constants';
import type {
  CameraControl,
  CameraFilter,
  CanvasRef,
  Photo,
  VideoRef
} from './types';

export const useVideoStream = (videoRef: VideoRef) => {
  watch(videoRef, (ref) => {
    if (!ref) {
      // Exit early
      return;
    }

    const getStream = async () => {
      const constraints = {
        video: true,
        width: 375,
        height: 750,
        facingMode: 'user'
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      if (getMobileOperatingSystem() === 'iOS') {
        ref.addEventListener('loadeddata', () => {
          ref.play();
        });
      }

      ref.srcObject = stream;
      ref.load();
    };

    getStream();

    return () => {
      const source = ref.srcObject as MediaStream;
      const tracks = source && source.getTracks();

      if (tracks && tracks.length) {
        tracks.forEach((track) => track.stop());
      }
    };
  });
};

export const useCameraFilters = (videoRef: VideoRef, canvasRef: CanvasRef) => {
  const activeFilter = ref(initialFilters[0].label);
  const defaultFilters =
    getMobileOperatingSystem() !== 'iOS'
      ? initialFilters
      : initialFilters.filter((f) => !f.value.startsWith('url'));
  const filtersRef = ref(defaultFilters);
  const onFilter = (filter: CameraFilter) => {
    const srcCanvas = canvasRef.value;

    if (srcCanvas) {
      const context = srcCanvas.getContext('2d')!;

      context.filter = filter.value;

      activeFilter.value = filter.label as Filters;
    }
  };

  onMounted(() => {
    const filters = filtersRef.value;

    if (!filters || !filters.length) {
      return;
    }

    filters.forEach((filter) => {
      const srcVideo = videoRef.value;
      const dstCanvas = document.getElementById(
        `canvas-${toKebabCase(filter.label)}`
      ) as HTMLCanvasElement;

      if (!srcVideo || !dstCanvas) {
        return;
      }

      const dstContext = dstCanvas.getContext('2d')!;

      function step() {
        dstContext.filter = filter.value;
        dstContext.drawImage(
          srcVideo!,
          0,
          0,
          dstCanvas.width,
          dstCanvas.height
        );

        requestAnimationFrame(step);
      }

      if (srcVideo && dstContext) {
        requestAnimationFrame(step);
      }
    });
  });

  return { filtersRef, activeFilter, onFilter };
};

export const useCamera = () => {
  const { actions, canvasRef, videoRef } = useVideoCanvas();
  const { filtersRef, activeFilter, onFilter } = useCameraFilters(
    videoRef,
    canvasRef
  );
  const overlay = ref(null) as CanvasRef;
  const controls = reactive({
    ...defaultSettings
  });
  const intervalRef = ref();
  const count = ref(5);
  const { storedValue, setValue } = useLocalStorage('photos', []);
  const photos = ref<Array<Photo>>(storedValue.value);
  const photo = computed(() => {
    const lastIndex = photos.value.length - 1;

    if (!photos.value.length) {
      return null;
    }

    const lastPhoto = photos.value[lastIndex];

    return {
      ...lastPhoto,
      metadata: {
        ...lastPhoto.metadata,
        index: lastIndex
      }
    };
  });

  useVideoStream(videoRef);

  const drawText = (
    text: string,
    context: CanvasRenderingContext2D,
    x: number,
    y: number
  ) => {
    context.font = 'bold 160px Montserrat';
    context.textAlign = 'center';
    context.strokeStyle = '#1c1c1e';
    context.lineWidth = 6;
    context.strokeText(text, x, y);
    context.fillStyle = '#fff';
    context.fillText(text, x, y);
  };

  const captureImage = () => {
    const image = actions.takePhoto();
    const data: Photo = {
      image,
      metadata: {
        dateCreated: Number(new Date()),
        filter: activeFilter.value
      }
    };

    photos.value.push(data);
    setValue(photos.value);

    controls.button = 'enabled';
  };

  const counter = (num: number) => {
    const canvas = overlay.value;

    if (!canvas) {
      return;
    }

    const { width, height } = canvas;
    const context = canvas.getContext('2d')!;
    const interval = intervalRef.value;

    context.clearRect(0, 0, width, height);

    drawText(`${num}`, context, width / 2, height / 2 + 60);

    if (!num) {
      clearInterval(interval);
      context.clearRect(0, 0, width, height);
      count.value = 5;
      captureImage();
    }
  };

  const onCapture = () => {
    controls.button = 'disabled';

    if (controls.timer === 'active') {
      const interval = setInterval(() => {
        counter(count.value--);
      }, 1000);

      intervalRef.value = interval;

      return;
    }

    captureImage();
  };

  const onControl = (control: CameraControl) => {
    controls[control] = controls[control] !== 'active' ? 'active' : 'enabled';
  };

  onMounted(() => {
    if (getMobileOperatingSystem() !== 'iOS') {
      controls.timer = 'enabled';
    }
  });

  const elements = {
    canvas: canvasRef,
    filters: filtersRef,
    overlay,
    activeFilter,
    video: videoRef,
    photo
  };
  const updatedActions = {
    onCapture,
    onControl,
    onFilter,
    onPlay: actions.onPlay
  };

  return { actions: updatedActions, elements, controls };
};
