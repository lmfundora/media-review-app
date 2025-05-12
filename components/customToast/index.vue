<script setup lang="ts">
import { X } from "lucide-vue-next";
</script>
<template>
  <Toast>
    <template #container="{ message, closeCallback }">
      <div class="flex justify-between items-center p-4 gap-5">
        <CustomToastIconSelector :severity="message.severity" />
        <div class="">
          <p class="font-bold text-base text-t-primary">
            {{ message.summary }}
          </p>
          <p class="text-sm text-t-primary">{{ message.detail }}</p>
        </div>
        <Button
          class="my-auto"
          severity="secondary"
          variant="text"
          @click="closeCallback"
        >
          <template #icon>
            <X color="oklch(92.8% 0.006 264.531)" />
          </template>
        </Button>
      </div>
    </template>
  </Toast>
</template>
<style scoped></style>
