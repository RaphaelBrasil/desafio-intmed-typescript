import axios from "../api/axios";

const SIGNUP_URL = "users";

interface SignupData {
	username: string;
	email: string;
	password: string;
}

export const SignupService = {
	signup: async (
		username: string,
		email: string,
		password: string
	): Promise<void> => {
		try {
			await axios.post(
				SIGNUP_URL,
				JSON.stringify({ username, email, password } as SignupData),
				{
					headers: { "Content-Type": "application/json" },
					withCredentials: true
				}
			);
		} catch (err: any) {
			if (!err?.response) {
				throw new Error("Sem resposta do servidor");
			} else {
				throw new Error("Falha ao registrar");
			}
		}
	}
};
