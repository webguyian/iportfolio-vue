<template>
  <form
    :class="[
      'reminder',
      checked && 'reminder--checked',
      swiped && 'reminder--swiped',
      swiping && 'reminder--swiping'
    ]"
    @submit.stop.prevent="$emit('submit')"
    v-touch:swipe.left="onSwipeLeft"
    v-touch:swipe.right="onSwipeRight"
  >
    <div class="reminder-field">
      <input
        class="reminder-checkbox"
        type="checkbox"
        :id="`reminder-${id}`"
        v-model="checked"
      />
      <label class="reminder-label" :for="`reminder-${id}`">
        <UIText type="accessible">Toggle checkbox</UIText>
      </label>
      <input
        class="reminder-input"
        type="text"
        v-model="value"
        ref="inputRef"
      />
    </div>
    <UIButton class="ui-btn--delete" @click="$emit('remove', id)"
      >Delete</UIButton
    >
  </form>
</template>

<script setup lang="ts">
import UIButton from './UIButton.vue';
import UIText from './UIText.vue';
import {
  useRefControlledFocus,
  useReminder
} from '@/composables/reminders/hooks';

const props = withDefaults(
  defineProps<{
    checked?: boolean;
    focused?: boolean;
    id: number;
    value?: string;
  }>(),
  {
    checked: false,
    focused: false,
    value: ''
  }
);

const emit = defineEmits(['remove', 'submit', 'update']);

const inputRef = useRefControlledFocus(props.focused);
const { checked, value, swiped, swiping, onSwipeLeft, onSwipeRight } =
  useReminder(props, emit);
</script>

<style lang="scss">
.reminder {
  display: flex;
  position: relative;
  align-items: center;
  margin-bottom: $gutter-s;

  &-field {
    display: flex;
    align-items: center;
    width: 390px;
    padding-left: $gutter;
    transition: transform 0.4s linear;
  }

  &-checkbox {
    position: absolute;
    left: 7px;
    margin: 0;
    opacity: 0;
  }

  &-label {
    @include circle(26px);
    display: block;
    position: relative;
    flex-shrink: 0;
    margin-right: 10px;
    border: 2px solid $gray-medium;
    cursor: pointer;

    .reminder--checked & {
      border-color: $orange;

      &::after {
        @include circle(16px);
        display: inline-block;
        position: absolute;
        top: 3px;
        left: 3px;
        background-color: $orange;
        content: '';
      }
    }
  }

  &-input {
    @include focus-outline;
    min-width: 320px;
    min-height: 35px;
    padding: 4px;
    border: 0;
    background: none;
    color: $white;
    font-size: $font-size-default;
  }

  > .ui-btn--delete {
    position: absolute;
    right: -20px;
    width: 0;
    padding: 10px;
    transition: width 0.4s linear;
    background-color: $red;
    color: $white;
  }

  &--swiped {
    .reminder-input {
      padding-right: 80px;
    }

    > .ui-btn--delete {
      right: $gutter;
      width: 80px;
    }
  }

  &--swiping {
    .reminder-input {
      outline: none;
    }

    > .ui-btn--delete {
      width: 100%;
    }
  }
}
</style>
