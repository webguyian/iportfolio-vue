<template>
  <button
    :class="[
      baseClass,
      icon && `${baseClass}--with-icon`,
      modifier && `${baseClass}--${modifier}`
    ]"
    :type="type"
    v-bind="$attrs"
  >
    <UIIcon v-if="icon" :name="icon" :size="size" />
    <slot v-else />
    <UIText v-if="withLabel" class="ui-btn-label"><slot /></UIText>
    <UIText v-if="icon && !withLabel" type="accessible"><slot /></UIText>
  </button>
</template>

<script setup lang="ts">
import UIIcon from '@/components/UIIcon.vue';
import UIText from '@/components/UIText.vue';

const baseClass = 'ui-btn';

withDefaults(
  defineProps<{
    icon?: string;
    modifier?: 'anchor' | 'anchor-block';
    size?: string;
    type?: 'button' | 'reset' | 'submit';
    withLabel?: boolean;
  }>(),
  {
    type: 'button',
    withLabel: false
  }
);
</script>

<style lang="scss">
.ui-btn {
  @include focus-outline;
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;

  &[disabled] {
    cursor: default;
  }

  > .ui-icon {
    pointer-events: none;
    cursor: pointer;
  }

  &--anchor,
  &--anchor-block {
    @include type-body;
    padding: 4px 8px;
    color: $blue-light;
  }

  &--anchor-block {
    display: block;
    width: 100%;
    padding: 12px;
    text-align: center;
  }

  &--rounded {
    @include type-number($font-size-l);
    width: 90px;
    height: 90px;
    margin: 5px;
    padding: 10px;
    border-radius: $border-radius-round;
    background: $gray-medium;
  }

  &--with-icon {
    @include flex-center;
    padding: 2px;

    > .ui-btn-label {
      margin-left: $gutter-s;
    }
  }

  &-label {
    margin-left: 10px;
  }
}
</style>
