<script setup lang="ts">
import { NavBar } from "#components";

const { width } = useWindowSize();
</script>
<template>
  <div>
    <NavBar />
    <div class="mt-16 px-[4.5%] sm:px-[3%] lg:px-[10%]">
      <slot />
    </div>
    <NavBarBottomNavigation v-if="width < 954" />
  </div>
</template>
<style scoped></style>
