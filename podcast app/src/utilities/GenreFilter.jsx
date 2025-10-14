import React from "react";
import { genres } from "../genres/genre";

/**
 * A dropdown filter for selecting a genre.
 *
 * @component
 * @param {Object} props
 * @param {string} props.value - The currently selected genre.
 * @param {Function} props.onChange - Callback fired when the genre selection changes.
 * @returns {JSX.Element} A genre filter dropdown component.
 */


export default function GenreFilter({ value, onChange }) {
	return (
		<label>
            Genres:
			<select value={value} onChange={(e) => onChange(e.target.value)}>
				<option value="">All Genres</option>
				{genres.map((g) => (
					<option key={g.id} value={g.title}>
						{g.title}
					</option>
				))}
			</select>
		</label>
	);
}
