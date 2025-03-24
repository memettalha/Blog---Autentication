import User from '../models/user.js';
import { generateAccessToken, generateRefreshToken } from '../utils/jwtUtils.js';
import RefreshToken from '../models/refreshToken.js';

export const register = async (req, res) => {
    try {
        const { name, userName, password } = req.body;
        const user = await User.create(name, userName, password);
        const accessToken = generateAccessToken(user.id, user.role);
        const refreshToken = generateRefreshToken(user.id);
        await RefreshToken.create(user.id, new Date(Date.now() + 1000 * 60 * 60 * 24 * 7));
        res.status(201).json({ accessToken, refreshToken });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Hata oldu' });
    }
};
