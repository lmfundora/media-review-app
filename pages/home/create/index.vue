<script setup lang="ts">
import ReviewForm from "~/components/reviewsForm/reviewForm.vue";
import { useLayout } from "~/composables/useLayout";

definePageMeta({
  layout: useLayout("home"),
});
</script>
<template>
  <div class="flex flex-col w-full h-full">
    <p class="text-t-primary text-xl">Create</p>
    <ReviewForm />
  </div>
</template>
<style scoped></style>
