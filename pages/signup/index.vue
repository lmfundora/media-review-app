<script setup lang="ts">
import { authClient } from "@/lib/auth-client"; //import the auth client
import LoginCard from "~/components/login/loginCard.vue";
import SignUpForm from "~/components/login/signUpForm.vue";

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
  <div
    class="w-screen h-screen relative flex justify-center items-center overflow-hidden"
  >
    <div v-for="n in 5" :key="n" class="forma"></div>
    <div class="absolute w-full h-full backdrop-blur-3xl top-0 right-0"></div>
    <LoginCard
      title="Sing Up"
      subtitle="Aquí podrá crear su cuenta o usar Google."
    >
      <SignUpForm />
    </LoginCard>
  </div>
</template>
<style scoped>
.forma {
  /* Posicionamiento absoluto para las formas */
  position: absolute;
  /* Forma circular */
  border-radius: 50%;
  /* Opacidad para el efecto cristal */
  opacity: 0.5;
  /* Desenfoque para el efecto cristal */
  filter: blur(85px);
  /* Animación de latido */
  animation: latido 2s infinite alternate;
  transform-origin: 50% 50%;
}

@keyframes latido {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.3);
  }
}

/* Estilos para las diferentes formas con variaciones de color y tamaño */
.forma:nth-child(1) {
  top: 30%;
  left: 20%;
  width: 400px;
  height: 400px;
  animation-delay: 0s;
  background-color: oklch(76.5% 0.177 163.223); /* Verde azulado */
  animation-duration: 2.5s;
}

.forma:nth-child(2) {
  top: 60%;
  right: 15%;
  width: 100px;
  height: 100px;
  animation-delay: 1s;
  background-color: oklch(54.6% 0.245 262.881); /* Azul oscuro */
  animation-duration: 1.8s;
}

.forma:nth-child(3) {
  bottom: 10%;
  left: 30%;
  width: 150px;
  height: 150px;
  animation-delay: 0.5s;
  background-color: oklch(70.7% 0.165 254.624); /* Azul más claro */
  animation-duration: 2s;
}

.forma:nth-child(4) {
  top: 10%;
  right: 25%;
  width: 250px;
  height: 250px;
  animation-delay: 1.5s;
  background-color: oklch(82.8% 0.111 230.318); /* Azul claro */
  animation-duration: 2.2s;
}

.forma:nth-child(5) {
  bottom: 40%;
  right: 10%;
  width: 120px;
  height: 120px;
  animation-delay: 0.8s;
  background-color: oklch(43.8% 0.218 303.724); /* Violeta azulado */
  animation-duration: 1.6s;
}
</style>
