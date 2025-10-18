import React from "react";

/**
 * Pagination component that displays navigation buttons for previous and next pages.
 *
 * @param {object} props - Component props
 * @param {number} props.page - The current page number
 * @param {number} props.totalPages - The total number of pages
 * @param {function} props.onPageChange - Callback function to handle page changes
 * @returns {JSX.Element|null} The pagination component or null if there's only one page
 */


export default function Pagination({ page, totalPages, onPageChange }) {
	if (totalPages <= 1) return null;
	return (
		<nav className="navigation" aria-label="navigation">
			<button disabled={page === 1} onClick={() => onPageChange(page - 1)}>
				Prev
			</button>
			<span>Page{page}/{totalPages}</span>
			<button disabled={page ===totalPages} onClick={()=> onPageChange(page + 1)}>
				Next
			</button>
		</nav>
	);
}
