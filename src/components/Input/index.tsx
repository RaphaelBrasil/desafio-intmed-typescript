import React, { useState, forwardRef, Ref } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import * as S from "./styles";

interface InputProps {
	type: "text" | "password";
	placeholder: string;
	name: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MyForwardedInput = (
	{ type, placeholder, name, onChange }: InputProps,
	ref: Ref<HTMLInputElement>
) => {
	const [showPassword, setShowPassword] = useState(false);

	const handleTogglePassword = (e: React.MouseEvent) => {
		e.preventDefault();
		setShowPassword(!showPassword);
	};

	return (
		<S.Wrapper>
			{type === "password" ? (
				<S.ToggleButton
					onClick={handleTogglePassword}
					tabIndex={-1}
					type="button"
				>
					<FontAwesomeIcon
						icon={showPassword ? faEyeSlash : faEye}
						style={{ color: "#a8a8a8" }}
					/>
				</S.ToggleButton>
			) : (
				<></>
			)}
			<S.StyledInput
				ref={ref}
				name={name}
				onChange={onChange}
				type={type === "password" && showPassword ? "text" : type}
				placeholder={placeholder}
			/>
		</S.Wrapper>
	);
};

export const Input = forwardRef<HTMLInputElement, InputProps>(MyForwardedInput);

export default Input;
