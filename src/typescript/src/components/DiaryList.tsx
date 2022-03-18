import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { StateProps } from '../Router';
import ButtonCom from './ButtomCom';

const DiaryList = ({ id, content, date, emotion }: StateProps) => {
  const navigator = useNavigate();

  const goToDetail = () => navigator(`/detail/${id}`, { state: { id, date, content, emotion } });

  return (
    <ItemBox>
      <ImgBox emotionType={emotion} onClick={goToDetail}>
        <img src={process.env.PUBLIC_URL + `/assets/emotion${emotion}.png`} alt="" />
      </ImgBox>
      <ContextBox onClick={goToDetail}>
        <div>{new Date(date).toLocaleDateString('ko-kr')}</div>
        <div>{content}</div>
      </ContextBox>
      <EditBtnBox onClick={() => navigator(`/edit/${id}`)}>
        <ButtonCom btnText="수정하기" onClick={() => {}} />
      </EditBtnBox>
    </ItemBox>
  );
};

export default React.memo(DiaryList);

export function getEmotionIndex(emotionType: number) {
  switch (emotionType) {
    case 1:
      return '#64c964';
    case 2:
      return '#9dd772';
    case 3:
      return '#fdce17';
    case 4:
      return '#fd8446';
    case 5:
      return '#fd565f';
    default:
      return '#e2e2e2';
  }
}

const ItemBox = styled.div`
  width: 100%;
  display: felx;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 1px solid #e2e2e2;
`;

const ImgBox = styled.div<{ emotionType: number }>`
  display: flex;
  min-width: 120px;
  height: 80px;
  border-radius: 5px;
  justify-content: center;
  background-color: ${(props) => getEmotionIndex(props.emotionType)};
  cursor: pointer;
`;

const ContextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  flex-grow: 1;
  padding: 0px 20px;
  font-size: 25px;
  cursor: pointer;
`;

const EditBtnBox = styled.div`
  display: flex;
  align-items: center;
`;
