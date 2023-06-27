import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../Components/Trainer/Header';
import AddWorkout from '../Components/Trainer/AddWorkout';
import Dashboard from '../Components/Trainer/Dashboard/Dashboard';
import Account from '../Components/MyAccount/Account';

const TrainerRoute = () => {
    return (
        <>
            <div className="">
                {/* Header */ }
                <Header />
                {/* Body */ }
                <main className="h-full custom-dark-blue px-4 py-8 md:px-8 flex justify-center items-center">
                    <div className="mx-auto max-w-7xl w-11/12 py-12 sm:px-6 lg:px-8">
                        <Routes>
                            <Route path="dashboard" element={ <Dashboard /> } />
                            <Route path="add-workout" element={ <AddWorkout /> } />
                            <Route path="account" element={ <Account /> } />
                        </Routes>
                    </div>
                </main>
            </div>
        </>
    );
}

export default TrainerRoute;
