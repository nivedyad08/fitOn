import React, { useEffect, useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from '../../../config/axios';
import DateTimePicker from './DateTimePicker';
import { useSelector } from 'react-redux';
import Moment from 'react-moment';
import { createSession, fetchTrainerSubscribedUsers } from '../../../Services/TrainerApi';

function AddSession({ setModalOpen, data, setData }) {
    const hideModal = () => {
        setModalOpen(false);
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm({
        defaultValues: {
            user: "",
            datetime: "",
            status: "",
        },
    });


    const trainerId = useSelector((state) => state.loggedUser.userInfo)
    const [users, setUsers] = useState([])
    const [selectedDateTime, setSelectedDateTime] = useState(null);

    useEffect(() => {
        fetchTrainerSubscribedUsers(trainerId._id).then((response) => {
            setUsers(response.usersList);
        }).catch((error) => {
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An error occurred. Please try again later");
            }
        })
    }, []);

    const flatpickrRef = useRef(null);

    const onSubmit = async (data) => {
        if (data) {
            data.datetime = selectedDateTime
            createSession(trainerId._id, data).then((response) => {
                if (response.status === 200) {
                    setData((prevData) => {
                        if (response.session) {
                            return [...prevData, {
                                status: response.session.status,
                                user: response.userDetails.firstName,
                                userProfilePic: response.userDetails.profilePic,
                                _id: response.session._id,
                                datetime: <Moment format="YYYY-MM-DD HH:mm A">
                                    { response.session.datetime }
                                </Moment>
                            }];
                        }
                        return prevData;
                    });
                    toast.success("Session Added Successfully");
                }
            }).catch((error) => {
                if (error.response && error.response.status === 400) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error("An error occurred. Please try again later");
                }
            })
        }
        hideModal()
    }

    const { user, datetime, status } = watch(["user", "datetime", "status"])

    return (
        <>
            <div
                className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50"
                onClick={ hideModal }
            />
            <div
                id="authentication-modal"
                tabIndex="-1"
                aria-hidden="true"
                className="fixed top-[260px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md max-h-full overflow-hidden"
            >
                <div className="relative bg-white rounded-lg shadow">
                    <button
                        type="button"
                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                        data-modal-hide="authentication-modal"
                        onClick={ hideModal }
                    >
                        <svg
                            aria-hidden="true"
                            className="w-16 h-16"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="px-8 py-8">
                        <div className="w-full ">
                            <form className='custom-blue p-20 rounded-md' onSubmit={ handleSubmit(onSubmit) }>
                                <div className="space-y-12">
                                    <div className="border-b border-gray-900/10 pb-12">
                                        <h2 className="text-2xl font-semibold leading-10 text-white">ADD NEW SESSION</h2>
                                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                            <div className="col-span-full mt-10">
                                                <label htmlFor="workoutTitle" className="block text-sm font-lg leading-6 text-custom-whitish">
                                                    Select User
                                                </label>
                                                <div className="mt-2">
                                                    <select
                                                        id="user"
                                                        name="user"
                                                        autoComplete="user-name"
                                                        { ...register("user", {
                                                            required: "user is required",
                                                        }) }
                                                        className={ `block w-full h-40 custom-blue-shade1 rounded-md border-0 py-3 text-gray-200 shadow-sm placeholder-gray-500 pl-4 placeholder-opacity-10 sm:text-sm sm:leading-6 ${ errors.user ? "border-red-500" : ""
                                                            }` }
                                                    >
                                                        <option>Select User</option>
                                                        { users.map((user, i) => (
                                                            <option key={ i } value={ user._id }>{ user.firstName } { user.lastName }</option>
                                                        )) }
                                                    </select>
                                                    { errors.user && (
                                                        <small className="mt-2 text-red-500 text-sm">
                                                            { errors.user.message }
                                                        </small>
                                                    ) }
                                                </div>
                                            </div>
                                            <div className="col-span-full mt-10">
                                                <label htmlFor="datetime" className="block text-sm font-lg leading-6 text-custom-whitish">
                                                    Date and Time
                                                </label>
                                                <div className="mt-2">
                                                    <DateTimePicker flatpickrRef={ flatpickrRef }
                                                        selectedDateTime={ selectedDateTime }
                                                        setSelectedDateTime={ setSelectedDateTime }
                                                    />
                                                    { errors.datetime && (
                                                        <small className="mt-2 text-red-500 text-sm">
                                                            { errors.datetime.message }
                                                        </small>
                                                    ) }
                                                </div>
                                            </div>
                                            <div className="col-span-full mt-10">
                                                <label htmlFor="workoutTitle" className="block text-sm font-lg leading-6 text-custom-whitish">
                                                    Status
                                                </label>
                                                <div className="mt-2">
                                                    <select
                                                        id="status"
                                                        name="status"
                                                        autoComplete="status"
                                                        { ...register("status", {
                                                            required: "status is required",
                                                        }) }
                                                        className={ `block w-full h-40 custom-blue-shade1 rounded-md border-0 py-3 text-gray-200 shadow-sm placeholder-gray-500 pl-4 placeholder-opacity-10 sm:text-sm sm:leading-6 ${ errors.status ? "border-red-500" : ""
                                                            }` }
                                                    >
                                                        <option>Select Status</option>
                                                        <option value="Conducted">Conducted</option>
                                                        <option value="Yet to be Conducted">Yet to be Conducted</option>
                                                        <option value="Cancelled">Cancelled</option>
                                                    </select>
                                                    { errors.status && (
                                                        <small className="mt-2 text-red-500 text-sm">
                                                            { errors.status.message }
                                                        </small>
                                                    ) }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex items-center justify-end gap-x-6">
                                    <button type="button" className="text-sm custom-light-blue focus-visible:outline-2 focus-visible:outline-offset-2 rounded-md px-20 py-8 text-white font-semibold leading-6" onClick={ hideModal }>
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="rounded-md custom-yellow px-20 py-8 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddSession
