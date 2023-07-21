import React, { Suspense, useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../Components/User/Dashboard/Dashboard';
import Header from '../Components/User/Header';
import Account from '../Components/MyAccount/Account';
import TrainersList from '../Components/User/Trainers/TrainersList';
import TrainerDetails from '../Components/User/Trainers/TrainerDetails';
import Loader from '../Components/Loader';
import UserPricingPlans from '../Components/User/Membership/UserMembershipDetails';
import Checkout from '../Components/User/Membership/Checkout';
import Watch from '../Components/User/Trainers/Watch';
import Error from '../Components/Error';
import Messages from '../Components/Messages/Messages';
import Sessions from '../Components/User/Sessions';

const UserRoute = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timeout);
    }, []);

    const [notifications, setNotifications] = useState([]);
    const [selectedChat, setSelectedChat] = useState("");
    return (
        <div className="">
            {/* Header */ }
            { isLoading ? (
                <Loader />
            ) : (
                <Suspense fallback={ <Loader /> }>
                    <Header notifications={ notifications } setNotifications={ setNotifications } setSelectedChat={ setSelectedChat } />
                    {/* Body */ }
                    <main className="custom-dark-blue px-10 overflow-x-hidden md:px-8">
                        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">

                            <Routes>
                                <Route path="dashboard" element={ <Dashboard /> } />
                                <Route path="account" element={ <Account /> } />
                                <Route path="trainers" element={ <TrainersList /> } />
                                <Route path="sessions" element={ <Sessions /> } />
                                <Route path="trainer/details/:trainerId" element={ <TrainerDetails /> } />
                                <Route path="subscribe/membership" element={ <UserPricingPlans /> } />
                                <Route path="checkout/:mode/:userId" element={ <Checkout /> } />
                                <Route path="trainer/watch/:workoutVideo/:workoutId" element={ <Watch /> } />
                                <Route path="chats" element={ <Messages setNotifications={ setNotifications } notifications={ notifications } selectedChat={ selectedChat } /> } />
                                <Route path="*" element={ <Error /> } />
                            </Routes>

                        </div>
                    </main>
                </Suspense>
            ) }
        </div>
    );
}

export default UserRoute;
