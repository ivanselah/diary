import React from 'react';
import styled from 'styled-components';
import { FilterOption, FilterOption1 } from '../Home';

type OptionListProps = {
  name: string;
  value: string;
};

const SelectCom = <T extends FilterOption | FilterOption1>({
  optionList,
  filterOption,
  setFilterOption,
}: {
  optionList: OptionListProps[];
  filterOption: T;
  setFilterOption: (value: T) => void;
}) => {
  return (
    <MySelect value={filterOption} onChange={(e) => setFilterOption(e.currentTarget.value as T)}>
      {optionList.map((item) => (
        <option key={item.name} value={item.name}>
          {item.value}
        </option>
      ))}
    </MySelect>
  );
};

export default React.memo(SelectCom);

const MySelect = styled.select`
  padding: 10px 10px;
  border: none;
  background-color: #e2e2e2;
  border-radius: 5px;
  margin-bottom: 15px;
`;
