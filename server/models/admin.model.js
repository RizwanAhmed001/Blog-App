import mongoose from "mongoose";

const adminSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 20,
      trim: true,
      match: [
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@#$%^&*!]{6,}$/,
        "Password must contain at least one letter and one number",
      ],
    },
  },
  {
    timestamps: true,
  },
);

const AdminModel =
  mongoose.models.Admin || mongoose.model("Admin", adminSchema);

export default AdminModel;
