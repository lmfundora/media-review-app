<script setup lang="ts">
import { User } from "lucide-vue-next";
import UserMenu from "./userMenu.vue";

const { user } = useAuthStore();
</script>
<template>
  <div
    class="flex justify-end items-center px-2 rounded-xl w-[95%] h-12 sm:h-10 fixed top-2 right-0 left-0 backdrop-blur-md shadow-custom mx-auto"
  >
    <UserMenu v-if="user" :user />
    <NuxtLink v-else to="/login">
      <Button size="small" variant="text"> <User :size="17" /> Sign In </Button>
    </NuxtLink>
  </div>
</template>
<style scoped></style>
