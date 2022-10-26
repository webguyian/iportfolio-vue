<template>
  <ul class="ui-link-list">
    <li v-for="link in links" :key="link.abbr" class="ui-link-list-item">
      <UILink class="ui-link-list-item-link" :to="link.url" external>
        <div
          class="ui-link-list-item-link-icon"
          :style="{ backgroundColor: link.color }"
        >
          <abbr title="link.name">{{ link.abbr }}</abbr>
        </div>
        <UIText class="ui-link-list-item-link-label">{{ link.name }}</UIText>
      </UILink>
    </li>
  </ul>
</template>

<script setup lang="ts">
import UILink from './UILink.vue';
import UIText from './UIText.vue';

type Link = {
  abbr: string;
  name: string;
  color: string;
  url: string;
};

defineProps<{
  links: Array<Link>;
}>();
</script>

<style lang="scss">
.ui-link-list {
  @include unstyled-list;
  display: grid;
  grid-gap: $gutter-s 0;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  margin-bottom: $gutter-m;

  &-item-link {
    @include focus-outline;
    display: block;
    padding: $gutter-s;
    text-align: center;

    &:hover,
    &:focus {
      .ui-link-list-item-link-icon {
        transform: scale(1.09);
      }
    }

    &-icon {
      @include circle(100px, $border-radius-m);
      @include flex-center;
      transition: transform 0.2s ease-in;

      > abbr {
        @include type-display($font-size-xl);
        text-decoration: none;
      }
    }

    &-label {
      @include type-body(12px);
      display: block;
      margin-top: $gutter-s;
    }
  }
}
</style>
