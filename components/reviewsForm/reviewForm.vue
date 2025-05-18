<script setup lang="ts">
import { Eraser, Image, Plus, X, Heart } from "lucide-vue-next";
import type { FileUploadSelectEvent } from "primevue/fileupload";
import { ref, computed } from "vue";

const files = ref<FileUploadSelectEvent["files"]>([]);
const selectedFile = computed(() => files.value[files.value.length - 1]);
const toast = useToast();

const title = ref("");
const description = ref("");
const review = ref("");
const rating = ref<number | undefined>();
const isFavorite = ref(false);

const onSelectedFiles = (event: FileUploadSelectEvent) => {
  files.value = event.files;
};
</script>
<template>
  <div class="flex w-full mt-8">
    <div class="w-1/4">
      <FileUpload
        name="demo"
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
            class="flex flex-col justify-center gap-8 pt-4 w-full min-h-[300px]"
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
          <div class="flex items-center justify-center flex-col min-h-[300px]">
            <Image :size="50" color="var(--color-t-primary)" />
            <p class="mt-6 text-center mb-0 text-t-primary">
              Drag and drop files to here to upload.
            </p>
          </div>
        </template>
      </FileUpload>
    </div>
    <div class="w-3/4 flex flex-col gap-4 ps-26">
      <div class="flex w-full justify-between items-center">
        <div class="w-full">
          <div class="flex w-full items-center justify-between">
            <label for="title" class="block text-t-primary font-semibold mb-2"
              >Title</label
            >
            <Rating v-model="rating" :cancel="false" />
          </div>
          <InputText id="title" type="text" class="w-full" v-model="title" />
        </div>
      </div>
      <div class="field">
        <label for="description" class="block text-t-primary font-semibold mb-2"
          >Description</label
        >
        <Textarea
          id="description"
          class="w-full"
          v-model="description"
          rows="3"
        />
      </div>
      <div class="field">
        <label for="review" class="block text-t-primary font-semibold mb-2"
          >Review</label
        >
        <Textarea id="review" class="w-full" v-model="review" rows="5" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
