import React from "react";

//components
import Carousel from "./carousel/carousel";

import "./App.scss";

const slides = [
    {
        key: 1,
        color: "aqua",
    },
    {
        key: 2,
        color: "rosybrown",
    },
    {
        key: 3,
        color: "green",
    },
    {
        key: 4,
        color: "rebeccapurple",
    },
    {
        key: 5,
        color: "orchid",
    },
];

function App() {
    const sliderSettings1 = {
        itemsToShow: 3,
        itemsToScroll: 1,
    };

    const sliderSettings2 = {
        itemsToShow: 3,
        itemsToScroll: 3,
    };

    return (
        <div className="App">
            <Carousel {...sliderSettings1}>
                {slides.map((slide, index) => (
                    <div className={`carousel-slide`} key={index}>
                        <div
                            className="number-card"
                            style={{ backgroundColor: slide?.color }}
                        >{`Slide ${slide?.key}`}</div>
                    </div>
                ))}
            </Carousel>
            <br />
            <br />
            <br />
            <Carousel {...sliderSettings2}>
                {[
                    ...slides,
                    {
                        key: 6,
                        color: "purple",
                    },
                ].map((slide, index) => (
                    <div className={`carousel-slide`} key={index}>
                        <div
                            className="number-card"
                            style={{ backgroundColor: slide?.color }}
                        >{`Slide ${slide?.key}`}</div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
}

export default App;
