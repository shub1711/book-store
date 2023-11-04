import React, { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";
import { useBookContext } from "../../BookContext";
import Modal from "../Modal";

import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  Button,
} from "@mui/material";

const MainCard = () => {
  const { bookData } = useBookContext();
  const [show, setShow] = useState(false);
  const [bookItem, setItem] = useState();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      setCart(JSON.parse(cartData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  // const searchBook = (evt) => {
  //   if (evt.key === "Enter") {
  //     axios
  //       .get(
  //         `https://www.googleapis.com/books/v1/volumes?q=+${search}+&key=AIzaSyBC7KYs-iOijtXP6BiCoe1PjzDveVNNap8`
  //       )
  //       .then((res) => setBookData(res.data.items))
  //       .catch((err) => console.log(err));
  //   }
  // };

  return (
    <>
      {bookData.map((book, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={
                book.volumeInfo.imageLinks &&
                book.volumeInfo.imageLinks.smallThumbnail
              }
              alt=""
            />
            <CardHeader
              onClick={() => {
                setShow(true);
                setItem(book);
              }}
              title={book.volumeInfo.title}
              subheader={`Price : ${
                book.saleInfo.listPrice && book.saleInfo.listPrice.amount
              }`}
            />
            <CardContent>
              <Typography variant="h5" gutterBottom>
                AUTHOR:{" "}
                {book.volumeInfo &&
                  book.volumeInfo.authors &&
                  book.volumeInfo.authors[0]}
              </Typography>

              <Button
                size="large"
                variant="contained"
                onClick={() => addToCart(book)}
              >
                ADD TO CART
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}

      <Modal show={show} item={bookItem} onClose={() => setShow(false)} />
    </>
  );
};

export default MainCard;
