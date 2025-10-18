/**
 * Displays a loading indicator with a customizable message.
 *
 * @param {Object} props
 * @param {string} [props.message='Loading...'] - The message to display next to the loading spinner.
 * @returns {JSX.Element} The loading indicator component.
 */

import React from "react";

export default function Loading({ message = "Loading..." }) {
	return (
		<div className="loading" role="status" aria-live="polite">
			<div className="spinner"></div>
			<div className="loadintText">{message}</div>
		</div>
	);
}
