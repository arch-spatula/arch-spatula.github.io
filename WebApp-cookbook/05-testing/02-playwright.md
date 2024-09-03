---
sidebar_position: 1
description: '테스트 코드 시작하기'
draft: true
---

# Playwright

- MS에 만든 E2E 테스팅 라이브러리입니다.
- worker를 사용해서 병렬 테스트를 실행합니다. worker를 사용하면서 브라우져랑 비슷한 행위를 합니다.
- 행위를 기준으로 테스트하기 때문에 코드의 상세 디테일을 모릅니다. 그냥 애플리케이션의 동작을 확인하는 용도로 사용할 수 있습니다.

## 오버레이 클릭이 동작 안하는 이유

https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events

- Playwright에서 오버레이 클릭하면 동작하는 이유
- 모달이 중앙에 있는데 오버레이도 중앙에서 클릭 시도
	- 이벤트 있었지만 오버레이는 뒤에 있어서 모달 닫기 이벤트가 없음
	- enter 키를 눌러서 닫는 전략이 제일 좋음
- 그리드 필터 기능이 동작하려면 어느정도 시간이 필요해서 delay 설정을 추가함
subtree intercepts pointer events

https://github.com/microsoft/playwright/issues/12298
