<template>
  <div class="reminders-app">
    <UIText element="h1" type="display">Reminders</UIText>
    <ul v-if="reminders.length" class="reminders-app-list">
      <li v-for="reminder in reminders" :key="reminder.id">
        <ReminderItem
          :id="reminder.id"
          :checked="reminder.checked"
          :focused="focusedId === reminder.id"
          :value="reminder.value"
          @remove="actions.remove"
          @submit="actions.add"
          @update="actions.update"
        />
      </li>
    </ul>
    <UIText v-else element="p">No Reminders</UIText>
    <UIButton icon="plus-circle" withLabel @click="actions.add"
      >New Reminder</UIButton
    >
  </div>
</template>

<script setup lang="ts">
import ReminderItem from './ReminderItem.vue';
import UIButton from './UIButton.vue';
import UIText from './UIText.vue';
import { useReminders } from '@/composables/reminders/hooks';

const { actions, focusedId, reminders } = useReminders();
</script>

<style lang="scss">
.reminders-app {
  @include stretch-column;

  &-list {
    @include unstyled-list;
    overflow-x: hidden;
    overflow-y: auto;
    max-height: 650px;
  }

  > .ui-text--display {
    @include type-title($orange);
  }

  > .ui-text--body {
    margin: 0;
    color: $gray-medium;
    text-align: center;
  }

  > .ui-btn--with-icon {
    align-self: flex-start;
    margin: auto $gutter-m $gutter $gutter;
    color: $orange;
    font-size: $font-size-m;
    font-weight: $font-weight-bold;
  }

  > .ui-text--body,
  > .ui-btn--with-icon {
    margin-top: auto;
  }
}
</style>
