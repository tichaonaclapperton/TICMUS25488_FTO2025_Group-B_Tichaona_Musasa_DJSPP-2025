import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import ShowDetailPage from "./ShowDetailPage";

const API = "https://podcast-api.netlify.app/id/";

export default function ShowDetail() {
	const { id } = useParams();

	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// ❤️ Favourites

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

	if (loading) return <Loading message="Loading show..." />;
	if (error) return <ErrorMessage message={error} />;
	if (!data) return <div className="empty">Show not found.</div>;

	return (
		<main>
			<ShowDetailPage data={data} />
		</main>
	);
}
