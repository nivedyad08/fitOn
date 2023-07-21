import React, { useState } from 'react';
import CategoryList from './CategoryList';
import AddCategory from './AddCategory';

const Categories = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [data, setData] = useState([])
    const toggleModal = () => {
        setModalOpen(true);
    };
    return (
        <div className='container mx-auto p-4'>
            <div className='flex justify-between mb-4'>
                <h2 className='text-2xl font-bold'>Categories</h2>
                <button
                    data-modal-target="authentication-modal"
                    data-modal-toggle="authentication-modal"
                    className="block text-white py-2 px-4 bg-yellow-600 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm mr-10 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
                    type="button"
                    onClick={ toggleModal }
                >
                    Add Category
                </button>
            </div>
            { modalOpen && (
                <AddCategory setModalOpen={ setModalOpen } data={ data } setData={ setData } />
            ) }
            <CategoryList data={ data } setData={ setData } />
        </div>
    );
}

export default Categories;
