import React from 'react';

const TopWorkouts = () => {
    return (
        <div className="relative mt-12 overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-100 dark:text-gray-400">
                <thead className="text-xs uppercase custom-blue text-custom-whitish ">
                    <tr>
                        <th className="px-10 py-10">Workout Title</th>
                        <th className="px-10 py-10">No. of Exercises</th>
                        <th className="px-10 py-10">Level</th>
                        <th className="px-10 py-10">Workout Category</th>
                        <th className="px-10 py-10">No. of Viewers</th>
                        <th className="px-10 py-10">Added to favourites</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b border-gray-700">
                        <th className="px-10 py-20 font-normal text-gray-200 whitespace-nowrap">
                            <div className="flex items-center gap-x-6">
                                <img className="h-40 w-40 " src="/images/cover-placeholder.png" alt="" />
                                    <h3 className="text-base leading-6 tracking-tight text-gray-200">Silver</h3>
                            </div>
                        </th>
                        <td className="px-10 py-20">Silver</td>
                        <td className="px-10 py-20">Laptop</td>
                        <td className="px-10 py-20">$2999</td>
                        <td className="px-10 py-20">$2999</td>
                        <td className="px-10 py-20">$2999</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                        <th className="px-10 py-10 font-medium text-gray-200 whitespace-nowrap">
                            Microsoft Surface Pro
                        </th>
                        <td className="px-10 py-20">White</td>
                        <td className="px-10 py-20">Laptop PC</td>
                        <td className="px-10 py-20">$1999</td>
                        <td className="px-10 py-20">$1999</td>
                        <td className="px-10 py-20">$1999</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                        <th className="px-10 py-10 font-medium text-gray-200 whitespace-nowrap">
                            Magic Mouse 2
                        </th>
                        <td className="px-10 py-20">Black</td>
                        <td className="px-10 py-20">Accessories</td>
                        <td className="px-10 py-20">$99</td>
                        <td className="px-10 py-20">$99</td>
                        <td className="px-10 py-20">$99</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default TopWorkouts;
