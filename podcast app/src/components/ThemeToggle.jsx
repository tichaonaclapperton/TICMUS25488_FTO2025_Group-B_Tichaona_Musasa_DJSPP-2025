import React from "react";
import { useTheme } from "../contexts/ThemeContext";

/**
 * ThemeToggle component that allows users to switch between light and dark themes.
 *
 * @component
 * @returns {JSX.Element} A button element to toggle the theme, displaying the current theme icon.
 */

export default function ThemeToggle() {
	const { theme, toggleTheme } = useTheme();

	return (
		<button onClick={toggleTheme} className="theme-toggle-btn">
			Dark/light mode{theme === "light" ? "☀️" : "🌙"}
		</button>
	);
}
