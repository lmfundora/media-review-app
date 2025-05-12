<script setup lang="ts">
import { NavBar } from "#components";
</script>
<template>
  <div>
    <NavBar />
    <div class="mt-14">
      <slot />
    </div>
  </div>
</template>
<style scoped></style>
