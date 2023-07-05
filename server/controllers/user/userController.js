const User = require("../../models/usersMdl");
const { TRAINER_ROLE } = require("../../constants/roles")

const trainers = async(req,res)=>{
    try {
        const trainersList = await User.find({isActive:true,role:TRAINER_ROLE})
        return res.status(200).json({ trainers: trainersList });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}


module.exports = {
    trainers,
};