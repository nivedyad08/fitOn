import React from 'react';
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from '../../../config/axios';

const EditCategory = ({ setEditModalOpen, categoryName, categoryId, setData, categoryData }) => {
    const hideModal = () => {
        setEditModalOpen(false);
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm({
        defaultValues: {
            category: categoryName,
        },
    });

    const onSubmit = async (data) => {
        try {
            if (data) {
                const createCategory = await axios.post(`api/admin/update-category?categoryId=${ categoryId }`, data);
                if (createCategory.status === 200) {
                    const updatedData = categoryData.map((category) => {
                        if (category._id === categoryId) {
                            return { ...category, name: data.category };
                        }
                        return category;
                    });
                    setData(updatedData); // Update the data in the parent component
                    toast.success("Category Updated Successfully");
                }
                hideModal()
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An error occurred. Please try again later");
            }
        }
    }

    const { category } = watch(["category"])

    return (
        <>
            <div
                className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50"
                onClick={ hideModal }
            />
            <div
                id="authentication-modal"
                tabIndex="-1"
                aria-hidden="true"
                className="fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md max-h-full overflow-hidden"
            >
                <div className="relative bg-white rounded-lg shadow">
                    <button
                        type="button"
                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                        data-modal-hide="authentication-modal"
                        onClick={ hideModal }
                    >
                        <svg
                            aria-hidden="true"
                            className="w-16 h-16"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="px-8 py-8">
                        <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                            Edit Category
                        </h3>
                        <div className="w-full ">
                            <form className="bg-slate-50 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={ handleSubmit(onSubmit) }>
                                <div className="px-10 py-20 mb-20">
                                    <label className="block text-gray-700 text-sm font-bold mb-10" htmlFor="category">
                                        Category
                                    </label>
                                    <input
                                        id="category"
                                        name="category"
                                        type="text"
                                        { ...register("category", {
                                            required: "Category is required",
                                            pattern: {
                                                value: /^(?=.*\S)[A-Za-z\s]+$/i,
                                                message: "Name should only contain letters",
                                            },
                                        }) }
                                        className={ `shadow block h-50 w-full rounded-md border-slate-300 py-10 appearance-none px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-slate-500 ${ errors.category ? "border-red-500" : ""
                                            }` }
                                    />
                                    { errors.category && (
                                        <small className="mt-2 text-red-500 text-sm">
                                            { errors.category.message }
                                        </small>
                                    ) }
                                </div>
                                <div className="flex items-center justify-between">
                                    <button
                                        className="bg-yellow-500 hover:bg-yellow-700 text-slate-700 font-bold py-6 px-10 rounded focus:outline-none focus:shadow-outline mx-auto"
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditCategory;
