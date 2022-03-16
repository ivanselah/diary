import './scss/styles.scss';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import New from './views/New';
import Diary from './views/Diary';
import Edit from './views/Edit';
import MyButton from './components/MyButton';
import MyHeader from './components/MyHeader';
import { createContext, useReducer, useRef } from 'react';

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
  return newState;
};

export const DiaryStateContext = createContext({});
export const DiaryDispatchContext = createContext({});

const dummyData = [
  {
    id: 1,
    emotion: 1,
    content: '오늘의 일기 1번',
    date: 1647410372173,
  },
  {
    id: 2,
    emotion: 2,
    content: '오늘의 일기 2번',
    date: 1647410372174,
  },
  {
    id: 3,
    emotion: 3,
    content: '오늘의 일기 3번',
    date: 1647410372175,
  },
  {
    id: 4,
    emotion: 4,
    content: '오늘의 일기 4번',
    date: 1647410372176,
  },
  {
    id: 5,
    emotion: 5,
    content: '오늘의 일기 5번',
    date: 1647410372177,
  },
];

function App() {
  const [data, dispatch] = useReducer(reducer, dummyData);
  const dataId = useRef(0);

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
