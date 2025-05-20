import { db, reviews } from "~/lib/db";
import { uploadRouter } from "../uploadthing";

export default defineEventHandler(async (event) => {
  const formData = await readFormData(event);
  const data = Object.fromEntries(formData.entries());

  const image = data.image as File;

  if (!image) {
    throw createError({
      statusCode: 400,
      statusMessage: "Image is required",
    });
  }

  const imageName = `${Date.now()}-${image.name}`;

  const { title, description, review, rating } = data;

  if (!title || !description || !rating) {
    throw createError({
      statusCode: 400,
      statusMessage: "Title, description, and rating are required",
    });
  }
  const ratingNumber = parseInt(rating as string, 10);

  try {
    const newReview = await db
      .insert(reviews)
      .values({
        title: title as string,
        description: description as string,
        review: review as string,
        rating: ratingNumber,
        imageUrl: imageName,
      })
      .returning();

    console.log("newReview", newReview);

    return newReview;
  } catch (error: any) {
    console.error("Drizzle error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to create review",
    });
  }
});
