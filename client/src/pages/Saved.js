import React, { Component } from "react";
import axios from 'axios';
import BookCard from "../components/BookCard";
import Wrapper from "../components/Wrapper";
import Title from "../components/Title";

class Saved extends Component {
  state = {
    books: [],
  };

  componentDidMount() {
    this.getSavedBooks();
  }

  getSavedBooks = () => {
    axios.get("/library")
    .then(response => {
      console.log(response.data);
      this.setState({
        books: response.data
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  deleteBook = (id) => {
    axios.post("/library/" + id)
    .then(response => {
      console.log(response);
      console.log("Book removed!");
    })
    .catch(error => {
      console.log(error);
    });
    this.getSavedBooks();
  }

  render() {
    return (
      <Wrapper>
        <Title title="Best books of all time"/>
        <p>(According to people who visited this site)</p>
        {this.state.books.map(book => (
          <BookCard
            function= "Delete"
            deleteBook= {this.deleteBook}
            key={book._id}
            id={book._id}
            name={book.name}
            author={book.author}
            summary={book.summary}
            image={book.image}
            url={book.url}
          />
        ))}
      </Wrapper>
    );
  }
}

export default Saved;
