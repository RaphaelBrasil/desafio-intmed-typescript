import { createContext, useState, ReactNode } from "react";
import axios from "../api/axios";
import { AuthService } from "../services/authService";
import { SignupService } from "../services/signupService";
import authInterceptor from "../interceptors/authInterceptor";

authInterceptor(axios);

type AuthContextType = {
	user: {
		name: string;
		// outras propriedades do usuário
	};
	signed: boolean;
	signin: (username: string, password: string) => Promise<string | void>;
	signup: (
		username: string,
		email: string,
		password: string
	) => Promise<string | void>;
	signout: (navigateTo: (arg0: string) => void) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<any | null>(null); // Substitua "any" pelo tipo apropriado para o usuário

	const signin = async (
		username: string,
		password: string
	): Promise<string | void> => {
		try {
			const userData = await AuthService.signin(username, password);
			setUser(userData);
		} catch (err: any) {
			return err.message;
		}
	};

	const signup = async (
		username: string,
		email: string,
		password: string
	): Promise<string | void> => {
		try {
			await SignupService.signup(username, email, password);
		} catch (err: any) {
			return err.message;
		}
	};

	const signout = (navigateTo: (arg0: string) => void) => {
		try {
			localStorage.removeItem("user_token");
			setUser(null);
			navigateTo("/");
		} catch (error) {}
	};

	const authValue: AuthContextType = {
		user,
		signed: !!user || !!localStorage.getItem("user_token"),
		signin,
		signup,
		signout
	};

	return (
		<AuthContext.Provider value={authValue}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext };
export type { AuthContextType };
