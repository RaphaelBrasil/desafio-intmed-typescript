import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	align-items: center;
	align-content: center;
	flex-direction: column;
	margin-top: 15px;
`;

export const Content = styled.div`
	gap: 15px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	width: 100%;
	background-color: white;
	max-width: 700px;
	border-radius: 5px;
	overflow: hidden;
`;

export const Img = styled.img`
	height: 50px;
	width: 181px;
	align-self: flex-start;
`;

export const UserLabel = styled.div`
	font-size: 13px;
	color: #a8a8a8;
	display: flex;
	align-items: center;
	height: 20px;
`;

export const StyledStrong = styled.strong`
	a {
		text-decoration: none;
		color: #a8a8a8;
	}
`;

export const Header = styled.div`
	display: flex;
	align-items: center;
	align-content: center;
	justify-content: space-between;
	width: 100%;
	outline: none;
`;

export const Footer = styled.div`
	margin: 20px;
	z-index: -1;
`;

export const WrapperBody = styled.div`
	height: 100%;
	width: 99%;
	background-color: #ffffff;
	border-radius: 4px;
	box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.25);
	display: flex;
	flex-direction: column;
	outline: none;
	margin: 2px;
`;

export const Body = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	gap: 10px;
	margin-top: 20px;
	padding: 10px;
`;

export const TableWrapper = styled.div`
	display: flex;
	justify-content: space between;
	width: 100%;
	padding: 5px;
	margin-top: 20px;
`;

export const StyledPseudoButton = styled.div<{
	size: "small" | "large";
	theme: "secondary" | "transparent" | "primary";
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: none;
  border-radius: 8px;
  height: 40px;
  width: 160px;
  cursor: pointer;
  font-weight: ${(props) => (props.size === "small" ? "" : "600")};
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
}
`;

export const ConfirmationPopup = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	border-radius: 5px;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 999;
`;

export const ConfirmationMessage = styled.div`
	background-color: #fff;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	padding: 20px;
	border-radius: 4px;
	text-align: center;
	max-width: 400px;
	width: 100%;
	font-family: "Roboto-Regular", Helvetica;
	font-size: 13px;
	font-weight: 400;
	line-height: normal;
	color: #444;
	position: relative;
`;

export const ConfirmationWrapper = styled.div`
	border-radius: 4px;
	display: flex;
	justify-content: space-between;
	margin-top: 20px;
`;
