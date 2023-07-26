import { useSelector } from 'react-redux';

const ViewTrainerDetails = () => {
    const trainer = useSelector((state) => state.trainerDetails.trainerInfo);
    console.log(trainer);
    return (
        <div className="bg-white">
            <div className="pt-6 p-10 ml-10">
                <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                    <div className="lg:col-span-6 lg:border-r lg:border-gray-200 lg:pr-8">
                        <img className="w-full h-auto mt-4" src={ trainer?.coverPhoto } />
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl">BIO</h1>
                        <div className="space-y-6">
                            <p className="text-base text-gray-900">{ trainer?.userBio }</p>
                        </div>
                    </div>
                    <div className="lg:col-span-6 mt-4 lg:mt-0 overflow-y-auto h-5/6">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{ trainer?.firstName } { trainer?.lastName }</h1>
                            <h3 className="text-base leading-6 tracking-tight text-gray-600">{ trainer?.email }</h3>
                            <div className="flex items-center gap-x-6">
                                <img className="h-40 w-40 rounded-full" src={ trainer?.profilePic } alt="" />
                                <h3 className="text-base leading-6 tracking-tight text-gray-600">{ trainer?.userLocation }</h3>
                            </div>
                            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                            <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-xl">Workouts</h3>
                            <div className="mx-6 grid grid-cols-1 sm:grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
                                {
                                    trainer.workouts.map((workout, index) => (
                                        <div>
                                            <video className="w-sm w-[345px] h-[200px]" key={ index } poster={ workout?.thumbnailImage } controls>
                                                <source src={ `http://localhost:8080/workouts/${ workout.video }` } type="video/mp4" />
                                            </video>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewTrainerDetails;
