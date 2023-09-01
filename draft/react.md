## reducer return list

```tsx
const initialState: string[] = ['프론트엔드', '백엔드', '풀스택'];

const reducer = (
  _state: string[],
  action: { type: LargeCategoryType }
): string[] => {
  switch (action.type) {
    case '웹':
      return ['프론트엔드', '백엔드', '풀스택'];
    case '앱':
      return ['안드로이드', 'iOS', '리액트 네이티브', '플러터'];
    case '소프트웨어':
      return ['사무자동화', '공장자동화', 'ERP', '유니티', '언리얼', '기타'];
    case '데이터':
      return ['데이터 엔지니어링', '머신러닝 엔지니어링', '데이터 사이언스'];
    case '블록체인':
      return ['블록체인'];
    case '데브옵스':
      return ['데브옵스'];
    case 'IoT/임베디드':
      return ['IOT,임베디드'];
    case '보안':
      return ['보안'];
    default:
      return ['기타'];
  }
};

const FieldDropDown = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleLargeCategory = (item: LargeCategoryType) => {
    dispatch({ type: item });
  };

  return (
    <FieldDropDownContainer>
      <ul>
        {field.map((item) => (
          <FiledItemContainer
            onMouseOver={() => handleLargeCategory(item)}
            key={item.toString()}
          >
            {item}
          </FiledItemContainer>
        ))}
      </ul>
      <Divider />
      <ul>
        {state.map((item) => (
          <FiledItemContainer key={item.toString()}>{item}</FiledItemContainer>
        ))}
      </ul>
    </FieldDropDownContainer>
  );
};
```

조금 예시를 바꾸니 당황했습니다.

### 좋은 리액트 코드의 기준

- JSX 컴포넌트는 상태가 없을수록 좋은 코드입니다. 상태는 최대한 hook에서 제어하고 JSX에 주입하는 방식으로 제어할 것을 권장합니다.

### button form submit 테스트 코드

```tsx
it('should invoke the function when the button is call from form', async () => {
  user.setup();
  const btnText = 'Button';
  const mock = vi.fn((e) => e.preventDefault());

  render(
    <form onSubmit={mock}>
      <Button>{btnText}</Button>
    </form>
  );
  const btnElement = screen.getByRole('button');
  await user.click(btnElement);

  expect(btnElement).toBeInTheDocument();
  expect(mock).toHaveBeenCalledTimes(1);
});
```

form을 테스트할 때는 조금 특이합니다. 클릭 시점에 초기화 때문인지 모르겠는데 `preventDefault`가 필요합니다.

```tsx
it('should invoke the function when the button is call from form', async () => {
  user.setup();
  const btnText = 'Button';
  const mock = vi.fn((e) => e.preventDefault());

  render(
    <form onSubmit={mock}>
      <Button>{btnText}</Button>
    </form>
  );
  const btnElement = screen.getByRole('button');
  const linkElement = screen.queryByRole('link');
  await user.click(btnElement);

  expect(linkElement).not.toBeInTheDocument();
  expect(btnElement).toBeInTheDocument();
  expect(mock).toHaveBeenCalledTimes(1);
});
```

`queryByRole`은 존재하지 않을 수 있을 때 활용합니다.
