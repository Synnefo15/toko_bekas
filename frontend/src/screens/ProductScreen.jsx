import axios from 'axios';
import { useContext, useEffect, useReducer } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Row, Col, Card, ListGroup, Badge, Button } from 'react-bootstrap';

import Rating from '../components/Rating';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils';
import { Store } from '../Store';

const reducer = (state, action) => {
	switch (action.type) {
		case 'FETCH_REQUEST':
			return { ...state, loading: true };
		case 'FETCH_SUCCESS':
			return { ...state, product: action.payload, loading: false };
		case 'FETCH_FAIL':
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};

function ProductScreen() {
	const navigate = useNavigate();
	const params = useParams();
	const { id } = params;

	const [{ loading, error, product }, dispatch] = useReducer(reducer, {
		product: [],
		loading: true,
		error: '',
	});
	useEffect(() => {
		const fetchData = async () => {
			dispatch({ type: 'FETCH_REQUEST' });
			try {
				const result = await axios.get(`/products/${id}`);
				dispatch({ type: 'FETCH_SUCCESS', payload: result.data.data });
			} catch (err) {
				dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
			}
		};
		fetchData();
	}, [id]);

	const { state, dispatch: ctxDispatch } = useContext(Store);
	const { cart } = state;
	const addToCartHandler = async () => {
		const existItem = cart.cartItems.find((x) => x.id === product.id);
		const quantity = existItem ? existItem.quantity + 1 : 1;
		const { data } = await axios.get(`/products/${product.id}`);
		if (data.stock < quantity) {
			window.alert('Sorry. Product habis');
			return;
		}
		ctxDispatch({
			type: 'CART_ADD_ITEM',
			payload: { ...product, quantity },
		});
		navigate('/cart');
	};
	return loading ? (
		<LoadingBox />
	) : error ? (
		<MessageBox variant="danger">{error}</MessageBox>
	) : (
		<div>
			<Row className="mt-4 justify-content-between">
				<Col md={6} className="me-3">
					<img
						className="img-large cardEffect rounded-1"
						src={product.product_image}
						alt={product.product_name}
						style={{ maxWidth: '100%' }}
					></img>
				</Col>
				<Col md={4}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<Helmet>
								<title>{product.product_name}</title>
							</Helmet>
							<h1>{product.product_name}</h1>
						</ListGroup.Item>
						<ListGroup.Item>
							<Rating rating={product.rating} numReviews={product.numReviews}></Rating>
						</ListGroup.Item>
						<ListGroup.Item>Harga : Rp{product.price}</ListGroup.Item>
						<ListGroup.Item>
							Deskripsi:
							<p>{product.product_description}</p>
						</ListGroup.Item>
					</ListGroup>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<Row>
								<Col>Price:</Col>
								<Col>${product.price}</Col>
							</Row>
						</ListGroup.Item>
						<ListGroup.Item>
							<Row>
								<Col>Status:</Col>
								<Col>
									{product.stock > 0 ? (
										<Badge bg="success">Tersedia</Badge>
									) : (
										<Badge bg="danger">Habis</Badge>
									)}
								</Col>
							</Row>
						</ListGroup.Item>

						{product.stock > 0 && (
							<ListGroup.Item>
								<div className="d-grid my-2">
									<Button onClick={addToCartHandler} className="tombol">
										Tambah
									</Button>
									<Button variant="" className="mt-3 tombol">
										Tawar
									</Button>
								</div>
							</ListGroup.Item>
						)}
					</ListGroup>
				</Col>
			</Row>
		</div>
	);
}
export default ProductScreen;
