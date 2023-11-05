import axios, {
	AxiosError,
	AxiosInstance,
	InternalAxiosRequestConfig,
	AxiosResponse
} from "axios";

// For Make Log on Develop Mode
const logOnDev = (message: string) => {
	//console.log(message);
};

const authInterceptor = (
	config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
	const userToken = localStorage.getItem("user_token");
	const { method, url } = config;

	logOnDev(`🚀 [API] ${method?.toUpperCase()} ${url} | Request`);

	if (userToken) {
		const { accessToken } = JSON.parse(userToken);
		config.headers.Authorization = `Token ${accessToken}`;
	}

	return config;
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
	const { method, url } = response.config;
	const { status } = response;
	logOnDev(`🚀 [API] ${method?.toUpperCase()} ${url} | Response ${status}`);

	return response;
};
const onErrorResponse = (error: AxiosError | Error): Promise<AxiosError> => {
	if (axios.isAxiosError(error)) {
		const { message } = error;
		const { method, url } = error.config as InternalAxiosRequestConfig;
		const { status } = (error.response as AxiosResponse) ?? {};

		logOnDev(
			`🚨 [API] ${method?.toUpperCase()} ${url} | Error ${status} ${message}`
		);

		switch (status) {
			case 401: {
				// "Login required"
				break;
			}
			case 403: {
				// "Permission denied"
				break;
			}
			case 404: {
				// "Invalid request"
				break;
			}
			case 500: {
				// "Server error"
				break;
			}
			default: {
				// "Unknown error occurred"
				break;
			}
		}

		if (status === 401) {
			// Delete Token & Go To Login Page if you required.
			sessionStorage.removeItem("user_token");
		}
	} else {
		logOnDev(`🚨 [API] | Error ${error.message}`);
	}

	return Promise.reject(error);
};

const setupInterceptors = (instance: AxiosInstance): AxiosInstance => {
	instance.interceptors.request.use(authInterceptor, onErrorResponse);
	instance.interceptors.response.use(onResponse, onErrorResponse);

	return instance;
};

export default setupInterceptors;
