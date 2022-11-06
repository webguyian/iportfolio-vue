import { onMounted, onUnmounted, ref, watch, watchEffect, type Ref } from 'vue';
import { API_TOKEN } from './constants';
import { getOptions, isTokenValid } from './helpers';

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
      storedValue.value = newValue.value;

      if (deleteFn && deleteFn(newValue.value)) {
        // Remove item from local storage
        window.localStorage.removeItem(key);
      } else {
        if (
          typeof newValue.value === 'object' &&
          !(newValue.value instanceof Array)
        ) {
          if (newValue.value !== storedValue.value) {
            // Include timestamp on objects
            newValue.value.timestamp = Date.now();
          }
        }

        // Save to local storage
        window.localStorage.setItem(key, JSON.stringify(newValue.value));
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
) => {
  const { setValue, storedValue } = useLocalStorage(
    key,
    currentValue,
    deleteFn
  );

  watch(currentValue, (newValue) => {
    storedValue.value = newValue;
  });

  onUnmounted(() => {
    if (key && storedValue) {
      setValue(storedValue);
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
  overrides: Ref<object>
): Ref<any> => {
  const data = ref(null);
  const jwt = useToken();

  const fetchData = async () => {
    const options = getOptions(jwt.value!, overrides.value);

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
      fetchData();
    }
  });

  return data;
};
