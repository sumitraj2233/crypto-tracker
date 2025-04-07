import { Grid, MenuItem, Paper, Select, Typography } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoApi";
import millify from "millify";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import MilitaryTechOutlinedIcon from "@mui/icons-material/MilitaryTechOutlined";
import OfflineBoltOutlinedIcon from "@mui/icons-material/OfflineBoltOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import DataExplorationOutlinedIcon from "@mui/icons-material/DataExplorationOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import LineChartt from "./LineChart";

const CryptoDetails = () => {
  const { coinId } = useParams();
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const [timePeriod, setTimePeriod] = useState("24h");
  const { data: coinHistory, isFetching: isFetchingCoinHistory } =
    useGetCryptoHistoryQuery({
      coinId: coinId,
      timePeriod: timePeriod,
    });
  const cryptoDetails = data?.data?.coin;

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];
  if (isFetchingCoinHistory) return "Loading...";
  if (isFetching) return "Loading...";
  return (
    <div>
      <div className="cryptoDetails-header">
        <Typography variant="h4" color="primary">
          {cryptoDetails?.name} {`(${cryptoDetails?.symbol})`} Price
        </Typography>
        {/* <Typography variant="h7">{cryptoDetails?.description}</Typography> */}
      </div>
      <div>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue={"24h"}
          value={timePeriod}
          label="Select time period"
          onChange={(e) => setTimePeriod(e.target.value)}
        >
          {time.map((ele) => (
            <MenuItem value={ele}>{ele}</MenuItem>
          ))}
        </Select>
        <LineChartt
          coinHistory={coinHistory}
          currentPrice={millify(cryptoDetails?.price)}
          coinName={cryptoDetails?.name}
        />
      </div>
      <div className="cryptoDetails-body">
        <Grid container spacing={3}>
          <Paper elevation={1} className="stat-card">
            <Grid size="grow">
              <div className="crypto-left-header">
                <Typography variant="h4">
                  {cryptoDetails?.name} Value Statistics
                </Typography>
                <Typography variant="h5">
                  An overview showing the stats of {cryptoDetails?.name}{" "}
                </Typography>
              </div>
              <div className="crypto-left-body">
                <Typography variant="h6">
                  <AttachMoneyOutlinedIcon />
                  Price to USD {millify(cryptoDetails?.price)}
                </Typography>
                <Typography variant="h6">
                  <MilitaryTechOutlinedIcon />
                  Rank: {cryptoDetails?.rank}
                </Typography>
                <Typography variant="h6">
                  <OfflineBoltOutlinedIcon />
                  24h Volume: {millify(cryptoDetails?.["24hVolume"])}
                </Typography>
                <Typography variant="h6">
                  <AttachMoneyOutlinedIcon />
                  Market Cap: {millify(cryptoDetails?.marketCap)}
                </Typography>
                <Typography variant="h6">
                  <EmojiEventsOutlinedIcon />
                  All time high: {millify(cryptoDetails?.allTimeHigh?.price)}
                </Typography>
              </div>
            </Grid>
          </Paper>
          <Paper elevation={1} className="stat-card">
            <Grid size="grow">
              <div className="crypto-right-header">
                <Typography variant="h4">Other Statistics</Typography>
                <Typography variant="h5">
                  An overview showing the stats of all cryptos
                </Typography>
              </div>
              <div className="crypto-right-body">
                <Typography variant="h6">
                  <TimelineOutlinedIcon />
                  Number Of Markets: {millify(cryptoDetails?.numberOfMarkets)}
                </Typography>
                <Typography variant="h6">
                  <DataExplorationOutlinedIcon />
                  Number Of Exchanges:
                  {millify(cryptoDetails?.numberOfExchanges)}
                </Typography>
                <Typography variant="h6">
                  <ErrorOutlineOutlinedIcon />
                  Approved Supply: {millify(cryptoDetails?.supply?.confirmed)}
                </Typography>
                <Typography variant="h6">
                  <ErrorOutlineOutlinedIcon />
                  Total Supply: {millify(cryptoDetails?.supply?.total)}
                </Typography>
                <Typography variant="h6">
                  <ErrorOutlineOutlinedIcon />
                  Circulating Supply:
                  {millify(cryptoDetails?.supply?.circulating)}
                </Typography>
              </div>
            </Grid>
          </Paper>
        </Grid>
      </div>
      <div className="cryptoDetails-footer">
        <Typography variant="h4">What is {cryptoDetails?.name}</Typography>
        <Typography variant="h5">{cryptoDetails?.description}</Typography>
      </div>
      <div className="cryptoDetails-links">
        <Typography variant="h4">{cryptoDetails?.name} Links</Typography>
        {cryptoDetails?.links?.map((link) => (
          <Grid container spacing={2} columns={16} key={link?.name}>
            <Grid size="grow">{link?.type}</Grid>
            <Grid size="grow">
              <a href={link?.url} target="_blank" rel="noreferrer">
                {link?.url}
              </a>
            </Grid>
          </Grid>
        ))}
      </div>
    </div>
  );
};

export default CryptoDetails;
