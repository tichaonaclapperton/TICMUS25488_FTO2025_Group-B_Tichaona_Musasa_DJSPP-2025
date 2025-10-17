import React, { useState } from "react";
import { useAudio } from "../contexts/AudioContext";
import useFavorites from "../contexts/FavoritesContext";
import formatDate from "../utilities/Date";
import PlayButton from "./PlayButton";
import "../styling/episodecard.css";

// Define a character limit for the description
const DESCRIPTION_LIMIT = 120;

export default function EpisodeCard({
	episode,
	showTitle,
	showImage,
	hidePlayButton = false,
}) {
	const { playEpisode } = useAudio();
	const { toggleFavorite, isFavorited } = useFavorites();

	// State to track if the description is expanded
	const [isExpanded, setIsExpanded] = useState(false);

	// Check if the description needs a "read more" button
	const needsReadMore = episode.description && episode.description.length > DESCRIPTION_LIMIT;

	// Determine the text to display
	const displayText = needsReadMore && !isExpanded
		? `${episode.description.slice(0, DESCRIPTION_LIMIT)}...`
		: episode.description;

	// Construct a stable unique ID for each episode
	const episodeId = episode.id || `${showTitle}-${episode.title}`;
	const favorited = isFavorited(episodeId);

	const handleFavorite = () => {
		toggleFavorite({
			id: episodeId,
			title: episode.title,
			description: episode.description,
			audio: episode.audio,
			showTitle,
			showImage,
			season: episode.season || episode.seasonNumber || 1,
			number: episode.number || episode.episode || 0,
		});
	};

	return (
		
		<li className="episode-card">
			<div className="episode-content">
				<img
					src={showImage || "/placeholder.jpg"}
					alt="cover"
					className="episode-cover"
				/>

				<div className="episode-info">
					<h4>
						{episode.title}{" "}
						<button
							onClick={handleFavorite}
							className={`fav-btn ${favorited ? "active" : ""}`}
							title={favorited ? "Remove from favourites" : "Add to favourites"}
						>
							{favorited ? "❤️" : "🤍"}
						</button>
					</h4>

					<p className="muted">
						Season {episode.season || 1} • Episode {episode.number || 1}
					</p>

					{episode.description && (
						<p className="description">
							{displayText}
							{needsReadMore && (
								<button 
									className="read-more" 
									onClick={() => setIsExpanded(!isExpanded)}
								>
									{isExpanded ? "Read less" : "Read more"}
								</button>
							)}
						</p>
					)}

					{episode.addedAt && (
						<p className="added-date">Added on {formatDate(episode.addedAt)}</p>
					)}
				</div>
			</div>

			{!hidePlayButton && (
				<PlayButton
					episode={episode}
					showTitle={showTitle}
					showImage={showImage}
				/>
			)}
		</li>
	);
}
