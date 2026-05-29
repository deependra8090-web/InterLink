import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
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
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    avatar: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    /* =====================
       AI MATCHING FIELDS
    ===================== */

    interests: {
      type: [String],
      default: [],
    },

    budget: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },

    destinationPreferences: {
      type: [String],
      default: [],
    },

    travelStyle: {
      type: String,
      enum: ["solo", "group", "luxury", "adventure"],
      default: "solo",
    },

    language: {
      type: String,
      default: "",
    },

    age: {
      type: Number,
    },

    foodPreference: {
      type: String,
      enum: ["veg", "non-veg", "vegan"],
      default: "veg",
    },

    preferredTripDuration: {
      type: Number,
      default: 1,
    },

    preferences: {
      travelType: {
        type: String,
        enum: ["mountain", "beach", "city", "adventure", ""],
        default: "",
      },

      season: {
        type: String,
        enum: ["summer", "winter", "monsoon", ""],
        default: "",
      },
    },

    verificationToken: {
      type: String,
    },

    verificationTokenExpires: {
      type: Date,
    },
  },
  { timestamps: true }
);

/* =====================
   HASH PASSWORD
===================== */

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);

  next();
});

/* =====================
   MATCH PASSWORD
===================== */

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;