import React from "react";
import Carousel from "./Carousel/Carousel";
import { Box, Container, Typography } from "@mui/material";
import bannerImage from "../assets/banner4.jpg";

const Banner = () => {
  return (
    <>
      <Box sx={{ backgroundImage: `url(${bannerImage})` }}>
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: 400,
            paddingTop: 5,
          }}
        >
          <Typography variant="h2" sx={{ color: "black" }}>
            Crypto Tracker
          </Typography>
          <Typography variant="subtitle2" sx={{ color: "black" }}>
            Get all relevant information about cryptocurrency
          </Typography>
          <Carousel></Carousel>
        </Container>
      </Box>
    </>
  );
};

export default Banner;
