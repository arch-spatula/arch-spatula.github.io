---
sidebar_position: 97
description: '보안'
tags: ['보안']
draft: true
---

# 보안

기본적으로 모든 보안은 취약합니다. 언젠간 모든 비밀번호는 뚤리게 되어 있습니다. 단지 중요한 것은 우리가 살아있는 동안 또 죽은 후에 자식이 상속을 받거나 유언에 따라 재산이 의도한대로 집행될때 까지 뚤리지 않는 것이 중요합니다.

이 의미를 잘 생각해보기 바랍니다. 먼저 시간은 무한하지만 인간의 생명은 유한한합니다. 인간 생명의 유한함을 초과할 시간동안 보호할 수 있으면 됩니다. 데이터 베이스에 비밀번호를 바꾸지 않는다면 해커는 언젠간 어느 세월에 결국 알아낼 것입니다. 해커의 자식이 가업인 해킹을 물려받아 이어서 부루트포스 공격을 하고 있을 수 있습니다.

보안분야는 알고리즘이 특이합니다. 방어하기 위해 공격하는 시간복잡성을 늘리는 것이 관건입니다.

---

## 현실

첫째로 보안은 기술적인 측면은 견고하지만 사람과 관련된 부분은 상당히 허술합니다. 암화 라이브러리는 상당히 많고 커뮤니티를 통해 보안을 수월하게 구축할 수 있습니다.

기업 측면에서 허술한 점이 많습니다. 첫째로 의도적으로 당연히 불법인 정보를 매매하는 기업도 많습니다. 사용자의 비밀번호를 저장하고 다른 기업에 그대로 판매하는 경우도 많습니다. 또 때로는 직원 몇명은 평서문이 더 안전하고 사용성에 좋기 때문에 hash랑 salt를 사용하는 것이 오히려 더 취약하고 오래된 방법이러고 주장하는 사람들도 있습니다. 가끔은 매니저 및 경영진이 보안정책에 관여해서 평서문으로 저장하도록 요구하는 경우도 많습니다.

공공기관은 철저할 것 같지만 그렇지 않습니다. 공공기관도 유출이력도 많고 IT 지식이 없어서 평서문으로 DB에 저장하는데 이것이 비정상인줄 모르는 기관도 상당히 많습니다. SI에 외주를 주는데 이런 것도 안 하는 곳이 상당히 많습니다. 또 극단적인 경우 백도어를 열어 놓고 또 정보를 몰래 매매하는 경우도 있습니다. 공공기관에는 개인정보가 상당히 많이 노출되어 있고 공무원이 마음만 먹으면 충분히 도용할 수 있습니다.

IT 감사는 존재하고 처벌 규정은 있습니다. 하지만 법학의 관점을 활용하면 사문화된 조항이라고 간주해야 합니다. 입증은 원고의 책임입니다. 기업이 비밀번호 저장 과정이 기업 비밀이고 본인 해쉬만 접근할 수 있다고 하면 대충 uuid로 대충 뽑아줄 것입니다.

이것에 대한 결론은 단순합니다. 비밀번호는 이미 취약하고 다른 인증 수단을 활용해서 방어해야 합니다. 그리고 새로운 서비스를 가입할 때마다 다른 인증서비스를 활용해서 최대한 비밀번호가 저장이 안되거나 서버에서 의미로 생성되게 만들어야 합니다.

### 사회공학

저는 사회학을 전공했습니다. 사회학과 사회공학은 서로 무관합니다. 절대 사회학을 공학적 관점으로 보는 것이 아닙니다.

사회공학이라는 것은 국정원에서 가르칠 내용입니다. 상대의 신뢰를 얻고 상대의 결혼 기념일 자식의 생일 같은 의미있는 정보를 받아내는 과정입니다. 이런 정보를 비밀번호에 활용하는 경우가 많습니다. 사회공학을 일상에서 활용한다면 최근에 부부가된 친구 집의 문 비밀번호는 높은 확률로 결혼기념일일 가능성이 높습니다. ~~근처에 살고 있다면 귀중품 절도에 활용해볼 수 있을 것 같습니다.~~

