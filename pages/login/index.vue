<script setup lang="ts">
import LoginCard from "~/components/login/loginCard.vue";
import LoginForm from "~/components/login/loginForm.vue";
import { useLayout } from "~/composables/useLayout";

definePageMeta({
  layout: useLayout("auth"),
});
</script>
<template>
  <LoginCard
    title="Sing In"
    subtitle="Aquí podrá iniciar seción con su usuario y contraseña o con su cuenta de Google."
  >
    <LoginForm />
  </LoginCard>
</template>
<style scoped></style>
