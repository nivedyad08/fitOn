import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../Components/User/Dashboard/Dashboard';
import Header from '../Components/User/Header';
import Account from '../Components/MyAccount/Account';

const UserRoute = () => {
    return (
        <div className="">
                {/* Header */ }
                <Header/>
                {/* Body */ }
                <main className=" custom-dark-blue px-10 overflow-x-hidden md:px-8 flex justify-center items-center">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <Routes>
                            <Route path="dashboard" element={ <Dashboard /> } />
                            <Route path="account" element={ <Account /> } />
                        </Routes>
                    </div>
                </main>
            </div>
    );
}

export default UserRoute;
