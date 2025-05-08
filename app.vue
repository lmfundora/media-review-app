<template>
  <div class="">
    <Toast>
      <template #message="{ message }">
        <div class="flex flex-col p-4 gap-4">
          <div class="flex items-center gap-5">
            <CustomToastIconSelector :severity="message.severity" />
            <span class="font-bold text-base text-white dark:text-black">{{
              message.summary
            }}</span>
          </div>
        </div>
      </template>
    </Toast>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
