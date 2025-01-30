import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Container, Select, MenuItem } from "@mui/material";
import { CryptoState } from "../contexts/CryptoContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { currency, setCurrency } = CryptoState();
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flex: 1,

                fontFamily: "Montserrat",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            >
              Crypto Tracker
            </Typography>

            <Select
              variant="outlined"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={"INR"} // Set INR as default value
              sx={{
                color: "black",
                backgroundColor: "white",
                borderRadius: 1,
                marginRight: 2,
              }}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Header;

// Container component automatically adjusts its width based on the viewport size, providing a responsive layout.
