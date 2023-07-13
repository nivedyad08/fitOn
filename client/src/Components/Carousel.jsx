import React, { useState, useEffect } from "react";

const Carousel = ({ image1, image2 ,height}) => {
    if(!image2){
        image2 = image1
    }
    console.log(image1);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const loopSlider = () => {
            const xx = setInterval(() => {
                switch (currentSlide) {
                    case 0:
                        {
                            document.getElementById('slider-1').style.display = 'none';
                            document.getElementById('slider-2').style.display = 'block';
                            document.getElementById('sButton1').classList.remove('bg-purple-800');
                            document.getElementById('sButton2').classList.add('bg-purple-800');
                            setCurrentSlide(1);
                        }
                        break;
                    case 1:
                        {
                            document.getElementById('slider-2').style.display = 'none';
                            document.getElementById('slider-1').style.display = 'block';
                            document.getElementById('sButton2').classList.remove('bg-purple-800');
                            document.getElementById('sButton1').classList.add('bg-purple-800');
                            setCurrentSlide(0);
                        }
                        break;
                    default:
                        break;
                }
            }, 4000);
            return xx;
        };

        const reinitLoop = (time) => {
            clearInterval(xx);
            setTimeout(loopSlider, time);
        };

        const sliderButton1 = () => {
            document.getElementById('slider-2').style.display = 'none';
            document.getElementById('slider-1').style.display = 'block';
            document.getElementById('sButton2').classList.remove('bg-purple-800');
            document.getElementById('sButton1').classList.add('bg-purple-800');
            reinitLoop(4000);
            setCurrentSlide(0);
        };

        const sliderButton2 = () => {
            document.getElementById('slider-1').style.display = 'none';
            document.getElementById('slider-2').style.display = 'block';
            document.getElementById('sButton1').classList.remove('bg-purple-800');
            document.getElementById('sButton2').classList.add('bg-purple-800');
            reinitLoop(4000);
            setCurrentSlide(1);
        };

        const xx = loopSlider();
        return () => clearInterval(xx);
    }, []);
    return (
        <div className="relative ">
            <div className="sliderAx">
                <div id="slider-1" className={ `mx-auto ${ currentSlide === 0 ? '' : 'hidden' }` }>
                    <div
                        className={`bg-cover bg-center text-white py-24 px-10 `}
                        style={ {
                            backgroundImage: `url(${ image1 })`,height:`${height}`,backgroundSize: "contain",
                        } }
                    >
                        <div className="md:w-1/2">
                            <p className="font-bold text-sm uppercase">FITON</p>
                            <p className="text-3xl font-bold">LETS GET</p>
                            <p className="text-2xl mb-10 leading-none">STRONGER</p>
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-blue-950 py-4 px-8 text-white font-bold uppercase text-xs rounded hover:bg-gray-200 hover:text-gray-800"
                            >
                                JOIN NOW
                            </a>
                        </div>
                    </div>
                    <br />
                </div>

                <div id="slider-2" className={ `mx-auto ${ currentSlide === 1 ? '' : 'hidden' }` }>
                    <div
                        className={`bg-cover bg-center text-white py-24 px-10 object-fill`}
                        style={ {
                            backgroundImage: `url(${ image2 })`,height:`${height}`,backgroundSize: "contain"
                        } }
                    >
                        <p className="font-bold text-sm uppercase">STAY FIT</p>
                        <p className="text-3xl font-bold">TOTAL</p>
                        <p className="text-2xl mb-10 leading-none">BODY WORKOUTS</p>
                        <a
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-blue-950 py-4 px-8 text-white font-bold uppercase text-xs rounded hover:bg-gray-200 hover:text-gray-800"
                        >
                            Contact us
                        </a>
                    </div>
                    <br />
                </div>
            </div>
            <div className="flex justify-between w-12 mx-auto pb-2">
                <button id="sButton1" onClick="sliderButton1()" className="bg-purple-400 rounded-full w-4 pb-2 " ></button>
                <button id="sButton2" onClick="sliderButton2() " className="bg-purple-400 rounded-full w-4 p-2"></button>
            </div>
        </div>
    );
}

export default Carousel;
