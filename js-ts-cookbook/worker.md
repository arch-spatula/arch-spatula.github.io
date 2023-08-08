---
sidebar_position: 7
description: 'Worker'
tags: ['Worker']
---

# Worker

<iframe class="codepen" src="https://www.youtube.com/embed/-JE8P2TiJEg" title="PROOF JavaScript is a Multi-Threaded language" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

언젠가 다뤄보고 싶었는데 더 쉽게 fireship이 저 대신 다루어줬습니다.

Node.js, 크롬 브라우저에서 사용할 수 있습니다.

예전에 Deno는 개발환경에서 지원하는데 Deno Deploy 배포환경에서 지원 안해서 고생했던 기억이 납니다.

[Worker - MDN](https://developer.mozilla.org/ko/docs/Web/API/Worker#%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80_%ED%98%B8%ED%99%98%EC%84%B1)

Worker의 단순한 기능은 다양한 브라우저에 호환되기 때문에 아주 큰 문제는 없습니다.

자바스크립트는 싱글쓰레드 언어라고 하면 약간의 어폐가 있습니다. 네트워크 요청, IO를 제외하고 일반적으로 계산이 로직상 클 수 밖에 없는 경우 유용합니다.

계산비용이 비싼 경우 대표적인 예시 중 하나는 암호학입니다. 반드시 제곱시간 복잡성(Quadratic Time Complexity, $O(n^{2})$)을 가질 수 밖에 없는 상황들이 있습니다. 로직은 무조건 고정될 수 밖에 없다면 활용해볼 수 있는 전략입니다.

지금부터 약간의 컴퓨터과학 지식이 필요합니다. 동시성과 병렬성을 구분해야 합니다. 처음보면 비슷해보입니다. 하지만 당연히 아주 다릅니다.

동시성은 자바스크립트가 논블러킹 이벤트 루프로 잘 처리해줍니다. 처리가 완료되고 Call Stack이 비어있을 때 Task Queue에서 Promise부터 dequeue하고 Call Stack으로 Push합니다. 이렇게 해도 결국 계산하기 위해 활용하는 쓰레드는 1개입니다. 쓰레드 1개를 작업 순서를 바꾸면서 더욱더 효율적으로 사용하기만 한 것입니다.

병렬성 같은 경우에는 계산을 처리하는 CPU 코어 여러개를 접근하는 것입니다. 쓰레드를 여러개 사용할 수 있는 것입니다. 자바스크립트의 경우 하나의 프로세스 내부에서 모두 동일한 쓰레드를 사용하는 것이 아닙니다. 다른 프로세스 내부에서 쓰레드를 여러개 쓰레드를 사용하는 것입니다.

이제 코드 예시입니다. node.js 환경에서 작성한 코드입니다.

```js title="index.js"
const jobs = Array.from({ length: 100 }, () => 1e9);

const tick = performance.now();

for (const job of jobs) {
  let count = 0;
  for (let i = 0; i < job; i++) {
    count += 1;
  }
}

const tock = performance.now();

console.log(`소요시간: ${tock - tick}ms`);
// 소요시간: 58577.20620799996ms
```

저는 맥북 m2를 사용하는데 fireship의 i9 인텔이 더 빠릅니다. ㅂㄷㅂㄷ

지금 예시는 코드의 싱글쓰레드로 처리했을 때 성능입니다. 앞으로 Worker를 활용하는 예시를 보여주겠습니다.

```js title="index.js"
const { Worker } = require('worker_threads');

const jobs = Array.from({ length: 100 }, () => 1e9);

/**
 * @param {number} jobs
 * @param {number} concurrentWorkers
 */
function run(jobs, concurrentWorkers) {
  const chunks = chunkify(jobs, concurrentWorkers);

  const tick = performance.now();
  let completedWorkers = 0;

  chunks.forEach((data, i) => {
    const worker = new Worker('./worker.js');
    completedWorkers += 1;
    worker.postMessage(data);
    worker.on('message', (data) => {
      // 여기서 worker 모듈에서 데이터를 받아올 때는 on에서 message에서 접근합니다.
      console.log(`${i} ${data} 완료`);
      if (completedWorkers === concurrentWorkers) {
        const tock = performance.now();
        console.log(`소요시간: ${tock - tick}ms`);
      }
      process.exit();
      // worker는 다른 프로세스에서 다른 쓰레드를 사용합니다. 그래서 프로세스를 종료시켜야 합니다.
    });
  });
}

/**
 * @param {any[]} arr
 * @param {number} n
 */
function chunkify(arr, n) {
  let chunk = [];
  for (let i = n; i > 0; i--) {
    chunk.push(arr.splice(0, Math.ceil(arr.length / i)));
  }
  return chunk;
}

run(jobs, 4);
// 소요시간: 15889.809874999337ms
```

```js title="worker.js"
const { parentPort } = require('worker_threads');

parentPort.on('message', (jobs) => {
  for (const job of jobs) {
    let count = 0;
    for (let i = 0; i < job; i++) {
      count += 1;
    }
  }
  parentPort.postMessage('done');
  // 메인 쓰레드(?)로 worker에서 계산한 데이터를 보냅니다.
  // 저는 그냥 "done"을 전달합니다.
});
```

약간 주의할 부분들도 있는 것 같습니다. 컴퓨터과학 기본 지식으로 생각해보면 이런 문제 해결방법은 공간복잡성을 지불하고 시간복잡성을 확보합니다. 우리가 만든 서비스가 대응할 디바이스 문제입니다. 사용자의 CPU 코어가 싱글 코어인 사용자도 있을 수 있습니다. 막약에 이런 유저를 타겟 유저이고 대부분 유저로 설정하고 서비스를 개발한다면 자제해야 할 방법입니다.

일단 코어를 4개 활용하니까 시간도 1/4 비슷하게 감소했습니다. 물론 공간복잡성은 4배로 늘어났습니다.
