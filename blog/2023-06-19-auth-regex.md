---
title: '로그인, 회원가입 관련 유효성 검증'
authors: [arch-spatula]
tags: ['auth', 'regex']
description: '버튼에 로딩 스피너를 추가하는 방법입니다.'
toc_max_heading_level: 6
---

# 로그인, 회원가입 관련 유효성 검증

이메일과 비밀번호 유효성 검증하는 정규표현식을 테스트코드와 함께 구현한 예시입니다.

<!--truncate-->

## 이메일 검증

```ts
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function checkEmail(email: string) {
  return emailRegex.test(email);
}
```

이메일 유효성 검증을 합니다.

```ts
import { describe, it } from 'vitest';
import { checkEmail } from '.';

describe('Email Validation', () => {
  it('should return true for valid email addresses', () => {
    expect(checkEmail('test@example.com')).toBe(true);
    expect(checkEmail('user1234@gmail.com')).toBe(true);
    expect(checkEmail('john.doe@company.co.uk')).toBe(true);
    expect(checkEmail('info@openai.com')).toBe(true);
  });

  it('should return false for invalid email addresses', () => {
    expect(checkEmail('notanemail')).toBe(false);
    expect(checkEmail('invalid@')).toBe(false);
    expect(checkEmail('invalid@example')).toBe(false);
    expect(checkEmail('invalid@domain')).toBe(false);
    expect(checkEmail('spaces in@domain.com')).toBe(false);
  });
});
```

단점은 사용자에게 의미있는 피드백을 제공하기 위해서 여러 정규 표현식을 분리해야 합니다. 이것은 다음에 걱정하겠습니다.

아마 정규표현식에 switch case 문을 활용하고 각 case마다 독립적으로 검사하고 실패하는 이유를 피드백하도록 설계했던 기억이 납니다.

르블랑의 법칙에 당하겠지만 상관없습니다.

## 비밀번호 검증

```ts
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]*$/;

export function checkPassword(password: string) {
  return passwordRegex.test(password);
}
```

비밀번호는 영어, 숫자 포함 8자리 이상이고 특수문자는 선택으로 뒀습니다.

```ts
import { describe, it } from 'vitest';
import { checkPassword } from '.';

describe('Password Validation', () => {
  it('should return true for valid passwords', () => {
    expect(checkPassword('Abc12345')).toBe(true);
    expect(checkPassword('Password123')).toBe(true);
    expect(checkPassword('secureP@ssw0rd')).toBe(true);
    expect(checkPassword('1#2345678Ab')).toBe(true);
  });

  it('should return false for invalid passwords', () => {
    expect(checkPassword('weak')).toBe(false);
    expect(checkPassword('password')).toBe(false);
    expect(checkPassword('12345678')).toBe(false);
  });
});
```

사전에 테스트 설정해서 좋습니다. 한땀한땀 타이핑했으면 검증 지옥이었을 것입니다.

chatGPT 만세! 이런 고달프고 고통받는 작업을 저 대신 고통받아줬습니다.

## 하지만 끝이 아닙니다...

끝이 아닌이유는 유저에게 항상 피드백을 제공해야 하기 때문입니다. 유효성 검증의 문제는 단순히 유효하고 말고만 검증합니다. 필요한 것은 왜 유효하지 않은지 유저에게 피드백을 제공해야 합니다.

하지만 이부분은 나중에 걱정하기로 했습니다. 미래의 제가와서 [르블랑의 법칙(Leblanc's Law)](https://en.wikipedia.org/wiki/Talk%3AList_of_eponymous_laws#Proposal_to_add_LeBlanc's_law)을 무시하고 이 글을 수정해주기를 기다리고 있을 것입니다.

아마 state machine pattern으로 리팩토링할 것이라는 착각속에서 살고 있겠습니다.
