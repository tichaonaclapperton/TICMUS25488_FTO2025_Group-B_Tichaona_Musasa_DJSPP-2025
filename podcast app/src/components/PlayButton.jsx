import React from "react";
import { useAudio } from "../contexts/AudioContext";

/**
- PlayButton component that plays or pauses an episode using the AudioContext.
- 
- @component
- @param {Object} props
- @param {Object} props.episode - The episode object to play.
- @param {string} props.episode.title - The title of the episode.
- @param {string} props.episode.audio - The audio URL of the episode.
- @param {string} props.episode.image - The image URL of the episode.
- @param {string} props.showTitle - The title of the show.
- @param {string} props.showImage - The image URL of the show.
- @returns {JSX.Element|null} A button element to play or pause the episode, or null if no episode is provided.
*/

export default function PlayButton({ episode, showTitle, showImage }) {
	const { current, playEpisode, isPlaying, togglePlay } = useAudio();

	if (!episode) return null;

	const isActive = current?.title === episode.title;

	/**
- Handles the play button click event.
- If the episode is active, toggles play/pause.
- Otherwise, plays the episode using the AudioContext.
*/

	const handlePlay = () => {
		if (!episode) return;

		if (isActive) {
			togglePlay();
		} else {
			playEpisode({
				title: episode.title,
				audio:
					episode.audio ||
					"https://podcast-api.netlify.app/placeholder-audio.mp3",
				showTitle: showTitle || "Unknown Show",
				image: episode.image || showImage || "/placeholder.jpg",
			});
		}
	};

	return (
		<button
			className={`play-btn ${isActive ? "active" : ""}`}
			onClick={handlePlay}
		>
			{isActive && isPlaying ? "⏸️ Pause" : "▶️ Play"}
		</button>
	);
}
