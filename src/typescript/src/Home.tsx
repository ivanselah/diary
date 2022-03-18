import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ButtonCom from './components/ButtomCom';
import DiaryList from './components/DiaryList';
import HeaderCom from './components/HeaderCom';
import SelectCom from './components/SelectCom';
import { DiaryListContext, StateProps } from './Router';

const getStringDate = (date: Date) => {
  return date.toISOString().slice(0, 10);
};

export type FilterOption = 'latest' | 'oldest';
export type FilterOption1 = 'all' | 'good' | 'bad';

const optionList = [
  { name: 'latest', value: '최신순' },
  { name: 'oldest', value: '오래된 순' },
];

const optionList1 = [
  { name: 'all', value: '전부다' },
  { name: 'good', value: '좋은 감정만' },
  { name: 'bad', value: '안좋은 감정만' },
];

function Home() {
  const [dataList, setDataList] = useState<StateProps[]>([]);
  const [filterOption, setFilterOption] = useState<FilterOption>('latest');
  const [filterOption1, setFilterOption1] = useState<FilterOption1>('all');
  const [date, setDate] = useState(getStringDate(new Date()));
  const { diaryList } = useContext(DiaryListContext);
  const navigator = useNavigate();

  const getCalDate = useCallback(() => {
    return new Date(date);
  }, [date]);

  const FilteredDate = () => {
    const filterEmotion = (item: StateProps) => {
      if (filterOption1 === 'good') {
        return item.emotion <= 3;
      } else {
        return item.emotion > 3;
      }
    };

    const filterCompare = (a: StateProps, b: StateProps) => {
      if (filterOption === 'latest') {
        return b.date - a.date;
      } else {
        return a.date - b.date;
      }
    };

    const dataListTemp = [...dataList];
    let filteredData: StateProps[] = [];

    filteredData = filterOption1 === 'all' ? dataListTemp : dataListTemp.filter((item) => filterEmotion(item));

    return filteredData.sort(filterCompare);
  };

  useEffect(() => {
    const startDay = new Date(getCalDate().getFullYear(), getCalDate().getMonth(), 1).getTime();
    const endDay = new Date(getCalDate().getFullYear(), getCalDate().getMonth() + 1, 0, 23, 59, 59).getTime();

    setDataList(diaryList.filter((item) => startDay <= item.date && item.date <= endDay));
  }, [diaryList, date, getCalDate]);

  const headerText = `${new Date(date).getFullYear()}년 ${new Date(date).getMonth() + 1}월`;

  const increaseDate = useCallback(() => {
    setDate(String(new Date(getCalDate().getFullYear(), getCalDate().getMonth() + 1)));
  }, [getCalDate]);

  const decreaseDate = useCallback(() => {
    setDate(String(new Date(getCalDate().getFullYear(), getCalDate().getMonth() - 1)));
  }, [getCalDate]);

  const onSetFilterOption = useCallback(<T extends FilterOption | FilterOption1>(value: T) => {
    if (value === 'latest' || value === 'oldest') {
      setFilterOption(value);
    } else {
      setFilterOption1(value);
    }
  }, []);

  return (
    <div className="Home">
      <HeaderCom
        leftBtn={<ButtonCom btnText="<" styleType="default" onClick={decreaseDate} />}
        headerText={headerText}
        rightBtn={<ButtonCom btnText=">" styleType="default" onClick={increaseDate} />}
      />
      <ControlBox>
        <SelectCom optionList={optionList} filterOption={filterOption} setFilterOption={onSetFilterOption} />
        <SelectCom optionList={optionList1} filterOption={filterOption1} setFilterOption={onSetFilterOption} />
        <ButtonCom btnText="새로운 일기 쓰기" styleType="positive" onClick={() => navigator('/new')} />
      </ControlBox>
      <div>
        {FilteredDate().map((item) => (
          <DiaryList key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}

export default Home;

const ControlBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  select {
    font-family: 'Nanum Pen Script', cursive;
    font-size: 18px;
    margin-right: 10px;
  }
  button {
    font-size: 18px;
    flex-grow: 1;
  }
`;
