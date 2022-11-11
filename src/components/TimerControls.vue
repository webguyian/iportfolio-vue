<template>
  <div class="timer-controls">
    <div :class="[controlClass, disabled && `${controlClass}--disabled`]">
      <RoundedButton :disabled="disabled" @click="$emit('action:secondary')">
        {{ !timerRunning && hasLaps ? resetLabel : secondaryLabel }}
      </RoundedButton>
    </div>
    <div :class="[controlClass, controlStateClass]">
      <RoundedButton @click="$emit('action:primary')">
        {{ timerRunning ? stopLabel : startLabel }}
      </RoundedButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import RoundedButton from './RoundedButton.vue';

const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    hasLaps?: boolean;
    resetLabel?: string;
    secondaryLabel?: string;
    startLabel?: string;
    stopLabel?: string;
    timerRunning?: boolean;
  }>(),
  {
    disabled: false,
    hasLaps: false,
    resetLabel: 'Reset',
    secondaryLabel: 'Lap',
    startLabel: 'Start',
    stopLabel: 'Stop',
    timerRunning: false
  }
);

defineEmits(['action:primary', 'action:secondary']);

const controlClass = 'timer-control';
const controlStateClass = props.timerRunning
  ? `${controlClass}--${props.stopLabel.toLowerCase()}`
  : `${controlClass}--start`;
</script>

<style lang="scss">
.timer {
  @include stretch-column;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  height: auto;

  .picker-container {
    margin-bottom: $gutter;
  }

  .picker-item {
    width: 75px;
    height: 36px;
    line-height: 36px;
  }

  &-controls {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
    padding: 0 $gutter;
  }

  &-control {
    padding: 3px;
    border-radius: $border-radius-round;
    background-color: $gray-medium;

    &--start {
      background-color: rgba($green, 0.2);

      > .ui-btn--rounded {
        background-color: rgba($green, 0.2);
        color: $green-light;
      }
    }

    &--stop {
      background-color: rgba($red, 0.2);

      > .ui-btn--rounded {
        background-color: rgba($red, 0.2);
        color: $red-light;
      }
    }

    &--pause {
      background-color: rgba($yellow, 0.2);

      > .ui-btn--rounded {
        background-color: rgba($yellow, 0.2);
        color: $yellow-light;
      }
    }

    &--disabled {
      background-color: lighten($black-dark, 5%);
    }

    > .ui-btn--rounded {
      margin: 0;
      border: 3px solid $black-dark;
      font-size: $font-size-default;

      &[disabled] {
        background-color: lighten($black-dark, 5%);
        color: $gray;
        cursor: default;
      }
    }
  }
}
</style>
