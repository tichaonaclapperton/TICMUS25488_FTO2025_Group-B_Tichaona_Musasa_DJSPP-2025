import React from "react";
import { useNavigate } from "react-router-dom";

/**
- A component that renders a back button to navigate to the previous page or the root page.
- 
- @component
- @returns {JSX.Element} A button element with an onClick event handler to navigate back.
*/

export default function BackBtn() {
	const navigate = useNavigate();

/**
- Function to handle the back button click event.
- If the history length is greater than 2, navigate to the previous page.
- Otherwise, navigate to the root page.
*/

	const goBack = () => {
		if (window.history.length > 2) navigate(-1);
		else navigate("/");
	};
	return (
		<button onClick={goBack} className="back-btn">
			←
		</button>
	);
}
