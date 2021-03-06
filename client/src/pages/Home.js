import React, { Component } from "react";
import axios from 'axios';
import { Button, Row, Col, Form } from 'react-bootstrap';
import BookCard from "../components/BookCard";
import Wrapper from "../components/Wrapper";
import Title from "../components/Title";
import NavTabs from "../components/NavTabs";

class Home extends Component {
  state = {
    books: [],
  };

  componentDidMount() {
    this.setState({
      path: window.location.pathname
    });
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
    var title = this.state.searchWord ? this.state.searchWord : "Brave New World"
    axios.post("/search/", {search: title})
    .then(response => {
      this.setState({
        books: response.data
      });
    })
    .catch(error => {
      console.log(error);
    }); 
  }

  saveBook = (bookInfo) => {
    axios.post("/library/", bookInfo)
    .then(response => {
      var bookName = response.data.name
      var bookArray = this.state.books
      for (var i = 0; i < bookArray.length; i++){
        if (bookArray[i].volumeInfo.title === bookName){
          bookArray.splice(i, 1)
          this.setState({books: bookArray});
        }
      }
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <NavTabs 
          path = {this.state.path}
        />
        <Wrapper>
          <Title className="page-title" title="Book RecomMERNdations"/>
          <Row noGutters className="mt-3 mb-3">
            <Col xs="12">
              <p className="text-center">Search a title and add it to our collective list of the best books ever!</p>
            </Col>
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
                className="search-button input-lg"
              >
                Search
              </Button>
            </Col>
          </Row>
          {this.state.books.map(book => (
            <BookCard
              function= "Save"
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
      </div>
    );
  }
}

export default Home;
