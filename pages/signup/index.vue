<script setup lang="ts">
import LoginCard from "~/components/login/loginCard.vue";
import SignUpForm from "~/components/login/signUpForm.vue";
import { useLayout } from "~/composables/useLayout";

definePageMeta({
  layout: useLayout("auth"),
});
</script>
<template>
  <LoginCard
    title="Sing Up"
    subtitle="Aquí podrá crear su cuenta o usar Google."
  >
    <SignUpForm />
  </LoginCard>
</template>
<style scoped></style>
