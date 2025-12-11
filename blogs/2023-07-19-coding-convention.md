---
title: '리액트 코딩 컨벤션'
authors: [arch-spatula]
tags: ['react', '코딩 컨벤션']
description: '개인적으로 적용하고 있는 리액트 코딩 컨벤션입니다. 일부는 차용했습니다. 또 배운 것이 있으면 추가할 것입니다.'
toc_max_heading_level: 6
date: 2023-07-19
---

# 리액트 코딩 컨벤션

개인적으로 적용하고 있는 리액트 코딩 컨벤션입니다. 일부는 차용했습니다. 또 배운 것이 있으면 추가할 것입니다.

<!--truncate-->

## top level, return 아래 helper 함수는 function 키워드

- 코드를 읽을 때 제일 중요한 함수를 최상단에 위치시킵니다.
- function 키워드는 호이스팅(hoisting)의 장점을 활용합니다.

```tsx
const SubComponent = () => {
  return <div>Not Important</div>;
};

const Component = () => {
  return <SubComponent />;
};
```

중요한 것을 미괄식으로 표현하고 있습니다. 중요한 것을 보기 위해 스크롤을 내려야 하는 노력이 발생합니다. 또 가끔 중간에 배치하는 경우도 있는데 있때는 중괄식이 되고 중요한것을 한번에 파악하기 어렵습니다.

```tsx
function Component() {
  return <SubComponent />;
}

function SubComponent() {
  return <div>Not Important</div>;
}
```

호이스팅이 중요한 것을 두괄식으로 표현할 수 있게 해줍니다.

## callback, 이벤트 handler 함수는 화살표함수

```tsx
function Component(init = '') {
  const changeInputVal = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputVal(e.target.value);
    },
    []
  );

  const resetInputVal = () => {
    setInputVal(init);
  };

  return { inputVal, changeInputVal, resetInputVal, focusInput, inputRef };
}
```

## hook과 handler 영역 구분하기

관심사에 맞지 않은 hook과 handler가 섞이고 결합되는 방지하기 위해 영역을 구분합니다.

```tsx
function Component() {
  const handleSomething = () => {};

  return { handleSomething };
}
```

hook과 handler가 섞여 있습니다. 나중에 다양한 hook과 handler들이 추가되면 관심사에 맞는 코드를 구분하기 어려워집니다. 또 추출도 어려워집니다.

```tsx
function Component() {
  // hook 영역 시작 -------------------------------------------------------------
  const [inputVal, setInputVal] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // hook 영역 종료 & handler 영역 시작 -------------------------------------------
  const changeInputVal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  // handler 영역 종료 & JSX 영역 시작 --------------------------------------------
  return <input value={inputVal} onChange={changeInputVal} ref={inputRef} />;
  // JSX 영역 종료 = ------------------------------------------------------------
}
```

JSX에 주입하고 이벤트를 처리할 함수와 hook이라는 관심사를 분리합니다.

## useEffect는 custom hook에서 사용

라이프 사이클이외 관심사에 맞지 않은 handler 함수를 주입할지도 모릅니다.

```tsx
function Component() {
  const { handleBar } = useFoo('');
  const { handleQux } = useBaz('');

  useEffect(() => {
    handleBar();
    handleQux();
  }, []);

  return <NotImportant />;
}
```

라이프사이클에 각각 다른 관심사가 하나로 결합되었습니다. 하나의 handler는 update에 구독해야 하고 다른 함수는 mount시점만 필요하면 분리가 필요합니다.

```tsx
function Component() {
  useCorge('');
  useGrault('');

  return <NotImportant />;
}

function useCorge() {
  const { handleBar } = useFoo('');

  useEffect(() => {
    handleBar();
  }, []);

  return {};
}

function useGrault() {
  const { handleQux, graply } = useBaz('');

  useEffect(() => {
    handleQux();
  }, [graply]);
  return {};
}
```
