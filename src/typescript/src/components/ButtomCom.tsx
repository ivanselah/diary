import React from 'react';
import styled from 'styled-components';

type StyleType = 'default' | 'positive' | 'negative';

type ButtonComProps = {
  btnText: string;
  styleType: StyleType;
  onClick: () => void;
};

const ButtonCom = ({ btnText, styleType, onClick }: ButtonComProps) => {
  return (
    <MyButton type="button" styleType={styleType} onClick={onClick}>
      {btnText}
    </MyButton>
  );
};

export default React.memo(ButtonCom);

ButtonCom.defaultProps = {
  styleType: 'default',
};

const MyButton = styled.button<{ styleType: StyleType }>`
  display: flex;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-family: 'Nanum Pen Script', cursive;
  cursor: pointer;
  font-size: 18px;
  color: ${(props) => (props.styleType === 'positive' ? '#ffffff' : props.styleType === 'negative' ? '#ffffff' : '#000000')};
  background-color: ${(props) => (props.styleType === 'positive' ? '#64c964' : props.styleType === 'negative' ? '#fd565f' : '#e2e2e2')};
  justify-content: center;
  margin-top: -15px;
`;
