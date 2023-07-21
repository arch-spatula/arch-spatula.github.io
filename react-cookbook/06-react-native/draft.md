## Next JS에서 제일 중요한 기능

[Next.js Server Actions... 5 awesome things you can do](https://www.youtube.com/watch?v=O94ESaJtHtM)

[Server Actions: NextJS 13.4's Best New Feature](https://www.youtube.com/watch?v=czvSZqnpTHs)

[Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions)

## TIL.22.12.29. - 리액트 네이티브 체험시작

## flex는 퍼센트입니다.

```js
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

위 코드에서 `flex`는 퍼센트입니다. 0부터 1까지 소수점이 퍼센트에 해당합니다.

## 조건부 스타일링

```js
<TouchableOpacity
  style={ButtonStyled(navState.react).container}
  onPress={() => dispatch('react')}
>
  <Text>React</Text>
</TouchableOpacity>;

// ...

const ButtonStyled = (props) =>
  StyleSheet.create({
    container: {
      height: 56,
      paddingHorizontal: 20,
      justifyContent: 'center',
      fontSize: 16,
      backgroundColor: props ? '#dddddd' : '#f8f8f8',
    },
  });
```

상당히 특이한 방식으로 조건부 스타일을 구현합니다.

## 터치를 위해서 `TouchableOpacity`

```js
              <TouchableOpacity
                style={IconStyled.container}
                onPress={() => handleToggleTodo(item.id)}
              >
                <FontAwesome name="check-square-o" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                style={IconStyled.container}
                onPress={() => handleEdit(item.id)}
              >
                <FontAwesome5 name="edit" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                style={IconStyled.container}
                onPress={() => handleDelete(item.id)}
              >
                <Feather name="delete" size={24} color="black" />
              </TouchableOpacity>
```

## 터치를 위한 사이즈는 40 ~ 56

```js
const ButtonStyled = (props) =>
  StyleSheet.create({
    container: {
      height: 56,
      paddingHorizontal: 20,
      justifyContent: 'center',
      fontSize: 16,
      backgroundColor: props ? '#dddddd' : '#f8f8f8',
    },
  });
```

## RN IOS 시뮬레이터

일자: 2022.12.30.

### 문제

시뮬레이터를 컴퓨터에서 보면서 작업하려고 했습니다.

### 시도

https://velog.io/@taese0ng/M1-%EB%A7%A5%EC%97%90%EC%84%9C-React-Native-%EC%84%B8%ED%8C%85%ED%95%98%EA%B8%B0

이런 블로그를 보고 watchmen 설치 시도를 했습니다. 필요 없습니다.

### 해결

유튜브를 검색해서 강의가 있는지 확인했습니다.

[React Native Tutorial for Beginners - Build a React Native App](https://youtu.be/0-S5a0eXPoc?t=878)

정상작동을 파악할 수 있게 시뮬레이션 돌 수 있는 기계를 확인합니다.

```sh
xcrun simctl list devices
```

에러

> xcrun: error: unable to find utility "simctl", not a developer tool or in PATH

이런 피드백을 돌려줄 것입니다. 이런 피드백을 받았다는 것은 경로 설정이 안 되어 있는 것입니다.

https://stackoverflow.com/questions/29108172/how-do-i-fix-the-xcrun-unable-to-find-simctl-error

위 답변이 경로 설정입니다.

watchmen 이런 거 설치할 필요가 없습니다.

### 학습

불필요하게 많은 설정하기 전에 먼저 제일 단순한 방법이 있는지 찾고 단순한 방법부터 시도합니다.
