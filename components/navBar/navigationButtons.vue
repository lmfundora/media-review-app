<script setup lang="ts">
const router = useRouter();
const routes = [
  { path: "/home", name: "Home" },
  { path: "/home/favorites", name: "Favorites" },
  { path: "/home/recomendations", name: "Recomendations" },
  { path: "/home/friends", name: "Friends" },
];
console.log(router.currentRoute.value.path);
</script>
<template>
  <NuxtLink
    v-for="rout in routes"
    :to="rout.path"
    class="hover:bg-muted-light rounded-xl px-3 py-2"
  >
    <p
      class="font-medium"
      :class="{
        'text-t-accent': router.currentRoute.value.path === rout.path,
        'text-t-primary': router.currentRoute.value.path !== rout.path,
      }"
    >
      {{ rout.name }}
    </p>
  </NuxtLink>
</template>
<style scoped></style>
