<script setup lang="ts">
import { useNotes } from '@/composables/notes/hooks';
import { computed } from 'vue';
import CountText from './CountText.vue';
import NotePreview from './NotePreview.vue';
import UIButton from './UIButton.vue';
import UIText from './UIText.vue';

const { actions, notes } = useNotes();
const noteCount = computed(() => notes.value.length);
</script>

<template>
  <div class="notes-app">
    <UIText element="h1" type="display">Notes</UIText>
    <ul v-if="noteCount" class="notes-app-list">
      <li v-for="note in notes" :key="note.id" class="notes-app-list-item">
        <NotePreview :note="note" />
      </li>
    </ul>
    <div class="notes-app-bottom-bar">
      <CountText :count="noteCount" empty-label="No">Notes</CountText>
      <UIButton icon="edit" @click="actions.onAdd">New note</UIButton>
    </div>
  </div>
</template>

<style lang="scss">
.notes-app {
  @include stretch-column;

  > .ui-text--display {
    @include type-title($yellow);
  }

  &-list {
    @include unstyled-list;
    width: 100%;
    max-height: 645px;
    overflow-x: hidden;
    overflow-y: scroll;

    &-item {
      padding: 0;
    }
  }

  &-bottom-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: auto;
    padding: 10px 20px;

    > .ui-text--body {
      flex-grow: 1;
      margin: 0;
      font-size: $font-size-s;
      text-align: center;
    }

    > .ui-btn--with-icon {
      margin-left: auto;
      padding: 2px;
      font-size: $font-size-m;

      > .ui-icon-edit {
        color: $yellow;
      }
    }
  }
}
</style>
