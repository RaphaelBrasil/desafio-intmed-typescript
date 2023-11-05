import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    width: 100vw;
    height: 100vh;
    background-color: #ffffff;
    font-family: 'Roboto-Bold', 'Helvetica', sans-serif;
  }
`;

export const StyledButton = styled.button<{
	size?: "small" | "big";
	theme?: "primary" | "secondary" | "transparent";
}>`
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
	}
`;

export const StyledInput = styled.input`
	outline: none;
	padding: 5px 5px;
	height: 40px;
	width: 100%;
	border-radius: 4px;
	background-color: #ffffff;
	border: 1px solid #a8a8a8;

	&[type="password"] {
		box-sizing: border-box;
	}

	&[type="checkbox"] {
		border-radius: 4px;
		height: 20px;
		width: 20px;
		overflow: hidden;
	}

	&:checked {
		accent-color: #49b4bb;
	}
`;

export default GlobalStyle;
