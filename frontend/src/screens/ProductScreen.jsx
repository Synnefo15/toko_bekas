import axios from 'axios';
import { useContext, useEffect, useReducer } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Row, 
  Col, 
  Card, 
  ListGroup, 
  Badge, 
  Button} from 'react-bootstrap';

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
	const { slug } = params;

	const [{ loading, error, product }, dispatch] = useReducer(reducer, {
		product: [],
		loading: true,
		error: '',
	});
	useEffect(() => {
		const fetchData = async () => {
			dispatch({ type: 'FETCH_REQUEST' });
			try {
				const result = await axios.get(`/api/products/slug/${slug}`);
				dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
			} catch (err) {
				dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
			}
		};
		fetchData();
	}, [slug]);

	const { state, dispatch: ctxDispatch } = useContext(Store);
	const { cart } = state;
	const addToCartHandler = async () => {
		const existItem = cart.cartItems.find((x) => x._id === product._id);
		const quantity = existItem ? existItem.quantity + 1 : 1;
		const { data } = await axios.get(`/api/products/${product._id}`);
		if (data.countInStock < quantity) {
			window.alert('Sorry. Product is out of stock');
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
			<Row>
				<Col md={6}>
					<img className="img-large" src={product.image} alt={product.name} style={{ "maxWidth":"100%" }}></img>
				</Col>
				<Col md={3}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<Helmet>
								<title>{product.name}</title>
							</Helmet>
							<h1>{product.name}</h1>
						</ListGroup.Item>
						<ListGroup.Item>
							<Rating rating={product.rating} numReviews={product.numReviews}></Rating>
						</ListGroup.Item>
						<ListGroup.Item>Harga : Rp{product.price}</ListGroup.Item>
						<ListGroup.Item>
							Deskripsi:
							<p>{product.description}</p>
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
									{product.countInStock > 0 ? (
										<Badge bg="success">In Stock</Badge>
									) : (
										<Badge bg="danger">Unavailable</Badge>
									)}
								</Col>
							</Row>
						</ListGroup.Item>

						{product.countInStock > 0 && (
							<ListGroup.Item>
								<div className="d-grid">
									<Button onClick={addToCartHandler} variant="primary">
										Add to Cart
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
