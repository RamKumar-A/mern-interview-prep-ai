import User from '../models/userModel.js';

const filterObj = function (obj, ...allowedFields) {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return obj;
};

async function getMe(req, res) {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

async function updateMe(req, res) {
  try {
    if (req.body.password || req.body.passwordConfirm) {
      return new Error(
        'This route not updating password. Please use / updatePassword'
      );
    }

    const filteredBody = filterObj(
      req.body,
      'name',
      'email',
      'profileImageUrl'
    );

    if (req.file) {
      const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${
        req.file.filename
      }`;
      filteredBody.profileImageUrl = imageUrl;
    }

    const user = await User.findByIdAndUpdate(req.user.id, filteredBody, {
      new: true,
      runValidators: true,
    });

    await user.save();
    res.status(201).json({
      user,
    });
  } catch (err) {
    res.status(500).json({ message: err.message, error: err.message });
  }
}

async function deleteMe(req, res) {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).json({
    user: null,
  });
}

async function createUser(req, res) {
  res.status(500).json({
    message: 'This route is not defined! Please use signup instead.',
  });
}

export { getMe, updateMe, deleteMe, createUser };
