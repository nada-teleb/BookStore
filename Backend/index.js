import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { PORT, mongodbURL } from "./config.js";
import { booksRoute } from "./Routes/bookRoute.js";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS policy
// Option 1: Allow all origins with default of cors (*)
app.use(cors());
// Option 2: Allow custom origins
// app.use(cors({
// 	origin: 'http://localhost:3000',
// 	methods: ['GET', 'POST', 'PUT', 'DELETE'],
// 	allowedHeaders: ['Content-Type']
// }));



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