// AuthorBooks.js
import React from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, Typography } from "@mui/material";
import useGoogleBooks from "../useGoogleBooks";

const AuthorBooks = () => {
  const { authorName } = useParams();
  const bookData = useGoogleBooks();

  // Filter books by the selected author
  const authorBooks =
    bookData &&
    Array.isArray(bookData) &&
    bookData.filter(
      (book) =>
        book.volumeInfo &&
        book.volumeInfo.authors &&
        book.volumeInfo.authors.includes(authorName)
    );

  return (
    <div>
      <h2>Books by {authorName}</h2>
      {authorBooks.map((book, index) => (
        <Card key={index} style={{ margin: "10px" }}>
          <CardContent>
            <Typography variant="h6" component="div">
              {book.volumeInfo.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {book.volumeInfo.publishedDate}
            </Typography>
            <Typography variant="body2">
              {book.volumeInfo.description}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AuthorBooks;
