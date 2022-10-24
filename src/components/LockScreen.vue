<template>
  <div class="iportfolio-lockscreen">
    <header class="iportfolio-lockscreen-header">
      <UIIcon name="lock" size="2x" />
      <UIText className="ui-clock" element="h1"><DateTime /></UIText>
      <UIText className="ui-date" element="h2">
        <DateTime format="EEEE, MMMM d" />
      </UIText>
    </header>
  </div>
</template>

<script setup lang="ts">
import DateTime from './DateTime.vue';
import UIIcon from './UIIcon.vue';
import UIText from './UIText.vue';
</script>

<style lang="scss">
.iportfolio-lockscreen {
  @include flex-column;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  padding-bottom: 50px;
  transition: 0.4s transform cubic-bezier(0.25, 0.46, 0.45, 0.94);
  background: linear-gradient(
    320deg,
    #cdee23 0%,
    #74bf82 40%,
    $blue-light 60%,
    #0056ff 100%
  );

  &--unlocked {
    transform: translateX(110%);
  }

  &-header {
    display: flex;
    flex-flow: column wrap;
    margin-top: $gutter-l;

    .ui-clock {
      @include type-number;
      margin: 0;
    }

    .ui-date {
      margin-top: 0;
      font-size: $font-size-l;
      font-weight: $font-weight-light;
    }
  }
}
</style>
