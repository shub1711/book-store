import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Box,
  CardMedia,
  CardHeader,
  Button,
} from "@mui/material";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import useGoogleBooks from "../useGoogleBooks";
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

const BookList = () => {
  const classes = useStyles();
  const bookData = useGoogleBooks();
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [cart, setCart] = useState([]);

  const authorNames =
    bookData &&
    Array.isArray(bookData) &&
    bookData.map(
      (book) =>
        book.volumeInfo && book.volumeInfo.authors && book.volumeInfo.authors[0]
    );

  const handleAuthorChange = (event) => {
    const author = event.target.value;
    console.log("Koca: author ", author);
    setSelectedAuthor(author);
    const filteredBooks = bookData.filter(
      (book) =>
        book.volumeInfo &&
        book.volumeInfo.authors &&
        book.volumeInfo.authors[0] === author
    );
    setFilteredBooks(filteredBooks);
  };

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

  return (
    <>
      <Box style={{ marginRight: "20px", padding: "20px" }}>
        <Grid container>
          <Grid item xs={3} paddingTop={3}>
            <FormControl
              variant="outlined"
              style={{ marginBottom: "20px", maxWidth: "300px" }}
              className={classes.selectFormControl} // Apply the custom CSS class
              size="medium"
            >
              <InputLabel>Select Author</InputLabel>
              <Select
                size="large"
                value={selectedAuthor}
                onChange={handleAuthorChange}
                label="Select Author"
              >
                <MenuItem value="">
                  <em>All Authors</em>
                </MenuItem>
                {authorNames.map((author, index) => (
                  <MenuItem key={index} value={author}>
                    {author}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={9}>
            <List>
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                  <ListItem
                    style={{
                      border: "1px solid #ccc",
                      margin: "5px",
                      padding: "10px",
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        alt={book.volumeInfo.title}
                        src={
                          book.volumeInfo &&
                          book.volumeInfo.imageLinks.smallThumbnail
                        }
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={book.volumeInfo.title}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {book.volumeInfo.authors[0]}
                          </Typography>{" "}
                          {book.volumeInfo.subtitle}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                ))
              ) : (
                <p>No books found for the selected author.</p>
              )}
            </List>
          </Grid>
        </Grid>
      </Box>
      <Box style={{ display: "flex" }}>
        <Box>
          <Box></Box>
          <div className={classes.root}>
            <Grid
              container
              spacing={2}
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
            >
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
                      title={book.volumeInfo.title}
                      subheader={`Price : ${
                        book.saleInfo.listPrice &&
                        book.saleInfo.listPrice.amount
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
            </Grid>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default BookList;
