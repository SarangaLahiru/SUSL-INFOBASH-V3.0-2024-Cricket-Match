import { Carousel } from "flowbite-react";
import React from "react";

export function ImageCarousel() {
    return (
        <div className="h-56 overflow-y-hidden overflow-hidden sm:h-64 xl:h-80 2xl:h-96" style={{ height: "650px" }} >
            <Carousel>
                <img src="./img/img (1).jpeg" alt="Slide 1" />
                <img src="./img/img (2).jpeg" alt="Slide 2" />
                <img src="./img/img (3).jpeg" alt="Slide 3" />
                <img src="./img/img (4).jpeg" alt="Slide 4" />
                <img src="./img/img (5).jpeg" alt="Slide 5" />
            </Carousel>
        </div>
    );
}
