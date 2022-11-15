import { onMounted, onUnmounted, ref, watch, watchEffect, type Ref } from 'vue';
import { API_TOKEN } from './constants';
import { getOptions, isExpired, isTokenValid } from './helpers';

export const useBreakpoint = (breakpoint: number) => {
  const matchesBreakpoint = ref(true);
  const mediaQuery = `(max-width: ${breakpoint}px)`;

  const handleResize = () => {
    const matches = window.matchMedia(mediaQuery).matches;

    matchesBreakpoint.value = matches;
  };

  onMounted(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
  });

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
  });

  return matchesBreakpoint;
};

export const useLocalStorage = (
  key: string,
  defaultValue?: any,
  deleteFn?: (value: any) => boolean
) => {
  const getValue = (): any => {
    try {
      // Get item from local storage with key
      const item = window.localStorage.getItem(key);

      // Parse stored JSON or if none return defaultValue
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      // If error return defaultValue
      return defaultValue;
    }
  };
  const storedValue = ref(getValue());
  const setValue = (newValue: any) => {
    try {
      // Save state
      storedValue.value = newValue;

      if (deleteFn && deleteFn(newValue)) {
        // Remove item from local storage
        window.localStorage.removeItem(key);
      } else {
        if (typeof newValue === 'object' && !(newValue instanceof Array)) {
          // Include timestamp on objects
          newValue.timestamp = Date.now();
        }

        // Save to local storage
        window.localStorage.setItem(key, JSON.stringify(newValue));
      }
    } catch (error) {
      // Drop error
    }
  };

  return {
    setValue,
    storedValue
  };
};

export const useStorageCache = (
  key: string,
  currentValue: any,
  deleteFn?: (value: any) => boolean
): Ref<any> => {
  const { setValue, storedValue } = useLocalStorage(
    key,
    currentValue,
    deleteFn
  );

  watch(currentValue, (newValue) => {
    storedValue.value = newValue;
  });

  onUnmounted(() => {
    if (key && currentValue.value) {
      setValue(currentValue.value);
    }
  });

  return storedValue;
};

export const useToken = () => {
  const token = ref(null);
  const storedValue = useStorageCache('jwt', token);

  const fetchData = async () => {
    const response = await fetch(API_TOKEN);
    const result = await response.json();

    token.value = result;
  };

  watchEffect(() => {
    if (storedValue.value && isTokenValid(storedValue.value)) {
      // Set token from cache
      token.value = storedValue.value;
    } else {
      // Call API to get token
      fetchData();
    }
  });

  return token;
};

export const useFetch = (
  endpoint: Ref<string>,
  overrides: Ref<{ [key: string]: any }>,
  withData?: boolean
): Ref<any> => {
  const data = ref(null);
  const jwt = useToken();

  const fetchData = async () => {
    const options = getOptions(jwt.value!, overrides.value);

    if (withData) {
      options.headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(endpoint.value, options as RequestInit);
    const result = await response.json();

    if (!result.error) {
      data.value = result;
    } else {
      // Handle error
    }
  };

  watch(endpoint, () => {
    if (jwt.value && endpoint.value) {
      if (!withData) {
        fetchData();
      }
    }
  });

  watch(overrides, () => {
    if (withData && jwt.value && endpoint.value) {
      if (overrides.value && overrides.value.body) {
        fetchData();
      }
    }
  });

  return data;
};

export const useFetchWithData = (url: string, data: Ref<object>): Ref<any> => {
  const endpoint = ref(url);
  const options = ref();
  const response = useFetch(endpoint, options, true);

  watch(data, (newData) => {
    options.value = {
      method: 'POST',
      body: JSON.stringify(newData)
    };
  });

  return response;
};

export const useFetchAndCache = (
  url: string,
  key: string,
  expiration: string
) => {
  const endpoint = ref('');
  const options = ref();
  const response = useFetch(endpoint, options);
  const cache = useStorageCache(key, response);
  const cacheExpired =
    cache.value && isExpired(cache.value.timestamp, expiration);

  onMounted(() => {
    if (url) {
      if (!cache.value || cacheExpired) {
        // Fetch if no cache or cache is expired
        endpoint.value = url;
      }
    }
  });

  return cache.value && !cacheExpired ? cache : response;
};

export const useVideoCanvas = () => {
  const canvasRef = ref<HTMLCanvasElement | null>(null);
  const videoRef = ref<HTMLVideoElement | null>(null);
  const defaultFormat = 'image/png';
  const getElements = () => {
    const canvas = canvasRef.value;
    const context = canvas && canvas.getContext('2d');
    const video = videoRef.value;

    return {
      canvas,
      context,
      video
    };
  };

  const onPlay = () => {
    const { canvas, context, video } = getElements();

    function step() {
      if (canvas && context && video) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
      }

      requestAnimationFrame(step);
    }

    if (video && !video.paused) {
      requestAnimationFrame(step);
    }
  };

  const takePhoto = (format = defaultFormat) => {
    const { canvas, context, video } = getElements();

    if (canvas && context && video) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL(format);
    }
  };

  const clearPhoto = (format = defaultFormat) => {
    const { canvas, context } = getElements();

    if (canvas && context) {
      context.fillStyle = '#1c1c1e';
      context.fillRect(0, 0, canvas.width, canvas.height);
      return canvas.toDataURL(format);
    }
  };

  const actions = {
    onPlay,
    takePhoto,
    clearPhoto
  };

  return { canvasRef, videoRef, actions };
};
