---
sidebar_position: 5
description: 'http'
tags: ['http', 'https', 'API']
draft: true
---

# HTTP

서버컴퓨터도 클라이언트가 될 수 있기 때문에 그렇습니다.

[Full HTTP Networking Course – Fetch and REST APIs in JavaScript](https://www.youtube.com/watch?v=2JYT5f2isg4)

예제가 많은 튜토리얼입니다. 웹크롤러를 바닥부터 만들어보는 과정입니다.

며칠 걸릴 수 있는 튜토리얼입니다.

백엔드 엔지니어를 양성하는 과정의 튜토리얼의 일부입니다.

기본적인 자바스크립트 문법과 ES6 문법도 이해는 해야 수강할 수 있습니다. 물론 강의 중에 부가적인 설명을 제공해주기는 할 것입니다.

## Ch 1 - Why HTTP

왜 HTTP가 의미있는가? 20년전에 이미지 공유는 쉽지 않았습니다. 사진을 찍는 것은 쉬웠습니다. 지금은 찍는 것도 공유하는 것도 쉽습니다.

인스타그램은 인터넷으로 사진 공유를 쉽게 한것이 성공 요인 중 하나입니다.

사이트를 방문할 때마다 하나의 http 프로토콜을 따릅니다. p가 프로토콜입니다. 프로토콜은 단순히 절차에 불과합니다.

"손을 드시오"라고 종이에 적고 전달하면 상대방에게 주면 상대방은 손을 들것입니다. 이것은 하나의 절차입니다. 종이에 작성된 문자와 전달하는 절차가 서로 동의하면 통신이 가능합니다.

인터넷 통신 절차는 유사합니다. 서로 동의한 절차를 따르면 통신이 가능합니다. 그저 정보를 보내고 주고 받는 절차에서 정보를 받아 파싱해서 유용하게 사용이 가능해집니다.

결국 주고받는 바이너리에 불과합니다. 정보를 주고 그 정보를 처리하고 이미지같은 정보를 처리하고 서로 공유하는 것이 상당히 강력하게 해주는 것입니다.

https://boot.dev/course/5d804c54-887a-4c1c-b8c7-b6436f3a132e/cc432d80-1fb1-4a2e-8aa8-7a455a8a1ff1/09ed0562-5760-4a78-919a-0233fa9b3227

```js
const apiKey = generateKey();
const items = await getItemData();

logItems();

// don't touch below this line

async function getItemData() {
  const response = await fetch(
    'https://api.boot.dev/v1/courses_rest_api/learn-http/items',
    {
      method: 'GET',
      mode: 'cors',
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.json();
}

function generateKey() {
  const characters = 'ABCDEF0123456789';
  let result = '';
  for (let i = 0; i < 16; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function logItems(items) {
  for (const item of items) {
    console.log(item.name);
  }
}
```

문제입니다. `getItemData`은 서버에 데이터를 요청합니다.

```js
const apiKey = generateKey();
const items = await getItemData();

logItems(items);

// Healing Potion

// Light Leather

// Padded Leather

// Haste Potion

// Leather Scraps

// Copper Ore

// Copper Bar

// Iron Ore

// Iron Bar

// Gold Ore
```

http의 요청응답시스템입니다. 클라이언트는 우리가 다루는 컴퓨터입니다. 그리고 서버는 요청에 응답받는 컴퓨터입니다. 서버는 프로세스를 처리하고 응답을 합니다. 이것이 요청응답 라이프사이클입니다.

단순하게는 질문 응답시스템으로 생각하는 것이 직관적입니다.

클라이언트는 서버에 요청하고 서버는 웹사이트로 응답하는 경우가 상당히 일반적입니다. URL을 접속하면 서버는 URL에 해당하는 응답을 합니다.

JSON은 URL에서 일반적인 데이터를 얻는 방법입니다.

컴퓨터에게 어떤 요청을 하게 만들지 지정해두는 것입니다. https 이외 다양하게 존재합니다. 하지만 http만이 url을 사용하는 것은 아닙니다.

일반적으로 프론트엔드는 클라이언트에 존재합니다. 사용자가 보는 것은 정의합니다. 백엔드는 보이지 않는 나머지 모든 것입니다.

youtube를 키면 인터페이스가 바로 보입니다. 이것은 시각적인 인터페이스입니다. 당연히 휴대폰에는 모든 유튜브 데이터를 저장하지 않습니다. 이 데이터를 얻어오기 위해 백엔드에 요청을 보냅니다. 유튜브 데이터센터 백엔드는 그 요청을 처리해줍니다. 컴퓨터가 요청을 보내고 처리하고 응답하는 관계가 생깁니다. 유튜브를 보는 휴대폰이 프론트엔드이고 응답하는 컴퓨터는 백엔드 서버입니다. 클라이언트는 영상도 있지만 댓글도 존재합니다. 어떤 서버는 영상을 저장하고 어떤 서버는 댓글을 따로 저장합니다. 백엔드의 경우 영상으로 응답하기 전에 다른 댓글을 보관하는 백엔드에게 요청을 보냅니다. 이렇게 되면 요청을 보낸 서버가 클라이언트가 됩니다. 클라이언트와 서버는 요청과 응답의 맥락상 존재하는 관계에 따라 다릅니다.

서버컴퓨터도 클라이언트가 될 수 있기 때문에 그렇습니다.

Fetch API는 단순히 요청을 제어하는 자바스크립트 내장 함수와 도구들입니다. 모든 로직을 바닥부터 작성해야 하면 재앙일 것입니다.

```js
const response = await fetch(url, settings);
const responseData = await response.json();
```

`fetch`는 브라우저가 제공합니다. `url`이 첫번째 인자입니다. `await`는 비동기 처리합니다. 요청을 보내고 잠시 다른 일을 처리하는 키워드입니다.

JSON 데이터를 응답으로 받는 것을 알 수 있습니다. `response.json()`은 응답을 파싱처리해줍니다.

```js
const apiKey = generateKey();
const url = getURL();
const settings = getSettings();

const response = fetch(url, settings);
const responseData = await response.json();

logItems(responseData);

// don't touch below this line

function getSettings() {
  return {
    method: 'GET',
    mode: 'cors',
    headers: {
      'X-API-Key': apiKey,
      'Content-Type': 'application/json',
    },
  };
}

function getURL() {
  return 'https://api.boot.dev/v1/courses_rest_api/learn-http/items';
}

function generateKey() {
  const characters = 'ABCDEF0123456789';
  let result = '';
  for (let i = 0; i < 16; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function logItems(items) {
  for (item of items) {
    console.log(item.name);
  }
}
```

클라이언트 컴퓨터는 서버인 경우는 대부분 없습니다. 모바일은 당연히 HTTP client이지만 컴퓨터이기 때문에 서버로 활용하는 것도 가능하지만 대부분의 경우 클라이언트입니다.

```js
const apiKey = generateKey();
const url = getURL();
const settings = getSettings();

const response = await fetch(url, settings);
const responseData = await response.json();

logItems(responseData);
```

서버는 시동하면 요청을 받도록 대기만하고 항상켜져있습니다. 많은 어플리케이션이 그런 방식으로 동작하지 않습니다. 서버만 조금 특이한 점입니다. 또 필요하면 수동으로 꺼야 합니다.

좋은 웹 서버는 항상켜져있습니다.

서버는 당연히 백엔드 어플리케이션입니다. 시각적으로 제어하지 않습니다.

모든 컴퓨터는 서버가 될 수 있습니다. 하지만 서버는 데이터를 제공하기 위해 만들어졌습니다. 이것을 논하기 전에 현대 인터넷의 동작방식을 이해해야 합니다. 일반적으로 새로운 웹 회사는 데이터센터에 서버를 구동합니다. 그런 컴퓨터는 서버사이드 작업에 최적화되어 있습니다. 현실적으로 모든 컴퓨터에 서버를 구동할 수 있습니다. 개발하는 동안에는 개인용컴퓨터에 구동시키는 경우가 일반적이지만 프로덕션에서 비용당 효율이 높은 것은 서버 컴퓨터를 활용하는 것이 좋습니다.

## Ch 2 - DNS

https://youtu.be/2JYT5f2isg4?t=1652

https://boot.dev/course/5d804c54-887a-4c1c-b8c7-b6436f3a132e/32b924f8-c32a-458b-bab4-2eab421749de/73a84056-e022-4f1f-9192-be8a6231d2ed

웹 주소입니다. 저는 저의 컴퓨터가 있고 다른 서버랑 통신하고 싶습니다. 문제는 인터넷은 저의 컴퓨터와 서버보다 더 다양한 컴퓨터들이 존재합니다. 어떻게 저는 라우팅 방식을 이해해서 직접 그 특정 서버랑 통신하는가? 이 때 들어오는 개념이 웹 주소 IP입니다.

8.13.156.7 이렇게 생겼습니다. 4개의 영역으로 점으로 나누어져있습니다. 하나의 영역당 0~255에 값을 가질 수 있습니다. 이외 다양한 주소들을 가질 수 있지만 일단 간단하게 이해하겠습니다.

주소는 쿠팡택배가 혼란없이 우리집에 도착할 수 있게 해주는 것처럼 IP도 동일합니다. IPv4는 방금 이야기 한 주소 형식입니다. 하지만 IPv6는 더 많이 수용할 수 있습니다. 또 콜론으로 구분합니다. 1:1:1:1:1:0 이렇게 생겼습니다. 더 많은 경우의 수를 수용할 수 있습니다. 지금은 IPv4만으로 부족해지고 있습니다. 그래서 IPv6가 점진적으로 활용됩니다.

그래서 IP주소는 2가지를 자주 보게 될 것입니다.

IP 주소를 제공하면 어디서는 열결되어 있으면 통신할 수 있습니다. 반면 쿠팡 IP 주소를 딱히 알지 않습니다. 아무도 이렇게 안 외웁니다. 이때 필요한 것은 DNS입니다. 사람이 읽을 수 있게 IP를 바꿔줍니다. 컴퓨터는 도메인을 IP로 변환하고 통신합니다. 쿠팡이 IP를 변경하면 이렇게 IP를 몰래 변경하고 도메인은 그대로 유지할 수 있습니다. 물론 이렇게 되면 유저는 모르는 경로만 바뀔 뿐입니다. 도착은 갖지만 가는길만 조금 달라집니다.

서버에게 http요청은 2단계가 존재합니다.

1. DNS를 Resolve합니다. 도메인 이름을 IP로 처리합니다.
2. IP 주소를 사용해서 해당하는 요청을 보냅니다.

```url
https://en.wikipedia.org/wiki/Miniature_pig
```

`en.wikipedia.org`이 도메인에 해당합니다.

```js
async function fetchIPAddress(domain) {
  const resp = await fetch(
    `https://cloudflare-dns.com/dns-query?name=${domain}&type=A`,
    {
      headers: {
        accept: 'application/dns-json',
      },
    }
  );
  const respObject = await resp.json();

  console.log(respObject);
}

