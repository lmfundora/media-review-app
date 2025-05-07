<script setup lang="ts">
import { authClient } from "@/lib/auth-client"; //import the auth client

async function signInWithGoogle() {
  console.log("siuu");

  await authClient.signIn.social({
    provider: "google",
    callbackURL: "/home",
    errorCallbackURL: "/error",
    newUserCallbackURL: "/welcome",
    disableRedirect: false,
  });
}
</script>
<template>
  <Button @click="signInWithGoogle"> Sign in with Google </Button>
</template>
<style scoped></style>
