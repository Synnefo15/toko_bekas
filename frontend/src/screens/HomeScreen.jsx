import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';
import { Row, Col } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';

import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Banner from '../components/Homescreen/Banner';
import CategoryList from '../components/Homescreen/CategoryList';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }

    };
    fetchData();
  }, []);
  return (
		<div>
			<Helmet>
				<title>Bekasmu</title>
			</Helmet>
			<Banner />
			<CategoryList />
			<h4 className="mt-3">Produk Kami</h4>
			<div className="products justify-content-center align-items-center">
				{loading ? (
					<LoadingBox />
				) : error ? (
					<MessageBox variant="danger">{error}</MessageBox>
				) : (
					<Row className="justify-content-center mt-3">
						{products.map((product) => (
							<Col key={product.id} sm={5} md={4} lg={3} className="mb-3">
								<Product product={product}></Product>
							</Col>
						))}
					</Row>
				)}
			</div>
		</div>
	);
}
export default HomeScreen;
