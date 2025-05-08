<script setup lang="ts">
import { z } from "zod";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { useToast } from "primevue/usetoast";

const toast = useToast();

const initialValues = ref({
  username: "",
  password: "",
});
const resolver = ref(
  zodResolver(
    z.object({
      username: z.string().min(1, { message: "Username is required via Zod." }),
      password: z
        .string()
        .min(3, { message: "Minimum 3 characters." })
        .max(8, { message: "Maximum 8 characters." })
        .refine((value: any) => /[a-z]/.test(value), {
          message: "Must have a lowercase letter.",
        })
        .refine((value: any) => /[A-Z]/.test(value), {
          message: "Must have an uppercase letter.",
        })
        .refine((value: any) => /d/.test(value), {
          message: "Must have a number.",
        }),
    }),
  ),
);
const onFormSubmit = ({ valid }: { valid: boolean }) => {
  if (valid) {
    toast.add({
      severity: "success",
      detail: "Form is valid.",
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
      <div class="flex flex-col gap-1">
        <Password
          name="password"
          placeholder="Password"
          toggleMask
          :feedback="false"
          fluid
        />
        <template v-if="$form.password?.invalid">
          <Message
            v-for="(error, index) of $form.password.errors"
            :key="index"
            severity="error"
            size="small"
            variant="simple"
            >{{ error.message }}</Message
          >
        </template>
      </div>
    </div>
    <Button type="submit" severity="primary" label="Submit" />
  </Form>
</template>
<style scoped></style>
