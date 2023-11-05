import React from "react";
import GlobalStyle from "./styles/global";
import RoutesApp from "./routes";
import { AuthProvider } from "./context/authProvider";

const App: React.FC = () => {
	return (
		<AuthProvider>
			<RoutesApp />
			<GlobalStyle />
		</AuthProvider>
	);
};

export default App;
