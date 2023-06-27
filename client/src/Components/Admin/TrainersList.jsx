import React, { useMemo, useState, useEffect } from "react";
import Table from "./Table";
import axios from "../../config/axios"
import { TRAINER_ROLE, PENDING_TRAINER } from "../../constants/roles"
import { Switch } from "@mui/material";

const TrainersList = () => {
    const columns = useMemo(
        () => [
            {
                // Second group - Details
                Header: "Trainers",
                // Second group columns
                columns: [
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
                        Cell: ({ value, row }) => {
                            const [isChecked, setIsChecked] = useState(
                                value
                            );
                            const handleUserStatus = async (e) => {
                                setIsChecked(!isChecked);

                                const response = await axios.put(
                                    `/api/admin/change-user-status/${ row.original._id }`
                                );
                                alert(response.data.message);
                            };
                            return (
                                <div style={ { display: "flex", flexDirection: "row" } }>
                                    <Switch
                                        color="success"
                                        checked={ isChecked }
                                        onChange={ handleUserStatus }
                                    />
                                </div>
                            );
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
            const result = await axios.get("/api/admin/trainers");
            setData(result.data.trainers);
        })();
    }, []);
    return (
        <div className="App">
            <Table columns={ columns } data={ data }  />
        </div>
    );
}

export default TrainersList;
