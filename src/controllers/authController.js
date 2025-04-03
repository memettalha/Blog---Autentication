import User from '../models/user.js';
import { generateAccessToken, generateRefreshToken,verifyRefreshToken } from '../utils/jwtUtils.js';
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


export const login = async (req,res) => {
    try {
        const {userName,password} = req.body
        const user = await User.getByUserName(userName)
        if(!user){
            res.status(404).json({message:"Kullanıcı bulunamadı"})
        }
        if(!(await argon2.verify(user.hashed_password,password))){
            res.status(404).json({message:"Parola Yanlış"})
        }
        const accessToken = generateAccessToken(user.id,user.role)
        const refreshToken = generateRefreshToken(user.id)
        RefreshToken.create(user.id,new Date(Date.now()+1000*60*60*24))
        res.status(200).json({ accessToken, refreshToken })

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Hata oldu" })
    }
}

export const refreshAccessToken = async (req,res) => {
    try {
        const {refreshToken} = req.body
        const decodedRefreshToken = verifyRefreshToken(refreshToken)
        if(!decodedRefreshToken){
            return res.status(400).json({message:"Geçersiz refresh token"})
        }
        const user = User.getById(decodedRefreshToken.userId)
        const refreshTokenRecord =  RefreshToken.check(decodedRefreshToken.userId)
        if(!refreshTokenRecord){
            return res.status(400).json({message:"Zamanı geçmiş veya iptal edilmiş refresh token"})
        }
        RefreshToken.cancel(decodedRefreshToken.userId)
        const newAccessToken = generateAccessToken(user.id,user.role)
        const newRefreshToken = generateRefreshToken(user.id)
        RefreshToken.create(user.id,new Date(Date.now()+1000*60*60*24))
        res.status(200).json({ newAccessToken, newRefreshToken })

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Hata oldu" })
    }
}

export const authMe = async (req,res) => {
    try {
        
        res.status(200).json( req.user )

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Hata oldu" })
    }
}
