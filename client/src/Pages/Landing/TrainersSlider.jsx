import React, { useState, useEffect } from "react";
import axios from "../../config/axios";
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { useDispatch, useSelector } from "react-redux";
import { trainerDetails } from "../../Components/redux-toolkit/slices/trainerSlice";
import { useNavigate } from "react-router-dom";

const TrainersSlider = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [trainers, setTrainers] = useState([]);
    const user = useSelector((state) => state.loggedUser.userInfo)

    useEffect(() => {
        (async () => {
            const fetchTrainers = await axios.get(`api/auth/trainers`)
            setTrainers(fetchTrainers.data.trainers);
            console.log(trainers);
        })()
    }, []);
    const slideLeft = () => {
        var slider = document.getElementById('slider' + 1);
        slider.scrollLeft = slider.scrollLeft - 500;
    };
    const rowID = 1;
    const slideRight = () => {
        var slider = document.getElementById('slider' + 1);
        slider.scrollLeft = slider.scrollLeft + 500;
    };
    const showTrainerDetails = (trainer) => {
        dispatch(trainerDetails(trainer))
        navigate(`/user/trainer/details/${ trainer._id }`)
    }
    return (
        <div className='relative flex items-center group pb-30 my-30'>
            <MdChevronLeft
                onClick={ slideLeft }
                className='bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
                size={ 40 }
            />
            <div
                id={ 'slider' + rowID }
                className='w-full h-full overflow-x-scroll overflow whitespace-nowrap scroll-smooth scrollbar-hide relative'
            >
                { trainers.map((trainer, index) => (
                    <>
                        <div className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2' key={ index } onClick={ () => showTrainerDetails(trainer) }>
                            <img
                                className='w-[252px] h-[220px] block'
                                src={ trainer.profilePic ? trainer.profilePic : trainer.user.profilePic }
                                alt={ trainer.firstName ? trainer.firstName : trainer.user.firstName }
                            />
                            <h2 className="mt-14 text-base font-semibold capitalize text-gray-300 dark:text-white">
                                { trainer.firstName ? trainer.firstName : trainer.user.firstName } { trainer.firstName ? trainer.lastName : trainer.user.lastName }
                            </h2>
                            <p className="mt-2 text-sm tracking-wider text-gray-400 dark:text-blue-400">
                                { trainer.userLocation ? trainer.userLocation : trainer.user.userLocation }
                            </p>
                            <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
                                <p className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>
                                    { trainer.firstName ? trainer.firstName : trainer.user.firstName }
                                </p>
                            </div>
                        </div>
                    </>
                )) }
            </div>
            <MdChevronRight
                onClick={ slideRight }
                className='bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
                size={ 40 }
            />
        </div>
    );
}

export default TrainersSlider;
