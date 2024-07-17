import { Carousel } from "flowbite-react";
import React from "react";

export function ImageCarousel() {
    return (
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96" style={{ height: "530px" }} >
            <Carousel>
                <img src="https://static.vecteezy.com/system/resources/previews/037/982/643/non_2x/ai-generated-indian-couples-celebrating-indias-win-in-live-cricket-match-at-home-photo.jpg" alt="Slide 1" />
                <img src="https://img.freepik.com/premium-photo/nighttime-cricket-match-surrounded-by-illuminated-circular-stadium-enthusiastic-audience-generative-ai_431161-1129.jpg" alt="Slide 2" />
                <img src="https://i.insider.com/5d26455ea17d6c09375a05f6?width=700" alt="Slide 3" />
                <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="Slide 4" />
                <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="Slide 5" />
            </Carousel>
        </div>
    );
}
