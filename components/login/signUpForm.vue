<script setup lang="ts">
import { z } from "zod";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { useToast } from "primevue/usetoast";
import { authClient } from "@/lib/auth-client"; //import the auth client
import type {
  FormFieldPassThroughAttributes,
  FormFieldPassThroughOptions,
} from "@primevue/forms/formfield";

const toast = useToast();
const loading = ref(false);

const initialValues = ref({
  email: "",
  name: "",
  password: "",
});
const resolver = ref(
  zodResolver(
    z.object({
      email: z.string().email({ message: "Invalid email." }),
      name: z.string(),
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
        .refine((value: any) => /\d/.test(value), {
          message: "Must have a number.",
        }),
    }),
  ),
);

// To complete
const onFormSubmit = async (formData: any) => {
  if (formData.valid) {
    const { data, error } = await authClient.signUp.email(
      {
        email: formData.email, // user email address
        password: formData.password, // user password -> min 8 characters by default
        name: formData.name, // user display name
        callbackURL: "/dashboard", // A URL to redirect to after the user verifies their email (optional)
      },
      {
        onRequest: (ctx) => {
          loading.value = true; //show loading
        },
        onSuccess: (ctx) => {
          //redirect to the dashboard or sign in page
          toast.add({
            severity: "success",
            detail: "Acount created",
            summary: "Your acount was created successfully.",
            life: 3000,
          });
          loading.value = false; //show loading
        },
        onError: (ctx) => {
          // display the error message
          alert(ctx.error.message);
          toast.add({
            severity: "error",
            detail: "Ups something whent wrong",
            summary: ctx.error.message,
            life: 3000,
          });
          loading.value = false; //show loading
        },
      },
    );
  }
};
</script>
<template>
  <Form
    v-slot="$form"
    :initialValues
    :resolver="resolver"
    @submit="onFormSubmit"
    class="flex flex-col gap-6 w-full"
  >
    <div class="flex flex-col gap-4">
      <div>
        <InputText name="name" type="text" placeholder="Name" fluid />
        <Message
          v-if="$form.name?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $form.name.error.message }}</Message
        >
      </div>
      <div>
        <InputText name="email" type="text" placeholder="Email" fluid />
        <Message
          v-if="$form.email?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $form.email.error.message }}</Message
        >
      </div>
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
    <Button
      type="submit"
      severity="primary"
      label="Submit"
      :loading="loading"
    />
  </Form>
</template>
<style scoped></style>
