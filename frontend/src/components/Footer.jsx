import React from 'react';

const Footer = () => (
	<div className="container-fluid  ">
		<footer className="row d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top ">
			<div className="col-md-3  d-flex align-items-center ms-3 justify-content-center mt-2 ">
				<i class="fas fa-store"></i>
				<span> Bekasmu</span>
			</div>
			<div className="col-md-3  d-flex justify-content-center mt-2 ">
				<span>oleh FSW 11-Kelompok 5</span>
			</div>
			<ul className="nav col-md-3  list-unstyled d-flex justify-content-center mt-2 ">
				<li className="ms-3">
					<a href="" className="">
						<i class="fab fa-instagram"></i>
					</a>
				</li>
				<li className="ms-3">
					<a href="" className="">
						<i class="fab fa-twitter"></i>
					</a>
				</li>
				<li className="ms-3">
					<a href="" className="">
						<i className="fab fa-whatsapp"></i>
					</a>
				</li>
			</ul>
		</footer>
	</div>
);

export default Footer;
