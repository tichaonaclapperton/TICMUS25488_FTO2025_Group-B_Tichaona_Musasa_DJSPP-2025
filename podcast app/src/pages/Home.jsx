import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import SearchBar from "../utilities/SearchBar";
import GenreFilter from "../utilities/GenreFilter";
import Pagination from "../utilities/Pagination";
import SortDropdown from '../utilities/SortDropDown';
import PodcastPreviewCard from '../components/PodCastPreviewCard';
import { genres } from "../genres/genre";

const API_URL = "https://podcast-api.netlify.app/";
const ITEMS_PER_PAGE = 8;

/**
 * Homepage: list of shows with filters, sort and pagination. State is reflected in the URL query string
 * so it can be preserved when navigating to and from the show detail page.
 */
export default function Home() {
	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();

	// Initialise state from query params so the UI matches the URL
	const initialSearch = searchParams.get("q") || "";
	const initialGenre = searchParams.get("genre") || "";
	const initialSort = searchParams.get("sort") || "newest";
	const initialPage = parseInt(searchParams.get("page") || "1", 10);

	const [podcasts, setPodcasts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const [searchTerm, setSearchTerm] = useState(initialSearch);
	const [selectedGenre, setSelectedGenre] = useState(initialGenre);
	const [sortOrder, setSortOrder] = useState(initialSort);
	const [page, setPage] = useState(initialPage);

	// keep query string in sync with state
	useEffect(() => {
		const params = {};
		if (searchTerm) params.q = searchTerm;
		if (selectedGenre) params.genre = selectedGenre;
		if (sortOrder && sortOrder !== "newest") params.sort = sortOrder;
		if (page && page > 1) params.page = String(page);
		setSearchParams(params);
	}, [searchTerm, selectedGenre, sortOrder, page, setSearchParams]);

	useEffect(() => {
		let cancelled = false;
		setLoading(true);
		setError(null);
		fetch(API_URL)
			.then((r) => {
				if (!r.ok) throw new Error(`API error ${r.status}`);
				return r.json();
			})
			.then((data) => {
				if (cancelled) return;
				// normalize similar to your previous implementation
				const normalized = (Array.isArray(data) ? data : data.shows || []).map(
					(p) => ({
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
						updated:
							p.updated ??
							p.lastUpdated ??
							p.modified ??
							p.publishedAt ??
							p.pubDate ??
							null,
						description: p.description ?? p.summary ?? "",
					})
				);
				setPodcasts(normalized);
			})
			.catch((err) => {
				if (cancelled) return;
				setError(err.message || "Failed to fetch");
			})
			.finally(() => !cancelled && setLoading(false));

		return () => {
			cancelled = true;
		};
	}, []);

	const filtered = useMemo(() => {
		const q = searchTerm.trim().toLowerCase();
		return podcasts.filter((p) => {
			const matchesQ =
				!q ||
				p.title.toLowerCase().includes(q) ||
				p.genres.some((g) => g.toLowerCase().includes(q));
			const matchesGenre = !selectedGenre || p.genres.includes(selectedGenre);
			return matchesQ && matchesGenre;
		});
	}, [podcasts, searchTerm, selectedGenre]);

	const sorted = useMemo(() => {
		return [...filtered].sort((a, b) => {
			if (sortOrder === "newest")
				return new Date(b.updated || 0) - new Date(a.updated || 0);
			if (sortOrder === "az") return a.title.localeCompare(b.title);
			if (sortOrder === "za") return b.title.localeCompare(a.title);
			return 0;
		});
	}, [filtered, sortOrder]);

	const totalPages = Math.max(1, Math.ceil(sorted.length / ITEMS_PER_PAGE));
	useEffect(() => {
		if (page > totalPages) setPage(1);
	}, [totalPages]);

	const paginated = useMemo(() => {
		const start = (page - 1) * ITEMS_PER_PAGE;
		return sorted.slice(start, start + ITEMS_PER_PAGE);
	}, [sorted, page]);

	const goToShow = (id) => {
		// preserve the current querystring when navigating to detail
		navigate({ pathname: `/show/${id}`, search: window.location.search });
	};

	return (
		<main className="container">
			<section className="controls">
				<SearchBar value={searchTerm} onChange={setSearchTerm} />
				<div className="controls-right">
					<SortDropdown value={sortOrder} onChange={setSortOrder} />
					<GenreFilter value={selectedGenre} onChange={setSelectedGenre} />
				</div>
			</section>

			<section className="content">
				{loading && <Loading message="Loading shows..." />}
				{error && <ErrorMessage message={error} />}
				{!loading && !error && paginated.length === 0 && (
					<div className="empty">No shows found.</div>
				)}

				{!loading && !error && paginated.length > 0 && (
					<div className="grid">
						{paginated.map((p) => (
							<PodcastPreviewCard
								key={p.id}
								podcast={p}
								onClick={() => goToShow(p.id)}
							/>
						))}
					</div>
				)}
			</section>

			<Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
		</main>
	);
}
