<script setup>
import { RouterView } from "vue-router";
import SiteHeader from "./components/SiteHeader.vue";
import SiteFooter from "./components/SiteFooter.vue";
</script>

<template>
  <div class="bg-gray-900 text-gray-100 min-h-screen pt-16">
    <SiteHeader />
    <RouterView />
    <SiteFooter />
  </div>
</template>
<style scoped>
@import "https://cdn.jsdelivr.net/gh/SebastianAigner/twemoji-amazing@1.0.0/twemoji-amazing.css";

aside a.active {
  @apply font-bold text-indigo-500;
}
</style>
