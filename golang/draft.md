---
sidebar_position: 99
description: '이런 저런 golang 미정'
tags: ['golang', 'hobby', 'draft']
---

## Golang installation and hello world

https://www.youtube.com/watch?v=62qGe9yhiJI

최신 버전을 설치해도 정상동작할 것입니다. 하지만 과거 버전은 오히려 권장하지 않습니다. 과거에는 동작원리도 다르기도 했습니다.

설치 이후 패키지 오류도 설정하도록 합니다.

https://velog.io/@seondal/Go-package-main-%EC%98%A4%EB%A5%98

```sh
go version
```

이렇게 확인할 수 있습니다.

홈페이지에서 플레이그라운드는 실험 이외에는 권장하지 않습니다. 에디터는 VSCode를 사용할 것입니다.

모듈명을 그대로 작성하도록 합니다.

새로운 폴더를 만들고 go확장자가 있는 go 파일을 만들었으면 터미널에 다음 명령을 하도록 합니다.

```sh
go mod init
```

npm init과 유사합니다.

```sh
go mod init hello
```

이제는 main.go를 작성합니다.

```go
package main

import "fmt"

func main() {
	fmt.Println("Hello Go world")
}
```

이렇게 작성하고 터미널에 다음 명령을 합니다.

```sh
go run main.go
```

이렇게 작성하면 코드를 컴파일하지 않고 실행합니다.

## GOPATH and reading go docs

https://www.youtube.com/watch?v=QEZlivtFOZk

go run main.go

go는 go 프로그램 명령입니다. run 명령입니다. main.go는 실행할 파일입니다.

대부분의 언어는 help를 지원합니다.

```txt
Go is a tool for managing Go source code.

Usage:

	go <command> [arguments]

The commands are:

	bug         start a bug report
	build       compile packages and dependencies
	clean       remove object files and cached files
	doc         show documentation for package or symbol
	env         print Go environment information
	fix         update packages to use new APIs
	fmt         gofmt (reformat) package sources
	generate    generate Go files by processing source
	get         add dependencies to current module and install them
	install     compile and install packages and dependencies
	list        list packages or modules
	mod         module maintenance
	work        workspace maintenance
	run         compile and run Go program
	test        test packages
	tool        run specified go tool
	version     print Go version
	vet         report likely mistakes in packages

Use "go help <command>" for more information about a command.

Additional help topics:

	buildconstraint build constraints
	buildmode       build modes
	c               calling between Go and C
	cache           build and test caching
	environment     environment variables
	filetype        file types
	go.mod          the go.mod file
	gopath          GOPATH environment variable
	gopath-get      legacy GOPATH go get
	goproxy         module proxy protocol
	importpath      import path syntax
	modules         modules, module versions, and more
	module-get      module-aware go get
	module-auth     module authentication using go.sum
	packages        package lists and patterns
	private         configuration for downloading non-public code
	testflag        testing flags
	testfunc        testing functions
	vcs             controlling version control with GOVCS

Use "go help <topic>" for more information about that topic.
```

이런 피드백을 받을 수 있습니다.

```sh
go help gopath
```

이렇게 문서를 알게 될 수 있습니다.

```sh
go env GOPATH
```

이명령으로 어디에 설치되었는지 찾을 수 있습니다.

여기로 이동하면 볼 수 있는 것들입니다.

```sh
ls
```

`~go/pkg/mod`에서 다음것들을 볼 수 있습니다.

- cache
- github.com
- golang.org
- honnef.co
- mvdan.cc

나중에 다루지만 여기서 캐시가 중요합니다.
