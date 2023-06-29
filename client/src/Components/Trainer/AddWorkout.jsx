import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function AddWorkout() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm({
        defaultValues: {
            workoutTitle: "",
            description: "",
            lastName: "",
            email: "",
            password: "",
            userLocation: "",
        },
    });
    const { firstName, lastName, email, password, userLocation } = watch(["firstName", "lastName", "email", "password", "userLocation"])
    return (
        <div className='max-w-7xl w-5/6 mx-auto py-20'>
            <form className='custom-blue p-20 rounded-md'>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-2xl font-semibold leading-10 text-white">ADD NEW WORKOUT</h2>
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
                                        className="block h-40 w-full rounded-md border-0 py-1.5 text-gray-200  ring-inset placeholder-gray-500 pl-4 placeholder-opacity-100  custom-blue-shade1 sm:text-sm sm:leading-6"
                                        defaultValue={ '' }
                                    />
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
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-200  ring-inset placeholder-gray-500 pl-4 placeholder-opacity-100  custom-blue-shade1 sm:text-sm sm:leading-6"
                                        defaultValue={ '' }
                                    />
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
                                        autoComplete="category-name"
                                        className="block w-full h-40 custom-blue-shade1 rounded-md border-0 py-3 text-gray-200 shadow-sm placeholder-gray-500 pl-4 placeholder-opacity-10 sm:text-sm sm:leading-6"
                                    >
                                        <option>Neck</option>
                                        <option>Full Body</option>
                                        <option>Abs</option>
                                    </select>
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="last-name" className="block text-sm font-lg leading-6 text-custom-whitish">
                                    Difficulty Level
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="category"
                                        name="category"
                                        autoComplete="category-name"
                                        className="block w-full h-40 custom-blue-shade1 rounded-md border-0 py-3 text-gray-200 shadow-sm placeholder-gray-500 pl-4 placeholder-opacity-10 sm:text-sm sm:leading-6"
                                    >
                                        <option>Beginner</option>
                                        <option>Moderate</option>
                                        <option>Intermediate</option>
                                        <option>Advanced</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="cover-photo" className="block text-sm font-lg leading-6 text-custom-whitish">Thumbnail Image
                                </label>

                                <div class="flex items-center justify-center w-full">
                                    <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 rounded-lg cursor-pointer custom-blue-shade1 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                        </div>
                                        <input id="dropzone-file" type="file" class="hidden" />
                                    </label>
                                </div>

                            </div>

                            <div className="col-span-full">
                                <label htmlFor="cover-photo" className="block text-sm font-lg leading-6 text-custom-whitish">Upload Workout Video
                                </label>
                                <div className="mt-2 ">
                                    <input class="block w-full text-sm h-30 text-gray-900 rounded-lg cursor-pointer custom-blue-shade1 dark:text-gray-400 focus:outline-none dark:bg-gray-700 placeholder-gray-500 placeholder-opacity-10" id="file_input" type="file" />
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
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}
