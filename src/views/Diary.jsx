import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DiaryStateContext } from '../App';
import MyButton from '../components/MyButton';
import MyHeader from '../components/MyHeader';
import { getStringDate } from '../util/date';
import { emotionList } from '../util/emotion';

function Diary() {
  const [data, setData] = useState();
  const { id } = useParams();
  const navigater = useNavigate();
  const diaryList = useContext(DiaryStateContext);

  useEffect(() => {
    document.title = `나만 보는 비밀 일기장 - ${id}번`;
  }, [id]);

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find((item) => Number(item.id) === Number(id));
      if (targetDiary) {
        setData(targetDiary);
      } else {
        alert('없는 일기 입니다.');
        navigater('/', { replace: true });
      }
    }
  }, [id, diaryList, navigater]);

  if (!data) {
    return <div className="DiaryPage"> 로딩중입니다....</div>;
  } else {
    const currentEmotionData = emotionList.find((emotion) => Number(emotion.emotion_id) === Number(data.emotion));
    return (
      <div className="DiaryPage">
        <MyHeader
          headText={`${getStringDate(new Date(data.date))}의 기록`}
          leftChild={<MyButton text={'< 뒤로가기'} onClick={() => navigater(-1)} />}
          rightChild={<MyButton text={'수정하기'} onClick={() => navigater(`/edit/${id}`)} />}
        />
        <article>
          <section>
            <h1>오늘의 감정</h1>
            <div className={['diary_img_wrapper', `diary_img_wrapper_${currentEmotionData.emotion_id}`].join(' ')}>
              <img src={currentEmotionData.emotion_img} alt="" />
              <div className="emotion_descript">{currentEmotionData.emotion_descript}</div>
            </div>
          </section>
          <section>
            <h1>오늘의 일기</h1>
            <div className="diary_content_wrapper">
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
}

export default Diary;
