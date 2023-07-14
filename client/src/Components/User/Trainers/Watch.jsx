import { ArrowBackOutlined } from "@mui/icons-material";
import { FaHeart } from 'react-icons/fa';
import { Link, useParams, useNavigate } from "react-router-dom";
import { addOrRemoveFavourites } from '../../../Services/UserApi';
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import { loggedUserDetails } from "../../redux-toolkit/slices/userSlice";

export default function Watch() {
    const { workoutVideo, workoutId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.loggedUser.userInfo);
    const [favourite, setfavourite] = useState(false);

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
                console.log(response);
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

    return (
        <div className="watch">
            <div className="back text-yellow-500 cursor-pointer flex items-center">
                <div onClick={ () => navigate(-1) }>
                    <ArrowBackOutlined />
                    <span>Go back</span>
                </div>
                { workoutId !== "1" ? (
                    <div className="ml-auto mr-80">
                        <FaHeart
                            className={ `text-gray-300 w-20 h-28 cursor-pointer ${ favourite ? "text-yellow-500" : ""
                                }` }
                            onClick={ handleFavourites }
                        />
                    </div>
                ) : "" }
            </div>
            <div className="relative">
                <video className="mx-auto md:h-screen" controls>
                    <source
                        src={ `http://localhost:8080/workouts/${ workoutVideo }` }
                        type="video/mp4"
                    />
                </video>
            </div>
        </div>
    );
}
