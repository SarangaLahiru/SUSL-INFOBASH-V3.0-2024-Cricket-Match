import { Carousel } from "flowbite-react";
import React from "react";

export function ImageCarousel() {
    return (
        <div className="relative w-full h-screen overflow-hidden">
            <Carousel>
                <img src="./img/img (1).jpeg" alt="Slide 1" className="w-full h-full object-cover" />
                <img src="./img/img (2).jpeg" alt="Slide 2" className="w-full h-full object-cover" />
                <img src="./img/img (3).jpeg" alt="Slide 3" className="w-full h-full object-cover" />
                <img src="./img/img (4).jpeg" alt="Slide 4" className="w-full h-full object-cover" />
                <img src="./img/img (5).jpeg" alt="Slide 5" className="w-full h-full object-cover" />
            </Carousel>
        </div>
    );
}
