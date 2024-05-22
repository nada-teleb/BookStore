import express from "express";
import mongoose from "mongoose";
import { PORT, mongodbURL } from "./config.js";
import { booksRoute } from "./Routes/bookRoute.js";

const app = express();

// Middleware for parsing request body
app.use(express.json());

app.get('/', (req, res) => {
	console.log(req);
	return res.status(234).send('Welcome to MERN tutorial!');
});

// Use booksRoute for each /books request
app.use('/books', booksRoute);

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