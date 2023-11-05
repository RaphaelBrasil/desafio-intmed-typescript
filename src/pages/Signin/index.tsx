import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Logo from "../../assets/logo.png";
import * as S from "./styles";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

interface FormData {
	email: string;
	password: string;
	rememberMe: boolean; // Adicione o campo rememberMe à interface
}

const Signin = () => {
	const { signin } = useAuth();
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors }
	} = useForm<FormData>();

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		try {
			await signin(data.email, data.password);
			navigate("/home");
		} catch (err) {
			setError("password", {
				message: "E-mail ou senha incorretos"
			});
		}
	};

	const handleSignup = () => {
		navigate("/signup");
	};

	return (
		<S.Container>
			<S.FormContent onSubmit={handleSubmit(onSubmit)}>
				<S.Img src={Logo} alt="Logo" />
				<Input
					type="text"
					placeholder="Email ou Login"
					{...register("email")}
				/>

				<Input
					type="password"
					placeholder="Senha"
					{...register("password")}
				/>
				<S.CheckContainer>
					<S.CustomCheckbox>
						<input type="checkbox" {...register("rememberMe")} />
						<span className="checkmark"></span>
					</S.CustomCheckbox>
					<S.Label>Lembrar minha senha</S.Label>
				</S.CheckContainer>

				<S.LabelError>{errors.password?.message}</S.LabelError>

				<S.ButtonContainer>
					<Button
						text="Criar Conta"
						type="button"
						onClick={handleSignup}
						theme="secondary"
					/>
					<Button text="Acessar" type="submit" />
				</S.ButtonContainer>
			</S.FormContent>
		</S.Container>
	);
};

export default Signin;
