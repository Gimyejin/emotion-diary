import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';

//Components
import MyButton from './components/MyButton';


function App() {
  //process.env.PUBLIC_UR가 작동하지 않을 경우
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";
  return (
    <BrowserRouter>
      <div className='App'>
        <h2>App.js</h2>

        <MyButton text={'P 버튼'}
          onClick={() => { alert('버튼 클릭') }}
          type={'positive'} />
        <MyButton text={'N 버튼'}
          onClick={() => { alert('버튼 클릭') }}
          type={'negative'} />
        <MyButton text={'D 버튼'}
          onClick={() => { alert('버튼 클릭') }} />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/new' element={<New />} />
          <Route path='/edit' element={<Edit />} />
          <Route path='/diary/:id' element={<Diary />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
