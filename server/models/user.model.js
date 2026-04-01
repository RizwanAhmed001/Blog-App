import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    password: { type: String, required: true,  minlength: 6 },
  },
  {
    timestamps: true
  },
);

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
