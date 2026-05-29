// routes/userRoutes.js

import express from "express";

import protect from "../middleware/authMiddleware.js";

import { updateProfile }
from "../controllers/userController.js";

import User from "../models/User.js";

const router = express.Router();


// EXISTING PROFILE ROUTE
router.put(
  "/profile",
  protect,
  updateProfile
);


// NEW PREFERENCES ROUTE
router.post(
  "/preferences/:id",

  async (req, res) => {

    try {

      const updatedUser =
        await User.findByIdAndUpdate(

          req.params.id,

          req.body,

          { new: true }
        );

      res.json(updatedUser);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });
    }
  }
);

export default router;