### MFA

다중 인증은 주로 휴대폰에 OTP처럼 사용할 수 있습니다. 해킹할 디바이스도 접근해야 합니다. 이렇게 되면 해킹난이도가 상당히 높아집니다.

## 인증인가 쿠키

로그인이 필요한 서비스는 많이 개발 해봤습니다.

인증과 인가를 구분할 수 있어야 합니다. 쿠키, 세션, 토큰 모두 구분하고 설명할 수 있어야 합니다.

axios로 JWT를 서버에 보내는 법도 배웁니다.

인증은 간단합니다. 인증은 서비스를 이용하려는 유저가 등록된 회원인지 확인하는 절차입니다. 로그인한다는 것이 인증하는 절차입니다. 유저가 자기 본인인지 인증하는 것입니다.

인가는 특정 리소스에 접근할 수 있는 권한을 확인하는 절차입니다. 로그인만 인가로 생각하기 쉽습니다.

유저가 마이페이지에 개인정보를 받아오는 요청을 날리면 이것은 인가입니다. 유저가 본인정보에 대한 권한이 있는 것입니다. 서버는 인가하고 요청에 대응되는 리소스를 응답합니다.

인증과 인가를 구현할 때는 쿠키, 세션, 토큰 3가지 수단이 있습니다. 하지만 그전에 http 프로토콜의 2가지 특징을 이해해야 합니다.

서버는 무상태입니다. 서버는 클라이언트의 상태를 기억하지 않습니다. 이전 요청을 캐싱하는 것같은 행위는 없습니다. 서버에게는 매번 새로운 요청입니다. 이런 무상태라는 특성 덕분에 서버를 여러개로 확장하기 쉽습니다. 스케일아웃하기 쉽습니다.

비연결성입니다. 클라이언트와 서버는 요청과 응답이 돌아오면 연결은 끝납니다. 1대의 서버로 여러 클라이언트의 요청에 대응할 수 있습니다. 실시간 채팅같은 서비스는 양방향 통신을 계속 해야 합니다. 이럴 때는 웹소캣 프로토콜로 처리하게 됩니다.

이 2가지 개념을 갖고 출발해야 합니다.

쿠키는 http 프로토콜 특성과 무관하게 상태를 기억하는 것처럼 구현할 수 있게 해줍니다. 쿠키는 브라우저에 저장되는 텍스트파일이고 해쉬맵형태로 저장됩니다.

다른 웹 저장소로 쿠키 저장소가 따로 있다고 생각하면 편합니다.

쿠키는 삭제 혹은 만료전까지는 서버랑 통신할 때 자동으로 주고 받습니다. 쿠키를 저장만 하면서버에 요청을 보낼 때 마다 요청해더에 포함되어 보내집니다. 쿠키는 참고로 사용자가 브라우저에서 임의로 만들수 있습니다.

인증상태를 쿠키에 담아서 주고 받으면 간편합니다. 무상태와 비연결성을 극복하는 한가지 수단입니다. 상태를 기억하는 것처럼 서버랑 브라우저 통신에 자주 사용합니다.

당연히 한계가 있습니다. 쿠키는 동일한 CORS를 허용하는 origin에만 보낼 수 있습니다.

origin입니다. url에서 프로토콜, 호스트 및 도메인, port 3가지를 합치면 origin이라고 부릅니다. 상식입니다.

CORS는 다른 출처의 리소스 요청을 허용하는 정책입니다. 브라우저는 기본적으로 같은 origin에서만 리소스를 요청할 것을 허용합니다. 즉 SOP 정책입니다. 하지만 이 정책을 의도적으로 풀어두는 것입니다.

