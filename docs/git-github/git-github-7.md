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

## `git pull`을 ui에서 하기

브랜치를 배포 버전 기준별로 살려두는 전략도 있습니다. `git pull`을 ui에서 처리할 수 있습니다. PR이 합쳐질 때마다 타겟 브랜치와 동기화를 합니다.

실제 작업 전에 가능하면 커밋을 `squash`로 합쳐주기 바랍니다.

![](/img/doc/git/squash.png)

![](/img/doc/git/squash2.png)

![](/img/doc/git/start.png)

![](/img/doc/git/search.png)

![](/img/doc/git/merge.png)

## rebase는 merge 커밋을 포함하지 않습니다.

제곧내.

나중에 알게된 놀라운 사실입니다. `revert`로 기능을 롤빽해야 할 때 유용한 방법론입니다.

rebase할 브랜치에 PR을 올릴 때는 `squash`합니다.

## 최종 줄수 변화 미리보기

```sh
git diff --stat
```

뭐 PR을 올릴지말지 기준으로 활용할 수 있습니다. 200줄 전후로 적당한 시점인지 파악할 때 유용합니다.

개발자 글쓰기할 때 매일 글을 쓴다면 활용해볼 수 있습니다. 매일 200줄 변화처럼 작고 어림잡기 적당한 기준도 적절할 수 있습니다.
