<script setup lang="ts">
import { Plus } from "lucide-vue-next";
import { useLayout } from "~/composables/useLayout";

definePageMeta({
  layout: useLayout("home"),
});
</script>
<template>
  <div class="flex justify-between">
    <p class="text-t-primary text-xl">Reviews</p>
    <NuxtLink to="/home/create" class="flex items-center gap-2">
      <Button label="New" size="small">
        <template #icon>
          <Plus :size="20" />
        </template>
      </Button>
    </NuxtLink>
  </div>
</template>
<style scoped></style>
