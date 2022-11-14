<template>
  <div class="camera-filters">
    <UIText class="camera-filter-label" type="display">
      {{ activeFilter }}
    </UIText>
    <svg xmlns="http://www.w3.org/2000/svg" style="display: none">
      <filter id="svgThreshold">
        <feComponentTransfer>
          <feFuncR type="discrete" tableValues=" 0 1 1 1" />
          <feFuncG type="discrete" tableValues=" 0 1 1 1" />
          <feFuncB type="discrete" tableValues=" 0 1 1 1" />
        </feComponentTransfer>
      </filter>
      <filter id="svgSharpen">
        <feConvolveMatrix
          order="3 3"
          preserveAlpha="true"
          divisor="1"
          bias="0"
          kernelMatrix="-1,-1,-1 -1,9,-1 -1,-1,-1"
        />
      </filter>
    </svg>
    <div class="camera-filter-list">
      <UIButton
        v-for="filter in filters"
        :key="filter.label"
        :class="[
          'camera-filter',
          filter.label === activeFilter && 'camera-filter--active'
        ]"
        :aria-label="filter.label"
        @click="$emit('update:filter', filter)"
      >
        <canvas
          :id="`canvas-${toKebabCase(filter.label)}`"
          class="camera-filter-canvas"
          width="75"
          height="75"
        />
      </UIButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import UIButton from './UIButton.vue';
import UIText from './UIText.vue';
import { toKebabCase } from '@/composables/browser/helpers';
import type { CameraFilter } from '@/composables/camera/types';

defineEmits(['update:filter']);

defineProps<{
  activeFilter: string;
  filters: Array<CameraFilter>;
}>();
</script>

<style lang="scss">
.camera-filters {
  display: flex;
  flex-flow: column nowrap;
  transform: translateY(-5px);

  .camera-filter-list {
    display: flex;
    flex-flow: row nowrap;
    padding-bottom: $gutter;
    padding-left: 145px;
    overflow-x: auto;
    overflow-y: hidden;
  }

  .camera-filter {
    margin-left: $gutter;
    border: 2px solid transparent;

    &--active {
      border-color: $white;
    }

    &-label {
      margin: $gutter-s auto $gutter;
      font-size: $font-size-s;
      text-transform: uppercase;
    }
  }
}
</style>
