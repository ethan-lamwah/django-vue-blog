<script setup>
import { ref, computed, defineAsyncComponent } from "vue";
import { useRoute } from "vue-router";
import { POSTS_BY_CATEGORY_QUERY } from "@/queries";
import { useQuery } from "@vue/apollo-composable";
import LoadingSymbol from "./loading/LoadingSymbol.vue";
import BaseLayout from "./BaseLayout.vue";
import PageHeading from "./PageHeading.vue";

const PostList = defineAsyncComponent({
  loader: () => import("./PostList.vue"),
  loadingComponent: LoadingSymbol,
});

const route = useRoute();
const variables = ref({
  category: route.params.category,
});
const { result } = useQuery(POSTS_BY_CATEGORY_QUERY, variables);
const posts = computed(() => result.value?.postsByCategory ?? null);
const category = computed(() => result.value?.categoryBySlug ?? null);
</script>

<template>
  <BaseLayout>
    <template #header>
      <PageHeading>{{ category?.name }}</PageHeading>
    </template>
    <template #default>
      <PostList v-if="posts" :posts="posts" />
    </template>
  </BaseLayout>
</template>

<script>
export default {
  name: "PostsByCategory",
};
</script>
