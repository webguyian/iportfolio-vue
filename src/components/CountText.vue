<script setup lang="ts">
import { useSlots } from 'vue';
import UIText from './UIText.vue';

defineProps<{
  count: number;
  emptyLabel?: string;
}>();

const slots = useSlots();
const [slot] = slots.default ? slots.default() : [];
const children = String(slot && slot.children);
const label = children.slice(0, children.length - 1);
</script>

<template>
  <UIText v-if="count === 1" element="p"> {{ count }} {{ label }} </UIText>
  <UIText v-else element="p">
    {{ count || emptyLabel }}
    <slot />
  </UIText>
</template>
