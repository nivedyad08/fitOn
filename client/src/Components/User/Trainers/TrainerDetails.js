import React, { useState, useEffect } from "react";
import Carousel from "../../Carousel";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../../constants/urls";
import { useNavigate, Link } from "react-router-dom";
import { dateMonthYearStringFormat } from "../../../helpers/CommonFunctions";

const TrainerDetails = () => {
    const navigate = useNavigate()
    const trainer = useSelector((state) => state.trainerDetails.trainerInfo)
    const user = useSelector((state) => state.loggedUser.userInfo)
    const image1 = `${ BASE_URL }/user/${ trainer.coverPhoto ? trainer.coverPhoto : trainer.user.coverPhoto }`

    const handleVideoAccess = (workoutVideo) => {
        if (user.subscriptions.length > 0) {
            const subscriber = user.subscriptions.filter((item, i) =>
                item.trainerId === trainer._id && item.isValid
            )
            if (!subscriber.length > 0)
                navigate("/user/subscribe/membership")
            else
                navigate(`/user/trainer/watch/${workoutVideo}`)

        } else {
            navigate("/user/subscribe/membership")
        }
    }

    return (
        <>
            <div className="h-full px-20">
                <div className="shadow-xl pb-8">
                    <div className="w-full h-[500px]">
                        <img src={ image1 } className="w-full h-full" />
                        <div className="absolute space-y-20 mt-96 inset-0 flex flex-col items-center justify-center">
                            <p className="text-white md:text-7xl  sm:text-4xl uppercase leading-10 tracking-wider font-bold text-center">{ trainer.firstName ? trainer.firstName : trainer.user.firstName } { trainer.lastName ? trainer.lastName : trainer.user.lastName }</p>
                            <p className="text-white text-lg">{ trainer.email ? trainer.email : trainer.user.email }</p>
                            <p className="text-lg text-white">{ trainer.userLocation ? trainer.userLocation : trainer.user.userLocation }</p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row pb-8 md:-mt-96 md:pb-56 md:items-start md:space-x-4 md:mx-96">
                        <div className="flex flex-col md:flex-row md:items-start md:space-x-4 ">
                            <img src={ `${ BASE_URL }/user/${ trainer.profilePic ? trainer.profilePic : trainer.user.profilePic }` } className="w-[230px] border-4 rounded-full" />
                            <div className="mt-4 md:mt-[120px]" >
                                <div className="flex space-x-4">
                                    <p className="text-gray-400 text-justify text-base leading-8 tracking-wide
                                    md:ml-[50px]">{ trainer.userBio ? trainer.userBio : trainer.user.userBio }</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >

                <h1 className="text-white uppercase text-2xl font-semibold tracking-wider mb-20">{ trainer.firstName ? trainer.firstName : trainer.user.firstName }'s  WORKOUTS</h1>
                { trainer.workouts !== null ?
                    <div className="mx-6 grid grid-cols-1 sm:grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-3 mt-10">
                        { trainer.workouts.map((workout, index) => (
                            <div className="shadow-lg overflow-hidden" key={ index }>
                                <div className="relative">
                                    <img className="w-sm w-[345px] h-[200px]" src={ `${ BASE_URL }/user/${ workout.thumbnailImage }` } alt="" />
                                    <div className="absolute mr-48 mb-44 inset-0 flex items-center justify-center">
                                        <svg className="codicon codicon-play-150 w-52 cursor-pointer" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg"
                                        onClick={ () => handleVideoAccess(workout.video) }>
                                            <g fill="none" fillRule="evenodd">
                                                <circle stroke="#FFF" strokeWidth="2" cx="75.011" cy="75.417" r="74"></circle>
                                                <path fill="#FFF" d="M68.054 59.177l26.143 16.284-26.143 16.284z"></path>
                                            </g>
                                        </svg>
                                    </div>
                                    <div className="p-2 mr-40 relative">
                                        <p className="text-base text-center mt-6 font-semibold uppercase text-custom-whitish">{ workout.workoutTitle }</p>
                                        <p className="text-custom-whitish text-center">{ dateMonthYearStringFormat(workout.createdAt) }</p>
                                    </div>
                                </div>
                            </div>

                        )) }
                    </div>
                    : ""
                }
                {/* {
                    trainer.thumbnailImage ? (
                        <>
                            <div className="mx-6 grid grid-cols-1 sm:grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-3 mt-10 ">
                                <div className="shadow-lg overflow-hidden">
                                    <div className="relative">
                                        <img className="w-sm w-[345px] h-[200px]" src={ `${ BASE_URL }/user/${ trainer.thumbnailImage }` } alt="" />
                                        <div className="absolute mr-48 mb-44 inset-0 flex items-center justify-center">
                                            <svg className="codicon codicon-play-150 w-52" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
                                                <g fill="none" fillRule="evenodd">
                                                    <circle stroke="#FFF" strokeWidth="2" cx="75.011" cy="75.417" r="74"></circle>
                                                    <path fill="#FFF" d="M68.054 59.177l26.143 16.284-26.143 16.284z"></path>
                                                </g>
                                            </svg>
                                        </div>
                                        <div className="p-2 mr-40 relative">
                                            <p className="text-base text-center mt-6 font-semibold uppercase text-custom-whitish">{ trainer.workoutTitle }</p>
                                            <p className="text-custom-whitish text-center">{
                                                dateMonthYearStringFormat(trainer.createdAt) }</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-48">
                                <button className="rounded-lg w-50 h-40 mt-10 bg-custom-yellow text-sm px-5 py-2.5 text-center font-medium focus:outline-none text-white" onClick={ () => navigate("/user/subscribe/membership") }>
                                    SHOW ALL WORKOUTS
                                </button>
                            </div>
                        </>
                    ) :
                        trainer.workouts !== null ? (
                            <div className="mx-6 grid grid-cols-1 sm:grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-3 mt-10">
                                { trainer.workouts.map((workout, index) => (
                                    <div className="shadow-lg overflow-hidden" key={ index }>
                                        <div className="relative">
                                            <img className="w-sm w-[345px] h-[200px]" src={ `${ BASE_URL }/user/${ workout.thumbnailImage }` } alt="" />
                                            <div className="absolute mr-48 mb-44 inset-0 flex items-center justify-center">
                                                <svg className="codicon codicon-play-150 w-52" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg" onClick={handleVideoAccess}>
                                                    <g fill="none" fillRule="evenodd">
                                                        <circle stroke="#FFF" strokeWidth="2" cx="75.011" cy="75.417" r="74"></circle>
                                                        <path fill="#FFF" d="M68.054 59.177l26.143 16.284-26.143 16.284z"></path>
                                                    </g>
                                                </svg>
                                            </div>
                                            <div className="p-2 mr-40 relative">
                                                <p className="text-base text-center mt-6 font-semibold uppercase text-custom-whitish">{ workout.workoutTitle }</p>
                                                <p className="text-custom-whitish text-center">{ dateMonthYearStringFormat(workout.createdAt) }</p>
                                            </div>
                                        </div>
                                    </div>

                                )) }
                            </div>
                        )
                            : ""
                } */}
            </div >
        </>
    );
}

export default TrainerDetails;
