---
title: 'react portal'
authors: [arch-spatula]
tags: ['react', 'react portal']
description: '지금 구현해야 하는 것은 삭제시 경고 modal(더 구체적으로 Dialog)입니다. 이 작업을 기록하는 이유는 react portal로 구현하는 것이 처음이기 때문에 기록합니다.'
toc_max_heading_level: 6
---

# react portal

지금 구현해야 하는 것은 삭제시 경고 modal(더 구체적으로 Dialog)입니다. 이 작업을 기록하는 이유는 react portal로 구현하는 것이 처음이기 때문에 기록합니다.

<!--truncate-->

## 왜 react portal로 modal을 만드는 것이 best practice에 해당하는가?

단순하게 조건부랜더링하고 말 수 있습니다.

best practice를 ChatGPT에 물어봤습니다.

> DOM 구조 분리: React Portal을 사용하면 컴포넌트를 DOM 트리에서 분리하여 다른 위치로 렌더링할 수 있습니다. 이는 컴포넌트의 DOM 트리 위치에 대한 제약을 해제하고, 레이아웃 및 스타일링의 유연성을 향상시킵니다. 예를 들어, 모달 창과 같은 컴포넌트를 별도의 DOM 요소로 렌더링하면, 모달이 다른 컴포넌트와 독립적으로 스타일링되고 레이아웃을 설정할 수 있습니다.
>
> 이벤트 처리 및 상태 관리: React Portal은 이벤트 처리와 상태 관리를 개선하는 데 도움이 됩니다. 예를 들어, 모달 창을 포함한 컴포넌트는 주로 상위 컴포넌트의 상태와 이벤트 처리 메서드에 의존합니다. React Portal을 사용하면 모달 창이 다른 위치로 이동하더라도 상위 컴포넌트와 독립적으로 상태를 관리하고 이벤트를 처리할 수 있습니다.
>
> 외부 라이브러리 통합: React Portal을 사용하면 외부 라이브러리와의 통합을 용이하게 할 수 있습니다. 외부 라이브러리는 종종 DOM 요소를 직접 조작하는 방식으로 동작하며, 이를 React와 통합하기 위해 Portal을 사용할 수 있습니다. 예를 들어, 일부 라이브러리는 특정 DOM 요소에 직접 렌더링되어야 하는데, 이를 Portal을 사용하여 React 구성 요소 내에서 통합할 수 있습니다.
>
> 코드의 구조와 유지 보수성 개선: React Portal을 사용하면 컴포넌트의 코드를 더 깔끔하고 읽기 쉽게 구성할 수 있습니다. 렌더링 로직과 관련된 부분을 별도의 Portal 컴포넌트로 분리하여 코드베이스를 정리하고 유지 보수성을 개선할 수 있습니다.
>
> \- ChatGPT

DOM 구조를 생각해보면 적절합니다. 우리가 호출자체는 JSX에서 조건부 랜더링으로 호출하지만 실제 DOM은 외부에 존재해야 합니다. context 문제로 생각하면 독립적이어야 합니다. 스타일링 오염문제를 생각하면 Portal 활용이 적절합니다.

## 왜 경고 Modal을 만들어 줘야 하는가?

이 고민은 UX 고민입니다. 왜 경고 Modal 즉 경고 Dialog를 통해서 삭제해야 하는가? 정보를 만들기 위해서는 유저의 노력비용이 들어갑니다. 하지만 이 노력비용을 많이 들였으면 그 혜택을 지속적으로 많이 받아야 합니다. 하지만 이 리소스를 삭제하는 것으로 혜택을 받지 않기로 할 때는 조심할 수 있도록 장치를 마련해야 합니다. 회원가입 중간에 새로고침해서 데이터 다 날리는 것을 방지하는 것처럼 경고 Dialog로 중간에 방어해줘야 합니다.

모달을 보여주고 모달에서 확인을 누르면 서버에 요청을 보내도록 하는 것이 좋은 사용자 경험입니다.

## 경고 modal 자료

예전에 동료가 react portal을 활용해서 만들었습니다. 그 코드를 보는 것도 전략인 것 같습니다.

