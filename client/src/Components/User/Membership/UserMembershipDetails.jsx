import React, { useEffect, useState } from 'react';
import PricingPlans from '../../../Pages/Landing/PricingPlans';
import axios from '../../../config/axios';
import { toast } from "react-toastify";

const UserPricingPlans = () => {
    return (
        <div className='flex justify-center items-center mb-72'>
            <div className='ml-20'>
                <PricingPlans userPlans={ true } />
            </div>
        </div>
    );
}

export default UserPricingPlans;
