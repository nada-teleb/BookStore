import express from "express";
import mongoose from "mongoose";
import { PORT, mongodbURL} from "./config.js";

const app = express();


app.get('/', (req, res) => {
	console.log(req);
	return res.status(234).send('Welcome to MERN tutorial!');
});


mongoose.connect(mongodbURL)
	.then(()=> {
		console.log('App connected to database');
		app.listen(PORT, () => {
			console.log(`App is listening on ${PORT}`);
		});
	})
	.catch(err => {
		console.log(err);
	});