import axios from "../api/axios";
import setupInterceptors from "../interceptors/authInterceptor";

const axiosInstanceWithInterceptors = setupInterceptors(axios);

interface ConsultaData {
	username: string;
	data: any;
}

export const ConsultaService = {
	fetchEspecialidades: async () => {
		try {
			const response = await axiosInstanceWithInterceptors.get(
				"/especialidades"
			);
			return response.data;
		} catch (err) {
			throw new Error("Erro ao buscar especialidades");
		}
	},

	fetchMedicos: async () => {
		try {
			const response = await axiosInstanceWithInterceptors.get(
				"/medicos"
			);
			return response.data;
		} catch (err) {
			throw new Error("Erro ao buscar médicos");
		}
	},

	fetchAgendas: async () => {
		try {
			const response = await axiosInstanceWithInterceptors.get(
				"/agendas"
			);
			return response.data;
		} catch (err) {
			throw new Error("Erro ao buscar agendas");
		}
	},

	createConsulta: async (
		diaSelecionado: string,
		HorarioSelecionado: string
	) => {
		try {
			await axiosInstanceWithInterceptors.post(
				"/consultas",
				JSON.stringify({ diaSelecionado, HorarioSelecionado }),
				{
					headers: {
						"Content-Type": "application/json"
					},
					withCredentials: true
				}
			);
		} catch (err) {
			throw new Error("Erro ao criar consulta");
		}
	},

	fetchData: async (): Promise<ConsultaData> => {
		try {
			const userToken = JSON.parse(
				localStorage.getItem("user_token") || ""
			);
			const response = await axiosInstanceWithInterceptors.get(
				"/consultas",
				{
					headers: {
						"Content-Type": "application/json"
					},
					withCredentials: true
				}
			);
			return { username: userToken.username, data: response.data };
		} catch (error) {
			throw new Error("Erro ao buscar dados");
		}
	},

	handleDeleteConsulta: async (consultaId: number) => {
		try {
			await axiosInstanceWithInterceptors.delete(
				`/consultas/${consultaId}`,
				{
					headers: {
						"Content-Type": "application/json"
					},
					withCredentials: true
				}
			);
			// Após a exclusão bem-sucedida, chame a função para buscar os dados atualizados.
			//fetchData();
		} catch (error) {
			throw new Error("Erro ao deletar consulta");
		}
	}
};
