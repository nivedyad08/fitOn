import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StarIcon from '@mui/icons-material/Star';

const Rating = ({ count, rating, color, onRating ,rateVideo}) => {
    const [hoverRating, setHoverRating] = useState(0);

    const getColor = (index) => {
        if (hoverRating >= index) {
            return color.filled;
        } else if (!hoverRating && rating >= index) {
            return color.filled;
        }
        return color.unfilled;
    };

    const handleRateNowClick = () => {
        rateVideo()
    };

    const starRating = Array.from({ length: count }, (_, index) => index + 1).map((idx) => (
        <StarIcon
            key={ idx }
            className="cursor-pointer"
            onClick={ () => onRating(idx) }
            style={ { color: getColor(idx) } }
            onMouseEnter={ () => setHoverRating(idx) }
            onMouseLeave={ () => setHoverRating(0) }
        />
    ));

    return (
        <div className="h-full bg-gray-300 py-12 px-30 sm:px-12 flex flex-col justify-center sm:py-12">
            <div className="max-w-xl mx-auto">
                <div className="bg-white min-w-full flex flex-col rounded-xl shadow-lg">
                    <div className="px-6 py-5">
                        <h2 className="text-gray-800 text-3xl font-semibold">Your opinion matters to us!</h2>
                    </div>
                    <div className="bg-gray-200 w-full py-20 flex flex-col items-center">
                        <div className="flex flex-col items-center py-6 space-y-3">
                            <span className="text-lg text-gray-800">How was the workout?</span>
                            <div className="flex space-x-3">{ starRating }</div>
                        </div>
                        <div className="w-3/4 flex flex-col">
                            <button
                                className="py-3 my-8 text-lg bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white"
                                onClick={ handleRateNowClick }
                            >
                                Rate now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Rating.propTypes = {
    count: PropTypes.number,
    rating: PropTypes.number,
    onRating: PropTypes.func,
    color: PropTypes.shape({
        filled: PropTypes.string,
        unfilled: PropTypes.string,
    }),
};

Rating.defaultProps = {
    count: 5,
    rating: 0,
    color: {
        filled: '#f5eb3b',
        unfilled: '#a5a5ad',
    },
};

export default Rating;
