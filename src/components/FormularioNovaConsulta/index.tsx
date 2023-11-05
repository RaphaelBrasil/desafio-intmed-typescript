import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as S from "./styles";
import Button from "../Button";
import { ConsultaService } from "../../services/consultaService";
import PopupSuccess from "../PopupSuccess";

interface FormularioNovaConsultaProps {
	fetchData: () => void;
}

const FormularioNovaConsulta: React.FC<FormularioNovaConsultaProps> = ({
	fetchData
}) => {
	const { register, handleSubmit, reset, resetField, watch } =
		useForm<FormData>();

	const [especialidades, setEspecialidades] = useState<Especialidade[]>([]);
	const [medicos, setMedicos] = useState<Medico[]>([]);
	const [agendas, setAgendas] = useState<Agenda[]>([]);
	const [showSuccessPopup, setShowSuccessPopup] = useState(false);

	const medicosFiltrados = medicos.filter(
		({ especialidade }) =>
			especialidade.id === Number(watch("especialidadeSelecionada", []))
	);

	const datasDisponiveis = agendas.filter(
		({ medico }) => medico.id === Number(watch("medicoSelecionado", []))
	);

	const onSubmit = async (data: FormData) => {
		try {
			await ConsultaService.createConsulta(
				data.diaSelecionado,
				data.horarioSelecionado
			);
			fetchData();
			setShowSuccessPopup(true);
		} catch (error) {
			console.error("Erro ao criar consulta:", error);
		}
	};

	const handleCloseSuccessPopup = () => {
		setShowSuccessPopup(false);
	};

	useEffect(() => {
		const fetchEspecialidades = async () => {
			try {
				const especialidadesData =
					await ConsultaService.fetchEspecialidades();
				setEspecialidades(especialidadesData);
			} catch (error) {
				console.error("Erro ao buscar especialidades:", error);
			}
		};

		const fetchMedicos = async () => {
			try {
				const medicosData = await ConsultaService.fetchMedicos();
				setMedicos(medicosData);
			} catch (error) {
				console.error("Erro ao buscar médicos:", error);
			}
		};

		const fetchAgendas = async () => {
			try {
				const agendasData = await ConsultaService.fetchAgendas();
				setAgendas(agendasData);
			} catch (error) {
				console.error("Erro ao buscar agendas:", error);
			}
		};

		fetchEspecialidades();
		fetchMedicos();
		fetchAgendas();
	}, []);

	const especialidadeSelecionada = watch("especialidadeSelecionada");
	const medicoSelecionado = watch("medicoSelecionado");
	const diaSelecionado = watch("diaSelecionado");
	// const all = watch();

	// useEffect(() => {
	// 	console.log(all);
	// }, [all]);

	useEffect(() => {
		resetField("medicoSelecionado");
		resetField("diaSelecionado");
		resetField("horarioSelecionado");
	}, [especialidadeSelecionada, resetField]);

	useEffect(() => {
		resetField("diaSelecionado");
		resetField("horarioSelecionado");
	}, [medicoSelecionado, resetField]);

	useEffect(() => {
		resetField("horarioSelecionado");
	}, [diaSelecionado, resetField]);

	return (
		<S.PopoverContent>
			<form onSubmit={handleSubmit(onSubmit)}>
				<S.SelectWrapper>
					<S.Strong>Nova Consulta</S.Strong>
					<S.Select
						id="especialidadeSelecionada"
						{...register("especialidadeSelecionada", {
							required: true
						})}
					>
						<option value="">Especialidade</option>
						{especialidades.map((especialidade) => (
							<option
								key={especialidade.id}
								value={especialidade.id}
							>
								{especialidade.nome}
							</option>
						))}
					</S.Select>
					<S.Select
						id="medicoSelecionado"
						{...register("medicoSelecionado", { required: true })}
						disabled={!watch("especialidadeSelecionada")}
					>
						<option value="">Médico</option>
						{medicosFiltrados.map((medico) => (
							<option key={medico.id} value={medico.id}>
								{medico.nome}
							</option>
						))}
					</S.Select>
					<S.Select
						id="diaSelecionado"
						{...register("diaSelecionado", { required: true })}
						disabled={!watch("medicoSelecionado")}
					>
						<option value="">Data</option>
						{datasDisponiveis.map((data) => (
							<option key={data.dia} value={data.dia}>
								{data.dia}
							</option>
						))}
					</S.Select>
					<S.Select
						id="horarioSelecionado"
						{...register("horarioSelecionado", { required: true })}
						disabled={!watch("diaSelecionado")}
					>
						<option value="">Hora</option>
						{datasDisponiveis.flatMap((data) =>
							data.horarios.map((horario) => (
								<option key={horario} value={horario}>
									{horario}
								</option>
							))
						)}
					</S.Select>
					<S.ButtonWrapper>
						<Button
							id="Cancelar"
							text="Cancelar"
							theme="secondary"
							onClick={() => reset()}
						/>
						<Button
							id="Confirmar"
							text="Confirmar"
							type="submit"
							disabled={!watch("horarioSelecionado")}
						/>
					</S.ButtonWrapper>
				</S.SelectWrapper>
			</form>
			<PopupSuccess
				open={showSuccessPopup}
				onClose={handleCloseSuccessPopup}
				message={"Consulta marcada com sucesso!"}
				closeButton={"Marcar outra consulta"}
			/>
		</S.PopoverContent>
	);
};

export default FormularioNovaConsulta;

type Especialidade = {
	id: number;
	nome: string;
};

type Medico = {
	id: number;
	nome: string;
	especialidade: Especialidade;
};

type Agenda = {
	id: number;
	medico: Medico;
	dia: string;
	horarios: string[];
};

type FormData = {
	especialidadeSelecionada: any;
	medicoSelecionado: any;
	diaSelecionado: any;
	horarioSelecionado: any;
};
