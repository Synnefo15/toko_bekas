import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { Store } from './Store';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SignupScreen from './screens/SignupScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import NavbarComp from './components/Navbar';
import axios from 'axios';
import Footer from './components/Footer';
import cssModule from './styles/Navbar.module.css'

function App() {
	const { state, dispatch: ctxDispatch } = useContext(Store);
	const { cart, userInfo } = state;
	// % masih belum guna 
	// const [users, setUsers] = useState([])
	// const getUserName = async () => {
	// 	try {
	// 		const userData = await axios.get(`/users/profile/${id}`);
	// 		setUsers(userData.data.data);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
		
	// }
	// useEffect(() => {
	// 	getUserName();
	// }, []);
	// %  
	
	const signoutHandler = () => {
		ctxDispatch({ type: 'USER_SIGNOUT' });
		localStorage.removeItem('userInfo');
		localStorage.removeItem('shippingAddress');
		localStorage.removeItem('paymentMethod');
	};
	return (
		<BrowserRouter>
			<div className="d-flex flex-column site-container">
				<ToastContainer position="bottom-center" limit={1} />
				<header>
					{/* <NavbarComp /> */}
					<Navbar className="p-3 navbar-light" style={{ backgroundColor: '#B8B8B8' }}>
						<Container className='align-items-center align-content-center '>
							
							<LinkContainer to="/">
								<div className="">
									<i class="fas fa-store"></i>
									<Navbar.Brand> Bekasmu</Navbar.Brand>
								</div>
							</LinkContainer>
							<Nav className="me-auto">
								<Link to="/cart" className="nav-link">
									Cart
									{cart.cartItems.length > 0 && (
										<Badge pill bg="danger">
											{cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
										</Badge>
									)}
								</Link>
								{userInfo ? (
									<NavDropdown title={userInfo.user_name} id="basic-nav-dropdown">
										<LinkContainer to="/profile">
											<NavDropdown.Item>User Profile</NavDropdown.Item>
										</LinkContainer>
										<LinkContainer to="/orderhistory">
											<NavDropdown.Item>Order History</NavDropdown.Item>
										</LinkContainer>
										<NavDropdown.Divider />
										<Link className="dropdown-item" to="#signout" onClick={signoutHandler}>
											Sign Out
										</Link>
									</NavDropdown>
								) : (
									<Link className="nav-link" to="/signin">
										Sign In
									</Link>
								)}
								<form className="d-flex ms-4" role="search">
									<input
										className={`form-control ${cssModule.pencarian} `}
										type="search"
										placeholder="Cari di sini ..."
										aria-label="Search"
									/>
									<button className={` ${cssModule.tombol}`} type="submit">
										<i className="fa-solid fa-magnifying-glass"></i>
									</button>
								</form>
							</Nav>
						</Container>
					</Navbar>
				</header>
				<main>
					<Container className="mt-3">
						<Routes>
							<Route path="/product/:id" element={<ProductScreen />} />
							<Route path="/cart" element={<CartScreen />} />
							<Route path="/signin" element={<SigninScreen />} />
							<Route path="/signup" element={<SignupScreen />}></Route>
							<Route path="/shipping" element={<ShippingAddressScreen />}></Route>
							<Route path="/payment" element={<PaymentMethodScreen />}></Route>
							<Route path="/placeorder" element={<PlaceOrderScreen />} />
							<Route path='/order' element={<OrderScreen />}/>
							<Route path="/" element={<HomeScreen />} />
						</Routes>
					</Container>
				</main>
				<footer>
					{/* <div className="text-center bg-success">All rights reserved</div> */}
					<Footer />
				</footer>
			</div>
		</BrowserRouter>
	);
}

export default App;
