<template>
  <line
    :class="className"
    :x1="x1"
    :x2="x2"
    :y1="y1"
    :y2="length"
    :transform="`rotate(${angle} ${width} ${width})`"
  />
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    angle: number;
    className: string;
    x1?: number;
    x2?: number;
    y1?: number;
    length?: number;
    width?: number;
  }>(),
  {
    x1: 30,
    x2: 30,
    y1: 30,
    length: 60,
    width: 30
  }
);
</script>
