import React from "react";
import { useAudio } from "../contexts/AudioContext";

export default function PlayButton({ episode, showTitle, showImage }) {
  const { current, playEpisode, isPlaying, togglePlay } = useAudio();

  // 🚧 Guard clause: if no episode is provided, don't render button
  if (!episode) return null;

  const isActive = current?.title === episode.title;

  const handlePlay = () => {
    if (!episode) return;

    // If currently playing the same episode, toggle play/pause
    if (isActive) {
      togglePlay();
    } else {
      playEpisode({
        title: episode.title,
        audio: episode.audio || "https://podcast-api.netlify.app/placeholder-audio.mp3",
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
