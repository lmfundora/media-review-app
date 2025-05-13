<script setup lang="ts">
import { NavBar } from "#components";

const { width } = useWindowSize();
</script>
<template>
  <div>
    <NavBar />
    <div class="mt-14">
      <slot />
    </div>
    <NavBarBottomNavigation v-if="width < 640" />
  </div>
</template>
<style scoped></style>
