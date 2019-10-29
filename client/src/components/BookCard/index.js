import React from "react";
import Button from 'react-bootstrap/Button';
import "./style.css";

function BookCard(props) {
  return (
    <div className="book-container">
      <img className="book-img" alt={props.name} src={props.image}/>
      <div className="book-info">
        <div className="text-area">
          <h5>{props.author} - <span className="book-name">{props.name}</span></h5>
          <p className="description">{props.summary}</p>
        </div>
        <div className="button-wrapper">
          <a className="gbooks-link" href={props.url}><Button variant="primary" className="more-button">Info</Button></a>
          <Button variant="primary" className="save-button" onClick={() => {props.function === "Save" ? props.saveBook({
            "name": props.name,
            "author": props.author,
            "summary": props.summary,
            "image": props.image,
            "url" : props.url
          }) : props.deleteBook(props.id)}}>{props.function}</Button>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
