import express from "express";
import User from "../models/User.js";
import calculateMatchScore from "../utils/matchScore.js";

const router = express.Router();

router.post("/:id", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.id);

    const users = await User.find({
      _id: { $ne: currentUser._id },
    });

    const matches = users
      .map((user) => ({
        user,
        score: calculateMatchScore(currentUser, user),
      }))
      .sort((a, b) => b.score - a.score);

    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;