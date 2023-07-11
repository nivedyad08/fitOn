import React, { Suspense, useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import AddWorkout from '../Components/Trainer/Workouts/AddWorkout';
import Dashboard from '../Components/Trainer/Dashboard/Dashboard';
import Account from '../Components/MyAccount/Account';
import WorkoutList from '../Components/Trainer/Workouts/WorkoutList';
import ViewWorkout from '../Components/Trainer/Workouts/ViewWorkout';
import EditWorkout from '../Components/Trainer/Workouts/EditWorkout';
import Header from '../Components/Trainer/Header';
import Loader from '../Components/Loader';

const TrainerRoute = () => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <>
            <div className="custom-dark-blue"> {/* Update the className to include "h-screen" */ }
                {/* Header */ }
                { isLoading ? (
                    <Loader />
                ) : (
                    <Suspense fallback={ <Loader /> }>
                        <Header />
                        {/* Body */ }
                        <main className="px-4 py-8 md:px-8 flex justify-center items-center">
                            <div className="mx-auto max-w-7xl w-11/12 py-12 sm:px-6 lg:px-8">
                                <Routes>
                                    <Route path="dashboard" element={ <Dashboard /> } />
                                    <Route path="add-workout" element={ <AddWorkout /> } />
                                    <Route path="workouts" element={ <WorkoutList /> } />
                                    <Route path="workout/:workoutId" element={ <ViewWorkout /> } />
                                    <Route path="edit/:workoutId" element={ <EditWorkout /> } />
                                    <Route path="account" element={ <Account /> } />

                                </Routes>
                            </div>
                        </main>
                    </Suspense>
                ) }
            </div>
        </>
    );
}

export default TrainerRoute;
