import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, "name must be at least 3 character")
    .nonempty("please enter name"),
  email: z
    .email()
    .min(3, "email must be minimum of 3 characters")
    .nonempty("please enter email"),
  password: z
    .string()
    .min(4, "password must be at least 4 characters")
    .nonempty("please enter password"),
});

export type RegisterType = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().nonempty("Email is required"),
  password: z.string().nonempty("Password is required"),
});

export type LoginTypes = z.infer<typeof loginSchema>;
