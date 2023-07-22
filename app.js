const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'views')));

let newItems = [];

// Edit task route
app.get('/edit/:index', (req, res) => {
  const index = req.params.index;
  const itemToEdit = newItems[index];
  res.redirect(`/?editTask=${encodeURIComponent(itemToEdit)}`);
});

app.post('/update', (req, res) => {
  const editIndex = req.body.editIndex;
  const updatedTask = req.body.updatedTask;
  newItems[editIndex] = updatedTask;
  res.redirect('/');
});

app.get('/', (req, res) => {
  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  let today = new Date();
  let day = today.toLocaleDateString("en-US", options);
  
  const editTask = req.query.editTask || '';
  
  res.render("list", { KindofDay: day, newListItems: newItems, editTask });
});

app.post('/', (req, res) => {
  let newItem = req.body.newItem;
  newItems.push(newItem);
  res.redirect('/');
});

app.post('/delete', (req, res) => {
  let deleteIndex = req.body.deleteItem;
  if (deleteIndex !== undefined) {
    newItems.splice(deleteIndex, 1);
  }
  res.redirect('/');
});

app.listen(3000, () => console.log("port is running at server 3000"));
