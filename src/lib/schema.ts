import * as z from 'zod';

export const gameSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(60, "Title must be less than 60 characters"),
  developerId: z.string().min(1, "Developer ID is required"),
  genreId: z.coerce
    .number({
      required_error: "Genre ID is required",
      invalid_type_error: "Genre ID must be a number",
    })
    .min(1, "Genre ID is required"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    price: z.coerce
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
    })
});
  

