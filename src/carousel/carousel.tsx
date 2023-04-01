import React, {
    useEffect,
    useState,
    useRef,
    ReactNode,
    ReactElement,
} from "react";

//scss
import "./carousel.scss";

interface CarouselProps {
    children: any;
    itemsToShow?: number;
    itemsToScroll?: number;
}

const Carousel: React.FC<CarouselProps> = ({
    children,
    itemsToShow = 1,
    itemsToScroll = 1,
}) => {
    let timerRef = useRef<number | null>(null);
    let [activeSlide, setActiveSlider] = useState(0);
    let [slideWidth, setSlideWidth] = useState(0);
    let [pos, setPosition] = useState(0);
    let [translateValue, setTranslateValue] = useState(0);
    let slides = React.Children.toArray(children);

    let carouselInner = useRef<HTMLDivElement>(null);
    let carousel = useRef<HTMLDivElement>(null);

    let itemsToSlide = itemsToScroll;

    const onChangeSlide = (newIndex: number) => {
        if (carouselInner && carouselInner.current) {
            carouselInner.current.style.transition = "transform 0.3s ease 0s";
        }
        if (newIndex < 0) {
            let index = newIndex
            if(newIndex - itemsToSlide < -(slides.length+1)){
                index = -(slides.length)
            }
            setTranslateValue(
                index * slideWidth + slideWidth * slides.length
            );
            setPosition(index);
            if (newIndex <= -5) {
                timerRef.current = window.setTimeout(() => {
                    const index = 0;
                    if (carouselInner && carouselInner.current) {
                        carouselInner.current.style.transition = "none";
                        carouselInner.current.style.transform = `translateX(-${
                            index * slideWidth + slideWidth * slides.length
                        }px)`;
                    }
                    setPosition(index);
                }, 300);
            }
        } else if (newIndex >= slides.length) {
            setTranslateValue(
                newIndex * slideWidth + slideWidth * slides.length
            );
            timerRef.current = window.setTimeout(() => {
                if (carouselInner && carouselInner.current) {
                    carouselInner.current.style.transition = "none";
                    setTranslateValue(slideWidth * slides.length);
                }
                setPosition(0);
            }, 300);
        } else {
            let index = newIndex;
            if (newIndex + itemsToSlide > slides.length) {
                index = slides.length - itemsToScroll;
            }
            setPosition(index);
            setTranslateValue(index * slideWidth + slideWidth * slides.length);
        }
    };

    useEffect(() => {
        //get a slide with and container width
        const carouselContainer =
            carousel && carousel.current && carousel.current;
        if (carouselContainer) {
            const cWidth = carouselContainer.offsetWidth;
            const sWidth = cWidth / itemsToShow;
            setSlideWidth(sWidth);
            setTranslateValue(pos * sWidth + sWidth * slides.length);
        }

        return () => {
            if (timerRef.current !== null) {
                window.clearTimeout(timerRef.current);
            }
        };
    }, []);

    // const slideWidth = 100 / 3

    return (
        <div className="carousel" id="carousel-container" ref={carousel}>
            <div
                ref={carouselInner}
                className="carousel-inner"
                style={{
                    transform: `translate3d(-${translateValue}px, 0 , 0)`,
                    width: `${slideWidth * slides.length * 3}px`,
                }}
            >
                {React.Children.map(slides, (child) => {
                    const slide = child as ReactElement;
                    return (
                        <div
                            className="slide"
                            style={{ width: `${slideWidth}px` }}
                        >
                            {React.cloneElement(slide)}
                        </div>
                    );
                })}

                {React.Children.map(slides, (child) => {
                    const slide = child as ReactElement;
                    return (
                        <div
                            className="slide"
                            style={{ width: `${slideWidth}px` }}
                        >
                            {React.cloneElement(slide)}
                        </div>
                    );
                })}

                {React.Children.map(slides, (child) => {
                    const slide = child as ReactElement;
                    return (
                        <div
                            className="slide"
                            style={{ width: `${slideWidth}px` }}
                        >
                            {React.cloneElement(slide)}
                        </div>
                    );
                })}
            </div>
            <div className="carousel-button-container">
                <button onClick={() => onChangeSlide(pos - itemsToSlide)}>
                    Prev
                </button>
                <button onClick={() => onChangeSlide(pos + itemsToSlide)}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default Carousel;
