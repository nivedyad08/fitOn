import React from 'react';
import PopularWorkouts from './PopularWorkouts';
import TrainersList from './TrainersList';

const Dashboard = () => {
    return (
        <>
            <TrainersList/>
            <PopularWorkouts/>
        </>
    );
}

export default Dashboard;
