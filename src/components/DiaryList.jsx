import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DiaryItem from './DiaryItem';
import MyButton from './MyButton';

const sortOptionList = [
  { value: 'latest', name: '최신순' },
  { value: 'oldest', name: '오래된 순' },
];

const filterOptionList = [
  { value: 'all', name: '전부다' },
  { value: 'good', name: '좋은 감정만' },
  { value: 'bad', name: '안좋은 감정만' },
];

const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select className="ControlMenu" value={value} onChange={(event) => onChange(event.target.value)}>
      {optionList.map((item, index) => (
        <option key={index} value={item.value}>
          {item.name}
        </option>
      ))}
    </select>
  );
};

const DiaryList = ({ diaryList }) => {
  const [sortType, setSortType] = useState('latest');
  const [filter, setFilter] = useState('all');
  const navigater = useNavigate();

  const sortDiaryList = () => {
    const filterCallback = (item) => {
      if (filter === 'good') {
        return item.emotion <= 3;
      } else {
        return item.emotion > 3;
      }
    };

    const compare = (a, b) => {
      if (sortType === 'latest') {
        return Number(b.date) - Number(a.date);
      } else {
        return Number(a.date) - Number(b.date);
      }
    };

    const copyList = [...diaryList];

    const filteredList = filter === 'all' ? copyList : copyList.filter((item) => filterCallback(item));

    return filteredList.sort(compare);
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu value={sortType} optionList={sortOptionList} onChange={setSortType} />{' '}
          <ControlMenu value={filter} optionList={filterOptionList} onChange={setFilter} />
        </div>
        <div className="right_col">
          <MyButton type={'positive'} text={'새로운 일기 쓰기'} onClick={() => navigater('/new')} />
        </div>
      </div>
      {sortDiaryList().map((item) => (
        <DiaryItem key={item.id} {...item} />
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
