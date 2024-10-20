import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: true,
      trim: true,
      maxLength: [30, "Name must be under 30 character"],
      minLength: [3, "Name contains atlist 3 character"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      validate: {
        validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
        message: "Please enater a valid email",
      },
    },
    companyName: {
      type: String,
      unique: true,
      required: [true, "Company name is required"],
      trim: true,
    },
    phoneNumber: {
      type: Number,
      required: [true, "Phone number is required"],
      trim: true,
      unique: true,
      maxLength: [10, "Phone number bust be 10 number long"],
      minLength: [10, "Phone number must contain 10 number"],
    },
    employeeSize: {
      type: Number,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);

export default User;
