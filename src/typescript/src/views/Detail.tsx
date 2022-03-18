import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import ButtonCom from '../components/ButtomCom';
import { getEmotionIndex } from '../components/DiaryList';
import HeaderCom from '../components/HeaderCom';
import { EmotionList } from '../components/NewEditCom';
import { StateProps } from '../Router';

const Detail = () => {
  const [data, setData] = useState<Omit<StateProps, 'date'> & { date: string }>();
  const navigator = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      const state = location.state as StateProps;
      setData(() => {
        return {
          id: state.id,
          content: state.content,
          emotion: state.emotion,
          date: new Date(state.date).toISOString().split('T')[0],
        };
      });
    }
  }, [location.state]);

  return (
    <div>
      {data && (
        <>
          <HeaderCom
            headerText={`${data.date} 기록`}
            leftBtn={<ButtonCom btnText="< 뒤로가기" onClick={() => navigator(-1)} />}
            rightBtn={<ButtonCom btnText="수정하기" onClick={() => navigator(`/edit/${id}`)} />}
          />
          <EmotionSection emotionType={data.emotion}>
            <h1>오늘의 감정</h1>
            <div>
              <img src={process.env.PUBLIC_URL + `/assets/emotion${data.emotion}.png`} alt="" />
              {EmotionList.map((item) => {
                if (item.emotion_no === data.emotion) {
                  return <span key={item.emotion_no}>{item.emotion_value}</span>;
                }
                return null;
              })}
            </div>
          </EmotionSection>
          <ContentSection>
            <h1>오늘의 일기</h1>
            <ContentWrapper>
              <p>{data.content}</p>
            </ContentWrapper>
          </ContentSection>
        </>
      )}
    </div>
  );
};

export default Detail;

const EmotionSection = styled.div<{ emotionType: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 100px;
  h1 {
    font-size: 25px;
    margin-bottom: 15px;
  }
  div {
    display: flex;
    flex-direction: column;
    width: 230px;
    height: 230px;
    align-items: center;
    justify-content: space-around;
    text-align: center;
    background-color: ${(props) => getEmotionIndex(props.emotionType)};
    border-radius: 5px;
    span {
      font-size: 25px;
      color: #ffffff;
    }
  }
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    font-size: 25px;
    margin-bottom: 15px;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  background-color: #e2e2e2;
  word-break: keep-all;
  overflow-wrap: break-word;
  p {
    text-align: left;
    font-size: 20px;
    font-family: 'Yeon Sung';
    font-weight: 400;

    border-radius: 5px;
    line-height: 2.5;
    padding: 20px;
  }
`;
