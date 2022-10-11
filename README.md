### 1.react router
```
$ npm install react-router-dom@6
```
react router 공식문서 주소 : https://reactrouter.com/


### 2.Routes
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

### 3.페이지 이동 (Link)
이전 html에서는 a태그를 이용하여 이동하였지만 그 방식은 MPA(Multiple Page Application)방식 페이지가 이동할 때 마다 새로고침이 발생한다.
- a 태그를 사용하게 되는 경우는 우리 페이지에서 외부로 나갈때 사용

##### Link는 클릭이나 탭을 하여 다른 페이지로 이동할 수 있는 요소이다
a 태그에서 url경로를 명시할 때 href를 사용했다면, Link는 to로 url경로를 명시한다.

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
-> 실제로 페이지가 이동되는것보다는 페이지 역할을 하는 컴포넌트와 url를 바꿔끼는 방식이라고 생각하자.

<details>
  <summary> Link 문서 중 </summary>

 1. 상대적인 <Link to> 값(/로 시작하지 않음)은 부모 경로에 대해 상대적으로 확인되며, 이는 해당 <Link>를 렌더링한 경로와 일치하는 URL 경로를 기반으로 작성됨을 의미합니다.
  
 2. 계층 위로 더 올라가는 경로에 연결하기 위해 '..'를 포함할 수 있습니다. 이 경우 '..'는 명령줄 cd 함수와 동일하게 작동합니다. 
  
 3. 각 함수는 다음과 같습니다. 상위 경로의 한 세그먼트를 제거합니다.
  

-> Link 문서 : https://reactrouter.com/en/main/components/link
  </datails>

