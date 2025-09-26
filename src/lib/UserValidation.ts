import * as z from "zod";

const userSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    surname: z.string().min(1, "Surname is required"),
    email: z
      .string() 
      .min(1, "Email is required")
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email is not vaild"),
    password: z
      .string()
      .min(8, "Password should be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must include uppercase, lowercase, number & special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
const vendorSchema = z.object({
  name: z.string().min(2, "Vendor name is too short"),
  description: z.string().optional(),
  logo: z.string().optional(),
});

export const formSchema = z.object({
  user: userSchema,
  vendor: vendorSchema.optional(),
});
export type UserFormData = z.infer<typeof formSchema>;
