<script setup>
import { ref } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import { useMutation } from "@vue/apollo-composable";
import { USER_SIGNIN } from "@/mutations";
import { useUserStore } from "@/stores/user";
import BaseLayout from "./BaseLayout.vue";
import PageHeading from "./PageHeading.vue";
import AuthenticationForm from "./AuthenticationForm.vue";
import FormInput from "./FormInput.vue";
import AlertBox from "./AlertBox.vue";

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

const alert = ref();
const username = ref();
const password = ref();

const { mutate: userSignInMutation } = useMutation(USER_SIGNIN, () => ({
  variables: {
    username: username.value,
    password: password.value,
  },
}));

function userLogin() {
  userSignInMutation().then(
    (value) => {
      //console.log(value);
      userStore.setToken(value.data.tokenAuth.token);
      userStore.setUser(value.data.tokenAuth.user);
      router.push(route.query.redirect || "/");
    },
    (error) => {
      //console.error(error);
      // logErrorMessages(error);
      alert.value = error.message;
    }
  );
}
</script>
<template>
  <BaseLayout>
    <template #header>
      <PageHeading><i class="twa twa-people-hugging"></i> Welcome!</PageHeading>
    </template>
    <template #default>
      <AuthenticationForm @submit.prevent="userLogin()" :alert="alert">
        <template #default>
          <FormInput
            v-model="username"
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            required
          ></FormInput>
          <FormInput
            v-model="password"
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
          ></FormInput>
        </template>
        <template #formBtn>
          <button
            type="submit"
            class="w-full bg-indigo-600 duration-200 font-semibold hover:bg-indigo-800 p-3 border border-indigo-700 rounded-3xl shadow text-white transition"
          >
            Log in
          </button>
          <div
            class="flex items-center justify-center border-t border-t-slate-300 w-full relative"
          >
            <div class="text-xs text-slate-300 bg-gray-900 px-2 absolute">
              Or
            </div>
          </div>
          <RouterLink
            to="/signup"
            class="text-center w-full duration-200 font-semibold p-3 border border-indigo-400 rounded-3xl text-indigo-700 transition hover:border-indigo-700 hover:shadow-[0_0_0_0.0625rem_#5045e5] bg-white"
            >Sign Up</RouterLink
          >
        </template>
      </AuthenticationForm>
    </template>
  </BaseLayout>
</template>
