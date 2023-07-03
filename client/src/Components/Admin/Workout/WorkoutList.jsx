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
                Header: "Workouts",
                // Second group columns
                columns: [
                    {
                        Header: "Workout Title",
                        accessor: "workoutTitle",
                    },
                    {
                        Header: "Trainer",
                        accessor: "trainerId",
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
                        accessor: "isActive",
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
                                    <VisibilityIcon className="cursor-pointer" onClick={ () => viewWorkout(row.original) } />
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