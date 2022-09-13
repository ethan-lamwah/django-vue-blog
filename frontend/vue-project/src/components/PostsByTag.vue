<script setup>
import { computed, defineAsyncComponent } from "vue";
import { useRoute } from "vue-router";
import { POSTS_BY_TAG_QUERY } from "@/queries";
import { useQuery } from "@vue/apollo-composable";
import LoadingSymbol from "./loading/LoadingSymbol.vue";
import BaseLayout from "./BaseLayout.vue";
import PageHeading from "./PageHeading.vue";

const PostList = defineAsyncComponent({
  loader: () => import("./PostList.vue"),
  loadingComponent: LoadingSymbol,
});
const route = useRoute();
const { result } = useQuery(POSTS_BY_TAG_QUERY, () => ({
  tag: route.params.tag,
}));
const posts = computed(() => result.value?.postsByTag ?? null);
const tag = computed(() => result.value?.tagBySlug ?? null);
</script>

<template>
  <BaseLayout>
    <template #header>
      <PageHeading>#{{ tag?.name }}</PageHeading>
    </template>
    <template #default>
      <PostList v-if="posts" :posts="posts" />
    </template>
  </BaseLayout>
</template>

<script>
export default {
  name: "PostsByTag",
};
</script>
