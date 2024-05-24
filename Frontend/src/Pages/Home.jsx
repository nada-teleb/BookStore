import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

import axios from 'axios';
import Spinner from '../Components/Spinner';
import BooksTable from '../Components/Home/BooksTable';
import BooksCard from '../Components/Home/BooksCard';

const Home = () => {
	const [books, setBooks] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		axios
			.get('http://localhost:5555/books')
			.then((response) => {
				setBooks(response.data.data);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});
	}, []);

	return (
		<div className='p-4'>
			<div className='flex justify-between items-center'>
				<h1 className='text-3xl my-8'> Books List </h1>
				<Link to='http:/books/create'>
					<MdOutlineAddBox className='text-sky-800 text-4xl' />
				</Link>
			</div>

			{loading ? (
				<Spinner />
			) : (
				<BooksTable books={books} />
			)}
		</div>
	)
}

export default Home
