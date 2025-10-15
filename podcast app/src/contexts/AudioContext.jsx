import React, { createContext, useContext, useRef, useState, useEffect } from "react";

const AudioContext = createContext();

export function AudioProvider({ children }) {
  const audioRef = useRef(new Audio());
  const [current, setCurrent] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  // Load and play new episode
  const playEpisode = (episode) => {
    if (!episode?.audio) return;
    setCurrent(episode);
    const audio = audioRef.current;
    audio.src = episode.audio;
    audio.play();
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

  // Track progress
  useEffect(() => {
    const audio = audioRef.current;
    const updateProgress = () => setProgress(audio.currentTime);
    const setAudioDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", setAudioDuration);
    audio.addEventListener("ended", () => setIsPlaying(false));

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", setAudioDuration);
    };
  }, []);

  return (
    <AudioContext.Provider
      value={{
        current,
        isPlaying,
        progress,
        duration,
        playEpisode,
        togglePlay,
        seek,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export default function useAudio() {
  return useContext(AudioContext);
}
