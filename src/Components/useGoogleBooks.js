import { useEffect, useState } from "react";
import axios from "axios";

const useGoogleBooks = () => {
  const [bookData, setBookData] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      let items = [];

      // Make multiple requests to retrieve a total of 40 items
      for (let startIndex = 0; startIndex < 40; startIndex += 10) {
        try {
          const response = await axios.get(
            `https://www.googleapis.com/books/v1/volumes?q=computer&startIndex=${startIndex}&maxResults=10&key=AIzaSyBC7KYs-iOijtXP6BiCoe1PjzDveVNNap8`
          );

          if (response.data.items) {
            items = items.concat(response.data.items);
          }
        } catch (err) {
          console.log(err);
        }
      }

      // Update the state with the combined results
      setBookData(items);
    };

    fetchBooks();
  }, []);

  return bookData;
};

export default useGoogleBooks;
