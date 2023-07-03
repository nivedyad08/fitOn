import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from '../Components/Admin/Sidebar';
import AdminDashboard from '../Components/Admin/AdminDashboard';
import UsersList from '../Components/Admin/UsersList';
import TrainersList from '../Components/Admin/TrainersList';
import Header from '../Components/Admin/Header';
import Categories from '../Components/Admin/Category/Categories';
import WorkoutList from '../Components/Admin/Workout/WorkoutList';
import ViewWorkout from '../Components/Admin/Workout/ViewWorkout';

const AdminRoute = () => {
    return (
        <>
            <div className="flex h-screen">
                {/* Sidebar */ }
                <Sidebar />
                <div className="flex-grow">
                    {/* Header */ }
                    <Header />
                    {/* Body */ }
                    <div className="p-4">
                        <Routes>
                            <Route path="dashboard" element={ <AdminDashboard /> } />
                            <Route path="users" element={ <UsersList /> } />
                            <Route path="trainers" element={ <TrainersList /> } />
                            <Route path="workouts" element={ <WorkoutList /> } />
                            <Route path="workout/:workoutId" element={ <ViewWorkout /> } />
                            <Route path="categories" element={ <Categories /> } />
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminRoute;
