import { useSelector } from 'react-redux';

export default function ViewWorkout() {
    const workout = useSelector((state) => state.workoutDetails.workoutInfo);

    return (
        <div className="bg-white">
            <div className="pt-6 p-10 ml-10">
                <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                    <div className="lg:col-span-6 lg:border-r lg:border-gray-200 lg:pr-8">
                        <video className="w-full h-auto mt-4" controls poster={ workout?.thumbnailImage }>
                            <source src={ workout?.video } type="video/mp4" />
                        </video>
                    </div>
                    <div className="lg:col-span-6 mt-4 lg:mt-0 overflow-y-auto h-5/6">
                        <div>
                            <span className="text-gray-600 uppercase">{ workout?.category[0]?.name }</span>
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{ workout?.workoutTitle }</h1>
                            <div className="flex items-center gap-x-6">
                                <img className="h-40 w-40 rounded-full" src={ workout?.trainer[0]?.profilePic } alt="" />
                                <h3 className="text-base leading-6 tracking-tight text-gray-600">{ workout?.trainer[0]?.firstName }</h3>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">AVERAGE DURATION</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">15 minutes</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">DIFFICULTY</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{ workout?.level[0]?.name }</dd>
                            </div>
                            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">DESCRIPTION</h1>
                            <div className="space-y-6">
                                <p className="text-base text-gray-900">{ workout?.description }</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
