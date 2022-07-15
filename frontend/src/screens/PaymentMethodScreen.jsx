import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CheckoutSteps from '../components/CheckoutSteps';
import { Store } from '../Store';

export default function PaymentMethodScreen() {
	const navigate = useNavigate();
	const { state, dispatch: ctxDispatch } = useContext(Store);
	const {
		cart: { shippingAddress, paymentMethod },
	} = state;

	const [paymentMethodName, setPaymentMethod] = useState(paymentMethod || 'BRI');

	useEffect(() => {
		if (!shippingAddress.address) {
			navigate('/shipping');
		}
	}, [shippingAddress, navigate]);
	const submitHandler = (e) => {
		e.preventDefault();
		ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
		localStorage.setItem('paymentMethod', paymentMethodName);
		navigate('/placeorder');
	};
	return (
		<div>
			<CheckoutSteps step1 step2 step3></CheckoutSteps>
			<div className="container small-container">
				<Helmet>
					<title>Pembayaran</title>
				</Helmet>
				<h1 className="my-3">Metode Pembayaran</h1>
				<Form onSubmit={submitHandler}>
					<div className="mb-3">
						<Form.Check
							type="radio"
							id="BRI"
							label="BRI"
							value="BRI"
							checked={paymentMethodName === 'BRI'}
							onChange={(e) => setPaymentMethod(e.target.value)}
						/>
					</div>
					<div className="mb-3">
						<Form.Check
							type="radio"
							id="BCA"
							label="BCA"
							value="BCA"
							checked={paymentMethodName === 'BCA'}
							onChange={(e) => setPaymentMethod(e.target.value)}
						/>
					</div>
					<div className="mb-3">
						<Button type="submit">Continue</Button>
					</div>
				</Form>
			</div>
		</div>
	);
}
