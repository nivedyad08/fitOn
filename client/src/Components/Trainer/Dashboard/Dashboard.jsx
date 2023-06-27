import React from 'react';
import TotalCount from './TotalCount';
import TopWorkouts from './TopWorkouts';

const Dashboard = () => {
    return (
        <div className="w-full h-screen flex-shrink flex-grow-0 px-30">
            <TotalCount />
            <div className="mt-40">
                <h2 className="text-2xl font-bold mb-4 text-custom-whitish">Top Workouts</h2>
                <TopWorkouts/>
            </div>
        </div>

    );
}

export default Dashboard;
