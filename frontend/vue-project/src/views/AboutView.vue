<script setup>
import workExp from "../data/workExp.js";
import { SITE_INFO_QUERY } from "../queries.js";
import { useQuery } from "@vue/apollo-composable";
import { computed } from "@vue/reactivity";
import BaseLayout from "../components/BaseLayout.vue";
import ProfileCard from "../components/ProfileCard.vue";
import PageHeading from "../components/PageHeading.vue";

const { result } = useQuery(SITE_INFO_QUERY);
const aboutMe = computed(() => result.value?.site?.about ?? null);
</script>
<template>
  <BaseLayout>
    <template #header>
      <PageHeading>About Me</PageHeading>
    </template>
    <template #default>
      <div class="grid gap-24 grid-cols-1 lg:grid-cols-3">
        <main class="block col-span-1 lg:col-span-2 mt-0">
          <article
            class="prose lg:prose-lg dark:prose-invert prose-a:link-sliding-underline prose-headings:text-neon-light"
            v-html="aboutMe"
          ></article>
          <!-- <article
            class="prose lg:prose-lg dark:prose-invert prose-img:rounded-lg prose-a:text-indigo-400 prose-a:pb-1 prose-a:link-sliding-underline prose-a:no-underline prose-headings:text-indigo-100 prose-p:text-gray-300 prose-strong:text-gray-200 prose-code:text-indigo-500 prose-li:text-gray-300"
            v-html="aboutMe"
          ></article> -->
          <section class="mt-12 lg:mt-20">
            <div class="py-6 lg:pb-12">
              <h2 class="text-3xl sm:text-4xl font-extrabold text-neon-light">
                Working experience
              </h2>
            </div>
            <div class="relative border-0 sm:border-l border-gray-800 sm:pl-5">
              <div
                class="mb-10 sm:ml-6 space-y-2 text-base lg:text-lg"
                v-for="exp in workExp"
                :key="exp.id"
              >
                <span
                  class="hidden sm:flex absolute -left-4 justify-center items-center w-8 h-8 rounded-full ring-[5px] ring-gray-800"
                  ><img
                    :src="exp.icon"
                    class="rounded-full w-8 h-8"
                    :alt="exp.company"
                /></span>
                <div
                  class="flex flex-col sm:flex-row items-baseline mb-1 text-xl font-medium sm:space-x-3"
                >
                  <span class="text-gray-200">{{ exp.title }}</span>
                  <span class="text-gray-400 text-base"
                    >@{{ exp.company }}</span
                  >
                  <span
                    v-if="exp.currentlyWorking"
                    class="bg-indigo-100 text-indigo-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded ml-3"
                    >Currently</span
                  >
                </div>
                <div class="text-gray-400 text-base italic">
                  <time v-if="!exp.currentlyWorking"
                    >{{ exp.startDate }} -
                    {{ exp.currentlyWorking ? "Current" : exp.endDate }}</time
                  >
                </div>
                <ul v-if="exp.description" class="list-disc list-outside pl-4">
                  <li
                    v-for="desc in exp.description"
                    :key="desc.id"
                    class="text-gray-500"
                  >
                    <p class="mb-2 text-gray-400">
                      {{ desc }}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </main>
        <aside class="lg:col-span-1 lg:flex lg:flex-col hidden order-first">
          <div class="lg:sticky top-24 [&>*]:mb-12">
            <ProfileCard></ProfileCard>
          </div>
        </aside>
      </div>
    </template>
  </BaseLayout>
</template>
