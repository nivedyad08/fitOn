import React, { useState, useEffect } from "react";
import axios from "../../config/axios";
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import {BASE_URL} from "../../constants/urls"

const Carousel = () => {
    const [trainers, setTrainers] = useState([]);

    // setTrainers(response.data.results);

    useEffect(() => {
        (async () => {
            const fetchTrainers = await axios.get(`api/user/trainers`)
            setTrainers(fetchTrainers.data.trainers);
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
    return (
        <div className='relative flex items-center group pb-30 my-80'>
            <MdChevronLeft
                onClick={ slideLeft }
                className='bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
                size={ 40 }
            />
            <div
                id={ 'slider' + rowID }
                className='w-full h-full overflow-x-scroll overflow whitespace-nowrap scroll-smooth scrollbar-hide relative'
            >
                { trainers.map((item, id) => (
                    <>
                        <div className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2'>
                            <img
                                className='w-[252px] h-[220px] block'
                                src={ `${BASE_URL}/user/${ item?.coverPhoto }` }
                                alt={ item?.firstName }
                            />
                            <h2 className="mt-14 text-base font-semibold capitalize text-gray-300 dark:text-white">
                                {item.firstName} {item.lastName}
                            </h2>
                            <p className="mt-2 text-sm tracking-wider text-gray-400 dark:text-blue-400">
                                {item.userLocation}
                            </p>
                            <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
                                <p className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>
                                    { item?.firstName }
                                </p>
                                <p>
                                    <FaHeart className='absolute top-4 left-4 text-gray-300' />
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

export default Carousel;
