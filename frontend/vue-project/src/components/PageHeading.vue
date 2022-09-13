<script setup>
defineProps({
  alignment: { type: String, required: false, default: "center" },
});
</script>
<template>
  <h1
    class="text-4xl text-indigo-100 text-neon-light leading-10 font-extrabold sm:leading-none md:text-5xl mt-4 lg:mt-12"
    :class="`text-${alignment}`"
  >
    <slot></slot>
  </h1>
</template>
