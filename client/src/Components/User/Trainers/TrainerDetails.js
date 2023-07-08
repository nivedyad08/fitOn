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
                        <div class="absolute space-y-20 mt-96 inset-0 flex flex-col items-center justify-center">
                            <p class="text-white md:text-7xl  sm:text-4xl uppercase leading-10 tracking-wider font-bold text-center">{ trainer.firstName } { trainer.lastName }</p>
                            <p class="text-white text-lg">{ trainer.email }</p>
                            <p class="text-lg text-white">{ trainer.userLocation }</p>
                        </div>
                    </div>
                    <div class="flex flex-col md:flex-row pb-8 md:-mt-96 md:pb-56 md:items-start md:space-x-4 md:mx-96">
                        <div class="flex flex-col md:flex-row md:items-start md:space-x-4 ">
                            <img src={ `${ BASE_URL }/user/${ trainer.profilePic }` } class="w-[230px] border-4 rounded-full" />
                            <div class="mt-4 md:mt-[120px]" >
                                <div class="flex space-x-4">
                                    <p class="text-gray-400 text-justify text-base leading-8 tracking-wide
                                    md:ml-[50px]">{ trainer.userBio }</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >

                <div className="mx-6 grid grid-cols-1 sm:grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-3 mt-10">
                    <div className="shadow-lg overflow-hidden">
                        <div className="relative">
                            <img className="w-sm w-[345px] h-[200px]" src={ image1 } alt="" />
                            <div className="absolute mr-48 mb-44 inset-0 flex items-center justify-center">
                                <svg className="codicon codicon-play-150 w-52" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
                                    <g fill="none" fillRule="evenodd">
                                        <circle stroke="#FFF" strokeWidth="2" cx="75.011" cy="75.417" r="74"></circle>
                                        <path fill="#FFF" d="M68.054 59.177l26.143 16.284-26.143 16.284z"></path>
                                    </g>
                                </svg>
                            </div>
                            <div className="p-2 mr-40 relative">
                                <p className="text-base text-center mt-6 font-semibold uppercase text-custom-whitish">Handstand Push-Ups</p>
                                <p className="text-custom-whitish text-center">53K views • 2 weeks ago</p>
                            </div>
                        </div>
                    </div>
                    <div className="shadow-lg overflow-hidden">
                        <div className="relative">
                            <img className="w-sm w-[345px] h-[200px]" src={ image1 } alt="" />
                            <div className="absolute md:mr-48 md:mb-44 inset-0 flex items-center justify-center">
                                <svg className="codicon codicon-play-150 w-52" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
                                    <g fill="none" fillRule="evenodd">
                                        <circle stroke="#FFF" strokeWidth="2" cx="75.011" cy="75.417" r="74"></circle>
                                        <path fill="#FFF" d="M68.054 59.177l26.143 16.284-26.143 16.284z"></path>
                                    </g>
                                </svg>
                            </div>
                            <div className="p-2 mr-40 relative">
                                <p className="text-base text-center mt-6 font-semibold uppercase text-custom-whitish">Handstand Push-Ups</p>
                                <p className="text-custom-whitish text-center">53K views • 2 weeks ago</p>
                            </div>
                        </div>
                    </div>
                    <div className="shadow-lg overflow-hidden">
                        <div className="relative">
                            <img className="w-sm w-[345px] h-[200px]" src={ image1 } alt="" />
                            <div className="absolute mr-48 mb-44 inset-0 flex items-center justify-center">
                                <svg className="codicon codicon-play-150 w-52" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
                                    <g fill="none" fillRule="evenodd">
                                        <circle stroke="#FFF" strokeWidth="2" cx="75.011" cy="75.417" r="74"></circle>
                                        <path fill="#FFF" d="M68.054 59.177l26.143 16.284-26.143 16.284z"></path>
                                    </g>
                                </svg>
                            </div>
                            <div className="p-2 mr-40 relative">
                                <p className="text-base text-center mt-6 font-semibold uppercase text-custom-whitish">Handstand Push-Ups</p>
                                <p className="text-custom-whitish text-center">53K views • 2 weeks ago</p>
                            </div>
                        </div>
                    </div>
                    <div className="shadow-lg overflow-hidden">
                        <div className="relative">
                            <img className="w-sm w-[345px] h-[200px]" src={ image1 } alt="" />
                            <div className="absolute mr-48 mb-44 inset-0 flex items-center justify-center">
                                <svg className="codicon codicon-play-150 w-52" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
                                    <g fill="none" fillRule="evenodd">
                                        <circle stroke="#FFF" strokeWidth="2" cx="75.011" cy="75.417" r="74"></circle>
                                        <path fill="#FFF" d="M68.054 59.177l26.143 16.284-26.143 16.284z"></path>
                                    </g>
                                </svg>
                            </div>
                            <div className="p-2 mr-40 relative">
                                <p className="text-base text-center mt-6 font-semibold uppercase text-custom-whitish">Handstand Push-Ups</p>
                                <p className="text-custom-whitish text-center">Category</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}

export default TrainerDetails;
