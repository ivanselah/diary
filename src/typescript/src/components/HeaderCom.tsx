import React from 'react';
import styled from 'styled-components';

type HeaderComProps = {
  leftBtn: JSX.Element;
  headerText: string;
  rightBtn?: JSX.Element;
};

const HeaderCom = ({ leftBtn, headerText, rightBtn }: HeaderComProps) => {
  return (
    <MyHeader>
      <div className="left">{leftBtn}</div>
      <div className="text">{headerText}</div>
      <div className="right">{rightBtn}</div>
    </MyHeader>
  );
};

export default HeaderCom;

const MyHeader = styled.div`
  display: flex;
  align-items: center;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0px;
    font-size: 25px;
  }
  .left {
    justify-content: start;
    width: 25%;
  }
  .text {
    align-items: center;
    margin-top: -15px;
    width: 100%;
  }
  .right {
    justify-content: end;
    width: 25%;
  }
  border-bottom: 1px solid #e2e2e2;
  margin-bottom: 15px;
`;
