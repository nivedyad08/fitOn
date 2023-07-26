import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "../../../config/axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditWorkout = () => {
    const workout = useSelector((state) => state.workoutDetails.workoutInfo)
    const [categories, setCategories] = useState([])
    const [levels, setLevels] = useState([])
    useEffect(() => {
        axios.get("api/admin/categories").then((response) => {
            const list = response.data.categories
            setCategories(list)
        }).catch((error) => {
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An error occurred. Please try again later");
            }
        })
        axios.get("api/admin/levels").then((response) => {
            const data = response.data.levels
            setLevels(data)
        }).catch((error) => {
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An error occurred. Please try again later");
            }
        })
    }, []);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm({
        defaultValues: {
            workoutTitle: workout.workoutTitle,
            description: workout.description,
            category: workout.category,
            difficultyLevel: workout.difficultyLevel,
            thumbnailImage: workout.thumbnailImage,
            video: workout.video,
        },
    });
    const { workoutTitle, description, category, difficultyLevel, thumbnailImage, videos } = watch(["workoutTitle", "description", "category", "difficultyLevel", "thumbnailImage", "videos"])

    const [selectedThumbnailePic, setThumbnailePic] = useState("");
    const [showThumbnaileImage, setThumbnaileImage] = useState("");

    const [videoFile, setVideos] = useState([]);

    const [imageSize, setImageSize] = useState(0)
    const [videoSize, setVideoSize] = useState("")

    const handleThumbnailPicChange = (e) => {
        setThumbnailePic(e.target.files[0]);
        setThumbnaileImage(URL.createObjectURL(e.target.files[0]));
    };

    const user = useSelector((state) => state.loggedUser.userInfo)
    const onSubmit = async (data) => {
        try {
            if (data) {
                const formData = new FormData();
                // Append form fields to formData
                console.log(data);
                formData.append("workoutTitle", data.workoutTitle);
                formData.append("description", data.description);
                formData.append("category", data.category);
                formData.append("difficultyLevel", data.difficultyLevel);
                formData.append("thumbnailImage", data.thumbnailImage[0]);

                const response = await axios.post(`api/trainer/edit-workout?workoutId=${ workout._id }`, formData)
                console.log(response);
                // if (response.status === 200) {
                //     const formVideoData = new FormData();
                //     const workoutId = response.data.workout._id
                //     for (let key in videoFile) {
                //         formVideoData.append("videos", videoFile[key]);
                //     }
                //     const upload = await axios.post(`api/trainer/upload-workout-video?workoutId=${ workoutId }`, formVideoData)
                //     if (upload.status === 200) {
                //         toast.success("Workout added successfully");
                //         navigate("/trainer/workouts");
                //     }
                // }
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An error occurred. Please try again later");
            }
        }
    };

    return (
        <div className='max-w-7xl w-5/6 mx-auto py-20'>
            <form className='custom-blue p-20 rounded-md' onSubmit={ handleSubmit(onSubmit) }>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-2xl font-semibold leading-10 text-white">EDIT WORKOUT</h2>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="col-span-full mt-10">
                                <label htmlFor="workoutTitle" className="block text-sm font-lg leading-6 text-custom-whitish">
                                    Workout Title
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="workoutTitle"
                                        name="workoutTitle"
                                        placeholder='Enter your description'
                                        { ...register("workoutTitle", {
                                            required: "Workout Title is required",
                                            pattern: {
                                                value: /^(?=.*\S)[A-Za-z\s\d!@#$%^&*()_+=\-[\]{};':"\\|,.<>/?]+$/i,
                                                message: "Title should only contain letters",
                                            },
                                        }) }
                                        className={ `block h-40 w-full rounded-md border-0 py-1.5 text-gray-200  ring-inset placeholder-gray-500 pl-4 placeholder-opacity-100  custom-blue-shade1 sm:text-sm sm:leading-6 ${ errors.workoutTitle ? "border-red-500" : ""
                                            }` }
                                    />
                                    { errors.workoutTitle && (
                                        <small className="mt-2 text-red-500 text-sm">
                                            { errors.workoutTitle.message }
                                        </small>
                                    ) }
                                </div>
                            </div>

                            <div className="col-span-full mt-10">
                                <label htmlFor="description" className="block text-sm font-lg leading-6 text-custom-whitish">
                                    Description
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows={ 4 }
                                        placeholder='Enter your description'
                                        defaultValue={ '' }
                                        { ...register("description", {
                                            required: "Description is required",
                                        }) }
                                        className={ `block w-full rounded-md border-0 py-1.5 text-gray-200  ring-inset placeholder-gray-500 pl-4 placeholder-opacity-100  custom-blue-shade1 sm:text-sm sm:leading-6 ${ errors.description ? "border-red-500" : ""
                                            }` }
                                    />
                                    { errors.description && (
                                        <small className="mt-2 text-red-500 text-sm">
                                            { errors.description.message }
                                        </small>
                                    ) }
                                </div>
                                <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about the workout.</p>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="category" className="block text-sm font-lg leading-6 text-custom-whitish">
                                    Workout Category
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="category"
                                        name="category"
                                        autoComplete="level-name"
                                        { ...register("category", {
                                            required: "Category is required",
                                        }) }
                                        className={ `block w-full h-40 custom-blue-shade1 rounded-md border-0 py-3 text-gray-200 shadow-sm placeholder-gray-500 pl-4 placeholder-opacity-10 sm:text-sm sm:leading-6 ${ errors.category ? "border-red-500" : ""
                                            }` }
                                        defaultValue={ workout?.category }
                                    >
                                        { categories?.map((category, i) => (
                                            <option key={ i } value={ category._id }>{ category.name }</option>
                                        )) }
                                    </select>
                                    { errors.category && (
                                        <small className="mt-2 text-red-500 text-sm">
                                            { errors.category.message }
                                        </small>
                                    ) }
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="last-name" className="block text-sm font-lg leading-6 text-custom-whitish">
                                    Difficulty Level
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="difficultyLevel"
                                        name="difficultyLevel"
                                        autoComplete="level-name"
                                        { ...register("difficultyLevel", {
                                            required: "Difficulty Level is required",
                                        }) }
                                        className={ `block w-full h-40 custom-blue-shade1 rounded-md border-0 py-3 text-gray-200 shadow-sm placeholder-gray-500 pl-4 placeholder-opacity-10 sm:text-sm sm:leading-6 ${ errors.difficultyLevel ? "border-red-500" : ""
                                            }` }
                                        defaultValue={ workout.difficultyLevel }
                                    >
                                        { levels.map((level, i) => (
                                            <option key={ i } value={ level._id }>{ level.name }</option>
                                        )) }
                                    </select>
                                    { errors.difficultyLevel && (
                                        <small className="mt-2 text-red-500 text-sm">
                                            { errors.difficultyLevel.message }
                                        </small>
                                    ) }
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="cover-photo" className="block text-sm font-lg leading-6 text-custom-whitish">Thumbnail Image
                                </label>
                                { showThumbnaileImage ? (
                                    <img
                                        className="h-96 w-96 object-cover "
                                        src={ showThumbnaileImage }
                                        alt="Current profile photo"
                                    />
                                ) : (
                                    <img
                                        className="h-96 w-96 object-cover "
                                        src={ workout?.thumbnailImage }
                                        alt="Current profile photo"
                                    />
                                ) }
                                <div className="mt-2">
                                    <input
                                        className="block w-full text-sm h-30 text-gray-900 rounded-lg cursor-pointer custom-blue-shade1 dark:text-gray-400 focus:outline-none dark:bg-gray-700 placeholder-gray-500 placeholder-opacity-10"
                                        id="file_input"
                                        type="file"
                                        name="thumbnailImage"
                                        { ...register("thumbnailImage", {
                                            required: workout?.thumbnailImage ? false : "Image is required",
                                            // validate: {
                                            //     filesize: (file) => {
                                            //         if (file && file[0]) {
                                            //             const sizeInkB = file[0].size / 1024;
                                            //             setImageSize(sizeInkB);
                                            //             const maxImageSize = 800;
                                            //             return (
                                            //                 sizeInkB <= maxImageSize ||
                                            //                 `Image should not exceed ${ maxImageSize }KB`
                                            //             );
                                            //         }
                                            //         return true;
                                            //     },
                                            // },
                                        }) }
                                        onChange={ handleThumbnailPicChange }
                                    />
                                </div>
                                { errors.thumbnailImage && (
                                    <small className="mt-2 text-red-500 text-sm">
                                        { errors.thumbnailImage.message }
                                    </small>
                                ) }
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="cover-photo" className="block text-sm font-lg leading-6 text-custom-whitish">Upload Workout Video
                                </label>
                                <div className="mt-2 ">
                                    <video className="h-96" controls>
                                        <source src={ workout.video } type="video/mp4" />
                                    </video>
                                    <input
                                        type="file"
                                        name="videos"
                                        id="videos"
                                        multiple
                                        className="block w-full text-sm h-30 text-gray-900 rounded-lg cursor-pointer custom-blue-shade1 dark:text-gray-400 focus:outline-none dark:bg-gray-700 placeholder-gray-500 placeholder-opacity-10"
                                        accept="video/mp4,video/mpeg,video/quicktime"
                                        { ...register("videos", {
                                            required: workout?.video ? false : "Workout video is required",
                                            // validate: {
                                            //     filesize: (file) => {
                                            //         if (file && file[0]) {
                                            //             const sizeInkB = file[0].size / 1024;
                                            //             setVideoSize(sizeInkB)
                                            //             const maxVideoSize = 50000
                                            //             return sizeInkB <= maxVideoSize || `video should not exceed ${ maxVideoSize }MB`
                                            //         }
                                            //         return true
                                            //     }
                                            // }
                                        }) }
                                        onChange={ (e) => {
                                            setVideos(e.target.files);
                                        } }
                                    />
                                </div>
                                { errors.videos && (
                                    <small className="mt-2 text-red-500 text-sm">
                                        { errors.videos.message }
                                    </small>
                                ) }
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
        </div>
    )
}

export default EditWorkout;
