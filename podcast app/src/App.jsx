import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import ShowDetail from "./pages/ShowPage";
import GlobalPlayer from "../src/components/GlobalPlayer";
import { AudioProvider } from "../src/contexts/AudioContext";

/**
 * Root app that provides routes for the Homepage and Show Detail pages.
 */
export default function App() {
	return (
		<AudioProvider>
			<div className="app-root">
				<header className="app-header">
					<Link to="/" className="brand">
						🎙️ Podcast App
					</Link>
				</header>

				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/show/:id" element={<ShowDetail />} />
				</Routes>
				<GlobalPlayer />
			</div>
		</AudioProvider>
	);
}
