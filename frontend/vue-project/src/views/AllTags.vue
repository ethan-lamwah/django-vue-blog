<script setup>
import { RouterLink } from "vue-router";
import { TAGS_QUERY } from "@/queries";
import { useQuery } from "@vue/apollo-composable";
import BaseLayout from "../components/BaseLayout.vue";
import PageHeading from "../components/PageHeading.vue";

const { result } = useQuery(TAGS_QUERY);
</script>

<template>
  <BaseLayout class="h-[65vh]">
    <template #header>
      <PageHeading>All Tags</PageHeading>
    </template>
    <template #default>
      <div v-if="result" class="-mt-12">
        <ul class="flex flex-wrap py-2 justify-center">
          <li class="px-2 py-4" v-for="tag in result.allTags" :key="tag.name">
            <RouterLink
              class="post-tag text-base font-medium px-4 py-2"
              :to="`/tag/${tag.slug}`"
              >#{{ tag.name }}</RouterLink
            >
          </li>
        </ul>
      </div>
    </template>
  </BaseLayout>
</template>

<script>
export default {
  name: "TagsView",
};
</script>
