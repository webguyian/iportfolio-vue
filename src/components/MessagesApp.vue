<template>
  <div class="messages-app">
    <header class="messages-app-header">
      <UILink to="/phone">
        <UIAvatar
          alt="Profile photo of Ian Mac"
          src="https://github.com/webguyian.png?size=50"
        />
        <UIText>Ian Mac</UIText>
      </UILink>
    </header>
    <div class="messages-app-list-container" ref="container">
      <ul class="messages-app-list">
        <li
          v-for="message in messages"
          :key="message.id"
          :class="[
            messageClass,
            message.from ? messageFromClass : messageToClass
          ]"
        >
          <span class="messages-app-list-item-message">
            {{ message.message }}
          </span>
        </li>
      </ul>
    </div>
    <footer class="messages-app-footer">
      <form
        class="messages-app-form"
        @submit.prevent="onSubmit"
        autoComplete="off"
      >
        <input
          class="messages-app-form-input"
          name="message"
          placeholder="iMessage"
          type="text"
        />
        <RoundedButton icon="arrow-up" type="submit" />
      </form>
    </footer>
  </div>
</template>

<script setup lang="ts">
import RoundedButton from './RoundedButton.vue';
import UIAvatar from './UIAvatar.vue';
import UILink from './UILink.vue';
import UIText from './UIText.vue';

import { useMessages } from '@/composables/messages/hooks';

const messageClass = 'messages-app-list-item';
const messageFromClass = `${messageClass}--from`;
const messageToClass = `${messageClass}--to`;

const { container, messages, onSubmit } = useMessages();
</script>

<style lang="scss">
.messages-app {
  @include stretch-column-nowrap;
  background-color: $black-darker;

  &-header {
    @include blurred-header;
    display: flex;
    position: fixed;
    flex-direction: column;
    align-items: center;

    @include responsive($width-medium) {
      max-width: 375px;
    }

    > .ui-link {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .ui-avatar {
      position: relative;
      width: 50px;
      height: 50px;
      margin-bottom: $gutter-s;
      overflow: hidden;

      &:hover,
      &:focus {
        &::before {
          transform: translateY(0);
          background-color: $gray-medium;
          content: 'IM';
        }
      }

      &::before {
        position: absolute;
        width: 50px;
        height: 50px;
        transform: translateY(-50%);
        transition: transform 0.4s;
        border-radius: $border-radius-round;
        line-height: 3;
        content: '';
        pointer-events: none;
      }
    }

    .ui-text {
      font-size: $font-size-s;
    }
  }

  &-list-container {
    height: 100%;
    max-height: 710px;
    overflow-x: visible;
    overflow-y: auto;
    padding: $gutter;
  }

  &-list {
    @include unstyled-list;
    padding-top: 90px;

    &-item {
      display: flex;
    }
  }

  &-list-item-message {
    display: inline-block;
    position: relative;
    margin: $gutter-s 0;
    padding: $gutter-s $gutter;
    border-radius: 20px;
  }

  &-list-item--from {
    justify-content: flex-start;

    .messages-app-list-item-message {
      background-color: $ios-message-from;

      &:last-child {
        &::before,
        &::after {
          position: absolute;
          bottom: 0;
          height: 20px;
          content: '';
        }

        &::before {
          z-index: 0;
          left: -7px;
          width: 20px;
          border-bottom-right-radius: 15px;
          background: $ios-message-from;
        }

        &::after {
          z-index: 1;
          left: -10px;
          width: 10px;
          border-bottom-right-radius: 10px;
          background-color: $black;
        }
      }
    }
  }

  &-list-item--to {
    justify-content: flex-end;

    .messages-app-list-item-message {
      background: $ios-message-to;
      background-attachment: fixed;

      &:last-child {
        &::before,
        &::after {
          position: absolute;
          bottom: 0;
          height: 20px;
          content: '';
        }

        &::before {
          z-index: 0;
          right: -8px;
          width: 20px;
          border-bottom-left-radius: 15px;
          background: $ios-message-to;
          background-attachment: fixed;
        }

        &::after {
          z-index: 1;
          right: -10px;
          width: 10px;
          border-bottom-left-radius: 10px;
          background-color: $black;
        }
      }
    }
  }

  &-footer {
    margin-top: auto;
  }

  &-form {
    display: flex;
    position: relative;
    justify-content: center;
    width: 100%;

    &-input {
      @include no-outline;
      @include type-body;
      width: 100%;
      min-height: 40px;
      margin-bottom: 16px;
      padding: 8px 40px 8px 16px;
      border: 1px solid $gray-medium;
      border-radius: 20px;
      background-color: $black;
      color: $white;

      &:focus {
        border-color: $blue;
      }
    }

    > .ui-btn {
      position: absolute;
      top: 0;
      right: 0;
      width: 30px;
      height: 30px;
      background: $ios-message-to;
      font-size: 16px;
    }
  }
}
</style>
