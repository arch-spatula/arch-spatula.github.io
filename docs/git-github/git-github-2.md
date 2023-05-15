---
sidebar_position: 2
tags: ["git", "github", "Pull Request"]
---

# Pull Request 실전

PR 올리는 방법입니다.

미리 알아 둬야 할 것이 있습니다. 가능하면 주요 브랜치를 제외하면 직접 `merge` 커맨드를 활용하는 행동은 자제합니다.

## git push 전 todos

1. `git pull`을 하였는가?
2. `merge`용 `branch`에서 코드 수정하기
3. `git push` 하기 전 현재 branch를 확인합니다.
4. `git push`하고 `dev`를 `base`로 `merge Pull Request`으로 처리합니다.
5. 그래도 `push`가 안 되어 있으면 `git push (레포링크) (브랜치명)`으로 처리합니다.

## git pull

대충 `git pull`로 코드를 가져올 수 있습니다. 그리고 `git checkout origin/(브랜치명)`하고 반영 여부를 확인합니다. 이 때 터미널에서 `5e52803`같게 디랙토리 head에 붙은 것을 알 수 있습니다. 원격 레포의 `branch`를 보고 있을 때 나옵니다. 다시 로컬 브랜치로 바꾸면 괜찮습니다.

가끔 git pull하고도 반영이 안 되어있는 경우도 있습니다. 이럴 때는 `git pull origin (원격브랜치명)`으로 명령합니다. 그래도 안 바뀌면 저도 아직 모르겠습니다.

```shell
git pull (https://github.com/유저이름/레포이름.git) (브랜치명)
```

단순하게 원격만 가져올 때는 `git pull`로 충분합니다. 하지만 다른 브랜치에서 다른 개발자가 유용한 거 만들어서 가져오고 싶을 때는 위 명령으로 해당 브랜치를 현재 브랜치로 땡겨오면 됩니다.

## resolve conflicts by command line

가끔 `merge conflict`가 발생하면 다음을 순서대로 하면 됩니다.

`git merge`는 base를 기준으로 다른 브랜치를 받아서 합치는 명령입니다.

1. 원격 리포를 가져옵니다.

```sh
git pull origin (합칠 브랜치명)
```

2. merge 시킬 brach를 확인합니다.

```sh
git checkout (받을 브랜치명)
```

3. merge 명령을 합니다.

```sh
git merge (합칠 브랜치명)
```

4. 충돌을 이제 본인이 편한 에디터에서 보고 직접 결정합니다.

5. 원격 리포에 반영합니다.

```sh
git push
```

## git Flow

<iframe class="codepen" src="https://www.youtube.com/embed/EV3FZ3cWBp8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

<!-- 저희 팀 이 영상에서 `git Flow` 방식 유사하게 `dev`에 `push`하고 반영했습니다. -->

이 영상에서 `git Flow` 방식 유사하게 `dev`에 `push`하고 반영하면 됩니다.

각자 이름 브랜치를 만들고 `dev`로 `push`하면서 `Pull Request`를 했습니다.

예를 들어 저는 `arch-spatula` 브랜치에서 작업하고 `push`한 다음에 GitHub 리포 링크로 가서 `Pull Request`를 눌렀습니다. `base`는 `dev`로하고 `compare`를 `arch-spatula`으로 했습니다. 로컬에서 `merge`하고 `push`할 수 있습니다. 하지만 협업 습관에는 이렇게 하는 게 좋을 것 같습니다. 다른 사람들이 코드를 확인하고 일찍 문제를 잡아야 하기 때문입니다.

<!-- TODO: 이미지 추가해주세요 -->

많은 경우 프로젝트를 새로 시작하는 입장이기 때문에 많은 경우 `git flow` 전략을 활용하게 됩니다. 만약에 개인이 `github flow` 전략을 활용해 볼 일이 있다면 개인 프로젝트를 장수 프로젝트로 활용할 때입니다. 또 모노레포로 자주 배포하는 방식이면 가능성이 있습니다.

![image](https://i.imgflip.com/xsdtv.jpg)

나약한 현대 웹개발자들 위해 조금 쉽게 만들어 주시지;;;
