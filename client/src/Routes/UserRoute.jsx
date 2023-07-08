import React, { Suspense, useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../Components/User/Dashboard/Dashboard';
import Header from '../Components/User/Header';
import Account from '../Components/MyAccount/Account';
import TrainersList from '../Components/User/Trainers/TrainersList';
import TrainerDetails from '../Components/User/Trainers/TrainerDetails';
import Loader from '../Components/Loader';

const UserRoute = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="">
            {/* Header */ }
            { isLoading ? (
                <Loader />
            ) : (
                <Suspense fallback={ <Loader /> }>
                    <Header />
                    {/* Body */ }
                    <main className="custom-dark-blue px-10 overflow-x-hidden md:px-8">
                        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">

                            <Routes>
                                <Route path="dashboard" element={ <Dashboard /> } />
                                <Route path="account" element={ <Account /> } />
                                <Route path="trainers" element={ <TrainersList /> } />
                                <Route path="trainer/details/:trainerId" element={ <TrainerDetails /> } />
                            </Routes>

                        </div>
                    </main>
                </Suspense>
            ) }
        </div>
    );
}

export default UserRoute;
