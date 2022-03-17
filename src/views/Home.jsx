import { useContext, useEffect, useState } from 'react';
import { DiaryStateContext } from '../App';
import DiaryList from '../components/DiaryList';
import MyButton from '../components/MyButton';
import MyHeader from '../components/MyHeader';

function Home() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [data, setData] = useState([]);
  const diaryList = useContext(DiaryStateContext);

  useEffect(() => {
    if (diaryList.length > 0) {
      const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getTime();
      const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59).getTime();
      setData(diaryList.filter((item) => firstDay <= item.date && item.date <= lastDay));
    }
  }, [currentDate, diaryList]);

  const headText = `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`;

  const increaseMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate()));
  };

  const decreaseMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate()));
  };

  return (
    <div>
      <MyHeader
        headText={headText}
        leftChild={<MyButton text={'<'} onClick={decreaseMonth} />}
        rightChild={<MyButton text={'>'} onClick={increaseMonth} />}
      />
      <DiaryList diaryList={data} />
    </div>
  );
}

export default Home;
