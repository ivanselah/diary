import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DiaryDispatchContext } from '../App';
import EmotionItem from './EmotionItem';
import MyButton from './MyButton';
import MyHeader from './MyHeader';

const emotionList = [
  { no: 1, des: '완전좋음' },
  { no: 2, des: '좋음' },
  { no: 3, des: '그럭저럭' },
  { no: 4, des: '나쁨' },
  { no: 5, des: '끔찍함' },
].map((item) => {
  return {
    emotion_id: item.no,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion${item.no}.png`,
    emotion_descript: item.des,
  };
});

const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};

const DiaryEditor = ({ isEdit, originData }) => {
  const [date, setDate] = useState(getStringDate(new Date()));
  const [content, setContent] = useState('');
  const contentRef = useRef();
  const [emotion, setEmotion] = useState(3);
  const navigater = useNavigate();
  const { onCreate, onEdit } = useContext(DiaryDispatchContext);

  const onClickHandle = (emotion_id) => {
    setEmotion(emotion_id);
  };

  const onClickComplate = () => {
    if (content.length < 1 || content.trim() === '') {
      contentRef.current.focus();
      return;
    }
    if (window.confirm(isEdit ? '일기를 수정하시겠습니까?' : '새로운 일기를 저장하시겠습니까?')) {
      if (isEdit) {
        onEdit(originData.id, date, content, emotion);
      } else {
        onCreate(date, content, emotion);
      }
      navigater('/', { replace: true }); // 작성했던 곳으로 뒤로가기 못하도록 옵션 넣어줌
    }
  };

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(Number(originData.date))));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  return (
    <div className="DiaryEditor">
      <MyHeader headText={isEdit ? '일기 수정하기' : '새로운 일기 쓰기'} leftChild={<MyButton text={'< 뒤로가기'} onClick={() => navigater(-1)} />} />
      <div>
        <section>
          <h1>오늘은 언제인가요?</h1>
          <div className="input_box">
            <input className="input_date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
        </section>
        <section>
          <h1>오늘의 감정</h1>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((item) => (
              <EmotionItem key={item.emotion_id} {...item} onClick={onClickHandle} isSelected={item.emotion_id === emotion} />
            ))}
          </div>
        </section>
        <section>
          <h1>오늘의 일기</h1>
          <div className="input_box text_wrapper">
            <textarea placeholder="오늘은 어땠나요?" ref={contentRef} value={content} onChange={(e) => setContent(e.target.value)} />
          </div>
        </section>
        <section>
          <div className="control_box">
            <MyButton text={'취소하기'} onClick={() => navigater(-1)} />
            <MyButton text={isEdit ? '수정완료' : '작성완료'} type={'positive'} onClick={onClickComplate} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
