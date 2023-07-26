import React, { useEffect, useState } from 'react';
import { popularWorkouts } from '../../../Services/UserApi';
import { toast } from "react-toastify";

const PopularWorkouts = () => {
    const [workouts, setWorkouts] = useState([])
    useEffect(() => {
        popularWorkouts().then((response) => {
            setWorkouts(response.topWorkouts);
        }).catch((error) => {
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An error occurred. Please try again later");
            }
        })
    }, []);
    return (
        <>
            <div className="flex space-x-10 mt-24">
                <h1 className="text-xl font-semibold text-white">Popular Workouts</h1>
            </div>
            <div className="flex space-x-10 mt-20 justify-center">
                <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-24 sm:grid-cols-1">
                    {
                        workouts.map((workout, index) => (
                            <div className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2' key={ index }>
                                <img
                                    className='w-[252px] h-[220px] block'
                                    src={ workout.thumbnailImage ? workout.thumbnailImage : workout.user.thumbnailImage }
                                    alt={ workout.workoutTitle ? workout.workoutTitle : workout.user.workoutTitle }
                                />
                                <h2 className="mt-14 text-base font-semibold capitalize text-gray-300 dark:text-white">
                                    { workout.workoutTitle ? workout.workoutTitle : workout.user.workoutTitle }
                                </h2>
                                <p className="mt-2 text-sm tracking-wider text-gray-400 dark:text-blue-400">
                                    { workout.category ? workout.category : workout.user.category }
                                </p>
                                <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
                                    <p className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>
                                        { workout.level ? workout.level : workout.user.level }
                                    </p>
                                </div>
                            </div>
                        ))
                    }
                    {/* Repeat the same structure for other images */ }
                </div>
            </div>
        </>
    );
};

export default PopularWorkouts;
