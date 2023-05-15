---
sidebar_position: 1
tags: ["python", "requirements.txt", "venv"]
---

# 가상환경 공유

프론트엔드 입장에서 파이썬의 `.venv`은 `node_modules`과 비슷합니다. 그리고 `requirements.txt`는 `package.json`과 비슷합니다.[^1]

## 가상환경을 공유하는 법

가상환경 `venv` 폴더는 `gitignore`처리합니다. 공유하는 방법은 생각보다 쉽습니다.

### 1. 루트 디렉토리로 이동

루트 디렉토리로 이동합니다. `cd ..`, `pwd`으로 디렉토리를 이동하고 확인합니다.

### 2. 가상환경 생성

```sh
python3 -m venv .venv
```

이렇게 되면 파이썬 가상환경 폴더가 생성됩니다.

### 3. `.gitignore` 추가

```sh
touch .gitignore # .gitignore 생성
```

`.gitignore`에는 다음 내용을 추가합니다.

```txt
.venv
```

### 4. 가상환경 활성화

```sh
. .venv/bin/activate
```

이제 원하는 파이썬 라이브러리 및 패키지를 북치고 장구치고 마음대로 설치합니다. 설치 후 팀원에게 공유하려면 설정을 기록해야 합니다.

### 5. `requirements.txt` 생성 및 기록

`requirements.txt`을 먼저 생성합니다. 그리고 현재 설정한 파이썬 환경을 기록합니다.

```sh
touch requirements.txt
```

```sh
pip3 freeze > requirements.txt # 현재 설정 기록
```

이제 `requirements.txt`에 기록이 남습니다.

```txt
click==8.1.3
dnspython==2.2.1
Flask==2.2.2
importlib-metadata==5.0.0
itsdangerous==2.1.2
Jinja2==3.1.2
MarkupSafe==2.1.1
pymongo==4.3.2
Werkzeug==2.2.2
zipp==3.10.0
```

파일속이 이렇게 생겼으면 맞게 한 것입니다. 그리고 `commit`하고 `push` 합니다. 이렇게 되면 다른 팀원도 python 가상환경의 패키지를 공유받을 수 있습니다.

### 6. 가상환경 공유 받기

프로젝트를 최초 실행할 때는 아래 명령을 합니다.

```sh
python3 -m venv .venv # 가상환경 설치
. .venv/bin/activate # 가상환경 활성화
pip3 install -r requirements.txt # 가상환경 반영
```

이미 어느정도 작업을 진행하고 중간에 패키지를 추가, 갱신, 삭제한 경우에는 다음 명령만 합니다.

```sh
pip3 install -r requirements.txt # 가상환경 반영
```

이명령은 `requirements.txt`을 현재 로컬에 가상환경으로 반영하겠다는 것입니다.

그리고 가상환경이 켜져있는지 항상 확인합니다.

<!-- ## certifi

```py
from pymongo import MongoClient
import certifi

ca = certifi.where()

client = MongoClient('mongodb+srv://???:???@cluster0.?????.mongodb.net/Cluster0?retryWrites=true&w=majority', tlsCAFile=ca)
db = client.test

doc = {
  'name':'bob',
  'age':27
}

db.users.insert_one(doc)
```

협업하는 사람 중 한명이 윈도우 사용하고 있었습니다. 이 패키지까지 설치하니까 문제가 사라졌습니다. -->

## 참고

VScode에서 파이썬 설정하기

1. `cmd` + `shift` + `p` 으로 커맨드 팔랫트를 활성화
2. Python: select interpreter 선택
3. `./.venv/bin/python` 혹은 본인이 파이썬 설치한 디렉토리 선택

가끔 파이썬 정상동적을 안할 때가 있습니다.

[^1]: [daleseo - 파이썬에서 venv로 가상 환경 사용하기](https://www.daleseo.com/python-venv/)
