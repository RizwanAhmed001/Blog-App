import mongoose from "mongoose";

const blogSchema = mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
    image: { type: String, required: true },
    blogtitle: { type: String, required: true, trim: true },
    subtitle: { type: String, required: true, trim: true },
    blogdescription: { type: String, required: true },
    status: { type: Boolean, default: true },
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        comment: {type: String},
      },
    ],
  },
  {
    timestamps: true,
  },
);

const BlogModel = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default BlogModel;
