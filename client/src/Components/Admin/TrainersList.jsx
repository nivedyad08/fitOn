import React, { useMemo, useState, useEffect } from "react";
import Table from "./Table";
import axios from "../../config/axios"
import { TRAINER_ROLE, PENDING_TRAINER } from "../../constants/roles"

const TrainersList = () => {
    const columns = useMemo(
        () => [
            {
                // Second group - Details
                Header: "Trainers",
                // Second group columns
                columns: [
                    {
                        id: "checkbox",
                        Header: "",
                        accessor: "",
                        Cell: ({ row }) => (
                            <input
                                type="checkbox"
                                className="w-20"
                                checked={ row.isSelected }
                            />
                        ),
                    },
                    {
                        Header: "First Name",
                        accessor: "firstName",
                    },
                    {
                        Header: "Last Name",
                        accessor: "lastName",
                    },
                    {
                        Header: "Email",
                        accessor: "email",
                    },
                    {
                        Header: "Location",
                        accessor: "userLocation",
                    },
                    {
                        Header: "Payment",
                        accessor: "role",
                        Cell: ({ value }) => {
                            return value === PENDING_TRAINER ? "Pending" : "Completed"
                        }
                    },
                    {
                        Header: "Status",
                        accessor: "isActive",
                        Cell: ({ value }) => {
                            return value === true ? <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Active</span> : <span class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">Inactive</span>
                        }
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
            const result = await axios.get("/api/admin/trainers");
            setData(result.data.trainers);
        })();
    }, []);
    return (
        <div className="App">
            <Table columns={ columns } data={ data } />
        </div>
    );
}

export default TrainersList;
