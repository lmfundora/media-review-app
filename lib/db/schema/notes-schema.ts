import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  review: text("review"),
  rating: integer("rating").$type<1 | 2 | 3 | 4 | 5>(), // Usa un tipo más específico
  imageUrl: text("image_url"), // Cambiado a imageUrl
  isFavorite: boolean("is_favorite").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const reviewsScehma = createInsertSchema(reviews, {
  title: (value) => value.min(1),
  description: (value) => value.min(1),
}).omit({
  id: true,
  createdAt: true,
  isFavorite: true,
});
