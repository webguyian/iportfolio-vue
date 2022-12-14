<template>
  <div class="phone-app">
    <header>
      <figure class="phone-app-image">
        <UIFlip>
          <template v-slot:back>
            <UIAvatar alt="Ian Mac" text="IM" />
          </template>
          <UIAvatar
            alt="Ian Mac"
            src="https://github.com/webguyian.png?size=150"
          />
        </UIFlip>
        <figcaption class="phone-app-image-caption">
          <UIText element="h1">Ian Mac</UIText>
        </figcaption>
      </figure>
      <ul class="phone-app-actions">
        <li v-for="action in actions" :key="action.icon">
          <UILink
            :to="action.to"
            :external="action.external"
            :icon="action.icon"
            icon-size="lg"
            withLabel
            >{{ action.label }}</UILink
          >
        </li>
      </ul>
    </header>
    <div class="phone-app-info">
      <div v-for="link in links" :key="link.label" class="phone-app-info-row">
        <UIText class="phone-app-info-label" element="h2">{{
          link.label
        }}</UIText>
        <UILink
          class="phone-app-info-value"
          :to="link.to"
          :data-hover="link.value"
          external
          >{{ link.value }}</UILink
        >
      </div>
      <div class="phone-app-info-row">
        <UIText class="phone-app-info-label" element="h2">Location</UIText>
        <UILink
          to="map"
          class="phone-app-info-map-link"
          :state="{ theme: 'light', center: COORDINATES_PHILADELPHIA }"
        >
          <UIText class="phone-app-info-map-link-text" element="h2">
            <UIIcon name="map-marker-alt" /> View Map
          </UIText>
          <img alt="Philadelphia, PA" :src="STATIC_MAP_API" />
        </UILink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UIAvatar from './UIAvatar.vue';
import UIFlip from './UIFlip.vue';
import UIIcon from './UIIcon.vue';
import UILink from './UILink.vue';
import UIText from './UIText.vue';
import {
  COORDINATES_PHILADELPHIA,
  STATIC_MAP_API
} from '@/composables/map/constants';

const actions = [
  {
    to: '/messages',
    icon: 'comment',
    label: 'message',
    external: false
  },
  {
    to: 'tel:+12013053245',
    icon: 'phone-alt',
    label: 'call',
    external: true
  },
  {
    to: '/mail',
    icon: 'envelope',
    label: 'mail',
    external: false
  }
];

const links = [
  {
    label: 'Email',
    to: 'mailto:hello@webguyian.com',
    value: 'hello@webguyian.com'
  },
  {
    label: 'Website',
    to: 'https://webguyian.com',
    value: 'webguyian.com'
  },
  {
    label: 'Github',
    to: 'https://github.com/webguyian',
    value: 'github.com/webguyian'
  }
];
</script>

<style lang="scss">
.phone-app {
  @include stretch-column-nowrap;
  align-items: center;
  padding: $gutter;
  background-color: $black-dark;

  &-image {
    margin: 0 auto $gutter-m;
    text-align: center;

    &-caption {
      margin-top: $gutter-s;

      > .ui-text {
        margin: 0;
        font-size: $font-size-l;
      }
    }
  }

  &-actions {
    @include unstyled-list;
    display: flex;

    .ui-link--with-icon,
    .ui-icon {
      display: flex;
      flex-flow: column wrap;
      align-items: center;
      justify-content: center;
    }

    .ui-link--with-icon {
      min-width: 55px;
      margin: 0 $gutter;
      transition: color 0.4s ease-in;
      color: $white;

      > .ui-icon {
        @include circle(44px);
        transition: background-color 0.4s ease-in;
        background-color: $blue;
        line-height: 1.65;
      }

      > .ui-link-label {
        margin: $gutter-s 0 0;
        transition: color 0.4s ease-in;
        color: $blue;
        font-size: $font-size-s;
      }

      &:hover,
      &:focus {
        color: $blue;

        > .ui-icon {
          background-color: $white;
        }

        > .ui-link-label {
          color: $white;
        }
      }
    }
  }

  &-info {
    width: 100%;
    height: 100%;
    padding: $gutter 0;
    overflow-y: auto;

    &-row {
      padding: $gutter $gutter-s;
      border-top: 1px solid $gray-medium;
    }

    &-label {
      margin-bottom: $gutter-xs;
    }

    &-value {
      position: relative;
      transition: color 0.4s ease-in;
      color: $blue;

      &::before {
        position: absolute;
        left: 0;
        width: 100%;
        transition: width 0.4s;
        color: $white;
        white-space: nowrap;
        content: attr(data-hover);
        overflow: hidden;

        @include responsive($width-medium) {
          width: 0;
        }
      }

      &:hover,
      &:focus {
        &::before {
          width: 100%;
        }
      }
    }

    &-map-link {
      display: block;
      position: relative;
      max-height: 100%;

      > img {
        width: 100%;
      }

      &-text {
        @include type-body($font-size-l);
        display: flex;
        position: absolute;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        transition: opacity 0.8s ease-in;
        text-align: center;
        opacity: 1;

        @include responsive($width-medium) {
          opacity: 0;
        }

        > .ui-icon {
          margin-right: $gutter-s;
        }
      }

      &::before {
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        transition: width 0.8s;
        background-color: rgba($black, 0.75);
        content: '';

        @include responsive($width-medium) {
          width: 0;
          background-color: transparent;
        }
      }

      &:hover,
      &:focus {
        .phone-app-info-map-link-text {
          opacity: 1;
        }

        &::before {
          width: 330px;
          background-color: rgba($black, 0.75);
        }
      }
    }
  }
}
</style>
