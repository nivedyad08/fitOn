import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from '../Components/Admin/Sidebar';
import AdminDashboard from '../Components/Admin/AdminDashboard';
import UsersList from '../Components/Admin/UsersList';
import TrainersList from '../Components/Admin/Trainer/TrainersList';
import Header from '../Components/Admin/Header';
import Categories from '../Components/Admin/Category/Categories';
import WorkoutList from '../Components/Admin/Workout/WorkoutList';
import ViewWorkout from '../Components/Admin/Workout/ViewWorkout';
import Transactions from '../Components/Admin/Transaction/Transactions';
import ViewTrainerDetails from '../Components/Admin/Trainer/ViewTrainerDetails';
import SubscriptionDetails from '../Components/Admin/Transaction/SubscriptionDetails';
import Error from '../Components/Error';

const AdminRoute = () => {
    return (
        <>
            <div className="flex h-screen">
                {/* Sidebar */ }
                <Sidebar />
                <div className="flex-grow bg-white">
                    {/* Header */ }
                    <Header />
                    {/* Body */ }
                    <div className="p-4">
                        <Routes>
                            <Route path="dashboard" element={ <AdminDashboard /> } />
                            <Route path="users" element={ <UsersList /> } />
                            <Route path="trainers" element={ <TrainersList /> } />
                            <Route path="trainer/view/:trainerId" element={ <ViewTrainerDetails /> } />
                            <Route path="workouts" element={ <WorkoutList /> } />
                            <Route path="workout/:workoutId" element={ <ViewWorkout /> } />
                            <Route path="categories" element={ <Categories /> } />
                            <Route path="transactions" element={ <Transactions /> } />
                            <Route path="transactions/details/:transactionId" element={ <SubscriptionDetails/> } />
                            <Route path="*" element={ <Error /> } />
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminRoute;
