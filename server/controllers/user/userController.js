const User = require("../../models/usersMdl");
const Workout = require("../../models/workoutMdl");
const Level = require("../../models/levelsMdl");
const { TRAINER_ROLE } = require("../../constants/roles")

const trainers = async(req,res)=>{
    try {
        // const level = Level.findOne({name:"Beginner"})
        // const trainersList = await Workout.aggregate([
        //     {$match:{status:true,difficultyLevel:level._id}},
        //     {
        //         $lookup: {
        //             from: "users",
        //             localField: "trainerId",
        //             foreignField: "_id",
        //             as: "users",
        //         }
        //     },
        //     {$project:{workoutTitle:1,description:1,video:1,thumbnailImage:1,totalDuration:1,viewers:1
        //     ,createdAt:1,users:{firstName:1,email:1,profilePic:1,coverPhoto:1,lastName:1}}},
        //     {$limit:10},{$sort:{createdAt:1}}
        // ])
        // console.log(trainersList);
        const trainersList = await User.find({isActive:true,role:TRAINER_ROLE})
        return res.status(200).json({ trainers: trainersList });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}


module.exports = {
    trainers,
};