import { array, string, z } from "zod";

const envSchema = z.object({
  DATABASE_URL: string(),
  BETTER_AUTH_SECRET: string(),
  BETTER_AUTH_URL: string(),
  GOOGLE_CLIENT_ID: string(),
  GOOGLE_CLIENT_SECRET: string(),
  BETTER_AUTH_TRUSTED_ORIGINS: string(),
  NUXT_UPLOADTHING_TOKEN: string(),
});

export type EnvSchema = z.infer<typeof envSchema>;

export default envSchema.parse(process.env);
