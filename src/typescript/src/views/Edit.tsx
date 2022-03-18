import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NewEditCom from '../components/NewEditCom';
import { DiaryListContext, StateProps } from '../Router';

const Edit = () => {
  const [selectedData, setSelectedData] = useState<StateProps>();
  const { diaryList } = useContext(DiaryListContext);
  const { id } = useParams();
  const navigator = useNavigate();

  useEffect(() => {
    const targetData = diaryList.find((item) => item.id === Number(id))!;
    if (targetData) {
      setSelectedData(targetData);
    } else {
      alert('없는 일기입니다.');
      navigator('/', { replace: true });
    }
  }, [diaryList, id, navigator]);

  return <NewEditCom isEdit={true} selectedData={selectedData} />;
};

export default Edit;
