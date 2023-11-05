import {
	BrowserRouter,
	Route,
	Routes,
	Outlet,
	Navigate
} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Home from "../pages/Home";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";

const RoutesApp: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/signup" element={<Signup />} />
				<Route path="/home/*" element={<PrivateRoute />}>
					<Route index element={<Home />} />
				</Route>
				<Route path="/" element={<NonPrivateRoute />}>
					<Route index element={<Signin />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

const PrivateRoute: React.FC = () => {
	const { signed } = useAuth();

	if (!signed) {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
};

const NonPrivateRoute: React.FC = () => {
	const { signed } = useAuth();

	if (signed) {
		return <Navigate to="/home" replace />;
	}

	return <Outlet />;
};

export default RoutesApp;
