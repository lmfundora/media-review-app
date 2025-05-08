<script setup lang="ts">
import { CircleCheckBig, OctagonAlert, Info } from "lucide-vue-next";

enum Severity {
  Success = "success", // Asigna valores explícitos a los miembros del enum
  Info = "info",
  Danger = "error",
}

const props = defineProps({
  severity: {
    type: String as PropType<Severity>, // Usa PropType para el tipo enum
    required: true, // o false, según sea necesario
    validator: (value: Severity) => {
      // Añade un validador para asegurar valores correctos
      return Object.values(Severity).includes(value);
    },
  },
});
</script>
<template>
  <div>
    <CircleCheckBig
      v-if="severity == 'success'"
      color="oklch(90.5% 0.093 164.15)"
    />
    <OctagonAlert
      v-if="severity == 'error'"
      color="oklch(64.5% 0.246 16.439)"
    />
    <Info v-if="severity == 'info'" color="oklch(82.8% 0.111 230.318)" />
  </div>
</template>
<style scoped></style>
