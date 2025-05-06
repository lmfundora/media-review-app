<script setup lang="ts">
import { useLayout } from "~/composables/useLayout";

definePageMeta({
  layout: useLayout("home"),
});
</script>
<template>
  <div>
    <p class="text-t-primary">Home</p>
  </div>
</template>
<style scoped></style>
