const slider = () => {
	const domContentLoadedHandler = () => {
		const leftBtn = document.querySelector("#left-btn");
		const rightBtn = document.querySelector("#right-btn");
		const slidesList = document.querySelectorAll(".slider-slide");
		const paginationContainer = document.querySelector(
			".pagination-container"
		);
		const slidesContainer = document.querySelector(
			".sider_slides-container"
		);

		slidesList.forEach((slide) => slide.remove());
		slidesContainer.appendChild(slidesList[0]);

		const leftStep = "-105%";
		const rightStep = "105%";

		let ableToShift = true;
		let currentSlideNumber = 0;
		let previousSlideNumber = slidesList.length - 1;
		let nextSlideNumber = 1;

		const createPaginationItem = (elementId) => {
			const paginationItem = document.createElement("li");
			paginationItem.classList.add(["pagination_item"]);
			paginationItem.id = elementId;
			return paginationItem;
		};

		slidesList.forEach((slide, id) => {
			const createdItem = createPaginationItem(`${id}`);
			id === 0
				? createdItem.classList.add("pagination_item--selected")
				: {};
			paginationContainer.appendChild(createdItem);
		});

		const paginationItemsList =
			document.querySelectorAll(".pagination_item");

		const paginationHandler = (e) => {
			if (ableToShift) {
				ableToShift = false;

				const itemId = parseInt(e.target.id);

				if (currentSlideNumber > itemId) {
					const previousSlide = slidesList[itemId];
					previousSlide.style.left = rightStep;

					slidesContainer.appendChild(previousSlide);

					let shiftStep = -105;
					let currentSlideShiftStep = 0;

					const shiftInterval = setInterval(() => {
						shiftStep += 1;
						currentSlideShiftStep += 1;

						slidesList[itemId].style.left = `${shiftStep}%`;
						slidesList[
							currentSlideNumber
						].style.left = `${currentSlideShiftStep}%`;

						if (slidesList[itemId].style.left === "0%") {
							clearInterval(shiftInterval);
							slidesList[currentSlideNumber].remove();

							paginationItemsList[
								currentSlideNumber
							].classList.remove("pagination_item--selected");

							e.target.classList.add("pagination_item--selected");

							if (itemId < slidesList.length - 1) {
								nextSlideNumber = itemId + 1;
								currentSlideNumber = itemId;
								previousSlideNumber = itemId - 1;
							} else if (itemId === slidesList.length - 1) {
								nextSlideNumber = itemId + 1;
								currentSlideNumber = itemId;
								previousSlideNumber = slidesList.length - 1;
							}
						}
					}, 3);
				} else if (currentSlideNumber < itemId) {
					const nextSlide = slidesList[itemId];
					nextSlide.style.left = rightStep;

					slidesContainer.appendChild(nextSlide);

					let shiftStep = 105;
					let currentSlideShiftStep = 0;

					const shiftInterval = setInterval(() => {
						shiftStep -= 1;
						currentSlideShiftStep -= 1;

						slidesList[itemId].style.left = `${shiftStep}%`;
						slidesList[
							currentSlideNumber
						].style.left = `${currentSlideShiftStep}%`;

						if (slidesList[itemId].style.left === "0%") {
							clearInterval(shiftInterval);
							slidesList[currentSlideNumber].remove();

							paginationItemsList[
								currentSlideNumber
							].classList.remove("pagination_item--selected");

							e.target.classList.add("pagination_item--selected");

							if (itemId > 0) {
								nextSlideNumber = itemId + 1;
								currentSlideNumber = itemId;
								previousSlideNumber = itemId - 1;
							} else if (itemId === 0) {
								nextSlideNumber = itemId + 1;
								currentSlideNumber = itemId;
								previousSlideNumber = slidesList.length - 1;
							}
						}
					}, 3);
				}

				ableToShift = true;
			}
		};

		const rightSideSwipe = () => {
			if (ableToShift) {
				ableToShift = false;

				const nextSlide = slidesList[nextSlideNumber];
				nextSlide.style.left = rightStep;
				slidesContainer.appendChild(nextSlide);

				let shiftStep = 105;
				let currentSlideShiftStep = 0;

				const shiftInterval = setInterval(() => {
					shiftStep -= 1;
					currentSlideShiftStep -= 1;

					slidesList[nextSlideNumber].style.left = `${shiftStep}%`;
					slidesList[
						currentSlideNumber
					].style.left = `${currentSlideShiftStep}%`;

					if (slidesList[nextSlideNumber].style.left === "0%") {
						clearInterval(shiftInterval);

						slidesList[currentSlideNumber].remove();

						paginationItemsList[
							currentSlideNumber
						].classList.remove("pagination_item--selected");

						paginationItemsList[nextSlideNumber].classList.add(
							"pagination_item--selected"
						);

						if (nextSlideNumber < slidesList.length - 1) {
							previousSlideNumber = currentSlideNumber;
							currentSlideNumber = nextSlideNumber;
							nextSlideNumber = nextSlideNumber + 1;
						} else if (nextSlideNumber === slidesList.length - 1) {
							previousSlideNumber = currentSlideNumber;
							currentSlideNumber = nextSlideNumber;
							nextSlideNumber = 0;
						}

						ableToShift = true;
					}
				}, 3);
			}
		};

		const leftSideSwipe = () => {
			if (ableToShift) {
				ableToShift = false;

				const previousSlide = slidesList[previousSlideNumber];
				previousSlide.style.left = leftStep;
				slidesContainer.appendChild(previousSlide);

				let shiftStep = -105;
				let currentSlideShiftStep = 0;

				const shiftInterval = setInterval(() => {
					shiftStep += 1;
					currentSlideShiftStep += 1;
					slidesList[
						previousSlideNumber
					].style.left = `${shiftStep}%`;
					slidesList[
						currentSlideNumber
					].style.left = `${currentSlideShiftStep}%`;

					if (slidesList[previousSlideNumber].style.left === "0%") {
						clearInterval(shiftInterval);

						paginationItemsList[
							currentSlideNumber
						].classList.remove("pagination_item--selected");

						paginationItemsList[previousSlideNumber].classList.add(
							"pagination_item--selected"
						);

						if (previousSlideNumber > 0) {
							nextSlideNumber = currentSlideNumber;
							currentSlideNumber = previousSlideNumber;
							previousSlideNumber = previousSlideNumber - 1;
						} else if (previousSlideNumber === 0) {
							nextSlideNumber = currentSlideNumber;
							currentSlideNumber = previousSlideNumber;
							previousSlideNumber = slidesList.length - 1;
						}

						ableToShift = true;
					}
				}, 3);
			}
		};

		leftBtn.addEventListener("pointerup", leftSideSwipe);
		rightBtn.addEventListener("pointerup", rightSideSwipe);

		paginationItemsList.forEach((item) => {
			item.addEventListener("pointerup", paginationHandler);
		});
	};

	document.addEventListener("DOMContentLoaded", domContentLoadedHandler);
};

slider();
