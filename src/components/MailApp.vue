<template>
  <form class="mail-app" @submit.prevent="actions.onSubmit">
    <div v-if="state.showControls" class="mail-app-overlay"></div>
    <UIButton class="mail-app-drag-handle" aria-labelledby="mail-app">
      <UIText type="accessible">Drag down to close</UIText>
    </UIButton>
    <div class="mail-app-top-bar">
      <UILink to="/home">
        <span @click="actions.onCancel">Cancel</span>
      </UILink>
    </div>
    <div class="mail-app-header">
      <div class="mail-app-header-title">
        <UIText type="display" size="l">{{ title }}</UIText>
        <UIButton
          :disabled="state.invalid"
          icon="arrow-up"
          size="2x"
          type="submit"
        >
          Send
        </UIButton>
      </div>
      <div class="mail-app-header-fields">
        <FormField id="to" label="To:" :value="fields.to" disabled />
        <FormField
          id="from"
          label="From:"
          v-model="fields.from"
          placeholder="your@email.com"
          type="email"
        />
        <FormField
          id="subject"
          label="Subject:"
          v-model="fields.subject"
          maxlength="35"
        />
      </div>
    </div>
    <FormField
      class="mail-app-body"
      id="body"
      type="textarea"
      v-model="fields.body"
      @focus="handleFocus"
    />
    <div v-if="fields.attachment" class="mail-app-attachment">
      <img
        class="mail-app-attachment-image"
        :src="fields.attachment"
        alt="Attached image"
      />
    </div>
    <div
      v-show="state.showControls"
      class="mail-app-controls"
      :class="state.showControls && 'mail-app-controls--show'"
    >
      <UIButton modifier="anchor-block" @click="actions.onDelete"
        >Delete Draft</UIButton
      >
      <UILink class="ui-btn--anchor-block" to="/home" @click="actions.onSave"
        >Save Draft</UILink
      >
      <UIButton modifier="anchor-block" @click="actions.onConfirmCancel"
        >Cancel</UIButton
      >
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import FormField from './FormField.vue';
import UIButton from './UIButton.vue';
import UILink from './UILink.vue';
import UIText from './UIText.vue';
import { useMail } from '@/composables/mail/hooks';

const { actions, fields, state } = useMail(window.history.state);
const title = computed(() => fields.subject || 'New Message');
const handleFocus = (event: Event) => {
  const target = event.target as HTMLTextAreaElement;

  target.setSelectionRange(0, 0);
};
</script>

<style lang="scss">
.mail-app {
  @include stretch-column-nowrap;
  position: relative;
  margin-top: $gutter;
  transition: transform 0.4s;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: $black-dark;
  text-align: left;

  &-drag-handle {
    display: block;
    width: 40px;
    margin: $gutter-s auto;
    padding: 3px;
    border-radius: $border-radius-m;
    background-color: $gray-medium;
  }

  &-top-bar {
    padding: 0 $gutter;

    > .ui-link {
      color: $blue;
    }
  }

  &-header {
    padding: $gutter 0 8px $gutter;
    user-select: none;

    &-title {
      display: flex;
      justify-content: space-between;
      margin-bottom: $gutter;

      > .ui-text--display {
        word-break: break-word;
      }

      > .ui-btn--with-icon {
        @include circle(36px);
        flex-shrink: 0;
        margin-right: $gutter;
        background-color: $blue;

        &[disabled] {
          background-color: $gray-medium;
          color: $black-dark;
          cursor: default;
        }
      }
    }

    .ui-form-field {
      padding-left: 0;
      border-bottom: 1px solid $gray-dark;

      &-label {
        color: $gray;
      }

      &-input[disabled] {
        color: $blue;
      }
    }
  }

  &-body {
    height: 100%;
    min-height: 100px;
    max-height: 515px;
    overflow-y: auto;
  }

  &-attachment {
    @include flex-center;
  }

  &-attachment-image {
    max-width: 350px;
  }

  &-overlay {
    position: fixed;
    width: 375px;
    height: 760px;
    background: linear-gradient(
      180deg,
      rgba($black-dark, 0.8) 55%,
      rgba($black-dark, 0.5) 95%,
      rgba($black-dark, 0) 100%
    );
  }

  &-controls {
    width: 100%;
    padding: 0 8px;
    transform: translateY(calc(100% + 10px));
    transition: transform 0.4s;

    &--show {
      transform: translateY(-30px);
    }

    > .ui-btn--anchor-block {
      transition: background-color 0.2s;
      background-color: $gray-dark;
      color: $blue;

      &:hover,
      &:focus {
        background-color: darken($gray-dark, 2%);
      }

      &:first-child {
        border-bottom: 1px solid $black-dark;
        border-top-left-radius: $border-radius-l;
        border-top-right-radius: $border-radius-l;
        color: $red;
      }

      &:nth-child(2) {
        border-bottom-left-radius: $border-radius-l;
        border-bottom-right-radius: $border-radius-l;
      }

      &:last-child {
        margin-top: 8px;
        border-radius: $border-radius-l;
      }
    }
  }
}

@keyframes slide-up {
  from {
    transform: translateY(100%);
  }

  to {
    transform: translateY(500px);
  }
}
</style>
