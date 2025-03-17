import bcrypt from "bcrypt";
import { User } from "../models/userModel.js";

export const signup = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const userExists = await User.findOne({ email: email });
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before storing it
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ message: 'Error hashing password' });
        }

        const newUser = { username, email, password: hashedPassword };
        User.create(newUser);
        return res.status(201).json({ message: 'User created successfully' });
    });
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the entered password with the hashed password
    bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err || !isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create a JWT token
        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ message: 'Login successful', token });
    });
};

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json(user);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
};

export const updateUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (username) user.username = username;
        if (password) user.password = password;

        await user.save();
        return res.json({ message: 'User updated successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error updating user', error: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.remove();
        return res.cookie("token", "", { maxAge: 0 }).json({ message: 'User deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};

export const logout = (req, res) => {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({ message: 'Logged out successfully' });
};
