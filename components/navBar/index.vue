<script setup lang="ts">
import UserMenu from "./userMenu.vue";
import NavigationButtons from "./navigationButtons.vue";

const authStore = useAuthStore();

const { width } = useWindowSize();
</script>
<template>
  <div
    class="flex justify-between items-center px-2 rounded-xl w-[95%] h-12 sm:h-10 fixed top-2 right-0 left-0 backdrop-blur-md shadow-custom mx-auto"
  >
    <div class="w-[20%]">
      <p class="text-t-primary text-2xl font-bold">Logo</p>
    </div>
    <div class="flex items-center justify-end sm:justify-between w-1/2">
      <div v-if="width > 640" class="flex items-center justify-between w-2/3">
        <NavigationButtons />
      </div>
      <UserMenu :user="authStore.user" />
    </div>
  </div>
</template>
<style scoped></style>
