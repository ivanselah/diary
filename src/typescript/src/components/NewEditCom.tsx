import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { DiaryDispatchContext, StateProps } from '../Router';
import ButtonCom from './ButtomCom';
import EmotionSelectBox from './EmotionSelectBox';
import HeaderCom from './HeaderCom';

export const EmotionList = [
  { emotion_no: 1, emotion_value: '완전좋음' },
  { emotion_no: 2, emotion_value: '좋음' },
  { emotion_no: 3, emotion_value: '그럭저럭' },
  { emotion_no: 4, emotion_value: '나쁨' },
  { emotion_no: 5, emotion_value: '끔찍함' },
];

const getStringDate = (date: Date) => {
  return date.toISOString().slice(0, 10);
};

const getCalTime = (date: string): number => {
  return new Date(date).getTime();
};

const NewEditCom = ({ isEdit, selectedData }: { isEdit: boolean; selectedData?: StateProps }) => {
  const [date, setDate] = useState<string>(getStringDate(new Date()));
  const [emotionNo, setEmotionNo] = useState(3);
  const [content, setContent] = useState<string>('');
  const { onCreate, onRemove, onEdit } = useContext(DiaryDispatchContext);
  const { id } = useParams();
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const navigator = useNavigate();

  useEffect(() => {
    if (isEdit && selectedData) {
      setContent(selectedData.content);
      setEmotionNo(selectedData.emotion);
      setDate(getStringDate(new Date(selectedData.date)));
    }
  }, [selectedData, id, isEdit]);

  const onSubmitDiary = () => {
    if (content.length >= 1 && content.trim() !== '') {
      if (window.confirm('저장하시겠습니까?')) {
        onCreate(getCalTime(date), content, emotionNo);
        navigator('/', { replace: true });
      }
    } else {
      contentRef.current?.focus();
    }
  };

  const onEditDiary = () => {
    if (window.confirm('수정하시겠습니까?')) {
      onEdit(Number(id), getCalTime(date), content, emotionNo);
      navigator('/', { replace: true });
    }
  };

  const onRemoveDiary = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      onRemove(Number(id));
      navigator('/', { replace: true });
    }
  };

  return (
    <NewBox>
      <HeaderCom
        headerText={isEdit ? '일기 수정하기' : '새로운 일기 쓰기'}
        leftBtn={<ButtonCom btnText="< 뒤로가기" onClick={() => navigator(-1)} />}
        rightBtn={isEdit ? <ButtonCom btnText="삭제하기" styleType="negative" onClick={onRemoveDiary} /> : <></>}
      />
      <article>
        <section>
          <h1>오늘은 언제인가요?</h1>
          <input className="input_date" type="date" value={date} onChange={(e) => setDate(e.currentTarget.value)} />
        </section>
        <section>
          <h1>오늘의 감정</h1>
          <EmotionContainer>
            {EmotionList.map((emotion) => (
              <EmotionSelectBox key={emotion.emotion_no} {...emotion} onClick={setEmotionNo} isSelected={emotion.emotion_no === emotionNo} />
            ))}
          </EmotionContainer>
        </section>
        <section>
          <h1>오늘의 일기</h1>
          <textarea
            ref={contentRef}
            className="textarea_input"
            placeholder="오늘은 어땠나요?"
            value={content}
            onChange={(e) => setContent(e.currentTarget.value)}
          />
        </section>
        <div className="btnBox">
          <ButtonCom btnText="취소하기" onClick={() => navigator(-1)} />
          <ButtonCom btnText={isEdit ? '수정완료' : '작성완료'} styleType="positive" onClick={isEdit ? onEditDiary : onSubmitDiary} />
        </div>
      </article>
    </NewBox>
  );
};

NewEditCom.defaultProps = {
  isEdit: false,
};

export default NewEditCom;

const NewBox = styled.div`
  section {
    h1 {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    margin-bottom: 40px;
    .input_date {
      border: none;
      border-radius: 5px;
      background-color: #e2e2e2;
      padding: 10px 10px;
      font-family: 'Nanum Pen Script', cursive;
      font-size: 20px;
      cursor: pointer;
    }
    textarea {
      font-family: 'Nanum Pen Script', cursive;
      font-size: 20px;
      resize: vertical;
      width: 94%;
      min-height: 200px;

      border: none;
      border-radius: 5px;
      background-color: #e2e2e2;
      padding: 20px;
      ::placeholder {
        font-size: 18px;
      }
    }
  }
  .btnBox {
    display: flex;
    justify-content: space-between;
  }
`;

const EmotionContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
