<script setup>
import AlertBox from "./AlertBox.vue";
defineProps(["alert"]);
</script>
<template>
  <form
    class="-mt-8 lg:-mt-12 lg:w-1/2 mx-auto flex flex-col items-center justify-center space-y-4"
  >
    <slot></slot>
    <AlertBox v-if="alert">{{ alert }}</AlertBox>
    <div class="field-wrapper flex flex-col pb-8 pt-5 space-y-5 sm:pb-12">
      <slot name="formBtn"></slot>
    </div>
  </form>
</template>
