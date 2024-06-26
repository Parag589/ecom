const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret_key';

exports.signup = async (req, res) => {
    const { usernames, passwords, role } = req.body;
    let username = usernames;
    let password = passwords;

    if (!username || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    const userExists = await User.findOne({ username });

    if (userExists) {
        return res.status(400).json({ msg: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        username,
        password: hashedPassword,
        role
    });

    await newUser.save();

    res.status(201).json({ msg: 'User created successfully' });
};

exports.signin = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    const user = await User.findOne({ username });

    if (!user) {
        return res.status(400).json({ msg: 'User does not exist' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user: { id: user._id, username: user.username, role: user.role } });
};

exports.getUser = async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
};
