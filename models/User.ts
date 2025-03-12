import mongoose, { Schema, model, models } from "mongoose";

export interface Users extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
}

const UserSchema = new Schema<Users>(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export const User = models.User || model<Users>("User", UserSchema);
