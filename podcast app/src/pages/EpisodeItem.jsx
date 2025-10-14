import React, { useState } from "react";

export default function EpisodeItem({ episode, seasonNumber }) {
	const [expanded, setExpanded] = useState(false);
	const limit = 160;
	const text = episode.description || "";

	const displayText =
		text.length > limit && !expanded ? text.slice(0, limit) + "..." : text;

	return (
		<li className="episode-item">
			<div className="episode-index">{seasonNumber}</div>
			<div className="episode-content">
				<strong>{episode.title}</strong>
				<p>
					{displayText}
					{""}
					{text.length >
						limit &&(
							<button
								className="read-more"
								onClick={() => setExpanded((prev) => !prev)}
							>
								{expanded ? "Read less" : "Read more"}
							</button>
						)}
				</p>
			</div>
		</li>
	);
}
