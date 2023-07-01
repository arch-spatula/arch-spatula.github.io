---
sidebar_position: 6
tags: ['git', 'github', 'git command', 'git amend']
description: '만약에 push를 아직 안했다면 다음 명령으로 커밋 내역을 수정할 수 있습니다.'
---

# git 커맨드: 커밋 메시지 수정하기

굉장히 나쁜 짓입니다. 처음부터 커밋을 똑바로 써야 합니다.

하지만 만약에 push를 아직 안했다면 다음 명령으로 커밋 내역을 수정할 수 있습니다.

## 1. 명령

```sh
git commit --amend
```

## 2. 수정

이 명령을 하면 vi 환경에서 메시지를 수정할 수 있게 됩니다.

## 3. push

```sh
git push --force-with-lease
```

이제 이 명령으로 최근 커밋을 수정할 수 있습니다. 실수로 안 넣은 이슈 번호 실수로 틀린 맞춤법을 수정할 때 활용하면 됩니다.
