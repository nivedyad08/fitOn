import React, { useMemo, useState, useEffect } from "react";
import Table from "../Trainer/TrainerTable";
import { toast } from "react-toastify";
import { fetchUserSubscriptionDetails } from "../../Services/UserApi"
import { useSelector } from "react-redux";
import { dateMonthYear } from "../../helpers/CommonFunctions";
import { USER_ROLE, TRAINER_ROLE } from "../../constants/roles"

const Subscription = () => {
    const [data, setData] = useState([]);
    const user = useSelector((state) => state.loggedUser.userInfo)
    useEffect(() => {
        fetchUserSubscriptionDetails(user._id).then((response) => {
            setData(response.subscriptions);
        }).catch((error) => {
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An error occurred. Please try again later");
            }
        })
    }, []);


    const columns = useMemo(
        () => [
            {
                // Second group columns
                Header: " ",
                columns: [
                    {
                        Header: user.role === USER_ROLE ? "Trainer" : "User",
                        accessor: "trainer[0].firstName",
                        Cell: ({ value, row }) => {
                            const data = row.original
                            return (
                                <span>{ data.trainer[0].firstName } { data.trainer[0].lastName }</span>
                            )
                        }
                    },
                    {
                        Header: "Transaction ID",
                        accessor: "paymentId",
                    },
                    {
                        Header: "Membership Plan",
                        accessor: "package[0].name",
                        Cell: ({ value, row }) => {
                            const data = row.original
                            return (
                                data.package[0].name === "pro" ?
                                    <>
                                        <span className="bg-pink-100 text-pink-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300 capitalize">{ data.package[0].name }</span>
                                        <br /><span> { data.package[0].duration } Months</span>
                                    </> :
                                    <>
                                        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300 capitalize">{ data.package[0].name }</span>
                                        <br /><span> { data.package[0].duration } Months</span>
                                    </>
                            )
                        }
                    },
                    {
                        Header: "Start Date",
                        accessor: "startDate",
                        Cell: ({ value, row }) => {
                            const data = row.original
                            return (
                                dateMonthYear(data.startDate)

                            );
                        },
                    },
                    {
                        Header: "End Date",
                        accessor: "endDate",
                        Cell: ({ value, row }) => {
                            const data = row.original
                            return (
                                dateMonthYear(data.endDate)

                            );
                        },
                    },
                    {
                        Header: "Amount",
                        accessor: "totalAmount",
                        Cell: ({ value, row }) => {
                            const data = row.original
                            return (
                                <span>${ data.totalAmount }</span>
                            )
                        }
                    },
                    {
                        Header: user.role === TRAINER_ROLE ? "Profit" : " ",
                        accessor: "transaction[0].trainerAmount",
                        Cell: ({ value, row }) => {
                            const data = row.original
                            return (
                                user.role === TRAINER_ROLE ? (
                                    <span>${ data.transaction[0].trainerAmount }</span>
                                ) : ""
                            )
                        }
                    },
                    {
                        Header: "Status",
                        accessor: " ",
                        Cell: ({ value, row }) => {
                            const data = row.original
                            const currentDate = new Date();
                            const expiryDate = new Date(data.endDate);
                            return (
                                (
                                    expiryDate > currentDate || data.endDate === null) ? <span className="bg-green-600 text-green-200 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 capitalize">Active</span> : <span className="bg-red-600 text-red-200 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300 capitalize">Inactive</span>
                            );
                        },
                    },
                ],
            },
        ],
        []
    );
    return (
        <div className="App h-screen w-md:full">
            <Table
                columns={ columns }
                data={ data }
                trColor="#303252"
            />
        </div>
    );
}
export default Subscription;
