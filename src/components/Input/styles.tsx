import styled from "styled-components";

export const StyledInput = styled.input`
	outline: none;
	padding: 5px 5px;
	height: 40px;
	width: 100%;
	border-radius: 4px;
	background-color: #ffffff;
	border: 1px solid #a8a8a8;

	&:hover {
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	}

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
		color: #49b4bb;
	}
`;

export const ToggleButton = styled.button`
	border: none;
	background: transparent;
	cursor: pointer;
	padding: 4px;
	top: 50%;
	right: 4px;
	transform: translateY(-50%);
	position: absolute;
`;

export const Wrapper = styled.div`
	position: relative;
	width: 100%;
`;
