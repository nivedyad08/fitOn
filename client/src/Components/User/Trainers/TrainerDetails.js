import React, { useState, useEffect } from "react";
import Carousel from "../../Carousel";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../../constants/urls";

const TrainerDetails = () => {
    const trainer = useSelector((state) => state.trainerDetails.trainerInfo)
    const image1 = `${ BASE_URL }/user/${ trainer.coverPhoto }`
    return (
        <>
            <div class="h-full px-20">
                <div class="shadow-xl pb-8">
                    <div class="w-full h-[500px]">
                        <img src={ image1 } class="w-full h-full" />
                        <div class="absolute space-y-20 inset-0 flex flex-col items-center justify-center">
                            <p class="text-white text-7xl uppercase leading-10 tracking-wider font-bold text-center">{ trainer.firstName } { trainer.lastName }</p>
                            <p class="text-white text-lg">{ trainer.email }</p>
                            <p class="text-lg text-white">{ trainer.userLocation }</p>
                        </div>
                    </div>
                    <div class="flex flex-col-2 pb-56 items-start space-x-60 mx-96 -mt-96">
                        <img src={ `${ BASE_URL }/user/${ trainer.profilePic }` } class="w-[230px] border-4  rounded-full" />

                        <div class=" lg:items-end justify-end mt-96">
                            <div class="flex space-x-4 ml-60 mt-2">
                                <p class="mt-36 text-gray-400 text-base leading-8 tracking-wide">{ trainer.userBio }</p>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </>
    );
}

export default TrainerDetails;
