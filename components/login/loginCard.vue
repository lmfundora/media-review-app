<script setup lang="ts">
import { User } from "lucide-vue-next";
import { authClient } from "@/lib/auth-client"; //import the auth client

async function signInWithGoogle() {
  await authClient.signIn.social({
    provider: "google",
    callbackURL: "/home",
    errorCallbackURL: "/error",
    newUserCallbackURL: "/welcome",
    disableRedirect: false,
  });
}

defineProps({
  title: String,
  subtitle: String,
});

const { name } = useRoute();
</script>
<template>
  <div
    class="w-5/6 h-fit sm:w-[480px] z-20 cristal flex flex-col text-t-primary text-center items-center rounded-2xl bg-white/3"
  >
    <Avatar class="mt-8" size="xlarge" shape="circle">
      <template #icon>
        <User />
      </template>
    </Avatar>
    <div class="max-w-[350px] relative px-10 pb-10 flex flex-col items-center">
      <div class="mx-8 sm:mx-0 w-full my-10">
        <h6 class="text-4xl mb-4">{{ title }}</h6>
        <p class="text-xs sm:text-sm">{{ subtitle }}</p>
      </div>
      <slot />
      <Button
        @click="signInWithGoogle"
        color="white"
        class="my-10 w-full"
        severity="secondary"
      >
        <NuxtImg
          src="/Google-Logo--Streamline-Ultimate.svg"
          height="20"
          width="20"
        />
        Google
      </Button>
      <div class="text-center text-xs mx-8 absolute bottom-5">
        <div v-if="name === 'login'">
          <p>
            Si usted no tiene una cuenta aún puede crearse una aquí,
            <NuxtLink class="text-sky-400 underline" a to="/signup"
              >Sign Up.</NuxtLink
            >
          </p>
        </div>
        <div v-else>
          <p>
            Si usted ya tiene una cuenta puede iniciar sesión aquí,
            <NuxtLink class="text-sky-400 underline" a to="/login"
              >Sign In.</NuxtLink
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
