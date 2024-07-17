import { Carousel } from "flowbite-react";
import React from "react";

export function ImageCarousel() {
    return (
        <div className="w-full h-56 max-sm:h-[560px] md:h-72 lg:h-80 xl:h-96 2xl:h-[580px]">
            <Carousel>
                <img
                    src="https://static.vecteezy.com/system/resources/previews/037/982/643/non_2x/ai-generated-indian-couples-celebrating-indias-win-in-live-cricket-match-at-home-photo.jpg"
                    alt="Slide 1"
                    className="object-cover w-full h-full"
                />
                <img
                    src="https://img.freepik.com/premium-photo/nighttime-cricket-match-surrounded-by-illuminated-circular-stadium-enthusiastic-audience-generative-ai_431161-1129.jpg"
                    alt="Slide 2"
                    className="object-cover w-full h-full"
                />
                <img
                    src="https://i.insider.com/5d26455ea17d6c09375a05f6?width=700"
                    alt="Slide 3"
                    className="object-cover w-full h-full"
                />
                <img
                    src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
                    alt="Slide 4"
                    className="object-cover w-full h-full"
                />
                <img
                    src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
                    alt="Slide 5"
                    className="object-cover w-full h-full"
                />
            </Carousel>
        </div>
    );
}
