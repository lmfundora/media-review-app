<script setup lang="ts">
import { z } from "zod";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { useToast } from "primevue/usetoast";
import { authClient } from "@/lib/auth-client"; //import the auth client

const toast = useToast();
const router = useRouter();
const loading = ref(false);

const initialValues = ref({
  email: "",
  password: "",
});
const resolver = ref(
  zodResolver(
    z.object({
      email: z.string().email({ message: "Invalid email." }),
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
const onFormSubmit = async (formData: any) => {
  if (formData.valid) {
    const { data, error } = await authClient.signIn.email(
      {
        email: formData.values.email,
        password: formData.values.password,
        // callbackURL: "/home",
        rememberMe: true,
      },
      {
        onRequest: (ctx) => {
          loading.value = true; //show loading
        },
        onSuccess: (ctx) => {
          //redirect to the dashboard or sign in page
          loading.value = false; //show loading
          router.push({ name: "home" });
        },
        onError: (ctx) => {
          // display the error message
          toast.add({
            severity: "error",
            detail: ctx.error.message,
            summary: "Ups something whent wrong",
            life: 3000,
          });
          loading.value = false; //show loading
        },
      },
    );
    if (error == null) {
      toast.add({
        severity: "success",
        detail: "Your have signed in successfully.",
        summary: `Wellcome back ${data.user.name}.`,
        life: 3000,
      });
    }
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
