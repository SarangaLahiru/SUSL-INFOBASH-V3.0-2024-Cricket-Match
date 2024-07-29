import { Carousel } from "flowbite-react";
import React from "react";

export function ImageCarousel() {
    return (

        <div className="relative w-full h-screen overflow-hidden">
            <Carousel>
                <img src="./img/Info Bash 23 FOC-149.jpg" alt="Slide 1" className="w-full h-full object-cover" />
                <img src="./img/Info Bash 23 FOC-595.jpg" alt="Slide 2" className="w-full h-full object-cover" />
                <img src="./img/Info Bash 23 FOC-675.jpg" alt="Slide 3" className="w-full h-full object-cover" />
                <img src="./img/Info Bash 23 FOC-698.jpg" alt="Slide 4" className="w-full h-full object-cover" />
                <img src="./img/2023_09_01_18_07_IMG_2952.jpg" alt="Slide 5" className="w-full h-full object-cover" />

            </Carousel>
        </div>
    );
}
