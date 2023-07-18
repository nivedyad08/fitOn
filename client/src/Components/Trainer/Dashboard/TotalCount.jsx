import React from 'react';

const TotalCount = ({ workout }) => {
    console.log(workout);
    return (
        <div className="grid md:grid-cols-3 gap-y-10 gap-x-24 px-2">
            <div className="custom-blue rounded-xl mb-3 sm:mb-0 ">
                <div className="max-w-7xl mx-20 py-8 px-4 sm:px-6 lg:py-12 lg:px-8 lg:flex lg:items-center lg:justify-between">
                    <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                        <span className="block text-xl text-white">TOTAL WORKOUTS</span>
                        <span className="block text-xxl text-yellow-500">{ workout.totalWorkouts }</span>
                    </h2>
                </div>
            </div>
            <div className="custom-blue rounded-xl mb-3 sm:mb-0 ">
                <div className="max-w-7xl mx-20 py-8 px-4 sm:px-6 lg:py-12 lg:px-8 lg:flex lg:items-center lg:justify-between">
                    <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                        <span className="block text-xl text-white">TOTAL SUBSCRIBERS</span>
                        <span className="block text-yellow-500">{ workout.totalSubscribers }</span>
                    </h2>
                </div>
            </div>
            <div className="custom-blue rounded-xl mb-3 sm:mb-0 ">
                <div className="max-w-7xl mx-20 py-8 px-4 sm:px-6 lg:py-12 lg:px-8 lg:flex lg:items-center lg:justify-between">
                    <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                        <span className="block text-xl text-white">FAVOURITES</span>
                        <span className="block text-xxl text-yellow-500">{workout.totalFavourites}</span>
                    </h2>
                </div>
            </div>
        </div>
    );
}

export default TotalCount;
