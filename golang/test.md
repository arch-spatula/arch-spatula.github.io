---
sidebar_position: 4
---

# test

```sh 
go test
```

- 위 명령으로 go 언어로 테스트를 실행할 수 있습니다. 테스트 기능이 언어차원에서 기본적으로 제공해주고 있습니다.
- 중요한 규칙과 컨벤션이 있습니다.

## 학습자료 

- [Learn Go with Tests](https://quii.gitbook.io/learn-go-with-tests)
  - go언어를 테스트를 통해 학습할 수 있습니다. 하지만 약간 주의해야 하는 것들이 있습니다.
  - 문서가 인수테스트를 다루기 시작할 때 부터 퀄리티가 떨어집니다.
    - 개인적으로 인수테스트의 가치를 크게 못 느끼는 부분이 있습니다.
  - go-TDD를 읽고 예제를 직접 복붙 안하고 코딩했습니다.
    - 하지만 예제에 온전한 설명을 안하기 때문에 따라하기 어려운 부분이 많습니다.
    - go 언어를 직접 탐구하면서 찾아다니면 실력에 많은 도움이 될 것이지만 흥미는 인수테스트가 아니라서 중단하겠습니다.
    - 단위테스트를 다룰 때는 괜찮게 다루었던 것 같습니다.

## go test 안함

- TL;DR: `Testxxx`로 명명해야 합니다. 그래야 테스트합니다. 대소문자 구분이 중요합니다.

```go
package main

import "testing"

func testHello(t *testing.T) {
	got := Hello("Jake")
	want := "Hello, Jake!"

	if want != got {
		t.Errorf("want %q, gate %q", want, got)
	}
}
```

- 위 테스트 코드는 테스트를 실행하지 않습니다.
- `testing: warning: no tests to run` 이런 메시지를 터미널에 출력하게 될 것입니다.

```go
package main

import "testing"

func TestHello(t *testing.T) {
	got := Hello("Jake")
	want := "Hello, Jake!"

	if want != got {
		t.Errorf("want %q, gate %q", want, got)
	}
}
```

- 위 코드는 테스트를 실행합니다.

## go test helper

```go
func TestHello(t *testing.T) {
	t.Run("saying hello to people", func(t *testing.T) {
		got := Hello("Jake")
		want := "Hello, Jake"

		assertCorrectMessage(t, want, got)
	})

	t.Run("say 'Hello, world' when empty string is supplied", func(t *testing.T) {
		got := Hello("")
		want := "Hello, world"

		assertCorrectMessage(t, want, got)
	})
}

func assertCorrectMessage(t testing.TB, want, got string) {
	t.Helper()
	if want != got {
		t.Errorf("want %q, gate %q", want, got)
	}
}
```

- `t.Helper`은 인터페이스에서 제공하는 함수입니다. 이미 호출하는 부분부터 주소로 전달 받기 때문에 또 주소로 받겠다고 할필요가 없습니다.

## go 언어에서 모두 한번에 테스트하기

```sh
go test -count=1 ./...
```

## go 에서 이런 저런 커맨드라인 흉내내기

```go 
func buildBinary() (string, error) {
	binName := randomString(10) + "-" + baseBinName

	build := exec.Command("go", "build", "-o", binName)

	if err := build.Run(); err != nil {
		return "", fmt.Errorf("cannot build tool %s: %s", binName, err)
	}

	return binName, nil
}
```

빌드 등 명령하기

```go 
dir, err := os.Getwd()
if err != nil {
    return nil, nil, err
}

cmdPath := filepath.Join(dir, binName)

cmd := exec.Command(cmdPath)
```

실행파일 실행

```go 
os.Remove(binName)
```

파일 삭제 명령
