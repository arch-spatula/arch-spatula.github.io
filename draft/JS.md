## 생활코딩 정규표현식 배우기

https://opentutorials.org/course/743/6580

https://www.youtube.com/watch?v=5pN3_yGmbrA

문자열을 쿼리하고 치환하는 강력한 도구입니다. 정규표현식은 특정 언어에 한정된 것은 아닙니다. 자바스크립트 이외 다른 언어에서도 정규표현식을 다루는 방법을 배워야 합니다. 다른 언어에서도 공통적으로 적용할 수 있기 때문에

정규표현식으로 할 수 있는 것들이 있습니다.

텍스트의 정보를 찾을 때 많이 활용합니다. 치환할 때 많이 활용합니다. 프로그래밍 초심자에게도 상당히 중요합니다.

https://www.youtube.com/watch?v=yZ0gW_VslE8

정규표현식은 크게 2가지 방법으로 사용할 수 있습니다. 하나는 컴파일 단계가 있고 실행단계가 있습니다. 컴파일에서 문자열을 치환하고 있는지 확인하는 작업에서 필요한 대상과 패턴찾기를 해야 합니다. 컴파일은 패턴을 찾는 것이라면 실행이라는 그 대상이 하는 구체적인 행위입니다.

정규표현식에서 패턴을 만드는 방법은 2가지입니다.

```js
// 리터럴
const pattern = /n/;

// 생성자
const regexInstance = new RegExp('n');
```

생성자함수에 문자열을 대입할지 리터럴로 정의할지는 상황에 따라 본인이 알아서 정의하도록 합니다.

https://www.youtube.com/watch?v=siP__-Xb-jc

정규 표현식은 추출할 때 많이 활용합니다. 웹 크롤러에서 태그에서 원하는 정보만 얻어오게 활용할 수 있습니다.

확인하고자 하는정보가 존재하는지 확인할 때 활용할 수 있습니다.

마지막은 교체입니다.

```js
const pattern = /a/;

console.log(pattern.exec('abcdef')); // ['a', index: 0, input: 'abcdef', groups: undefined]

console.log(pattern.exec('bcdefg')); // null
```

위는 크롬에서 실행했을 때 받은 값들입니다. 인덱스도 알 수 있고 무엇이 있는지도 알 수 있습니다.

```js
const pattern = /a./;

console.log(pattern.exec('abcdef')); // ['ab', index: 0, input: 'abcdef', groups: undefined]
```

`ab`가 나옵니다. 위 배열은 정확히는 유사배열 객체입니다.

이 exec는 정확히 정보 추출을 위해서 사용합니다.

```js
const pattern = /a/;

console.log(pattern.test('abcdef')); // true
cnosole.log(pattern.test('bcdefg')); // false
```

이것은 정보가 존재하고 말고를 확인할 때 활용할 수 있습니다.

https://www.youtube.com/watch?v=XjrdeiHWUJs

문자열에서 메서드를 사용하는 방법도 있습니다.

```js
const pattern = /a/;

console.log('abcdef'.match(pattern)); // ['a', index: 0, input: 'abcdef', groups: undefined]
console.log('bcdefg'.match(pattern)); // null
```

이렇게 일치를 반환합니다.

```js
const pattern = /a/;

console.log('abcdef'.replace(pattern, 'A')); // Abcdef
```

치환을 적용하는 방법입니다.

https://www.youtube.com/watch?v=ODgFmQY38AE

정규표현식에는 옵션이 있습니다.

```js
console.log('Abcdef'.match(/a/)); // null
console.log('Abcdef'.match(/a/i)); // ['a', index: 0, input: 'abcdef', groups: undefined]
```

`i`는 대소문자 구분하지 않습니다.

```js
console.log('abcdefa'.match(/a/g)); // ['a', index: 0, input: 'abcdef', groups: undefined]
console.log('abcdefa'.match(/a/g)); // ['a','a']
```

`g`는 전체를 찾습니다.

또 이런 옵션(flag)은 조합도 가능합니다.

```js
console.log('abcdefA'.match(/a/gi)); // ['a', 'A']
```

https://www.youtube.com/watch?v=uMN3-U9lpCI

캡쳐입니다.

```js
const pattern = /(\w+)\s(\w+)/;
```

괄호는 정규표현식에서 그룹을 의미합니다.

이 의미를 https://regexper.com/에 적용해보고 탐구해보기 바랍니다.

정규 표현식에서 `w`은 문자열을 의미합니다. a~z, A~Z, 0~9를 의미합니다.

`+`은 수량자라고 합니다. 1개 이상 존재하면 해당한다고 가정합니다.

`\s`은 공백을 의미합니다.

```js
const pattern = /(\w+)\s(\w+)/;
const str = 'coding everybody';
const result = str.replace(pattern, '$2, $1');
console.log(result); // everybody, coding
```

단어띄어쓰기단어 패턴을 정의한 것입니다. 여기서 `$1`, `$2`은 그룹을 의미합니다.

replace 메서드에서 두번째 인자에서 `$`는 `()`을 의미합니다. 그리고 `$`뒤 숫자는 번째를 의미합니다. 인덱스처럼 0부터 시작하지는 않습니다.

그룹을 불러와 그룹을 활용하는 것을 보고 캡쳐라고 부릅니다.

https://www.youtube.com/watch?v=a9Hg9ed5utg

치환하는 방법입니다.

```js
const urlPattern = /\b(?:https?):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*/gim;
const content =
  '생활코딩 : http://opentutorials.org/course/1 입니다. 네이버 : http://naver.com 입니다. ';
const result = content.replace(
  urlPattern,
  (url) => '<a href="' + url + '">' + url + '</a>'
);
console.log(result);
// 생활코딩 : <a href="http://opentutorials.org/course/1">http://opentutorials.org/course/1</a> 입니다. 네이버 : <a href="http://naver.com">http://naver.com</a> 입니다.
```

나무위키에 생각보다 많은 자료를 다룹니다.
