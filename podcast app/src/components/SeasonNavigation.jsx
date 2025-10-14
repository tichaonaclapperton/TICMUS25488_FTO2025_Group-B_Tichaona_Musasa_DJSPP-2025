import React,{useState} from "react";
import EpisodeItem from '../pages/EpisodeItem';

/**
 * A component for navigating through seasons and episodes of a show.
 *
 * @component
 * @param {Object} props
 * @param {Array} props.seasons - An array of season objects.
 * @param {Object} props.selectedSeason - The currently selected season object.
 * @param {Function} props.onSeasonChange - Callback fired when the season selection changes.
 * @param {string} props.showImage - The image URL for the show.
 * @returns {JSX.Element} A season navigation component.
 */

export default function SeasonNavigation({ seasons = [] }) {
	const [selectedSeasonIndex, setSelectedSeasonIndex] = useState(0);
	const selectedSeason = seasons[selectedSeasonIndex] || { episodes: [] };

	return (
		<section className="current-session">
			<div className="season-header">
				<h2>Current season</h2>
				<select
					className="season-select"
					value={selectedSeasonIndex}
					onChange={(e) => setSelectedSeasonIndex(Number(e.target.value))}
				>
					{seasons.map((s, i) => (
						<option key={i} value={i}>
							{s.title || `Season ${s.number ?? i + 1}`}
						</option>
					))}
				</select>
			</div>

			<div className="season-card">
				<div className="season-infor">
					{selectedSeason.image && (
						<img
							className="season-thumb"
							src={selectedSeason.image}
							alt={selectedSeason.title}
						/>
					)}
					<div>
						<h3>
							{selectedSeason.title ||
								`Season ${selectedSeason.number ?? selectedSeasonIndex + 1}`}
						</h3>
						<p>{selectedSeason.description}</p>
						<div className="muted">
							{selectedSeason.episodes?.length || 0} Episodes •{" "}
							{selectedSeason.releaseDate
								? formatDate(selectedSeason.releaseDate)
								: "Released"}
						</div>
					</div>
				</div>

				<ul className="episode-list">
					{selectedSeason.episodes?.map((ep) => (
						<EpisodeItem
							key={ep.id || ep.title}
							episode={ep}
							seasonNumber={selectedSeasonIndex + 1}
						/>
					))}
				</ul>
			</div>
		</section>
	);
}