// don't touch below this line

const domain = 'api.boot.dev';
const ipAddress = await fetchIPAddress(domain);
if (!ipAddress) {
  console.log('something went wrong in fetchIPAddress');
} else {
  console.log(`found IP address for domain ${domain}: ${ipAddress}`);
}
```

문제입니다.

```json
{
  "Status": 0,
  "TC": false,
  "RD": true,
  "RA": true,
  "AD": true,
  "CD": false,
  "Question": [{ "name": "api.boot.dev", "type": 1 }],
  "Answer": [
    { "name": "api.boot.dev", "type": 1, "TTL": 3600, "data": "34.111.29.119" }
  ]
}
```

> something went wrong in fetchIPAddress

이렇게 응답받은 객체가 IP만 반환하도록 처리합니다.

```js
async function fetchIPAddress(domain) {
  const resp = await fetch(
    `https://cloudflare-dns.com/dns-query?name=${domain}&type=A`,
    {
      headers: {
        accept: 'application/dns-json',
      },
    }
  );
  const respObject = await resp.json();

  return respObject.Answer[0].data;
}

// don't touch below this line

const domain = 'api.boot.dev';
const ipAddress = await fetchIPAddress(domain);
if (!ipAddress) {
  console.log('something went wrong in fetchIPAddress');
} else {
  console.log(`found IP address for domain ${domain}: ${ipAddress}`);
}
```

정답입니다.

프로그래밍적으로 체크랑 런타임 에러가 발생하지 않도록 만들 수 있습니다.

인터넷에 IP, 도메인을 통해 배포할 때는 웹사이트에 해당하는 HTML, CSS, JavaScript파일과 배포 프로그램이 있어야 합니다. 그리고 배포 기계가 필요합니다. 보통 클라우드 서비스가 대여해줍니다. 서비스가 기계를 대여해주고 배포를 처리해서 IP를 제공해줍니다. 그렇게 되면 도메인을 구매하고 IP를 입력합니다. 도메인이 IP를 가리키게 만듭니다. 이것이 하이레벨입니다.

자바스크립트는 url 파싱처리해주는 API을 갖고 있습니다.

```js
const urlObj = new URL('https://example.com/example-path');
```

```js
function getDomainNameFromURL(url) {
  // ?
}

// don't touch below this line

const bootdevURL = 'https://boot.dev/learn/learn-python';
const domainName = getDomainNameFromURL(bootdevURL);
console.log(`The domain name for ${bootdevURL} is ${domainName}`);
```

문제입니다. url 파싱해서 호스트 이름을 알아내는 것입니다.

https://developer.mozilla.org/ko/docs/Web/API/URL

mdn 스펙입니다.

```js
function getDomainNameFromURL(url) {
  const urlObj = new URL(url);
  return urlObj.hostname;
}

// don't touch below this line

const bootdevURL = 'https://boot.dev/learn/learn-python';
const domainName = getDomainNameFromURL(bootdevURL);
console.log(`The domain name for ${bootdevURL} is ${domainName}`);
```

정답입니다.

DNS는 비유적으로 컴퓨터를 위한 거대한 전화번호부입니다. 확인하고 주소를 찾습니다. 내부 동작원리가 있습니다.

ICANN이 모든 DNS를 운영합니다. ICANN에서 루트네임서버를 찾아서 연락합니다. 그리고 IP 주소를 resolve합니다.

루트 네임서버는 컴퓨터에 기본값으로 설정되어 있습니다.

ICANN은 전화번호부의 출판사와 비슷합니다.

ICANN은 DNS를 구동하는 일도합니다.

DNS는 도메인 이름을 IP주소로 변환해주는 시스템입니다.

서브 도메인입니다. 도메인이름을 프리픽싱합니다. 도메인이름은 호스팅합니다. 서브 도메인은 웹이 서버랑 통신해서 통신하기 위한 도메인입니다. 서브 도메인은 호스트 된 리소스를 분할 관리할 수 있습니다.

```js
const bootdevAPIDomain = 'boot.dev';

// don't touch below this line
const apiKey = generateKey();
const items = await getItemData(bootdevAPIDomain);

logItems(items);

