<script setup lang="ts">
import type { Note } from '@/composables/notes/types';
import DateTime from './DateTime.vue';
import UIButton from './UIButton.vue';
import UILink from './UILink.vue';
import UIText from './UIText.vue';

defineProps<{
  note: Note;
}>();

const noTitleMessage = 'New Note';
const noTextMessage = 'No additional text';
</script>

<template>
  <div class="note-preview">
    <UILink :to="`/notes/${note.id}`">
      <UIText class="note-preview-title-display" element="h2" type="display">
        {{ note.title || noTitleMessage }}
      </UIText>
      <div class="note-preview-body">
        <UIText class="note-preview-date-display">
          <DateTime format="h:mm a" from-now>
            {{ note.date }}
          </DateTime>
        </UIText>
        <UIText class="note-preview-text-display">
          {{ note.text || noTextMessage }}
        </UIText>
      </div>
    </UILink>
    <UIButton class="ui-btn--delete">Delete</UIButton>
  </div>
</template>

<style lang="scss">
.note-preview {
  display: block;
  position: relative;
  margin: 0 25px;
  padding: 10px 0;
  border-top: 1px solid $gray-medium;

  &-title-display,
  &-text-display {
    @include truncate;
  }

  &-title-display {
    font-size: $font-size-default;
  }

  &-body {
    display: flex;
    align-items: flex-start;
  }

  &-date-display {
    display: inline-block;
    min-width: 85px;
    color: $gray;
  }

  &-text-display {
    color: $gray-medium;
  }

  > .ui-btn--delete {
    position: absolute;
    top: 0;
    right: -45px;
    width: 0;
    height: 100%;
    padding: 10px;
    transition: width 0.4s linear;
    background-color: $red;
    color: $white;
  }

  &--swiped {
    > .ui-btn--delete {
      right: -25px;
      width: 80px;
    }
  }

  &--swiping {
    .reminder-input {
      outline: none;
    }

    > .ui-btn--delete {
      width: 115%;
    }
  }
}
</style>
