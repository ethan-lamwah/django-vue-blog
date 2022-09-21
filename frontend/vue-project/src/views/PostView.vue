<script setup>
import { computed, defineAsyncComponent } from "vue";
import { useRoute } from "vue-router";
import { POST_BY_SLUG_QUERY } from "@/queries";
import { useQuery } from "@vue/apollo-composable";
import LoadingSymbol from "@/components/loading/LoadingSymbol.vue";
import { scrollToElement } from "../helper";

const PostContent = defineAsyncComponent({
  loader: () => import("@/components/PostContent.vue"),
  loadingComponent: LoadingSymbol,
});

const route = useRoute();
const { result, refetch } = useQuery(POST_BY_SLUG_QUERY, {
  slug: route.params.slug,
});
const post = computed(() => result.value?.postBySlug ?? null);

function refetchContent() {
  // console.log("Comment submitted!");
  refetch();
  scrollToElement("#comment_end", { behavior: "smooth" });
}
</script>

<template>
  <div v-if="post">
    <PostContent :post="post" @refetch-content="refetchContent()"></PostContent>
  </div>
</template>
