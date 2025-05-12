<script setup lang="ts">

defineProps<{
  user: User;
}>();

const isDialogOpen = ref(false);
</script>
<template>
  <div class="flex items-center">
    <Avatar
      image="/images/avatar/amyelsner.png"
      class="mr-2 cursor-pointer"
      shape="circle"
      @click="isDialogOpen = true"
    />
    <Drawer
      v-model:visible="isDialogOpen"
      header="Right Drawer"
      position="right"
    >
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
    </Drawer>
  </div>
</template>
<style scoped></style>
