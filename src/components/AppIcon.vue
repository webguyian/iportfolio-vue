<template>
  <div :class="[baseClass, nameClass]">
    <UIText v-if="noLink" :style="style" className="ui-app-icon-link"
      ><slot
    /></UIText>
    <RouterLink v-else :to="id || nameId" class="ui-app-icon-link"
      ><slot
    /></RouterLink>
    <UIText v-if="!noLabel" className="ui-app-icon-label">{{ name }}</UIText>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import UIText from './UIText.vue';

const kebabCase = (str: string) =>
  str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();

const props = withDefaults(
  defineProps<{
    color?: string;
    id?: string;
    name: string;
    noLabel?: boolean;
    noLink?: boolean;
    theme?: string;
  }>(),
  {
    noLabel: false,
    noLink: false
  }
);

const baseClass = 'ui-app-icon';
const nameId = kebabCase(props.name);
const nameClass = `${baseClass}--${nameId}`;
const style = props.color ? { backgroundColor: props.color } : undefined;
</script>

<style lang="scss">
$size: 65px;

.ui-app-icon {
  display: flex;
  position: relative;
  flex-flow: column nowrap;
  flex-shrink: 0;
  align-items: center;
  text-align: center;

  &-link {
    @include type-body($font-size-s);
    width: $size;
    height: $size;
    margin-bottom: 5px;
    border-radius: 25%;
    background-color: $white;
    color: $black-dark;
    text-align: center;
    overflow: hidden;
  }

  &-label {
    @include type-body;
    width: $size + 3px;
    color: $white;
    font-size: $font-size-xs;
  }

  &-weekday,
  &-day {
    display: block;
  }

  &-weekday {
    margin-top: 6px;
    color: $red;
    font-size: $font-size-s;
  }

  &-day {
    font-size: $font-size-xl;
    font-weight: $font-weight-light;
    line-height: 1;
  }

  &--clock {
    > .ui-app-icon-link {
      padding-top: 3px;
      background-color: $black;
    }
  }

  &--stocks {
    > .ui-app-icon-link {
      background-color: $black;
    }
  }

  &--safari {
    > .ui-app-icon-link {
      padding: 3px;
    }
  }

  &--google-maps {
    > .ui-app-icon-link {
      padding-top: 3px;

      > svg {
        width: 55px;
        margin-top: 2px;
      }
    }
  }

  &--music {
    svg {
      width: 60%;
      transform: translate(-2px, 10px);
    }
  }

  &--camera {
    > .ui-app-icon-link {
      background-color: #bec2c7;

      > svg {
        width: 110%;
        transform: translate(-3px, -5px);
      }
    }
  }

  &--mail {
    > .ui-app-icon-link {
      background-color: $black;

      > svg {
        width: 100%;
      }
    }
  }
}
</style>
