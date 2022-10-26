<template>
  <div class="safari-app" :class="hasSearch && 'safari-app--with-search'">
    <div class="safari-app-content">
      <SearchField
        placeholder="Search or enter website name"
        :value="inputValue"
        @blur="actions.focus"
        @click="actions.cancel"
        @input="actions.change"
        @focus="actions.focus"
        @submit="actions.submit"
      />
      <UIText element="h1" type="display">Favorites</UIText>
      <LinkList :links="favorites" />
      <UIText element="h2" type="display">Frequently Visited</UIText>
      <LinkList :links="frequents" />
    </div>
  </div>
</template>

<script setup lang="ts">
import LinkList from './LinkList.vue';
import SearchField from './SearchField.vue';
import UIText from './UIText.vue';
import { favorites, frequents } from '@/composables/safari/constants';
import { useWebSearch } from '@/composables/safari/hooks';

const { actions, hasSearch, inputValue } = useWebSearch();
</script>

<style lang="scss">
.safari-app {
  position: relative;
  padding-top: $gutter-l;

  .ui-search-field {
    position: absolute;
    top: 0;
    width: 359px;
    margin: $gutter 0 0;

    > .ui-icon-search {
      left: 30px;
    }

    &-input {
      text-align: center;
    }
  }

  &-content {
    padding: $gutter;
    text-align: left;

    > .ui-text--display {
      margin-bottom: $gutter;
      font-size: $font-size-l;
    }
  }

  &--with-search {
    .ui-search-field {
      > .ui-icon-search {
        display: none;
      }

      &-input {
        padding-left: $gutter;
        text-align: left;
      }

      > .ui-btn--anchor {
        display: block;
      }
    }
  }
}
</style>
