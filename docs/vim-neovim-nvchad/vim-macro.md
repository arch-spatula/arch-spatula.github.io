---
sidebar_position: 6
tags: ['vim', 'vim command', 'vimtutor', 'vim macro']
---

# vim 맥크로 활용법

저는 백준 문제를 풀때 테스트 케이스를 작성하고 풀어봅니다.

[너의 평점은](https://www.acmicpc.net/problem/25206)

의 테스트 케이스를 작성할 때 Vim Macro로 작성했습니다.

`q`는 매크로를 등록합니다. 저는 Vim 초보라 그냥 `a`라고 등록했습니다.

단어 시작은 `w` 단어 끝은 `e`로 이동합니다. `i`는 이전 `a`는 글자 이후 삽입니다. `$`은 줄끝 이동입니다. `f`는 검색입니다. `_`은 줄 시작인데 들여쓰기 기준 줄시작입니다. `0`은 들여쓰기 기준 없이 줄시작으로 이동입니다. `cmd` + `[`으로 노말 모드로 돌아왔습니다.

`@` + `(매크로 이름)` 으로 맥크로를 실행합니다. 여기서 `(숫자)` + `@` + `(맥크로 이름)`으로 여러번 반복 실행할 수 있습니다.

```
ObjectOrientedProgramming1 3.0 A+
IntroductiontoComputerEngineering 3.0 A+
ObjectOrientedProgramming2 3.0 A0
CreativeComputerEngineeringDesign 3.0 A+
AssemblyLanguage 3.0 A+
InternetProgramming 3.0 B0
ApplicationProgramminginJava 3.0 A0
SystemProgramming 3.0 B0
OperatingSystem 3.0 B0
WirelessCommunicationsandNetworking 3.0 C+
LogicCircuits 3.0 B0
DataStructure 4.0 A+
MicroprocessorApplication 3.0 B+
EmbeddedSoftware 3.0 C0
ComputerSecurity 3.0 D+
Database 3.0 C+
Algorithm 3.0 B0
CapstoneDesigninCSE 3.0 B+
CompilerDesign 3.0 D0
ProblemSolving 4.0 P
```

이런 테스트 케이스를 배열에 담아야 했습니다.

매크로 활용 전에 횟수로 숫자를 입력하고 매크로를 호출하니 편집 경험이 새로웠습니다.

```js
import { solution } from './playground';
import { test, expect, describe } from 'vitest';

describe('전공평점을 계산해주는 프로그램', () => {
  test('치훈이의 실제 전공과목 성적', () => {
    expect(
      solution([
        ['ObjectOrientedProgramming1', 3.0, 'A+'],
        ['IntroductiontoComputerEngineering', 3.0, 'A+'],
        ['ObjectOrientedProgramming2', 3.0, 'A0'],
        ['CreativeComputerEngineeringDesign', 3.0, 'A+'],
        ['AssemblyLanguage', 3.0, 'A+'],
        ['InternetProgramming', 3.0, 'B0'],
        ['ApplicationProgramminginJava', 3.0, 'A0'],
        ['SystemProgramming', 3.0, 'B0'],
        ['OperatingSystem', 3.0, 'B0'],
        ['WirelessCommunicationsandNetworking', 3.0, 'C+'],
        ['LogicCircuits', 3.0, 'B0'],
        ['DataStructure', 4.0, 'A+'],
        ['MicroprocessorApplication', 3.0, 'B+'],
        ['EmbeddedSoftware', 3.0, 'C0'],
        ['ComputerSecurity', 3.0, 'D+'],
        ['Database', 3.0, 'C+'],
        ['Algorithm', 3.0, 'B0'],
        ['CapstoneDesigninCSE', 3.0, 'B+'],
        ['CompilerDesign', 3.0, 'D0'],
        ['ProblemSolving', 4.0, 'P'],
      ])
    ).toBe(3.284483);
  });

  test('취미로 대학교 다님', () => {
    expect(
      solution([
        ['BruteForce', 3.0, 'F'],
        ['Greedy', 1.0, 'F'],
        ['DivideandConquer', 2.0, 'F'],
        ['DynamicProgramming', 3.0, 'F'],
        ['DepthFirstSearch', 4.0, 'F'],
        ['BreadthFirstSearch', 3.0, 'F'],
        ['ShortestPath', 4.0, 'F'],
        ['DisjointSet', 2.0, 'F'],
        ['MinimumSpanningTree', 2.0, 'F'],
        ['TopologicalSorting', 1.0, 'F'],
        ['LeastCommonAncestor', 2.0, 'F'],
        ['SegmentTree', 4.0, 'F'],
        ['EulerTourTechnique', 3.0, 'F'],
        ['StronglyConnectedComponent', 2.0, 'F'],
        ['BipartiteMatching', 2.0, 'F'],
        ['MaximumFlowProblem', 3.0, 'F'],
        ['SuffixArray', 1.0, 'F'],
        ['HeavyLightDecomposition', 4.0, 'F'],
        ['CentroidDecomposition', 3.0, 'F'],
        ['SplayTree', 1.0, 'F'],
      ])
    ).toBe(0.0);
  });
});
```
