<template>
  <label :class="[baseClass, checked && `${baseClass}--active`]">
    <input
      class="ui-toggle-switch-checkbox"
      type="checkbox"
      @change="handleChange"
    />
    <UIButton
      class="ui-toggle-switch-slider"
      @transitionend="$emit('update')"
    />
    <UIText class="ui-toggle-switch-label">slide to unlock</UIText>
  </label>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import UIButton from './UIButton.vue';
import UIText from './UIText.vue';

const checked = ref(false);
const baseClass = 'ui-toggle-switch';

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  checked.value = target.checked;
};

defineEmits(['update']);
</script>

<style lang="scss">
.ui-toggle-switch {
  display: block;
  position: relative;
  margin: 0 auto;
  border-radius: 25px;
  background-color: rgba($black, 0.5);
  text-align: center;
  cursor: pointer;

  &-checkbox {
    @include accessibly-hidden;
  }

  &-slider {
    display: block;
    position: absolute;
    top: 8px;
    left: 8px;
    width: 30px;
    height: 30px;
    transition: 0.3s transform;
    border-radius: $border-radius-round;
    background-color: $white;
    content: '';

    .ui-toggle-switch--active & {
      transform: translateX(185px);
    }
  }

  &-label {
    display: inline-block;
    padding: 10px 40px;
    transform: translateX(10px);
    transition: color 0.6s, transform 0.3s;
    color: $gray;
    font-size: $font-size-l;
    font-weight: $font-weight-light;

    .ui-toggle-switch--active & {
      transform: translateX(-10px);
      color: $white;
    }
  }
}
</style>
