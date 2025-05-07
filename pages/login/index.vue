<script setup lang="ts">
import { authClient } from "@/lib/auth-client"; //import the auth client

async function signInWithGoogle() {
  await authClient.signIn.social({
    /**
     * The social provider id
     * @example "github", "google", "apple"
     */
    provider: "google",
    /**
     * A URL to redirect after the user authenticates with the provider
     * @default "/"
     */
    callbackURL: "/home",
    /**
     * A URL to redirect if an error occurs during the sign in process
     */
    errorCallbackURL: "/error",
    /**
     * A URL to redirect if the user is newly registered
     */
    newUserCallbackURL: "/welcome",
    /**
     * disable the automatic redirect to the provider.
     * @default false
     */
    disableRedirect: true,
  });
}
</script>
<template>
  <Button @click="signInWithGoogle"> Sign in with Google </Button>
</template>
<style scoped></style>
