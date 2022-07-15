import { Card, Button } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import Rating from './Rating';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';

function Product(props) {
	const { product } = props;

	const { state, dispatch: ctxDispatch } = useContext(Store);
	const {
		cart: { cartItems },
	} = state;

	const addToCartHandler = async (item) => {
		const existItem = cartItems.find((x) => x.id === product.id);
		const quantity = existItem ? existItem.quantity + 1 : 1;
		const { data } = await axios.get(`/products/${item.id}`);
		if (data.stock < quantity) {
			window.alert('Sorry. Product habis');
			return;
		}
		ctxDispatch({
			type: 'CART_ADD_ITEM',
			payload: { ...item, quantity },
		});
	};

	return (
		<Card className="cardEffect">
			<Link to={`/product/${product.id}`}>
				<img src={product.product_image} className="card-img-top cardImg" alt={product.name} />
			</Link>
			<Card.Body>
				<Link to={`/product/${product.id}`}>
					<Card.Title>{product.name}</Card.Title>
				</Link>
				<Rating rating={product.rating} numReviews={product.numReviews} />
				<Card.Text>Rp {product.price}</Card.Text>
				{product.stock === 0 ? (
					<Button variant="light" disabled className="text-danger">
						Habis
					</Button>
				) : (
					<Button className='tombol' onClick={() => addToCartHandler(product)}>Tambah</Button>
				)}
			</Card.Body>
		</Card>
	);
}
export default Product;
