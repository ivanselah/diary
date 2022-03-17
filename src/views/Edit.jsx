import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DiaryStateContext } from '../App';
import DiaryEditor from '../components/DiaryEditor';

function Edit() {
  const [originData, setOriginData] = useState();
  const { id } = useParams();
  const navigater = useNavigate();
  const diaryList = useContext(DiaryStateContext);

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find((item) => Number(item.id) === Number(id));
      if (targetDiary) {
        setOriginData(targetDiary);
      } else {
        alert('없는 일기 입니다.');
        navigater('/', { replace: true });
      }
    }
  }, [id, diaryList, navigater]);

  return <div>{originData && <DiaryEditor isEdit={true} originData={originData} />}</div>;
}

export default Edit;
