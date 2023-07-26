import React, { useMemo, useState, useEffect } from "react";
import Table from "../Table";
import axios from "../../../config/axios"
import { TRAINER_ROLE, PENDING_TRAINER } from "../../../constants/roles"
import { Switch } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { trainerDetails } from "../../redux-toolkit/slices/trainerSlice";

const TrainersList = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const viewTrainer = (trainer) => {
        dispatch(trainerDetails(trainer))
        navigate(`/admin/trainer/view/${ trainer._id }`)
    }
    const columns = useMemo(
        () => [
            {
                // Second group - Details
                Header: " ",
                // Second group columns
                columns: [
                    {
                        Header: "First Name",
                        accessor: "firstName",
                        Cell: ({ value, row }) => {
                            const data = row.original
                            return (
                                <div className="flex items-center gap-x-6">
                                    <img className="h-40 w-40 rounded-full" src={ row.original.profilePic ? row.original.profilePic : "/images/user-plceholder.png" } alt="" />
                                    <h3 className="text-base leading-6 tracking-tight">{ row.original.firstName }</h3>
                                </div>
                            );
                        },
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
                        Header: "Workouts",
                        accessor: " ",
                        Cell: ({ row, value }) => {
                            const data = row.original
                            return (data.workouts.length)
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
                                    <VisibilityIcon className="cursor-pointer mt-6" onClick={ () => viewTrainer(row.original) } />
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
            <Table columns={ columns } data={ data } />
        </div>
    );
}

export default TrainersList;
