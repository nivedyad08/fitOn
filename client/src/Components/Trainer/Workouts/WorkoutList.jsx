import React, { useMemo, useState, useEffect } from "react";
import Table from "../TrainerTable";
import axios from "../../../config/axios";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const WorkoutList = () => {
    const user = useSelector((state) => state.loggedUser.userInfo)
    const columns = useMemo(
        () => [
            {
                // Second group columns
                Header: "Workouts",
                columns: [
                    {
                        Header: "Workout Title",
                        accessor: "workoutTitle",
                        Cell: ({ value, row }) => {
                            const thumbnail = row.original.thumbnailImage
                            return (
                                <div className="flex items-center gap-x-6">
                                    <img className="h-40 w-40 " src={`http://localhost:8080/user/${thumbnail}`} alt="" />
                                    <h3 className="text-base leading-6 tracking-tight text-gray-200">{value}</h3>
                                </div>
                            )
                        }
                    },
                    {
                        Header: "Level",
                        accessor: "level[0].name",
                    },
                    {
                        Header: "Category",
                        accessor: "category[0].name",
                    },
                    {
                        Header: "No. of viewers",
                        accessor: "viewers",
                    },
                    {
                        Header: "Added to favorites",
                        accessor: "0 Favorites",
                    },
                    {
                        Header: "Action",
                        accessor: "isActive",
                        Cell: ({ value, row }) => {
                            return (
                                <div className="space-x-10" style={ { display: "flex", flexDirection: "row" } }>
                                    <CreateIcon />
                                    <DeleteIcon />
                                    <VisibilityIcon />
                                </div>
                            );
                        },
                    },
                ],
            },
        ],
        []
    );

    const [data, setData] = useState([]);
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`/api/trainer/workouts?userId=${ user._id }`);
                //   const usersWithSelection = result.data.users.map((user) => ({
                //     ...user,
                //     isSelected: false,
                //   }));
                setData(response.data.workouts);
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error("An error occurred. Please try again later");
                }
            }
        })();
    }, []);

    return (
        <div className="App h-screen">
            <Table
                columns={ columns }
                data={ data }
            />
        </div>
    );
};

export default WorkoutList;
