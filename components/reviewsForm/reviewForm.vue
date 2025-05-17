<script setup lang="ts">
import { Eraser, Image, Plus, X } from "lucide-vue-next";
import type { FileUploadSelectEvent } from "primevue/fileupload";

const files = ref<FileUploadSelectEvent["files"]>([]);
const selectedFile = computed(() => files.value[files.value.length - 1]);
const toast = useToast();

const onRemoveTemplatingFile = (
  removeFileCallback: (index: number) => void,
) => {
  files.value = [];
  removeFileCallback(0);
};

const onSelectedFiles = (event: FileUploadSelectEvent) => {
  files.value = event.files;
};
</script>
<template>
  <div>
    <FileUpload
      name="demo[]"
      url="/api/upload"
      accept="image/*"
      :maxFileSize="1000000"
      @select="onSelectedFiles"
    >
      <template #header="{ chooseCallback, clearCallback, files }">
        <div class="flex flex-wrap justify-between items-center flex-1 gap-4">
          <div class="flex gap-2">
            <Button
              @click="chooseCallback()"
              icon="pi pi-images"
              rounded
              outlined
              severity="primary"
            >
              <template #icon>
                <Plus color="var(--color-t-accent)" :size="20" />
              </template>
            </Button>
            <Button
              @click="clearCallback()"
              icon="pi pi-times"
              rounded
              outlined
              severity="danger"
              :disabled="!files || files.length === 0"
            >
              <template #icon>
                <Eraser color="var(--color-error)" :size="20" />
              </template>
            </Button>
          </div>
        </div>
      </template>
      <template #content="{ files, removeFileCallback }">
        <div class="flex flex-col gap-8 pt-4">
          <div v-if="files.length > 0">
            <div class="flex flex-wrap gap-4">
              <div
                :key="selectedFile.name + selectedFile.type + selectedFile.size"
                class="p-8 rounded-border flex flex-col border border-surface items-center gap-4"
              >
                <div>
                  <img
                    role="presentation"
                    :alt="selectedFile.name"
                    :src="selectedFile.objectURL"
                    width="100"
                    height="50"
                  />
                </div>
                <span
                  class="font-semibold text-ellipsis max-w-60 whitespace-nowrap overflow-hidden"
                  >{{ selectedFile.name }}</span
                >
                <Button
                  icon="pi pi-times"
                  @click="onRemoveTemplatingFile(removeFileCallback)"
                  outlined
                  rounded
                  severity="danger"
                >
                  <template #icon>
                    <X color="var(--color-error)" :size="20" />
                  </template>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #empty>
        <div class="flex items-center justify-center flex-col">
          <Image :size="50" />
          <p class="mt-6 mb-0">Drag and drop files to here to upload.</p>
        </div>
      </template>
    </FileUpload>
  </div>
</template>
<style scoped></style>
