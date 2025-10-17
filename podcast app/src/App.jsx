import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import ShowDetail from "./pages/ShowPage";
import GlobalPlayer from "./components/GlobalPlayer";
import { AudioProvider } from "./contexts/AudioContext";
import FavoritesPage from "./contexts/FavoritesPage";
import { FavoritesProvider } from "./contexts/FavoritesContext";

/**
 * Root app that provides routes for the Homepage and Show Detail pages.
 */
export default function App() {
	return (
		<AudioProvider>
			<FavoritesProvider>
				<div className="app-root">
					<header className="app-header">
						<h1>🎙️ Podcast App</h1>
						<Link to="/" className="home-link">
							Home
						</Link>
						<Link to="/favorites" className="favs-link">
							❤️ Favourites
						</Link>
					</header>

					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/show/:id" element={<ShowDetail />} />
						<Route path="/favorites" element={<FavoritesPage />} />
					</Routes>
					<GlobalPlayer />
				</div>
			</FavoritesProvider>
		</AudioProvider>
	);
}
