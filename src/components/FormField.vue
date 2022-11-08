<template>
  <div v-if="type === 'textarea'" class="ui-form-field">
    <textarea
      class="ui-form-field-textarea"
      :id="id"
      :value="modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)
      "
      v-bind="$attrs"
    ></textarea>
  </div>
  <div v-else class="ui-form-field">
    <label v-if="label" class="ui-form-field-label" :for="id">{{
      label
    }}</label>
    <input
      class="ui-form-field-input"
      :id="id"
      :type="type"
      :disabled="disabled"
      :value="modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      v-bind="$attrs"
      autocomplete="off"
    />
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    disabled?: boolean;
    id: string;
    label?: string;
    type?: string;
    modelValue?: string;
  }>(),
  {
    disabled: false,
    type: 'text'
  }
);
defineEmits(['update:modelValue']);
</script>

<style lang="scss">
.ui-form-field {
  display: flex;
  padding: 8px;

  &-label,
  &-input,
  &-textarea {
    @include type-body;
    @include focus-outline;
    color: $white;
  }

  &-label {
    margin-right: 8px;
  }

  &-input,
  &-textarea {
    width: 100%;
    border: 0;
    background: none;
    appearance: none;
  }

  &-textarea {
    resize: none;
  }
}
</style>
