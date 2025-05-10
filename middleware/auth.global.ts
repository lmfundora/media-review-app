import { authClient } from "@/lib/auth-client"; // import the auth client

const unprotectedRoutes = ["login", "signup", "index"];

// Todo: complete this middleware
export default defineNuxtRouteMiddleware(async (to) => {
  const routName = to.name || "notFounded";

  if (!unprotectedRoutes.includes(routName.toString())) {
    if (import.meta.server) {
      console.log(to);
    }
    // skip middleware on client side entirely
    if (import.meta.client) {
      const { data: session, error } = await authClient.getSession();
      console.log(error);
    }
  }
});
