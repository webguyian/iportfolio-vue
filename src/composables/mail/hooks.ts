import { onMounted, reactive, ref, watch } from 'vue';
import { useFetch, useStorageCache } from '@/composables/browser/hooks';

import { API_MAIL, defaultBody, defaultValues } from './constants';
import type { MailFields } from './types';
import { useRouter } from 'vue-router';

export const useMail = (populateFields?: MailFields) => {
  const initialValues =
    populateFields && populateFields.body ? populateFields : defaultValues;
  const fields = reactive({ ...initialValues });
  const router = useRouter();
  const endpoint = ref('');
  const options = ref();
  const data = useFetch(endpoint, options);
  const cache = useStorageCache(
    'mail',
    fields,
    (storedValue) =>
      storedValue.from === defaultValues.from &&
      storedValue.subject === defaultValues.subject &&
      storedValue.body === defaultValues.body
  );
  const state = reactive({
    invalid: false,
    pristine: true,
    showControls: false
  });

  const resetAndRedirect = () => {
    // Reset fields and redirect
    fields.from = defaultValues.from;
    fields.subject = defaultValues.subject;
    fields.body = defaultValues.body;

    router.push({ name: 'home' });
  };

  const onSubmit = async () => {
    const formData = new FormData();

    Object.keys(fields).forEach(async (key) => {
      if (key === 'attachment' && fields.attachment.length) {
        // Covert base64 data to blob
        const blob = await fetch(fields.attachment).then((res) => res.blob());

        formData.append(key, blob, 'image.png');
      } else {
        formData.append(key, fields[key as keyof typeof fields]);
      }
    });

    endpoint.value = API_MAIL;
    options.value = {
      method: 'POST',
      body: formData
    };
  };
  const onCancel = (event: Event) => {
    if (!state.pristine) {
      event.preventDefault();
      state.showControls = true;
    }
  };
  const onConfirmCancel = () => {
    state.showControls = false;
  };
  const onSave = () => {};

  onMounted(() => {
    if (cache && cache.value) {
      // Update field values from local cache
      for (const [key, value] of Object.entries(cache.value)) {
        if (value !== defaultValues[key as keyof typeof defaultValues]) {
          (fields[key as keyof typeof fields] as any) = value;
        }
      }
    }

    const from = document.getElementById('from');

    from?.focus();
  });

  watch(fields, (newValues) => {
    const required = [newValues.from, newValues.subject, newValues.body];

    if (
      required.every((field) => field.trim().length) &&
      newValues.body.trim() !== defaultBody.trim()
    ) {
      state.invalid = false;
    } else {
      state.invalid = true;
    }

    if (
      newValues.from === defaultValues.from &&
      newValues.subject === defaultValues.subject &&
      newValues.body === defaultValues.body
    ) {
      state.pristine = true;
    } else {
      state.pristine = false;
    }
  });

  watch(data, (newValues) => {
    if (newValues && newValues.id) {
      resetAndRedirect();
    }
  });

  const actions = {
    onCancel,
    onConfirmCancel,
    onDelete: resetAndRedirect,
    onSave,
    onSubmit
  };

  return {
    actions,
    fields,
    state
  };
};
