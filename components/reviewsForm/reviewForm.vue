<script setup lang="ts">
import { Eraser, Image, Plus } from "lucide-vue-next";
import type { FileUploadSelectEvent } from "primevue/fileupload";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { reviewsScehma } from "~/lib/db/schema/notes-schema";
import { useToast } from "primevue/usetoast";

const files = ref<FileUploadSelectEvent["files"]>([]);
const selectedFile = computed(() => files.value[files.value.length - 1]);
const isSubmitting = ref(false);
const toast = useToast();

const initialValues = ref({
  title: "",
  description: "",
  review: "",
  rating: undefined,
  image: undefined,
});

const resolver = ref(zodResolver(reviewsScehma));

const onSubmit = (values: any) => {
  console.log("Form values", values);
};

const onSelectedFiles = (event: FileUploadSelectEvent) => {
  files.value = event.files;
};
</script>
<template>
  <div class="flex w-full gap-8 mt-3 h-full">
    <div class="w-1/3">
      <FileUpload
        name="image"
        accept="image/*"
        :maxFileSize="1000000"
        @select="onSelectedFiles"
      >
        <template #header="{ chooseCallback, clearCallback, files }">
          <div class="flex w-full justify-between items-center gap-4">
            <Button
              @click="chooseCallback()"
              label="Add"
              severity="secondary"
              class="w-full"
            >
              <template #icon>
                <Plus color="var(--color-t-accent)" :size="20" />
              </template>
            </Button>
            <Button
              @click="clearCallback()"
              label="Clear"
              severity="secondary"
              class="w-full"
              :disabled="!files || files.length === 0"
            >
              <template #icon>
                <Eraser color="var(--color-error)" :size="20" />
              </template>
            </Button>
          </div>
        </template>
        <template #content="{ files }">
          <div
            v-if="files.length > 0"
            class="flex flex-col justify-center gap-8 pt-4 w-full min-h-[300px] max-h-full"
          >
            <div
              :key="selectedFile.name + selectedFile.type + selectedFile.size"
              class="p-8 rounded-2xl flex w-full flex-col border border-t-primary items-center gap-4"
            >
              <div>
                <img
                  role="presentation"
                  :alt="selectedFile.name"
                  :src="selectedFile.objectURL"
                  width="50"
                  height="100"
                />
              </div>
              <span
                class="font-semibold text-t-primary text-ellipsis w-[90%] whitespace-nowrap overflow-hidden"
                >{{ selectedFile.name }}</span
              >
            </div>
          </div>
        </template>
        <template #empty>
          <div class="flex items-center justify-center flex-col h-full">
            <Image :size="50" color="var(--color-t-primary)" />
            <p class="mt-6 text-center mb-0 text-t-primary">
              Drag and drop files to here to upload.
            </p>
          </div>
        </template>
      </FileUpload>
    </div>
    <Form
      v-slot="$form"
      :initialValues="initialValues"
      :resolver="resolver"
      @submit="onSubmit"
      class="w-2/3 flex flex-col gap-4 h-full"
    >
      <div class="flex w-full justify-between items-center">
        <div class="w-full">
          <div class="flex w-full items-center justify-between">
            <label for="title" class="block text-t-primary font-semibold mb-2"
              >Title</label
            >
            <div>
              <Rating name="rating" :cancel="false" />
              <Message
                v-if="$form.rating?.invalid"
                severity="error"
                size="small"
                variant="simple"
                >{{ $form.rating.error?.message }}</Message
              >
            </div>
          </div>
          <InputText name="title" type="text" class="w-full" />
          <Message
            v-if="$form.title?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.title.error.message }}</Message
          >
        </div>
      </div>
      <div class="field">
        <label for="description" class="block text-t-primary font-semibold mb-2"
          >Description</label
        >
        <Textarea name="description" class="w-full" rows="3" />
        <Message
          v-if="$form.description?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $form.description.error.message }}</Message
        >
      </div>
      <div class="field">
        <label for="review" class="block text-t-primary font-semibold mb-2"
          >Review</label
        >
        <Textarea name="review" class="w-full" rows="5" />
        <Message
          v-if="$form.review?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $form.review.error.message }}</Message
        >
      </div>
      <Button type="submit" label="Submit" :disabled="isSubmitting" />
    </Form>
  </div>
</template>

<style scoped>
.p-fileupload {
  height: 100%;
}
</style>
