---
sidebar_position: 4
description: "PR과 이슈 템플릿을 만드는 방법을 소개합니다."
tags: ["git", "git pull", "github", "Pull Request", "Issue"]
---

# github 템플릿 만드는 방법

꽤 중요합니다. 처음 만들 때 귀찮은 작업이기도 합니다.

![settings 클릭하기](https://user-images.githubusercontent.com/84452145/239683663-6a6195ee-61d4-4e63-92ee-1ad7991df744.png)

`settings` 탭으로 먼저 접근합니다.

![Set up templates](https://user-images.githubusercontent.com/84452145/239683820-f88bf12c-eaa2-4957-a908-25be40c526f2.png)

`Set up templates`를 누르는 것으로 이슈 템플릿을 생성할 수 있습니다.

![이슈 템플릿 고르기 1](https://user-images.githubusercontent.com/84452145/239683934-bb56ff60-de9f-4b07-aa77-4b1505a72b30.png)

![이슈 템플릿 고르기 2](https://user-images.githubusercontent.com/84452145/239684070-6a4f0c54-6bc9-4c41-bde8-7fc21008459b.png)

github이 제공하는 기본 이슈 템플릿들 중 정할 수 있습니다.

## 이슈 템플릿들

```md
---
name: Refactor
about: 리팩토링과 관련된 이슈 템플릿입니다.
title: "[Refactor] - (리팩토링명)"
labels: Refactor
---

# 리팩토링 주제

- (리팩토링할 모듈 목록)
```

리팩토링을 이슈로 만들어야 할 정도로 규모가 거대하면 이슈 템플릿을 따로 만들는 것도 전략입니다.

```md
---
name: Bug report
about: 발견한 버그를 대응하기 위한 이슈 템플릿입니다.
title: "[Bug] - (버그 이름)"
labels: bug
---

# 버그 이름

(버그 이미지 or 영상)

- (왜 버그인가?)
```

버그도 발견하면 바로 버그 리포트 부터 작성하도록 대응합니다.

```md
---
name: Feature request
about: 과제 퀄리티와 사용성을 위해 요청하지 않은 기능을 추가하는 이슈 템플릿입니다.
title: "[Feature] - (기능명)"
labels: enhancement
---

# 기능명

- (이 기능은 무엇을 하는가?)
- (왜 이 기능이 필요한가?)
```

기능 요청 이슈 템플릿 입니다.

### 이슈 템플릿 확정

![이슈 템플릿 편집](https://user-images.githubusercontent.com/84452145/239684792-20881fd6-cbfb-4f6e-a8af-dd1e74899b57.png)

편집이 끝나면 이슈 템플릿을 확정지을 수 있습니다.

![이슈 템플릿 확정](https://user-images.githubusercontent.com/84452145/239684839-cfa75297-edb3-4180-b5a5-5b0159e840e9.png)

완료되면 추가합니다. 개인적으로 브랜치를 따로 만들어서 진행하는 것을 권장합니다.

## PR 템플릿

![PR 템플릿 마크다운 볼 곳](https://user-images.githubusercontent.com/84452145/239685037-f45f8c1c-582b-464a-9f45-daf51b633971.png)

`(레포이름) / .github / pull_request_template.md`에서 PR 템플릿을 편집할 수 있습니다.

```md
## What is this PR? :mag:

-

## branch

- feat/ -> dev

## Changes :memo:

-

(이슈 번호를 여기 입력 해 주세요.) by @
```

이렇게 작성하는 템플릿도 있습니다. 개인적으로 작업하기에는 적당합니다. 협업에 더 적합한 PR도 있습니다.

검색하면서 발견한 좋은 양식입니다.[^1]

![](https://user-images.githubusercontent.com/84452145/239685327-df760caa-0141-4c28-bf45-f2e7dbb8e5cd.png)

```md
## Motivation ✨

- (왜 이 PR이 필요한가?)

<br/>

## Key Changes 🔑

- (무엇이 바뀌는가?)

<br/>

## To Reviewers 🙏

- (리뷰하면서 고려할 점)

<br/>
```

인터넷을 돌아다니면서 다른 PR도 발견했습니다.

```md
## PR Checklist

Please check if your PR fulfills the following requirements:

- [ ] The commit message follows our guidelines: https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit
- [ ] Tests for the changes have been added (for bug fixes / features)
- [ ] Docs have been added / updated (for bug fixes / features)

## PR Type

What kind of change does this PR introduce?

<!-- Please check the one that applies to this PR using "x". -->

- [ ] Bugfix
- [ ] Feature
- [ ] Code style update (formatting, local variables)
- [ ] Refactoring (no functional changes, no api changes)
- [ ] Build related changes
- [ ] CI related changes
- [ ] Documentation content changes
- [ ] angular.io application / infrastructure changes
- [ ] Other... Please describe:

## What is the current behavior?

<!-- Please describe the current behavior that you are modifying, or link to a relevant issue. -->

Issue Number: N/A

## What is the new behavior?

## Does this PR introduce a breaking change?

- [ ] Yes
- [ ] No

<!-- If this PR contains a breaking change, please describe the impact and migration path for existing applications below. -->

## Other information
```

angular PR 템플릿입니다.[^2] ~~유사~~오픈소스를 먼저 보고 배우는 것이 더 좋습니다.

편집을 완료하면 `commit` 으로 저장합니다. 다른 브랜치인 것은 잘 확인하도록 합니다.

[^1]: [좋은 Pull Request를 만드는 방법과 PR Template 구성](https://2jinishappy.tistory.com/337)
[^2]: [angular Pull Request Template.md - angular](https://github.com/angular/angular/blob/main/.github/PULL_REQUEST_TEMPLATE.md)
