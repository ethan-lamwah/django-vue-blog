<script setup>
import { onMounted } from "vue";
import Typed from "typed.js";

onMounted(() => {
  const typed = new Typed("#typed", {
    stringsElement: "#typed-bio",
    typeSpeed: 30,
    backSpeed: 5,
    backDelay: 1400,
    // fadeOut: true,
    loop: true,
  });
});
</script>
<template>
  <ul id="typed-bio" class="block">
    <li>I believe in learning by doing.</li>
    <li>I learn by focusing on techniques first. Creativity comes later.</li>
    <li>I worked mainly with Microsoft Technologies like C#, .NET in my previous job.</li>
    <li>I built this blog in Vue.js, Django and GraphQL.</li>
    <li>My next journey: .NET Core, Angular and TypeScript.</li>
    <li>
      My first programming language in college was
      <strong class="text-highlight">C++</strong>.
    </li>
    <li>
      My most loved programming language is
      <strong class="text-highlight">Python</strong> since its minimal syntax,
      versatility, and excellent library support.
    </li>
    <li>
      I've recently relocated to Vancouver
      <i class="twa twa-flag-canada"></i> with my work permit.
    </li>
    <li>
      I'm a sport-guy. I love <i class="twa twa-basketball"></i>,
      <i class="twa twa-ping-pong"></i>, <i class="twa twa-canoe"></i>,
      <i class="twa twa-man-biking"></i>, also a new player to
      <i class="twa twa-tennis"></i>.
    </li>
    <li>
      I love playing video game <i class="twa twa-video-game"></i>, Apex Legends
      is my favorite one.
    </li>
    <li>
      I love watching NBA<i class="twa twa-person-bouncing-ball"></i>, Dwyane
      Wade is my favorite player.
    </li>
  </ul>
  <i class="mr-2 twa twa-speech-balloon"></i><span id="typed"></span>
</template>
