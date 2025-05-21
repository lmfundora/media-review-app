import type { H3Event } from "h3";
import { auth } from "~/lib/auth";

import { createUploadthing } from "uploadthing/h3";
import type { FileRouter } from "uploadthing/h3";

const f = createUploadthing();

export const uploadRouter = {
  uploadthing: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ event }) => {
      // This code runs on your server before upload
      const session = await auth.api.getSession({
        headers: event.headers,
      });

      if (!session) throw new Error("Unauthorized");

      return { session };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
    }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;
