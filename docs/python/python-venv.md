---
sidebar_position: 1
tags: ["certifi", "git stash", "python", "requirements.txt", "venv"]
---

# 가상환경 공유

## 가상환경을 공유하는 법

가상환경 `venv` 폴더는 `gitignore`처리합니다. 공유하는 방법은 생각보다 쉽습니다.

루트 디렉토리로 이동합니다.

```sh
python3 -m venv .venv
```

이렇게 되면 파이썬 가상환경 폴더가 생성됩니다.

```sh
touch .gitignore # .gitignore 생성
```

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

파일속이 이렇게 생겼으면 맞게 한 것입니다. 그리고 `git pull`하고 다음 명령하면 됩니다.

```shell
pip install -r requirements.txt
```

이명령은 `requirements.txt`을 현재 로컬에 가상환경으로 반영하겠다는 것입니다. README.md나 wiki 같은데 작성해두면 초보 개발자는 혼란스럽지 않을 것 같습니다.

## certifi

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

협업하는 사람 중 한명이 윈도우 사용하고 있었습니다. 이 패키지까지 설치하니까 문제가 사라졌습니다.
