import React, { useState, useEffect } from "react";
import Card from "./Card/Card";
import Searchbar from "./Searchbar/Searchbar";
import axios from "axios";
import { useBookContext } from "../BookContext";
import { Box } from "@mui/material";

const Main = () => {
  const [search, setSearch] = useState("");
  const { setBookData } = useBookContext();

  useEffect(() => {
    const fetchBooks = async () => {
      let items = [];
      for (let startIndex = 0; startIndex < 40; startIndex += 10) {
        try {
          const response = await axios.get(
            `https://www.googleapis.com/books/v1/volumes?q=computer&startIndex=${startIndex}&maxResults=10&key=AIzaSyBC7KYs-iOijtXP6BiCoe1PjzDveVNNap8`
          );
          if (response.data.items) {
            items = items.concat(response.data.items);
          }
        } catch (err) {}
      }
      setBookData(items);
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    const searchBook = async () => {
      if (search) {
        try {
          const response = await axios.get(
            `https://www.googleapis.com/books/v1/volumes?q=${search}&key=AIzaSyBC7KYs-iOijtXP6BiCoe1PjzDveVNNap8`
          );
          setBookData(response.data.items);
        } catch (err) {
          console.log(err);
        }
      }
    };

    searchBook();
  }, [search]);

  const handleSearch = (data) => {
    setSearch(data);
  };

  return (
    <>
      <Box
        style={{
          paddingTop: "20px",
        }}
      >
        <Searchbar onSearch={handleSearch} />
      </Box>
      <div className="container">{<Card />}</div>
    </>
  );
};

export default Main;
