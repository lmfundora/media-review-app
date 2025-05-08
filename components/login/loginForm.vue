<script setup lang="ts">
import { z } from "zod";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { useToast } from "primevue/usetoast";

const toast = useToast();

const initialValues = ref({
  username: "",
});
const resolver = ref(
  zodResolver(
    z.object({
      username: z.string().min(1, { message: "Username is required via Zod." }),
    }),
  ),
);
const onFormSubmit = ({ valid }: { valid: boolean }) => {
  if (valid) {
    toast.add({
      severity: "error",
      summary: "Form is submitted.",
      life: 3000,
    });
  }
};
</script>
<template>
  <Form
    v-slot="$form"
    :initialValues
    :resolver="resolver"
    @submit="onFormSubmit"
    class="flex flex-col gap-4 w-full"
  >
    <div class="flex flex-col gap-1">
      <InputText name="username" type="text" placeholder="Username" fluid />
      <Message
        v-if="$form.username?.invalid"
        severity="error"
        size="small"
        variant="simple"
        >{{ $form.username.error.message }}</Message
      >
    </div>
    <Button type="submit" severity="secondary" label="Submit" />
  </Form>
</template>
<style scoped></style>
