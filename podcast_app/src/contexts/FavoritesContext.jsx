import React, { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
	const [favorites, setFavorites] = useState([]);

	// Load from localStorage
	useEffect(() => {
		const saved = localStorage.getItem("favorites");
		if (saved) setFavorites(JSON.parse(saved));
	}, []);

	// Save to localStorage whenever favourites change
	useEffect(() => {
		localStorage.setItem("favorites", JSON.stringify(favorites));
	}, [favorites]);

	const addFavorite = (episode) => {
		if (!episode?.id) return;
		setFavorites((prev) => [
			...prev,
			{ ...episode, addedAt: new Date().toISOString() },
		]);
	};

	const removeFavorite = (id) => {
		setFavorites((prev) => prev.filter((f) => f.id !== id));
	};

	const toggleFavorite = (episode) => {
		const exists = favorites.some((f) => f.id === episode.id);
		exists ? removeFavorite(episode.id) : addFavorite(episode);
	};

	const isFavorited = (id) => favorites.some((f) => f.id === id);

	return (
		<FavoritesContext.Provider
			value={{
				favorites,
				addFavorite,
				removeFavorite,
				toggleFavorite,
				isFavorited,
			}}
		>
			{children}
		</FavoritesContext.Provider>
	);
}

export default function useFavorites() {
	return useContext(FavoritesContext);
}
