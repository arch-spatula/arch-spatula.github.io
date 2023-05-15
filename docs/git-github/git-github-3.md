---
sidebar_position: 3
tags: ["git", "git pull", "git stash"]
---

# git stash

`git pull`을 하려고 하는데 그 전에 조금 여기저기 끄적거렸습니다. 그냥 `pull`하면 문제된다면 이럴 때 그냥 `git stash`하고 `pull`하면 문제 없습니다. 물론 커밋을 해도 되지만 커밋하기 위해 생각하는 노력이 귀찮으면 이렇게 하면 됩니다.

stash를 의역하면 어디 물건을 꽁쳐놓다의 의미입니다. 잠시 다른 공간에 git의 상태를 저장할 수 있습니다.

stash는 자료구조가 stack입니다. 그래서 잠시 저장해두고 다시 보고 싶으면 다음 명령하면 됩니다.

```sh
git stash # push가 생략되어 있습니다.
```

```sh
git stash pop # 최근 stash 반영하고 stash list에서 삭제
```

```sh
git stash drop # 최근 stash 안 반영하고 stash list에서 삭제
```

```sh
git stash clear # stash 목록 비우기
```

```sh
git stash list # stash 목록 보기
```
