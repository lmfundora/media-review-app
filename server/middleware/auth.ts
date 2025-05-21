import { auth } from "~/lib/auth";

export default defineEventHandler(async (event) => {
  if (event.path.startsWith("/home")) {
    const session = await auth.api.getSession({
      headers: event.headers,
    });

    console.log("siuu");

    if (!session) {
      return sendRedirect(event, "/login", 302);
    }
  }
});
