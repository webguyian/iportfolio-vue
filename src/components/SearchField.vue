<template>
  <form class="ui-search-field" @submit="$attrs.onSubmit">
    <UIIcon name="search" />
    <input
      class="ui-search-field-input"
      type="text"
      :aria-label="placeholder"
      :placeholder="placeholder"
      :value="$attrs.value"
      @blur="$attrs.onBlur"
      @focus="$attrs.onFocus"
      @input="$attrs.onInput"
    />
    <UIButton modifier="anchor" type="reset" @click="$attrs.onClick"
      >Cancel</UIButton
    >
  </form>
</template>

<script setup lang="ts">
import UIButton from './UIButton.vue';
import UIIcon from './UIIcon.vue';

withDefaults(
  defineProps<{
    placeholder?: string;
  }>(),
  {
    placeholder: 'Search'
  }
);
</script>

<script lang="ts">
export default {
  inheritAttrs: false
};
</script>

<style lang="scss">
.ui-search-field {
  display: flex;
  position: relative;
  justify-content: space-between;
  min-height: 30px;
  margin: $gutter-s $gutter-s 0;

  > .ui-icon-search {
    position: absolute;
    left: 0;
    padding: 7px $gutter-s;
    color: $gray;
  }

  &-input {
    @include focus-outline;
    @include type-body($font-weight: $font-weight-light);
    flex: 1;
    min-height: 30px;
    padding: 4px $gutter 4px 30px;
    border: 0;
    border-radius: $border-radius-m;
    background-color: $black-dark;
    color: $white;
    letter-spacing: 0.025em;

    &::placeholder {
      color: $gray;
    }
  }

  > .ui-btn--anchor {
    display: none; // Hidden by default
  }
}
</style>
