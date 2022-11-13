<template>
  <div class="picker-container">
    <VueScrollPicker
      :options="optionGroups.hours"
      v-model="hour"
      @update:modelValue="handleChange('hours', $event)"
    />
    <VueScrollPicker
      :options="optionGroups.minutes"
      v-model="minute"
      @update:modelValue="handleChange('minutes', $event)"
    />
    <VueScrollPicker
      :options="optionGroups.seconds"
      v-model="second"
      @update:modelValue="handleChange('seconds', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import { VueScrollPicker } from 'vue-scroll-picker';
import { optionGroups } from '@/composables/clock/constants';
import { ref, toRefs, watch } from 'vue';
import type { Duration } from '@/composables/clock/types';

const props = defineProps<{
  values: Duration;
}>();

const emit = defineEmits(['update:duration']);

const { values } = toRefs(props);
const hour = ref(props.values?.hours);
const minute = ref(props.values?.minutes);
const second = ref(props.values?.seconds);

const handleChange = (key: string, value: number) => {
  emit('update:duration', key, value);
};

watch(values, (newValues) => {
  hour.value = newValues.hours;
  minute.value = newValues.minutes;
  second.value = newValues.seconds;
});
</script>

<style lang="scss">
.picker-container {
  display: flex;
  width: 100%;
  margin-bottom: $gutter;

  .vue-scroll-picker {
    &-layer-top,
    &-layer-bottom {
      background: none;
      border-color: rgba($gray-medium, 0.5);
    }

    &-item {
      font-size: $font-size-m;

      &-selected {
        color: $white;
      }
    }

    &:first-of-type {
      .vue-scroll-picker-item-selected::after {
        content: ' hours';
      }
    }

    &:nth-of-type(2) {
      .vue-scroll-picker-item-selected::after {
        content: ' min';
      }
    }

    &:nth-of-type(3) {
      .vue-scroll-picker-item-selected::after {
        content: ' sec';
      }
    }
  }
}
</style>
<style src="vue-scroll-picker/lib/style.css"></style>
