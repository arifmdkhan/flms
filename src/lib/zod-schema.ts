import z from "zod";
export const courseLevels = ["Beginner", "Intermediate", "Advanced"] as const;

export const CourseStatus = ["Draft", "Published", "Achieved"] as const;
export const courseCategories = [
  "Stock",
  "Options",
  "Commodities",
  "Forex",
  "Crypto",
] as const;

export const courseSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(100, { message: "Title must not be more than 100 characters" }),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters long" }),
  fileKey: z.string().min(1, { message: "File key is required" }),
  price: z.coerce
    .number({ message: "Price must be a valid number" })
    .min(0, { message: "Price must be at least 0" }),
  duration: z.coerce
    .number({ message: "Duration must be a valid number" })
    .min(1, { message: "Duration must be at least 1" })
    .max(100, { message: "Duration must not exceed 100" }),
  level: z.enum(courseLevels, {
    message: "Level must be one of the valid course levels",
  }),
  category: z.enum(courseCategories, { message: "Category is required" }),
  smallDescription: z
    .string()
    .min(3, { message: "Small description must be at least 3 characters long" })
    .max(200, { message: "Small description must not exceed 200 characters" }),
  slug: z
    .string()
    .min(3, { message: "Slug must be at least 3 characters long" }),
  status: z.enum(CourseStatus, {
    message: "Status must be one of the valid course statuses",
  }),
});

export type CourseSchemaType = z.infer<typeof courseSchema>;
