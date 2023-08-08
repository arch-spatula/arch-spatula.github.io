---
title: '에러 바운더리 적용'
authors: [arch-spatula]
tags: ['react', 'error boundary', '예외처리']
description: '리액트에서 컴포넌트 차원에서 예외처리하는 방법입니다. 에러를 발생할 수 있고 우아하게 처리하는 방법을 소개합니다.'
toc_max_heading_level: 6
---

# 에러 바운더리 적용

리액트에서 컴포넌트 차원에서 예외처리하는 방법입니다. 에러를 발생할 수 있고 우아하게 처리하는 방법을 소개합니다.

물론 저의 방법은 우아하지 않습니다.

참고로 저는 React-Query와 조합해서 사용하는 것도 다룹니다.

<!--truncate-->

<!--

아래 링크는 별로 유용하지 않음

<iframe class="codepen" src="https://www.youtube.com/embed/0LpLxEUephc" title="🏆 React component props like a senior dev" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

https://www.youtube.com/watch?v=0LpLxEUephc

-->

## 미설치 방법

활용할 수 있는 전략이지만 UX/UI 디자이너였던 저로서는 별로 좋은 방법이라고 안 봅닙니다. 저는 사용자에게 최대한 피드백을 제공해야 한다고 봅니다. 하지만 이런 방법을 활용하면 Error 객체의 메시지를 확인할 수 없어서 장애가 발생했는데 무슨이유로 발생했는지 모릅니다.

유저가 싫어하는 것은 무력감입니다. 사용자가 싫어하는 것은 긴 대기 시간이 아니라 대기시간 동안 아무것도 할 수 없는 무력감을 싫어합니다.

유저에게 에러의 종류를 보여주면 해당 회사에게 보고할 수 있습니다. 만약 이 회사가 모니터링 시스템이 없다면 당연히 유용할 것입니다. 또 에러의 종류에 따라 장애 상황의 종류를 파악하고 거기에 맞게 대응할 수 있습니다. 회사 서버에서 발생한 장애인지 본인 인터넷 통신 문제인이 추론이 더 쉽습니다.

```tsx title="ErrorBoundary.tsx"
import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  fallback: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}
```

클래스형 컴포넌트로 에러 바운더리를 적용한 예시입니다. 이렇게 되면 라이프 사이클에서 에러가 발생하면 hasError를 true로 갱신합니다. 이렇게 되면 render 메서드를 실행해야 하는 시점에 원래 컴포넌트는 무시합니다. fallback을 대신 랜더링합니다.

```tsx title="Deck.tsx"
function Deck() {
  return (
    <ErrorBoundary fallback={<h2>something went wrong???</h2>}>
      <DeckList />
    </ErrorBoundary>
  );
}

export default Deck;
```

```tsx title="Deck/Subcomponent/DeckList.tsx"
import { useCards } from '@/hooks';

export function DeckList() {
  const { cards } = useCards();

  const IntervalArray: { title: string; deck: Card[] }[] = useMemo(() => {
    // ... 생략
  }, [cards]);

  return (
    <DeckListContainer>
      {IntervalArray.map((deckItem, idx) => (
        <DeckItem title={deckItem.title} cards={deckItem.deck} key={idx} />
      ))}
    </DeckListContainer>
  );
}
```

여기 컴포넌트에서 통신을 처리합니다. 통신을 처리하면 항상 실패가능성이 있습니다. 리액트의 경우 상위 컴포넌트에서 ErrorBoundary로 처리할 수 있습니다.

하지만 문제가 있습니다. 자식컴포넌트에서 Error에 대한 정보가 있습니다. 부모의 컴포넌트가 어떻게 Error에 대한 정보를 접근하고 표시할 수 있는가? 다른 문제도 있습니다. 에러를 화면에 표시하는 것은 View에 해당하는 로직입니다. 에러에 대한 정보는 보통 통신과 많이 하고 관심사가 Controller에 가깝습니다. 즉 필요한 것은 조합입니다. 에러마다 다른 컴포넌트에 에러를 보여줘야 합니다.

결론: 그냥 라이브러리 설치합시다. 에러 메시지를 보여줄 수 있습니다. React-Query를 사용하고 있는데 같이 조합하기 더 좋습니다.

## 설치

설치하는 전략입니다. 번들사이즈가 그렇게 크다고 생각되지 않습니다. 크다 작다를 판단하기에는 어렵습니다.

