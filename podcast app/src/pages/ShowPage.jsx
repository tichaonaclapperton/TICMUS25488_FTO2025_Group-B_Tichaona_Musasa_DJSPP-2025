import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import SeasonNavigation from "../components/SeasonNavigation";
import formatDate from "../utilities/Date";
import {useAudio} from "../contexts/AudioContext";

const API = "https://podcast-api.netlify.app/id/";

export default function ShowDetail() {
	const { id } = useParams();
	const navigate = useNavigate();

	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const { playEpisode } = useAudio() || [];
	const [openSeasonIndex, setOpenSeasonIndex] = useState(null);

	useEffect(() => {
		if (!id) return;
		let cancelled = false;

		async function fetchData() {
			setLoading(true);
			setError(null);
			setError(null);
			try {
				const res = await fetch(`${API}${id}`);
				if (!res.ok) throw new Error(`API error ${res.status}`);
				const json = await res.json();
				if (!cancelled) setData(json);
			} catch (err) {
				if (!cancelled) setError(err.message || "Failed to fetch show");
			} finally {
				if (!cancelled) setLoading(false);
			}
		}

		fetchData();
		return () => {
			cancelled = true;
		};
	}, [id]);

	const goBack = () => {
		if (window.history.length > 2) navigate(-1);
		else navigate("/");
	};

	if (loading) return <Loading message="Loading show..." />;
	if (error) return <ErrorMessage message={error} />;
	if (!data) return <div className="empty">Show not found.</div>;

	const seasons = Array.isArray(data.seasons) ? data.seasons : [];

	return (
		<main className="detail-page">
			<header className="show-header-card">
				<button className="back-btn" onClick={goBack}>
					←
				</button>

				<div className="show-card">
					<img
						className="show-cover"
						src={data.image || "/placeholder.jpg"}
						alt={data.title}
					/>

					<div className="show-info">
						<h1>{data.title}</h1>
						<p className="show-desc">{data.description}</p>

						<div className="show-meta">
							<div>
								<strong>Genres</strong>
								<div className="genres">
									{data.genres
										?.filter((g) => g && g !== "All" && g !== "Featured")
										.map((g, i) => (
											<span key={i} className="tag">
												{g.title || g}
											</span>
										))}
								</div>
							</div>

							<div>
								<strong>Last Updated</strong>
								<p>{formatDate(data.updated || data.lastUpdated)}</p>
							</div>

							<div>
								<strong>Total Seasons</strong>
								<p>{seasons.length}</p>
							</div>

							<div>
								<strong>Total Episodes</strong>
								<p>
									{seasons.reduce(
										(sum, s) => sum + (s.episodes?.length || 0),
										0
									)}
								</p>
							</div>
						</div>
					</div>
				</div>
			</header>
			<section className="season-section">
				<h2>Seasons</h2>
				{seasons.length === 0 && <p>No seasons available.</p>}

				<ul className="season-list">
					{seasons.map((season, idx) => {
						const episodes = Array.isArray(season.episodes)
							? season.episodes
							: [];
						const isOpen = openSeasonIndex === idx;

						return (
							<li key={idx} className="season-item">
								<button
									className="season-toggle"
									onClick={() => setOpenSeasonIndex(isOpen ? null : idx)}
								>
									<div>
										<strong>
											{season.title || `Season ${season.number ?? idx + 1}`}
										</strong>
										<div className="muted">{episodes.length} episodes</div>
									</div>
									<div className="chev">{isOpen ? "▾" : "▸"}</div>
								</button>

								{isOpen && (
									<ol className="episode-list">
										{episodes.map((ep, i) => (
											<li key={i} className="episode">
												<div className="episode-meta">
													<div className="ep-number">{ep.number ?? i + 1}</div>
													<div className="ep-title">{ep.title || ep.name}</div>
												</div>

												<div className="ep-body">
													{ep.image && (
														<img
															src={ep.image}
															alt={ep.title}
															className="ep-thumb"
														/>
													)}

													<p className="ep-desc">
														{(ep.description || ep.summary || "").slice(0, 160)}
														...
													</p>

													{/* ✅ Always use the placeholder API audio */}
													<button
														className="play-btn"
														onClick={() =>
															playEpisode({
																title: ep.title,
																audio:
																	"https://podcast-api.netlify.app/placeholder-audio.mp3",
																showTitle: data.title,
																image: ep.image || data.image,
															})
														}
													>
														▶️ Play
													</button>
												</div>
											</li>
										))}
									</ol>
								)}
							</li>
						);
					})}
				</ul>
			</section>
		</main>
	);
}
