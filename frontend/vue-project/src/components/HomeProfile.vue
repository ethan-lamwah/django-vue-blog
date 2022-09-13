<script setup>
import { RouterLink } from "vue-router";
import { computed, defineAsyncComponent } from "vue";
import { ALL_POSTS_QUERY } from "@/queries";
import { useQuery } from "@vue/apollo-composable";
import LoadingSymbol from "./loading/LoadingSymbol.vue";
import TypedBio from "./TypedBio.vue";
import ProfileCard from "./ProfileCard.vue";
import BaseLayout from "./BaseLayout.vue";
import PageHeading from "./PageHeading.vue";

const PostList = defineAsyncComponent({
  loader: () => import("@/components/PostList.vue"),
  loadingComponent: LoadingSymbol,
});
const { result } = useQuery(ALL_POSTS_QUERY);

const posts = computed(() => result.value?.allPosts.slice(0, 3) ?? null);
</script>
<template>
  <div
    class="-mt-4 flex flex-col h-screen sm:-mt-16 text-lg leading-8 text-gray-300"
  >
    <section
      class="flex flex-col items-center justify-center mt-12 sm:my-auto gap-8"
    >
      <ProfileCard :showMeta="false" :showName="false"></ProfileCard>
      <h1
        class="font-mono text-4xl leading-10 font-semibold tracking-tight text-gradient gradient-indigo-light md:text-6xl md:leading-[86px] text-neon-light"
      >
        Hello! Nei<sup class="text-indigo-300 text-2xl">5</sup> Hou<sup
          class="text-indigo-300 text-2xl"
          >2</sup
        >!
      </h1>
      <div class="w-full md:max-w-2xl space-y-6">
        <p>
          I'm <strong class="text-highlight">Ethan</strong>, a developer
          passionate about full-stack development and cloud computing. Welcome
          to my spot where I share my thoughts and what I've learned in coding
          world.
        </p>
        <div class="flex flex-col space-y-1">
          <RouterLink to="/blog" class="group inline-block">
            <i class="mr-2 twa twa-memo"></i>
            <span class="py-1 gradient-link group-hover:link-growing"
              >Explore my journy</span
            >
          </RouterLink>
          <RouterLink to="/about" class="group">
            <i class="mr-2 twa twa-technologist"></i>
            <span class="py-1 gradient-link group-hover:link-growing"
              >More about me</span
            >
          </RouterLink>
          <div>
            <TypedBio></TypedBio>
          </div>
        </div>
      </div>
    </section>
  </div>
  <BaseLayout>
    <template #header>
      <PageHeading>Recent Posts</PageHeading>
    </template>
    <template #default>
      <PostList v-if="posts" :posts="posts" />
      <div class="mt-8 flex justify-center text-base font-medium leading-6">
        <RouterLink
          to="/blog"
          class="animate-pulse text-gray-100 text-xl gradient-link hover:link-growing mx-3 p-1 rounded hover:animate-none"
          aria-label="all posts"
          >Check out more posts</RouterLink
        >
      </div>
    </template>
  </BaseLayout>
</template>
