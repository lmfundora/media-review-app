<script setup lang="ts">
import type { User } from "~/lib/auth";
import { LogOut } from "lucide-vue-next";
import { authClient } from "~/lib/auth-client";

defineProps({
  user: {
    type: Object as () => User,
    required: false,
  },
});

const router = useRouter();
const menu = ref();
const toggle = (event: Event) => {
  menu.value.toggle(event);
};

async function singOut() {
  await authClient.signOut();
  router.push("/");
}
</script>
<template>
  <div class="flex items-center">
    <Avatar
      :image="user?.image || '/124599.jpeg'"
      class="mr-2 cursor-pointer"
      shape="circle"
      @click="toggle"
      aria-haspopup="true"
      aria-controls="overlay_menu"
    />
    <Menu ref="menu" id="overlay_menu" :popup="true" class="p-4">
      <template #start>
        <div class="flex items-center gap-2">
          <Avatar
            :image="user?.image || '/124599.jpeg'"
            class="mr-2"
            shape="circle"
          />
          <div class="">
            <h2 class="text-xl text-t-primary font-semibold">
              {{ user?.name }}
            </h2>
            <p class="text-sm text-t-secondary">{{ user?.email }}</p>
          </div>
        </div>
      </template>
      <template #end>
        <Button
          class="w-full mt-2"
          label="Sing Out"
          severity="secondary"
          @click="singOut"
        >
          <template #icon>
            <LogOut />
          </template>
        </Button>
      </template>
    </Menu>
  </div>
</template>
<style scoped></style>
