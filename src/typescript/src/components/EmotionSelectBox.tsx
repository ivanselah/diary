import React from 'react';
import styled from 'styled-components';
import { getEmotionIndex } from './DiaryList';

type EmotionListProps = {
  emotion_no: number;
  emotion_value: string;
  onClick: (id: number) => void;
  isSelected: boolean;
};

const EmotionSelectBox = ({ emotion_no, emotion_value, onClick, isSelected }: EmotionListProps) => {
  return (
    <EmotionBox onClick={() => onClick(emotion_no)} emotionType={isSelected ? emotion_no : 0}>
      <img src={process.env.PUBLIC_URL + `/assets/emotion${emotion_no}.png`} alt="" />
      <span>{emotion_value}</span>
    </EmotionBox>
  );
};

export default React.memo(EmotionSelectBox);

const EmotionBox = styled.div<{ emotionType: number }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => getEmotionIndex(props.emotionType)};
  color: ${(props) => props.emotionType !== 0 && '#ffffff'};
  width: 115px;
  height: 130px;
  border-radius: 5px;
  cursor: pointer;
  span {
    margin-top: 10px;
    font-size: 18px;
  }
  img {
    width: 60px;
    height: 60px;
  }
`;
