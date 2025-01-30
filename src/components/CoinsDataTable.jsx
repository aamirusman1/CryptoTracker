import axios from "axios";
import React, { useEffect, useState } from "react";
import { AllProducts } from "../config/api";
import {
  Container,
  Typography,
  TextField,
  LinearProgress,
} from "@mui/material";

//Imports for table
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import { CryptoState } from "../contexts/CryptoContext";
import { CoinList } from "../config/api";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinsDataTable = () => {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const { currency, symbol } = CryptoState();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(CoinList(currency));
      setData(data); //Axios wraps the response inside a data object.
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [currency]);

  // This is used for debugging purpose
  //   useEffect(() => {
  //     console.log("Fetched data: ", data);
  //   }, [data]);

  //--Styles for table--
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  //--Handle Search Logic--
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  //   console.log("search keyword: ", search);

  const filteredRows = data.filter(
    (data) =>
      data.name.toLowerCase().includes(search) ||
      data.symbol.toLowerCase().includes(search)
  );
  //   console.log("Filtered data: ", filteredRows);

  return (
    <>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          label="Search For a Crypto Currency.."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          value={search}
          onChange={handleSearchChange}
        />
        <TableContainer component={Paper}>
          {isLoading ? (
            <LinearProgress></LinearProgress>
          ) : (
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Coin</StyledTableCell>
                  <StyledTableCell align="right">Price</StyledTableCell>
                  <StyledTableCell align="right">24h Change</StyledTableCell>
                  <StyledTableCell align="right">Market Cap</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRows
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <StyledTableRow key={row.name}>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </div>
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </StyledTableCell>
                        <StyledTableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        <Stack spacing={2}>
          <Pagination
            count={(filteredRows?.length / 10).toFixed(0)}
            onChange={(_, value) => {
              setPage(value);
              window.scroll(0, 450);
            }}
            color="primary"
            style={{
              padding: 20,
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          />
        </Stack>
      </Container>
    </>
  );
};

export default CoinsDataTable;
