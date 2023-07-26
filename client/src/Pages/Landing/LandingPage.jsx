import React, { useState } from 'react';
import TrainersSlider from './TrainersSlider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PricingPlans from './PricingPlans';
import { Link } from "react-router-dom";


const LandingPage = () => {
    const [isOpen, setIsOpen] = useState(false)
    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <main className='p-20 bg-gradient-to-r from-[#0a0b1a] via-[#141433] to-[#04040e]'>
            <section className="bg-white bg-gradient-to-r from-[#0a0b1a] via-[#141433] to-[#282843]">
                <nav className="container mx-auto p-6 lg:flex lg:items-center lg:justify-between">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-x-6">
                            <img
                                className="w-40 mr-2 h-40"
                                src="/logo.png"
                                alt="Your Company"
                            />
                            <a href="#" className="text-2xl font-bold text-white transition-colors duration-300 hover:text-gray-700 dark:text-white dark:hover:text-gray-300">Fiton</a>
                        </div>
                        {/* Mobile menu button */ }
                        <div className="flex lg:hidden">
                            <button x-cloak type="button" onClick={ () => setIsOpen(!isOpen) } className="text-gray-500 hover:text-gray-600 focus:text-gray-600 focus:outline-none dark:text-gray-200 dark:hover:text-gray-400 dark:focus:text-gray-400" aria-label="toggle menu">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-white " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={ 3 }>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    {/* Mobile Menu open: "block", Menu closed: "hidden" */ }
                    <div className='relative'>
                        <div x-cloak className="absolute p-20 inset-x-0 z-20 w-auto mx-auto bg-blue-950 py-4 shadow-md transition-all duration-300 ease-in-out dark:bg-gray-900 lg:relative lg:top-0 lg:mt-0 lg:flex lg:w-auto lg:translate-x-0 lg:items-center lg:bg-transparent lg:p-0 lg:opacity-100 lg:shadow-none lg:dark:bg-transparent">
                            <div className="lg:-px-8 flex flex-col space-y-4 lg:mt-0 lg:flex-row lg:space-y-0">
                            </div>
                            <Link
                                to="/login"
                                className="mt-4 block w-96 rounded-lg custom-yellow px-6 py-2.5 text-center font-medium capitalize leading-5 text-white hover:bg-yellow-400 lg:mt-0 lg:w-auto"
                            >
                                Get started
                            </Link>
                        </div>
                    </div>
                </nav>
                <div className="mx-auto px-6 py-16 text-center">
                    <section className="w-full">
                        <img
                            src="/images/banner-4.png"
                            className="object-fill w-full h-[400px]"
                            alt="Image alt text"
                        />
                    </section>
                    <div className="mx-auto max-w-lg">

                    </div>
                </div>
            </section>
            <section className="pt-80 bg-gradient-to-r from-[#0a0b1a] via-[#141433] to-[#282843]">
                <div className="mx-auto px-10 py-10">
                    <h1 className="text-center text-3xl font-bold tracking-wider capitalize text-yellow-600 dark:text-white lg:text-4xl font-Arquitecta">
                        FIND WHAT MOVES YOU
                    </h1>
                    <p className="py-20 text-center tracking-wide leading-relaxed text-base
                     text-gray-400 dark:text-gray-300 font-Proxima-Nova">
                        Whether you’re a complete beginner or you want to step up your routine,
                        get the full studio <br />experience at home with thousands of classes for
                        body, mind, and spirit.
                    </p>
                    <div className="mt-60 grid grid-cols-4 gap-40 xl:mt-12">
                        <div>
                            <img
                                className="h-[140px] w-full object-cover"
                                src="images/yoga.jpg"
                                alt=""
                            />
                            <h2 className="mt-14 text-base font-semibold capitalize text-gray-300 dark:text-white">
                                YOGA
                            </h2>
                            <p className="mt-2 text-sm tracking-wider text-gray-400 dark:text-blue-400">
                                Get lost in your flow state with every yoga variety, from Vinyasa to Hatha.
                            </p>
                        </div>
                        <div>
                            <img
                                className="h-[140px] w-full object-cover"
                                src="images/Full-Body-Workout.png"
                                alt=""
                            />
                            <h2 className="mt-14 text-base font-semibold capitalize text-gray-300 dark:text-white">
                                FITNESS
                            </h2>
                            <p className="mt-2 text-sm tracking-wider text-gray-400 dark:text-blue-400">
                                Level up your workouts with Pilates, Barre, HIIT, Strength, and much more.
                            </p>
                        </div>
                        <div>
                            <img
                                className="h-[140px] w-full object-cover"
                                src="images/self-care.png"
                                alt=""
                            />
                            <h2 className="mt-14 text-base font-semibold capitalize text-gray-300 dark:text-white">
                                SELF-CARE
                            </h2>
                            <p className="mt-2 text-sm tracking-wider text-gray-400 dark:text-blue-400">
                                Unwind with meditative rituals like dry brushing, gua sha, and journaling.
                            </p>
                        </div>
                        <div>
                            <img
                                className="h-[140px] w-full object-cover"
                                src="images/mindfulness.png"
                                alt=""
                            />
                            <h2 className="mt-14 text-base font-semibold capitalize text-gray-300 dark:text-white">
                                MINDFULNESS
                            </h2>
                            <p className="mt-2 text-sm tracking-wider text-gray-400 dark:text-blue-400">
                                Embrace your thoughts and emotions to put yourself in a better headspace.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mt-80 bg-gradient-to-r from-[#0a0b1a] via-[#141433] to-[#282843]">
                <div className="h-[16rem]  dark:bg-gray-800">
                    <div className="container mx-auto px-6 py-10">
                        <h1 className="mt-60 text-center text-3xl font-bold tracking-wider capitalize text-yellow-600 dark:text-white lg:text-4xl font-Arquitecta">MEET YOUR INSTRUCTORS</h1>
                        <div className="mx-auto mt-6 flex justify-center">
                            <span className="inline-block h-1 w-40 rounded-full bg-blue-500" />
                            <span className="mx-1 inline-block h-1 w-3 rounded-full bg-blue-500" />
                            <span className="inline-block h-1 w-1 rounded-full bg-blue-500" />
                        </div>
                        <p className="py-20 text-center tracking-wide leading-relaxed text-base
                     text-gray-400 dark:text-gray-300 font-Proxima-Nova">We work with the best so you can feel your best. Our team of top instructors will empower<br /> you to reach all your fitness and wellness goals and enjoy the journey on the way.</p>
                    </div>
                    <Box sx={ { '& button': { m: 1 } } } className="text-center pb-16">
                        <Button variant="outlined" size="large" className='instructors'>
                            VIEW INSTRUCTORS
                        </Button>
                    </Box>
                </div>
                <TrainersSlider />
            </section>
            <div className="py-20 bg-gradient-to-r from-[#0a0b1a] via-[#141433] to-[#282843] dark:bg-gray-900">
                <PricingPlans userPlans={ false } />
            </div>

            <footer className="bg-black dark:bg-gray-900">
                <div className="container mx-auto px-6 py-12">
                    <div className="md:-mx-3 md:flex md:items-center md:justify-between">
                        <div className="mt-6 shrink-0 md:mx-3 md:mt-0 md:w-auto">
                            <a href="/register" className="inline-flex w-full items-center justify-center rounded-lg bg-yellow-600 px-10 py-8 text-sm text-white duration-300 hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80">
                                <span className="mx-2 font-medium">Sign Up Now</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="mx-2 h-10 w-10">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                </svg>
                            </a>
                        </div>
                    </div>
                    <hr className="my-6 border-gray-500 dark:border-gray-700 md:my-10" />
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-1">
                    </div>
                    <div className="flex items-center gap-x-6">
                        <img
                            className="w-40 mr-2 h-40"
                            src="/logo.png"
                            alt="Your Company"
                        />
                        <a href="#" className="text-2xl font-bold text-gray-300 transition-colors duration-300 hover:text-gray-700 dark:text-white dark:hover:text-gray-300">Fiton</a>
                        <div className="flex flex-col ml-auto items-center justify-between sm:flex-row">
                            <p className="mt-4 text-sm text-gray-400 dark:text-gray-300 sm:mt-0">© Copyright 2023. All Rights Reserved.</p>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    );
}

export default LandingPage;
