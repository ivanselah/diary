import './scss/styles.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import New from './views/New';
import Diary from './views/Diary';
import Edit from './views/Edit';
import { createContext, useEffect, useReducer, useRef } from 'react';

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case 'INIT': {
      return action.data;
    }
    case 'CREATE': {
      newState = [action.data, ...state];
      break;
    }
    case 'REMOVE': {
      newState = state.filter((item) => item.id !== action.targetId);
      break;
    }
    case 'EDIT': {
      newState = state.map((item) => (item.id === action.data.id ? { ...action.data } : item));
      break;
    }
    default:
      return state;
  }
  localStorage.setItem('diary', JSON.stringify(newState));
  return newState;
};

export const DiaryStateContext = createContext({});
export const DiaryDispatchContext = createContext({});

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);

  useEffect(() => {
    const diaryList = localStorage.getItem('diary');
    if (diaryList) {
      if (diaryList.length > 0) {
        const diaryListTemp = JSON.parse(diaryList).sort((a, b) => Number(b.id) - Number(a.id));
        if (diaryListTemp[0]) {
          dataId.current = Number(diaryListTemp[0].id) + 1;
          dispatch({ type: 'INIT', data: JSON.parse(diaryList) });
        }
      }
    }
  }, []);

  const onCreate = (date, content, emotion) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };

  const onRemove = (targetId) => {
    dispatch({ type: 'REMOVE', targetId });
  };

  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: 'EDIT',
      targetId,
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  return (
    <div className="App">
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{ onCreate, onRemove, onEdit }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </BrowserRouter>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </div>
  );
}

export default App;
