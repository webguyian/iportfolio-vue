<template>
  <div class="iportfolio-app-device device device-iphone-x device-black">
    <div class="device-frame">
      <div class="device-content">
        <div class="device-header-container">
          <div class="device-header-bars">
            <div
              class="device-header-bars-block device-header-bars-block--time"
            >
              IMAC
            </div>
            <div
              class="device-header-bars-block device-header-bars-block--icons"
            >
              <UIIcon name="signal" />
              <UIIcon name="wifi" />
              <UIIcon name="battery-full" />
            </div>
          </div>
        </div>
        <slot />
      </div>
    </div>
    <div class="device-stripe" />
    <div class="device-header" />
    <div class="device-sensors" />
    <div class="device-btns" />
    <div class="device-power" />
  </div>
</template>

<script setup lang="ts">
import UIIcon from './UIIcon.vue';
</script>

<style lang="scss" scoped>
.iportfolio-app-device {
  height: 100%;
  margin: 0 auto;

  .device-frame,
  .device-header {
    background-color: $black-darker;
  }

  .device-header {
    z-index: 2;

    &::after {
      background: radial-gradient(
        circle at bottom left,
        transparent 0,
        transparent 75%,
        $black-darker 75%,
        $black-darker 100%
      );
    }

    &::before {
      background: radial-gradient(
        circle at bottom right,
        transparent 0,
        transparent 75%,
        $black-darker 75%,
        $black-darker 100%
      );
    }
  }

  .device-content {
    height: 100%;
    background-color: $black-darker;
    overflow: hidden;
  }

  .device-header-container {
    position: absolute;
    left: 5%;
    width: 90%;
    margin: 0 auto;
  }

  .device-header-bars {
    display: flex;
    z-index: 3;
    position: relative;
    justify-content: space-between;
    width: 100%;
    margin-right: auto;
    margin-left: auto;

    &-block {
      display: flex;
      justify-content: space-between;
      width: 60px;
      margin-top: 10px;

      &--time {
        justify-content: center;
      }

      &--icons {
        margin-right: 3px;
      }
    }

    .ui-icon {
      color: $white;
      font-size: $font-size-s;
    }
  }

  .device-time-label {
    display: flex;

    > .ui-btn {
      margin-left: 6px;
      transform: translateY(-1px);
    }
  }
}

// THEMES =======================================
.iportfolio-app-device--black-dark {
  .device-content {
    background-color: $black-dark;
  }
}

.iportfolio-app-device--faded-dark {
  .device-content {
    background-color: rgba($black-dark, 0.85);
  }
}

.iportfolio-app-device--light {
  .device-header-bars {
    color: $black-darker;

    .ui-icon {
      color: $black-darker;
    }
  }
}
</style>
