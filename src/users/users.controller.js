const User = require("./users.model");
const bcrypt = require("bcrypt");

// Register account
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashed
    });

    res.json({ success: true, userId: user._id });
  } catch (err) {
    res.status(400).json({ error: "User already exists" });
  }
};

// Login to account
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: "Invalid credentials" });

  res.json({
    success: true,
    userId: user._id,
    username: user.username
  });
};
