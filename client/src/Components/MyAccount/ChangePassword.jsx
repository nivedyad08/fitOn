import React from 'react';

const ChangePassword = () => {
    return (
        <form className='custom-blue px-10 py-6 rounded-md max-w-md mx-auto'>
            <div className="space-y-2">
                <div className="border-b border-gray-900/10 pb-12">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="col-span-full mt-10">
                            <label htmlFor="currentPassword" className="block text-sm font-lg leading-6 text-custom-whitish">
                                Current Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="currentPassword"
                                    name="currentPassword"
                                    placeholder='Enter your Current Password'
                                    className="block h-40 w-full rounded-md border-0 py-1.5 text-gray-200  ring-inset placeholder-gray-500 pl-4 placeholder-opacity-100  custom-blue-shade1 sm:text-sm sm:leading-6"
                                    defaultValue={ '' }
                                />
                            </div>
                        </div>

                        <div className="col-span-full mt-10">
                            <label htmlFor="newPassword" className="block text-sm font-lg leading-6 text-custom-whitish">
                                New Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="newPassword"
                                    name="newPassword"
                                    placeholder='Enter your New Password'
                                    className="block h-40 w-full rounded-md border-0 py-1.5 text-gray-200  ring-inset placeholder-gray-500 pl-4 placeholder-opacity-100  custom-blue-shade1 sm:text-sm sm:leading-6"
                                    defaultValue={ '' }
                                />
                            </div>
                        </div>

                        <div className="col-span-full mt-10">
                            <label htmlFor="confirmPassword" className="block text-sm font-lg leading-6 text-custom-whitish">
                                Confirm Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    placeholder='Enter your Confirm Password'
                                    className="block h-40 w-full rounded-md border-0 py-1.5 text-gray-200  ring-inset placeholder-gray-500 pl-4 placeholder-opacity-100  custom-blue-shade1 sm:text-sm sm:leading-6"
                                    defaultValue={ '' }
                                />
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

export default ChangePassword;
