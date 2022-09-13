<script setup>
import { computed, defineAsyncComponent } from "vue";
import { ALL_POSTS_QUERY } from "@/queries";
import { useQuery } from "@vue/apollo-composable";
import LoadingSymbol from "@/components/loading/LoadingSymbol.vue";
import BaseLayout from "@/components/BaseLayout.vue";
import PageHeading from "@/components/PageHeading.vue";

const PostList = defineAsyncComponent({
  loader: () => import("@/components/PostList.vue"),
  loadingComponent: LoadingSymbol,
});
const { result } = useQuery(ALL_POSTS_QUERY);
const posts = computed(() => result.value?.allPosts ?? null);
</script>
<template>
  <BaseLayout>
    <template #header>
      <PageHeading>All Posts</PageHeading>
    </template>
    <template #default>
      <PostList v-if="posts" :posts="posts" />
    </template>
  </BaseLayout>
</template>

<script>
export default {
  name: "BlogView",
};
</script>
