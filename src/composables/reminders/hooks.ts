import { onUnmounted, ref, watchEffect } from 'vue';
import { useLocalStorage } from '@/composables/browser/hooks';
import type { Reminder } from './types';

export const useRefControlledFocus = (focused: boolean) => {
  const element = ref<HTMLInputElement | null>(null);

  watchEffect(() => {
    if (focused && element.value) {
      element.value.focus();
    }
  });

  return element;
};

export const useReminders = () => {
  const { storedValue: reminders, setValue } = useLocalStorage(
    'reminders',
    [],
    (storedValue) => !storedValue.length
  );
  const focusedId = ref();
  const add = () => {
    const id = Date.now();

    setValue(reminders.value.concat({ id, checked: false, value: '' }));

    focusedId.value = id;
  };
  const remove = (id: number) => {
    const filtered = reminders.value.filter(
      (reminder: Reminder) => reminder.id !== id
    );

    setValue(filtered);
    focusedId.value = null;
  };
  const update = (updated: Reminder) => {
    const updatedReminders = reminders.value.map((reminder: Reminder) => {
      if (reminder.id === updated.id) {
        return {
          ...reminder,
          ...updated
        };
      }

      return reminder;
    });

    setValue(updatedReminders);
  };

  const actions = {
    add,
    remove,
    update
  };

  onUnmounted(() => {
    // Remove empty items
    const filtered = reminders.value.filter(
      (reminder: Reminder) => reminder.value.length
    );

    setValue(filtered);
  });

  return { actions, focusedId, reminders };
};
