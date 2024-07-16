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
        <div className="text-center text-4xl font-bold mt-56">
            <div className="flex items-center justify-center space-x-4">
                <div className="flex flex-col items-center">
                    <span className="text-blue-500 text-6xl">{timeLeft.days}</span>
                    <span className="text-gray-500">Days</span>
                </div>
                <span className="text-gray-400 text-6xl">:</span>
                <div className="flex flex-col items-center">
                    <span className="text-blue-500 text-6xl">{timeLeft.hours}</span>
                    <span className="text-gray-500">Hours</span>
                </div>
                <span className="text-gray-400 text-6xl">:</span>
                <div className="flex flex-col items-center">
                    <span className="text-blue-500 text-6xl">{timeLeft.minutes}</span>
                    <span className="text-gray-500">Minutes</span>
                </div>
                <span className="text-gray-400 text-6xl">:</span>
                <div className="flex flex-col items-center">
                    <span className="text-blue-500 text-6xl">{timeLeft.seconds}</span>
                    <span className="text-gray-500">Seconds</span>
                </div>
            </div>
        </div>
    );
};

export default CountdownTimer;
