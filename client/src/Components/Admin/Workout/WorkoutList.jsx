import React, { useMemo, useState, useEffect } from "react";
import Table from "../Table";
import axios from "../../../config/axios"
import { TRAINER_ROLE, PENDING_TRAINER } from "../../../constants/roles"
import { Switch } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { workoutDetails } from "../../redux-toolkit/slices/workoutSlice";

const WorkoutList = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    //Workout view
    const viewWorkout = (workout) => {
        dispatch(workoutDetails(workout))
        navigate(`/admin/workout/${ workout._id }`)
    }
    const columns = useMemo(
        () => [
            {
                // Second group - Details
                Header: " ",
                // Second group columns
                columns: [
                    {
                        Header: "Workout Title",
                        accessor: "workoutTitle",
                        Cell: ({ value, row }) => {
                            const data = row.original
                            return (
                                <div className="flex items-center gap-x-6">
                                    <img className="h-40 w-40 rounded-full" src={ row.original.thumbnailImage ? row.original.thumbnailImage : "/images/user-plceholder.png" } alt="" />
                                    <h3 className="text-base leading-6 tracking-tight">{ row.original.workoutTitle }</h3>
                                </div>
                            );
                        },
                    },
                    {
                        Header: "Trainer",
                        accessor: "trainer[0].firstName",
                    },
                    {
                        Header: "Workout Category",
                        accessor: "category[0].name",
                    },
                    {
                        Header: "Workout Level",
                        accessor: "level[0].name",
                    },
                    {
                        Header: "No . of views",
                        accessor: "viewers",
                    },
                    {
                        Header: "Added to favourites",
                        accessor: "0",
                    },
                    {
                        Header: "Status",
                        accessor: "status",
                        Cell: ({ value, row }) => {
                            const [isChecked, setIsChecked] = useState(
                                value
                            );
                            const handleWorkoutStatus = async (e) => {
                                setIsChecked(!isChecked);

                                const response = await axios.put(
                                    `/api/admin/workout/change-status?workoutId=${ row.original._id }`
                                );
                                alert(response.data.message);
                            };
                            return (
                                <div style={ { display: "flex", flexDirection: "row" } }>
                                    <Switch
                                        color="success"
                                        checked={ isChecked }
                                        onChange={ handleWorkoutStatus }
                                    />
                                    <VisibilityIcon className="cursor-pointer mt-6" onClick={ () => viewWorkout(row.original) } />
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
            const result = await axios.get("/api/admin/workouts");
            console.log(result);
            setData(result.data.workouts);
        })();
    }, []);
    return (
        <div className="App">
            <Table columns={ columns } data={ data } />
        </div>
    );
}

export default WorkoutList;
