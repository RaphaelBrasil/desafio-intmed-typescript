import axios from "../api/axios";

const LOGIN_URL = "users/login";

interface SigninResponse {
	username: string;
	accessToken: string;
}

export const AuthService = {
	signin: async (
		username: string,
		password: string
	): Promise<SigninResponse> => {
		try {
			const response = await axios.post(
				LOGIN_URL,
				JSON.stringify({ username, password }),
				{
					headers: { "Content-Type": "application/json" },
					withCredentials: true
				}
			);

			const accessToken = response?.data?.token;
			localStorage.setItem(
				"user_token",
				JSON.stringify({ username, accessToken })
			);
			return { username, accessToken };
		} catch (err) {
			throw new Error("E-mail ou senha incorretos");
		}
	}
};
