import { computed, ref } from 'vue';
import { REGEX_URL, REGEX_PROTOCOL } from '@/composables/safari/constants';

export const useWebSearch = () => {
  const searchFocus = ref(false);
  const inputValue = ref('');
  const searchTerm = computed(() => inputValue.value.toLowerCase().trim());
  const hasSearch = computed(() =>
    Boolean(searchFocus.value || searchTerm.value.length)
  );

  const handleFocus = () => {
    searchFocus.value = !searchFocus.value;
  };

  const handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement;

    inputValue.value = target.value;
  };

  const handleCancel = () => {
    inputValue.value = '';
    searchFocus.value = false;
  };

  const handleSubmit = (event: Event) => {
    const searchString = searchTerm.value;
    const isUrl = REGEX_URL.test(searchString);
    const hasProtocol = REGEX_PROTOCOL.test(searchString);
    const url = hasProtocol ? searchString : 'https://' + searchString;
    const googleSearch = 'https://google.com/search?q=';

    event.preventDefault();

    if (isUrl) {
      window.open(url, '_blank');
    } else {
      window.open(googleSearch + encodeURIComponent(searchString), '_blank');
    }

    handleCancel();
    handleFocus();
  };

  return {
    actions: {
      cancel: handleCancel,
      change: handleChange,
      focus: handleFocus,
      submit: handleSubmit
    },
    hasSearch,
    inputValue
  };
};
