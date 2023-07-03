import { useSelector } from 'react-redux';

export default function ViewWorkout() {
    const workout = useSelector((state) => state.workoutDetails.workoutInfo)
    return (
        <div className="bg-white">
            <div className="pt-6 p-10 ml-10">
                {/* Product info */ }
                <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{ workout.workoutTitle }</h1>
                    </div>
                    <div className="mt-4 lg:row-span-3 lg:mt-0">
                        <form className="mt-10">
                            <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                                <img
                                    src={ `http://localhost:8080/user/${ workout.thumbnailImage }` }
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>
                        </form>
                        <div className="mt-10 ml-10">
                            <h3 className="text-sm font-medium text-gray-900">Category</h3>
                            <div className="mt-4">
                                <ul role="list" className="list-disc space-y-2 pl-10 text-sm">
                                    <li className="text-gray-400">
                                        <span className="text-gray-600">{ workout.category[0].name }</span>
                                    </li>
                                </ul>
                            </div>
                            <h3 className="text-sm font-medium text-gray-900">Level</h3>
                            <div className="mt-4">
                                <ul role="list" className="list-disc space-y-2 pl-10 text-sm">
                                    <li className="text-gray-400">
                                        <span className="text-gray-600">{ workout.level[0].name }</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                        {/* Description and details */ }
                        <div>
                            <h3 className="sr-only">Description</h3>

                            <div className="space-y-6">
                                <p className="text-base text-gray-900">{ workout.description }</p>
                            </div>
                        </div>
                        <div className="mt-2">
                            <video class="h-3/5" controls>
                                <source src={ `http://localhost:8080/workouts/${ workout.video }` } type="video/mp4" />
                            </video>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
