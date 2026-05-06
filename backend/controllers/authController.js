import User from "../models/User.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";

/* =====================
   GENERATE JWT
===================== */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

/* =====================
   REGISTER (SAFE VERSION)
===================== */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");

    const user = await User.create({
      name,
      email,
      password,
      verificationToken,
      verificationTokenExpires: Date.now() + 24 * 60 * 60 * 1000,
      isVerified: false,
    });

    const verifyUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;

    // ✅ SAFE EMAIL (won’t crash API)
    try {
      await sendEmail({
        to: email,
        subject: "Verify your email - Buddy Finder",
        html: `
          <h2>Welcome to Buddy Finder 👋</h2>
          <p>Please verify your email:</p>
          <a href="${verifyUrl}">${verifyUrl}</a>
          <p>This link will expire in 24 hours.</p>
        `,
      });
    } catch (error) {
      console.error("❌ Email failed during register:", error.message);
    }

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token: generateToken(user._id), // ✅ auto login after register
    });
  } catch (error) {
    console.error("❌ Register Error:", error);
    res.status(500).json({ message: "Registration failed" });
  }
};

/* =====================
   RESEND VERIFICATION EMAIL (SAFE)
===================== */
export const resendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        message: "If this email exists, a verification link has been sent.",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        message: "Email already verified",
      });
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");

    user.verificationToken = verificationToken;
    user.verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000;

    await user.save();

    const verifyUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;

    // ✅ SAFE EMAIL
    try {
      await sendEmail({
        to: email,
        subject: "Verify your email - Buddy Finder",
        html: `
          <h2>Email Verification</h2>
          <p>Click the link below:</p>
          <a href="${verifyUrl}">${verifyUrl}</a>
        `,
      });
    } catch (error) {
      console.error("❌ Email resend failed:", error.message);
    }

    res.json({
      message: "Verification email resent (if email system is working).",
    });
  } catch (error) {
    console.error("❌ Resend Error:", error);
    res.status(500).json({ message: "Failed to resend verification email" });
  }
};

/* =====================
   LOGIN (TEMP: NO VERIFICATION BLOCK)
===================== */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });

    }

    // ❌ TEMP DISABLED (enable later)
    // if (!user.isVerified) {
    //   return res.status(403).json({
    //     message: "Please verify your email before logging in",
    //   });
    // }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        bio: user.bio,
        preferences: user.preferences,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ message: "Login failed" });
  }
};

/* =====================
   VERIFY EMAIL
===================== */
export const verifyEmail = async (req, res) => {
  try {
    const user = await User.findOne({
      verificationToken: req.params.token,
      verificationTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired verification token",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;

    await user.save();

    const token = generateToken(user._id);

    res.status(200).json({
      message: "Email verified successfully 🎉",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        bio: user.bio,
        preferences: user.preferences,
      },
    });
  } catch (error) {
    console.error("❌ Verification Error:", error);
    res.status(500).json({
      message: "Email verification failed",
    });
  }
};

/* =====================
   GET CURRENT USER
===================== */
export const getMe = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
};