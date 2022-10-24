<template>
  <component
    :is="element"
    :class="[
      'ui-text',
      `ui-text--${type}`,
      modifier && `ui-text--${modifier}`,
      className
    ]"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    className?: string;
    element?: string;
    modifier?: 'anchor' | 'anchor-block' | 'block' | 'bold' | 'light';
    type?: 'accessible' | 'body' | 'display';
  }>(),
  {
    element: 'span',
    type: 'body'
  }
);
</script>

<style lang="scss">
.ui-text {
  &--accessible {
    @include accessibly-hidden;
  }

  &--body {
    @include type-body;
    margin: 0;
  }

  &--display {
    @include type-display;
    display: block;
    margin: 0;
  }

  &--block {
    display: block;
    width: 100%;
  }

  &--bold {
    font-weight: $font-weight-bold;
  }

  &--light {
    font-weight: $font-weight-light;
  }

  &--loading {
    font-size: $font-size-l;
    text-align: center;
    animation: fade-in-out 2s linear infinite;
  }
}

@keyframes fade-in-out {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0.2;
  }
}
</style>
