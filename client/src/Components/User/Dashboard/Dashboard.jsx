import React from 'react';
import PopularWorkouts from './PopularWorkouts';
import TrainersList from './TrainersList';
import Carousel from '../../../Pages/Landing/Carousel';

const Dashboard = () => {
    return (
        <>
            <div className="mx-auto text-center">
                <section class="w-full">
                    <img
                        src="/images/banner-image.jpg"
                        class="object-fill w-full h-[400px]"
                        alt="Image alt text"
                    />
                </section>
                <div className="mx-auto max-w-lg">

                </div>
            </div>
            <div className='px-30'>
                <div className="flex space-x-10 mt-36">
                    <h1 className="text-xl font-semibold text-white">Top Trainers</h1>
                </div>
                <Carousel />
                <PopularWorkouts />
            </div>
        </>
    );
}

export default Dashboard;
