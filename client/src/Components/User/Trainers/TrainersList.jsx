import React, { useState, useEffect } from "react";
import axios from "../../../config/axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../../constants/urls";
import { useNavigate } from "react-router-dom";
import { trainerDetails } from "../../redux-toolkit/slices/trainerSlice";

const TrainersList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [trainers, setTrainers] = useState([]);
    const user = useSelector((state) => state.loggedUser.userInfo)
    useEffect(() => {
        (async () => {
            const fetchTrainers = await axios.get(`api/user/trainers?userId=${ user._id }`)
            setTrainers(fetchTrainers.data.trainers);
        })()
    }, []);

    const showTrainerDetails = (trainer) => {
        dispatch(trainerDetails(trainer))
        navigate(`/user/trainer/details/${ trainer._id }`)
    }

    return (
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            { trainers.map((trainer, index) => (
                <div className="w-[165px] h-[210px] md:w-[250x] mx-10 my-8 py- rounded-md flex items-center justify-center cursor-pointer" key={ index } onClick={ () => showTrainerDetails(trainer) }>
                    <div className="text-center px-14">
                        <div className="flex justify-center px-5 -mt-12">
                            <img
                                className="w-full h-[134px] p-2 rounded-full"
                                src={ `${ BASE_URL }/user/${ trainer.profilePic ? trainer.profilePic : trainer.user.profilePic }` }
                                alt=""
                            />
                        </div>

                        <h2 className="text-white py-20 text-base font-medium uppercase leading-3">{ trainer.firstName ? trainer.firstName : trainer.user.firstName } { trainer.lastName ? trainer.lastName : trainer.user.lastName }</h2>
                    </div>
                </div>
            ))

            }
        </div>
    );
}

export default TrainersList;
