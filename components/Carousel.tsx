import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";

interface CarouselProps {
  children?: React.ReactNode;
  numberOfSlides: number;
  isVertical?: boolean;
  justOne?: boolean;
  fav?: boolean;
}

const Carousel = ({
  children,
  numberOfSlides,
  isVertical,
  justOne,
  fav,
}: CarouselProps) => {
  const slider = useRef<Slider>(null);

  const number = justOne ? 1 : numberOfSlides < 3 ? numberOfSlides : 3;

  const settings = {
    dots: !isVertical,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: number,
    slidesToScroll: 1,
    vertical: isVertical,

    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: fav ? 1 : number,
        },
      },
    ],
  };

  return (
    // parent element needs to be relative
    <div className="w-full overflow-hidden">
      <Slider ref={slider} {...settings} className="my-10">
        {children}
      </Slider>
      <>
        <button
          className={`absolute ${
            isVertical
              ? "-top-0 w-full rounded-lg bg-white text-3xl text-green-900  shadow-md hover:scale-95"
              : "inset-y-[45%] -left-1 w-10 rounded-l-lg bg-green-900 text-xl text-white opacity-25 hover:opacity-100"
          } h-10 transition-all duration-200 ease-in-out`}
          onClick={() => slider?.current?.slickPrev()}
        >
          {isVertical ? <>&uarr;</> : <>&lt;</>}
        </button>
        <button
          className={`absolute ${
            isVertical
              ? "bottom-0 w-full rounded-lg bg-white text-3xl text-green-900  shadow-md hover:scale-95"
              : "inset-y-[45%] -right-1 w-10 rounded-r-lg bg-green-900 text-xl text-white opacity-25 hover:opacity-100"
          } h-10 transition-all duration-200 ease-in-out `}
          onClick={() => slider?.current?.slickNext()}
        >
          {isVertical ? <>&darr;</> : <>&gt;</>}
        </button>
      </>
    </div>
  );
};

export default Carousel;