설치하는 전략이 적절해보이는 것은 [React-Query가 연계하는 예시](https://tanstack.com/query/v4/docs/react/reference/QueryErrorResetBoundary)를 보여줍니다. 또 통신을 클라이언트에게 재시도하도록 재공하는 것도 좋은 UX에 해당하는 것으로 보입니다. 만약에서 프로젝트에서 사용한 클라우드 서버가 자주 죽어서 통신에러가 자주 발생하면 이런 대응방법도 사용자에게 제공하는 것도 분명 좋은 전략이라고 봅니다.

[react-error-boundary - Github](https://github.com/bvaughn/react-error-boundary)

```sh
yarn add react-error-boundary
```

```tsx
import { EmptyCards } from '@/Components';
import { NowDeck } from './subcomponents';

function Cards() {
  return (
    <ErrorBoundary FallbackComponent={EmptyCards}>
      <NowDeck />
    </ErrorBoundary>
  );
}

export default Cards;
```

```tsx
import { NoCardContainer, NoCardMessage } from './EmptyCards.style';

type EmptyCardsProps = {
  error?: { success: boolean; msg: string };
};

export function EmptyCards({ error }: EmptyCardsProps) {
  return (
    <NoCardContainer>
      <NoCardMessage>{error ? error.msg : '카드가 없습니다.'}</NoCardMessage>
    </NoCardContainer>
  );
}
```

이렇게 처리하면 동적으로 Error fallback에 error 객체를 대입할 수 있게 됩니다. Error 객체가 존재하면 메시지를 보여주고 없으면 다른 텍스트를 대신 보여줍니다. ~~다시보니까 카드가 없습니다. 보다 더 좋은 메시지를 보여줘야 할 것같습니다.~~

### retry 추가

```tsx
import { ErrorBoundary } from 'react-error-boundary';
import { NowDeck } from './subcomponents';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';

function Cards() {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary, error }) => (
        <EmptyCards error={error} resetErrorBoundary={resetErrorBoundary} />
      )}
    >
      <NowDeck />
    </ErrorBoundary>
  );
}

export default Cards;
```

재요청 버튼이 처리할 함수는 `resetErrorBoundary`입니다. 라이브러리에서 제공해줍니다.

하지만 설정할 때 `useQueryErrorResetBoundary`에서 `reset`을 `ErrorBoundary`에 대입해야 합니다.

```tsx title="EmptyCards.tsx"
import { Button } from '..';
import { ErrorCardMessage, NoCardMessage } from './EmptyCards.style';

type EmptyCardsProps = {
  error: ErrorResponse;
  resetErrorBoundary: (...args: any[]) => void;
};

export function EmptyCards({ error, resetErrorBoundary }: EmptyCardsProps) {
  return (
    <ErrorCardMessage>
      <NoCardMessage>{error.msg}</NoCardMessage>
      <Button onClick={resetErrorBoundary}>retry</Button>
    </ErrorCardMessage>
  );
}
```

이렇게 적용하면 됩니다. `resetErrorBoundary`을 handler로 props로 받아 원하는 Component 이벤트에 주입하면 됩니다.

:::note 참고

저는 백엔드를 제가 직접 개발해서 모든 Axios response Error에 있는 data가 일관적으로 `{ success: boolean; msg: string }`의 모양을 갖습니다.

~~직접해서 좋은점도 분명있습니다.~~

:::

## suspense에 대한 고민

suspense 적용할까 고민했지만 추가 제어가 조금 어려웠습니다.

어려운점은 공식문서 예시가 이상합니다.

[React Example: Suspense - React-Query 공식문서](https://tanstack.com/query/latest/docs/react/examples/react/suspense)

<!-- (https://codesandbox.io/p/sandbox/github/tanstack/query/tree/main/examples/react/suspense?embed=1) -->

<iframe class="codepen codesnadbox" src="https://codesandbox.io/p/sandbox/github/tanstack/query/tree/main/examples/react/suspense?embed=1" allowfullscreen></iframe>

<!--

위 링크는 2023.07.27.에 정상동작하지 않았습니다. 하지만 2023.07.30.에는 정상동작했습니다.

codesandbox에서 VM이 실패합니다.

-->

예시를 보고 이해할 수 있으면 적용해볼 수 있었을 것같습니다. 하지만 문제가 있습니다. loading에서 spinner가 안 보입니다.

suspense에 대한 적용은 보류하겠습니다. 사실 다른 곳에 suspense는 적용했습니다. 단지 React-Query와 더 좋은 연계를 활용하는 법만 보류하겠습니다.

현재 [공식 문서에서 experimental](https://tanstack.com/query/latest/docs/react/guides/suspense)이라고 합니다. 나중에 stable에 적용되도 괜찮을 것 같습니다.
