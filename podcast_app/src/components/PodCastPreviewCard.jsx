import React from "react";
import { formatDistanceToNowStrict, parseISO } from "date-fns";

/**
 * Reusable podcast preview card.
 * Displays image, title, seasons, genres, and last updated.
 * When clicked, it opens the detail modal (handled in HomePage via onClick).
 */

/**
 * Podcast preview card
 */

export default function PodcastPreviewCard({ podcast, onClick }) {
	const handleKey = (e) => {
		if (e.key === "Enter") onClick();
	};

	return (
		<article
			className="podcast-card"
			role="button"
			tabIndex={0}
			onClick={onClick}
			onKeyDown={handleKey}
		>
			<img src={podcast.image} alt={podcast.title} className="cover" />
			<div className="card-body">
				<h3>{podcast.title}</h3>
				<div className="muted small">{podcast.seasons} seasons</div>
				{podcast.genres?.length > 0 && (
					<div className="genres">
						{" "}
						<strong>Genres: </strong>
						{podcast.genres.map((g, i) => (
							<span key={i} className="tag">
								{g}
							</span>
						))}
					</div>
				)}
				{podcast.updated && (
					<div className="muted small">
						{" "}
						<strong>Last Updated: </strong>
						{formatDistanceToNowStrict(
							typeof podcast.updated === "string"
								? parseISO(podcast.updated)
								: podcast.updated,
							{ addSuffix: true }
						)}
					</div>
				)}
			</div>
		</article>
	);
}
