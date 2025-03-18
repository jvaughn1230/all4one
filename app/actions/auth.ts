"use server";
import {
  SignupFormSchema,
  SignupFormState,
  LoginFormSchema,
  LoginFormState,
} from "@/lib/definitions";
import { createUser, loginUser } from "@/lib/auth";
import { createSession } from "@/lib/session";

export async function signup(formState: SignupFormState, formData: FormData) {
  //validate fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  //   Call DB to Create User
  const { name, email, password } = validatedFields.data;

  const user = await createUser(name, email, password);

  await createSession(user._id);
}

export async function login(formState: LoginFormState, formData: FormData) {
  // Validate Fields
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Call DB to Login User
  const { email, password } = validatedFields.data;
  const user = await loginUser(email, password);
  await createSession(user._id);
}
