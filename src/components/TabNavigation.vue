<template>
  <RouterView />
  <nav v-if="showNav" class="ui-tab-navigation">
    <ul class="ui-tab-navigation-list">
      <li
        v-for="tab in tabs"
        :key="tab.icon"
        class="ui-tab-navigation-list-item"
      >
        <RouterLink
          :to="tab.path"
          class="ui-link ui-tab-navigation-link"
          active-class="ui-tab-navigation-link--active"
        >
          <UIIcon :name="tab.icon" size="3x" />
          <UIText class="ui-tab-navigation-link-label">
            {{ tab.label }}
          </UIText>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import UIIcon from './UIIcon.vue';
import UILink from './UILink.vue';
import UIText from './UIText.vue';

type Tab = {
  icon: string;
  label: string;
  path: string;
};

withDefaults(
  defineProps<{
    showNav?: boolean;
    tabs: Array<Tab>;
  }>(),
  {
    showNav: true
  }
);
</script>

<style lang="scss">
.ui-tab-navigation {
  width: 100%;
  margin-top: auto;

  &-list {
    display: flex;
    margin: 0;
    padding: 0 $gutter;
    background-color: $black-dark;
    list-style: none;

    &-item {
      width: 100%;
      margin-bottom: $gutter-xs;
    }
  }

  &-link {
    @include no-outline;
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    width: 100%;
    padding: 10px;
    font-size: $font-size-xs;

    > .ui-icon {
      color: $gray;
    }

    &-label {
      @include type-body-bold($gray, $font-size-xs);
      margin-top: $gutter-xs;
    }

    &--active {
      > .ui-icon,
      > .ui-tab-navigation-link-label {
        color: $yellow;
      }
    }
  }
}
</style>
