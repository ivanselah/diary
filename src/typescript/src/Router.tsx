import { createContext, useEffect, useReducer, useRef } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Home from './Home';
import Detail from './views/Detail';
import Edit from './views/Edit';
import New from './views/New';

export type StateProps = {
  id: number;
  date: number;
  content: string;
  emotion: number;
};

type StateAction = {
  type: 'INIT' | 'CREATE' | 'EDIT' | 'REMOVE';
  data: StateProps;
  targetId?: number;
};

const reducer = (state: StateProps[], action: StateAction) => {
  switch (action.type) {
    case 'INIT': {
      if (Array.isArray(action.data) && action.data.length > 0) {
        return action.data;
      } else {
        return state;
      }
    }
    case 'CREATE': {
      const newDate: StateProps = {
        id: action.data.id,
        date: action.data.date,
        content: action.data.content,
        emotion: action.data.emotion,
      };
      localStorage.setItem('diary', JSON.stringify([newDate, ...state]));
      return [newDate, ...state];
    }
    case 'EDIT': {
      const targetData = state.find((item) => item.id === action.targetId);
      const newList = state.map((item) => (item.id === targetData?.id ? { ...action.data } : item));
      localStorage.setItem('diary', JSON.stringify([...newList]));
      return newList;
    }
    case 'REMOVE': {
      const newList = state.filter((item) => item.id !== action.targetId);
      localStorage.setItem('diary', JSON.stringify([...newList]));
      return newList;
    }
    default:
      return state;
  }
};

interface I_DiaryListContext {
  diaryList: StateProps[];
}

interface I_DiaryDispatchContext {
  onCreate: (date: number, content: string, emotion: number) => void;
  onEdit: (targetId: number, date: number, content: string, emotion: number) => void;
  onRemove: (targetId: number) => void;
}

export const DiaryListContext = createContext({} as I_DiaryListContext);
export const DiaryDispatchContext = createContext({} as I_DiaryDispatchContext);

function Routers() {
  const [diaryList, dispatch] = useReducer(reducer, []);
  const idRef = useRef<number>(0);

  useEffect(() => {
    const storageList = localStorage.getItem('diary');
    if (storageList) {
      const data = JSON.parse(storageList);
      if (data && data.length > 0) {
        let indexCheck;
        indexCheck = data;
        const currentIndex = (indexCheck as StateProps[]).sort((a, b) => b.id - a.id)[0].id;
        console.log(currentIndex);
        idRef.current = currentIndex + 1;
        dispatch({ type: 'INIT', data });
      }
    }
  }, []);

  const onCreate = (date: number, content: string, emotion: number) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: idRef.current,
        date,
        content,
        emotion,
      },
    });
    idRef.current += 1;
  };

  const onEdit = (targetId: number, date: number, content: string, emotion: number) => {
    dispatch({
      type: 'EDIT',
      targetId,
      data: {
        id: targetId,
        date,
        content,
        emotion,
      },
    });
  };

  const onRemove = (targetId: number) => {
    const data = { id: 0, content: '', emotion: 0, date: 0 };
    dispatch({ type: 'REMOVE', data, targetId });
  };

  return (
    <RoutersComponent className="Routers">
      <DiaryListContext.Provider value={{ diaryList }}>
        <DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/detail/:id" element={<Detail />} />
              <Route path="/*" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </DiaryDispatchContext.Provider>
      </DiaryListContext.Provider>
    </RoutersComponent>
  );
}

export default Routers;

const RoutersComponent = styled.div`
  min-height: 90vh;
  padding: 20px;
  @media (min-width: 650px) {
    width: 640px;
  }
  @media (max-width: 650px) {
    width: 90vw;
  }
`;
