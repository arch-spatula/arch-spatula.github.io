const typescriptParser = require('@typescript-eslint/parser');
const typescriptPlugin = require('@typescript-eslint/eslint-plugin');
const globals = require('globals');

module.exports = [
  {
    files: ['**/*.js', '**/*.ts'],
    ignores: ['node_modules/**'],
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        EventSourceInit: 'readonly',
        ReadableStreamReadResult: 'readonly',
        ...globals.node,
        __dirname: 'readonly',
        module: 'readonly',
        require: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
    },
    rules: {
      // https://www.notion.so/vmssolutions/ESlint-Prettier-7b7c015560a44c8e8e9ed4a527e162e9
      /**
       * [TypeScript rules]
       * no-explicit-any: any 타입 사용을 경고
       * explicit-module-boundary-types: 함수 반환 타입 명시를 경고
       * no-inferrable-types: 추론 가능한 타입을 명시적으로 선언하는 것을 방지하는 규칙
       * */
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      //'@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-inferrable-types': 'warn',

      /**
       * [best practice rules]
       * curly: 제어문에 중괄호를 사용하되, 여러 줄일 때만 중괄호를 강제
       * default-case: switch 문에 default case가 없을 때 경고
       * no-alert: alert 사용을 경고
       * no-case-declarations: case 문에서 변수 선언을 금지
       * no-empty-function: 빈 함수를 금지
       * no-empty-pattern: 빈 구조 분해 패턴을 금지
       * no-loop-func: 루프 내부에서 함수 선언을 금지
       * no-lone-blocks: 불필요한 중첩 블록 허용하지 않기
       * no-console: 콘솔 사용을 경고
       * eqeqeq: == 대신 === 사용을 강제하되, null과의 비교는 예외로 허용
       * no-unused-vars: 사용하지 않는 변수 경고
       * no-undef: 선언되지 않은 변수 사용 금지
       * no-var: var 사용을 경고
       * consistent-return: `return` 문에 값을 명시적으로 지정하거나 생략하는 방식이 일관되도록 요구
       * dot-notation: 속성 접근 시 대괄호 표기법 대신 점 표기법을 권장합니다. 단, 예약어는 예외로 허용
       * guard-for-in: `for-in` 루프에서 반드시 `if` 문을 사용해 객체의 프로토타입 속성을 제외하도록 강제
       * no-caller: `arguments.caller`와 `arguments.callee` 사용을 금지
       * no-eval: `eval()`의 사용을 금지
       * no-extend-native: 네이티브 객체를 확장하지 않도록 금지
       * no-extra-bind: 불필요한 함수 바인딩을 금지
       * no-extra-label: 불필요한 레이블 사용을 금지
       * no-fallthrough: `switch` 문에서 `case` 간의 의도하지 않은 비연속 흐름을 방지
       * no-implied-eval: `eval()`과 유사한 메소드 사용을 금지
       * no-iterator: `__iterator__` 속성 사용을 금지
       * no-labels: 루프와 `switch` 문을 제외한 모든 레이블 사용을 금지
       * no-multi-str: 여러 줄 문자열을 사용하지 않도록 금지
       * no-native-reassign: 네이티브 객체의 재할당을 금지
       * no-new: 할당이나 비교 없이 `new` 연산자를 사용하지 않도록 금지
       * no-new-func: `Function` 생성자를 사용하지 않도록 금지
       * no-new-wrappers: `String`, `Number`, `Boolean`의 인스턴스를 생성하지 않도록 금지
       * no-else-return: `return` 문 다음에 `else` 문을 사용하지 않도록 함
       */
      curly: ['warn', 'multi-line'],
      'default-case': ['error', { commentPattern: '^no default$' }],
      'no-alert': 'error',
      'no-case-declarations': 'warn',
      'no-empty-function': ['error', { allow: ['arrowFunctions'] }],
      'no-empty-pattern': 'error',
      'no-loop-func': 'error',
      'no-lone-blocks': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      eqeqeq: ['error', 'allow-null'],

      /**
       * 타입스크립트 인터페이스 및 함수 타입은 매개변수 활용 여부 무시
       */
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-undef': 'warn',
      'no-var': 'warn',
      'consistent-return': 'warn',
      'dot-notation': ['warn', { allowKeywords: true }],
      'guard-for-in': 'error',
      'no-caller': 'error',
      'no-eval': 'error',
      'no-extend-native': 'error',
      'no-extra-bind': 'error',
      'no-extra-label': 'error',
      'no-fallthrough': 'error',
      'no-implied-eval': 'error',
      'no-iterator': 'error',
      'no-labels': ['error', { allowLoop: false, allowSwitch: false }],
      'no-multi-str': 'error',
      'no-native-reassign': 'error',
      'no-new': 'error',
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      'no-else-return': 'warn',

      /**
       * [errors rules]
       * no-cond-assign: 조건문에서 할당 연산자 사용 금지
       * no-dupe-args: 중복된 함수 인자 금지
       * no-dupe-keys: 중복된 객체 키 금지
       * no-duplicate-case: 중복된 case 문 금지
       * no-empty: 빈 블록문 금지
       * no-func-assign: 함수 선언을 다시 할당 금지
       * no-sparse-arrays: 희소 배열 금지
       * no-unreachable: return, throw, continue, break 뒤에 도달할 수 없는 코드 허용 금지
       * use-isnan: NaN과 비교할 때 isNaN() 사용 권장
       * valid-typeof: 올바른 typeof 연산자 사용 권장
       * no-constant-condition: 조건식에서 상수 표현식의 사용을 경고
       * no-control-regex: 정규 표현식에서 제어 문자의 사용을 금지
       * no-empty-character-class: 정규 표현식에서 빈 문자 클래스를 허용하지 않음
       * no-ex-assign: `catch` 블록 내에서 예외 객체에 할당하는 것을 금지
       * no-invalid-regexp: `RegExp` 생성자에서 잘못된 정규 표현식을 허용하지 않음
       * no-negated-in-lhs: `in` 연산자의 왼쪽 피연산자로 부정된 표현식을 허용하지 않음
       * no-obj-calls: `Math`, `JSON` 등의 네이티브 객체를 함수처럼 호출하는 것을 금지
       * no-regex-spaces: 정규 표현식에서 여러 개의 연속된 공백 문자를 허용하지 않음
       * no-unsafe-finally: `finally` 블록 안에서의 `return`, `throw`, `break`, `continue`를 허용하지 않음
       */
      'no-cond-assign': ['error', 'always'],
      'no-dupe-args': 'error',
      'no-dupe-keys': 'error',
      'no-duplicate-case': 'error',
      'no-empty': 'error',
      'no-func-assign': 'error',
      'no-sparse-arrays': 'error',
      'no-unreachable': 'error',
      'use-isnan': 'error',
      'valid-typeof': 'error',
      'no-constant-condition': 'warn',
      'no-control-regex': 'error',
      'no-empty-character-class': 'error',
      'no-ex-assign': 'error',
      'no-invalid-regexp': 'error',
      'no-negated-in-lhs': 'error',
      'no-obj-calls': 'error',
      'no-regex-spaces': 'error',
      'no-unsafe-finally': 'error',

      /**
       * [ES6 rules]
       * no-const-assign: const 재할당 금지
       * no-dupe-class-members: 클래스 멤버 중복 금지
       * no-duplicate-imports: 중복된 import 금지
       * no-useless-rename: import, export, 구조 분해 할당에서 동일한 이름으로 다시 이름을 지정하는 것을 금지
       * prefer-const: 재할당되지 않는 변수를 const로 선언하도록 권장
       * arrow-body-style: 중괄호가 필요 없는 경우, 화살표 함수에서 중괄호를 생략하도록 강제
       * no-class-assign: 클래스 선언을 재할당하지 않도록 금지
       * no-new-symbol: `Symbol` 생성자를 `new` 연산자로 호출하지 않도록 금지
       * no-useless-constructor: 불필요한 생성자를 허용하지 않음
       * object-shorthand: 객체 리터럴에서 메소드와 속성의 축약형 문법을 사용하도록 강제
       * prefer-arrow-callback: 콜백 함수로 화살표 함수를 사용하는 것을 권장
       * prefer-rest-params: `arguments` 대신 나머지 매개변수를 사용하도록 강제
       * prefer-template: 문자열 연결 대신 템플릿 리터럴을 사용하도록 권장
       */
      'no-const-assign': 'error',
      'no-dupe-class-members': 'error',
      'no-duplicate-imports': 'error',
      'no-useless-rename': ['error', { ignoreDestructuring: false, ignoreImport: false, ignoreExport: false }],
      'prefer-const': ['error', { destructuring: 'any', ignoreReadBeforeAssign: true }],
      'arrow-body-style': ['error', 'as-needed'],
      'no-class-assign': 'error',
      'no-new-symbol': 'error',
      'no-useless-constructor': 'error',
      'object-shorthand': ['error', 'always', { ignoreConstructors: false, avoidQuotes: true }],
      'prefer-arrow-callback': ['error', { allowNamedFunctions: false, allowUnboundThis: true }],
      'prefer-rest-params': 'error',
      'prefer-template': 'error',

      /**
       * [style rules]
       * camelcase: 변수 이름에 카멜 케이스를 요구하며, 객체 속성에는 적용하지 않음
       * func-names: 함수 이름을 요구
       * no-nested-ternary: 중첩된 삼항 연산자 금지
       * keyword-spacing: 키워드 앞뒤에 일관된 공백을 요구합니다. `return`, `throw`, `case` 이후에도 공백이 있어야 함
       * new-cap: 생성자 함수 호출 시 대문자로 시작하도록 강제
       * no-array-constructor: `Array` 생성자 사용을 금지
       * no-new-object: `Object` 생성자를 사용하지 않도록 금지
       * no-restricted-syntax: 특정 구문(예: `for...in`, `with` 등)의 사용을 금지
       * no-spaced-func: 함수 호출 시 함수명과 괄호 사이에 공백을 허용하지 않음
       * no-underscore-dangle: 식별자에 밑줄(`_`)을 사용하지 않도록 금지 (단, `this` 뒤에는 허용하지 않음)
       * no-unneeded-ternary: 불필요한 삼항 연산자를 허용하지 않음
       * one-var: 함수 내에서 한 번에 하나의 변수 선언만 허용
       * unicode-bom: 유니코드 바이트 순서 표식을 허용하지 않음
       */
      camelcase: ['warn', { properties: 'never' }],
      'func-names': 'warn',
      'no-nested-ternary': 'warn',
      'keyword-spacing': [
        'error',
        {
          before: true,
          after: true,
          overrides: { return: { after: true }, throw: { after: true }, case: { after: true } },
        },
      ],
      'new-cap': ['error', { newIsCap: true }],
      'no-array-constructor': 'warn',
      'no-new-object': 'error',
      'no-restricted-syntax': ['error', 'DebuggerStatement', 'ForInStatement', 'LabeledStatement', 'WithStatement'],
      'no-spaced-func': 'error',
      'no-underscore-dangle': ['error', { allowAfterThis: true }],
      'no-unneeded-ternary': ['error', { defaultAssignment: false }],
      'one-var': ['error', 'never'],
      'unicode-bom': ['error', 'never'],

      // /**
      //  * [variables rules]
      //  * no-delete-var: 변수를 delete 연산자로 삭제하지 않도록 금지
      //  * no-shadow: 외부 범위에 선언된 변수와 같은 이름을 사용하는 것을 금지
      //  */
      'no-delete-var': 'warn',
      'no-shadow': 'error',
    },
  },
];
