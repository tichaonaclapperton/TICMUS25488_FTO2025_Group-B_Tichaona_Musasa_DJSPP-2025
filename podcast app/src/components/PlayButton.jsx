import React from "react";
import useAudio from "../contexts/AudioContext";

export default function PlayButton({ episode, showTitle, showImage }) {
  const { current, playEpisode, isPlaying, togglePlay } = useAudio();

  const isActive = current?.title === episode.title;

  return (
    <button
      className={`play-btn ${isActive ? "active" : ""}`}
      onClick={() =>
        isActive
          ? togglePlay()
          : playEpisode({
              title: episode.title,
              audio: "https://podcast-api.netlify.app/placeholder-audio.mp3",
              showTitle,
              image: episode.image || showImage,
            })
      }
    >
      {isActive && isPlaying ? "⏸️ Pause" : "▶️ Play"}
    </button>
  );
}
