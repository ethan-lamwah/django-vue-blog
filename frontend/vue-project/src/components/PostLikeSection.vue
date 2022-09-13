<script setup>
import { ref } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { UPDATE_POST_LIKE } from "@/mutations";

const props = defineProps({
  likedUsers: {
    type: Array,
    required: true,
  },
  likesCount: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
    required: true,
    default: "",
  },
  postID: {
    type: String,
    required: true,
  },
});

const liked = ref(false);
const numberOfLikes = ref(parseInt(props.likesCount));

for (let likedUser in props.likedUsers) {
  if (props.likedUsers[likedUser].id === props.userID) {
    liked.value = true;
  }
}

const { mutate: updatePostLikeMutation } = useMutation(
  UPDATE_POST_LIKE,
  () => ({
    variables: {
      userID: props.userID,
      postID: props.postID,
    },
  })
);

function updatePostLike() {
  if (props.userID !== "") {
    if (liked.value === true) {
      numberOfLikes.value -= 1;
    } else {
      numberOfLikes.value += 1;
    }
    liked.value = !liked.value;

    updatePostLikeMutation().catch((error) => {
      console.error(error);
    });
  }
}
</script>
<template>
  <div>
    <button type="button" class="inline-flex" @click="updatePostLike()">
      <div v-if="liked === true">
        <i class="twa twa-red-heart"></i>
      </div>
      <div v-else>
        <i class="twa twa-white-heart"></i>
      </div>
      <span class="ml-1">{{ numberOfLikes }}</span>
    </button>
  </div>
</template>
<script>
export default {
  name: "PostLikeSection",
};
</script>
