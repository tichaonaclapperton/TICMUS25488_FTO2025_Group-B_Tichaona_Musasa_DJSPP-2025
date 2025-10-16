import React from "react";
import { useAudio } from "../contexts/AudioContext";
import '../styling/GlobalPlayer.css'

export default function GlobalPlayer() {
	const { current, isPlaying, progress, duration, togglePlay, seek } =
		useAudio() || [];

	if (!current) return null; 

	const formatTime = (seconds) => {
		if (isNaN(seconds)) return "0:00";
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = Math.floor(seconds % 60);
		const paddedSeconds = String(remainingSeconds).padStart(2, "0");
		return `${minutes}:${paddedSeconds}`;
	};

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
					{formatTime(progress)} / {formatTime(duration)}
				</span>
			</div>
		</div>
	);
}

