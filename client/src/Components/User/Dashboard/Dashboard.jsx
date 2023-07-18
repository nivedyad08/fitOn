import React from 'react';
import PopularWorkouts from './PopularWorkouts';
import TrainersSlider from '../../../Pages/Landing/TrainersSlider';
import Carousel from '../../Carousel';

const Dashboard = () => {
    const image1 = "/images/workouts.png"
    const image2 = "/images/workouts-2.png"
    const height = "335px"
    return (
        <>
            <div className="mx-auto text-center">
                <section className="w-full">
                    <Carousel image1={ image1 } image2={ image2 } height={ height } />
                </section>
                <div className="mx-auto max-w-lg">

                </div>
            </div>
            <div className='px-30'>
                <div className="flex items-center gap-x-6 mt-36">
                    <h1 className="text-xl font-semibold leading-6 tracking-tight text-gray-200">Top Trainers</h1>
                    <div className='text-right ml-auto'>
                        <a href="/user/trainers" className="inline-flex  w-80 h-20 items-center justify-center rounded-lg px-10 py-8 text-sm text-yellow-600 duration-300 hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80">
                            <span className="mx-2 font-medium">See all</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="mx-2 h-10 w-10">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                            </svg>
                        </a>
                    </div>
                </div>
                <TrainersSlider />
                <PopularWorkouts />
            </div>

        </>
    );
}

export default Dashboard;


