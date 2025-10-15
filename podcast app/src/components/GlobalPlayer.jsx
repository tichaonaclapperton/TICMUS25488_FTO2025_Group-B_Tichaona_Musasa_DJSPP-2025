import React from "react";
import useAudio from "../contexts/AudioContext";

export default function GlobalPlayer() {
  const { current, isPlaying, progress, duration, togglePlay, seek } = useAudio();

  if (!current) return null; // hide if nothing is playing

  return (
    <div className="global-player">
      <div className="player-info">
        <img src={current.image} alt={current.title} className="player-thumb" />
        <div>
          <h4>{current.title}</h4>
          <p>{current.showTitle}</p>
        </div>
      </div>

      <div className="player-controls">
        <button onClick={togglePlay} className="play-toggle">
          {isPlaying ? "⏸️ Pause" : "▶️ Play"}
        </button>
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={progress}
          onChange={(e) => seek(e.target.value)}
        />
        <span>
          {Math.floor(progress)}s / {Math.floor(duration)}s
        </span>
      </div>
    </div>
  );
}
