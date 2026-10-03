# VS Code / NvChad 디버깅

두 에디터에서 레포의 `.vscode/launch.json`을 공유합니다. Node.js 24와 `pnpm install`이 필요합니다.
빌드와 개발 서버의 Mermaid 렌더링에는 `pnpm exec playwright install chromium`도 필요합니다.

| 설정 | 대상 |
| --- | --- |
| Build | `app/build.ts` 전체 빌드 |
| Browser (Chrome) | 실행 중인 `http://localhost:3000`의 클라이언트 코드 (VS Code용) |
| Dev server | `app/server.ts` 개발 서버, 포트 3000 |
| Preview server | `app/preview.ts` 기존 `dist` 미리보기, 포트 3000 |
| Attach :9229 | 별도로 실행한 Node.js / Vitest 디버그 프로세스 |

서버 설정은 하나씩 실행하세요. Preview server는 먼저 `pnpm build`가 필요합니다.
Build는 기존 `dist`를 다시 생성합니다.

## VS Code

1. 레포 루트를 폴더로 엽니다.
2. TypeScript 소스에 중단점을 설정합니다.
3. Run and Debug에서 위 설정을 선택하고 F5를 누릅니다.

Node.js 디버거는 VS Code에 기본 포함되어 있습니다. 전역 `tsx` 설치는 필요하지 않습니다.

## 브라우저 코드: VS Code / Chrome DevTools

1. 터미널에서 `pnpm dev`를 실행하고 `http://localhost:3000` 준비 메시지를 기다립니다.
2. VS Code에서는 `app/client`의 TypeScript 파일에 중단점을 설정하고 `Browser (Chrome)`을 선택해 F5를 누릅니다. Chrome 설치가 필요합니다.
3. Chrome DevTools에서는 해당 주소를 열고 Sources에서 `app/client`의 TypeScript 파일을 찾아 중단점을 설정합니다. 원본이 보이지 않으면 DevTools 설정의 JavaScript source maps를 활성화합니다.
4. 초기화 코드의 중단점은 페이지를 새로고침하고, 이벤트 처리 코드의 중단점은 해당 UI를 조작해 확인합니다.

빌드와 개발 서버 모두 `dist/script.js.map`을 생성하며 TypeScript 원본을 포함합니다.
`pnpm build` 후 `pnpm preview`로 실행해도 같은 방법을 사용할 수 있습니다. 배포 산출물에도 소스맵이 포함됩니다.
`Browser (Chrome)`은 서버를 자동으로 시작하지 않습니다. 서버도 VS Code에서 디버깅하려면 `pnpm dev` 대신 `Dev server`를 먼저 실행합니다.

## Node.js 빌드: Chrome DevTools / VS Code 연결

```sh
pnpm build:debug
```

실행 직전에 일시정지하므로 빌드 초반부터 디버깅할 수 있습니다.

- Chrome: `chrome://inspect` → Configure에서 `localhost:9229` 확인 → Node.js 대상의 Inspect 선택 → Sources에서 `app/build.ts` 또는 호출되는 TypeScript 파일에 중단점 설정 → 실행 재개.
- VS Code: `Attach :9229` 선택 후 F5 → TypeScript 중단점 설정 → 실행 재개. VS Code에서 직접 시작하려면 기존 `Build` 설정으로 F5를 누르면 됩니다.

한 번에 사용할 디버거 하나를 연결하세요. Chrome의 웹페이지 DevTools와 Node.js 대상의 DevTools는 별도입니다.
연결을 해제해도 프로세스가 남아 있으면 실행한 터미널에서 Ctrl+C로 종료합니다.

## NvChad

`nvim-dap`, Mason이 필요합니다. UI는 기존 `nvim-dap-ui`를 사용할 수 있습니다.

1. 이 폴더의 `nvchad.lua`를 `~/.config/nvim/lua/plugins/blog-debug.lua`로 복사합니다.
2. Neovim을 재시작하고 `:MasonInstall js-debug-adapter`를 실행합니다.
3. 레포 루트에서 `nvim app/build.ts`처럼 실행합니다. `${workspaceFolder}`는 Neovim의 현재 작업 디렉터리입니다.
4. `:DapToggleBreakpoint`로 중단점을 설정합니다.
5. `:DapContinue`를 실행하고 디버깅 설정을 선택합니다.

현재 nvim-dap은 `.vscode/launch.json`을 자동으로 읽습니다. 별도의 `load_launchjs()` 호출은 필요하지 않습니다.
어댑터 파일이 없다는 오류가 나면 `:Mason`에서 설치 완료 여부를 확인하세요.

| 명령 | 동작 |
| --- | --- |
| `:DapContinue` | 시작 / 계속 실행 |
| `:DapToggleBreakpoint` | 중단점 추가 / 제거 |
| `:DapStepOver` | 다음 줄 |
| `:DapStepInto` | 함수 안으로 |
| `:DapStepOut` | 함수 밖으로 |
| `:DapTerminate` | 세션 종료 |
| `:lua require('dap').repl.open()` | 디버그 콘솔 |

## Vitest 테스트 디버깅

예를 들어 터미널에서 다음 명령을 실행합니다.

```sh
pnpm exec vitest run app/processMarkdownFile/processMarkdownFile.test.ts --inspect-brk=127.0.0.1:9229 --no-file-parallelism --test-timeout=0 --hook-timeout=0
```

테스트 파일에 중단점을 설정하고 어느 에디터에서든 `Attach :9229`를 선택합니다.
처음 일시정지한 위치에서 계속 실행하면 테스트의 중단점으로 이동합니다.
시간 제한 해제는 이 디버깅 명령에만 적용되며 CI 설정은 바뀌지 않습니다.
Attach 세션을 연결 해제한 뒤 프로세스가 남아 있으면 실행한 터미널에서 Ctrl+C로 종료하세요.

NvChad 안내는 Node.js와 Vitest용입니다. `Browser (Chrome)` 설정은 VS Code에서 사용하세요.

## 참고

- [VS Code 브라우저 디버깅](https://code.visualstudio.com/docs/nodejs/browser-debugging)
- [Node.js 디버거](https://nodejs.org/api/debugger.html)
- [esbuild 소스맵](https://esbuild.github.io/api/#sourcemap)
- [nvim-dap launch.json 지원](https://github.com/mfussenegger/nvim-dap/blob/master/doc/dap.txt)
- [Vitest 디버깅](https://vitest.dev/guide/debugging)
- [Mason JavaScript 디버그 어댑터](https://github.com/mason-org/mason-registry/blob/main/packages/js-debug-adapter/package.yaml)
