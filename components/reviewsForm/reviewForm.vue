<script setup lang="ts">
import { Eraser, Image, Plus, Send } from "lucide-vue-next";
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

const { width } = useWindowSize();

const resolver = ref(zodResolver(reviewsScehma));

const { startUpload } = useUploadThing("imageUploader", {
  onClientUploadComplete(res) {
    console.log(`onClientUploadComplete`, res);
  },
  onUploadError: (error) => {
    console.error(error, error.cause);
    alert("Upload failed");
  },
});

const onSubmit = async (formData: any) => {
  if (!formData.valid) return;

  isSubmitting.value = true;
  const formValues = formData.values;
  const newFormData = new FormData();
  for (const key in formValues) {
    newFormData.append(key, formValues[key]);
  }

  if (selectedFile.value) {
    newFormData.append("image", selectedFile.value, selectedFile.value.name);
  }

  try {
    await startUpload([selectedFile.value]);
    // const response = await $fetch("/api/reviews", {
    //   method: "POST",
    //   body: newFormData,
    // });
    // console.log("API Response:", response);
    // toast.add({
    //   severity: "success",
    //   summary: "Success",
    //   detail: "Review submitted successfully.",
    //   life: 3000,
    // });
  } catch (error: any) {
    console.error("API Error:", error);
    toast.add({
      severity: "error",
      summary: "Error",
      detail: error.message || "Failed to submit review.",
      life: 3000,
    });
  } finally {
    isSubmitting.value = false;
  }
};

const onSelectedFiles = (event: FileUploadSelectEvent) => {
  files.value = event.files;
};
</script>
<template>
  <div class="flex flex-col sm:flex-row w-full gap-12 mt-3 h-full">
    <div class="w-full sm:w-1/3 flex flex-col flex-grow">
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
            class="flex flex-col justify-center gap-8 pt-4 w-full min-h-[300px] max-h-[93%]"
          >
            <div
              :key="selectedFile.name + selectedFile.type + selectedFile.size"
              class="p-8 rounded-2xl flex w-full flex-col border border-t-primary border-dashed items-center gap-4"
            >
              <div>
                <NuxtImg
                  role="presentation"
                  :alt="selectedFile.name"
                  :src="selectedFile.objectURL"
                  :width="width / 5"
                />
              </div>
              <span
                class="font-semibold text-t-primary text-center text-ellipsis w-[90%] whitespace-nowrap overflow-hidden"
                >{{ selectedFile.name }}</span
              >
            </div>
          </div>
        </template>
        <template #empty>
          <div
            class="flex items-center justify-center flex-col h-[calc(100vh_-_460px)] sm:h-[calc(100vh_-_260px)] rounded-xl border-1 border-t-primary border-dashed"
          >
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
      class="w-full sm:w-2/3 pb-24 sm:pb-0 flex flex-col gap-4 h-full"
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
        <Textarea name="review" class="w-full" rows="6" />
        <Message
          v-if="$form.review?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $form.review.error.message }}</Message
        >
      </div>
      <div class="flex justify-end">
        <Button
          type="submit"
          class="mt-4"
          label="Save"
          :disabled="isSubmitting || files.length === 0"
        >
          <template #icon>
            <Send color="var(--color-t-primary)" :size="18" />
          </template>
        </Button>
      </div>
    </Form>
  </div>
</template>

<style scoped>
.p-fileupload {
  height: calc(100vh - 150px);
}
@media screen and (max-width: 768px) {
  .p-fileupload {
    height: calc(100vh - 350px); /* Ajusta este valor según tus necesidades */
  }
}
</style>
