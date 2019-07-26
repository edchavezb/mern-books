import React from "react";
import Button from 'react-bootstrap/Button';
import "./style.css";

function BookCard(props) {
  return (
    <div className="img-container">
      <img className="book-img" alt={props.name} src={props.image}/>
      <div className="text-area">
        <h5>{props.author} - {props.name}</h5>
        <p className="small">{props.summary}</p>
      </div>
      <div className="button-wrapper">

        <a href={props.url}><Button variant="primary" className="mt-4">More</Button></a>
        <Button variant="primary" className="mt-2" onClick={() => props.saveBook({
          "name": props.name,
          "author": props.author,
          "summary": props.summary,
          "image": props.image,
          "url" : props.url
        })}>Save</Button>

      </div>
    </div>
  );
}

export default BookCard;
