// Dashboard.js

import React, { useEffect, useState } from 'react';
import TotalCount from './TotalCount';
import TopWorkouts from './TopWorkouts';
import { fetchDashboardDetails } from "../../../Services/TrainerApi";
import { toast } from "react-toastify";
import { useSelector } from 'react-redux';

const Dashboard = () => {
    const [workout, setWorkoutDetails] = useState("");
    const user = useSelector((state) => state.loggedUser.userInfo);
    useEffect(() => {
        fetchDashboardDetails(user._id)
            .then((response) => {
                setWorkoutDetails(response);
            })
            .catch((error) => {
                if (error.response && error.response.status === 400) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error("An error occurred. Please try again later");
                }
            });
    }, []);
    return (
        <div className="w-full h-screen flex-shrink flex-grow-0 px-30">
            <TotalCount workout={ workout } />
            <div className="mt-40">
                <h2 className="text-2xl font-bold mb-4 text-custom-whitish">Top Workouts</h2>
                <TopWorkouts workout={workout.topWorkouts}/>
            </div>
        </div>
    );
};

export default Dashboard;
