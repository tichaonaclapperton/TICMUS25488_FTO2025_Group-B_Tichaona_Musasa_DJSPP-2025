import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import SeasonNavigation from "../components/SeasonNavigation";
import formatDate from "../utilities/Date";

const API = "https://podcast-api.netlify.app/id/";

export default function ShowDetail() {
	const { id } = useParams();
	const navigate = useNavigate();

	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!id) return;
		let cancelled = false;

		async function fetchData() {
			setLoading(true);
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
		// Navigate back or to home if no previous history
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

			<SeasonNavigation seasons={seasons} />
		</main>
	);
}
