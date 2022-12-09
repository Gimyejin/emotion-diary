import React, { useEffect, useReducer, useRef } from 'react';

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';

//Components
import MyButton from './components/MyButton';
import MyHeader from './components/MyHeader';

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case 'INIT': {
      return action.data
    }
    case 'CREATE': {
      newState = [action.data, ...state];
      break;
    }
    case 'REMOVE': {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case 'EDIT': {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it)
      break;
    }
    default:
      return state;
  }

  localStorage.setItem('diary', JSON.stringify(newState));
  return newState;
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();
export const DiaryEmotionContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);

  useEffect(() => {
    const localData = localStorage.getItem('diary');
    if (localData) {
      const diaryList = JSON.parse(localData).sort((a, b) => parseInt(b.id) - parseInt(a.id));//정렬 내림차순
      dataId.current = parseInt(diaryList[0].id) + 1;

      dispatch({ type: 'INIT', data: diaryList });
    }
  }, [])
  const emotionList = [
    {
      emotion_id: 1,
      emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
      emotion_descript: '완전 좋음'
    },
    {
      emotion_id: 2,
      emotion_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
      emotion_descript: '좋음'
    },
    {
      emotion_id: 3,
      emotion_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
      emotion_descript: '그럭저럭'
    },
    {
      emotion_id: 4,
      emotion_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
      emotion_descript: '나쁨'
    },
    {
      emotion_id: 5,
      emotion_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
      emotion_descript: '끔찍함'
    },
  ]



  //creat
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current++;
  }
  //remove
  const onRemove = (targetId) => {
    dispatch({
      type: "REMOVE",
      targetId
    })
  }
  //edit
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion
      }
    })
  }


  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider
        value={{
          onCreate, onRemove, onEdit,
        }}>
        <DiaryEmotionContext.Provider value={emotionList}>
          <BrowserRouter>
            <div className='App'>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/new' element={<New />} />
                <Route path='/edit/:id' element={<Edit />} />
                <Route path='/diary/:id' element={<Diary />} />
              </Routes>
            </div>
          </BrowserRouter>
        </DiaryEmotionContext.Provider>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider >
  );
}

export default App;
