<template>
  <div class="">
    <Toast>
      <template #container="{ message, closeCallback }">
        <section
          class="flex flex-col p-4 gap-4 w-full bg-primary/70 rounded-xl"
        >
          <div class="flex items-center gap-5">
            <i
              class="pi pi-cloud-upload text-white dark:text-black text-2xl"
            ></i>
            <span class="font-bold text-base text-white dark:text-black">{{
              message.severity
            }}</span>
          </div>
          <div class="flex gap-4 mb-4 justify-end">
            <Button
              label="Another Upload?"
              size="small"
              @click="closeCallback"
            ></Button>
            <Button label="Cancel" size="small" @click="closeCallback"></Button>
          </div>
        </section>
      </template>
    </Toast>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
