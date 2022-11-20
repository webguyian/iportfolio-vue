import { onUnmounted, ref, watch, watchEffect } from 'vue';
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

export const useReminder = (
  reminder: Reminder,
  emit: (event: 'update', ...args: Array<any>) => void
) => {
  const checked = ref(reminder.checked);
  const value = ref(reminder.value);
  const swiped = ref(false);
  const swiping = ref(false);

  const onSwipeLeft = () => {
    if (swiped.value) {
      swiping.value = true;
    } else {
      swiped.value = true;
    }
  };

  const onSwipeRight = () => {
    swiping.value = false;
    swiped.value = false;
  };

  watch([checked, value], (newValue) => {
    emit('update', {
      id: reminder.id,
      checked: newValue[0],
      value: newValue[1]
    });
  });

  return { checked, value, swiped, swiping, onSwipeLeft, onSwipeRight };
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
