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
  
    let [slideWidth, setSlideWidth] = useState(0);
    let slides = React.Children.toArray(children);

    let carousel = useRef<HTMLDivElement>(null);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [translateValue, setTranslateValue] = useState(0);
  
    const nextSlide = () => {
      if (currentIndex === children.length - itemsToShow) {
        setCurrentIndex(0);
        setTranslateValue(0);
      } else {
        setCurrentIndex(currentIndex + itemsToScroll);
        setTranslateValue(translateValue - slideWidth);
      }
    };
  
    const prevSlide = () => {
      if (currentIndex === 0) {
        setCurrentIndex(children.length - itemsToShow);
        setTranslateValue(-(children.length - itemsToShow) * slideWidth);
      } else {
        setCurrentIndex(currentIndex - itemsToScroll);
        setTranslateValue(translateValue + slideWidth);
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
        }
    }, []);

    // const slideWidth = 100 / 3

    return (
        <div className="carousel" id="carousel-container" ref={carousel}>
            <div
                className="carousel-inner"
                style={{
                    transform: `translateX(${translateValue}px)`,
                    transition: 'transform ease-out 0.45s',
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
            </div>
            <div className="carousel-button-container">
                <button onClick={() =>prevSlide()}>
                    Prev
                </button>
                <button onClick={() => nextSlide()}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default Carousel;
