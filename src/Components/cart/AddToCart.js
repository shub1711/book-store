import React, { useEffect, useState } from "react";

import {
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  selectFormControl: {
    width: "300px",
  },
}));
const Cart = () => {
  const classes = useStyles();

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      const parsedCartData = JSON.parse(cartData);
      setCartData(parsedCartData);
    }
  }, []);

  const handleRemoveFromCart = (index) => {
    const updatedCartData = [
      ...cartData.slice(0, index),
      ...cartData.slice(index + 1),
    ];

    setCartData(updatedCartData);

    localStorage.setItem("cart", JSON.stringify(updatedCartData));
  };

  const totalAmount = cartData.reduce((total, book) => {
    const listPrice = book?.saleInfo?.listPrice?.amount || 0;
    return total + listPrice;
  }, 0);

  console.log("Koca: totalAmount ", totalAmount);

  return (
    <div>
      <div className={classes.root}>
        <Grid
          container
          spacing={2}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          {cartData &&
            cartData.map((book, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card key={index}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={
                      book?.volumeInfo &&
                      book?.volumeInfo?.imageLinks?.smallThumbnail
                    }
                    alt=""
                  />
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {book?.volumeInfo?.title}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      PRICE: &#8377;{" "}
                      {book?.saleInfo.listPrice &&
                        book?.saleInfo?.listPrice?.amount}
                    </Typography>
                    <Button
                      size="large"
                      variant="contained"
                      onClick={() => handleRemoveFromCart(index)}
                    >
                      Remove from Cart
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </div>

      <Button
        size="large"
        variant="contained"
        style={{
          color: "black",
          backgroundColor: "red",
        }}
      >
        TOTAL : {totalAmount}
      </Button>
    </div>
  );
};

export default Cart;
