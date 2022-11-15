const express = require('express')
const app = express()
const port = 4000
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const cors = require('cors');
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



//Connecting server to MongoDB database
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb+srv://admin:admin@cluster0.xqy1dav.mongodb.net/?retryWrites=true&w=majority');

}

//Specifying which shema to use for MongoDB
const bookSchema = new mongoose.Schema({
  title: String,
  cover: String,
  author: String
});

//Using the schema to  create new "book" database model
const bookModel = mongoose.model('books', bookSchema);



app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.get('/api/book/:id', (req, res) => {
  console.log(req.params.id);
  bookModel.findById(req.params.id, (err, data) => {
    res.json(data);
  })
})

//Listening for HTTP request that has a post method
app.post('/api/books', (req, res) => {
  console.log(req.body);

  //Creating record for model in database
  bookModel.create({
    title: req.body.title,
    cover: req.body.cover,
    author: req.body.author
  })
  res.send('Data Recieved');
})

// Get method with callback function to return error or data and send back data to application
app.get('/api/books', (req, res) => {
  bookModel.find((err, data) => {
    console.log(data);
    res.json(data);
  })


})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})