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



![ex_screenshot](./img/img1.png) 

위의 코드를 저장하면 다음과 같은 화면이 출력된다.

```javascript
//나머지 경로도 맵핑
<Route path='/' element={<Home />} />
<Route path='/new' element={<New />} />
<Route path='/edit' element={<Edit />} />
<Route path='/diary' element={<Diary />} />
```

### 페이지 이동 (Link)
이전 html에서는 a태그를 이용하여 이동하였지만 그 방식은 MPA(Multiple Page Application)방식 페이지가 이동할 때 마다 새로고침이 발생한다.
- a 태그를 사용하게 되는 경우는 우리 페이지에서 외부로 나갈때 사용

##### Link는 클릭이나 탭을 하여 다른 페이지로 이동할 수 있는 요소이다
a 태그에서 url경로를 명시할 때 href를 사용했다면,

Link는 to로 url경로를 명시한다.

```javascript
import { Link } from "react-router-dom";
const RouteTest = () => {
    return <>
        <Link to={'/'}>Home</Link>
        <br />
        <Link to={'/diary'}>Diary</Link>
        <br />
        <Link to={'/new'}>New</Link>
        <br />
        <Link to={'/edit'}>Edit</Link>
    </>
}
export default RouteTest;
```
Link 문서 : https://reactrouter.com/en/main/components/link

