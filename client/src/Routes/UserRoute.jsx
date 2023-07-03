import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../Components/User/Dashboard/Dashboard';
import Header from '../Components/User/Header';

const UserRoute = () => {
    return (
        <div className="">
                {/* Header */ }
                <Header/>
                {/* Body */ }
                <main className="h-full custom-dark-blue px-4 py-8 md:px-8 flex justify-center items-center">
                    <div className="min-h-screen pb-20 px-52">
                        <Routes>
                            <Route path="dashboard" element={ <Dashboard /> } />
                            {/* <Route path="account" element={ <Account /> } /> */}
                        </Routes>
                    </div>
                </main>
            </div>
    );
}

export default UserRoute;
