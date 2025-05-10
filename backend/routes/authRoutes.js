const express = require("express");
const router = express.Router();
const {
  registerCustomer,
  registerAdmin,
  loginAdmin,
  verifyEmail,
} = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");

// Test route
router.get("/test", (req, res) => {
  res.json({ message: "Auth routes are working!" });
});

router.post("/register/customer", registerCustomer);
router.post("/register/admin", registerAdmin);
router.post("/login/admin", loginAdmin);
router.get("/verify-email", verifyEmail);

module.exports = router;
