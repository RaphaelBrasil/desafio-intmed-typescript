import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Logo from "../../assets/logo.png";
import PopupSuccess from "../../components/PopupSuccess";
import * as S from "./styles";
import useAuth from "../../hooks/useAuth";

interface FormData {
	name: string;
	email: string;
	password: string;
	passwordConf: string;
}

const Signup = () => {
	const { signup } = useAuth();
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors }
	} = useForm<FormData>();

	const [showSuccessPopup, setShowSuccessPopup] = useState(false);

	const onSubmit = (data: FormData) => {
		if (!data.name || !data.email || !data.password || !data.passwordConf) {
			setError("name", {
				type: "required",
				message: "Campo Nome é obrigatório"
			});
			setError("email", {
				type: "required",
				message: "Campo Email é obrigatório"
			});
			setError("password", {
				type: "required",
				message: "Campo Senha é obrigatório"
			});
			setError("passwordConf", {
				type: "required",
				message: "Campo Confirmar Senha é obrigatório"
			});
		} else if (data.password !== data.passwordConf) {
			setError("passwordConf", {
				type: "validate",
				message: "As senhas não são iguais"
			});
		} else {
			signup(data.name, data.email, data.password);
			setShowSuccessPopup(true);
		}
	};

	const handleCancel = () => {
		navigate("/");
	};

	const handleCloseSuccessPopup = () => {
		setShowSuccessPopup(false);
		navigate("/");
	};

	return (
		<S.Container>
			<S.FormContent onSubmit={handleSubmit(onSubmit)}>
				<S.Img src={Logo} alt="Logo" />
				<S.Label>Crie sua conta</S.Label>
				<Input type="text" placeholder="Nome" {...register("name")} />
				<Input type="text" placeholder="Email" {...register("email")} />
				<Input
					type="password"
					placeholder="Senha"
					{...register("password")}
				/>
				<Input
					type="password"
					placeholder="Confirmar Senha"
					{...register("passwordConf")}
				/>
				<S.LabelError>
					{Object.keys(errors).map((key) => (
						<p key={key}>
							{errors[key as keyof FormData]?.message}
						</p>
					))}
				</S.LabelError>
				<S.FlexContainer>
					<Button
						text="Cancelar"
						onClick={handleCancel}
						type="button"
						theme="secondary"
					/>
					<Button text="Inscrever-se" type="submit" />
				</S.FlexContainer>
			</S.FormContent>
			<PopupSuccess
				open={showSuccessPopup}
				onClose={handleCloseSuccessPopup}
				message={"Seu cadastro foi realizado com sucesso"}
				closeButton={"Retornar à pagina de Login"}
			/>
		</S.Container>
	);
};

export default Signup;
