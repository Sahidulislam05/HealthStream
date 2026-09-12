import z from "zod";

const PatientRegistrantionZodSchema = z.object({
	name: z
		.string("Not a string!")
		.min(3, "Name must atleast 3 characters long!")
		.max(10),
	email: z.email("Not email"),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters long.")
		.max(32, "Password cannot exceed 32 characters.")
		.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
		.regex(/[a-z]/, "Password must contain at least one lowercase letter")
		.regex(/[0-9]/, "Password must contain at least one number")
		.regex(
			/[^A-Za-z0-9]/,
			"Password must contain at least one special character",
		),
	patient: z
		.object({
			contactNumber: z.string().optional(),
		})
		.optional(),
});

const PatientEmailVerifyZodSchema = z.object({
	email: z.email("Not email"),
	otp: z.string().length(6),
});

const LoginZodSchema = z.object({
	email: z.email("Provide an email"),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters long.")
		.max(32, "Password cannot exceed 32 characters.")
		.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
		.regex(/[a-z]/, "Password must contain at least one lowercase letter")
		.regex(/[0-9]/, "Password must contain at least one number")
		.regex(
			/[^A-Za-z0-9]/,
			"Password must contain at least one special character",
		),
});

const ForgotPasswordZodSchema = z.object({
	email: z.email("Provide an email"),
});

const ResetPasswordZodSchema = z.object({
	email: z.email("Provide an email"),
	newPassword: z
		.string()
		.min(8, "Password must be at least 8 characters long.")
		.max(32, "Password cannot exceed 32 characters.")
		.regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
		.regex(/[a-z]/, "Password must contain at least one lowercase letter.")
		.regex(/[0-9]/, "Password must contain at least one number.")
		.regex(
			/[^A-Za-z0-9]/,
			"Password must contain at least one special character.",
		),
	otp: z.string().length(6),
});

export const UserValidation = {
	PatientRegistrantionZodSchema,
	LoginZodSchema,
	ForgotPasswordZodSchema,
	ResetPasswordZodSchema,
	PatientEmailVerifyZodSchema,
};
