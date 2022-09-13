<script setup>
import { RouterLink } from "vue-router";
import { getLocaleDate } from "@/helper";

defineProps({
  post: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <div
    class="bg-white/5 duration-200 focus:outline-none hover:bg-white/10 hover:shadow-md max-w-sm overflow-hidden rounded-md shadow shadow-surface-elevation-low transition"
  >
    <article class="grid gap-x-14 gap-y-6">
      <RouterLink
        :to="`/post/${post.slug}`"
        class="overflow-hidden rounded-t-md w-full"
      >
        <img
          class="w-full h-full object-cover transition-transform hover:scale-105"
          v-if="post.previewImage"
          :src="post.previewImage"
          alt
        />
      </RouterLink>
      <div class="grid gap-y-4 px-3 pb-4">
        <div class="flex flex-wrap gap-y-2 items-center justify-between">
          <div class="relative inline-flex">
            <RouterLink
              class="inline-flex items-center px-2.5 py-1 leading-6 shadow bg-indigo-900 dark:bg-slate-800 transition ease-in-out duration-150 ring-1 ring-slate-900/10 dark:ring-slate-200/20 rounded-full gap-x-2 group"
              :to="`/category/${post.category.slug}`"
            >
              <div class="flex h-3 relative w-3">
                <span
                  class="group-hover:animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"
                ></span
                ><span
                  class="relative inline-flex rounded-full h-3 w-3 bg-indigo-400"
                ></span>
              </div>
              <span
                class="text-xs text-white font-light uppercase tracking-widest"
                >{{ post.category.name }}</span
              ></RouterLink
            >
          </div>
          <time class="font-sans text-sm text-slate-500">{{
            getLocaleDate(post.datePublished)
          }}</time>
        </div>
        <h2 class="text-white/90 text-xl font-semibold leading-8">
          <RouterLink
            :to="`/post/${post.slug}`"
            class="link-sliding-underline pb-1"
          >
            {{ post.title }}
          </RouterLink>
        </h2>
        <p class="antialiased text-base text-slate-400 break-normal">
          {{ post.description }}
        </p>
        <div>
          <ul class="flex flex-wrap">
            <li class="mr-2" v-for="tag in post.tags" :key="tag.name">
              <RouterLink class="post-tag" :to="`/tag/${tag.slug}`"
                >#{{ tag.name }}</RouterLink
              >
              <!-- <RouterLink
                class="bg-indigo-100 border border-transparent hover:bg-indigo-200 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full tracking-wide dark:bg-blue-200 dark:text-white dark:hover:bg-indigo-300 transition-colors"
                :to="`/tag/${tag.slug}`"
                >#{{ tag.name }}</RouterLink
              > -->
            </li>
          </ul>
        </div>
      </div>
    </article>
  </div>
</template>
