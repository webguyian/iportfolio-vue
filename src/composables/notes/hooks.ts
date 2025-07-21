import { ref } from 'vue';
import type { Note } from './types';

export const useNotes = () => {
  const notes = ref<Array<Note>>([]);
  const activeNote = ref<Note | null>(null);

  const onAdd = () => {
    const date = Date.now();
    const newNote = {
      date,
      id: date.toString(36),
      title: '',
      text: ''
    };

    notes.value.unshift(newNote);
    activeNote.value = newNote;
  };

  const actions = {
    onAdd
  };

  return { actions, activeNote, notes };
};
