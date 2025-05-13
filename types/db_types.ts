import { user } from "~/lib/db/schema/auth-schema";

export type User = typeof user.$inferSelect;
