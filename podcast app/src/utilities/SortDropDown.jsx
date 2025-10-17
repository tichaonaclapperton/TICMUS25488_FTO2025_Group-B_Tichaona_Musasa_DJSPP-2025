import React from "react";

/**
 * a dropDown for sorting podcasts by date or time
 * @components
 * @param {Objects} props
 * @param {'newest'| 'AZ'| 'ZA'} props.value - The selected sort order
 * @param {Function} props.onChange - Callback fires when sort order changes
 * @returns {JSX.Element} A sort dropdown component.
 */

export default function SortDropDown({ value, onChange }) {
	return (
		<label>
			Sort by:
			<select value={value} onChange={(e) => onChange(e.target.value)}>
				<option value="newest">Newest First</option>
				<option value="az">A-Z</option>
				<option value="za">Z-A</option>
			</select>
		</label>
	);
}
