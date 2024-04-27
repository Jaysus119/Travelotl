const express = require("express");

const router = express.Router();
const {
  getUserEmailById,
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/userController");
const { protect } = require("../controllers/auth_controller");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/user", protect, getUser);
router.get("/:id/email", protect, getUserEmailById);
module.exports = router;
