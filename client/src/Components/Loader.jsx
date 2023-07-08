import React from "react";
function Loader() {
    return (
        <>
            <div className="custom-dark-blue mt-48">
                <div className="px-4 py-12 custom-dark-blue">
                    <div className="mx-auto flex justify-center">
                        <div className="relative">
                            <div className="w-[160px] h-[160px] border border-yellow-600 rounded-full" />
                            <div className="w-[140px] h-[140px] border border-yellow-600 rounded-full absolute top-2.5 right-2.5" />
                            <div>
                                <svg
                                    className="absolute top-[22px] right-[26px] animate-spin"
                                    width={ 113 }
                                    height={ 113 }
                                    viewBox="0 0 113 113"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M56.7631 110.374C46.061 110.374 35.5993 107.2 26.7008 101.255C17.8023 95.3088 10.8668 86.8579 6.77128 76.9704C2.67576 67.083 1.60419 56.2031 3.69207 45.7066C5.77994 35.2102 10.9335 25.5686 18.501 18.001C26.0686 10.4335 35.7102 5.27994 46.2066 3.19207C56.7031 1.10419 67.583 2.17576 77.4704 6.27128C87.3579 10.3668 95.8088 17.3023 101.755 26.2008C107.7 35.0993 110.874 45.561 110.874 56.2631"
                                        stroke="#4338CA"
                                        strokeWidth={ 2 }
                                        strokeLinecap="round"
                                        strokeDasharray="16 16"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <p className="text-center text-gray-600 text-base mt-4">
                        Your Request Is Being Loaded, Please Wait
                    </p>
                </div>
            </div>
        </>
    );
}

export default Loader;