import React, { useState, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./Carousel.css";
import { CryptoState } from "../../contexts/CryptoContext";
import { TrendingCoins } from "../../config/api";
import axios from "axios";
import { numberWithCommas } from "../CoinsDataTable";
import { Link } from "react-router-dom";

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));

    //console.log(data);
    setTrending(data);
  };

  useEffect(() => {
    fetchTrendingCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  // const items = [
  //   <div className="item" key="1">
  //     <h3>A</h3>
  //   </div>,
  //   <div className="item" key="2">
  //     <h3>B</h3>
  //   </div>,
  //   <div className="item" key="3">
  //     <h3>C</h3>
  //   </div>,
  // ];

  const items = trending.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;

    return (
      <Link
        to={`/coins/${coin.id}`}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
          textTransform: "uppercase",
          color: "white",
        }}
      >
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

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
