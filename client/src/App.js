import React, { Component } from "react";
import axios from 'axios';
import { Button, Row, Col, Form } from 'react-bootstrap';
import BookCard from "./components/BookCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";

class App extends Component {
  state = {
    books: [],
    searchWord: "1984"
  };

  componentDidMount() {
    this.apiCall();
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.apiCall();
  };

  apiCall = () => {
    let APIKey = "AIzaSyAUWA0Up9T07q7HQp2rCHzmNI4NkxbmYIY";
    let search = this.state.searchWord
    axios.get('https://www.googleapis.com/books/v1/volumes?q=' + search + '&langRestrict=en&key=' + APIKey)
    .then(response => {
      console.log(response.data.items);
      this.setState({
        books: response.data.items
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  saveBook = (bookInfo) => {
    axios.post("/library/", bookInfo)
    .then(response => {
      console.log(response.config.data);
      console.log("Book saved to library");
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    return (
      <Wrapper>
        <Title title="Google Book Search"/>
        <Row className="mt-3 mb-3">
          <Col xs="9" sm="10">
            <Form.Control type="text" placeholder="All the books are here"  name="searchWord"
              value={this.state.searchWord} 
              onChange={this.handleInputChange}
            />  
          </Col>
          <Col xs="3" sm="2">
            <Button
              onClick={this.handleFormSubmit}
              type="success"
              className="input-lg"
            >
              Search
            </Button>
          </Col>
        </Row>
        {this.state.books.map(book => (
          <BookCard
            saveBook= {this.saveBook}
            key={book.id}
            name={book.volumeInfo.title}
            author={book.volumeInfo.authors ? book.volumeInfo.authors[0] : "Anonymous" }
            summary={book.volumeInfo.description}
            image={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "images/Placeholder_book.svg"}
            url={book.volumeInfo.infoLink}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;
