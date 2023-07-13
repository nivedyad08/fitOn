import React, { useMemo, useState, useEffect } from "react";
import Table from "../Table";
import axios from "../../../config/axios"
import { Switch } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TRAINER_ROLE, USER_ROLE } from "../../../constants/roles";
import { dateMonthYear } from "../../../helpers/CommonFunctions";
import { transactionDetails } from "../../redux-toolkit/slices/transactionSlice";

const Transactions = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const viewTransaction = (transaction) => {
        dispatch(transactionDetails(transaction))
        navigate(`/admin/transactions/details/${ transaction._id }`)
    }

    const date = new Date();
    const formattedDate = date.toLocaleDateString('en-GB');
    const columns = useMemo(
        () => [
            {
                // Second group - Details
                Header: " ",
                // Second group columns
                columns: [
                    {
                        Header: "Name",
                        accessor: "user.firstName",
                    },
                    {
                        Header: "Role",
                        accessor: "role",

                    },
                    {
                        Header: "PACKAGE",
                        accessor: "subscription.packageId",
                        Cell: ({ value, row }) => {
                            const data = row.original
                            return (
                                data.role === TRAINER_ROLE ? (
                                    <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Life Time</span>
                                ) : data.package.name === "ultimate" ? (
                                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300 capitalize">{ data.package.name }</span>
                                ) : (
                                    <span className="bg-pink-100 text-pink-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300 capitalize">{ data.package.name }</span>
                                )
                            );
                        },
                    },
                    {
                        Header: "Start Date",
                        accessor: "startDate",
                        Cell: ({ value, row }) => {
                            const data = row.original
                            return (
                                data.subscription ?
                                    dateMonthYear(data.subscription.startDate)
                                    : dateMonthYear(data.createdAt)

                            );
                        },
                    },
                    {
                        Header: "End Date",
                        accessor: "expiry_date",
                        Cell: ({ value, row }) => {
                            const data = row.original
                            return (
                                data.role === TRAINER_ROLE ?
                                    "-"
                                    : dateMonthYear(data.expiry_date)

                            );
                        },
                    },
                    {
                        Header: "Amount ($)",
                        accessor: "",
                        Cell: ({ value, row }) => {
                            const data = row.original
                            return (
                                data.trainerAmount ?
                                    ((parseFloat(data.adminAmount) + parseFloat(data.trainerAmount)).toFixed(2))
                                    : data.adminAmount
                            );
                        },

                    },
                    {
                        Header: "Commission (%)",
                        accessor: "commission",
                    },
                    {
                        Header: "Profit ($)",
                        accessor: "adminAmount",
                    },
                    {
                        Header: "Status",
                        accessor: " ",
                        Cell: ({ value, row }) => {
                            const data = row.original
                            const currentDate = new Date();
                            const expiryDate = new Date(data.expiry_date);

                            return (
                                (
                                    expiryDate > currentDate || data.expiry_date === null) ? <CheckCircleIcon className="text-green-600" /> : <CancelIcon className="text-red-600" />
                            );
                        },
                    },
                    {
                        Header: "Action",
                        accessor: "_id",
                        Cell: ({ value, row }) => {
                            const data = row.original
                            return (
                                data.role === USER_ROLE ?
                                    <div style={ { display: "flex", flexDirection: "row" } }>
                                        <VisibilityIcon className="cursor-pointer mt-6" onClick={ () => viewTransaction(row.original) } />
                                    </div>
                                    : " "
                            )
                        },
                    },

                ],
            },
        ],
        []
    );

    // data state to store the TV Maze API data. Its initial value is an empty array
    const [data, setData] = useState([]);
    useEffect(() => {
        (async () => {
            const result = await axios.get("/api/admin/transactions");
            setData(result.data.transactions);
        })();
    }, []);
    return (
        <div className="App">
            <Table columns={ columns } data={ data } />
        </div>
    );
}


export default Transactions;
