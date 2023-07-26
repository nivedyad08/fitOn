import React, { useMemo, useState, useEffect } from "react";
import Table from "../TrainerTable";
import { toast } from "react-toastify";
import { changeSessionStatus, sessions } from "../../../Services/TrainerApi";
import { useSelector } from "react-redux";

const SessionList = ({ data, setData }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [sessionStatus, setSessionStatus] = useState("")
    const [sessionId, setSessionID] = useState("")
    const trainer = useSelector((state) => state.loggedUser.userInfo)
    //status change
    const OpenConfirmModal = (id, event) => {
        const status = event.target.value
        setSessionStatus(status)
        setSessionID(id)
        setIsOpen(!isOpen)
    }
    const hideModal = () => {
        setIsOpen(false)
    }
    const handleConfirm = async () => {
        changeSessionStatus(sessionId, sessionStatus).then((response) => {
            if (response.status === 200) {
                setData((prevData) => {
                    return prevData.map((item) => {
                        if (item._id === sessionId) {
                            return {
                                ...item,
                                status: sessionStatus
                            }
                        }
                        return item
                    })
                })
                toast.success("Status changed successfully !!");
            }
            hideModal()
        }).catch((error) => {
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An error occurred. Please try again later");
            }
        })
    }
    const handleCancel = () => {
        setIsOpen(false)
    }
    const columns = useMemo(
        () => [
            {
                // Second group columns
                Header: " ",
                columns: [
                    {
                        Header: "SessionId",
                        accessor: "_id",
                    },
                    {
                        Header: "User",
                        accessor: "user",
                        Cell: ({ value, row }) => {
                            const thumbnail = row.original.userProfilePic
                            return (
                                <div className="flex items-center gap-x-6">
                                    {
                                        thumbnail ?
                                            <img className="h-40 w-40 " src={ thumbnail } alt="" />
                                            :
                                            <img className="h-40 w-40 " src="/images/user-plceholder.png" alt="" />

                                    }
                                    <h3 className="text-base leading-6 tracking-tight text-gray-200">{ value }</h3>
                                </div>
                            )
                        }
                    },
                    {
                        Header: "Date & Time",
                        accessor: "datetime",
                    },
                    {
                        Header: "Status",
                        accessor: "status",
                        Cell: ({ value, row }) => {
                            const data = row.original
                            return (
                                data.status === "Yet to be Conducted" ?
                                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">Yet to be Conducted</span>
                                    : data.status === "Conducted" ?
                                        < span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300" > Conducted</span >
                                        : data.status === "Cancelled" ?
                                            <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">Cancelled</span>
                                            : ""
                            );
                        },
                    },
                    {
                        Header: "Actions",
                        accessor: " ",
                        Cell: ({ value, row }) => {
                            return (
                                <div className="space-x-10" style={ { display: "flex", flexDirection: "row" } } >
                                    <div className="mt-2">
                                        <select
                                            id="status"
                                            name="status"
                                            autoComplete="status"
                                            className="block w-full h-30 custom-blue-shade1 rounded-md border-0 py-3 text-gray-200 shadow-sm placeholder-yellow-500 pl-4 placeholder-opacity-10 sm:text-sm sm:leading-6"
                                            onChange={ (event) => OpenConfirmModal(row.original._id, event) }
                                        >
                                            <option value={ row.original.status }>{ row.original.status }</option>
                                            <option value="Conducted">Conducted</option>
                                            <option value="Yet to be Conducted">Yet to be Conducted</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </div>
                                </div>
                            );
                        },
                    },
                ],
            },
        ],
        []
    );

    useEffect(() => {
        (async () => {
            sessions(trainer._id).then((response) => {
                setData(response.sessionsList);
            }).catch((error) => {
                if (error.response && error.response.status === 400) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error("An error occurred. Please try again later");
                }
            })
        })();
    }, []);

    return (
        <>
            <div className="App h-screen w-md:full">
                <Table
                    columns={ columns }
                    data={ data }
                    trColor="#1f2044"
                />
            </div>
            {
                isOpen && (
                    <>
                        <div
                            className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50"
                            onClick={ hideModal }
                        />
                        <div
                            id="authentication-modal"
                            tabIndex="-1"
                            aria-hidden="true"
                            className="fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md max-h-full overflow-hidden"
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
                                        <div className="p-6 text-center">
                                            <svg
                                                aria-hidden="true"
                                                className="mx-auto mb-4 text-gray-400 w-52 h-3w-52 dark:text-gray-200"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                ></path>
                                            </svg>
                                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400 py-12">
                                                Are you sure you want to chnage the status to { sessionStatus } of { sessionId }?
                                            </h3>
                                            <button
                                                data-modal-hide="popup-modal"
                                                type="button"
                                                onClick={ handleConfirm }
                                                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-20 py-10 mt-12 text-center mr-2"
                                            >
                                                Yes, I'm sure
                                            </button>
                                            <button
                                                data-modal-hide="popup-modal"
                                                type="button"
                                                onClick={ handleCancel }
                                                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-20 py-10 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600 mt-12"
                                            >
                                                No, cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    );
};

export default SessionList;
