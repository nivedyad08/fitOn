import React, { useState, useEffect } from "react";
import axios from "../../../config/axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { trainerDetails } from "../../redux-toolkit/slices/trainerSlice";
import { searchTrainer } from "../../../Services/UserApi";
import Pagination from "./Pagination";

const TrainersList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [trainers, setTrainers] = useState([]);
    const user = useSelector((state) => state.loggedUser.userInfo)

    const [currentPage, setCurrentPage] = useState(1)
    const [trainersPerPage] = useState(10)

    useEffect(() => {
        (async () => {
            const fetchTrainers = await axios.get(
                `api/user/trainers?userId=${ user._id }&page=${ currentPage }&limit=${ trainersPerPage }`
            );
            const totalTrainers = fetchTrainers.data.totalTrainersCount
            const totalPages = Math.ceil(totalTrainers / trainersPerPage);
            setTotalPages(totalPages);
            setTrainers(fetchTrainers.data.trainers);
        })()
    }, [currentPage, trainersPerPage]);

    const showTrainerDetails = (trainer) => {
        dispatch(trainerDetails(trainer))
        navigate(`/user/trainer/details/${ trainer._id }`)
    }

    const [search, setSeaerchValue] = useState("")
    const [totalPages, setTotalPages] = useState(0)

    const handleSubmit = (e) => {
        e.preventDefault();
        searchTrainer(search).then((res) => {
            setTrainers(res.showTrainer)
        }).catch((error) => {

        })
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <div>
                <form onSubmit={ handleSubmit } className="w-[300px] ml-auto p-4 rounded-lg">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
                        </div>
                        <input
                            type="search"
                            id="default-search"
                            className="block w-full p-10 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search Mockups, Logos..."
                            onChange={ (e) => setSeaerchValue(e.target.value) }
                            required
                        />
                        <button
                            type="submit"
                            className="text-white absolute right-2.5 bottom-2.5 bg-yellow-500 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-8  py-8 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
                        >
                            Search
                        </button>
                    </div>
                </form>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                { trainers.map((trainer, index) => (
                    <div className="w-[165px] h-[210px] md:w-[250x] mx-10 my-8 py- rounded-md flex items-center justify-center cursor-pointer" key={ index } onClick={ () => showTrainerDetails(trainer) }>
                        <div className="text-center px-14">
                            <div className="flex justify-center px-5 -mt-12">
                                <img
                                    className="w-full h-[134px] p-2 rounded-full"
                                    src={ trainer.profilePic ? trainer.profilePic : trainer.user.profilePic }
                                    alt=""
                                />
                            </div>

                            <h2 className="text-white py-20 text-base font-medium uppercase leading-3">{ trainer.firstName ? trainer.firstName : trainer.user.firstName } { trainer.lastName ? trainer.lastName : trainer.user.lastName }</h2>
                        </div>
                    </div>
                ))

                }
            </div>
            <Pagination
                currentPage={ currentPage }
                totalPages={ totalPages }
                onPageChange={ handlePageChange }
            />
        </>
    );
}

export default TrainersList;
