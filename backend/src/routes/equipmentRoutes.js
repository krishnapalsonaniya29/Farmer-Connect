import express from "express";
import Equipment from "../models/Equipment.js";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

/* ===============================
   🔐 ADD EQUIPMENT (OWNER)
================================ */
router.post("/", protect, upload.single("image"), async (req, res) => {
  try {
    const { name, category, pricePerDay, description, location } = req.body;

    const equipment = await Equipment.create({
      owner: req.user._id,
      name,
      category,
      pricePerDay,
      description,
      location,
      image: req.file ? req.file.path : "",
    });

    res.status(201).json(equipment);
  } catch (error) {
    console.error("ADD EQUIPMENT ERROR:", error);
    res.status(500).json({ message: "Failed to add equipment" });
  }
});

/* ===============================
   🔐 GET MY EQUIPMENT
================================ */
router.get("/my", protect, async (req, res) => {
  try {
    const equipment = await Equipment.find({
      owner: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(equipment);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch your equipment" });
  }
});

/* ===============================
   🌍 GET ALL EQUIPMENT (PUBLIC)
================================ */
router.get("/", async (req, res) => {
  try {
    const equipment = await Equipment.find({ isAvailable: true })
      .populate("owner", "name phone location")
      .sort({ createdAt: -1 });

    res.json(equipment);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch equipment" });
  }
});

/* ===============================
   🔐 TOGGLE AVAILABILITY
================================ */
router.patch("/:id/toggle", protect, async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id);

    if (!equipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    if (equipment.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    equipment.isAvailable = !equipment.isAvailable;
    await equipment.save();

    res.json(equipment);
  } catch (error) {
    res.status(500).json({ message: "Failed to update availability" });
  }
});

/* ===============================
   🔐 DELETE EQUIPMENT
================================ */
router.delete("/:id", protect, async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id);

    if (!equipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    if (equipment.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await equipment.deleteOne();

    res.json({ message: "Equipment deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete equipment" });
  }
});

export default router;
