import { onMounted, ref, watch } from 'vue';
import { useFetch } from '@/composables/browser/hooks';
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
  const options = ref();
  const messages = ref<Message[]>([]);
  const data = useFetch(endpoint, options, true);

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
      options.value = {
        method: 'POST',
        body: JSON.stringify(fromMessage)
      };
      messages.value.push(fromMessage);
    }

    form.reset();
    input.focus();
  };

  onMounted(() => {
    endpoint.value = API_MESSAGES;
  });

  watch(data, (newMessage: Message) => {
    if (newMessage) {
      messages.value.push(newMessage);
    }
  });

  return {
    messages,
    onSubmit
  };
};
