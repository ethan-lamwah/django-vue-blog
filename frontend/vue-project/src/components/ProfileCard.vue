<script setup>
import siteData from "../data/siteData";

const props = defineProps({
  showAvatar: { type: Boolean, required: false, default: true },
  showName: { type: Boolean, required: false, default: true },
  showMeta: { type: Boolean, required: false, default: true },
});
</script>
<template>
  <div class="flex flex-col items-center space-x-2">
    <div
      class="bg-gradient-to-tl from-cyan-400/60 p-[3px] ring-[5px] ring-violet-500/10 rounded-full shadow-lg to-indigo-400/60 text-neon-light"
      v-if="props.showAvatar"
    >
      <div class="h-48 p-px rounded-full w-48">
        <img src="/src/assets/avatar.png" alt="ET Logo" class="rounded-full" />
      </div>
    </div>
    <h3
      class="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight"
      v-if="props.showName"
    >
      Wah Yun Lam (Ethan)
    </h3>
    <div class="space-y-4 mt-4 mb-2" v-if="props.showMeta">
      <div class="flex items-center text-gray-400">
        <a class="px-3 hover:text-gray-200" :href="siteData.github">
          <span class="sr-only">GitHub</span>
          <font-awesome-icon icon="fa-brands fa-github" class="h-6 w-6"
        /></a>
        <a class="px-3 hover:text-gray-200" :href="siteData.linkedin"
          ><span class="sr-only">Linkedin</span>
          <font-awesome-icon icon="fa-brands fa-linkedin" class="h-6 w-6"
        /></a>
        <a class="px-3 hover:text-gray-200" :href="'mailto:' + siteData.email"
          ><span class="sr-only">Email</span>
          <font-awesome-icon icon="fa-regular fa-envelope" class="h-6 w-6"
        /></a>
      </div>
    </div>
  </div>
</template>
