---
sidebar_position: 1
tags: ["git", "github"]
---

# git 시작하기

[learningGitAndGithub](https://github.com/arch-spatula/learningGitAndGithub)

위는 제가 git과 github을 공부할 때 정리한 레포입니다.

<!-- https://velog.io/@arch-spatula/TIL.22.10.31.-Git-%ED%8A%B9%EA%B0%95 -->

<!-- 여기 있던 블로그 글을 옮긴 것입니다. -->

## git 사용하기 전에 같이 알면 좋은 명령

```sh
ls -a # 숨김폴더까지 보여달라는 명령입니다.
```

```sh
ls -al # 숨김 폴더에 대한 정보를 더 자세히 보여줍니다.
```

<!-- ## 실수로 add로 올리면 내리는 방법

```sh
git rm --cached (파일이름) # 실수로 add로 올리면 내리는 방법입니다.
```

옛날에는 `git add .` 로 명령하는 게 습관이었습니다. 지금은 VScode가 제공하는 git을 잘 활용합니다. -->

---

## github url

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

## 이슈는 체크리스트로 활용합니다.

![이슈 체크리스트 이미지](https://user-images.githubusercontent.com/84452145/240951810-f0c74e65-573b-4662-a8b9-f6880ee34049.png)

```md
- [ ] task
- [ ] task
- [ ] task
- [ ] task
```

이슈 설명에 이런식으로 입력하면 됩니다. 또 task가 크면 다른 이슈로 분리도 가능합니다.

개발자의 사고방식을 잘 반영한 업무 관리방법입니다. 전체랑 부분으로 인식한다는 측면이 그렇습니다.

참고. 이슈를 다룰 때 중요한 것은 커밋에 이슈번호를 넣는 것이 중요합니다.
