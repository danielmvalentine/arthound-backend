const User = require("./users.model");
const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../utils/hash");

// Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// REGISTER
exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const hashed = await hashPassword(password);

    const user = await User.create({
      username,
      email,
      password: hashed,
      role
    });

    const token = generateToken(user);

    res.json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) return res.status(404).json({ error: "User not found" });

    const match = await comparePassword(password, user.password);
    if (!match) return res.status(401).json({ error: "Wrong password" });

    const token = generateToken(user);

    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET SELF PROFILE
exports.getSelf = async (req, res) => {
  const user = await User.findById(req.user.id)
    .populate("followers", "username")
    .populate("following", "username");

  res.json(user);
};

// PUBLIC PROFILE
exports.getById = async (req, res) => {
  const user = await User.findById(req.params.id)
    .select("-password")
    .populate("followers", "username")
    .populate("following", "username");

  res.json(user);
};

// UPDATE PROFILE
exports.updateProfile = async (req, res) => {
  const updates = req.body;

  const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true });
  res.json(user);
};

// FOLLOW
exports.follow = async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, {
    $addToSet: { following: req.params.id }
  });

  await User.findByIdAndUpdate(req.params.id, {
    $addToSet: { followers: req.user.id }
  });

  res.json({ success: true });
};

// UNFOLLOW
exports.unfollow = async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, {
    $pull: { following: req.params.id }
  });

  await User.findByIdAndUpdate(req.params.id, {
    $pull: { followers: req.user.id }
  });

  res.json({ success: true });
};

// CURATOR-ONLY DELETE USER
exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};
