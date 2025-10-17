import React, { useState } from "react";
import EpisodeCard from "../components/EpisodeCard";
import useFavorites from "../contexts/FavoritesContext";
import "../styling/showdetail.css"; 

export default function ShowDetailPage({ data }) {
	const { favourites = [], toggleFavorite } = useFavorites();
	const [selectedSeasonIndex, setSelectedSeasonIndex] = useState(0);

	const seasons = data?.seasons || [];
	const selectedSeason = seasons[selectedSeasonIndex] || { episodes: [] };

	function handleToggleFavourite(episode) {
		toggleFavorite(episode);
	}

	return (
		<main className="show-detail-page">
			{/* --- SHOW HEADER --- */}
			<section className="show-header-card">
				<img src={data.image} alt={data.title} className="show-cover" />

				<div className="show-info">
					<h1 className="show-title">{data.title}</h1>
					<p className="show-description">{data.description}</p>

					<div className="show-meta">
						<div>
							<strong>Genres</strong>
							<div className="genre-tags">
								{data.genres?.map((g, i) => (
									<span key={i} className="genre-tag">
										{g}
									</span>
								))}
							</div>
						</div>
						<div>
							<strong>Last Updated</strong>
							<p>{new Date(data.updated).toLocaleDateString("en-GB")}</p>
						</div>
						<div>
							<strong>Total Seasons</strong>
							<p>{data.seasons?.length || 1}</p>
						</div>
						<div>
							<strong>Total Episodes</strong>
							<p>
								{data.seasons?.reduce(
									(acc, s) => acc + (s.episodes?.length || 0),
									0
								)}
							</p>
						</div>
					</div>
				</div>
			</section>
			{/* --- SEASON DROPDOWN & CURRENT SEASON CARD --- */}
			<section className="season-section-header">
				<h2>Current season</h2>
				{seasons.length > 1 && (
					<select
						className="season-dropdown"
						value={selectedSeasonIndex}
						onChange={(e) => setSelectedSeasonIndex(Number(e.target.value))}
					>
						{seasons.map((s, i) => (
							<option key={i} value={i}>
								{s.title || `Season ${s.number ?? i + 1}`}
							</option>
						))}
					</select>
				)}
			</section>

			{/* --- SEASON CARD --- */}
			<section className="season-card">
				<div className="season-info">
					{selectedSeason.image && (
						<img
							className="season-thumb"
							src={selectedSeason.image}
							alt={selectedSeason.title}
						/>
					)}

					<div>
						<h3 className="season-title">
							{selectedSeason.title ||
								`Season ${selectedSeason.number ?? selectedSeasonIndex + 1}`}
						</h3>

						<p className="season-meta">
							{selectedSeason.episodes?.length || 0} Episodes •{" "}
							{selectedSeason.releaseDate
								? new Date(selectedSeason.releaseDate).toLocaleDateString(
										"en-GB"
								  )
								: "Released"}
						</p>
					</div>
				</div>
			</section>

			{/* --- EPISODE LIST --- */}
			<section className="episodes-section">
				<ul className="episode-list">
					{selectedSeason.episodes.map((ep, i) => (
						<EpisodeCard
							key={ep.id || i}
							episode={{
								...ep,
								audio:
									ep.audio ||
									"https://podcast-api.netlify.app/placeholder-audio.mp3",
							}}
							showTitle={data.title}
							showImage={data.image}
							isFavourite={
								Array.isArray(favourites) &&
								favourites.some((f) => f.id === ep.id)
							}
							onToggleFavourite={handleToggleFavourite}
						/>
					))}
				</ul>
			</section>
		</main>
	);
}
