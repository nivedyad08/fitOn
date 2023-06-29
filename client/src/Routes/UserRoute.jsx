import React from 'react';
import Header from '../Components/Header';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../Components/User/Dashboard/Dashboard';

const UserRoute = () => {
    return (
        <div className="">
                {/* Header */ }
                <Header/>
                {/* Body */ }
                <main className="h-full custom-dark-blue px-4 py-8 md:px-8 flex justify-center items-center">
                    <div className="mx-auto max-w-7xl w-11/12 py-12 sm:px-6 lg:px-8">
                        <Routes>
                            <Route path="dashboard" element={ <Dashboard /> } />
                        </Routes>
                    </div>
                </main>
            </div>
    );
}

export default UserRoute;
