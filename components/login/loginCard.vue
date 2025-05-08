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
    class="w-[90%] px-10 py-12 h-fit sm:w-[700px] z-20 cristal flex flex-col sm:grid sm:grid-cols-2 sm:gap-12 text-t-primary text-center items-center rounded-2xl bg-white/3"
  >
    <div class="flex flex-col items-center">
      <Avatar class="scale-125 md:scale-150" size="xlarge" shape="circle">
        <template #icon>
          <User />
        </template>
      </Avatar>
      <div class="mx-8 sm:mx-0 w-full my-5 md:mt-10 sm:col-start-1">
        <h6 class="text-4xl mb-4">{{ title }}</h6>
        <p class="text-xs sm:text-sm">{{ subtitle }}</p>
      </div>
    </div>
    <div class="sm:col-start-2">
      <slot />
      <Button
        @click="signInWithGoogle"
        color="white"
        class="mt-10 mb-7 w-full"
        severity="secondary"
      >
        <NuxtImg
          src="/Google-Logo--Streamline-Ultimate.svg"
          height="20"
          width="20"
        />
        Google
      </Button>
    </div>
    <div class="text-center text-xs w-full absolute bottom-5 left-0 px-10">
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
</template>
<style scoped></style>
