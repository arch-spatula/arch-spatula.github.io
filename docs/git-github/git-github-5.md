---
sidebar_position: 5
description: "Sourcetree에 키체인에서 저장된 비밀번호는 노트북 비밀번호입니다."
tags: ["git", "git Push", "Sourcetree", "Password"]
---

# Sourcetree

## TL;DR

![키체인 비번은 노트북 비번](https://user-images.githubusercontent.com/84452145/239808580-ce82162e-2bcc-4014-ba19-e79df35d5540.png)

이런 다이얼로그가 나오면 노트북 비번을 임력하는 뜻입니다.

## Sourcetree 키체인은 노트북 비번

- Sourcetree 사용하면서 겪은 에러입니다.
  - 지금은 전혀 사용하지 않습니다. 아마 머나먼 미래에 누군가를 백지상태에서 가르처야 한다면 Sourcetree를 활용할 것입니다.

### 문제: push 막힘

- Sourcetree를 활용해서 `git push`를 시도하던 중에 발생했습니다.
- 위 이미지에서 나온 다이얼로그가 나왔습니다.
- 강의에서 어떻게 해결하는지 잘 알려주지 않았었습니다.

### 시도: github에서 토큰만들기

- github에서 token을 만들었습니다. 원격 레포에서 승인할 수 있게 처리해줘야 하는 줄 알았습니다.
- 전혀 무관했습니다.

### 해결: 다른 블로그 에서 정답 발견

- 그냥 노트북 비번입력하니까 push 되었다고 합니다. 저랑 한때 비슷했던 수준의 사람이 있었나봅니다.
- 노트북 비번을 입력하니까 push가 성공했습니다.

### 학습: 개발자를 위한 도구도 UX Writing에 신경씁시다.

- 개발환경에서도 UX Writing도 상당히 중요합니다.
  - 키체인이 무엇인지 모르고 뭘 입력해야 할 지 모를 때 다이얼로그에 링크를 제공하는 것도 좋은 방법이었을 것입니다.
