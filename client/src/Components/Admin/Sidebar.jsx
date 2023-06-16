import React from 'react';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import GroupIcon from '@mui/icons-material/Group';
import StarIcon from '@mui/icons-material/Star';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    return (
        <aside
            className={ `${ isOpen ? 'w-1/12' : 'w-2/12' } sidebar-blue text-white flex-shrink-0 transition-all duration-300 relative` }
        >
            {/* Toggle Button */ }
            <button
                onClick={ toggleSidebar }
                className="bg-gray-800 text-white w-16 h-16 absolute top-4 right-4 flex items-center justify-center rounded-full focus:outline-none"
            >
                { isOpen ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-10 w-10"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className=""
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                ) }
            </button>

            {/* Brand */ }
            <div className="flex items-center justify-center">
                <div className="p-4 mt-10 flex items-center">
                    <img src="/logo.png" className="w-60 h-60" alt="Logo" />
                    <h1 className="text-2xl font-bold ml-2">Fiton</h1>
                </div>
            </div>

            {/* Sidebar Menu */ }
            <nav className="flex-grow">
                <ul className="p-4 ml-20">
                    <li className="mb-2 flex items-center">
                        <SpaceDashboardIcon className="mr-6 text-[#7D7E93]" style={ { fontSize: "medium" } } />
                        <Link to="/admin/dashboard" className="block leading-10 text-[#7D7E93] hover:text-white">Dashboard</Link>
                    </li>

                    <li className="mb-2 flex items-center">
                        <GroupIcon className="mr-6 text-[#7D7E93]" style={ { fontSize: "medium" } } />
                        <Link to="/admin/users" className="block leading-10 text-[#7D7E93] hover:text-white">Manage Users</Link>
                    </li>

                    <li className="mb-2 flex items-center">
                        <StarIcon className="mr-6 text-[#7D7E93]" style={ { fontSize: "medium" } } />
                        <Link to="/admin/trainers" className="block leading-10 text-[#7D7E93] hover:text-white">Manage Trainers</Link>
                    </li>

                    <li className="mb-2 flex items-center">
                        <FitnessCenterIcon className="mr-6 text-[#7D7E93]" style={ { fontSize: "medium" } } />
                        <Link to="/admin/workouts" className="block leading-10 text-[#7D7E93] hover:text-white">Manage Workouts</Link>
                    </li>

                    <li className="mb-2 flex items-center">
                        <ReceiptLongIcon className="mr-6 text-[#7D7E93]" style={ { fontSize: "medium" } } />
                        <Link to="/admin/transactions" className="block leading-10 text-[#7D7E93] hover:text-white">Manage Transactions</Link>
                    </li>
                </ul>
            </nav>

        </aside>
    );
}

export default Sidebar;