```tsx
import Document, { Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  // ... 생략

  render() {
    return (
      <Html lang="ko">
        {/* ... 생략 */}
        <body>
          <Main />
          <NextScript />
          // highlight-next-line
          <div id="modal-root" />
        </body>
      </Html>
    );
  }
}
```

[\_document - Codefolio](https://github.com/react-challengers/Codefolio/blob/dev/pages/_document.tsx)

Next.js 프로젝트에서 index.html에 해당하는 root에 어떻게 적용했는지 찾아봤습니다. id가 중요합니다.

```tsx
// highlight-next-line
import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface ModalProps {
  onClose: () => void;
  children?: string | null | undefined;
  title?: string | null;
}

const Modal = ({ onClose, children, title }: ModalProps) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const modalContent = (
    <StyledModalOverlay onClick={() => onClose()}>
      {/* Wrap the whole Modal inside the newly created StyledModalWrapper 
            and use the ref
        */}
      <StyledModalWrapper>
        {title && <StyledModalTitle>{title}</StyledModalTitle>}
        {children ? (
          <StyledModalBody>{children}</StyledModalBody>
        ) : (
          <StyledModalBody>
            {`계속 진행을 위해서는 "확인" 버튼을 눌러주세요.`}
          </StyledModalBody>
        )}
        <ButtonWrapper>
          <Checkbutton onClick={() => onClose()}> 확인 </Checkbutton>
        </ButtonWrapper>
      </StyledModalWrapper>
    </StyledModalOverlay>
  );

  // highlight-next-line
  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      // highlight-next-line
      document.getElementById('modal-root') as Element
    );
  }
  return null;
};

// ... 스타일링 생략

export default Modal;
```

[Modal - Codefolio](https://github.com/react-challengers/Codefolio/blob/dev/Components/Common/Modal.tsx)

정의한 공용 Modal을 찾았습니다. 정리가 많이 안 되어 있습니다. 굳이 불필요하게 식별자에 담고 assertion도 담고 있습니다.

정의를 찾았습니다. 호출한 예시를 봐야겠습니다.

```tsx
// ... 생략

// ... 생략
const PostEditor: NextPage = () => {
  const [showModal, setShowModal] = useState(false);

  // ... 생략
  return (
    <div>
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          title="이미지 파일이 아닙니다."
        >
          jpeg, jpg, png, svg 등 이미지 파일을 넣어주세요.
        </Modal>
      )}
    </div>
  );
};

export default PostEditor;
```

[PostEditor - Codefolio](https://github.com/react-challengers/Codefolio/blob/dev/Components/CreatePost/PostEditor.tsx)

이렇게 modal을 제어할 때 조건부 랜더링으로 제어합니다.

중요한 부분 위주로 요약을 했는데 아쉬운 부분이 많이 있습니다.

조건부 랜더링을 해야 한다는 점이 노출 되어 있습니다.

## 적용

예시를 보고 저의 요구사항에 맞게 반영하겠습니다.

```tsx title="Dialog.tsx"
import { createPortal } from 'react-dom';
// ... 생략

const modalRoot = document.querySelector('#modal-root');

type DialogProps = {
  // ... 생략
};

export function Dialog({ ...props }: DialogProps) {
  // ... 생략

  if (modalRoot)
    return createPortal(
      <WindowContainer>
        <Modal>
        <Overlay />
      </WindowContainer>,
      modalRoot
    )
  else return <></>;
}
```

이렇게 만들고 적용하는게 핵심입니다.

```html title="index.html"
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/cards.svg" />
    <meta name="description" content="Flash Card App" />
    <meta name="keywords" content="Flash Card, App" />
    <meta name="author" content="arch-spatula" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      href="//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css"
      rel="stylesheet"
      type="text/css"
    />
    <title>Flash Card</title>
  </head>
  <body>
    <div id="root"></div>
    // highlight-next-line
    <div id="modal-root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

적용은 단순했습니다.

```tsx
// ... 생략
type CardSettingProps = {
  // ... 생략
};

export function CardSetting({ _id }: CardSettingProps) {
  // ... 생략
  const { OutSideProvider, handleOpen, handleClose } = useOutsideClick();

  // ... 생략
  return (
    <MenuWrapper>
      <OutSideProvider component={<Dialog />} />
      {/* .. 생략 */}
    </MenuWrapper>
  );
}
```

이렇게 소비하면 됩니다.
