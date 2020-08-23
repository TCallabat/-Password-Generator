/**
 * src\index.js
 */

/* Import React modules */
import React from "react";
import ReactDOM from "react-dom";

/* Import BaseWeb modules */
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";

/* Import App component */
import App from './App';

const engine = new Styletron();

ReactDOM.render(
	<React.StrictMode>
		<StyletronProvider value={engine}>
			<App />
		</StyletronProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
