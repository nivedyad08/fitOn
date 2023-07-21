import React, { useState } from 'react';
import AddSession from './AddSession';
import SessionList from './SessionList';

function Sessions() {
    const [modalOpen, setModalOpen] = useState(false);
    const [data, setData] = useState([]);
    const toggleModal = () => {
        setModalOpen(true);
    };
    return (
        <div>
            <div className='container mx-auto p-4'>
                <div className='flex justify-between mb-4'>
                    <h2 className='text-2xl font-bold text-white uppercase'>Workout Sessions</h2>
                    <button
                        data-modal-target="authentication-modal"
                        data-modal-toggle="authentication-modal"
                        className="block text-white py-10 px-10 bg-yellow-600 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm mr-10 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
                        type="button"
                        onClick={ toggleModal }
                    >
                        Add New Session
                    </button>
                </div>
                { modalOpen && (
                    <AddSession setModalOpen={ setModalOpen } data={ data } setData={ setData } />
                ) }
                <SessionList data={ data } setData={ setData } />
            </div>
        </div>
    )
}

export default Sessions
