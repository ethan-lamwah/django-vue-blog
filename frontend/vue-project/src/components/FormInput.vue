<script setup>
defineProps({
  modelValue: String,
});
defineEmits(["update:modelValue"]);
</script>
<template>
  <div class="field-wrapper">
    <label :for="$attrs['name']" class="sr-only">{{
      $attrs["placeholder"]
    }}</label>
    <input
      class="form-input"
      v-bind="$attrs"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>
<script>
export default {
  inheritAttrs: false,
};
</script>
