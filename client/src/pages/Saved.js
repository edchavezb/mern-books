import React, { Component } from "react";
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';
import BookCard from "../components/BookCard";
import Wrapper from "../components/Wrapper";
import Title from "../components/Title";
import NavTabs from "../components/NavTabs";

class Saved extends Component {
  state = {
    books: [],
    showModal: false
  };

  componentDidMount() {
    this.setState({
      path: window.location.pathname
    });
    this.getSavedBooks();
  }

  getSavedBooks = () => {
    axios.get("/library")
    .then(response => {
      this.setState({
        books: response.data
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  passwordCheck = () => {
    axios.post("/passwordcheck", {password: this.state.password})
    .then(response => {
      if (response.data.confirm === true){
        this.deleteBook(this.state.deleteId);
      }
      else {
        console.log("Password is incorrect")
      }
    })
  }

  deleteBook = (id) => {
    axios.post("/library/" + id)
    .then(response => {
      console.log(response.data.message);
    })
    .catch(error => {
      console.log(error);
    });
    this.handleClose();
    this.getSavedBooks();
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleClose = () => this.setState({showModal: false});
  handleShow = (id) => this.setState({showModal: true, deleteId: id});

  render() {
    return (
      <div>
        <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control type="password" placeholder="Enter the secret password to delete this title"  name="password"
              value={this.state.password} 
              onChange={this.handleInputChange}
            />  
            <Button className="confirm-button" variant="primary" onClick={this.passwordCheck}>
              Confirm
            </Button>
          </Modal.Body>
        </Modal>
        <NavTabs 
          path = {this.state.path}
        />
        <Wrapper>
          <Title title="Best books of all time"/>
          <p>(According to people who visited this site)</p>
          {this.state.books.map(book => (
            <BookCard
              function= "Delete"
              deleteModal= {this.handleShow}
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
      </div>
    );
  }
}

export default Saved;
