import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Cell, Column } from "react-table";

import {
	Popover,
	PopoverTrigger,
	PopoverContent
} from "../../components/Popover";
import Button from "../../components/Button";
import FormularioNovaConsulta from "../../components/FormularioNovaConsulta";
import TabelaDeDados from "../../components/TabelaDeDados";
import Logo from "../../assets/logo.png";
import useAuth from "../../hooks/useAuth";
import * as S from "./styles";
import { ConsultaService } from "../../services/consultaService";

function capitalizeFirstLetter(string: string) {
	return string.replace(/^\w/, (match) => match.toUpperCase());
}

const Home: React.FC = () => {
	const columns: Column[] = [
		{
			Header: "Especialidade",
			accessor: "medico.especialidade.nome"
		},
		{
			Header: "Profissional",
			accessor: "medico.nome"
		},
		{
			Header: "Data",
			accessor: "dia"
		},
		{
			Header: "Hora",
			accessor: "horario"
		},
		{
			Header: "",
			accessor: "id",
			Cell: ({ cell }: { cell: Cell }) => (
				<Button
					text="Desmarcar"
					theme="transparent"
					size="small"
					icon={
						<FontAwesomeIcon
							icon={faXmark}
							style={{ marginRight: "8px", marginLeft: "2px" }}
						/>
					}
					onClick={() => {
						if ("id" in cell.row.original) {
							handleDeleteConsulta(
								cell.row.original.id as number
							);
						}
					}}
				/>
			)
		}
	];

	const navigate = useNavigate();
	const { signout } = useAuth();

	const [dados, setDados] = useState<any[]>([]);
	const [user, setUser] = useState<string>("");
	const [showConfirmationPopup, setShowConfirmationPopup] =
		useState<boolean>(false);
	const [consultaIdToDelete, setConsultaIdToDelete] = useState<number | null>(
		null
	);

	const fetchData = async () => {
		try {
			const result = await ConsultaService.fetchData();
			setUser(result.username);
			setDados(result.data);
		} catch (error) {}
	};

	const handleDeleteConsulta = (consultaId: number) => {
		setConsultaIdToDelete(consultaId);
		setShowConfirmationPopup(true);
	};

	const handleSignout = async () => {
		try {
			signout(navigate);
		} catch (error) {
			console.error("Error during signout:", error);
		}
	};

	const confirmDeleteConsulta = async () => {
		try {
			if (consultaIdToDelete !== null) {
				await ConsultaService.handleDeleteConsulta(consultaIdToDelete);
				// Após a exclusão bem-sucedida, chame a função para buscar os dados atualizados.
				fetchData();
			}
		} catch (error) {
			// Lida com erros, se necessário
		} finally {
			// Fecha o popup de confirmação
			setShowConfirmationPopup(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<S.Container>
			<S.Content>
				<S.Header>
					<S.Img src={Logo} alt="Logo" />
					<S.UserLabel>{capitalizeFirstLetter(user)}</S.UserLabel>
					<Button
						text="Desconectar"
						theme="transparent"
						size="small"
						onClick={handleSignout}
					/>
				</S.Header>
				<S.WrapperBody>
					<S.Body>
						<S.StyledStrong>Consulta Clínica</S.StyledStrong>
						<Popover>
							<PopoverTrigger
								style={{
									background: "transparent",
									border: "none"
								}}
							>
								<S.StyledPseudoButton
									size="large"
									theme="primary"
								>
									<FontAwesomeIcon
										icon={faPlus}
										style={{
											marginRight: "8px",
											marginBottom: "2px"
										}}
									/>
									Nova Consulta
								</S.StyledPseudoButton>
							</PopoverTrigger>
							<PopoverContent>
								<FormularioNovaConsulta fetchData={fetchData} />
							</PopoverContent>
						</Popover>
					</S.Body>
					<TabelaDeDados columns={columns} data={dados} />
				</S.WrapperBody>
			</S.Content>{" "}
			{showConfirmationPopup && (
				<S.ConfirmationPopup>
					<S.ConfirmationMessage>
						{`Deseja realmente desmarcar a consulta ${consultaIdToDelete}?`}
						<S.ConfirmationWrapper>
							<Button
								text="Cancelar"
								theme="secondary"
								onClick={() => setShowConfirmationPopup(false)}
							/>
							<Button
								text="Confirmar"
								theme="primary"
								onClick={confirmDeleteConsulta}
							/>
						</S.ConfirmationWrapper>
					</S.ConfirmationMessage>
				</S.ConfirmationPopup>
			)}
			<S.Footer />
		</S.Container>
	);
};

export default Home;
