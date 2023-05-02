---
layout: ../../../layouts/MarkdownPostLayout.astro
title: "git & github - 1"
pubDate: 2023-03-21
description: "git과 github을 다룹니다."
author: "Arch Spatula"
tags: ["git", "github"]
---

https://velog.io/@arch-spatula/TIL.22.10.31.-Git-%ED%8A%B9%EA%B0%95

여기 있던 블로그 글을 옮긴 것입니다.

```sh
ls -a # 숨김폴더까지 보여달라는 명령입니다.
```

```sh
ls -al # 숨김 폴더에 대한 정보를 더 자세히 보여줍니다.
```

```sh
git rm --cached (파일이름) # 실수로 add로 올리면 내리는 방법입니다.
```

옛날에는 `git add .` 로 명령하는 게 습관이었습니다. 지금은 VScode가 제공하는 git을 잘 활용합니다.

---

```
https://github.com/사용자이름/리포이름
```

리포 URL입니다.

브랜칭할 때는 작업자의 이름을 넣는 것도 전략입니다.

```sh
git checkout -b "(유형)/(기능이름)/(작업자이름)"
```

하지만 작업자 이름을 넣기 전에 더 좋은 이름과 기능명의 세분화를 잘 하도록 합시다. 또 규모가 클 때 이렇게 명명하도록 합니다.

---

옛날에는 push랑 merge랑 헷갈렸습니다. push는 원격 리포에 로컬리포를 밀어서 반영시키는 것이고 merge는 브랜치를 합치는 것인데 이게 헷갈렸습니다.

```
├── Main
│   ├── dev
│   │   ├── 팀원1
│   │   ├── 팀원2
│   │   ├── 팀원3
│   │   └── 팀원4
│   ├── dev
├── Main
```

제가 갖고 있던 의도였습니다.

```
├── Main
│   ├── dev
├── Main
```

실제로 제가 실행한 명령입니다.
