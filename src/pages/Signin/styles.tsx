import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	gap: 10px;
	height: 100vh;
`;

export const FormContent = styled.form`
	gap: 15px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	width: 100%;
	background-color: white;
	max-width: 350px;
	border-radius: 5px;
`;

export const Img = styled.img`
	height: 50px;
	width: auto;
	align-self: flex-start;
`;

export const Label = styled.label`
	font-size: 13px;
	color: #a8a8a8;
	display: flex;
	align-items: center;
	width: 100%;
	margin-top: 3px;
`;

export const LabelError = styled.label`
	font-size: 13px;
	color: red;
`;

export const ButtonContainer = styled.div`
	display: flex;
	align-items: center;
	align-content: center;
	justify-content: space-between;
	width: 100%;
	outline: none;
`;
export const CheckContainer = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	outline: none;
`;

export const CustomCheckbox = styled.label`
	display: inline-block;
	position: relative;
	padding-left: 30px;
	cursor: pointer;

	input {
		position: absolute;
		opacity: 0;
		cursor: pointer;
	}

	.checkmark {
		position: absolute;
		top: 0;
		left: 0;
		height: 20px;
		width: 20px;
		border-radius: 4px;
		background-color: #ffffff;
		border: 1px solid #a8a8a8;

		&:hover {
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		}
	}

	input:checked ~ .checkmark {
		background-color: #49b4bb; // Checked background color
	}

	.checkmark:after {
		content: "";
		position: absolute;
		display: none;
	}

	input:checked ~ .checkmark:after {
		display: block;
	}
`;
