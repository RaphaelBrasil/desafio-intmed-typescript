import styled from "styled-components";

const primaryColor = "#49b4bb";
const grayColor = "#a8a8a8";

export const PopupContainer = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 4px;
	z-index: 999;
`;

export const PopupContent = styled.div`
	background-color: #fff;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	padding: 20px;
	border-radius: 4px;
	text-align: center;
	max-width: 400px;
	width: 90%;
	font-family: "Roboto-Regular", Helvetica, sans-serif;
	font-size: 13px;
	font-weight: 400;
	line-height: 1.5;
	position: relative;
	margin: 20px;
`;

export const CloseButton = styled.button`
	background: none;
	border: none;
	font-family: "Roboto-Bold", Helvetica, sans-serif;
	font-size: 18px;
	font-weight: 700;
	cursor: pointer;
	color: ${primaryColor};
`;

export const StyledIcon = styled.h2`
	font-size: 24px;
	margin-bottom: 10px;
	color: ${primaryColor};
`;

export const Message = styled.p`
	font-size: 16px;
	color: ${grayColor};
	margin-bottom: 20px;
`;
