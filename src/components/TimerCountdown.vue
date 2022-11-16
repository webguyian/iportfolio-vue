<template>
  <div class="countdown">
    <svg class="countdown-svg">
      <circle :style="style" :r="radius" :cx="radius" :cy="radius"></circle>
    </svg>
    <UIText
      element="h2"
      :class="['countdown-text', displayHours && 'countdown-text--with-hours']"
    >
      {{ displayTime }}
    </UIText>
  </div>
</template>

<script setup lang="ts">
import { computed, type ComputedRef, type Ref } from 'vue';
import UIText from './UIText.vue';
import { useRadialOffset } from '@/composables/clock/hooks';

const props = withDefaults(
  defineProps<{
    allSeconds: ComputedRef<number>;
    duration: Ref<number>;
    hours: Ref<number>;
    minutes: Ref<number>;
    radius?: number;
    running: Ref<boolean>;
    seconds: Ref<number>;
  }>(),
  {
    radius: 175
  }
);

// eslint-disable-next-line vue/no-setup-props-destructure
const { allSeconds, duration, hours, minutes, seconds, radius, running } =
  props;
const { initialSeconds, offset } = useRadialOffset(
  allSeconds,
  duration,
  radius
);
const displaySeconds = computed(() =>
  seconds.value < 10 ? `0${seconds.value}` : seconds.value
);
const displayMinutes = computed(() =>
  minutes.value < 10 ? `0${minutes.value}` : minutes.value
);
const displayHours = computed(() => (hours.value > 0 ? `${hours.value}:` : ''));
const displayTime = computed(
  () => `${displayHours.value}${displayMinutes.value}:${displaySeconds.value}`
);

const style = computed(() => ({
  'animation-duration': `${initialSeconds.value}s`,
  'animation-play-state': running.value ? 'running' : 'paused',
  'stroke-dashoffset': offset.value
}));
</script>
<script lang="ts">
export default {
  inheritAttrs: false
};
</script>

<style lang="scss">
$pi: math.div(22, 7);
$radius: 175;
$circumference: 2 * $pi * $radius;
$circle-size: #{$radius * 2}px;
$stroke-width: 8px;

.countdown {
  display: flex;
  position: relative;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 358px;
  height: 358px;
  border: $stroke-width solid $gray-dark;
  border-radius: $border-radius-round;

  &-text {
    @include type-number-display($font-size-xxl);
    margin: 0;

    &--with-hours {
      font-size: 70px;
    }
  }

  &-svg {
    position: absolute;
    top: -5px;
    left: 50%;
    width: $circle-size;
    height: $circle-size;
    transform: translateX(-50%) rotateY(-180deg) rotateZ(-90deg);
    overflow: visible;

    > circle {
      stroke-dasharray: $circumference;
      stroke-dashoffset: 0;
      stroke-linecap: round;
      stroke-width: $stroke-width;
      stroke: $orange;
      fill: none;
      animation: countdown 10s linear infinite forwards;
    }
  }
}

@keyframes countdown {
  to {
    stroke-dashoffset: $circumference;
  }
}
</style>
