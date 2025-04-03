import { verifyAccessToken } from "../utils/jwtUtils.js"
import User from "../models/user.js"

export const authentication = async (req,res,next) => {
    const token = req.headers['authorization']?.split(' ')[1]
    if(!token){
        return res.status(401).json({message:"Invalid access key"})
    }
    try {
        const decoded = verifyAccessToken(token)
        if(!decoded){
            return res.status(401).json({message:"Invalid access key"})
        }
        const user = await User.getById(decoded.userId)
        req.user = user
        next()
    } catch (error) {
        return res.status(401).json({message:"Invalid access key"})
    }
}