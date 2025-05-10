const { User, Token } = require("../models");
const { generateToken, generateEmailToken } = require("../utils/tokenService");
const { sendVerificationEmail } = require("../utils/emailService");

// Register Customer
const registerCustomer = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      role: "customer",
    });

    const emailToken = generateEmailToken();
    await Token.create({ token: emailToken, userId: user.id });
    await sendVerificationEmail(email, emailToken);

    res.status(201).json({
      message:
        "Registration successful. Please check your email for verification.",
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Registration failed. Please try again." });
  }
};

// Register Admin
const registerAdmin = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      role: "admin",
    });

    const emailToken = generateEmailToken();
    await Token.create({ token: emailToken, userId: user.id });
    await sendVerificationEmail(email, emailToken);

    res.status(201).json({
      message:
        "Admin registration successful. Please check your email for verification.",
    });
  } catch (error) {
    console.error("Admin registration error:", error);
    res
      .status(500)
      .json({ message: "Admin registration failed. Please try again." });
  }
};

// Login Admin
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({
        message:
          "You are not allowed to login from here. Please use the customer login.",
      });
    }

    if (!(await user.validPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        message:
          "Please verify your email first. Check your inbox for the verification link.",
      });
    }

    const token = generateToken(user.id);
    res.json({
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed. Please try again." });
  }
};

// Verify Email
const verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    const tokenRecord = await Token.findOne({
      where: { token },
      include: [User],
    });

    if (!tokenRecord) {
      return res
        .status(400)
        .json({ message: "Invalid or expired verification link" });
    }

    const user = tokenRecord.User;
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isVerified = true;
    await user.save();
    await tokenRecord.destroy();

    res.json({
      success: true,
      message: "Email verified successfully! You can now login.",
    });
  } catch (error) {
    console.error("Verification error:", error);
    res
      .status(500)
      .json({ message: "Email verification failed. Please try again." });
  }
};

module.exports = {
  registerCustomer,
  registerAdmin,
  loginAdmin,
  verifyEmail,
};
