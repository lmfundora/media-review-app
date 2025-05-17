<script setup lang="ts">
import { Eraser, Image, Plus, X } from "lucide-vue-next";
import type { FileUploadSelectEvent } from "primevue/fileupload";

const files = ref<FileUploadSelectEvent["files"]>([]);
const selectedFile = computed(() => files.value[files.value.length - 1]);
const toast = useToast();

const onRemoveTemplatingFile = (
  removeFileCallback: (index: number) => void,
) => {
  removeFileCallback(0);
};

const onSelectedFiles = (event: FileUploadSelectEvent) => {
  files.value = event.files;
};
</script>
<template>
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
</template>
<style scoped></style>
