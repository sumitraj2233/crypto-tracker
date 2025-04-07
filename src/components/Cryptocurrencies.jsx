import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGetCryptoDataQuery } from "../services/cryptoApi";
import millify from "millify";
import { Link } from "react-router-dom";

const Cryptocurrencies = ({ cardCount }) => {
  let count = cardCount ? 10 : 100;
  const { data, isFetching } = useGetCryptoDataQuery(count);
  const [searchValue, setSearchValue] = useState("");
  const cryptoList = data?.data?.coins;
  const [cryptos, setCryptos] = useState(cryptoList);
  useEffect(() => {
    const filteredCoins = cryptoList?.filter((coin) =>
      coin.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setCryptos(filteredCoins);
  }, [searchValue, cryptoList]);

  if (isFetching) return "Loading...";

  return (
    <div className="cryptocurrencies">
      {!cardCount && (
        <div className="search-box">
          <TextField
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            id="outlined-basic"
            label="Search crypto"
            variant="outlined"
          />
        </div>
      )}
      <br />
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {cryptos?.map((coin) => (
          <Card sx={{ maxWidth: "16rem" }} key={coin.uuid}>
            <CardMedia
              className="media"
              sx={{ height: 140 }}
              style={{ marginRight: "5em" }}
              image={coin.iconUrl}
              title="Test Image"
            />
            <CardContent style={{ minWidth: "248px" }}>
              <Typography gutterBottom variant="h5" component="div">
                {coin.rank}. {coin.name}
              </Typography>
              <Typography>Price: {millify(coin.price)}</Typography>
              <Typography>Market Cap: {millify(coin.marketCap)}</Typography>
              <Typography>Change: {coin.change}</Typography>
            </CardContent>
            <CardActions>
              <Link to={`/crypto/${coin.uuid}`}>
                <Button size="small">Learn More</Button>
              </Link>
            </CardActions>
          </Card>
        ))}
      </Grid>
    </div>
  );
};

export default Cryptocurrencies;
