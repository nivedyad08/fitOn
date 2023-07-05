import React from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const PopularWorkouts = () => {
    return (
        <>
            <div className="flex space-x-10 mt-24">
                <h1 className="text-xl font-semibold text-white">Popular Workouts</h1>
            </div>
            <div className="flex space-x-10 mt-20 justify-center">
                <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-24 sm:grid-cols-1">
                    <a href="/services">
                        <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden relative">
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz3QtoACmOVLxIQkmqoNmYlc2XrfHMZIWQ5w&usqp=CAU"
                                alt="Service"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-4">
                                <h3 className="text-lg font-semibold">Service 1</h3>
                                <p className="text-sm">Lorem ipsum dolor sit amet.</p>
                            </div>
                        </div>
                    </a>
                    {/* Repeat the same structure for other images */ }
                </div>
            </div>
        </>
    );
};

export default PopularWorkouts;
