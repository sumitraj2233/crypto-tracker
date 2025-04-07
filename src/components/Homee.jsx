import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import { useGetCryptoDataQuery } from "../services/cryptoApi";
import millify from "millify";
import Cryptocurrencies from "./Cryptocurrencies";
import { Link } from "react-router-dom";
import News from "./News";

const Homee = () => {
  const { data, isFetching } = useGetCryptoDataQuery(100);
  if (isFetching) return "Loading...";
  const globalStats = data?.data?.stats;

  return (
    <div>
      <Typography variant="h3">Global Crypto Stats</Typography>
      <br />
      <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid size={6}>
          <Typography variant="h6">Total Cryptocurencies</Typography>
          <Typography fontWeight={200}>{globalStats?.total}</Typography>
        </Grid>
        <Grid size={6}>
          <Typography variant="h6">Total Exchanges</Typography>
          <Typography fontWeight={200}>
            {millify(globalStats?.totalExchanges)}
          </Typography>
        </Grid>
        <Grid size={6}>
          <Typography variant="h6">Total Market cap</Typography>
          <Typography fontWeight={200}>
            {millify(globalStats?.totalMarketCap)} USD
          </Typography>
        </Grid>
        <Grid size={6}>
          <Typography variant="h6">Total 24h Volume</Typography>
          <Typography fontWeight={200}>
            {millify(globalStats?.total24hVolume)}
          </Typography>
        </Grid>
        <Grid size={6}>
          <Typography variant="h6">Total Markets</Typography>
          <Typography fontWeight={200}>
            {millify(globalStats?.totalMarkets)}
          </Typography>
        </Grid>
      </Grid>
      <br />
      <div className="sub-header">
        <Typography variant="h5">
          Top 10 Cryptocurrencies in the World
        </Typography>
        <Link to="/cryptocurrencies">
          <Button size="small">Show more</Button>
        </Link>
      </div>
      <br />
      <Cryptocurrencies cardCount={10} />
      <br />
      <div className="sub-header">
        <Typography variant="h5">Latest Crypto News</Typography>
        <Link to="/news">
          <Button size="small">Show more</Button>
        </Link>
      </div>
      <br />
      <News cardCount={10} />
    </div>
  );
};

export default Homee;
