import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {AudioProvider} from "../src/contexts/AudioContext";

import App from "./App";
import "./App.css";

createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<AudioProvider>
			<App />
		</AudioProvider>
	</BrowserRouter>
);


