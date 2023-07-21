import React, { useEffect, useRef } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

function DateTimePicker({ flatpickrRef, selectedDateTime, setSelectedDateTime }) {
    useEffect(() => {
        const config = {
            enableTime: true,
            dateFormat: 'M j, Y h:i K',
            onClose: () => {
                flatpickrRef.current.blur();
            },
            onChange: (selectedDates) => {
                setSelectedDateTime(selectedDates[0]);
            },
        };

        // Ensure that the flatpickrRef is not null before initializing Flatpickr
        if (flatpickrRef.current) {
            flatpickr(flatpickrRef.current, config);
        }

        return () => {
            // Safely destroy the flatpickr instance if it exists
            if (flatpickrRef.current && flatpickrRef.current._flatpickr) {
                flatpickrRef.current._flatpickr.destroy();
            }
        };
    }, [flatpickrRef, setSelectedDateTime]);

    return (
        <div className="container mx-auto col-span-6 sm:col-span-6 mt-5">
            <div className="flex align-middle align-content-center">
                <input
                    id="datetime"
                    name="datetime"
                    ref={ flatpickrRef }
                    type="text"
                    placeholder="Select.."
                    className="block h-40 w-full rounded-md border-0 py-1.5 text-gray-200  ring-inset placeholder-gray-500 pl-4 placeholder-opacity-100  custom-blue-shade1 sm:text-sm sm:leading-6"
                />
            </div>
        </div>
    );
}

export default DateTimePicker;
