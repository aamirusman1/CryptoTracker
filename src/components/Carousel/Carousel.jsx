import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./Carousel.css";

const Carousel = () => {
  const items = [
    <div className="item" key="1">
      <h3>A</h3>
    </div>,
    <div className="item" key="2">
      <h3>B</h3>
    </div>,
    <div className="item" key="3">
      <h3>C</h3>
    </div>,
  ];

  const responsive = {
    0: {
      items: 1, // 1 item shown on small screens (mobile)
    },
    768: {
      items: 2, // 2 items shown on tablet screens (768px and above)
    },
    1024: {
      items: 3, // 3 items shown on desktop screens (1024px and above)
    },
  };
  return (
    <>
      <AliceCarousel
        mouseTracking
        items={items}
        autoPlay
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
      ></AliceCarousel>
    </>
  );
};

export default Carousel;
