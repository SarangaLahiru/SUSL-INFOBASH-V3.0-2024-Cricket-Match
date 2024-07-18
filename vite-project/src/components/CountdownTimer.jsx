import React, { useEffect, useState } from "react";

const CountdownTimer = ({ targetDate }) => {
    const calculateTimeLeft = (targetDate) => {
        const now = new Date();
        const difference = targetDate - now;

        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        } else {
            timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(targetDate));
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <div className="flex flex-col items-center justify-center p-1 shadow-lg hover:shadow-xl">
            <div className="flex items-center justify-center space-x-2 md:space-x-4 p-3 md:p-6 rounded-lg shadow-inner text-center">
                <div className="flex flex-col items-center">
                    <span className="text-yellow-500 text-3xl md:text-7xl font-extrabold">{timeLeft.days}</span>
                    <span className="text-gray-500 text-lg md:text-3xl font-medium">Days</span>
                </div>
                <span className="text-gray-500 text-3xl md:text-7xl -mt-8 font-extrabold">:</span>
                <div className="flex flex-col items-center">
                    <span className="text-yellow-500 text-3xl md:text-7xl font-extrabold">{timeLeft.hours}</span>
                    <span className="text-gray-500 text-lg md:text-3xl font-medium">Hours</span>
                </div>
                <span className="text-gray-500 text-3xl md:text-7xl -mt-8 font-extrabold">:</span>
                <div className="flex flex-col items-center">
                    <span className="text-yellow-500 text-3xl md:text-7xl font-extrabold">{timeLeft.minutes}</span>
                    <span className="text-gray-500 text-lg md:text-3xl font-medium">Minutes</span>
                </div>
                <span className="text-gray-500 text-3xl md:text-7xl -mt-8 font-extrabold">:</span>
                <div className="flex flex-col items-center">
                    <span className="text-yellow-500 text-3xl md:text-7xl font-extrabold">{timeLeft.seconds}</span>
                    <span className="text-gray-500 text-lg md:text-3xl font-medium">Seconds</span>
                </div>
            </div>
        </div>
    );
};

export default CountdownTimer;
