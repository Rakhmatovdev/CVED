import { z } from "zod";

export const makeSchema = (t: any) =>
  z
    .object({
      old_password: z.string().min(1, t("form.required")),
      new_password: z
        .string()
        .min(8, t("validation.password_too_short"))
        .regex(/[a-z]/, t("validation.password_no_lowercase"))
        .regex(/[0-9]/, t("validation.password_no_number"))
        .regex(/[^A-Za-z0-9]/, t("validation.password_no_special"))
        .refine((v) => !/^\d+$/.test(v), {
          message: t("validation.password_only_digits")
        }),
      new_password_confirmation: z.string().min(1, t("form.required"))
    })
    .refine((data) => data.new_password === data.new_password_confirmation, {
      path: ["new_password_confirmation"],
      message: t("validation.password_mismatch")
    });
