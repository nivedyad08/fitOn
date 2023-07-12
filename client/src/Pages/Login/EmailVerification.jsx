import React from 'react';
import Slider from '../../Components/Slider';
import { Link } from 'react-router-dom';

const EmailVerification = () => {
    return (
        <section className="custom-blue h-screen">
            <div className="container h-full px-6 py-24">
                <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
                    <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
                        <div className="text-center">
                            <img className="mx-auto w-48" src="/logo.png" alt="logo" />
                            <h4 className="mb-12 mt-1 pb-1 text-xl text-white font-semibold">
                                FitOn
                            </h4>
                        </div>
                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <h5 className="mb-12 mt-1 pb-1 text-xl text-white font-semibold text-center">
                                Email has been sent to your email
                            </h5>
                            <p className="text-md text-center font-semibold leading-relaxed text-custom-whitish"> Please check the mail to update your password.</p>
                            <p className="mt-10 text-center text-sm text-custom-slate">
                                Back to{ " " }
                                <Link
                                    to="/login"
                                    className="font-medium leading-6 text-custom-yellow hover:text-indigo-500"
                                >
                                    Login
                                </Link>
                            </p>
                        </div>
                    </div>
                    <Slider img="login-bg.png" />
                </div>
            </div>
        </section>
    );
}

export default EmailVerification;
