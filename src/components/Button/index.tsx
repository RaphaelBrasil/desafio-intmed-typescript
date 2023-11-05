import React, { ReactNode } from "react";
import { StyledButton } from "./styles";

interface ButtonProps {
	text: string;
	onClick?: () => void;
	type?: "button" | "submit" | "reset";
	theme?: "primary" | "secondary" | "transparent";
	icon?: ReactNode;
	size?: "small" | "large";
	disabled?: boolean;
	id?: string;
}

const Button: React.FC<ButtonProps> = ({
	text,
	onClick,
	type = "button",
	theme = "primary",
	icon = <></>,
	size = "small",
	disabled,
	id
}) => {
	return (
		<StyledButton
			type={type}
			onClick={onClick}
			theme={theme as any}
			disabled={disabled}
			size={size}
		>
			{icon}
			{text}
		</StyledButton>
	);
};

export default Button;
