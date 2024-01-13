---
sidebar_position: 2
tags: ['docker', 'python', 'npm', 'yarn', 'pnpm', 'go mod', 'java']
draft: true
toc_max_heading_level: 6
---

# 개발 환경을 위한 이미지

:::danger 경고

언어 별로 Docker 설정을 분리할지도 모릅니다.

:::

## Python - pip

python 개발자가 백엔드 서버를 만들거나 아니면 재테크를 위해 데이터 분석을 시도하고 있다면 시도해볼 만합니다.

docker를 사용하기 시작하면 python venv 설정은 더이상 필요 없어집니다. 컨테이너가 가상환경인데 가상환경 속에서 가상환경을 사용한다는 것이 웃길 것 같습니다. ~~버튜버(가상 유튜버)가 가상환경인 컨테이너 속에 파이썬 가상환경을 설정합니다.~~

### fast api

```
├── requirements.txt
├── app
│   └── main.py
└── Dockerfile
```

```txt title="requirements.txt"
fastapi
uvicorn
```

```py title="main.py"
from typing import Union
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    return { "Hello" : "docker" }
```

```Dockerfile
FROM python:3.11

WORKDIR /root

COPY ./requirements.txt /root/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /root/requirements.txt

COPY ./app /root/app

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80", "--reload"]
```

일단 위는 [fastapi 공식 문서](https://fastapi.tiangolo.com/ko/deployment/docker/?h=docker)에서 알려주는 docker 설정을 가져왔습니다. 뒤에 `--reload`만 추가했습니다. 컨테이너를 띄우면 실제로 코드 수정마다 업데이트 될 것입니다. ~~하지만 자동 완성 뽕맛을 잃을 것입니다.~~

```sh
docker build -t fast-docker-image .
```

```sh
docker run --name fast-backend -p 80:80 -d -v $(pwd):/code fast-docker-image
```

```
http://localhost:80/
```

### Django

[django 공식 Docker 이미지](https://hub.docker.com/_/django)

```
├── requirements.txt
└── Dockerfile
```

```txt title="requirements.txt"
Django
```

```Dockerfile
# Use an official Python runtime as a parent image
FROM python:3.12

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# 버전 확인
RUN python -m django --version

RUN django-admin startproject config .

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Run Django development server when the container launches
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
```

```sh
docker build -t django-docker-image .
```

```sh
docker run --rm --name django-backend -p 80:8000 -d -v $(pwd):/code django-docker-image
```

```
http://localhost:80/
```

### jupyterlab - 로컬 전용

#### 방법 - 1

```
├── requirements.txt
└── Dockerfile
```

```txt title="requirements.txt"
jupyterlab
numpy
pandas
matplotlib
```

```Dockerfile
# 파이썬 최신 버전을 런타임으로 활용
FROM python:3.11

# 컨테이너 디렉토리 명명 호스트 디렉토리랑 크게 상관없음
WORKDIR /root

# ./requirements.txt을 복사하고 컨테이너 속에 붙여넣기
COPY ./requirements.txt /root/requirements.txt

# requirements.txt을 참고해서 최신버전 패키지로 설치하기
RUN pip install --no-cache-dir --upgrade -r /root/requirements.txt

CMD ["jupyter", "lab", "--ip=0.0.0.0", "--port=8888", "--allow-root"]
```

`--no-cache-dir` 캐시를 활용하지 않아 최신버전을 사용합니다. `--upgrade` 혹시나 업데이트를 놓친 버전에 업데이트합니다. `-r`은 `/root/requirements.txt`을 읽기 위한 플래그입니다.

```sh
docker build -t my-ds .
```

이미지를 만들어냅니다.

```sh
docker run --rm -it -p 8888:8888 my-ds # 터미널에서 서버를 종료하면 컨테이너도 같이 사라짐
```

이제 터미널에서 실행하기 시작하면 됩니다.

```
http://127.0.0.1:8888/lab?token=(토큰값)
```

뭐 해당 링크 들어가면 일단 본인만의 주피터 노트북 환경을 만들기는 한 것입니다. 하지만 아쉬운 점들이 많이 있습니다. 하나는 작업한 노트북은 보존하고 싶습니다. 라이브러리는 삭제를 유지해야 합니다. 또 자동완성이 잘 동작하지 않습니다. 또 여전히 보안문제가 있습니다. `--allow-root`으로 루트 권한으로 실행합니다. 이러한 한계는 어떻게 극복할 수 있는가? 다시 docker 파일로 돌아가봅시다.

#### 방법 - 2

jupyterlab에서 운영하는 [jupyter-docker-stacks 공식문서](https://jupyter-docker-stacks.readthedocs.io/en/latest)를 읽고 적용해주시기 바랍니다.

```txt title="requirements.txt"
jupyterlab
numpy
pandas
matplotlib
```

```Dockerfile
FROM quay.io/jupyter/base-notebook

# Install in the default python3 environment
RUN pip install --no-cache-dir 'flake8' && \
    fix-permissions "${CONDA_DIR}" && \
    fix-permissions "/home/${NB_USER}"

# Install from the requirements.txt file
COPY --chown=${NB_UID}:${NB_GID} requirements.txt /tmp/

RUN pip install --no-cache-dir --requirement /tmp/requirements.txt && \
    fix-permissions "${CONDA_DIR}" && \
    fix-permissions "/home/${NB_USER}"
```

공식문서를 위와 같은 Dockerfile을 발견하고 적용할 수 있을 것입니다. 실제로 보안문제가 없는지는 모르겠습니다.

```sh
docker run -p 10000:8888 quay.io/jupyter/scipy-notebook:2023-11-17
```

위 명령으로 다음 링크를 들어가면 됩니다.

```
http://127.0.0.1:10000/lab/
```

왼쪽이 호스트가 접근할 수 있는 포트이고 오른쪽이 컨테이너가 가동하고 있는 포트입니다. 위는 jupyter docker stacks 문서에서 알려준 방법입니다. 문제는 그냥 체험에 가깝습니다. 우리는 실제 데이터 사이언스를 하면서 중간중간 알아낸 것을 정리하고 커밋을 올려야 합니다.

## JavaScript

순수하게 npm을 사용하기에는 아쉬운 점이 많아 yarn, pnpm도 다루겠습니다. ~~bun은 좋지만 싫어요~~

<!-- 자바스크립트는 패키지 매니져도 표준화된 것이 없습니다. -->

## Java

### Go mod

저는 모든 언어가 취약하다고 가정합니다. 심지어 go 언어도 취약하다고 생각합니다. 보안 취약점 문제를 갖고 있다고 생각합니다.

### Java

우리나라에서 제일 중요한 언어를 Dockerize하는 방법입니다.
