import React, { useMemo, useState, useEffect } from "react";
import Table from "../Table";
import axios from "../../../config/axios"
import { Switch } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Transactions = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const viewTransaction = (transaction) => {
        // dispatch(trainerDetails(trainer))
        // navigate(`/admin/trainer/view/${ trainer._id }`)
    }
    const columns = useMemo(
        () => [
            // {
            //     // Second group - Details
            //     Header: " ",
            //     // Second group columns
            //     columns: [
            //         {
            //             Header: "Name",
            //             accessor: "firstName",
            //         },
            //         {
            //             Header: "Role",
            //             accessor: "lastName",
            //         },
            //         {
            //             Header: "Subscription",
            //             accessor: "email",
            //         },
            //         {
            //             Header: "Start Date",
            //             accessor: "userLocation",
            //         },
            //         {
            //             Header: "End Date",
            //             accessor: "userLocation",
            //         },
            //         {
            //             Header: "Amount",
            //             accessor: "userLocation",
            //         },
            //         {
            //             Header: "Commission",
            //             accessor: "userLocation",
            //         },
            //         {
            //             Header: "Profit",
            //             accessor: "userLocation",
            //         },
            //         {
            //             Header: "Status",
            //             accessor: "isActive",
            //             Cell: ({ value, row }) => {
            //                 return (
            //                     <div style={ { display: "flex", flexDirection: "row" } }>
            //                         <VisibilityIcon className="cursor-pointer mt-6" onClick={ () => viewTransaction(row.original) } />
            //                     </div>
            //                 );
            //             },
            //         },
            //     ],
            // },
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
