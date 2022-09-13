<script setup>
import { computed, onMounted, defineAsyncComponent, ref } from "vue";
import { RouterLink } from "vue-router";
import { getLocaleDate } from "@/helper";
import { useUserStore } from "@/stores/user";
import LoadingComment from "./loading/LoadingComment.vue";
import BaseLayout from "./BaseLayout.vue";
import PageHeading from "./PageHeading.vue";
import { useScrollToc } from "@/composables/scroll-toc.js";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.min.css";
import { scrollToElement } from "../helper";

const props = defineProps({ post: { type: Object, required: true } });
const emit = defineEmits(["refetchContent"]);

const PostLikeSection = defineAsyncComponent(() =>
  import("./PostLikeSection.vue")
);
const CommentSection = defineAsyncComponent({
  loader: () => import("./CommentSection.vue"),
  loadingComponent: LoadingComment,
});

const showComment = ref(false);
const userStore = useUserStore();

const approvedComments = computed(() =>
  props.post.commentSet.filter((comment) => comment.isApproved)
);

const { currentSection, toc } = useScrollToc(
  "article[data-toc-content]",
  {},
  {
    rootMargin: "0px 0px -80% 0px",
  }
);

const scrollToHeading = (id) => {
  scrollToElement(id, { behavior: "smooth" });
};

onMounted(() => {
  window.Prism = window.Prism || {};
  window.Prism.manual = true;
  // Prism.manual = true;
  Prism.highlightAll();
});
</script>

<template>
  <BaseLayout>
    <template #header>
      <PageHeading alignment="left">{{ post.title }}</PageHeading>
      <h2
        class="text-lg text-gray-500 font-semibold sm:leading-none md:text-xl mt-4"
      >
        {{ post.description }}
      </h2>
    </template>
    <template #default>
      <div class="grid gap-24 grid-cols-1 lg:grid-cols-3 article-toc">
        <main class="flex flex-col col-span-1 lg:col-span-2 mt-0 gap-24">
          <div class="py-4">
            <img
              v-if="post.previewImage"
              :src="post.previewImage"
              class="w-full rounded-md drop-shadow-sm"
            />
          </div>
          <article
            class="prose lg:prose-lg dark:prose-invert prose-img:rounded-xl prose-a:text-indigo-400 prose-a:pb-1 prose-a:link-sliding-underline prose-a:no-underline prose-headings:text-indigo-100 prose-p:text-gray-300 prose-strong:text-gray-200 prose-code:text-indigo-500"
            v-html="post.content"
            data-toc-content
          ></article>
          <section>
            <button
              type="button"
              class="btn-indigo w-full text-neon-light"
              @click="showComment = true"
              :class="{ hidden: showComment }"
            >
              Show Comments
            </button>
            <!-- Comment Section -->
            <div id="comment">
              <CommentSection
                v-if="approvedComments && showComment"
                :comments="approvedComments"
                :userID="userStore.getUser?.id"
                :postID="post.id"
                @submit-comment="emit('refetchContent')"
              />
              <div id="comment_end"></div>
            </div>
          </section>
        </main>
        <aside class="lg:col-span-1 lg:flex lg:flex-col order-first lg:order-2">
          <div class="text-gray-400 lg:sticky top-16 gap-4 lg:gap-8">
            <div class="flex flex-col justify-center gap-4 lg:gap-8">
              <div class="flex items-center justify-between lg:pt-8">
                <RouterLink to="/about">
                  <div class="flex items-center">
                    <img
                      :src="post.user.avatar"
                      loading="lazy"
                      class="mr-3 w-8 h-8 rounded-full"
                    />
                    <div class="font-medium">
                      {{ post.user.displayName }}
                    </div>
                  </div></RouterLink
                >
                <!-- <a href="#comment" class="hover:text-indigo-700">
                      <font-awesome-icon icon="fa-regular fa-comment-dots" />
                      <span>({{ approvedComments.length }})</span>
                    </a>
                    <div>・</div> -->
                <PostLikeSection
                  :likedUsers="post.likes"
                  :likesCount="post.numberOfLikes"
                  :userID="userStore.getUser?.id"
                  :postID="post.id"
                />
              </div>
              <hr class="border-gray-700" />
              <div class="flex gap-2 lg:flex-col">
                <h3
                  class="text-indigo-300 uppercase text-lg tracking-wider basis-[6em] lg:basis-0"
                >
                  Published
                </h3>
                <time>{{ getLocaleDate(post.datePublished) }}</time>
              </div>
              <div class="flex gap-2 lg:flex-col">
                <h3
                  class="text-indigo-300 uppercase text-lg tracking-wider basis-[6em] lg:basis-0"
                >
                  Tags
                </h3>
                <ul class="flex flex-1 flex-wrap gap-2">
                  <li v-for="tag in post.tags" :key="tag.name">
                    <RouterLink
                      class="post-tag !text-sm"
                      :to="`/tag/${tag.slug}`"
                      >#{{ tag.name }}</RouterLink
                    >
                  </li>
                </ul>
              </div>
            </div>
            <!-- TOC -->
            <section class="hidden lg:block" v-if="toc">
              <h3
                class="text-indigo-300 uppercase text-lg lg:mt-12 mb-4 tracking-wider"
              >
                In this post
              </h3>
              <nav>
                <ul class="[&>*]:mb-2">
                  <li v-for="header in toc.headers" :key="header.id">
                    <a
                      class="text-gray-400 hover:text-gray-200 transition-all duration-300 border-l-2 border-transparent rounded-sm -ml-2"
                      :href="`#${header.id}`"
                      :class="{ active: header.id == currentSection }"
                      :style="{
                        paddingLeft: Math.pow(2, header.indent) * 0.25 + 'rem',
                      }"
                      @click.prevent="scrollToHeading(`#${header.id}`)"
                    >
                      {{ header.text }}
                    </a>
                  </li>
                </ul>
              </nav>
            </section>
          </div>
        </aside>
      </div>
    </template>
  </BaseLayout>
</template>
<style scoped>
aside a.active {
  @apply font-medium text-cyan-200 border-cyan-200;
}
</style>
