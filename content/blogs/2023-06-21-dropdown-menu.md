---
title: 'dropdown menu 만들기'
authors: [arch-spatula]
tags: ['dropdown menu', 'dropdown', 'menu', 'ui']
description: 'dropdown menu 만들는 방법입니다. 의외로 별거 없습니다.'
toc_max_heading_level: 6
date: 2023-06-21
---

# dropdown menu 만들기

dropdown menu 만들는 방법입니다. 의외로 별거 없습니다.

<!--truncate-->

아래가 전체 코드입니다. 다시보니까 `useOutsideClick` custom hook도 추가해야 겠습니다.

```tsx
import { useState } from 'react';
import theme from '../../../styles/theme';
import {
  Anchor,
  DropdownMenuContainer,
  DropdownOpen,
  MenuButton,
  MenuItem,
  MenuList,
} from './DropdownMenu.style';

type LinkItem = {
  label: string;
  href: string;
};

type ButtonItem = {
  label: string;
  cb: () => void;
};

type DropdownMenuProps = {
  menuItem: (LinkItem | ButtonItem)[];
  direction?: 'left' | 'right';
};

export function DropdownMenu({
  menuItem,
  direction = 'left',
}: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <DropdownMenuContainer>
      <DropdownOpen type="button" onClick={handleOpenMenu} isOpen={isOpen}>
        <Icon />
      </DropdownOpen>
      {isOpen && <Menu menuItem={menuItem} direction={direction} />}
    </DropdownMenuContainer>
  );
}

function Menu({ menuItem, direction = 'left' }: DropdownMenuProps) {
  return (
    <MenuList direction={direction}>
      {menuItem.map((item, idx) => (
        <MenuItem key={idx}>
          {'href' in item && <Anchor to={item.href}>{item.label}</Anchor>}
          {'cb' in item && (
            <MenuButton onClick={item.cb}>{item.label}</MenuButton>
          )}
        </MenuItem>
      ))}
    </MenuList>
  );
}

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke={theme.colors.gray700}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      <path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      <path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
    </svg>
  );
}
```

dropdown이 받아야 하는 것은 2가지입니다. 하나는 label과 다른 하나는 처리할 동작입니다. 동작은 함수로 받거나 라우팅할 링크로 받으면 됩니다.
