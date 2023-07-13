import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../../constants/urls';
import { dateMonthYear } from "../../../helpers/CommonFunctions"

const TopWorkouts = ({ topWorkouts }) => {
    console.log("topWorkouts=>", topWorkouts);
    return (
        // workoutDetails.length && (
        <div className="relative mt-12 overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-100 dark:text-gray-400">
                <thead className="text-xs uppercase custom-blue text-custom-whitish ">
                    <tr>
                        <th className="px-10 py-10">Workout Title</th>
                        <th className="px-10 py-10">Category</th>
                        <th className="px-10 py-10">Level</th>
                        <th className="px-10 py-10">Added to favorites</th>
                        <th className="px-10 py-10">Created At</th>
                    </tr>
                </thead>
                <tbody>
                    { topWorkouts && topWorkouts.map((item, index) => (
                        <tr className="border-b border-gray-700" key={ index }>
                            <td className="px-10 py-20 font-normal text-gray-200 whitespace-nowrap">
                                <div className="flex items-center gap-x-6">
                                    <img className="h-40 w-40 " src={ `${ BASE_URL }/user/${ item.thumbnailImage }` } alt="" />
                                    <h3 className="text-base leading-6 tracking-tight text-gray-200">{ item.workoutTitle }</h3>
                                </div>
                            </td>
                            <td className="px-10 py-20">{ item.category[0].name }</td>
                            <td className="px-10 py-20">{ item.level[0].name }</td>
                            <td className="px-10 py-20">0</td>
                            <td className="px-10 py-20">{ dateMonthYear(item.createdAt) }</td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
        // )
    );
};

export default TopWorkouts;
