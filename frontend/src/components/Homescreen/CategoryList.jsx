import React, { useState } from 'react';
import '../../styles/category.css';


const CategoryList = () => {
	const [filterActive, setFilterActive] = useState({
		activeObject: null,
		objects: [
			{ id: 1, value: 'Semua' },
			{ id: 2, value: 'Hobi' },
			{ id: 3, value: 'Kendaraan' },
			{ id: 4, value: 'Baju' },
			{ id: 5, value: 'Elektronik' },
			{ id: 6, value: 'Kesehatan' },
		],
	});

	function toggleActiveFilter(index) {
		setFilterActive({ ...filterActive, activeObject: filterActive.objects[index] });
		console.log(index);
	}

	function toggleActiveStyle(index) {
		if (filterActive.objects[index] === filterActive.activeObject) {
			return 'filter-text-button filter-active';
		} else {
			return 'filter-text-button filter-inactive';
		}
	}

	return (
		<div className="container mt-5 justify-content-center">
			<p className="find-category-text">Telusuri Kategori</p>
			<div className="row justify-content-center">
				<div className="col-md-3 justify-content-center  d-flex">
					{filterActive.objects.map((elements, index) => {
						return (
							<button
								key={index}
								className={`${toggleActiveStyle(index)} `}
								onClick={() => {
									toggleActiveFilter(index);
								}}
							>
								<i className="bi bi-search filter-icon"></i>
								{elements.value}
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default CategoryList;
