import React, { Component } from "react";
import axios from 'axios';
import BookCard from "../BookCard";
import Wrapper from "../Wrapper";
import Title from "../Title";

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
        <Title title="My Saved Books"/>
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
