import { basic, pro, ultimate } from "../../constants/pricingPlans"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { axios } from "../../config/axios"

const PricingPlans = ({ userPlans, packages }) => {
    const navigate = useNavigate()
    const user = useSelector((state) => state.loggedUser.userInfo)

    //payment
    const handlePayment = (mode) => {
        if (user !== null) {
            navigate(`/user/checkout/${ mode }/${ user._id }`)
        } else {
            navigate("/login")
        }
    }
    return (
        <div className="mx-auto px-6 py-8">
            <h1 className="text-center text-3xl font-bold tracking-wider capitalize text-yellow-600 dark:text-white lg:text-4xl font-Arquitecta">CHOOSE YOUR PLAN</h1>
            <p className="py-20 text-center tracking-wide leading-relaxed text-base text-gray-400 dark:text-gray-300 font-Proxima-Nova">Bring the studio experience home and get access to thousands of classes with<br /> 6 months or annual membership</p>
            <div className={ `mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${ userPlans ? 2 : 3 } xl:mt-12 xl:gap-12 gap-30` }>
                { !userPlans && (
                    < div className="w-full h-[355px] space-y-8 rounded-lg border border-gray-100 p-8 text-center dark:border-gray-700 transition-all hover:-translate-y-2">
                        <p className="font-medium text-gray-400 dark:text-gray-300">{ basic.name }</p>
                        <h2 className="text-5xl font-bold uppercase text-custom-yellow dark:text-gray-100">${ basic.price }</h2>
                        <p className="font-medium text-gray-400 dark:text-gray-300 capitalize">{ basic.duration }</p>
                        <ul role="list" className="space-y-5 my-7 ml-36 py-10">
                            {
                                basic.benefits.map((item, index) => (
                                    <li className="flex space-x-3 items-center" key={ index }>
                                        <svg className="flex-shrink-0 w-16 h-16 text-yellow-500 dark:text-yellow-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                        </svg>
                                        <span className="text-base font-normal leading-tight text-gray-300 dark:text-gray-400">{ item }</span>
                                    </li>
                                ))
                            }
                        </ul>
                        <button className="mt-10 w-2/3 transform rounded-md bg-[#ffebcd] text-custom-yellow px-4 py-2 capitalize tracking-wide transition-colors duration-300 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-200 focus:ring-opacity-80 font-semibold" onClick={ () => handlePayment("basic") }>Start Now</button>
                    </div>
                ) }
                <div className="w-full h-[355px] space-y-8 rounded-lg bg-[#353656] p-8 text-center transition-all hover:-translate-y-2">
                    <p className="font-medium text-gray-400 dark:text-gray-300">{ pro.name }</p>
                    <h2 className="text-5xl font-bold uppercase text-custom-yellow dark:text-gray-100">${ pro.price }</h2>
                    <p className="font-medium text-gray-400 dark:text-gray-300 capitalize">{ pro.duration }</p>
                    <ul role="list" className="space-y-5 my-7 ml-36 py-10">
                        {
                            pro.benefits.map((item, index) => (
                                <li className="flex space-x-3 items-center" key={ index }>
                                    <svg className="flex-shrink-0 w-16 h-16 text-yellow-500 dark:text-yellow-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                    </svg>
                                    <span className="text-base font-normal leading-tight text-gray-300 dark:text-gray-400">{ item }</span>
                                </li>
                            ))
                        }
                    </ul>
                    <button className="mt-10 w-2/3 transform rounded-md custom-blue text-custom-yellow px-4 py-2 capitalize tracking-wide transition-colors duration-300 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-200 focus:ring-opacity-80 font-semibold" onClick={ () => handlePayment("pro") }>Start Now</button>
                </div>
                <div className="w-full h-[355px] space-y-8 rounded-lg border border-gray-100 p-8 text-center dark:border-gray-700 transition-all hover:-translate-y-2">
                    <p className="font-medium text-gray-400 dark:text-gray-300">{ ultimate.name }</p>
                    <h2 className="text-5xl font-bold uppercase text-custom-yellow dark:text-gray-100">${ ultimate.price }</h2>
                    <p className="font-medium text-gray-400 dark:text-gray-300 capitalize">{ ultimate.duration }</p>
                    <ul role="list" className="space-y-5 my-7 ml-36 py-10">
                        {
                            ultimate.benefits.map((item, index) => (
                                <li className="flex space-x-3 items-center" key={ index }>
                                    <svg className="flex-shrink-0 w-16 h-16 text-yellow-500 dark:text-yellow-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                    </svg>
                                    <span className="text-base font-normal leading-tight text-gray-300 dark:text-gray-400">{ item }</span>
                                </li>
                            ))
                        }
                    </ul>
                    <button className="mt-10 w-2/3 transform rounded-md bg-[#ffebcd] text-custom-yellow px-4 py-2 capitalize tracking-wide transition-colors duration-300 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-200 focus:ring-opacity-80" onClick={ () => handlePayment("ultimate") }>Start Now</button>
                </div>
            </div>

        </div >
    );
}

export default PricingPlans;
