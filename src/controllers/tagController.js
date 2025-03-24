import Tag from "../models/tag";

export  const getTags= async (req, res) => {
    try {
        const tags = await Tag.getAll();
        res.json(tags);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Hata oldu" });
    }
};