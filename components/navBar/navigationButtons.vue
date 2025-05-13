<script setup lang="ts">
import { Home, House, Heart, Gift, Handshake } from "lucide-vue-next";
const route = useRoute();
const routes = [
  { path: "/home", name: "Home", icon: Home },
  { path: "/home/favorites", name: "Favorites", icon: Heart },
  { path: "/home/recomendations", name: "Gifts", icon: Gift },
  { path: "/home/friends", name: "Friends", icon: Handshake },
];

function isCurrentPath(path: string) {
  return route.path === path;
}
</script>
<template>
  <NuxtLink
    v-for="rout in routes"
    :to="rout.path"
    class="hover:bg-muted-light rounded-xl px-3 py-2 w-20 sm:w-fit flex flex-col items-center sm:flex-row gap-1 sm:gap-2 transition-all duration-300"
    :class="{
      'text-t-accent bg-gray-500/10 scale-125 sm:scale-100': isCurrentPath(
        rout.path,
      ),
      'text-t-primary': !isCurrentPath(rout.path),
    }"
  >
    <component :is="rout.icon" :size="20" />
    <p class="font-light text-xs sm:text-base sm:font-medium">
      {{ rout.name }}
    </p>
  </NuxtLink>
</template>
<style scoped></style>
