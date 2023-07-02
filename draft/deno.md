## Creating a Deno https server

[Creating a Deno https server - stackoverflow](https://stackoverflow.com/questions/55912807/creating-a-deno-https-server)

```ts
import { serveTLS } from 'https://deno.land/std/http/server.ts';

const body = new TextEncoder().encode('Hello HTTPS');
const options = {
  hostname: 'localhost',
  port: 443,
  certFile: './path/to/localhost.crt',
  keyFile: './path/to/localhost.key',
};
// Top-level await supported
for await (const req of serveTLS(options)) {
  req.respond({ body });
}
```

https를 설정하는 방법이 있었습니다.

여기서도 인증이 필요한 것은 동일합니다.

### phoenix framework를 배우고 싶은 이유...

- 현실도피입니다.
- 문제를 올바르게 진단하고 해결하는 능력과 습성도 길러지지 않은 것입니다.
- 현재 진행하는 프로젝트의 백엔드 작업을 최대한 안 건드리고 싶어서 드는 생각입니다.
- 안 건드리고 싶은 이유는 테스트 코드를 작성 못하고 있기 때문입니다.
- 지금 해결해야 하는 문제는 백엔드 엔지니어링을 위해 테스트 코드를 작성하는 방법을 학습하거나 테스트 가능한 프레임워크로 포팅하는 것입니다.
  - [express 튜토리얼에 테스트 방법론](https://deno.com/blog/build-api-express-typescript-pt2)이 있었습니다.
  - 다른 라이브러리로 포팅을 하기전에는 테스트 방법론을 적용해야 합니다.
  - 그리고 express부터 포팅을 시도해야 합니다.
- 처음에 phoenix를 배우고 싶다는 생각이 들었던 이유는 stack overflow 설문 조사에서 phoenix가 상위권을 차지했기 때문입니다.
  - 공식 문서를 찾아보기 시작하면서 다양한 것들을 찾았습니다.
