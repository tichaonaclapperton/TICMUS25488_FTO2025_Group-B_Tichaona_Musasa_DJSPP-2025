import React from "react";

/**
 * A component for displaying error messages.
 *
 * @component
 * @param {Object} props
 * @param {string} [props.message="An unknown error occurred"] - The error message to display.
 * @returns {JSX.Element} An error message component.
 */

export default function ErrorMessage({
	message = "An unknown error occurred",
}) {
	return (
		<div className="error" role="alert">
			<strong>Error:</strong> {message}
		</div>
	);
}
