<template>
  <a
    v-if="external"
    v-bind="$attrs"
    :href="typeof to === 'string' ? to : undefined"
    :class="['ui-link', icon && 'ui-link--with-icon']"
    target="_blank"
    rel="noopener noreferrer"
  >
    <UIIcon v-if="icon" :name="icon" :size="iconSize" /> <slot v-else />
    <UIText v-if="withLabel" class="ui-link-label"><slot /></UIText>
  </a>
  <a
    v-else-if="back"
    v-bind="$attrs"
    :class="['ui-link', 'ui-link--back']"
    @click="router.go(-1)"
  >
    <UIIcon name="chevron-left" />
    Back
  </a>
  <RouterLink
    v-else
    v-bind="$attrs"
    :class="['ui-link', icon && 'ui-link--with-icon']"
    :to="state ? { name: to, state: { ...state } } : to"
  >
    <UIIcon v-if="icon" :name="icon" :size="iconSize" />
    <slot v-else />
    <UIText v-if="withLabel" class="ui-link-label"><slot /></UIText>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';
import UIIcon from './UIIcon.vue';
import UIText from './UIText.vue';

withDefaults(
  defineProps<{
    back?: boolean;
    external?: boolean;
    icon?: string;
    iconSize?: string;
    state?: object;
    to: string | object;
    withLabel?: boolean;
  }>(),
  {
    back: false,
    external: false,
    withLabel: false
  }
);

const router = useRouter();
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
