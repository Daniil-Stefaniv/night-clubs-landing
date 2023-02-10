const formSending = () => {
	const form = document.querySelector(".feedback_form");

	const submitForm = (e) => {
		e.preventDefault();

		const formInputs = document.querySelectorAll(".input-text");
		const normalBorder = "1px solid #5C5C5C";
		const errorBorder = "2px solid #FF0000";
		const errList = [];

		formInputs.forEach((input) => {
			if (input.value === "") {
				errList.push("err");
				input.style.border = errorBorder;
			} else {
				input.style.border = normalBorder;
			}
		});

		console.log(errList);

		if (errList.length === 0) {
			const formData = {};

			formInputs.forEach((input) => {
				formData[`${input.placeholder}`] = input.value;
				input.value = "";
			});

			const dataToSend = JSON.stringify(formData);
		}
	};

	form.addEventListener("submit", submitForm);
};

formSending();
