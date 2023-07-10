---
sidebar_position: 4
draft: true
---

# React State Management – Intermediate JavaScript Course

!youtube[-bEzt5ISACA]

[React State Management – Intermediate JavaScript Course](https://www.youtube.com/watch?v=-bEzt5ISACA)

상태관리란 무엇인가? 리액트의 절반입니다. 반은 스타일링이고 다른 반은 데이터고 그 데이터의 상태입니다. 리액트는 state가 바뀔 때만 리랜더링이 발생합니다. 웹개발 영역에서 리액트의 역할은 state를 UI로 바뀝니다.

리액트 hook들을 깊게 이해하고 상태관리하는 법을 배웁니다.

2부에서는 간접 state 관리법을 배웁니다. 리액트 쿼리로 서버 클라언트 state같은 것을 다룹니다.

3부는 직접 state관리하는 법입니다. 리덕스, jotai같은 라이브러리를 배웁니다.

모든 출발은 네이브 hook들을 잘 이해하는 것부터 시작합니다.

# useState

컴포넌트랑 관련된 데이터는 useState 속에 넣는 것으로 시작합니다.

```jsx
import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(10);
  const addOne = () => {
    count++;
  };
  return (
    <div className="App">
      <button onClick={addOne}>Count = {count}</button>
    </div>
  );
}

export default App;
```

이렇게 작성하면 state 업데이트가 당연히 정상동작할리가 없습니다. 이 부분은 거의 대부분 리액트 state 관리를 이해하기 위해 알아야 하는 부분입니다.

```js
const getState = () => {
  let value = 42;
  return value;
};

let myValue = getState(); // 42
myValue; // 42
myValue = 22;
myValue; // 22

let myValueAgain = getState();
myValueAgain; // 42
```

동작원리는 위 코드랑 유사합니다. 컴포넌트에 식별자에 로컬 value만 할당한 것 뿐입니다. state를 업데이트

scalars(원시형 중 Number, Boolean, String)은 value를 통해 값을 변형합니다. 하지만 참조형은 참조하고 있는 대상들을 통해 변형합니다. 그 대상과 그 복사본은 다릅니다.

당연히 setter함수를 통해 state를 업데이트하면 정상동작합니다.

```jsx
import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(10);
  const addOne = () => {
    setCount(count + 1);
  };
  return (
    <div className="App">
      <button onClick={addOne}>Count = {count}</button>
    </div>
  );
}

export default App;
```

state는 근본적으로 컴포넌트(인스턴스)별로 독립적입니다.

```jsx
import { useState } from 'react';
import './App.css';

function Counter() {
  const [count, setCount] = useState(10);

  function addOne() {
    setCount(count + 1);
  }

  return (
    <div className="App">
      <button onClick={addOne}>Count = {count}</button>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Counter />
    </div>
  );
}

export default App;
```

각각의 버튼은 각각의 state값을 갖습니다. 각각의 데이터는 독립적입니다.

참조형 예시입니다.

```jsx
function NameList() {
  const [list, setList] = useState(['Jack', 'Jill', 'John']);
  const [name, setName] = useState(() => 'Jack');
  const onAddName = () => {
    setList([...list, name]);
    setName('');
  };

  return (
    <div>
      <ul>
        {list.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={onAddName}>Add Name</button>
    </div>
  );
}
```

`setList([...list, name])`대신 `list.push(name)`으로 해결할 수 있기는 합니다.

자바스크립트 참조형은 참조대상으로 관리합니다. 그래서 돌아가기는 하지만 리액트는 state가 업데이트 되었다는 것을 모릅니다. setter함수의 다른 역할 중 하나는 리렌더링을 요청합니다.

리액트는 기존값과 현재값을 참조하고 다르면 리랜더링을 실행합니다. 동일하면 리랜더링을 하지 않습니다.

리액트 17, 18버전부터는 setter함수가 bach처럼 동작합니다. 큐자료구조로 동작을 setter함수 enqueue 순서로 동작합니다.

`const [name, setName] = useState(() => "Jack");`이런 식으로 콜백함수로 초깃값을 설정하는 것도 가능합니다. 이렇게 했을 때 생기는 장점은 복잡한 계산이 필요할 때 이 콜백함수에 작성하면 컴포넌트가 생성되었을 때 1번만 실행될 것이라고 보장받을 수 있습니다.

# useReducer

useReducer hook을 이해할 때는 배열의 reduce 메서드를 이해하는 것으로 출발하는게 좋습니다.

```js
const numbers = [10, 20, 30];

let total = 0;
for (const n of numbers) {
  total += n;
}

console.log(total); // 60
```

합을 구하는 원시적인 방법입니다.

```js
const numbers = [10, 20, 30];
console.log(numbers.reduce((cv, n) => cv + n, 0)); //60
```

정상적으로 합을 구하는 방법입니다. `cv`는 현재값을 의미합니다. `n`은 순회하는 값입니다. `n`을 `cv`에 계속 더하는 방식으로 합을 구하게 됩니다.

`reduce` 메서드에서 `(cv, n) => cv + n`은 reducer함수에 해당합니다. reducer함수는 매개변수를 갖습니다. 하나는 현재의 값과 새로운 값을 받습니다. `n`은 순회하면서 얻는 새로운 값입니다. `cv`는 기존에 존재하는 값입니다. 이런 패턴은 놀랍게도 리액트 2번 등장할 것입니다. `useReducer`인 네이티브 hook과 redux에서 등장합니다.

reduce 동작을 이해하는 것은 상당히 좋습니다.

useReducer는 아래처럼 시작합니다.

```jsx
import './App.css';
import { useReducer } from 'react';

function App() {
  const [state, dispatch] = useReducer((state, action) => {}, []);

  return <div className="App"></div>;
}

export default App;
```

useReducer를 보면 2번째 인자의 state를 대입합니다. useReducer는 원소 2개를 갖은 배열을 반환합니다. 첫번째는 현재 state입니다. 두번째는 dispatch입니다. dispatch는 변형할 수 있게 부르는(Invoke) 함수입니다.

useReducer함수의 첫번째는 인자는 콜백함수를 넣습니다. 콜백함수는 첫번째 매개변수로 state를 두번째 매개변수로 action을 넣습니다. action의 type에 따라 실행하는 로직이 달라집니다.

```jsx
import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import { useReducer } from 'react';

function App() {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'SET_NAME':
          // 리액트는 참조형의 주소를 비교하고 동일한지 다른지 비교합니다.
          // 안 동일하게 복사하고 복사본에 새롭게 변형합니다.
          // state 업데이트는 reducer 함수 내에서 발생합니다.
          return { ...state, name: action.payload };
        case 'ADD_NAME':
          return { ...state, name: [...state.names, action.payload], name: '' };
      }
    },
    { names: [], name: '' }
  );

  return (
    <div className="App">
      <input
        type="text"
        value={state.name}
        onChange={(e) =>
          // payload는 컨벤션상 자주 부르는 이름입니다.
          // dispatch를 통해 state를 업데이트를 요청 합니다.
          dispatch({ type: 'SET_NAME', payload: e.target.value })
        }
      />
      <div>{state.name}</div>
    </div>
  );
}

export default App;
```

컨벤션상 action은 대부분의 경우 Object입니다. 그리고 type 속성값을 갖고 있습니다. type에 따라 다르게 처리하도록 합니다.

payload는 관례상 사용하는 명명입니다. 함수에 전달할 데이터를 담습니다.

type과 payload는 자주 보는 이름이 될 것입니다.

`return { ...state, name: action.payload }`을 보면 복제된 데이터를 반환한다는 것을 알 수 있습니다. 새로운 객체를 만들어 변형을 가해야 다른 객체라는 것을 자바스크립트가 알 수 있습니다.

useReducer는 더욱더 복잡한 state 변형을 관리하는 방법입니다. 또 컴포넌트에 동속되지 말고 독립적으로 test도 가능합니다.

```jsx
import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import { useReducer } from 'react';

function App() {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'SET_NAME':
          // 리액트는 참조형의 주소를 비교하고 동일한지 다른지 비교합니다.
          // 안 동일하게 복사하고 복사본에 새롭게 변형합니다.
          return { ...state, name: action.payload };
        case 'ADD_NAME':
          return {
            ...state,
            names: [...state.names, state.name],
            name: '',
          };
      }
    },
    { names: [], name: '' }
  );

  return (
    <div className="App">
      <ul>
        {state.names.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
      <input
        type="text"
        value={state.name}
        onChange={(e) =>
          dispatch({ type: 'SET_NAME', payload: e.target.value })
        }
      />
      <div>{state.name}</div>
      <button
        onClick={() => {
          dispatch({ type: 'ADD_NAME' });
        }}
      >
        ADD Name
      </button>
    </div>
  );
}

export default App;
```

```jsx
function UserForm() {
  const [state, dispatch] = useReducer(
    (state, action) => ({ ...state, ...action }),
    {
      firstName: '',
      lastName: '',
    }
  );
  return (
    <div>
      <input
        type="text"
        value={state.firstName}
        onChange={(e) => dispatch({ firstName: e.target.value })}
      />
      <input
        type="text"
        value={state.lastName}
        onChange={(e) => dispatch({ lastName: e.target.value })}
      />
    </div>
  );
}
```

이런 방식으로 useReducer를 훨씬더 단순하게 사용할 수 있습니다. 객체가 많고 무거운 경우 사용할 수 있는 하나의 패턴입니다.

# useMemo & useCallback

useMemo & useCallback은 state를 관찰할 수 있는 hook입니다. 사실 state를 관찰할 수 있는 hook은 모두 3가지 입니다. useMemo, useCallback, useEffect입니다. 하지만 이번 강에서는 useMemo, useCallback만 다룹니다. useMemo는 계산된 값이라고 생각하면 이해하기 쉽습니다.

```jsx
import { useState } from 'react';
import './App.css';

function App() {
  const [numbers] = useState([10, 20, 30]);
  return <div className="App"></div>;
}

export default App;
```

여기서 합을 구하고 싶습니다.

```jsx
import { useState } from 'react';
import './App.css';

function App() {
  const [numbers] = useState([10, 20, 30]);
  const total = numbers.reduce((acc, number) => acc + number, 0);
  return <div className="App">{total}</div>;
}

export default App;
```

이렇게하면 일단 합을 구할 수 있습니다. 하지만 여기서 문제가 있습니다. 현실에서 데이터 사이즈는 항상 천문학적으로 거대합니다. 1000개 정도 되는 숫자를 매번 계산하는 것은 너무 비효율적입니다.

리액트의 컴포넌트가 리랜더링 되면 모든 함수를 다 실행합니다. 이미 계산된 값을 또 계산하는 것은 너무 비효율적입니다.

```jsx
import { useMemo, useState } from 'react';
import './App.css';

function App() {
  const [numbers] = useState([10, 20, 30]);
  const total = useMemo(() => {
    // numbers state값을 계산합니다.
    return numbers.reduce((acc, number) => acc + number, 0);
    // numbers 값이 이전 이후가 다른지 의존하고 확인합니다.
  }, [numbers]);
  return <div className="App">{total}</div>;
}

export default App;
```

useMemo가 동작하는 방식입니다. 첫번째 인자로 함수를 받습니다. 두번째 인자로 의존성 배열을 받습니다. 구독중인 state를 삽입해야 합니다.

useMemo는 2가지 상황에 사용하기를 권장합니다.

useMemo는 대부분의 경우 복잡한 계산이 필요한 경우 사용하는 것을 권장합니다. 매번 렌더링할 때마다 복잡한 계산할 때 사용하도록 합니다.

다른 하나는 객체 혹은 배열을 만들 때 사용하기를 권장합니다. 리액트는 state에서 참조를 통해 비교하기 때문에 권장합니다.

```jsx
import { useMemo, useState } from 'react';
import './App.css';

function App() {
  const [numbers] = useState([10, 20, 30]);
  const total = useMemo(() => {
    return numbers.reduce((acc, number) => acc + number, 0);
  }, [numbers]);

  const [names] = useState(['John', 'Paul', 'George', 'Ringo']);
  const sortedNames = [...names].sort();

  return (
    <div className="App">
      <div>total: {total}</div> {/* 60 */}
      <div>names: {names}</div> {/* JohnPaulGeorgeRingo */}
      <div>sortedNames: {sortedNames}</div> {/* GeorgeJohnPaulRingo */}
    </div>
  );
}

export default App;
```

일단 이렇게 하면 동작하기는 합니다. 하지만 랜더링할 때마다 sort를 실행하게 됩니다.

```jsx
import { useMemo, useState } from 'react';
import './App.css';

function App() {
  const [numbers] = useState([10, 20, 30]);
  const total = useMemo(() => {
    return numbers.reduce((acc, number) => acc + number, 0);
  }, [numbers]);

  const [names] = useState(['John', 'Paul', 'George', 'Ringo']);
  const sortedNames = useMemo(() => [...names].sort(), [names]);

  return (
    <div className="App">
      <div>total: {total}</div>
      <div>names: {names}</div>
      <div>sortedNames: {sortedNames}</div>
    </div>
  );
}

export default App;
```

이렇게 하면 2가지 사용해야 할 경우 모두 해당합니다. sort이고 배열이 어마어마하게 길어질 수 있습니다. 계산비용이 커질 수 있기 때문에 사용하는 게 좋을 것입니다. 또 참조형 자료형이기 때문에 적절합니다.

```jsx
import { useMemo, useState } from 'react';
import './App.css';

function App() {
  const [numbers] = useState([10, 20, 30]);
  const total = useMemo(() => {
    return numbers.reduce((acc, number) => acc + number, 0);
  }, [numbers]);

  const [names] = useState(['John', 'Paul', 'George', 'Ringo']);
  const sortedNames = useMemo(() => [...names].sort(), [names]);
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  const countTotal = useMemo(() => count1 + count2, [count1, count2]);
  return (
    <div className="App">
      <div>total: {total}</div>
      <div>names: {names}</div>
      <div>sortedNames: {sortedNames}</div>

      <button onClick={() => setCount1(count1 + 1)}>Count1: {count1}</button>
      <button onClick={() => setCount2(count2 + 1)}>Count2: {count2}</button>
      <div>Total: {countTotal}</div>
    </div>
  );
}

export default App;
```

하지만 안티패턴도 있습니다. 이런 경우 useMemo를 사용할 때 안티패턴입니다. 계산은 단순합니다. 그리고 원시형 자료형에 사용합니다. 이럴 경우 오히려 계산비용이 더 커집니다.

useMemo에 대한 허구들이 존재합니다. React Memo랑은 관련이 없습니다. 이름이 비슷해서 생각한 것일 수 있겠는데 각각 독립적인 것입니다. React Memo는 컴포넌트를 기록합니다.

useMemo는 성능 저하를 야기한다고 합니다. 클래식한 DP에서 메모리제이션은 케시로 역할합니다. DP에서 이 메모리제이션이 케시역을 하면서 야기하는 문제는 케시 사이즈가 거대해질 수 있어서 공간복잡성 문제가 극단적으로 커질 수 있어서 그렇습니다. useMemo는 1단계 메모리제이션입니다. 이게 부슨뜻이냐 하면 의존성 배열로 값이 동일한지 안 동일한지 비교하고 동일하면 동일한 계산 없이 이전 계산 결과를 돌려주기만 하고 다르면 새롭게 계산을 처리하는 것 뿐입니다. 그리고 그 결과를 저장만 하는 것입니다.

이런 이유로 성능저하가 있는 것은 아닙니다.

useCallback의 허구도 깨보겠습니다. 정말 많은 사람들이 써야 할 때 안 쓰고 안 써도 괜찮을 때 꼭 쓰는 hook입니다.

```jsx
import { useMemo, useState } from 'react';
import './App.css';

function SortedList({ list }) {
  //   console.log("랜더링마다 실행");
  const sortedList = useMemo(() => {
    // console.log("업데이트와 최초 랜더링에만 실행");
    return [...list].sort();
  }, [list]);
  return <div>names: {sortedList.join(', ')}</div>;
}

function App() {
  const [numbers] = useState([10, 20, 30]);
  const total = useMemo(() => {
    return numbers.reduce((acc, number) => acc + number, 0);
  }, [numbers]);

  const [names] = useState(['John', 'Paul', 'George', 'Ringo']);
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  const countTotal = useMemo(() => count1 + count2, [count1, count2]);
  return (
    <div className="App">
      <div>total: {total}</div>
      <div>names: {names.join(', ')}</div>
      <SortedList list={names} />

      <button onClick={() => setCount1(count1 + 1)}>Count1: {count1}</button>
      <button onClick={() => setCount2(count2 + 1)}>Count2: {count2}</button>
      <div>Total: {countTotal}</div>
    </div>
  );
}

export default App;
```

먼저 개별 컴포넌트로 분리입니다.

참고로 `console.log`를 보면 실행여부를 직접 관찰할 수 있습니다.

하지만 한계가 있습니다.

```jsx
import { useMemo, useState } from 'react';
import './App.css';

function SortedList({ list, sortFunc }) {
  console.log('여러번 실행');
  const sortedList = useMemo(() => {
    console.log('한번만 실행'); // 재 랜더링마다 실행여부를 확인할 수 있습니다.
    return [...list].sort(sortFunc);
  }, [list, sortFunc]);
  return <div>names: {sortedList.join(', ')}</div>;
}

function App() {
  const [numbers] = useState([10, 20, 30]);
  const total = useMemo(() => {
    return numbers.reduce((acc, number) => acc + number, 0);
  }, [numbers]);

  const [names] = useState(['John', 'Paul', 'George', 'Ringo']);
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  const countTotal = useMemo(() => count1 + count2, [count1, count2]);

  // 상속할 함수를 정의했습니다.
  const sortFunc = (a, b) => a.localeCompare(b);
  return (
    <div className="App">
      <div>total: {total}</div>
      <div>names: {names.join(', ')}</div>
      {/* sortFunc={sortFunc}으로 새로운 함수를 전달합니다. */}
      <SortedList list={names} sortFunc={sortFunc} />

      <button onClick={() => setCount1(count1 + 1)}>Count1: {count1}</button>
      <button onClick={() => setCount2(count2 + 1)}>Count2: {count2}</button>
      <div>Total: {countTotal}</div>
    </div>
  );
}

export default App;
```

이럴 때 사용할 것이 useCallback입니다. 리액트는 최초 랜더링 이후 useState를 실행할 때마다 리렌더링됩니다. 리렌더링을 하게 되면 컴포넌트 내 모든 코드를 실행하게 됩니다. 여기서 함수 정의도 다시 정의하고 사용하게 되는 것입니다.

참고로 상속할 함수를 컴포넌트 밖에 선언하는 것도 방법이지만 코드베이스를 유지보수 할 수 없게 됩니다.

```jsx
import { useMemo, useState, useCallback } from 'react';
import './App.css';

function SortedList({ list, sortFunc }) {
  console.log('여러번 실행');
  const sortedList = useMemo(() => {
    console.log('한번만 실행');
    return [...list].sort(sortFunc);
  }, [list, sortFunc]);
  return <div>names: {sortedList.join(', ')}</div>;
}

function App() {
  const [numbers] = useState([10, 20, 30]);
  const total = useMemo(() => {
    return numbers.reduce((acc, number) => acc + number, 0);
  }, [numbers]);

  const [names] = useState(['John', 'Paul', 'George', 'Ringo']);
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  const countTotal = useMemo(() => count1 + count2, [count1, count2]);

  // useCallback의 의존성 배열은 비어있습니다.
  const sortFunc = useCallback((a, b) => a.localeCompare(b), []);
  return (
    <div className="App">
      <div>total: {total}</div>
      <div>names: {names.join(', ')}</div>
      <SortedList list={names} sortFunc={sortFunc} />

      <button onClick={() => setCount1(count1 + 1)}>Count1: {count1}</button>
      <button onClick={() => setCount2(count2 + 1)}>Count2: {count2}</button>
      <div>Total: {countTotal}</div>
    </div>
  );
}

export default App;
```

이렇게 하면 됩니다.

useCallback은 onClick, onChange에 함수를 자식 컴포넌트에 상속할 때 많이 사용합니다.

하지만 제어된 input처럼 현재 컴포넌트 내에서 onChange에 사용하는 것은 오히려 비효율적입니다.

useCallback은 CustomHook을 만들 때 사용하기를 권장합니다. 어디에 어떻게 사용될지 잘 모르기 때문에 사용합니다.

# useEffect

사실 개념적으로 복잡하기 보단 치명적인 실수(foot gun)할 가능성이 가장 큰 hook입니다. 리액트의 무한 루프의 주 범인입니다.

useEffect는 API요청할 때 아주 많이 사용하는 hook입니다.

```jsx
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [names, setNames] = useState([]);

  fetch('/names.json')
    .then((res) => res.json())
    .then((data) => setNames(data));

  return <div className="App">Names: {names.join(', ')}</div>;
}

export default App;
```

일단 이렇게 하면 동작합니다. 하지만 앱을 폭파됩니다. 결론은 무한 루프입니다. 최초 랜더링을 하고 state를 정의하고 나면 바로 fetch를 실행합니다. 비동기적으로 통신 결과를 받으면 setName으로 state를 업데이트 합니다. 하지만 이렇게 되면 App 컴포넌트를 다시 실행해서 랜더링하고 랜더링하면서 다시 fetch를 실행하고 무한 루프가 발생합니다.

useEffect는 DOM이 랜더링이 된 이후까지 기다린 다음에 실행합니다. 실행을 지연시키고 의존성 배열의 값에 따라 실행합니다.

```jsx
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [names, setNames] = useState([]);

  useEffect(() => {
    fetch('/names.json')
      .then((res) => res.json())
      .then((data) => setNames(data));
  }, []);

  return <div className="App">Names: {names.join(', ')}</div>;
}

export default App;
```

이렇게 하면 정상 동작합니다. 참고로 리액트를 보면 2번 실행하는 경우를 많이 볼 것입니다. 사실 개발하는 동안에는 큰 문제가 아닙니다. 먼저 React.StrictMode가 동작하는 원리를 이해해야 합니다. 개발하는 동안 마운트되면 렌더링합니다. 언마운트되면 클린업 함수를 실행합니다. 참고로 이 예시에서는 없습니다. 하지만 리마운트를 잠시합니다. 리마운트가 useEffect를 다시 호출합니다. 이래서 2번 호출하게 된 것입니다.

```jsx
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [names, setNames] = useState([]);

  useEffect(() => {
    fetch('/names.json')
      .then((res) => res.json())
      .then((data) => setNames(data));
  }, []);

  const [selectedName, setSelectedName] = useState(null);

  const [selectedNameDetails, setSelectedNameDetails] = useState(null);

  useEffect(() => {
    fetch(`/${selectedName}.json`)
      .then((res) => res.json())
      .then((data) => setSelectedNameDetails(data));
  }, [selectedName]);

  return (
    <div className="App">
      {names.map((name, index) => (
        <button key={index} onClick={() => setSelectedName(name)}>
          {name}
        </button>
      ))}
      <div>{JSON.stringify(selectedNameDetails)}</div>
    </div>
  );
}

export default App;
```

현재 이렇게 있습니다. 여기서 서버랑 동기적으로 통신하는 전략입니다. 하지만 문제가 있습니다. 존재하지 않는 요청인 `null`을 보내게 되는 것입니다.

```jsx
useEffect(() => {
  if (selectedName) {
    fetch(`/${selectedName}.json`)
      .then((res) => res.json())
      .then((data) => setSelectedNameDetails(data));
  }
}, [selectedName]);
```

이럴 때는 그냥 if로 감싸면 됩니다. 단순하게 생각해서 해결하면 됩니다.

하지만 이것은 올바르지 않은 방법입니다. 사용자의 이벤트에 따라 대응만하고 있습니다. 프로그래머가 할 일은 콜백 속에서 처리해야 합니다.

```jsx
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [names, setNames] = useState([]);

  useEffect(() => {
    fetch('/names.json')
      .then((res) => res.json())
      .then((data) => setNames(data));
  }, []);

  const [selectedNameDetails, setSelectedNameDetails] = useState(null);

  const onSelectedNameChange = (name) => {
    fetch(`${name}.json`)
      .then((res) => res.json())
      .then((data) => setSelectedNameDetails(data));
  };

  return (
    <div className="App">
      {names.map((name, index) => (
        <button key={index} onClick={() => onSelectedNameChange(name)}>
          {name}
        </button>
      ))}
      <div>{JSON.stringify(selectedNameDetails)}</div>
    </div>
  );
}

export default App;
```

서버랑 통신할 때 `onClick` 콜백함수로 처리하는게 올바릅니다.

useState랑 useEffect를 억지로 섞는 경우가 많습니다. 이벤트 단순한 대응하는 것은 단순하게 이벤트를 최대한 간단하게 대응하면 됩니다. 서버랑 통신하는 것처럼 몇가지 정말 필요한 경우만 사용하고 그 이외에는 최대한 자제하기를 권장합니다.

useEffect를 사용하기 어려운 경우가 있습니다. 데이터가 업데이트 되는 것에 useEffect를 사용해야 하는 경우가 있습니다.

```jsx
import { useState, useEffect } from 'react';
import './App.css';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  useEffect(() => {
    setInterval(() => {
      setTime(time + 1);
    }, 1000);
  }, []);

  return <div>Time: {time}</div>;
};

function App() {
  return (
    <div className="App">
      <Stopwatch />
    </div>
  );
}

export default App;
```

예를 들면 이런 경우입니다. 하지만 이렇게 되면 1보다 더 커지지 않습니다.

```jsx
import { useState, useEffect } from 'react';
import './App.css';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  useEffect(() => {
    setInterval(() => {
      console.log(time);
      // 기존에는 time + 1에서 (time) => time + 1으로 바꿨습니다.
      setTime((time) => time + 1);
    }, 1000);
  }, []);

  return <div>Time: {time}</div>;
};

function App() {
  return (
    <div className="App">
      <Stopwatch />
    </div>
  );
}

export default App;
```

이렇게 작성하면 정상동작합니다. 원래 값에서 콜백함수로 변형한 것이 문제를 해결합니다. 당연히 기존값을 참조하고 그값을 기준으로 업데이트하기 때문입니다.

클린업 함수를 통해서 언마운트 된 컴포넌트에서 불필요한 메모리 낭비를 없애도록 사용합니다.

useEffect는 Custom hook에 반드시 활용할 수 밖에 없기 때문에 반드시 익혀야 합니다.

setter함수에 단순히 값을 넣는 것과 콜백을 대입하는 것과 원시형을 대입하는 것의 차이는 일반적인 면접 질문입니다. 잘 익히도록 합니다.

# useRef

useRef도 state를 제어할 수 있는 도구입니다. useRef는 데이터에 변형이 가해져도 리렌더링을 초리하지 않습니다.

useRef는 2가지 용법으로 사용합니다. 하나는 DOM요소를 선택하는 것입니다.

```jsx
import { useRef } from 'react';
import './App.css';

function App() {
  const inputRef = useRef(null);
  return (
    <div className="App">
      <input type="text" ref={inputRef} />
    </div>
  );
}

export default App;
```

이렇게 하면 DOM요소를 선택할 수 있습니다. 하지만 여기서 처음 페이지를 접했을 때 focus를 하고 싶습니다.

```jsx
import { useRef, useEffect } from 'react';
import './App.css';

function App() {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <div className="App">
      <input type="text" ref={inputRef} />
    </div>
  );
}

export default App;
```

이렇게 하면 됩니다. 꽤 많은 사람들이 이런 용도로 사용하고 있습니다. 최초 접근에 useEffect로 1번만 실행되도록 하면 됩니다.

하지만 state 업데이트 없이 데이터를 저장하는 용도로도 사용할 수 있습니다.

```jsx
import { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const [names, setNames] = useState([]);

  onAddName = () => {
    setNames([...names, inputRef.current.value]);
  };
  return (
    <div className="App">
      <div>
        {names.map((name) => (
          <div key={name}>name</div>
        ))}
      </div>
      <input type="text" ref={inputRef} />
      <button>Add Name</button>
    </div>
  );
}

export default App;
```

이것은 비제어 input입니다. 아주 빠르고 간단하게 제어할 수 있습니다.

```jsx
import { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const [names, setNames] = useState([
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
  ]);

  const onAddName = () => {
    setNames([
      ...names,
      {
        // id를 동적으로 업데이트 해줘야 합니다.
        id: 10,
        name: inputRef.current.value,
      },
    ]);
  };
  return (
    <div className="App">
      <div>
        {names.map((name) => (
          <div key={name.id}>{name.name}</div>
        ))}
      </div>
      <input type="text" ref={inputRef} />
      <button onClick={onAddName}>Add Name</button>
    </div>
  );
}

export default App;
```

여기가 useRef가 유용한 경우입니다. 이미 저정되어 있고 서버에서 가져올 사용자는 동적으로 다양할 것입니다. 하지만 굳이 useState로 제어하기에는 불필요한 리렌더링을 초래하게 됩니다. 또 권장하지 않는 방식이지만 key도 동일한 값이 여러번 입력될 것입니다.

```jsx
import { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const inRef = useRef(1);
  const [names, setNames] = useState([
    { id: inRef.current++, name: 'John' },
    { id: inRef.current++, name: 'Jane' },
  ]);

  const onAddName = () => {
    setNames([
      ...names,
      {
        id: inRef.current++,
        name: inputRef.current.value,
      },
    ]);
  };
  return (
    <div className="App">
      <div>
        {names.map((name) => (
          <div key={name.id}>{name.name}</div>
        ))}
      </div>
      <input type="text" ref={inputRef} />
      <button onClick={onAddName}>Add Name</button>
    </div>
  );
}

export default App;
```

이런 방법으로 제어할 수 있습니다. 불필요한 랜더링 비용을 초래하지 않습니다.
