# ReactJS로 영화 웹 서비스 만들기 (노마드코더 React 기초)

 React, JSX를 이용해 편리한 웹개발 가능.
 

## 요약
 내가 이해한 바로는 js 안에서 React를 이용하여 html element를 다루고, 그 안에서 마저 JSX를 이용하여 js를 쓸 수 있다. JSX는 중괄호({}) 속에 작성한다.
 또 이 컴포넌트(React로 생성한 Element를 이렇게 부르는 듯)를 모듈화하여 사용하는 방식이다. (분할 정복)
 더 세분화, 목록화하기 위해 라우팅도 사용한다.
 개발중인 페이지가 자동으로 새로고침된다.

## 핵심기능
 ### useState
  React에서 변수를 사용할 때 useState로 각 변수를 수정하는 함수를 따로 지정하게하여 안전하게 유지한다. class의 private 변수를 수정하는 개념과 유사했다.
  const [var, setVar] = useState('초기값'); 이런식으로 사용한다. useState의 리턴값이 두개 임을 알 수 있다.
 
 ### useEffect
  React에서는 한 state(변수)가 갱신되면 그 state를 포함한 모든 컴포넌트(부모까지)를 새로 랜더링한다.

  이런 영화 정보 사이트가 있다고 하자. 사이트에 접속하면 영화 정보 api를 불러온다. 사용자는 검색창에 영화 제목을 검색해 정보를 탐색한다.

  이 때 api를 불러오는 행위는 단 한번 이루어져야한다. 상대적으로 굉장히 고된 작업이기 때문.
  이 때 useEffect가 없다면 사용자가 영화를 검색할 때마다 검색창 value를 담는 state가 갱신되므로 페이지는 api를 계속해서 불러올 것이다.
  따라서 이 때는 useEffect(()=>{fetch("url/api") ... }, []); 이런식으로 코드를 작성하여 처음에만 api를 불러오는 함수가 작동하도록 한다.
  useEffect는 두 번째 프로퍼티로 내가 주시하고자 하는 state를 담는 리스트를 받는다. 첫 로딩 때와 두 번째 프로퍼티 속에 담겨진 state가 갱신될 때에만 첫 번째로 담은 함수가 작동할 것이다.
 
 ### props
  부모 component에서 자식 component에 변수를 넘겨줄 수 있다. (Props)
  JSON형식으로 넘어간다.
  따라서 받을 때 const childComponent(prop1, prop2, ...){ } 이런 식으로 바로 JSON을 풀어서 각 변수에 저장할 수도 있다.
  넘겨줄 때와 받을 때 이름을 똑같이 작성해야한다. 아래는 예시이다.

  Home.js --

    <Movie
      id={movie.id}
      coverImg={movie.medium_cover_image}
      title={movie.title}
      summary={movie.summary}
      genres={movie.genres}
    />

  Movie.js --

    function Movie({ id, coverImg, title, summary, genres }) {
      return (
        <div>
          <img src={coverImg} alt={title} />
          <h2>
            <Link to={`/movie/${id}`}>{title}</Link>
          </h2>
          <p>{summary}</p>
          <ul>
            {genres.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </div>
      );
    }

 ### Router
  브라우저 라우터를 사용했다. 해쉬 라우터도 있다고 한다.
  react dom 6.0이상에서는 Switch 컴포넌트 대신 Routes를 쓴다. 이 컴포넌트는 여러 페이지를 한번에 하나씩 라우팅하도록 한다. 이게 없으면 동시에 여러개도 가능?.

  App.js
  ```js
  import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
  import Detail from "./routes/Detail";
  import Home from "./routes/Home";
  function App() {
    return (
      <Router>
        <Routes>
          <Route path="/hello" element={<h1>Hello</h1>}>
          </Route>
          <Route path="/movie/:id" element={<Detail />} /> ':'로 라우팅하는 컴포넌트(엘리먼트)에 파라미터를 전달한다.
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    );
  }
  export default App;
  ```
  
  :id로 전달받은 파라미터는 Detail.js에서 이런 식으로 받는다.
  
  const { id } = useParams();

  props와 마찬가지로 {}로 바로 풀어서 변수에 받는다.

  물론 이 컴포넌트들(Detail, Home)은 모두 해당 파일에서 export하고 라우팅하는 파일에서 import해야한다.

 ### Link
  Link라는 컴포넌트가 기본 탑재되어있다. (html의 l처럼)
  l 대신 Link를 쓰면 링크를 타고 가도 페이지가 새로고침되지 않아 빠른 페이지 전환이 가능함.

 ### 활용
  js의 삼항연산자를 활용하여 boolean 타입의 state를 만들고, 그에 따라 페이지 디자인을 스위칭할 수 있다.
  
  (component 함수 내부에서)
  ```js
  const [switched, setSwitched] = useState(false);
  return (switched ? <h1>Switched!</h1> : <h1>Not switched.</h1>) 이런 식.
  ```

  html의 li와 js의 list에 있는 map 함수를 이용해서 리스트 속 변수들을 한번에 가공해서 페이지에 담는게 가능하다.
  (component 함수 내부에서, genres는 prop으로 받아온 리스트)
  ```js
  <ul>
    {genres.map((g) => (
      <li key={g}>{g}</li>
    ))}
  </ul> 이런 식.
  ```