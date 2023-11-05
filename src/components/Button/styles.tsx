import styled from "styled-components";

interface ButtonProps {
	size?: "small" | "large";
	theme?: "primary" | "secondary" | "transparent";
}

export const StyledButton = styled.button<ButtonProps>`
	outline: none;
	border: none;
	border-radius: 8px;
	height: 40px;
	width: 160px;
	cursor: pointer;
	font-weight: ${(props) => (props.size === "small" ? "" : "700")};
	font-size: ${(props) => (props.size === "small" ? "15px" : "18px")};
	background-color: ${(props) =>
		props.theme === "secondary"
			? "white"
			: props.theme === "transparent"
			? "transparent"
			: "#49b4bb"};
	color: ${(props) =>
		props.theme === "secondary" || props.theme === "transparent"
			? "#49b4bb"
			: "white"};

	&:hover {
		background-color: ${(props) =>
			props.theme === "secondary"
				? "#D9F1F3"
				: props.theme === "transparent"
				? "transparent"
				: "#90D3D7"};
		color: ${(props) =>
			props.theme === "secondary" || props.theme === "transparent"
				? "#67c7cf"
				: "white"};
	}
	&:disabled {
		background-color: #ccc;
		color: #999;
		cursor: not-allowed;
	}
`;
