// 3. Server set-up on port 3000
const express = require('express');
const server = express();
const port = 3000;
const path = require('path');
server.use(express.json());
server.use(express.static(path.join(__dirname, 'public')));

// 4. Array to store book objects
let books = [
    {id: 1, title: 'The Hunger Games', author: 'Suzanne Collins'},
    {id: 2, title: 'Divergent', author: 'Veronica Roth'},
    {id: 3, title: 'The Maze Runner', author: 'James Dashner'},
    {id: 4, title: 'The Giver', author: 'Lois Lowry'},
    {id: 5, title: 'The Fault in Our Stars', author: 'John Green'}
];

// 5. GET to return all books
server.get('/books', (req, res) => {
    res.json(books);
});

// 6. POST to add new book from request body
server.post('/books', (req, res) => {
    const {title, author} = req.body;
    if (!title || !author) {
        return res.status(400).json({error: 'Title and author are required'});
    }
    const newBook = {
        id: books.length>0 ? books[books.length - 1].id + 1 : 1,
        title,
        author
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

// 7. Put to update a book ny ID
server.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find(b => b.id === bookId);

  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  const { title, author } = req.body;
  if (title) book.title = title;
  if (author) book.author = author;

  res.json(book);
});

// 8. DELETE to remove a book
server.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const originalLength = books.length;

  books = books.filter(b => b.id !== bookId);

  if (books.length === originalLength) {
    return res.status(404).json({ message: 'Book not found' });
  }

  res.status(204).send();
});


server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
