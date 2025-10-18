import React, { createContext, useState, useContext, useEffect } from "react";

// Create the Context
const ThemeContext = createContext();

/**
 * Custom hook to consume the ThemeContext.
 *
 * @returns {Object} The theme context value containing the current theme and toggle function.
 */

export const useTheme = () => {
	return useContext(ThemeContext);
};

/**
 * ThemeProvider component that supplies the theme context to its children.
 *
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - The child components to receive the theme context.
 * @returns {JSX.Element} A ThemeContext.Provider wrapping the children with the theme context value.
 */

export const ThemeProvider = ({ children }) => {
	// Use a function to set the initial state from local storage
	const [theme, setTheme] = useState(() => {
		return localStorage.getItem("theme") || "light";
	});

	// Toggle function
	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
	};

	// Effect to apply the theme class to the body and save to local storage
	useEffect(() => {
		document.body.className = theme;
		localStorage.setItem("theme", theme);
	}, [theme]);

	const value = {
		theme,
		toggleTheme,
	};

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
};
