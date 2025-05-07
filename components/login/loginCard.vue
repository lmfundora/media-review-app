<script setup lang="ts">
import { User } from "lucide-vue-next";

defineProps({
  title: String,
  subtitle: String,
});

const { name } = useRoute();
</script>
<template>
  <div class="w-[480px] h-[580px] z-20 cristal flex flex-col items-center">
    <Avatar class="mt-8" size="xlarge" shape="circle">
      <template #icon>
        <User />
      </template>
    </Avatar>
    <div class="w-[280px] mt-10">
      <h6 class="text-4xl mb-4">{{ title }}</h6>
      <p class="text-sm">{{ subtitle }}</p>
    </div>
    <slot />
    <p v-if="name === 'login'" class="text-center text-sm mx-8 mt-10">
      Si usted no tiene una cuenta aún puede crearse una aquí,
      <NuxtLink class="text-sky-400 underline" a to="/signup"
        >Sign Up.</NuxtLink
      >
    </p>
    <p v-else class="text-center text-sm mx-8 mt-10">
      Si usted ya tiene una cuenta puede iniciar sesión aquí,
      <NuxtLink class="text-sky-400 underline" a to="/login">Sign In.</NuxtLink>
    </p>
  </div>
</template>
<style scoped>
.cristal {
  padding: 40px;
  border-radius: 15px;
  background: linear-gradient(
    0.15turn,
    rgba(0, 0, 0, 0.04),
    rgba(0, 0, 0, 0.1)
  );
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  color: white;
  text-align: center;
  max-width: 80%;
}
</style>
