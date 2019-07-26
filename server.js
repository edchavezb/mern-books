const express = require("express");
var mongoose = require("mongoose");
var db = require("./models");
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/bookshelf"

const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();


// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here
app.get("/library", function (req, res) {
  // TODO: Finish the route so it grabs all of the articles
  db.Book.find({})
    .then(function (all) {
      // If all Notes are successfully found, send them back to the client
      res.json(all);
    })
    .catch(function (err) {
      // If an error occurs, send the error back to the client
      res.json(err);
    });
});

app.post("/library/", function (req, res) {
  db.Book.create(req.body)
    .then(function (dbBook) {
      console.log(dbBook);
    })
    .then(function(dbBook) {
      res.json(dbBook);
    })
    .catch(function (err) {
      // If an error occurs, send the error back to the client
      res.json(err);
    });
});

app.get("/wipe", function (req, res) {
  // TODO: Finish the route so it grabs all of the articles
  db.Book.remove({})
    .then(function (all) {
      // If all Notes are successfully found, send them back to the client
      res.send("All entries wiped");
    })
    .catch(function (err) {
      // If an error occurs, send the error back to the client
      res.json(err);
    });
});

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
