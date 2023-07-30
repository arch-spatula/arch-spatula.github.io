---
title: '에러 바운더리'
authors: [arch-spatula]
tags: ['회고', '블로그']
description: '????'
toc_max_heading_level: 6
draft: true
---

# 에러 바운더리

<!--truncate-->

https://www.youtube.com/watch?v=0LpLxEUephc

```tsx
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

```tsx
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

결론: 그냥 라이브러리 설치합시다.

https://github.com/bvaughn/react-error-boundary

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

이렇게 처리하면 동적으로 Error fallback에 error 객체를 대입할 수 있게 됩니다.

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

재요청 버튼이 처리할 함수는 resetErrorBoundary입니다. 라이브러리에서 제공해줍니다.

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

이렇게 적용하면 됩니다. resetErrorBoundary을 handler로 props로 받아 원하는 Component 이벤트에 주입하면 됩니다.

suspense 적용할까 고민했지만 추가 제어가 조금 어려웠습니다.

어려운점은 공식문서 예시가 이상합니다.

https://tanstack.com/query/latest/docs/react/examples/react/suspense

https://codesandbox.io/p/sandbox/github/tanstack/query/tree/main/examples/react/suspense?embed=1

위 링크는 2023.07.27.에 정상동작하지 않았습니다. 하지만 2023.07.30.에는 정상동작했습니다.

codesandbox에서 VM이 실패합니다.

예시를 보고 이해할 수 있으면 적용해볼 수 있었을 것같습니다.