CORS는 허용하는 보안 정책입니다. 동일한 origin 혹은 CORS를 허용할 Origin만 쿠키를 보낼 수 있습니다.

## JWT의 다른 이름 HMAC

암호학에서 HMAC(keyed-hash message authentication code, hash-based message authentication code)는 암호화 해시 함수와 기밀 암호화 키를 수반하는 특정한 유형의 메시지 인증 코드(MAC)

[HMAC - 위키피디아](https://ko.wikipedia.org/wiki/HMAC)

유튜브 돌아다니다가 발견했습니다.

## 인증인가 세션

세션이란 무엇인가? 세션이 종료 혹은 만료되었다고 경고창을 봤을 것입니다. 세션이란 클라이언트와 서버 사이 연결이 활성화된 상태를 의미합니다. 또는 인증이 유지되는 상태라고 합니다.

연결이 활성화 된 상태는 http 프로토콜 특성과 다릅니다. 기본적으로 서버는 클라이언트의 상태를 기억하지 않는 다고 했습니다. http 프로토콜의 특징은 유지됩니다. 중요한 것은 구현하는 방식입니다.

로그인에 성공하면 서버에서 해쉬맵 자료형으로 저장하고 브라우저에 응답으로 인증 증표를 제공합니다.

로그인 혹은 회원가입을 하면 인증이라는 절차가 생깁니다. 클라이언트가 로그인 요청을 보냅니다. 서버는 받아오는 아이디와 비번을 확인하고 회원이 존재하면 객체를 서버에 넘깁니다. 서버는 인증차별을 위해서 세션 아이디를 만들고 키와 값으로 만들고 값은 서버가 저장하고 키는 클라이언트에게 응답합니다. 응답 해더에 포함됩니다. 자동으로 쿠키스트로지에 저장됩니다.

브라우저에서 응답해더 Set-Cookie에서 확인하도록 합니다.

인가가 필요할 때 입니다. 인가가 필요한 요청을 보냅니다. 서버는 제일 먼저 인가의 절차를 밟습니다. 세션이 유효한지 확인합니다. 세션 스토리지에 유효한지 먼저 검증합니다. 서버는 데이터베이스에 쿼리를 날립니다. 클라이언트에 응답으로 돌려주는 절차입니다.

세션 페이지입니다.

```js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SessionPage() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('아직 인증 안됨');
  const [data, setData] = useState([]);
  const BASE_URL = 'http://localhost:4000';
  const handleLogin = async () => {
    const response = await axios.post(
      `${BASE_URL}/login`,
      {
        id,
        password,
      },
      { withCredentials: true }
    );
    setId('');
    setPassword('');
    console.log('response:', response);
    if (response.status === 200) {
      setStatus('인증 완료');
    }
  };

  const getData = async () => {
    const response = await axios.get(`${BASE_URL}/product-list`, {
      withCredentials: true,
    });
    console.log('response:', response);
    setData(response.data.data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>세션 인증/인가</h1>
      <h3>
        로그인을 통해 등록된 회원임을 인증합니다. 인증 성공 시 쿠키에
        sessionId가 들어옵니다.
      </h3>
      <div>
        <div style={{ width: 30, display: 'inline-block' }}>ID:</div>{' '}
        <input value={id} onChange={(e) => setId(e.target.value)} />
      </div>
      <br />
      <div>
        <div style={{ width: 30, display: 'inline-block' }}>PW:</div>{' '}
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={'password'}
        />
      </div>
      <br />
      <button onClick={() => handleLogin()}>로그인 (인증)</button>
      <span
        style={{
          marginLeft: 10,
          color: status === '인증 완료' ? 'green' : 'red',
        }}
      >
        {status}
      </span>
      <br />
      <br />
      <h3>
        인가가 필요한 데이터를 요청합니다. 요청 시 쿠키에 들어 있는 sessionId가
        서버로 자동으로 보내집니다.
      </h3>
      <button onClick={() => getData()}>리스트 요청 (인가)</button>
      {data.length === 0 && (
        <div style={{ marginTop: 10 }}>받아온 데이터가 없습니다.</div>
      )}
      {data.map((product) => (
        <div style={{ marginTop: 10 }} key={product.id}>
          제품명: {product.name}
        </div>
      ))}
      <br />
      <br />
      <button onClick={() => navigate('/token')}>
        토큰 인증 페이지로 이동
      </button>
    </div>
  );
}
```

axios라이브러리의 3번째 인자가 중요합니다. config 객체를 매개변수로 사용합니다.

https://axios-http.com/kr/docs/req_config

`{ withCredentials: true }`의 영어 의미를 읽어보면 서로 다른 출처에서 쿠키를 읽을 수 있도록 설정할 수 있습니다. 여기는 프론트엔드의 업부입니다. 다른 백엔드도 설정이 필요합니다.

```js
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 4000;
app.use(cookieParser());
app.use(express.json()); // 요청에서 넘어온 body data json화

const corsOptions = {
  origin: true,
  credentials: true,
};
app.use(cors(corsOptions)); // 모든 cross origin 요청 허용

// 세션 저장소
let session = {};

// 로그인 API (세션 인증)
app.post('/login', (req, res) => {
  const { id, password } = req.body;
  console.log('req.body:', req.body);

  // DB 에서 client에서 받아온 id, password에 해당하는 회원 정보 있는 거 확인 했다고 가정
  const newSessionId = uuidv4();
  session[newSessionId] = { id };

  res.cookie('sessionId', newSessionId); // 응답 헤더의 Set-Cookie 속성에 쿠키 값 할당
  return res.status(200).send('로그인 성공');
});

// 리스트 API (인가)
const productList = [
  { id: 1, name: 'product01' },
  { id: 2, name: 'product02' },
  { id: 3, name: 'product03' },
];

app.get('/product-list', (req, res) => {
  // cookie에서 들어온 sessionId가 세션 저장소에 존재하는 지 확인

  const { sessionId } = req.cookies;
  if (!sessionId) {
    // 클라이언트 쿠키에서 sessionId가 없거나 세션 저장소에 해당 세션 ID없다면 세션 만료
    res.status(401).send('쿠키에서 넘어온 세션ID가 없습니다.');
    return;
  }
  if (!session[sessionId]) {
    res
      .status(401)
      .send(
        '세션 저장소에 해당 sessionId가 존재하지 않습니다. 세션 만료 상태. 다시 로그인 해주세요'
      );
    return;
  }
  // DB 에서 해당 데이터(productList) 가져왔다고 가정
  return res.status(200).json({ data: productList });
});

app.get('/', (req, res) => {
  res.status(200).send('Hello my server!');
});

app.listen(port, () => {
  console.log(`서버가 포트번호 ${port}에서 열렸습니다.`);
});
```

`app.use(cors({origin: true, credentials: true,}))` 이부분이 CORS 정책을 허용한 것입니다.

여기는 express로 처리한 예시입니다.

세션 스토리는 데이터 베이스는 구현도 필요합니다. 현재 예시에는 없습니다.

CORS는 클리언트와 서버 모두 합의가 있어야 처리가 됩니다.

## 인증인가 토큰

인증과 인가의 수단으로 토큰도 하나의 수단입니다. 토큰은 클라이언트에서 보관하는 암화되 된 인증정보입니다. 토큰은 서버 부담을 줄일 수 있는 수단입니다. 웹에서 제일 많이 사용하는 JWT 토큰이 존재합니다. 프론트엔드는 자주 접하게 될 것입니다. header.payload.signature 영역으로 구성됩니다. 국제 인터넷 표준 인증 규걱 중 하나입니다.

https://jwt.io/

header는 암호화 알고리즘, 토큰 타입이 적성되어 있습니다. 타입은 JWT이고 알고리즘은 가변적입니다.

signature는 해더와 함께 공변적입니다. payload는 인증데이터입니다. 세션 인증은 서버의 세션 저장소에 저장합니다. 하지만 JWT는 클라이언트에서 정보를 보관하기 때문에 서버의 부담이 덜합니다.

시크릿 키는 JWT를 만들 때 반드시 필요합니다. 서버에서 보관하는 값입니다. 서버가 보안 설정을 하게 됩니다. payload는 공개된 정보입니다. payload 정보는 누구나 복호화해서 확인할 수 있습니다.

토큰을 활용하는 이유는 정보보호가 아니라 위조 방지가 목적입니다. 즉 공개되어 괜찮은 정보를 주고 받을 때 사용해야 합니다. 토큰이 유효하면 인가처리하게 되는 로직으로 처리됩니다.

클라이언트가 아이디 비번을 서버에게 날립니다. 서버는 받아서 데이터 베이스에 확인하고 멤법 데이터를 인증상태로 처리합니다. JWT를 만들어냅니다. 시크릿 키로 만듭니다. 해당하는 토큰을 응답으로 Set-Cookie 혹은 body에 담겨있습니다. 이부분은 백엔드 엔지니어가 알아서 처리하는 영역입니다. 서버는 응답으로 받으면 브라우저는 저장이 처리 될 것입니다.

```js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import axios from 'axios';
export default function TokenPage() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('아직 인증 안됨');
  const [data, setData] = useState([]);
  const BASE_URL = 'http://localhost:4001';

  const cookies = new Cookies();

  const handleLogin = async () => {
    const response = await axios.post(
      `${BASE_URL}/login`,
      {
        id,
        password,
      },
      { withCredentials: true }
    );
    setId('');
    setPassword('');
    console.log('response:', response);

    if (response.status === 200) {
      setStatus('인증 완료');
    }
  };

  const getData = async () => {
    const accessToken = cookies.get('accessToken');
    console.log('accessToken:', accessToken);
    const response = await axios.get(`${BASE_URL}/product-list`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('response:', response);
    setData(response.data.data);
  };
  return (
    <div style={{ padding: 20 }}>
      <h1>토큰 인증/인가</h1>
      <h3>
        로그인을 통해 등록된 회원임을 인증합니다. 인증 성공 시 쿠키에
        accessToken이 들어옵니다.
      </h3>
      <div>
        <div style={{ width: 30, display: 'inline-block' }}>ID:</div>{' '}
        <input value={id} onChange={(e) => setId(e.target.value)} />
      </div>
      <br />
      <div>
        <div style={{ width: 30, display: 'inline-block' }}>PW:</div>{' '}
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={'password'}
        />
      </div>
      <br />
      <button onClick={() => handleLogin()}>로그인 (인증)</button>
      <span
        style={{
          marginLeft: 10,
          color: status === '인증 완료' ? 'green' : 'red',
        }}
      >
        {status}
      </span>
      <br />
      <br />
      <h3>
        인가가 필요한 데이터를 요청합니다. 요청 시 쿠키에 들어 있는
        accessToken을 헤더의 Authorization에 넣어 서버에 보냅니다.
      </h3>
      <button onClick={() => getData()}>리스트 요청 (인가)</button>
      {data.length === 0 && (
        <div style={{ marginTop: 10 }}>받아온 데이터가 없습니다.</div>
      )}
      {data.map((product) => (
        <div style={{ marginTop: 10 }} key={product.id}>
          제품명: {product.name}
        </div>
      ))}
      <br />
      <br />
      <button onClick={() => navigate('/')}>세션 인증 페이지로 이동</button>
    </div>
  );
}
```

```js
const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
const port = 4001;
app.use(cookieParser());
app.use(express.json()); // 요청에서 넘어온 body data json화

const corsOptions = {
  origin: true,
  credentials: true,
};
app.use(cors(corsOptions)); // 모든 cross origin 요청 허용

// 로그인 API (토큰 인증)
const SECRET_KEY = "mySecretKey"; // 토큰을 만들 때 또는 검증할 때 사용하는 SECRET KEY
app.post("/login", (req, res) => {
  const { id, password } = req.body;
  console.log("req.body:", req.body);

  // 클라이언트에서 받아온 id, password로 DB 에서 회원 정보 있는 거 확인 했다고 가정
  const accessToken = jwt.sign({ id }, SECRET_KEY, { expiresIn: "30m" }); // 토큰 유효기간 30분
  console.log("accessToken from login api:", accessToken);
  res.cookie("accessToken", accessToken);
  return res.status(200).send("로그인 성공!");
});

// 리스트 API (인가)
const productList = [
  { id: 1, name: "product01" },
  { id: 2, name: "product02" },
  { id: 3, name: "product03" },
];

app.get("/product-list", (req, res) => {
  // cookie에서 들어온 sessionId가 세션 저장소에 존재하는 지 확인
  const [_, accessToken] = req.headers["authorization"].split(" ");

  console.log("accessToken:", accessToken);

  if (!accessToken) {
    // 클라이언트 쿠키에서 accessToken이 없으면
    res.status(401).send("쿠키에서 넘어온 엑세스토큰이 없습니다.");
    return;
  }
  // 토큰 검증하여 유효하면 데이터 보내기
  try {
    const result = jwt.verify(accessToken, SECRET_KEY);
    console.log("result:", result);
  } catch (err) {
    console.log("err:", err);
    return res.status(401).send("유효하지 않은 토큰입니다.");
  }
  // 유효한 토큰이므로 DB에서 productList를 가져왔다고 가정.
  return res.status(200).json({ data: productList });
});

app.get("/", (req, res) => {
  res.status(200).send("Hello my server!");
});

app.listen(port, () => {
  console.log(`서버가 포트번호 ${port}에서 열렸습니다.`);
});ta(response.data.data);
};
```

서버와 클라이언트 코드입니다. 데이터 베이스는 구현하지 않았습니다. JWT 라이브러리 임의로 JWT를 만들 수 있습니다. 토큰의 유효기간도 설정할 수 있습니다.

로그인에서 인증처리를 마치면 토큰은 브라우저에 담깁니다.

서버는 유요하기만 하면 응답을 돌려줍니다.

서버로 이렇게 주고 받는 컨벤션은 자주 보게 될 것입니다.

시크릿키로 만든 토큰이기 때문에 시크릿키로 검증하는 것이 가능합니다.

엑세스 토큰이 탈취될 가능성이 있을 때는 리프레쉬 토큰을 적용하게 됩니다. 엑세스 토큰을 길게 가져가야 합니다.

엑세스 토큰과 리프레쉬 토큰을 모드 만들고 엑세스 토큰을 요청해서 유지하도록 합니다. 리프레쉬 토큰은 대략적으로라도 알아야 합니다. 엑세스 토큰이 만료되었지만 리프레쉬 토큰이 만료되어 있지 않으면 엑세스 토큰을 갱신시켜줍니다. 반대는 없습니다.

|                    | 세션 인증 | 토큰 인증  |
| ------------------ | --------- | ---------- |
| 인증정보 저장 위치 | 서버      | 클라이언트 |
| 확장성(Scale-out)  | Bad       | Good       |
| 보안성 (상대적)    | Good      | Bad        |
| 비용 (상대적)      | Expensive | Cheap      |

확장성은 토큰이 유리합니다. 하지만 보안이 상대적으로 낮습니다. 세션을 기술적인 부담과 비용이 존재합니다. 보안은 세션이 더 유리합니다. 토큰은 리프레쉬 토큰을 적용할 수 있지만 세션은 서버에서 처리할 수 있는 보안의 자유도가 높습니다. 비용은 인증을 서버에서 보관하기 때문에 더 비쌉니다.
