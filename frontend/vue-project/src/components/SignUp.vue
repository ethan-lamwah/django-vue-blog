<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { USER_SIGNUP } from "@/mutations";
import { useMutation } from "@vue/apollo-composable";
// import { logErrorMessages } from "@vue/apollo-util";
import BaseLayout from "./BaseLayout.vue";
import PageHeading from "./PageHeading.vue";
import AuthenticationForm from "./AuthenticationForm.vue";
import FormInput from "./FormInput.vue";
import AlertBox from "./AlertBox.vue";

const alert = ref(),
  email = ref(),
  username = ref(),
  password = ref(),
  confirmPassword = ref();

const { mutate: signUpMutation } = useMutation(USER_SIGNUP, () => ({
  variables: {
    username: username.value,
    email: email.value,
    password: password.value,
  },
}));

const verfityPassword = () => password.value == confirmPassword.value;

function validateUsername(value) {
  var re = /^[a-zA-z0-9_-]{3,16}$/;
  return re.test(value);
}
function validateEmail(value) {
  var re = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(value);
}

function validatePassword(password) {
  return password.length >= 8;
}

function userSignup() {
  alert.value = "";

  if (!validateUsername(username.value)) {
    alert.value =
      "Username should only contains alphanumeric characters, special characters _ -, and limit to 3-16 chars";
    return;
  }

  if (!validateEmail(email.value)) {
    alert.value = "Email is not valid";
    return;
  }

  if (!validatePassword(password.value)) {
    alert.value = "Password must be at least 8 characters";
    return;
  }

  if (!verfityPassword()) {
    alert.value = "Passwords must match";
    return;
  }

  signUpMutation().then(
    (value) => {
      //console.log(value.data);
      alert.value = "Your account has been created!";
    },
    (error) => {
      if (error.message.includes("blog_user.username")) {
        alert.value = "Username has already been registered";
        return;
      }
      alert.value = error.message;
    }
  );
}
</script>
<template>
  <BaseLayout>
    <template #header>
      <PageHeading
        ><i class="twa twa-bust-in-silhouette"></i> Create Account</PageHeading
      >
    </template>
    <template #default>
      <AuthenticationForm @submit.prevent="userSignup()" :alert="alert">
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
            v-model="email"
            type="text"
            id="email"
            name="email"
            placeholder="Email"
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
          <FormInput
            v-model="confirmPassword"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
          ></FormInput>
        </template>
        <template #formBtn>
          <button
            type="submit"
            class="w-full bg-indigo-600 duration-200 font-semibold hover:bg-indigo-800 p-3 border border-indigo-700 rounded-3xl shadow text-white transition"
          >
            Sign Up
          </button>
          <div
            class="flex items-center justify-center border-t border-t-slate-300 w-full relative"
          >
            <div class="-mt-1 text-sm text-slate-300 bg-gray-900 px-5 absolute">
              Already have an account?
            </div>
          </div>
          <RouterLink
            to="/login"
            class="text-center w-full duration-200 font-semibold p-3 border border-indigo-400 rounded-3xl text-indigo-700 transition hover:border-indigo-700 hover:shadow-[0_0_0_0.0625rem_#5045e5] bg-white"
            >Log In</RouterLink
          >
        </template>
      </AuthenticationForm>
    </template>
  </BaseLayout>
</template>
