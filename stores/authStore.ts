import { authClient } from "~/lib/auth-client";

export const useAuthStore = defineStore("authStore", () => {
  const session = authClient.useSession();

  const user = computed(() => session.value.data?.user);

  return { user };
});
