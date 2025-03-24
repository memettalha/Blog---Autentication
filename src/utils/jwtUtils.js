import jwt from 'jsonwebtoken';

const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

if(!refreshTokenSecret || !accessTokenSecret){
    throw new Error("Refresh Token veya access token erişilemedi")
}

export const generateAccessToken = (userId, role) => {
    return jwt.sign({ userId, role }, accessTokenSecret, { expiresIn: '15m' });
};

export const generateRefreshToken = (userId) => {
    return jwt.sign({ userId }, refreshTokenSecret, { expiresIn: '7d' });
};

export const verifyAccessToken = (token) => {
    try {
        return jwt.verify(token, accessTokenSecret);
    } catch (error) {
        console.log("Access Token erişim hatası:", error)
        return null;
    }
};

export const verifyRefreshToken = (token) => {
    try {
        return jwt.verify(token, refreshTokenSecret);
    } catch (error) {
        console.log("Refresh Token  erişim hatası:", error);
        return null;
    }
};
