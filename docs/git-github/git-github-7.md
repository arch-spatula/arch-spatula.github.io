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

## 잠시 폴더 속 내용을 무시하게 만들고 싶으면 폴더 명 끝에 `~`을 추가해주세요

```
./folder-name~
  숨기고-싶은-텍스트.txt
```

`숨기고-싶은-텍스트.txt`는 커밋 내역에 들어가지 않게 됩니다.

## merge하면 브랜치 지우고 새브랜치 따세요

협업을 여러명이 하면 죽은 브랜치 계속 사용하는 사람들도 있습니다. 죽은 브랜치에 계속 커밋하고 push했습니다.

그냥 작업마다 새 브랜치 따면 편해집니다.
