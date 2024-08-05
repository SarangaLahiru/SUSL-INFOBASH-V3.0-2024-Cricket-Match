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
    const [isTimeUp, setIsTimeUp] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            const newTimeLeft = calculateTimeLeft(targetDate);
            setTimeLeft(newTimeLeft);
            if (
                newTimeLeft.days === 0 &&
                newTimeLeft.hours === 0 &&
                newTimeLeft.minutes === 0 &&
                newTimeLeft.seconds === 0
            ) {
                setIsTimeUp(true);
            } else {
                setIsTimeUp(false);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <div className="flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10 shadow-lg hover:shadow-xl rounded-lg text-white">
            {isTimeUp ? (
                <div className="text-center">
                    <span className="text-[#ffcd00] text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold">
                        Happening Now !
                    </span>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
                    {/* Days */}
                    <div className="flex flex-col items-center">
                        <span className="text-[#ffcd00] text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold">{timeLeft.days}</span>
                        <span className="text-gray-500 text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium">Days</span>
                    </div>
                    {/* Hours */}
                    <div className="flex flex-col items-center">
                        <span className="text-[#ffcd00] text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold">{timeLeft.hours}</span>
                        <span className="text-gray-500 text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium">Hours</span>
                    </div>
                    {/* Minutes */}
                    <div className="flex flex-col items-center">
                        <span className="text-[#ffcd00] text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold">{timeLeft.minutes}</span>
                        <span className="text-gray-500 text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium">Minutes</span>
                    </div>
                    {/* Seconds */}
                    <div className="flex flex-col items-center">
                        <span className="text-[#ffcd00] text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold">{timeLeft.seconds}</span>
                        <span className="text-gray-500 text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium">Seconds</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CountdownTimer;
