import express from "express";
import mongoose from "mongoose";
import { PORT, mongodbURL } from "./config.js";
import { Book } from "./Models/bookModel.js";

const app = express();

// Middleware for parsing request body
app.use(express.json());

app.get('/', (req, res) => {
	console.log(req);
	return res.status(234).send('Welcome to MERN tutorial!');
});

// Route to save a new book
app.post('/books', async (req, res) => {
	try {
		if (!req.body.title || !req.body.author || !req.body.publishYear)
			return res.status(400).send({ message: 'Send all required fields: title, author, publishYear' });

		const newBook = {
			title: req.body.title,
			author: req.body.author,
			publishYear: req.body.publishYear
		};

		const book = await Book.create(newBook);

		return res.status(201).send(book);

	} catch (error) {
		console.log(error);
		res.status(500).send({ message: error.message });
	}
});

// Route to get ALL books from the database
app.get('/books', async (req, res) => {
	try {
		const books = await Book.find({});
		// return res.status(200).send(books);
		return res.status(200).send({
			count: books.length,
			data: books
		});

	} catch (error) {
		console.log(error);
		res.status(500).send({ message: error.message });
	}
});

// Route to get one book from the database by ID
app.get('/books/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const book = await Book.findById(id);
		return res.status(200).send(book);

	} catch (error) {
		console.log(error);
		res.status(500).send({ message: error.message });
	}
});

// Route to update a book
app.put('/books/:id', async (req, res) => {
	try {
		if (!req.body.title || !req.body.author || !req.body.publishYear)
			return res.status(400).send({ message: 'Send all required fields: title, author, publishYear' });

		const { id } = req.params;
		const result = await Book.findByIdAndUpdate(id, req.body);

		if (!result)
			return res.status(404).json({ message: 'Book not found' });
		return res.status(200).send({ message: 'Book updated successfully' });

	} catch (error) {
		console.log(error);
		res.status(500).send({ message: error.message });
	}
});

// Route to dalete a book
app.delete('/books/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const result = await Book.findByIdAndDelete(id);

		if (!result)
			return res.status(404).json({ message: 'Book not deleted' });
		return res.status(200).send({ message: 'Book deleted successfully' });

	} catch (error) {
		console.log(error);
		res.status(500).send({ message: error.message });
	}
});

mongoose.connect(mongodbURL)
	.then(()=> {
		console.log('App connected to database');
		app.listen(PORT, () => {
			console.log(`App is listening on ${PORT}`);
		});
	})
	.catch(error => {
		console.log(error);
	});