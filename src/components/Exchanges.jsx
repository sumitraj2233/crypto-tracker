import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
  Typography,
  IconButton,
  Paper,
  Box,
  Pagination,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { useGetCryptoDataQuery } from "../services/cryptoApi";
import millify from "millify";

const Row = ({ row }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow hover>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>{row.rank}</TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>${millify(row["24hVolume"])}</TableCell>
        <TableCell>{millify(row.marketCap)}</TableCell>
        <TableCell>{row.change}%</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={2}>
              <Typography variant="h6">{row.name} Details</Typography>
              <Typography variant="body2">
                <strong>Price:</strong> ${millify(row.price)}
              </Typography>
              <Typography variant="body2">
                <strong>Symbol:</strong> {row.symbol}
              </Typography>
              {row.websiteUrl && (
                <Typography variant="body2">
                  <strong>Website:</strong>{" "}
                  <a href={row.websiteUrl} target="_blank" rel="noreferrer">
                    {row.websiteUrl}
                  </a>
                </Typography>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const Exchanges = () => {
  const { data, isFetching } = useGetCryptoDataQuery(1000);
  const exchanges = data?.data?.coins;

  // Pagination state
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  if (isFetching) return "Loading...";

  const paginatedRows = exchanges.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
        <Table aria-label="crypto exchange table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Rank</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>24h Volume</TableCell>
              <TableCell>Markets</TableCell>
              <TableCell>Change</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row) => (
              <Row key={row.uuid} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="center" p={2}>
        <Pagination
          count={Math.ceil(exchanges.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>
    </Paper>
  );
};

export default Exchanges;
