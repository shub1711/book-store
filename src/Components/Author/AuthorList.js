import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useGoogleBooks from "../useGoogleBooks";

const AuthorList = () => {
  const bookData = useGoogleBooks();

  const authorCounts = {};

  for (const book of bookData) {
    const authors = book.volumeInfo.authors;
    const bookTitle = book.volumeInfo.title;

    if (authors) {
      // Iterate through authors of the current book
      for (const author of authors) {
        // Increment the count for the author or initialize it to 1
        authorCounts[author] = authorCounts[author] || { count: 0, books: [] };
        authorCounts[author].count += 1;
        authorCounts[author].books.push(bookTitle);
      }
    }
  }

  return (
    <div>
      {Object.keys(authorCounts).map((author, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Author Name: {author}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {`${author} has written ${authorCounts[author].count} book(s):`}
              <ul>
                {authorCounts[author].books.map((book, index) => (
                  <li key={index}>{book}</li>
                ))}
              </ul>
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default AuthorList;
