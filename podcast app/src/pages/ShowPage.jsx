import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import ShowDetailPage from "./ShowDetailPage";

const API = "https://podcast-api.netlify.app/id/";

export default function ShowDetail() {
	const { id } = useParams();
	const navigate = useNavigate();

	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const goBack = () => {
		if (window.history.length > 2) navigate(-1);
		else navigate("/");
	};

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

	<button onClick={goBack} className="back-btn">
		← Back
	</button>;

	if (loading) return <Loading message="Loading show..." />;
	if (error) return <ErrorMessage message={error} />;
	if (!data) return <div className="empty">Show not found.</div>;

	return (
		<main>
			<button onClick={goBack} className="back-btn">
				← Back
			</button>
			<ShowDetailPage data={data} /> 
		</main>
	);
}
