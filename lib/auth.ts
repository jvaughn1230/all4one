import bcrypt from "bcryptjs";
import { User } from "@/models/User";
import dbConnect from "./db";

export async function verifyUser(email: string, password: string) {
  await dbConnect();

  const user = await User.findOne({ email });

  if (!user) {
    return null;
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return null;
  }

  return user;
}

export async function createUser(
  name: string,
  email: string,
  password: string
) {
  await dbConnect();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User Already Exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword });

  await newUser.save();
  return newUser;
}

export async function loginUser(email: string, password: string) {
  const user = await verifyUser(email, password);
  if (!user) return { success: false, error: "Invalid email or password" };

  return user;
}
