<script setup>
import { defineAsyncComponent } from "vue";
import { computed } from "@vue/reactivity";
import LoadingPostCard from "./loading/LoadingPostCard.vue";

const PostCard = defineAsyncComponent({
  loader: () => import("./PostCard.vue"),
  loadingComponent: LoadingPostCard,
});

const props = defineProps({
  posts: {
    type: Array,
    reuqired: true,
  },
});

const publishedPosts = computed(() =>
  props.posts.filter((post) => post.isPublished)
);
</script>
<template>
  <div>
    <section
      v-if="publishedPosts"
      class="grid grid-cols-1 gap-4 mx-auto sm:grid-cols-2 lg:grid-cols-3"
    >
      <PostCard v-for="post in publishedPosts" :key="post.title" :post="post" />
    </section>
  </div>
</template>

<script>
export default {
  name: "PostListComponent",
};
</script>
