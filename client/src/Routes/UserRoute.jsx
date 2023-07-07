import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../Components/User/Dashboard/Dashboard';
import Header from '../Components/User/Header';
import Account from '../Components/MyAccount/Account';
import TrainersList from '../Components/User/Trainers/TrainersList';
import TrainerDetails from '../Components/User/Trainers/TrainerDetails';

const UserRoute = () => {
    return (
        <div className="">
                {/* Header */ }
                <Header/>
                {/* Body */ }
                <main className=" custom-dark-blue px-10 overflow-x-hidden md:px-8 ">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <Routes>
                            <Route path="dashboard" element={ <Dashboard /> } />
                            <Route path="account" element={ <Account /> } />
                            <Route path="trainers" element={ <TrainersList /> } />
                            <Route path="trainer/details/:trainerId" element={ <TrainerDetails /> } />
                        </Routes>
                    </div>
                </main>
            </div>
    );
}

export default UserRoute;
