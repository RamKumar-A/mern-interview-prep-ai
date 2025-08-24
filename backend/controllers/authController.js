import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

function generateToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

// access - public
async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    if (req.file) {
      const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${
        req.file.filename
      }`;
      req.body.profileImageUrl = imageUrl;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      profileImageUrl:
        req.body.profileImageUrl ||
        `${req.protocol}://${req.get('host')}/uploads/default-user.jpg`,
    });

    // // Return user data with JWT
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

// access - public
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Please enter your email and password' });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(500).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

async function updatePassword(req, res, next) {
  try {
    const user = await User.findById(req.user.id).select('+password');
    if (
      !(await user.correctPassword(req.body.passwordCurrent, user.password))
    ) {
      return res.status(401).json({
        message: 'Your current password is wrong',
      });
    }

    if (req.body.password !== req.body.passwordConfirm) {
      return res.status(401).json({
        message: 'password and password confirm must be same',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const hashedPasswordConfirm = await bcrypt.hash(
      req.body.passwordConfirm,
      salt
    );

    user.password = hashedPassword;
    user.passwordConfirm = hashedPasswordConfirm;

    await user.save();
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

export { registerUser, loginUser, updatePassword };