async function getItemData(domain) {
  const response = await fetch(
    `https://${domain}/v1/courses_rest_api/learn-http/items`,
    {
      method: 'GET',
      mode: 'cors',
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.json();
}

function generateKey() {
  const characters = 'ABCDEF0123456789';
  let result = '';
  for (let i = 0; i < 16; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function logItems(items) {
  for (item of items) {
    console.log(item.name);
  }
}
```

문제입니다. API가 바뀌면 1가지 변수만 변형하면 됩니다.

서브도메인 api에 호스팅이 되어 있습니다. 이런 이유로 버그를 고치도록 합니다.

Problem is, there is a bug. The API isn't hosted on boot.dev, it's hosted on the api subdomain! Fix the bug.

> `SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON`

```js
const bootdevAPIDomain = 'api.boot.dev';
```

## Ch 3 - URIs and URLs

https://youtu.be/2JYT5f2isg4?t=2896

https://boot.dev/course/5d804c54-887a-4c1c-b8c7-b6436f3a132e/ae6b0872-c370-41a7-8ba9-f54e216afaec/d3370885-b345-48e2-b9a0-2dcc8f92903b

URI를 가끔 보게 될 것입니다. URL의 상위 개념입니다. I는 식별자입니다. URL은 URL의 종류입니다. URN도 존재합니다.

일반적으로 인터넷은 URL을 다루지만 URI를 보고 당황하지 않도록 합니다. 가끔은 URI를 넣어야 하지만 URL를 넣는 경우도 있습니다.

URI 속에 URL, URN이 포함됩 관계입니다.

```js
function printURLParts(urlString) {
  const urlObj = new URL(urlString);
  // ?
}

// don't touch below this line

const fantasyQuestURL =
  'http://dragonslayer:pwn3d@fantasyquest.com:8080/maps?sort=rank#id';
printURLParts(fantasyQuestURL);
```

연습 문제입니다. url을 보고 이해해보도록 합니다.

연습 문제를 풀기 위한 개념입니다.

```url
http://testuser:testpass@testdomain.com:8080/testpath?testsearch=testvalue#testhash
```

여기서 영역별 설명입니다.

```txt
protocol: http:
username: testuser
password: testpass
hostname: testdomain.com
port: 8080
pathname: /testpath
search: ?testsearch=testvalue
hash: #testhash
```

url에서 username, password는 보게 될 수 있지만 아주 가끔입니다. 하지만 입력하지 않게 합니다. 보통 form 제출로 들어가도록 합니다. @은 호스트 네임과 분할합니다.

port는 http는 80이 기본 값입니다. https는 443가됩니다. 브라우저는 기본적으로 port를 명시하지 않습니다.

path는 웹 사이트에서 다른 페이지별 라우팅을 구분할 때 사용합니다. 페이지 라이팅은 중첩될 수 있습니다.

search는 쿼리 파라미터라는 용어가 더 좋습니다. 물음표 뒤에 다양한 매개변수를 갖게 만들 수 있습니다. 나중에 다룹니다.

해쉬 혹은 프라그먼트라고 합니다. 페이지의 구체적은 섹션에 해당하는 영역을 표시할 때 자주 활용합니다. 또 웹사이트 맥락과 다르게 활용할 때듀 많습니다.

또 URL API를 활용합니다.

Use the following properties on the URL object:

- protocol
- username
- password
- hostname
- port
- pathname
- search
- hash

```js
function printURLParts(urlString) {
  const urlObj = new URL(urlString);
  console.log(`protocol: ${urlObj.protocol}`);
  console.log(`username: ${urlObj.username}`);
  console.log(`password: ${urlObj.password}`);
  console.log(`hostname: ${urlObj.hostname}`);
  console.log(`port: ${urlObj.port}`);
  console.log(`pathname: ${urlObj.pathname}`);
  console.log(`search: ${urlObj.search}`);
  console.log(`hash: ${urlObj.hash}`);
}

// don't touch below this line

const fantasyQuestURL =
  'http://dragonslayer:pwn3d@fantasyquest.com:8080/maps?sort=rank#id';
printURLParts(fantasyQuestURL);
```

url의 8가지 부분입니다.

![url의 8가지 부분](https://user-images.githubusercontent.com/84452145/219051508-d97cdcb9-c4e9-44bb-8810-9efe1fffe941.png)

url을 보면 어떤 프로토콜을 사용하는지 알아야 합니다. 선택적이지 않습니다. 리소스가 사용자명과 비번이 없으면 public 취급합니다. 선택적입니다. 도메인은 당연히 필수입니다. 어디를 접근하는지 알아야 합니다. port는 모든 프로토콜이 존재하지만 안 보일 뿐입니다. port를 볼 때는 스스로 개발할 때 접근하게 됩니다. path는 선택적이지만 `/`은 최소한으로 반드시 존재합니다. 쿼리와 프라그먼트는 당연히 선택적입니다.

암기하려고 노력하기 보단 자주 작업하면서 암기되는 지식입니다.

필수적으로 프로토콜과 도메인이 제일 중요합니다.

프로토콜 연습문제입니다.

- http
- ftp
- mailto
- https

http//에 //이 존재하는 이유는 필수적으로 존재합니다. 또 권위자로 인정하기 때문에 그렇습니다. 하지만 mailto는 콜론으로 끝납니다.

```js
function getMailtoLinkForEmail(email) {
  // ?
}

// don't touch below this line

let email = 'slayer@fquest.app';
console.log(`The mailto link for ${email} is: ${getMailtoLinkForEmail(email)}`);
email = 'killer@fquest.app';
console.log(`The mailto link for ${email} is: ${getMailtoLinkForEmail(email)}`);
```

```js
function getMailtoLinkForEmail(email) {
  return `mailto:${email}`;
}

// don't touch below this line

let email = 'slayer@fquest.app';
정email = 'killer@fquest.app';
console.log(`The mailto link for ${email} is: ${getMailtoLinkForEmail(email)}`);
```

정답입니다.

이제부터 Prot 개념입니다. 웹서비스를 운영하고 있습니다. 저의 서버로 웹을 접근하기 위해 서버에 요청을 보냅니다. 하지만 여기서 문제입니다. 같은 기계에 여러개의 서버를 호스팅하고 싶습니다. 예를 들어 데이터 베이스를 운영하고 싶습니다. Port는 받는 요청을 처리해주는 입구입니다. 같은 기계에 각각 다른 요청을 독립적으로 처리하게 만들 수 있습니다.

예를 들어 하나는 80 다른 하나를 432로 구동하면 각각 port에서 요청을 처리하게 됩니다.

컴퓨터 1대당 65,000 정도 포트를 만들 수 있습니다.

port가 url에 안 보이면 해당하는 프로토콜의 기본값을 대입하고 처리합니다.

http, https는 80, 433을 기본으로 하지만 다른 port를 사용하는 것도 당연히 가능합니다.

전통적인 파일서버는 라우팅을 path를 랜더링 처리합니다. 관습입니다. 라우트 path를 해당하는 파일이름을 랜더링하도록 합니다.

관습적으로 정적 파일 서버는 해당하는 path를 디스크를 url로 처리합니다. 많은 프레임워크는 커스텀 로직으로 path에 따라 각각 다르게 핸들링하게 해줍니다. 그래서 반드시 대응하는 것은 아닙니다.

URL은 해당하는 파일은 웹사이트에는 일반적입니다. 하지만 웹 API에서는 아닙니다.

연습문제입니다.

```js
const url = 'https://api.boot.dev/v1/courses_rest_api/learn-http/users';

// don't touch below this line
const apiKey = generateKey();
const response = await fetch(url, {
  method: 'GET',
  mode: 'cors',
  headers: {
    'X-API-Key': apiKey,
    'Content-Type': 'application/json',
  },
});

const responseData = await response.json();

logLocations(responseData);

function generateKey() {
  const characters = 'ABCDEF0123456789';
  let result = '';
  for (let i = 0; i < 16; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
function logLocations(locations) {
  for (const location of locations) {
    console.log(
      `Location: ${location.name}, Recommended Character Level: ${location.recommendedLevel}`
    );
  }
}
```

api는 path를 파싱하고 해당하는 프론트엔드 로직을 처리하도록 합니다.

여기서 users path말고 locations path가 필요합니다.

```js
const url = 'https://api.boot.dev/v1/courses_rest_api/learn-http/locations';
```

쿼리 파라미터는 요청에서 아주 작은 부분을 변경합니다. 서버는 결국 뭐든 할 수 있습니다. 하지만 쿼리 파라미터는 관습상 변화가 작습니다.

```url
https://www.google.com/search?q=hello+world&oq=hello+world&aqs=chrome..69i57j0i512l3j46i512j0i512j69i60l2.5105j0j7&sourceid=chrome&ie=UTF-8
```

구글에 hello world를 검색한 url입니다. 여기서 `?q`을 발견할 수 있습니다. 즉 검색할 범위를 선정하게 된 것입니다.

검색마다 path를 새로 만들기에는 상당히 비효율적입니다. 새로운 페이지가 딱히 필요하지 않습니다.

쿼리를 동시에 할 수 있습니다. `&`을 활용하는 것입니다.

쿼리 파라미터는 페이지 제어는 가장 덜 활용합니다. 콘텐츠를 제어하거나 마케팅 웹 분석에 많이 활용합니다.

## Ch 4 - Async JavaScript

https://youtu.be/2JYT5f2isg4?t=4581

https://boot.dev/course/5d804c54-887a-4c1c-b8c7-b6436f3a132e/c8469dda-3040-4c4a-9d14-2e2ec5678589/595e1c3e-c01c-4110-bdbd-15db31c25192

동기적 코드는 입문자에게 일상적인 코드입니다. 보이는 순서대로 동작하는 코드입니다. 예측가능하고 직관적입니다.

비동기적인 코드는 여러 작업을 동시에 처리할 수 있습니다.

브라우저 랜더링과 통신을 동시에 처리해야 하면 브라우저는 통신을 보내놓고 다른 랜더링 작업을 처리할 수 있습니ㅏㄷ.

```js
const waitTimeMs = 100;

function callback() {
  console.log('222');
}

console.log('11111');

setTimeout(callback, waitTimeMs);

console.log('33333');
```

> 11111
> 33333
> 222

이렇게 터미널이 응답합니다.

await 키워드는 동시에 작업을 처리하게 만듭니다. 다른 작업을 진행하는 동안 대기 해야 하기 때문에 큐에 올리도록 하는 명령입니다.

이런 비동기 프로그래밍은 하이레벨입니다.

동기프로세스는 하나의 프로세스를 진행하다가 다른 프로세스를 진행하고 다시 원래 프로세스로 돌아옵니다. 비동기 프로세스는 대기같은 작업은 동시에 진행하도록 합니다.

연습문제입니다.

```js
const craftingCompleteWait = 0;
const combiningMaterialsWait = 0;
const smeltingIronBarsWait = 0;
const shapingIronWait = 0;

// Don't touch below this line

setTimeout(() => console.log('Iron Longsword Complete!'), craftingCompleteWait);
setTimeout(() => console.log('Combining Materials...'), combiningMaterialsWait);
setTimeout(() => console.log('Smelting Iron Bars...'), smeltingIronBarsWait);
setTimeout(() => console.log('Shaping Iron...'), shapingIronWait);

console.log('Firing up the forge...');

await sleep(2500);
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
```

현재 터미널은 이렇게 출력합니다.

> Firing up the forge...
> Iron Longsword Complete!
> Combining Materials...
> Smelting Iron Bars...
> Shaping Iron...

대기 시간을 제어해서 아래와 같은 순서로 출력하도록 합니다.

> Firing up the forge...
> Smelting Iron Bars...
> Combining Materials...
> Shaping Iron...
> Iron Longsword Complete!

```js
const craftingCompleteWait = 2000;
const combiningMaterialsWait = 1000;
const smeltingIronBarsWait = 500;
const shapingIronWait = 1500;
```

정답은 이렇게 됩니다.

![동기 vs 비동기](https://user-images.githubusercontent.com/84452145/219847826-2ba08af7-a8fe-4022-96ce-975f15f85c98.png)

비동기 코드는 정말 필요할 때 사용하도록 합니다. 보통 http 요청을 보낼 때 많이 사용합니다. 만약에 동기적으로 처리하면 브라우저는 동작을 멈추게 됩니다. 핑부터 퐁까지 대기 시간을 갖는데 일관적이 않습니다. 데이터 센터 위치는 각각 모두 다릅니다. 이런 작업을 위해서는 비동기적인 코드로 처리해야 합니다.

비동기가 당연히 동기적인 코드보다 우월한 것은 아닙니다. 필요할 때 보통 성능 이유로 사용하게 됩니다.

비동기 코드로 프로세스 성능 개선이 사용하게 됩니다.

setTimeout은 자바스크립트 비동기를 처리하는 대표적인 내장 함수입니다. 하지만 실무에서는 Promise를 많이 사용합니다. Promise는 2가지 경우로 통신이 성공 혹은 실패의 경우가 있습니다.

Promise 객체는 3가지 상태를 갖습니다. pending, resolve, rejected입니다.

```js
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (getRandomBool()) {
      resolve('resolved!');
    } else {
      reject('rejected!');
    }
  }, 1000);
});

function getRandomBool() {
  return Math.random() < 0.5;
}
```

Promise를 만드는 방법입니다. 1초 후에 통신이 성공 혹은 실패를 반환하도록 만든 Promise입니다.

```js
promise
  .then((message) => {
    console.log(`The promise finally ${message}`);
  })
  .catch((message) => {
    console.log(`The promise finally ${message}`);
  });
```

then은 성공을 처리합니다. catch는 실패를 처리합니다.

Promise가 현실에서 유용한 이유입니다. Promise 가장깔끔하게 처리하지만 유일한 방법은 아닙니다. fetch는 비동기 프로그래밍을 위해 사용하는 Promise입니다.

프론트엔드가 Promise를 자주 사용할 때는 IO 작업에 많이 사용합니다.

가끔은 파일을 읽어야 할 때도 비동기적으로 동작합니다. 기계 하드 드라이브를 탐색하는 것은 컴퓨터마다 다르고 처리 시간이 다릅니다.

현실 세계에서는 비동기적인 처리가 필요합니다.

Promise는 절대 유일한 방법이 아닙니다.

I/O 작업 시간에 대한 개념입니다. I/O 계산입니다. 너무 기본적이라 I/O라고 생각하지 않을 때 입니다.

RAM은 컴퓨터 변수명을 저장하고 찾을 때입니다. 이 작업은 ns 단위입니다. 인간이 인지하지 못할 정도입니다. 이런 작업은 동기적으로 처리대도 됩니다.

DISK는 파일 시스템을 접근하고 분석하는 작업, config 데이터 같은 것을 처리할 때입니다. ms 단위입니다. SSD로 처리하면 물론 빨라지지만 많은 파일을 디스크에서 읽을 때는 비동기 처리하는 것이 좋습니다.

Network http 요청같은 작업으로 데이터 센터에 있는 컴퓨터가 처리합니다. 100ms ~ 2000ms로 일반적인 초단위이고 인간이 충분히 인지할 수 있습니다. 그래서 비동기적으로 처리합니다.

await 키워드는 Promise를 다루기 쉬운 방법입니다. 대부분의 경우 가독성이 더 좋습니다.

```js
const message = await promise;
console.log(`Resolved with ${message}`);
```

코드의 `await` 키워드가 나오면 잠시 동작을 정지합니다. 동기적인 코드처럼 읽을 수 있는 장점입니다.

await는 then키워드를 대체합니다.

```js
function getPromiseForUserData() {
  return new Promise((resolve) => {
    fetchDataFromServerAsync().then(function (user) {
      resolve(user);
    });
  });
}

const promise = getPromiseForUserData();
```

```js
async function getPromiseForUserData() {
  const user = await fetchDataFromServer();
  return user;
}

const promise = getPromiseForUserData();
```

`async` 키워드는 `new Promise` 키워드를 대체합니다.

callback 함수는 어느 특정 시점에 다른 함수가 처리하도록 하는 함수입니다.

Promise 함수는 callback 기반의 성격이 강했습니다. async, await는 대부분의 경우더 가독성이 있었습니다.

```js
fetchUser
  .then(function (user) {
    return fetchLocationForUser(user);
  })
  .then(function (location) {
    return fetchServerForLocation(location);
  })
  .then(function (server) {
    console.log(`The server is ${server}`);
  });
```

```js
const user = await fetchUser();
const location = await fetchLocationForUser(user);
const server = await fetchServerForLocation(location);
console.log(`The server is ${server}`);
```

확실히 `await`가 전통적인 동기적인 코드처럼 읽기가 쉽습니다. 모두 각각 장점이 있습니다. 일반적으로 async await를 더 많이 사용합니다.

자바스크립트 에러 핸들링

## Ch 5 - Errors in js

https://youtu.be/2JYT5f2isg4?t=6589

https://boot.dev/course/5d804c54-887a-4c1c-b8c7-b6436f3a132e/25b4fa47-11ff-4d9e-b6da-a21b5f706781/079246a6-01ef-4bf1-975c-405eddeedd05

예를 들어 컴퓨터에서 중간에 통신이 막히면 프로그램 상의 버그는 아닙니다. 대부분 미국권 프로그래머들의 컨벤션에 의하면 그렇습니다.

에러 핸들링으로 우아하게 처리할 수 있습니다.

```js
const speed = car.speed;
// The code crashes with the following error:
// "ReferenceError: car is not defined"
```

car가 존재할지 안 할지 모릅니다.

```js
try {
  const speed = car.speed;
} catch (err) {
  console.log(`An error was thrown: ${err}`);
  // the code cleanly logs:
  // "An error was thrown: ReferenceError: car is not defined"
}
```

try catch문으로 처리할 수 있습니다. 에러가 발생하면 catch 블록을 실행하게 됩니다.

프로그램 전체가 막히지 않도록 합니다.

```js
printCharacterStats(4);
printCharacterStats('ten');
printCharacterStats(10);

// don't touch below this line

function printCharacterStats(level) {
  if (isNaN(level)) {
    throw 'Parameter is not a number!';
  }
  console.log(`Your character is level ${level}!`);
}
```

이렇게 에러가 발생합니다. 이 에러를 핸들링하도록 합니다. 인자는 문자열도 넣을 수 있습니다. 이 부분에 프로그램이 종료가 안 되도록 처리합니다.

```js
printCharacterStats(4);
try {
  printCharacterStats('ten');
} catch (error) {
  console.log(error);
}
printCharacterStats(10);
```

이렇게 하면 에러가 처리가 됩니다. 상당히 단순합니다.

버그와 에러의 차이입니다. 코드 당연히 다릅니다. 처음에는 혼용하는 경우가 많이 있습니다.

버그는 대부분 나쁩니다. 하지만 에러는 무조건 나쁜 것은 아닙니다.

우리는 어떤 코드 동작을 하도록 합니다. 하지만 의도랑 다르게 동작하면 버그라고 합니다. 예를 들어 덧셈을 처리하는 함수가 있습니다. 인자로 2, 3을 대입했지만 7을 반환받으면 버그라고 봅니다.

하지만 에러는 예상됩니다. 프로그래머는 에러는 예상된 것이고 이 예상에 대응해서 핸들링하는 것입니다.

에러 핸들링과 버그 픽스는 다릅니다. 버그 픽스가 너무 비싸거나 큰 영향력이 없으면 버그를 픽스를 안 할 수 있습니다. 비즈니스의 문제입니다. 코드 수정으로 처리합니다. 하지만 에러는 다릅니다. 에러는 코드 수정으로 제거할 수 없습니다. 예를 들어 인터넷 연결 상태가 없으면 처리해야 할 때가 있습니다. 이럴 때 404 페이지로 피드백 주는 것처럼 처리합니다. 때로는 원격 서버에 문제가 발생할 수 있습니다. 서버가 꺼질 수 있습니다. 자주 접하게 되는 에러입니다. 가끔은 유효하지 않은 자료입력입니다. 유저가 부적절한 input을 작성하면 오류가 발생할 수 있습니다.

버그는 픽스하지만 에러는 핸들링해야 합니다. 에러는 무조건 핸들링해야 합니다. 선택의 문제가 아닙니다.

디버깅은 버그를 제거하는 코딩입니다. 에러 핸들링은 에러가 발생할 에러를 대응하고 처리하는 것입니다. try catch로 디버깅 하지말고 디버깅 툴로 에러 핸들링을 처리하려고 하지말도록 합니다.

Error는 항상 존재합니다.

디버깅은 디버깅 툴과 방법론으로 해결하고 에러 핸들링은 런타임에 핸들링 되도록 로직을 처리합니다.

디버깅은 선택적입니다. 디버거는 코드를 순차적으로 읽을 수 있도록 합니다. 원시적인 디버깅은 출력입니다. 어느 시점의 어느 값을 갖는지 출력해서 확인하는 확인합니다.

비동기 상황에서 에러를 처리하는 상황입니다.

```js
fetchUser()
  .then(function (user) {
    console.log(`user fetched: ${user}`);
  })
  .catch(function (err) {
    console.log(`an error was thrown: ${err}`);
  });
```

```js
try {
  const user = await fetchUser();
  console.log(`user fetched: ${user}`);
} catch (err) {
  console.log(`an error was thrown: ${err}`);
}
```

에러가 발생하면 catch로 해결합니다. async await의 장점은 에러가 발생하면 중간에 try catch로 처리합니다.

## Ch 6 - HTTP Headers

https://youtu.be/2JYT5f2isg4?t=7496

https://boot.dev/course/5d804c54-887a-4c1c-b8c7-b6436f3a132e/2201352e-f0d7-48eb-bcea-d6d9aa9e0db4/52dc30a4-19d0-4399-9650-629ec7646fd7

지금까지는 http 요청의 body에 중점을 두었습니다. 정보의 핵심 부분을 전송하는데 사용합니다. 하지만 메타 데이터 header 데이터는 데이터에 관한 데이터 입니다.

클라이언트의 종류, 운영체제, 클라이언트의 언어권처럼 정보 자체가 아니라 정보에 대한 것들입니다. 위치에 대한 정보는 header에 보통 넣어 놓습니다.

해더 정보를 접근하는 방법입니다.

```js
function logContentType(resp) {
  // ?
}

// don't touch below this line

const apiKey = generateKey();
const bootdevAPIDomain = 'api.boot.dev';

const items = await getItemData(bootdevAPIDomain);

logContentType(items);

async function getItemData(domain) {
  const response = await fetch(
    `https://${domain}/v1/courses_rest_api/learn-http/items/0194fdc2-fa2f-4cc0-81d3-ff12045b73c8`,
    {
      method: 'GET',
      mode: 'cors',
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'application/json',
      },
    }
  );
  return response;
}

function generateKey() {
  const characters = 'ABCDEF0123456789';
  let result = '';
  for (let i = 0; i < 16; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
```

이렇게 작성되었습니다.

Header API를 확인합니다.

https://developer.mozilla.org/en-US/docs/Web/API/Headers/get

```js
function logContentType(resp) {
  const headerVal = resp.headers.get('content-type');
  console.log(headerVal);
}
```

header 데이터로 content-type은 자주 사용하는 속성입니다. 목적은 반대쪽 컴퓨터에게 어떤 자료형이 전달되는지 전달할 때 활용합니다. JSON, HTML처럼 무엇을 담을지 커뮤니케이션할 때 활용합니다.

> application/json

이런 피드백을 받습니다.

브라우저 개발자 도구입니다. 우클릭 검사하면 네트워크 탭을 접근할 수 있습니다. 모든 네트워크 활동을 기록합니다. 모든 요청을 기록합니다. response 해더를 네트워크 탭에서 확인할 수 있습니다.

네트워크 탭에서 요청을 주고 받는데 걸리는 일반적으로 50 ~ 500ms 정도 걸립니다.

header는 데이터에 대한 데이터입니다. 또 인증에 활용하는 것도 가능합니다. 서버에 본인이라고 데이터를 넣을 때는 header에 넣고 요청을 보냅니다.

X-API-key로 인증에 넣어서 처리합니다.

```js
const generatedApiKey = generateKey();
const url =
  'https://api.boot.dev/v1/courses_rest_api/learn-http/locations/52fdfc07-2182-454f-963f-5f0f9a621d72';
const newLocationData = {
  discovered: false,
  id: '52fdfc07-2182-454f-963f-5f0f9a621d72',
  name: 'Bloodstone Swamp',
  recommendedLevel: 10,
};

const oldLocation = await getLocationResponse(generatedApiKey, url);
console.log(`Got old location:`);
console.log(
  `- name: ${oldLocation.name}, recommendedLevel: ${oldLocation.recommendedLevel}`
);
console.log('---');

await putLocation(generatedApiKey, url, newLocationData);
console.log('Location updated!');
console.log('---');

// const newGeneratedApiKey = generateKey();
const newLocation = await getLocationResponse(generatedApiKey, url);
console.log(`Got new location:`);
console.log(
  `- name: ${newLocation.name}, recommendedLevel: ${newLocation.recommendedLevel}`
);
console.log('---');

// don't touch below this line

async function getLocationResponse(apiKey, url) {
  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'X-API-Key': apiKey,
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}

async function putLocation(apiKey, url, data) {
  const response = await fetch(url, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'X-API-Key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

function generateKey() {
  const characters = 'ABCDEF0123456789';
  let result = '';
  for (let i = 0; i < 16; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
```

동일한 사람인데 서버에는 각각 다른 사람이라고 전달이 됩니다. 이 버그를 고치도록 하십시오.

코드르 보면 단순하게 header에 들어가는 API key만 동리하게 만들면 됩니다.

header는 클라이언트 서버 모두 포함해서 주고 받을 수 있습니다.

상태 코드는 header에 포함된 데이터입니다. 분명히 숫자형입니다. 물론 코드에서 header를 다룰 때는 결과적으로 문자열입니다. 가끔은 header를 숫자로 처리할 때는 문자열을 숫자형으로 형변환해줘야 합니다.

content-type은 application/json같은 자료를 많이 주고 받습니다.

## Ch 7 - JSON

https://youtu.be/2JYT5f2isg4?t=8468

https://boot.dev/course/5d804c54-887a-4c1c-b8c7-b6436f3a132e/6a6cb434-75e6-4272-8b38-0d950f7c9091/e17d690e-5258-4470-a2e3-394ce62bf046

JSON입니다. JSON은 웹에서 데이터를 나타내는데 표준입니다. request body에는 이미지를 넣어서 보낼 때도 많습니다. 거기에 JSON을 수단으로 활용합니다.

```json
{
  "movies": [
    {
      "id": 1,
      "genre": "Action",
      "title": "Iron Man",
      "director": "Jon Favreau"
    },
    {
      "id": 2,
      "genre": "Action",
      "title": "The Avengers",
      "director": "Joss Whedon"
    }
  ]
}
```

JSON 데이터는 다양하게 구조화하는 것이 가능합니다. 중요합점은 데이터를 유연하게 구조화된 방법으로 주고 받을 수 있습니다. 사실상 plan text랑 유사합니다. JSON은 자바스크립트 객체로 활용해야 더 유용합니다.

```js
const resp = await fetch('...');
const obj = await resp.json();
```

JSON을 자바스크릅트 객체로 변환하는 방법입니다.

연습 문제입니다.

```js
async function getLocations() {
  const url = 'https://api.boot.dev/v1/courses_rest_api/learn-http/locations';
  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'X-API-Key': apiKey,
      'Content-Type': 'application/json',
    },
  });
  const obj = await response.json();
  console.log(obj);
}

// Don't touch below this line

const apiKey = generateKey();

const locations = await getLocations();
console.log('Got some locations from the server.');
for (const location of locations) {
  console.log(
    `- name: ${location.name}, recommendedLevel: ${location.recommendedLevel}`
  );
}

function generateKey() {
  const characters = 'ABCDEF0123456789';
  let result = '';
  for (let i = 0; i < 16; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
```

이미 풀었습니다. 자바스크립트로 객체 변환은 이렇게 간단합니다.

JSON에 대해서 알것입니다. JSON은 근본적으로 문자열입니다. JSON은 여기저기 모두 사용할 수 있습니다. 대부분의 프로그래밍 언어는 JSON으로 처리하기 쉽습니다. 배열과 해쉬맵 자료형을 합친 것이라고 대부분 언어에서 지원하는 자료형이기 때문에 처리가 쉽습니다.

NoSQL도 JSON을 활용하는데 많이 활용합니다.

JSON은 콤마(,)로 데이터를 구분합니다. JSON은 데이터를 저장하고 통신에 사용하는 형식입니다.

JSON.pares(), JSON.stringify()는 브라우저 API가 지원합니다. JSON.stringify는 데이터를 전송할 때 많이 사용합니다.

```js
async function updateLocationById(id, locationObj) {
  const path = `https://api.boot.dev/v1/courses_rest_api/learn-http/locations/${id}`;
  const response = await fetch(path, {
    method: 'PUT',
    mode: 'cors',
    headers: getHeaders(),
    body: locationObj,
  });
  return response.json();
}
```

여기를 디버깅하는 것이 문제입니다. locationObj는 무슨 자료형이 들어올지 모릅니다. 그래서 JSON.stringify로 형변환 처리를 해줘야 합니다.

JSON.pares는 JSON.stringify의 반대로 작업합니다.

모의 데이터로 테스트를 많이 진행합니다. 모의 데이터를 만들면 테스트를 더 쉽고 엣지케이스들을 핸들링하기 더 쉽습니다. 또 매번 서버 통신을 할 때마 비용이 발생합니다.

```js
function parseLocation(locationString) {
  try {
    const obj = JSON.pares(locationString);
  } catch (error) {
    console.log('부적절한 json sting');
  }
  return obj;
}

// don't touch below this line

function printLocationObj(parsed) {
  console.log(`id: ${parsed.id}`);
  console.log(`discovered: ${parsed.discovered}`);
  console.log(`name: ${parsed.name}`);
  console.log(`recommendedLevel: ${parsed.recommendedLevel}`);
}

// don't touch below this line

parseLocation(`
{
	"discovered": false,
	"id": "0194fdc2-fa2f-4cc0-81d3-ff12045b73c8",
	"name": "Bandit Camp",
	"recommendedLevel": 14
`);

console.log('---');

parseLocation(`
{
	"discovered": false,
	"id": "0194fdc2-fa2f-4cc0-81d3-ff12045b73c8",
	"name": "Bandit Camp",
	"recommendedLevel": 14
}
`);
```

이런 방식으로 테스트를 많이 진행합니다.

XML은 http 요청에 레거시에서 가끔 발견하게 될 것입니다. 목적은 동일합니다. 텍스트 형식으로 데이터를 주고 받기 위해 존재하는 형식입니다.

```xml
<root>
  <id>1</id>
  <genre>Action</genre>
  <title>Iron Man</title>
  <director>Jon Favreau</director>
</root>
```

```json
{
  "id": "1",
  "genre": "Action",
  "title": "Iron Man",
  "director": "Jon Favreau"
}
```

정유율 자체는 JSON이 더 많습니다. 하지만 레거시는 신생 회사도 다룹니다. 그래서 xml를 다루어야 합니다.

verbose는 작성할 코드가 더 많다는 뜻입니다. xml이 더 verbose합니다.

xml은 config 파일에도 많이 활용합니다. 서버가 xml를 사용하기로 예상하면 xml을 사용해야 합니다. 대부분의 경우 json을 적어도 미국권에서는 선호합니다. 가독성도 더 좋습니다.

## Ch 8 - HTTP Methods

https://youtu.be/2JYT5f2isg4?t=9670

https://boot.dev/course/5d804c54-887a-4c1c-b8c7-b6436f3a132e/bbcdbb43-4edf-4574-b4f2-75e3f8503713/b536f3dc-86f6-4cb4-be07-5252d3224bf2

매번 http 요청을 보낼 때는 http method를 정해야 합니다. 정하지 않을 수 없습니다.

https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods

GET, POST, PUT, DELETE 4가지가 제일 흔합니다. GET은 서버에서 데이터의 복사본을 받습니다. 유저는 본인 프로필을 보고 싶을 것입니다. 데이터에 변형이 없기 때문에 안전하다고 고려됩니다. 데이터에 변형을 가하는 것은 주의가 필요합니다.

```js
await fetch(url, {
  method: 'GET',
  mode: 'cors',
  headers: {
    'sec-ch-ua-platform': 'macOS',
  },
});
```

fetch 함수를 보면 method를 설정했습니다. mode는 cors는 여러 곳에서 요청이 가능하도록 설정합니다.

header는 무엇인 원하는대로 설정할 수 있습니다. get은 보통은 body에 넣는 것이 없습니다. 대부분 그렇습니다.

```js
async function getUsers(url, apiKey) {
  const res = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'X-API-Key ': apiKey
    }
      return res
  })
}

// Don't touch below this line

const generatedKey = generateKey()
const url = 'https://api.boot.dev/v1/courses_rest_api/learn-http/users'
const users = await getUsers(url, generatedKey)
logUsers(users)

function generateKey() {
  const characters = 'ABCDEF0123456789'
  let result = ''
  for (let i = 0; i < 16; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

function logUsers(users) {
  for (const user of users) {
    console.log(`Character name: ${user.characterName}, Class: ${user.class}, Level: ${user.level}, User: ${user.user.name}`)
  }
}

```

CRUD는 약자입니다. 생성, 조회, 갱신, 삭제를 의미합니다. 대부분의 웹에서 서버랑 상호작용할 때는 이 4가지 중 하나입니다. 이 행위는 http method랑 상통합니다.

Create - POST
Read - GET
Update - PUT / PATCH
Delete - DELETE

CRUD 서버는 DB에서 데이터를 일고 수정하는 서버를 주로 의미합니다. 이런 대응은 사실 컨벤션입니다. 서버는 다른 로직으로 설계하는 것은 가능합니다. 하지만 이런 RESTful 서버 컨벤션은 대부분 모두에게 쉽습니다. API는 모두 각각 다르지만 컨벤션이 존재하면 대략 어떻게 해야 할지 맥락 혹은 감이라도 잡을 수 있습니다.

HTTP POST요청은 주로 서버에 새로운 리소스를 생성할 때 보내는 메서드입니다. 모든 서버에 content-type을 header에 넣을 필요는 없지만 작성하는 것이 좋은 습관입니다.

GET 요청은 데이터에 뮤테이션이 없어서 괜찮지만 POST는 데이터는 뮤테이션을 가하기 때문에 주의해야 합니다. 가끔은 POST 요청이 2번 갈 경우도 존재해서 개발자가 만들어서 처리해줘야 합니다. 이미 잘 만들어진 서버는 이런 로직을 쉽게 처리할 수 있습니다.

```js
async function createUser(apiKey, url, data) {
  const res = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return res;
}

// Test Suite Don't Touch Below This Line

const userToCreate = {
  characterName: 'Grendel',
  class: 'Warrior',
  level: 1,
  pvpEnabled: false,
  user: {
    name: 'Allan',
    location: 'USA',
    age: 27,
  },
};

const generatedKey = generateKey();
const url = 'https://api.boot.dev/v1/courses_rest_api/learn-http/users';

async function getUsers(url, apiKey) {
  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'X-API-Key': apiKey,
    },
  });
  return response.json();
}

function generateKey() {
  const characters = 'ABCDEF0123456789';
  let result = '';
  for (let i = 0; i < 16; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function logUsers(users) {
  for (const user of users) {
    console.log(
      `Character name: ${user.characterName}, Class: ${user.class}, Level: ${user.level}, User: ${user.user.name}`
    );
  }
}

console.log('Retrieving user data...');
const userDataFirst = await getUsers(url, generatedKey);
logUsers(userDataFirst);
console.log('---');

console.log('Creating new character...');
const creationResponse = await createUser(generatedKey, url, userToCreate);
console.log(`Creation response body: ${JSON.stringify(creationResponse)}`);
console.log('---');

console.log('Retrieving user data...');
const userDataSecond = await getUsers(url, generatedKey);
logUsers(userDataSecond);
console.log('---');
```

생성에 해당합니다.

상태 코드(Status Code)입니다. http 요청이 모두 성공적이었는지 확인할 때 사용합니다. Status Code는 2번째 레이어입니다.

클라이언트 요청이 잘못 되면 에러를 돌려줄 것입니다. 적절한 도메인 이름을 주지 않으면 에러가 발생할 것이고 또는 집 와이파이가 고장나면 에러가 발생할 것입니다. 혹은 서버에서 문제가 발생하고 에러가 발생하면 서버는 상태코드를 응답에 포함해서 돌려줄 것입니다. 예를 들어 접근 불가능한 리소스에 요청이 부적절하다는 것 혹은 데이터 센터에 불나서 정지 되었다고 하는 것처럼 그런 경우가 존재합니다.

100 단위는 자주 볼일이 없고 정보를 알려줍니다.

200은 자주 보고 모두 괜찮다고 합니다.

300은 리다이렉션을 요구합니다.

400은 클라이언트가 잘못된 요청을 보낸 경우입니다.

500은 서버측이 잘못된 경우입니다.

200은 제일 흔합니다. 모두 괜찮다는 것입니다. 201은 리소스 생성이 성공했다고 합니다. 301은 과거 요청을 처리했던 것을 옮겨줄 때 사용합니다. 400은 일반적인 나쁜 요청입니다. catch-all입니다. body에는 더 많은 정보가 주로 있을 것입니다. 403은 허가가 없는 접근 권한 없는 것을 요청하려는 경우입니다. 404는 흔합니다. 존재하지 않는 라우트 혹은 리소스 요청에서 받는 응답니다.

상태코드는 MDN에서 보고 이해할 수 있을 정도면 취미정도 하는 사람에게 적당합니다.

생태코드의 목적은 클라이언트에게 요청에 관한 정보를 제공하기 위함입니다.

HTTP PUT은 리소스를 업데이트할 때 사용하지만 아주 가끔은 리소스를 생성할 때 사용하기도 합니다. 즉 존재하면 갱신하고 없으면 생성하는 요청입니다. PUT은 멱등법칙(Idempotent)을 따릅니다. 동일한 요청을 보내면 새로운 리소스를 또 만들지 않게 안전합니다. PUT 요청은 동일한 ID를 넣기 때문에 중복 요청에 안전합니다.

멱등법칙은 수학이나 전산학에서 여러번 적용하더라도 결과가 달라지지 않는 성질이라고 합니다.

HTTP PUT은 제일 흔합니다. 하지만 PATCH도 보게 될 것입니다. PUT은 전체 리소스를 교체하기 위해 설계되었습니다. PUT은 모든 리소스전체를 모두보내고 모두를 갱신시기 위해 사용합니다. 하지만 PATCH는 부분 업데이트를 위해 원래 사용합니다.

```js
await fetch(url, {
  method: 'PUT',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
});
```

참고로 PUT, PATCH는 PUT을 더 많이 사용합니다. 하지만 현대시대는 구분이 별로 없다고 합니다.

```js
// This deletes the location with ID: 52fdfc07-2182-454f-963f-5f0f9a621d72
const url =
  'https://api.boot.dev/v1/courses_rest_api/learn-http/locations/52fdfc07-2182-454f-963f-5f0f9a621d72';

await fetch(url, {
  method: 'DELETE',
  mode: 'cors',
});
```

HTTP DELETE 요청입니다. 이름 처럼 리소스를 삭제합니다.

## Ch 9 - URL Paths

https://youtu.be/2JYT5f2isg4?t=11824

https://boot.dev/course/5d804c54-887a-4c1c-b8c7-b6436f3a132e/663b01c3-effb-45cb-b004-898ef9c4cc06/24cf81b4-34c1-413d-b9a4-eb0d5dd45278

URL Paths는 URI 이후 조금더 깊게 다룹니다. 전통적인 파일서버는 파일 path를 url path를 맵핑하는 것으 알 것입니다.

웹 어플리케이션으로 일할 때는 paths는 아주 다르게 활용됩니다.

```js
async function getResources(path) {
  const fullURL = `https://api.boot.dev/v1/courses_rest_api/learn-http/users`;

  const response = await fetch(fullURL, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'X-API-Key': generateKey(),
      'Content-Type': 'application/json',
    },
  });
  const resources = await response.json();
  return resources;
}

// don't touch below this line

const locations = await getResources(
  '/v1/courses_rest_api/learn-http/locations'
);
console.log('Locations:');
logResources(locations);
console.log(' --- ');

const items = await getResources('/v1/courses_rest_api/learn-http/items');
console.log('Items:');
logResources(items);
console.log(' --- ');

const users = await getResources('/v1/courses_rest_api/learn-http/users');
console.log('Users:');
logResources(users);

function logResources(resources) {
  for (const resource of resources) {
    console.log(` - ${JSON.stringify(resource)}`);
  }
}

function generateKey() {
  const characters = 'ABCDEF0123456789';
  let result = '';
  for (let i = 0; i < 16; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
```

api를 설계할 때입니다. `https://api.boot.dev/v1/courses_rest_api/learn-http/users`을 확인해봅시다.

v1은 버전에 해당합니다. 엔드포인트는 여전히 사용할 수 있을 것입니다. 꽤 흔한 컨벤션입니다. courses_rest_api는 내부적으로 웹을 구동하기 위해 사용합니다. learn-http는 섹션에 해당합니다. 마지막 users는 리소스에 해당합니다.

RESTful API입니다. 컨벤션과 기준입니다. 특정 규칙을 따르는 것으로 클라이언트가 무엇을 해야 할지 쉽게 하도록 합니다.

Representational State Transfer, or REST

첫번째 전제는 클라이언트와 서버를 구분합니다. 최소한 동의할 것들입니다. 리소스명, JSON 활용여부, 인코딩여부 등...

무상태성이 또 중요한 전제입니다. 서버는 처음부터 state를 갖고 있습니다. 이것은 문제가 없습니다. 하지만 지난 클라이언트의 state를 추적하고 있을 필요가 없습니다. 모든 요청은 상호독립적이어여 합니다.

path와 적절한 method를 활용해서 CRUD가 가능해야 합니다.

백엔드는 반드시 RESTful 기준을 따를 필요는 없습니다. 선택의 문제입니다. 일반적으로 사용하는 방식이지만 맥락에 맞게 사용하도록 합니다.

url에서 보통 마지막 path는 리소스이름을 나타냅니다.

Query Parameter입니다.

```url
https://www.google.com/search?q=boot.dev
```

물음표(`?`) 뒤에 나옵니다. `q`는 키에 해당하고 `boot.dev`는 값에 해당하는 해쉬맵같은 자료형으로 생각하도록 합니다.

sort는 클라이언트에서 가능하지만 무조건 클라이언트에서만 가능한 것은 아닙니다. 이럴 때는 서버는 리소스 요청을 받고 계산하고 응답할 수 있습니다.

특정 API를 활용할 때는 문서를 잘 읽을 수 있어야 합니다. 무슨 리소스, 쿼리 파라미터 등... 알기 위해서는 결국 문서를 읽을 수 밖에 없습니다. 즉 API 명세에 해당합니다. server가 어떤 기능이 없으면 결국 서버사이드 유지보수하는 개발자에게 요청하거나 직접 개발하는 방법밖에 없습니다.

API는 백엔드 엔지니어의 영역입니다. 프론트엔드 코드는 필요없습니다. 서버 API 명세서는 필요합니다.

API의 명세가 불명확하면 백엔드 엔지니어에게 꼭 질문하도록 합니다.

## Ch 10 - HTTPS security

https://youtu.be/2JYT5f2isg4?t=12993

https://boot.dev/course/5d804c54-887a-4c1c-b8c7-b6436f3a132e/9c7ae8fb-b687-464e-8254-5aab82aea4d7/d8b00b4f-5177-4abe-a658-3c0f19fbd3ca

http 강의인데 https를 많이 활용하는 것을 볼 것입니다. https의 주요차이는 보안입니다. 클라이언트와 서버사이에만 안전하도록 보안합니다. 인터넷이 동작할 때는 중간 경로를 통해서 서버를 접근합니다. http만 사용하면 안전하지 않습니다. 중간에서 인터셉트가 가능합니다. 만약 결재정보를 인터넷에서 http를 사용하면 보안 위험이 발생할 것입니다. 보통 좋은 커머스는 https로 사용합니다.

HTTPS의 암호화입니다. 정보를 인터넷에 지나는 경로 중에 어떻게 안전하게 만드는지 의문일 것입니다. 클라이언트와 서버가 존재합니다. 인터넷에서 요청을 보낼 때 중간 경로들이 있습니다. 와이파이, ISP, 서버 클라우드가 될 수 있습니다. 각각 엔티티로 부터 메시지를 보호하고 싶습니다. 클라이언트가 전송전에 암호화를 하고 싶을 것입니다.

하이레벨에서 암호를 다룹니다. 키는 2개입니다. 하나는 Public 다른 하나는 Private입니다. 퍼블릭은 암호화를 위해 사용합니다. 프라이빗 키는 복호화를 사용합니다. 프라이빗키는 서버에 남습니다. 퍼블릭키는 클라이언트에게 주어집니다. 하지만 추가적으로 프라이빗 응답도 줘야 합니다. 그래서 처음부터 퍼블릭키를 바로 주지 않습니다. 세번째 대칭적인 암호화키를 클라이언트와 서버 엔티티 모두 만족할 수 있게 보안을 확보하면서 통신할 수 있게 해줍니다.

처음에 발생하는 사건은 서버는 퍼블릭과 프라이빗키를 생성합니다. 서버가 https를 위해 설정되면 실행합니다. 클라이언트는 서버에 컨텍합니다. 보안요청을 하게 됩니다. 서버는 암호하를 위한 퍼블릭키를 클라이언트에게 제공합니다. 클라이언트와 서버는 대칭키를 협상합니다. 하이레벨에서 클라이언트는 암호화된 메시지를 서버에게 보낼 수 있습니다. 현재로서는 가능합니다. 하지만 클라이언트에게 퍼블릭키를 제공한 직후에는 서버가 보안이 되어 있는 메시지를 보낼 수 없습니다. 그래서 시크릿 토큰을 클라이언트가 생성합니다. 서버에게 보냅니다. 그럼 양자는 시크릿 토큰으로 대칭키를 사용할 수 있게 합니다. 같은 키로 암호화와 복호화가 가능해집니다.

SSL, TLS는 HTTPS에 보안기능을 추가하는 부분입니다.

디지털 시그니처는 이 범위 밖에 존재합니다.

HTTPS는 메시지를 보호하지만 누구랑 커뮤니케이션하는지 그리고 본인이 누구인지는 보호할 수 없습니다.

여기까지는 이론입니다.
