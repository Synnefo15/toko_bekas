import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import "../../styles/banner.css"

const Banner = () => {
    // Get Width Screen for responsif carousel
    const [windowDimention, detectW] = useState({
        winWidth: window.innerWidth,
    });

    const detectSize = () => {
        detectW({
            winWidth: window.innerWidth,
        });
    };

    useEffect(() => {
        window.addEventListener("resize", detectSize);

        return () => {
            window.removeEventListener("resize", detectSize);
        };
    }, [windowDimention]);
    return (
			<Carousel
				centerMode="true"
				autoPlay="true"
				infiniteLoop="true"
				showStatus={false}
				centerSlidePercentage={windowDimention.winWidth <= 1250 ? '100' : '75'}
				showThumbs={false}
			>
				<div className="banner d-flex justify-content-center mt-4">
					<div className="box">
						<div className="row text-start align-items-center">
							<div className="col-5">
								<p>Harga Murah</p>
								<p className="text-start">Banyak diskon!</p>
								<p className="diskon-text">Diskon Hingga</p>
								<p className="diskon-angka">60%</p>
							</div>
							<div className="col-7 bg-light rounded-pill">
								{/* <img src="./images/p1.jpg" alt="" /> */}
								<h4 className="p-3">Ayo Beli!!!</h4>
								{/* <img className="d-none d-sm-block" src="../../assets/img/kado.png" alt="kado" /> */}
							</div>
						</div>
					</div>
				</div>
				<div className="banner d-flex justify-content-center mt-4">
					<div className="box">
						<div className="row text-start align-items-center ">
							<div className="col-5">
								<p>Barang Bervariasi</p>
								<p className="text-start">5 Kategori</p>
								<p className="diskon-text">Pilihan banyak</p>
							</div>
							<div className="col-7 bg-light rounded-pill">
								{/* <img src="./images/p1.jpg" alt="" /> */}
								<h4 className="p-3">Pesan Sekarang!!!</h4>
								{/* <img className="d-none d-sm-block" src="../../assets/img/kado.png" alt="kado" /> */}
							</div>
						</div>
					</div>
				</div>
				<div className="banner d-flex justify-content-center mt-4">
					<div className="box">
						<div className="row text-start align-items-center">
							<div className="col-5">
								<p>Barang masih bagus</p>
								<p className="text-start">Kualitas Terjamin</p>
								<p className="diskon-text">Jika Rusak dapat dikembalikan</p>
							</div>
							<div className="col-7 bg-light rounded-pill">
								{/* <img src="./images/p1.jpg" alt="" /> */}
								<h4 className="p-3">Pilih Barangmu...</h4>
								{/* <img className="d-none d-sm-block" src="../../assets/img/kado.png" alt="kado" /> */}
							</div>
						</div>
					</div>
				</div>
			</Carousel>
		);
};

export default Banner;
