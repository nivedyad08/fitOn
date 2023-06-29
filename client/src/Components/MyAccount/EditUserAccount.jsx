import React from 'react';

const EditUserAccount = () => {
    return (
        <form className='custom-blue px-10 py-6 rounded-md max-w-md mx-auto'>
            <div className="space-y-2">
                <div className="border-b border-gray-900/10 pb-12">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="col-span-full mt-10">
                            <label htmlFor="firstName" className="block text-sm font-lg leading-6 text-custom-whitish">
                                First Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="firstName"
                                    name="firstName"
                                    placeholder='Enter your First Name'
                                    className="block h-40 w-full rounded-md border-0 py-1.5 text-gray-200  ring-inset placeholder-gray-500 pl-4 placeholder-opacity-100  custom-blue-shade1 sm:text-sm sm:leading-6"
                                    defaultValue={ '' }
                                />
                            </div>
                        </div>

                        <div className="col-span-full mt-10">
                            <label htmlFor="lastName" className="block text-sm font-lg leading-6 text-custom-whitish">
                                Last Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="lastName"
                                    name="lastName"
                                    placeholder='Enter your lastName'
                                    className="block h-40 w-full rounded-md border-0 py-1.5 text-gray-200  ring-inset placeholder-gray-500 pl-4 placeholder-opacity-100  custom-blue-shade1 sm:text-sm sm:leading-6"
                                    defaultValue={ '' }
                                />
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
                                    className="block h-40 w-full rounded-md border-0 py-1.5 text-gray-200  ring-inset placeholder-gray-500 pl-4 placeholder-opacity-100  custom-blue-shade1 sm:text-sm sm:leading-6"
                                    value="Disabled readonly input" disabled readonly
                                />
                            </div>
                        </div>

                        <div className="col-span-full mt-10">
                            <label htmlFor="location" className="block text-sm font-lg leading-6 text-custom-whitish">
                                Location
                            </label>
                            <div className="mt-2">
                                <input
                                    id="location"
                                    name="location"
                                    placeholder='Enter your location'
                                    className="block h-40 w-full rounded-md border-0 py-1.5 text-gray-200  ring-inset placeholder-gray-500 pl-4 placeholder-opacity-100  custom-blue-shade1 sm:text-sm sm:leading-6"
                                    defaultValue={ '' }
                                />
                            </div>
                        </div>

                        <div className="col-span-full mt-10">
                            <label htmlFor="bio" className="block text-sm font-lg leading-6 text-custom-whitish">
                                Bio
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="bio"
                                    name="bio"
                                    rows={ 4 }
                                    placeholder='Enter your bio'
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-200  ring-inset placeholder-gray-500 pl-4 placeholder-opacity-100  custom-blue-shade1 sm:text-sm sm:leading-6"
                                    defaultValue={ '' }
                                />
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

                        <div className="col-span-full mt-12">

                            <div className="flex items-center gap-x-6">
                                <label htmlFor="cover-photo" className="block text-sm font-lg leading-6 text-custom-whitish">Profile Image
                                </label>
                                <img className="h-60 w-60 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                            </div>
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
                    Update
                </button>
            </div>
        </form>
    );
}

export default EditUserAccount;
