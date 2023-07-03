import React from 'react';

const TrainersList = () => {
    return (
        <>
            <div className="flex space-x-10 mt-24">
                <h1 className="text-xl font-semibold text-white">Trainers</h1>
            </div>
            <div className="flex space-x-10 mt-20 justify-center">
                <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-24 sm:grid-cols-1">
                    <a href="/services">
                        <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
                            <img src="https://blog.nasm.org/hubfs/workouts-for-beginners.jpg" alt="Service" className="w-full h-full object-cover" />
                        </div>
                    </a>
                    <a href="/services">
                        <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
                            <img src="https://i.shgcdn.com/7e82f3f9-fe61-43e2-ab3c-dd6c0c17723b/-/format/auto/-/preview/3000x3000/-/quality/lighter/" alt="Service" className="w-full h-full object-contain" />
                        </div>
                    </a>
                    <a href="/services">
                        <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
                            <img src="https://blog.nasm.org/hubfs/workouts-for-beginners.jpg" alt="Service" className="w-full h-full object-contain" />
                        </div>
                    </a>
                    <a href="/services">
                        <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
                            <img src="https://formnutrition.com/wp-content/uploads/2023/01/inForm-biggest-fitness-trends-lead-image-1.jpg" alt="Service" className="w-full h-full object-contain" />
                        </div>
                    </a>
                </div>
            </div>
        </>
    );
}

export default TrainersList;
