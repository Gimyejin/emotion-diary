### 1. react router
```
$ npm install react-router-dom@6
```
react router 공식문서 주소 : https://reactrouter.com/


### 2. Routes
```javascript
import { BrowserRouter, Route, Routes } from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <h2>App.js</h2>
        <Routes>
          <Route path='/' element={<Home />} /> 
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

```
- Route는 실질적으로 url경로와 컴포넌트를 맵핍시켜주는 컴포넌트이다.
