<script setup>
import { RouterLink } from "vue-router";
import navRouterLinks from "../data/navRouterLinks";
import siteData from "../data/siteData";
</script>
<template>
  <footer class="pt-16 mb-8 px-0 text-gray-500 font-medium">
    <div class="container-wrap">
      <hr class="my-6 border-gray-700 sm:mx-auto lg:my-8" />
      <div class="flex flex-col items-center sm:flex-row sm:justify-between">
        <div>
          <ul class="flex flex-wrap justify-center text-md">
            <li v-for="link in navRouterLinks" :key="link.name">
              <RouterLink
                :to="link.path"
                class="mr-4 py-1 link-sliding-underline-to-side md:mr-6"
              >
                {{ link.name }}
              </RouterLink>
            </li>
          </ul>
        </div>
        <div class="flex justify-center mt-8 space-x-6 sm:mt-0">
          <a
            :href="siteData.github"
            class="hover:text-indigo-400"
            target="_blank"
          >
            <span class="sr-only">GitHub</span>
            <font-awesome-icon icon="fa-brands fa-github" class="h-6 w-6" />
          </a>
          <a
            :href="siteData.linkedin"
            class="hover:text-indigo-500"
            target="_blank"
          >
            <span class="sr-only">Linkedin</span>
            <font-awesome-icon icon="fa-brands fa-linkedin" class="h-6 w-6" />
          </a>
          <a
            :href="'mailto:' + siteData.email"
            class="hover:text-indigo-500"
            target="_blank"
          >
            <span class="sr-only">Email</span>
            <font-awesome-icon icon="fa-regular fa-envelope" class="h-6 w-6" />
          </a>
        </div>
      </div>
      <div>
        <p class="mt-4 text-base text-center sm:text-left">
          Copyright © 2022 Wah Yun Lam, Ethan
        </p>
      </div>
    </div>
  </footer>
</template>
