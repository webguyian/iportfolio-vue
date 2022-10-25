<template>
  <a
    v-if="external"
    :href="to"
    :class="['ui-link', icon && 'ui-link--with-icon', className]"
    target="_blank"
    rel="noopener noreferrer"
    ><slot
  /></a>
  <RouterLink
    v-else-if="back"
    v-bind="$attrs"
    :class="['ui-link', 'ui-link--back', className]"
    :to="to"
  >
    <UIIcon name="chevron-left" />
    Back
  </RouterLink>
  <RouterLink
    v-else
    v-bind="$attrs"
    :class="['ui-link', icon && 'ui-link--with-icon', className]"
    :to="to"
  >
    <UIIcon v-if="icon" :name="icon" :size="iconSize" />
    <slot v-else />
    <UIText v-if="withLabel" className="ui-link-label"><slot /></UIText>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import UIIcon from './UIIcon.vue';
import UIText from './UIText.vue';

withDefaults(
  defineProps<{
    back?: boolean;
    className?: string;
    external?: boolean;
    icon?: string;
    iconSize?: string;
    state?: object;
    to: string;
    withLabel?: boolean;
  }>(),
  {
    back: false,
    external: false,
    withLabel: false
  }
);
</script>

<style lang="scss">
.ui-link {
  color: $white;
  text-decoration: none;

  &--back {
    @include focus-outline;
    margin-right: auto;
    color: $yellow;
  }

  > .ui-icon {
    pointer-events: none;
    cursor: pointer;
  }
}
</style>
