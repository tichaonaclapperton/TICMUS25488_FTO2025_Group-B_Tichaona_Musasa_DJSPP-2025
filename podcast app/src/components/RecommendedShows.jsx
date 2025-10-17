import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PodcastPreviewCard from "./PodCastPreviewCard";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import { genres } from "../genres/genre";
import "../styling/RecommendedShows.css";

/**
 * RecommendedShows component that fetches and displays a carousel of recommended podcast shows
 * based on the user's favorite genres. It handles loading, error, and empty states.
 *
 * @component
 * @returns {JSX.Element|null} A section displaying recommended shows, or null if no recommendations.
 */

const API_URL = "https://podcast-api.netlify.app/";

export default function RecommendedShows() {
	const [recommended, setRecommended] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const navigate = useNavigate();
	const location = useLocation();
	const scrollRef = useRef(null);

	useEffect(() => {
		let cancelled = false;
		setLoading(true);

		const favoriteShows = JSON.parse(localStorage.getItem("favorites") || "[]");
		const favoriteGenres = favoriteShows.flatMap((show) => show.genres || []);

		fetch(API_URL)
			.then((r) => {
				if (!r.ok) throw new Error("Failed to fetch recommended shows");
				return r.json();
			})
			.then((data) => {
				if (cancelled) return;

				let shows = Array.isArray(data) ? data : data.shows || [];

				shows = shows.sort((a, b) => {
					const aFav = a.genres?.some((id) => favoriteGenres.includes(id))
						? 1
						: 0;
					const bFav = b.genres?.some((id) => favoriteGenres.includes(id))
						? 1
						: 0;
					if (bFav !== aFav) return bFav - aFav;
					return new Date(b.updated || 0) - new Date(a.updated || 0);
				});

				const selected = shows.slice(0, 10).map((p) => ({
					id: (p.id ?? p.showId ?? Math.random()).toString(),
					title: p.title ?? p.name ?? "Untitled",
					image: p.image ?? p.cover ?? p.artwork ?? "",
					seasons: typeof p.seasons === "number" ? p.seasons : 0,
					genres:
						Array.isArray(p.genres) && p.genres.length
							? p.genres.map(
									(id) =>
										genres.find((g) => g.id === id)?.title || `Genre ${id}`
							  )
							: [],
					updated: p.updated ?? p.lastUpdated ?? p.publishedAt ?? null,
					description: p.description ?? p.summary ?? "",
				}));

				setRecommended(selected);
			})
			.catch((err) => setError(err.message))
			.finally(() => !cancelled && setLoading(false));

		return () => {
			cancelled = true;
		};
	}, []);

	const goToShow = (id) => {
		navigate({
			pathname: `/show/${id}`,
			search: location.search,
		});
	};

	const scroll = (direction) => {
		if (!scrollRef.current) return;
		const scrollAmount = 300; // pixels to scroll per click
		scrollRef.current.scrollBy({
			left: direction === "left" ? -scrollAmount : scrollAmount,
			behavior: "smooth",
		});
	};

	if (loading) return <Loading message="Loading recommendations..." />;
	if (error) return <ErrorMessage message={error} />;
	if (!recommended.length) return null;

	return (
		<section className="recommended-section">
			<h2 className="recommended-title">🔥 Recommended For You</h2>

			<div className="carousel-wrapper">
				<button
					className="scroll-btn left"
					onClick={() => scroll("left")}
					aria-label="Scroll left"
				>
					‹
				</button>

				<div className="recommended-carousel" ref={scrollRef}>
					{recommended.map((show) => (
						<div
							key={show.id}
							className="recommended-item"
							onClick={() => goToShow(show.id)}
						>
							<PodcastPreviewCard podcast={show} />
						</div>
					))}
				</div>

				<button
					className="scroll-btn right"
					onClick={() => scroll("right")}
					aria-label="Scroll right"
				>
					›
				</button>
			</div>
		</section>
	);
}
