import { useNavigate } from 'react-router-dom';
import MyButton from './MyButton';

const DiaryItem = ({ id, emotion, content, date }) => {
  const navigater = useNavigate();

  const goDetail = () => {
    navigater(`/diary/${id}`);
  };

  return (
    <div className="DiaryItem">
      <div className={['emotion_img_wrapper', `emotion_img_wrapper_${emotion}`].join(' ')} onClick={goDetail}>
        <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} alt={`${emotion}`} />
      </div>
      <div className="info_wrapper" onClick={goDetail}>
        <div className="diary_date">{new Date(date).toLocaleDateString('ko-kr')}</div>
        <div className="diary_content_preview">{content.slice(0, 25)}</div>
      </div>
      <div className="btn_wrapper">
        <MyButton text={'수정하기'} onClick={() => navigater(`/edit/${id}`)} />
      </div>
    </div>
  );
};

export default DiaryItem;
