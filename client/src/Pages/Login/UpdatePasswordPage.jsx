import React from 'react';
import UpdatePassword from '../../Components/Login/UpdatePassword';
import Slider from '../../Components/Slider';

const UpdatePasswordPage = () => {
    return (
        <section className="custom-blue h-screen">
            <div className="container h-full px-6 py-24">
                <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
                    <UpdatePassword />
                    <Slider img="login-bg.png" />
                </div>
            </div>
        </section>

    );
}

export default UpdatePasswordPage;
