import { z } from "zod";

export const adminSignUpSchema = z.object({
  email: z
    .string({
      required_error: "Email is required!",
      invalid_type_error: "Email must be given!",
    })
    .email("Incorrect email format!"),
  password: z
    .string({
      required_error: "Password is required!",
      invalid_type_error: "Password must be given!",
    })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must be at least 8 characters long and contain both letters and numbers",
    ),
});
