import { onMounted, onUpdated, ref, watch } from 'vue';
import {
  useFetch,
  useFetchWithData,
  useStorageCache
} from '@/composables/browser/hooks';
import { API_MESSAGES } from './constants';

interface FormElements extends HTMLCollection {
  message: HTMLInputElement;
}

type Message = {
  id: string;
  message: string;
  timestamp: Date;
  from?: string;
  to?: string;
};

export const useMessages = () => {
  const endpoint = ref('');
  const data = ref();
  const container = ref(null);
  const messages = ref<Message[]>([]);
  const cache = useStorageCache(
    'messages',
    messages,
    (storedValue) => !storedValue.length
  );
  const initialResponse = useFetch(endpoint, data);
  const response = useFetchWithData(API_MESSAGES, data);

  const onSubmit = (event: Event) => {
    const form = event.target as HTMLFormElement;
    const input = (form.elements as FormElements).message;
    const message = input.value.trim();
    const id = Math.random().toString(16).slice(2);
    const fromMessage = {
      id,
      message,
      timestamp: new Date(),
      to: 'webguyian'
    };

    if (message.length) {
      data.value = fromMessage;
      messages.value.push(fromMessage);
    }

    form.reset();
    input.focus();
  };

  onMounted(() => {
    if (cache.value && cache.value.length) {
      // Set messages from cache
      messages.value.push(...cache.value);
    } else {
      // Fetch messages from API
      endpoint.value = API_MESSAGES;
    }
  });

  onUpdated(() => {
    if (container.value && messages.value.length > 9) {
      const containerEl = container.value as HTMLDivElement;
      const li = containerEl.querySelector('li:last-child');

      if (li) {
        li.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });

  watch(initialResponse, (newMessage: Message) => {
    if (newMessage) {
      messages.value.push(newMessage);
    }
  });

  watch(response, (newMessage: Message) => {
    if (newMessage) {
      messages.value.push(newMessage);
    }
  });

  return {
    container,
    messages,
    onSubmit
  };
};
