import { SignupFormSchema, FormState } from "@/lib/definitions";
import { createUser } from "@/lib/auth";
import { createSession } from "@/lib/session";

export async function signup(formState: FormState, formData: FormData) {
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
