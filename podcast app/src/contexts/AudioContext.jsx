import React, {
	createContext,
	useContext,
	useRef,
	useState,
	useEffect,
} from "react";

export const AudioContext = createContext();

export function AudioProvider({ children }) {
	const audioRef = useRef(new Audio());
	const [current, setCurrent] = useState(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [progress, setProgress] = useState(0);
	const [duration, setDuration] = useState(0);

	const playEpisode = (episode) => {
		if (!episode?.audio) return;
		setCurrent(episode);
		const audio = audioRef.current;
		audio.src = episode.audio;
		audio
			.play()
			.catch((error) => console.error("Audio playback failed:", error));
		setIsPlaying(true);
	};

	const togglePlay = () => {
		const audio = audioRef.current;
		if (!audio.src) return;
		if (audio.paused) {
			audio.play();
			setIsPlaying(true);
		} else {
			audio.pause();
			setIsPlaying(false);
		}
	};

	const seek = (value) => {
		const audio = audioRef.current;
		audio.currentTime = value;
	};

	useEffect(() => {
		const audio = audioRef.current;
		const updateProgress = () => setProgress(audio.currentTime);
		const setAudioDuration = () => setDuration(audio.duration);
		const onEnded = () => setIsPlaying(false);

		audio.addEventListener("timeupdate", updateProgress);
		audio.addEventListener("loadedmetadata", setAudioDuration);
		audio.addEventListener("ended", onEnded);

		return () => {
			audio.removeEventListener("timeupdate", updateProgress);
			audio.removeEventListener("loadedmetadata", setAudioDuration);
			audio.removeEventListener("ended", onEnded);
		};
	}, []);

	const value = {
		current,
		isPlaying,
		progress,
		duration,
		playEpisode,
		togglePlay,
		seek,
	};

	return (
		<AudioContext.Provider value={value}>{children}</AudioContext.Provider>
	);
}

export const useAudio = () => {
	return useContext(AudioContext);
};
