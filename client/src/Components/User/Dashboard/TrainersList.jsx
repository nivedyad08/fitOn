import React, { useEffect, useState } from 'react';
import axios from "../../../config/axios"
import { toast } from "react-toastify";

const TrainersList = () => {
    const [trainers, setTrainers] = useState([])
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get("api/user/trainers")
                setTrainers(response.data.trainers)
            } catch (error) {
                toast.error("An error occurred. Please try again later");
            }
        })();
    }, [])
    return (
        <>
            <div className="flex space-x-10 mt-24">
                <h1 className="text-xl font-semibold text-white">Trainers</h1>
            </div>

            <div className="flex space-x-96 mt-20 justify-center">
                { trainers.map((trainer, index) => (
                    <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-10 sm:grid-cols-1">
                        <a href="#">
                            <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden relative">
                                <img
                                    src={ `http://localhost:8080/user/${ trainer.coverPhoto }` }
                                    alt="Service"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-4">
                                    <h3 className="text-lg font-semibold">{ trainer.firstName } { trainer.flastName }</h3>
                                    <p className="text-sm">{ trainer.userLocation }</p>
                                </div>
                            </div>
                        </a>
                        {/* Repeat the same structure for other images */ }
                    </div>
                ))
                }
            </div>
        </>
    );
}

export default TrainersList;
