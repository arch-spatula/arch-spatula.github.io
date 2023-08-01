---
sidebar_position: 7
tags: ['git', 'github', 'small tip']
description: 'git과 github 관련된 작은 팁을 다룹니다.'
---

# git & github tip

git과 github 관련된 작은 팁을 다룹니다.

## prune

```sh
git remote prune origin
```

원격에 트레킹 안하는 브랜치를 삭제하는 명령입니다. 오늘 처음봤습니다.

## 정리한 비어있는 폴더 공유하기 `.gitkeep`

```
/(폴더이름)
  .gitkeep
```

폴더 속에 `.gitkeep` 파일을 만들고 커밋하면 폴더 구조다 레포에 올라갑니다.

예전에 비어있던 `index.ts`하고 올리던 짓거리를 이제 안 하고 사람 비슷한 흉내를 수 있습니다.
