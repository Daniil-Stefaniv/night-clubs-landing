const cookies = () => {
	const cookiesContainer = document.querySelector(".cookies");
	const cookiesSubmit = document.querySelector(".cookies_submit");

	let position = window.innerWidth > 768 ? -20 : -30;

	document.addEventListener("DOMContentLoaded", () => {
		const interval = setInterval(() => {
			position = position + 0.5;
			cookiesContainer.style.bottom = `${position}%`;

			if (position === 0) {
				clearInterval(interval);
			}
		}, 15);
	});

	cookiesSubmit.addEventListener("pointerup", () => {
		const interval = setInterval(() => {
			position = position - 0.5;
			cookiesContainer.style.bottom = `${position}%`;

			if (position === -30) {
				clearInterval(interval);
			}
		}, 15);
	});
};

cookies();
