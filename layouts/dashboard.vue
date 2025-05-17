<script setup lang="ts">
import { NavBar } from "#components";

const { width } = useWindowSize();
</script>
<template>
  <div>
    <NavBar />
    <div class="mt-16 sm:mt-18 px-[4.5%] sm:px-[3%]">
      <slot />
    </div>
    <NavBarBottomNavigation v-if="width < 640" />
  </div>
</template>
<style scoped></style>
