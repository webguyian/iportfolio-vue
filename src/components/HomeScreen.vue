<template>
  <div className="iportfolio-homescreen">
    <div className="iportfolio-grid">
      <AppIcon name="Camera">
        <CameraIcon />
      </AppIcon>
      <AppIcon name="Photos">
        <PhotosIcon />
      </AppIcon>
      <AppIcon name="Music">
        <MusicIcon />
      </AppIcon>
      <AppIcon name="Reminders">
        <RemindersIcon />
      </AppIcon>
      <AppIcon name="Notes"><NotesIcon /></AppIcon>
      <AppIcon id="map" name="Google Maps" theme="light">
        <MapIcon />
      </AppIcon>
      <AppIcon name="Weather"><WeatherIcon /></AppIcon>
      <AppIcon name="Stocks"><StocksIcon /></AppIcon>
      <AppIcon name="Calculator">
        <CalculatorIcon />
      </AppIcon>
      <AppIcon name="Settings">
        <SettingsIcon />
      </AppIcon>
    </div>
    <div className="iportfolio-dock">
      <AppIcon name="phone" noLabel theme="black-dark">
        <PhoneIcon />
      </AppIcon>
      <AppIcon name="safari" noLabel>
        <SafariIcon />
      </AppIcon>
      <AppIcon name="mail" noLabel>
        <MailIcon />
      </AppIcon>
      <AppIcon name="messages" noLabel theme="faded-dark">
        <MessagesIcon />
      </AppIcon>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppIcon from './AppIcon.vue';
import CalculatorIcon from './icons/CalculatorIcon.vue';
import CameraIcon from './icons/CameraIcon.vue';
import MailIcon from './icons/MailIcon.vue';
import MapIcon from './icons/MapIcon.vue';
import MessagesIcon from './icons/MessagesIcon.vue';
import MusicIcon from './icons/MusicIcon.vue';
import NotesIcon from './icons/NotesIcon.vue';
import PhoneIcon from './icons/PhoneIcon.vue';
import PhotosIcon from './icons/PhotosIcon.vue';
import RemindersIcon from './icons/RemindersIcon.vue';
import SafariIcon from './icons/SafariIcon.vue';
import SettingsIcon from './icons/SettingsIcon.vue';
import StocksIcon from './icons/StocksIcon.vue';
import WeatherIcon from './icons/WeatherIcon.vue';
</script>

<style lang="scss">
.iportfolio-homescreen {
  @include background-carbon-fibre;
  @include stretch-column-nowrap;
}

.iportfolio-grid {
  @include grid-icons;
  grid-template-rows: repeat(auto-fill, minmax(85px, 1fr));
  margin-top: $gutter-l;
  padding: 0 20px;
}

.iportfolio-dock {
  @include grid-icons(4);
  width: 350px;
  margin: auto auto 20px;
  padding: 10px;
  border-radius: 30px;
  background-color: rgba($black, 0.75);

  > .ui-app-icon-link {
    margin-bottom: 0;
  }
}
</style>
