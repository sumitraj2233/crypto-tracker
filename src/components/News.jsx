import React, { useEffect, useState } from "react";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CardMedia,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useGetCryptoDataQuery } from "../services/cryptoApi";

const News = ({ cardCount }) => {
  const [searchTerm, setSearchTerm] = useState("Cryptocurrency");

  const [cryptoNews, setCryptoNews] = useState();
  const count = cardCount ? 10 : 100;
  const { data, isFetching } = useGetCryptoNewsQuery({
    newsCategory: searchTerm,
    count: count,
  });
  const dataCryto = useGetCryptoDataQuery(100);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    setCryptoNews(data?.data);
  }, [data]);

  if (isFetching) return "Loading...";

  const convertDate = (date) => {
    const newDate = new Date(date);
    const diff = new Date() - newDate;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return `${days} days ago`;
  };
  return (
    <>
      {!cardCount && (
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-label">Select a crypto</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={searchTerm}
            label="Select a crypto"
            onChange={handleChange}
          >
            {dataCryto.data.data.coins?.map((coin) => (
              <MenuItem value={coin.name}>{coin.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      <Grid
        container
        rowSpacing={4}
        columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}
      >
        {cryptoNews?.map((news) => (
          <Grid size={6} key={news.title}>
            <Card>
              <CardContent>
                <div className="news-card">
                  <Typography variant="h5" style={{ flex: 7 }}>
                    {news.title}
                  </Typography>
                  <CardMedia
                    component="img"
                    image={news.thumbnail}
                    alt={news.title}
                    sx={{
                      height: "5rem",
                      objectFit: "cover",
                      width: "5rem",
                    }}
                  />
                </div>
                <Typography>{news.excerpt}</Typography>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <CardMedia
                    component="img"
                    image={news.publisher.favicon}
                    alt={news.title}
                    style={{ width: "1.5rem", height: "1.5rem" }}
                  />
                  <Typography variant="body2" color="textSecondary">
                    {news.publisher.name}
                  </Typography>
                </div>
                <br />
                <Box display={"flex"} justifyContent={"space-between"}>
                  <a href={news.url} target="_blank" rel="noreferrer">
                    Read more
                  </a>
                  <Typography color="textSecondary">
                    {convertDate(news.date)}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default News;
