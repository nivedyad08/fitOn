import React from 'react';
import { useSelector } from 'react-redux';

const ViewWorkout = () => {
    const workout = useSelector((state) => state.workoutDetails.workoutInfo)
    return (
        <div className='max-w-7xl w-5/6 mx-auto py-20'>
            <form className='custom-blue p-20 rounded-md'>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-2xl font-semibold leading-10 text-white">{ workout.workoutTitle }</h2>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="col-span-full mt-10">
                                <label htmlFor="workoutTitle" className="block text-sm font-lg leading-6 text-custom-whitish">
                                    Workout Thumbnail
                                </label>
                                <div className="mt-2">

                                    <img className="h-auto max-w-lg mx-auto" src={ workout.thumbnailImage } alt="image description" />

                                </div>
                            </div>
                            <div className="col-span-full mt-10">
                                <label htmlFor="workoutTitle" className="block text-sm font-lg leading-6 text-custom-whitish">
                                    Workout Title
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="workoutTitle"
                                        name="workoutTitle"
                                        defaultValue={ workout.workoutTitle }
                                        className="block h-40 w-full rounded-md border-0 py-1.5 text-gray-200  ring-inset placeholder-gray-500 pl-4 placeholder-opacity-100  custom-blue-shade1 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full mt-10">
                                <label htmlFor="description" className="block text-sm font-lg leading-6 text-custom-whitish">
                                    Description
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows={ 6 }
                                        defaultValue={ workout.description }
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-200  ring-inset placeholder-gray-500 pl-4 placeholder-opacity-100  custom-blue-shade1 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="category" className="block text-sm font-lg leading-6 text-custom-whitish">
                                    Workout Category
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="workoutTitle"
                                        name="workoutTitle"
                                        defaultValue={ workout.category[0].name }
                                        className="block h-40 w-full rounded-md border-0 py-1.5 text-gray-200  ring-inset placeholder-gray-500 pl-4 placeholder-opacity-100  custom-blue-shade1 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="last-name" className="block text-sm font-lg leading-6 text-custom-whitish">
                                    Difficulty Level
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="workoutTitle"
                                        name="workoutTitle"
                                        defaultValue={ workout.level[0].name }
                                        className="block h-40 w-full rounded-md border-0 py-1.5 text-gray-200  ring-inset placeholder-gray-500 pl-4 placeholder-opacity-100  custom-blue-shade1 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full mt-10">
                                <label htmlFor="workoutTitle" className="block text-sm font-lg leading-6 text-custom-whitish">
                                    Workout Video
                                </label>
                                <div className="mt-2">
                                    <video className="h-3/5" controls>
                                        <source src={ workout.video } type="video/mp4" />
                                    </video>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ViewWorkout;
