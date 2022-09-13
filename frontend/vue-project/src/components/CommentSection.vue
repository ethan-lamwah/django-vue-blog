<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { SUBMIT_COMMENT } from "@/mutations";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { useMutation } from "@vue/apollo-composable";
import { timeSince } from "@/helper";

const emit = defineEmits(["submitComment"]);
const props = defineProps({
  comments: {
    type: Array,
    required: true,
  },
  postID: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
    required: true,
    default: "",
  },
});
const userStore = useUserStore();
const { isAuthenticated } = storeToRefs(userStore);

const commentContent = ref();

const {
  mutate: submitCommentMutation,
  onDone,
  onError,
} = useMutation(SUBMIT_COMMENT, () => ({
  variables: {
    content: commentContent.value,
    userID: props.userID,
    postID: props.postID,
  },
}));

function submitComment() {
  if (commentContent.value !== "") {
    submitCommentMutation();
    onDone((result) => {
      //console.log(result.data);
      emit("submitComment");
    });

    onError((error) => {
      console.log(error.message);
    });
  }
}
</script>
<template>
  <div class="mx-auto w-full space-y-6 py-8 mt-16">
    <h3 class="pr-5 text-xl font-semibold text-indigo-100 text-neon-light">
      Comments ({{ props.comments.length }})
    </h3>

    <!-- If the user is not authenticated -->
    <div
      v-if="!isAuthenticated"
      class="bg-white/5 text-white duration-200 flex font-semibold justify-center p-3 py-4 rounded-lg shadow transition w-full"
    >
      <font-awesome-icon icon="fa-regular fa-comment-dots" />
      <div class="font-medium leading-none tracking-wide pl-2">
        Please
        <RouterLink
          :to="{ name: 'Login', query: { redirect: $route.path } }"
          class="text-gradient gradient-indigo-light hover:underline"
          >sign in</RouterLink
        >
        to write a comment.
      </div>
    </div>
    <!-- If the user is authenticated -->
    <div v-else class="flex">
      <div class="flex-shrink-0 mr-3">
        <img
          class="border-2 border-indigo-100 mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
          :src="userStore.getUser.avatar"
          alt=""
        />
      </div>
      <div class="w-full leading-relaxed">
        <form @submit.prevent="submitComment">
          <div>
            <label for="comment" class="sr-only">Your comment</label>
            <textarea
              class="w-full text-sm border bg-gray-900 focus:ring-0 focus:bg-gray-700 text-white placeholder-gray-400 rounded-lg border-gray-200 leading-normal py-2 px-4 sm:px-6 sm:py-4 focus:outline-none"
              id="comment"
              type="text"
              rows="3"
              placeholder="What are your thoughts?"
              required
              v-model="commentContent"
            ></textarea>
          </div>
          <div class="flex items-start justify-end">
            <input type="submit" class="btn-indigo" value="Submit Comment" />
          </div>
        </form>
      </div>
    </div>
    <div class="mt-4 space-y-4">
      <div class="flex" v-for="comment in props.comments" :key="comment.id">
        <div class="flex-shrink-0 mr-3">
          <img
            class="border-2 mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
            :src="comment.user.avatar"
            alt=""
          />
        </div>
        <div
          class="flex-1 bg-white/5 shadow rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed text-slate-100"
        >
          <div class="flex items-baseline space-x-2">
            <span class="text-base font-medium">{{
              comment.user.username
            }}</span>
            <span> · </span>
            <span class="text-xs text-slate-400">{{
              timeSince(comment.dateCreated)
            }}</span>
          </div>
          <p class="text-sm text-slate-300">
            {{ comment.content }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "CommentSection",
};
</script>
