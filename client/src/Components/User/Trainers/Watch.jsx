import { ArrowBackOutlined } from "@mui/icons-material";
import { FaHeart } from 'react-icons/fa';
import { Link, useParams, useNavigate } from "react-router-dom";
import { addOrRemoveFavourites, rateWorkout } from '../../../Services/UserApi';
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import { loggedUserDetails } from "../../redux-toolkit/slices/userSlice";
import { trainerDetails } from "../../redux-toolkit/slices/trainerSlice";
import Rating from "./Rating"

export default function Watch() {
    const [rating, setRating] = useState(0)
    const { workoutVideo, workoutId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.loggedUser.userInfo);
    const trainer = useSelector((state) => state.trainerDetails.trainerInfo)
    const [favourite, setfavourite] = useState(false);

    const [ratingPopup, setRatingPopup] = useState(false)

    useEffect(() => {
        if (user.userFavourites.length > 0) {
            const userFavs = user.userFavourites.filter(
                (item) => item.workoutId === workoutId
            );
            if (userFavs.length > 0) {
                setfavourite(true);
            } else {
                setfavourite(false);
            }
        }
    }, [user.userFavourites, workoutId]);

    const handleFavourites = () => {
        addOrRemoveFavourites(workoutId, user._id)
            .then((response) => {
                dispatch(loggedUserDetails(response.user));
                if (response.isValid === true) {
                    setfavourite(true);
                } else if (response.isValid === false) {
                    setfavourite(false);
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 400) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error("An error occurred. Please try again later");
                }
            });
    };

    const handleStarRating = () => {
        setRatingPopup(true)
    }
    const hideModal = () => {
        setRatingPopup(false)
    };

    const rateVideo = () => {
        const ratingDetails = {
            workoutId: workoutId,
            trainerId: trainer._id,
            rating: rating,
        }
        const submitRating = rateWorkout(user._id, ratingDetails).then((response) => {
            dispatch(trainerDetails(response.workout[0]))
            setRatingPopup(false);
            if (response.isValid === true) {
                toast.success("Thank you for rating");
            }
        }).catch((error) => {
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An error occurred. Please try again later");
            }
        })
    }

    return (
        <div className="watch">
            <div className="back text-yellow-500 cursor-pointer flex flex-col items-start">
                <div onClick={ () => navigate(-1) }>
                    <ArrowBackOutlined />
                    <span className="ml-1">Go back</span>
                </div>
                <div className="mt-2">
                    {
                        workoutId !== '1' && (
                            <button
                                type="button"
                                className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5"
                                onClick={ handleStarRating }
                            >
                                Rate this Video
                            </button>
                        ) }
                </div>
                { workoutId !== '1' && (
                    <div className="ml-auto mt-2">
                        <FaHeart
                            className={ `text-gray-300 w-20 h-20 mr-40 cursor-pointer ${ favourite ? 'text-yellow-500' : ''
                                }` }
                            onClick={ handleFavourites }
                        />
                    </div>
                ) }
            </div>
            <div className="relative">
                <video className="mx-auto h-full md:h-screen" controls>
                    <source
                        src={ workoutVideo }
                        type="video/mp4"
                    />
                </video>
            </div>
            { ratingPopup && (
                <>
                    <div
                        className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-80 z-50"
                        onClick={ hideModal }
                    />
                    <div
                        id="authentication-modal"
                        tabIndex="-1"
                        aria-hidden="true"
                        className="fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md max-h-full overflow-hidden"
                    >
                        <div className="relative bg-white rounded-lg shadow">
                            <button
                                type="button"
                                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                                data-modal-hide="authentication-modal"
                                onClick={ hideModal }
                            >
                                <svg
                                    aria-hidden="true"
                                    className="w-16 h-16"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <Rating rating={ rating } onRating={ (rate) => setRating(rate) } rateVideo={ rateVideo } />
                        </div>
                    </div>
                </>
            ) }
        </div>


    );
}
