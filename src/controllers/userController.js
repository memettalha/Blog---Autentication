import User from "../models/user.js";


export const createUser  = async (req,res) => {
    try {
        const {name,userName,password} = req.body
        const user = await User.create(name,userName,password)
        res.status(201).json(user)
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Hata oldu" });
    }
}