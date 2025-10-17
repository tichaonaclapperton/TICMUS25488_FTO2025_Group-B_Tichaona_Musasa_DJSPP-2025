import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import ShowDetail from "./pages/ShowPage";
import GlobalPlayer from "./components/GlobalPlayer";
import { AudioProvider } from "./contexts/AudioContext";
import FavoritesPage from "./pages/FavoritesPage";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";

/**
 * Root application component that sets up the main structure, providers, and routing for the Podcast App.
 *
 * @component
 * @returns {JSX.Element} The rendered application with providers, header, navigation, routes, and global player.
 */

export default function App() {
	/**
	 * ThemeProvider supplies the theme context to all child components.
	 * AudioProvider supplies the audio context for global playback controls.
	 * FavoritesProvider supplies the favorites context for managing favorite episodes.
	 */

	return (
		<ThemeProvider>
			<AudioProvider>
				<FavoritesProvider>
					<div className="app-root">
						<header className="app-header">
							<h1>🎙️ Podcast App</h1>
							<ThemeToggle />
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
		</ThemeProvider>
	);
}
