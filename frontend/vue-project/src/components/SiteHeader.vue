<script setup>
import { RouterLink, useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";
import navRouterLinks from "@/data/navRouterLinks";

const router = useRouter();
const userStore = useUserStore();
const { token, user, isAuthenticated } = storeToRefs(userStore);
const route = useRoute();
const currentRoute = ref();

const setMobileMenuShow = ref(false);

function toggleMobileMenuShow() {
  setMobileMenuShow.value = !setMobileMenuShow.value;
  // overflow-hidden to prevent scrolling
  document.body.style.overflow = setMobileMenuShow.value ? "hidden" : "auto";
}

function userSignOut() {
  userStore.removeToken();
  userStore.removeUser();
  router.push("/login");
}

watch(
  () => route.name,
  () => {
    // console.log(`watch route.name changed to ❯${route.name}`);
    currentRoute.value = route.name.toLowerCase();
  }
);
</script>
<template>
  <header
    class="bg-gray-900 duration-500 fixed top-0 transition-colors w-full z-10"
  >
    <div class="container-wrap">
      <div class="flex items-center justify-between h-16">
        <div>
          <RouterLink to="/" aria-label="Ethan Lam's website">
            <div class="flex flex-shrink-0 items-center space-x-3">
              <img
                class="h-8 w-auto rounded-full sm:h-10 hidden"
                src="@/assets/avatar.png"
                alt="ET Logo"
              />
              <div
                class="text-2xl font-bold whitespace-nowrap w-auto text-gradient gradient-indigo-light type-writer"
              >
                <span class="hidden sm:inline">ETHAN@DEV</span>
                <span class="sm:hidden">ET</span>
                <span> $ ~/{{ currentRoute }}</span>
              </div>
            </div>
          </RouterLink>
        </div>
        <div class="flex items-center text-base leading-5">
          <div class="hidden md:block">
            <nav>
              <ul class="flex items-center">
                <li v-for="link in navRouterLinks" :key="link.name">
                  <RouterLink
                    :to="link.path"
                    class="nav-link link-sliding-underline-to-side"
                  >
                    {{ link.name }}
                  </RouterLink>
                </li>
                <li v-if="!isAuthenticated">
                  <RouterLink
                    :to="{ name: 'Login', query: { redirect: $route.path } }"
                    class="nav-link-btn"
                    >Log In</RouterLink
                  >
                </li>
                <li v-else>
                  <a href="#" class="nav-link-btn" @click="userSignOut">
                    Log Out
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <!-- <button
        aria-label="Toggle Dark Mode"
        type="button"
        class="w-8 h-8 p-1 ml-1 mr-1 rounded sm:ml-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="text-gray-900 dark:text-gray-100"
        >
          <path
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            fill-rule="evenodd"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button> -->
          <div class="-mr-2 md:hidden">
            <button
              type="button"
              class="focus:outline-none focus:text-indigo-500 hover:bg-indigo-100/10 hover:text-indigo-400 p-2 rounded-md text-gray-300 transition"
              aria-label="Toggle Menu"
              @click="toggleMobileMenuShow()"
            >
              <font-awesome-icon
                icon="fa-solid fa-bars"
                class="h-6 w-6"
                v-if="!setMobileMenuShow"
              />
              <font-awesome-icon
                icon="fa-solid fa-xmark"
                class="h-6 w-6"
                v-else
              />
            </button>
            <div
              class="fixed w-full h-full top-16 right-0 backdrop-blur bg-gray-900/90 z-10 transform ease-in-out duration-300"
              :class="
                setMobileMenuShow
                  ? '-translate-y-0 inset-0'
                  : 'translate-y-full left-0'
              "
            >
              <nav class="w-full h-full pt-8" @click="toggleMobileMenuShow()">
                <ul class="flex flex-col items-center space-y-4 px-5">
                  <li v-for="link in navRouterLinks" :key="link.name">
                    <RouterLink
                      :to="link.path"
                      class="nav-link text-2xl font-bold tracking-widest text-center link-sliding-underline-to-side"
                    >
                      {{ link.name }}
                    </RouterLink>
                  </li>
                  <li v-if="!isAuthenticated">
                    <RouterLink
                      :to="{ name: 'Login', query: { redirect: $route.path } }"
                      class="nav-link-btn !text-xl"
                      >Log In</RouterLink
                    >
                  </li>
                  <li v-else>
                    <a
                      href="#"
                      class="nav-link-btn !text-xl"
                      @click="userSignOut"
                    >
                      Log Out
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<style scoped>
.nav-link {
  @apply px-4 py-2 font-medium text-gray-500 hover:text-gray-300 focus:text-gray-300 focus:shadow-lg block;
}

.nav-link-btn {
  @apply bg-indigo-600/10 border flex border-indigo-700 duration-150 ease-in-out focus:outline-none font-medium hover:bg-indigo-800 items-center justify-center md:ml-4 px-4 py-2 rounded-lg shadow-md text-base text-white transition;
}

nav a.nav-link.router-link-exact-active {
  @apply text-white;
}

nav ul li {
  @apply w-full md:w-auto;
}
</style>
