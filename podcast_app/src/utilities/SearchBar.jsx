import React from "react";

/**SearchBar component for filtering items by text input
 * @param {Object} props
 * @param {String} props.value - current search value
 * @param {Function} props.onChange - callback when input changes
 */

export default function SearchBar({value, onChange}) {
	return (
		<input
			id="search"
			className="search"
			placeholder="Search by Title or Genre..."
			value={value}
			onChange={(e) => onChange(e.target.value)}
		/>
	);
}
