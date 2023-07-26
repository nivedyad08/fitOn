import axios from "../../config/axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loggedUserDetails } from "../redux-toolkit/slices/userSlice";
import { USER_ROLE } from "../../constants/roles";
import { useForm } from "react-hook-form";

const EditUserAccount = ({ setIsLoading }) => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.loggedUser.userInfo)

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm({
        defaultValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            userBio: user.userBio,
            userLocation: user.userLocation,
            coverPhoto: user.coverPhoto,
            profilePic: user.profilePic,
        },
    });
    const { firstName, lastName, email, coverPhoto, profilePic, userBio, userLocation } = watch(["firstName", "lastName", "email", "coverPhoto", "profilePic", "userBio", "userLocation"])
    const [selectedProfilePic, setProfilePic] = useState("");
    const [showProfileImage, setProfileImage] = useState("");

    const [selectedCoverPic, setCoverPic] = useState("");
    const [showCoverImage, setCoverImage] = useState("");

    const handleProfilePicChange = (e) => {
        setProfilePic(e.target.files[0]);
        setProfileImage(URL.createObjectURL(e.target.files[0]));
    };

    const handleCoverPhotoChange = (e) => {
        setCoverPic(e.target.files[0]);
        setCoverImage(URL.createObjectURL(e.target.files[0]));
    };

    const onSubmit = async (data) => {
        try {
            if (data) {
                setIsLoading(true);
                const formData = new FormData();
                // Append form fields to formData
                formData.append("firstName", data.firstName);
                formData.append("lastName", data.lastName);
                formData.append("userLocation", data.userLocation);
                formData.append("userBio", data.userBio);
                formData.append("coverPhoto", selectedCoverPic);
                formData.append("profilePic", selectedProfilePic);
                const response = await axios.post(`api/trainer/edit-user-details?userId=${ user._id }`, formData)
                console.log(response);
                if (response.status === 200) {
                    dispatch(loggedUserDetails(response.data.user));
                    toast.success("User details updated successfully");
                }
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An error occurred. Please try again later");
            }
        } finally {
            setIsLoading(false); // Reset the loading state from the TrainerRoute component
        }
    }
    return (
        <form className='custom-blue px-10 py-6 rounded-md max-w-md mx-auto' onSubmit={ handleSubmit(onSubmit) }
            enctype="multipart/form-data">
            <div className="space-y-2">
                <div className="border-b border-gray-900/10 pb-12">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                        <div className="sm:col-span-3">
                            <label htmlFor="category" className="block text-sm font-lg leading-6 text-custom-whitish">
                                First Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="firstName"
                                    name="firstName"
                                    { ...register("firstName", {
                                        required: "First name is required",
                                        pattern: {
                                            value: /^(?=.*\S)[A-Za-z\s\d!@#$%^&*()_+=\-[\]{};':"\\|,.<>/?]+$/i,
                                            message: "Title should only contain letters",
                                        },
                                    }) }
                                    className={ `block h-40 w-full rounded-md border-0 py-1.5 text-gray-200  ring-inset placeholder-gray-500 pl-4 placeholder-opacity-100  custom-blue-shade1 sm:text-sm sm:leading-6 ${ errors.firstName ? "border-red-500" : ""
                                        }` }
                                />
                                { errors.firstName && (
                                    <small className="mt-2 text-red-500 text-sm">
                                        { errors.firstName.message }
                                    </small>
                                ) }
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="last-name" className="block text-sm font-lg leading-6 text-custom-whitish">
                                Last Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="lastName"
                                    name="lastName"
                                    { ...register("lastName", {
                                        required: "First name is required",
                                        pattern: {
                                            value: /^(?=.*\S)[A-Za-z\s\d!@#$%^&*()_+=\-[\]{};':"\\|,.<>/?]+$/i,
                                            message: "Title should only contain letters",
                                        },
                                    }) }
                                    className={ `block h-40 w-full rounded-md border-0 py-1.5 text-gray-200  ring-inset placeholder-gray-500 pl-4 placeholder-opacity-100  custom-blue-shade1 sm:text-sm sm:leading-6 ${ errors.lastName ? "border-red-500" : ""
                                        }` }
                                />
                                { errors.lastName && (
                                    <small className="mt-2 text-red-500 text-sm">
                                        { errors.lastName.message }
                                    </small>
                                ) }
                            </div>
                        </div>

                        <div className="col-span-full mt-10">
                            <label htmlFor="email" className="block text-sm font-lg leading-6 text-custom-whitish">
                                Email
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    disabled readonly
                                    className="block h-40 w-full rounded-md border-0 py-1.5 text-gray-400  ring-inset pl-4 placeholder-opacity-100  custom-blue-shade1 sm:text-sm sm:leading-6"
                                    defaultValue={ user.email }
                                />
                            </div>
                        </div>

                        <div className="col-span-full mt-10">
                            <label htmlFor="location" className="block text-sm font-lg leading-6 text-custom-whitish">
                                Location
                            </label>
                            <div className="mt-2">
                                <input
                                    id="userLocation"
                                    name="userLocation"
                                    { ...register("userLocation", {
                                        required: "Location is required",
                                        pattern: {
                                            value: /^(?=.*\S)[A-Za-z\s\d!@#$%^&*()_+=\-[\]{};':"\\|,.<>/?]+$/i,
                                            message: "Title should only contain letters",
                                        },
                                    }) }
                                    className={ `block h-40 w-full rounded-md border-0 py-1.5 text-gray-200  ring-inset placeholder-gray-500 pl-4 placeholder-opacity-100  custom-blue-shade1 sm:text-sm sm:leading-6 ${ errors.userLocation ? "border-red-500" : ""
                                        }` }
                                />
                                { errors.userLocation && (
                                    <small className="mt-2 text-red-500 text-sm">
                                        { errors.userLocation.message }
                                    </small>
                                ) }
                            </div>
                        </div>

                        {
                            user.role === USER_ROLE ? ("") :
                                <>
                                    <div className="col-span-full mt-10">
                                        <label htmlFor="bio" className="block text-sm font-lg leading-6 text-custom-whitish">
                                            Bio
                                        </label>
                                        <div className="mt-2">
                                            <textarea
                                                id="userBio"
                                                name="userBio"
                                                rows={ 4 }
                                                { ...register("userBio", {
                                                    required: "Bio is required",
                                                }) }
                                                className={ `block h-40 w-full rounded-md border-0 py-1.5 text-gray-200  ring-inset placeholder-gray-500 pl-4 placeholder-opacity-100  custom-blue-shade1 sm:text-sm sm:leading-6 ${ errors.userBio ? "border-red-500" : ""
                                                    }` }
                                            />
                                            { errors.userBio && (
                                                <small className="mt-2 text-red-500 text-sm">
                                                    { errors.userBio.message }
                                                </small>
                                            ) }
                                        </div>
                                    </div>
                                    <div className="col-span-full">
                                        <label htmlFor="cover-photo" className="block text-sm font-lg leading-6 text-custom-whitish">Cover Photo
                                        </label>

                                        <div className="flex items-center justify-center w-full">
                                            <label
                                                htmlFor="dropzone-file"
                                                className={ `flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 ${ showCoverImage
                                                    ? "h-auto"
                                                    : "dark:hover:bg-gray-800 dark:bg-gray-700 h-auto"
                                                    }` }
                                            >
                                                { showCoverImage ? (
                                                    <div className="h-full">
                                                        <img
                                                            className="h-full w-full"
                                                            id="selected-image"
                                                            src={ showCoverImage }
                                                            alt="Selected Image"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="h-full">
                                                        <img
                                                            className="h-full w-full"
                                                            id="selected-image"
                                                            src={ user.coverPhoto }
                                                            alt="Selected Image"
                                                        />
                                                    </div>
                                                ) }
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <svg
                                                        aria-hidden="true"
                                                        className="w-10 h-10 mb-3 text-gray-400"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                        ></path>
                                                    </svg>
                                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                        <span className="font-semibold">Click to upload</span> or drag
                                                        and drop
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                                                    </p>
                                                </div>
                                                <input
                                                    id="dropzone-file"
                                                    type="file"
                                                    name="coverPhoto"
                                                    className="hidden"
                                                    onChange={ handleCoverPhotoChange }
                                                />
                                                { errors.coverPhoto && (
                                                    <small className="mt-2 text-red-500 text-sm">
                                                        { errors.coverPhoto.message }
                                                    </small>
                                                ) }
                                            </label>
                                        </div>

                                    </div>
                                </>
                        }
                        <div className="col-span-full mt-12">
                            <div className="flex flex-col items-left gap-x-6">
                                <label htmlFor="cover-photo" className="block text-sm font-lg leading-6 text-custom-whitish">Profile Image
                                </label>
                                { showProfileImage ? (
                                    <img
                                        className="h-96 w-96 object-cover rounded-full"
                                        src={ showProfileImage }
                                        alt="Current profile photo"
                                    />
                                ) : user.profilePic === null ?
                                    <>
                                        <h3 className="text-yellow-500 text-sm">Upload profile photo </h3>
                                        <img
                                            className="h-96 w-96 object-cover rounded-full"
                                            src="/images/user-plceholder.png"
                                            alt={ user.firstName }
                                        />
                                    </>
                                    : (
                                        <img
                                            className="h-96 w-96 object-cover rounded-full"
                                            src={ user.profilePic }
                                            alt={ user.firstName }
                                        />
                                    ) }
                            </div>
                            <div className="mt-2 ">
                                <input className="block w-full text-sm h-30 text-gray-900 rounded-lg cursor-pointer custom-blue-shade1 dark:text-gray-400 focus:outline-none dark:bg-gray-700 placeholder-gray-500 placeholder-opacity-10"
                                    id="file_input" type="file"
                                    { ...register("profilePic", {
                                        required: user?.profilePic ? false : "Profile pic is required",
                                    }) }
                                    onChange={ handleProfilePicChange }
                                />
                                { errors.profilePic && (
                                    <small className="mt-2 text-red-500 text-sm">
                                        { errors.profilePic.message }
                                    </small>
                                ) }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm custom-light-blue focus-visible:outline-2 focus-visible:outline-offset-2 rounded-md px-20 py-8 text-white font-semibold leading-6">
                    Cancel
                </button>
                <button
                    type="submit"
                    className="rounded-md custom-yellow px-20 py-8 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Update
                </button>
            </div>
        </form>
    );
}

export default EditUserAccount;
