---
description: '리액트 네이티브 내용 미분류'
tags: ['react', 'react native', 'mobile']
draft: true
---

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

## TIL.23.01.02. - 리액트 네이티브

이미 git이 있어서 저장하고 있지만 작업이 아까워서 복사하고 싶을 때 사용하는 커맨드

```sh
cp -r (복사할 디렉토리) (붙일 디렉토리이름)
```

```js
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { v4 as uuid } from 'uuid';

// 리덕스 설치하기

export default function App() {
  // TODO: 탭스 컴포넌트 분리하기
  // TODO: todo item 컴포넌트 분리하기
  // TODO: 파이어 베이스 설치
  // TODO: 리덕스로 전역 상태관리하기
  const tabs = ['React', 'JavaScript', 'Coding Test'];
  const [todos, setTodos] = useState([]);
  const [category, setCategory] = useState('JavaScript');
  const [text, setText] = useState('');
  const newTodo = {
    id: Date.now(),
    text,
    isDone: false,
    isEdit: false,
    category,
  };
  const [todoEdit, setTodoEdit] = useState('');

  const addTodo = () => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setText('');
  };
  const crossOutTodo = (id) => {
    setTodos((prevTodos) =>
      [...prevTodos].map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : { ...todo }
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => [...prevTodos].filter((todo) => todo.id !== id));
  };

  const editTodo = (id) => {
    setTodos((prevTodos) =>
      [...prevTodos].map((todo) =>
        todo.id === id ? { ...todo, isEdit: true } : { ...todo }
      )
    );
  };

  const saveTodo = (id) => {
    setTodos((prevTodos) =>
      [...prevTodos].map((todo) =>
        todo.id === id
          ? { ...todo, isEdit: false, text: todoEdit }
          : { ...todo }
      )
    );
  };

  const changeTabs = (tab) => {
    setCategory(tab);
  };
  // rendered Component
  const renderedTabs = tabs.map((tab) => (
    <TouchableOpacity
      onPress={() => changeTabs(tab)}
      style={{
        ...styles.tabsItem,
        backgroundColor: tab === category ? '#D1D5DB' : '#F9FAFB',
      }}
      key={tab}
    >
      <Text>{tab}</Text>
    </TouchableOpacity>
  ));

  const renderedTodos = todos
    .filter((todo) => todo.category === category)
    .map((todo) => (
      <View key={todo.id} style={styles.todoItem}>
        {/* isEdit를 사용한 조건부 렌더링 */}
        {todo.isEdit ? (
          <TextInput
            defaultValue={todoEdit}
            onChangeText={setTodoEdit}
            onSubmitEditing={() => saveTodo(todo.id)}
          />
        ) : (
          <Text
            style={{
              textDecorationLine: todo.isDone ? 'line-through' : 'none',
            }}
          >
            {todo.text}
          </Text>
        )}
        <View style={styles.iconButtonGroup}>
          <TouchableOpacity
            onPress={() => crossOutTodo(todo.id)}
            style={styles.iconButtonItem}
          >
            <Feather name="check-square" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => editTodo(todo.id)}
            style={styles.iconButtonItem}
          >
            <Feather name="edit" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => deleteTodo(todo.id)}
            style={styles.iconButtonItem}
          >
            <Feather name="delete" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    ));

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.tabsContainer}>{renderedTabs}</View>
      <TextInput
        onChangeText={setText}
        value={text}
        onSubmitEditing={addTodo}
        style={styles.mainInput}
      />
      <View style={styles.todoContainer}>{renderedTodos}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 16,
  },
  tabsItem: {
    height: 56,
    fontSize: 16,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  mainInput: {
    height: 56,
    backgroundColor: '#F3F4F6',
    borderColor: '#9CA3AF',
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 16,
    paddingHorizontal: 12,
  },
  todoContainer: {
    marginHorizontal: 16,
    marginTop: 24,
  },
  todoItem: {
    backgroundColor: '#F9FAFB',
    paddingVertical: 8,
    paddingLeft: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
  },
  iconButtonGroup: {
    flexDirection: 'row',
  },
  iconButtonItem: {
    height: 48,
    width: 48,
    alignContent: 'center',
    justifyContent: 'center',
  },
});
```

tab까지 정상 동작하고 분류도 동작합니다. 이제 책임을 분리하는 작업을 진행하겠습니다.

```ts
import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useReducer,
  useCallback,
  useMemo,
} from 'react';

interface Pokemon {
  id: number;
  name: string;
  type: string[];
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
}

const usePokemonSource = (): {
  pokemon: Pokemon[];
  search: string;
  setSearch: (search: string) => void;
} => {
  type PokemonState = {
    pokemon: Pokemon[];
    search: string;
  };
  type PokemonAction =
    | { type: 'setPokemon'; payload: Pokemon[] }
    | { type: 'setSearch'; payload: string };
  const [{ pokemon, search }, dispatch] = useReducer(
    (state: PokemonState, action: PokemonAction) => {
      switch (action.type) {
        case 'setPokemon':
          return { ...state, pokemon: action.payload };
        case 'setSearch':
          return { ...state, search: action.payload };
      }
    },
    {
      pokemon: [],
      search: '',
    }
  );
  useEffect(() => {
    fetch('pokemon.json')
      .then((res) => res.json())
      .then((data) =>
        dispatch({
          type: 'setPokemon',
          payload: data,
        })
      );
  }, []);

  const setSearch = useCallback((search: string) => {
    dispatch({ type: 'setSearch', payload: search });
  }, []);

  const filteredPokemon = useMemo((): Pokemon[] => {
    return pokemon
      .filter((p: Pokemon) => p.name.includes(search.toLowerCase()))
      .slice(0, 20);
  }, [pokemon, search]);

  const sortedPokemon = useMemo(
    () => [...filteredPokemon].sort((a, b) => a.name.localeCompare(b.name)),
    [filteredPokemon]
  );

  return { pokemon: sortedPokemon, search, setSearch };
};

const PokemonContext = createContext<ReturnType<typeof usePokemonSource>>(
  {} as unknown as ReturnType<typeof usePokemonSource>
);

const usePokemon = () => {
  return useContext(PokemonContext);
};

function PokemonProvider({ children }: { children: React.ReactNode }) {
  return (
    <PokemonContext.Provider value={usePokemonSource()}>
      {children}
    </PokemonContext.Provider>
  );
}

export { PokemonProvider, usePokemon };
```

코드는 작성하면서 반만 이해되었습니다. 하지만 이해가 부족한 상태에서 예제를 더 공부할 수 없었습니다.

## TIL.23.01.03. - Context API

[State Management in React | Context API useContext | React Tutorials for Beginners](https://www.youtube.com/watch?v=ngVvDegsAW8)

```js
// src/context/DataContext.jsx
import { createContext, useState, useEffect } from 'react';
import useAxiosFetch from '../hooks/useAxiosFetch';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const { data, fetchError, isLoading } = useAxiosFetch(
    'http://localhost:3500/posts'
  );

  useEffect(() => {
    setPosts(data);
  }, [data]);

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  return (
    <DataContext.Provider
      value={{
        search,
        setSearch,
        searchResults,
        fetchError,
        isLoading,
        posts,
        setPosts,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
```

공유할 state를 context 폴더 속에 하나의 모듈로 만들어줍니다. 2가지를 내보냅니다. `DataProvider` 컴포넌트를 `Provider`가 될 수 있도록 내보냅니다. `DataContext`가 선택될 수 있도록 내보냅니다.

접두어(예: data)는 도메인에 맞추고 접미어(예: Provider, Context)로 기능을 나타냅니다.

```js
// src/App.js
import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import EditPost from './EditPost';
import About from './About';
import Missing from './Missing';
import { Route, Switch } from 'react-router-dom';
import { DataProvider } from './context/DataContext';

function App() {
  return (
    <div className="App">
      <Header title="React JS Blog" />
      <DataProvider>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/post" component={NewPost} />
          <Route path="/edit/:id" component={EditPost} />
          <Route path="/post/:id" component={PostPage} />
          <Route path="/about" component={About} />
          <Route path="*" component={Missing} />
        </Switch>
      </DataProvider>
      <Footer />
    </div>
  );
}

export default App;
```

`DataProvider`로 감싸서 자식 컴포넌트가 접근할 수 있도록 제공합니다.

```js
// src/home.jsx
import Feed from './Feed';
import { useContext } from 'react';
import DataContext from './context/DataContext';

const Home = () => {
  const { searchResults, fetchError, isLoading } = useContext(DataContext);

  return (
    <main className="Home">
      {isLoading && <p className="statusMsg">Loading posts...</p>}
      {!isLoading && fetchError && (
        <p className="statusMsg" style={{ color: 'red' }}>
          {fetchError}
        </p>
      )}
      {!isLoading &&
        !fetchError &&
        (searchResults.length ? (
          <Feed posts={searchResults} />
        ) : (
          <p className="statusMsg">No posts to display.</p>
        ))}
    </main>
  );
};

export default Home;
```

`DataContext`로 글로벌 state를 접근합니다.

## 리액트 네이티브 덜 기초

emotion과 리액트 쿼리를 응용하는 법을 배웁니다.

- [ ] react-navigation 의 bottom-tab navigator와 native stack navigator 를 자유롭게 사용할 수 있다
- [ ] useEffect 와 useFocusEffect의 차이를 설명할 수 있다
- [ ] 다크모드를 컨트롤 할 수 있다
- [ ] ScrollView를 FlatList로 리팩토링 할 수 있다
- [ ] React-Query를 이용해서 API 통신을 할 수 있다
- [ ] React Native로 영화리뷰앱을 만들 수 있다

https://github.com/rjc1704/RN-movie-lecture-practical/tree/Darkmode

## 1 Expo Setup and AppIcon

https://www.youtube.com/watch?v=5ADmHtEIlCo

기술적인 내용하는 전에 간단한 것부터 다루겠습니다.

터미널만 활용해서 EXPO 설치할 수 있습니다.

```sh
npx create-expo-app .
```

이렇게 CIL로 처리할 수 있습니다.

나중에 작업이 끝난 상태에서 expo 홈페이지에 vscode를 연결하는 방법입니다.

```sh
eas update:configure
```

eas 프로젝트를 만들지 문답을 합니다. 미리 로그인해야 편할 것입니다.

```sh
eas update
```

위 커맨드를 사용하면 배포가 됩니다.

https://docs.expo.dev/guides/app-icons/

expo 공식 홈페이지에서 아이콘을 지정할 수 있습니다. 앱 아이콘을 만들고 변경할 수 있습니다.

스플레시는 앱이 번들링하는 동안 보일 화면입니다.

에뮬레이터를 사용하는 사람은 cmd + d를 누르면 개발자 도구를 접근할 수 있습니다.

figma에서 아이콘을 넣고 반영할 수 있습니다. 권장하는 가이드가 있고 거기에 맞게 이미지 이름에 맞게 교체해주시기 바랍니다.

## 2 react navigation소개

https://reactnavigation.org/

리액트 네이티브를 위한 react-router-dom입니다. 네비게이팅 방식에 따라 레이아웃에 맞게 사용할 수 있습니다.

현업에서 상당히 많이 사용하는 라이브러리입니다.

```sh
npm install @react-navigation/native
```

위 명령으로 설치할 수 있습니다.

```sh
npx expo install react-native-screens react-native-safe-area-context
```

위 명령은 expo에 맞게 설치할 수 있게 해줍니다.

6가지 네비게이터를 지원합니다.

https://reactnavigation.org/docs/stack-navigator

그냥 stack과 Native stack의 차이는 네이티브 모듈 활용여부입니다. 네이티브 모듈을 활용하면 당연히 성능이 더 좋습니다. 그냥 stack은 커스터마이지을 많이 할 수 있지만 현업에서는 네이티브 stack에 커스터마이징도 많이 합니다.

BNT 네비게이터는 모바일의 정석입니다.

Drawer는 서랍에서 꺼내는 네비게이터입니다. 상당히 정석입니다.

Material이 접두어로 붙으면 구글이 제공하는 UI를 활용할 수 있습니다.

## 3 Native Stack Navigator

```sh
npm install @react-navigation/native-stack
```

expo 용 Navigator 설치하는 것이 먼저입니다. 더 위에서 참고하기 바랍니다.

네이게이터를 그냥 사용할 수 없습니다.

```js
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>{/* ... */}</Stack.Navigator>
    </NavigationContainer>
  );
}
```

네비게이션 컨테이너(`NavigationContainer`)로 감싸야 합니다. 위처럼 작성해야 합니다.

라우팅 단위는 Screen입니다. 웹 페이지랑 동일하고 이름만 다릅니다.

```js
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';

const Stack = createNativeStackNavigator();

const One = () => {
  return (
    <View>
      <Text>One</Text>
    </View>
  );
};
const Two = () => {
  return (
    <View>
      <Text>Two</Text>
    </View>
  );
};
const Three = () => {
  return (
    <View>
      <Text>Three</Text>
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="one" component={One} />
        <Stack.Screen name="two" component={Two} />
        <Stack.Screen name="three" component={Three} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

One, Two, Three는 스크린 컴포넌트에 해당합니다.

```js
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Stack = createNativeStackNavigator();

const One = ({ navigation: { navigate } }) => {
  return (
    <TouchableOpacity onPress={() => navigate('two')}>
      <Text>One</Text>
    </TouchableOpacity>
  );
};
const Two = ({ navigation: { navigate } }) => {
  return (
    <TouchableOpacity onPress={() => navigate('three')}>
      <Text>Two</Text>
    </TouchableOpacity>
  );
};
const Three = ({ navigation: { goBack } }) => {
  return (
    <TouchableOpacity onPress={() => goBack('three')}>
      <Text>Three</Text>
    </TouchableOpacity>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="one" component={One} />
        <Stack.Screen name="two" component={Two} />
        <Stack.Screen name="three" component={Three} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

이런 방법으로 stack 네비게이션을 구현할 수 있습니다.

reset도 존재합니다. Navigation prop에 해당하는 개념입니다.

[Navigation prop - 공식 문서](https://reactnavigation.org/docs/navigation-prop)

이런 래퍼런스들이 존재합니다.

reset과 setOption도 자주 사용합니다.

reset은 초기화를 지정할 수 있습니다. 객체를 인자로 받습니다. 객체의 속성으로 돌아갈 화면과

```js
const Three = ({ navigation: { goBack, reset } }) => {
  return (
    <View>
      <TouchableOpacity onPress={() => goBack('three')}>
        <Text>Three</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => reset({ index: 0, routes: [{ name: 'two' }] })}
      >
        <Text>Reset navigation</Text>
      </TouchableOpacity>
    </View>
  );
};
```

stack을 비우고 돌아가게 만들 페이지를 name으로 지정합니다. 화면을 보면 뒤로가기가 없어집니다.

index는 담을 뒤로가기입니다. 히스토리를 제한할 수 있습니다.

```js
const Three = ({ navigation: { goBack, reset } }) => {
  return (
    <View>
      <TouchableOpacity onPress={() => goBack('three')}>
        <Text>Three</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          reset({ index: 1, routes: [{ name: 'one' }, { name: 'two' }] })
        }
      >
        <Text>Reset navigation</Text>
      </TouchableOpacity>
    </View>
  );
};
```

돌아가는 화면은 two이지만 히스토리로 one을 보관하게 만들 수 있습니다. one이 기준이고 그 위해 배열 순서대로 stack으로 쌓는 구조입니다.

index는 reset하면 배열에서 지정할 초기화 기준입니다.

setOption입니다.

```js
const Two = ({ navigation: { navigate, setOptions } }) => {
  return (
    <View>
      <TouchableOpacity onPress={() => navigate('three')}>
        <Text>Two</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setOptions({ title: '변경된 제목!' })}>
        <Text>Set Options</Text>
      </TouchableOpacity>
    </View>
  );
};
```

setOption을 설정하면 Header의 제목을 제어할 수 있습니다. 백버튼 문구 제어도 가능합니다.

네이티브 스택 커스터마이징 방법입니다.

```js
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="three">
        <Stack.Screen name="one" component={One} />
        <Stack.Screen name="two" component={Two} />
        <Stack.Screen name="three" component={Three} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

홈 화면을 지정할 수 있습니다.

```js
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: 'springgreen',
          headerShown: true,
          headerBackTitle: '점심시간',
        }}
      >
        <Stack.Screen name="one" component={One} />
        <Stack.Screen name="two" component={Two} />
        <Stack.Screen name="three" component={Three} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

이런식으로 네이티브 컴포넌트를 제어하고 커스터마이즈할 수 있습니다.

presentation은 사용을 절제하도록 합니다. 심미적이지 못합니다.

```js
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: 'springgreen',
          headerShown: true,
          headerBackTitle: '점심시간',
        }}
      >
        <Stack.Screen name="one" component={One} />
        <Stack.Screen name="two" component={Two} />
        <Stack.Screen
          options={{
            headerTintColor: 'red',
          }}
          name="three"
          component={Three}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

이렇게 해주면 해당하는 화면에서만 적용할 option을 제어할 수 있습니다.

## 4 BottomTab Navigator

https://reactnavigation.org/docs/bottom-tab-navigator

```sh
npm install @react-navigation/bottom-tabs
```

패키지 추가합니다.

폴더링 전략입니다.

```txt
navigation/
  Stacks.jsx
App.js
```

네비게이팅 컴포넌트를 분리합니다.

```js
// Stacks.jsx
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, TouchableOpacity, View } from 'react-native';

const Stack = createNativeStackNavigator();

const One = ({ navigation: { navigate } }) => {
  return (
    <TouchableOpacity onPress={() => navigate('two')}>
      <Text>One</Text>
    </TouchableOpacity>
  );
};
const Two = ({ navigation: { navigate, setOptions } }) => {
  return (
    <View>
      <TouchableOpacity onPress={() => navigate('three')}>
        <Text>Two</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setOptions({ title: '변경된 제목!' })}>
        <Text>Set Options</Text>
      </TouchableOpacity>
    </View>
  );
};

const Three = ({ navigation: { goBack, reset } }) => {
  return (
    <View>
      <TouchableOpacity onPress={() => goBack('three')}>
        <Text>Three</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          reset({
            index: 2,
            routes: [{ name: 'one' }, { name: 'two' }, { name: 'three' }],
          })
        }
      >
        <Text>Reset navigation</Text>
      </TouchableOpacity>
    </View>
  );
};

function Stacks() {
  return (
    <>
      <Stack.Screen name="one" component={One} />
      <Stack.Screen name="two" component={Two} />
      <Stack.Screen
        options={{
          headerTintColor: 'red',
        }}
        name="three"
        component={Three}
      />
    </>
  );
}

export default Stacks;
```

```js
import { NavigationContainer } from '@react-navigation/native';
import Stacks from './navigation/Stacks';

export default function App() {
  return (
    <NavigationContainer>
      <Stacks />
    </NavigationContainer>
  );
}
```

이러개 파일을 분리합니다.

```txt
navigation/
  Stacks.jsx
  BottomTabs.jsx
screen/
  페이지이름.jsx
App.js
```

이런 방식으로 연관성에 따라 폴더를 분류하는 방법이 있습니다.

```js
// App.jsx
import { NavigationContainer } from '@react-navigation/native';
import BottomTabs from './navigation/BottomTabs';

export default function App() {
  return (
    <NavigationContainer>
      <BottomTabs />
    </NavigationContainer>
  );
}
```

```js
// Movies.jsx
import { Text, View } from 'react-native';

const Movies = () => {
  return (
    <View>
      <Text>Movies</Text>
    </View>
  );
};

export default Movies;
```

```js
// My.jsx
import { Text, View } from 'react-native';

const My = () => {
  return (
    <View>
      <Text>My</Text>
    </View>
  );
};

export default My;
```

```js
// BottomTabs.jsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Movies from '../Screen/Movies';
import My from '../Screen/My';

const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="movies" component={Movies} />
      <Tab.Screen name="my" component={My} />
    </Tab.Navigator>
  );
}

export default BottomTabs;
```

BNB 컴포넌트가 생성되어 화면 변경이 가능하다는 것을 알 수 있습니다.

Header 부분은 컴포넌트 이름을 따라가게 됩니다.

커스터마이징은 공식 문서에 자주 사용하는 것부터 보겠습니다.

```js
function BottomTabs() {
  return (
    <Tab.Navigator initialRouteName="my">
      <Tab.Screen name="movies" component={Movies} />
      <Tab.Screen name="my" component={My} />
    </Tab.Navigator>
  );
}
```

my 페이지를 초기값을 지정할 수 있습니다.

```js
function BottomTabs() {
  return (
    <Tab.Navigator screenOptions={{ title: 'ㅇㅇ' }}>
      <Tab.Screen name="movies" component={Movies} />
      <Tab.Screen name="my" component={My} />
    </Tab.Navigator>
  );
}
```

공통 제목을 넣는 방법입니다.

```js
function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={
        {
          // title: "ㅇㅇ"
        }
      }
    >
      <Tab.Screen
        options={{ title: '영화보기' }}
        name="movies"
        component={Movies}
      />
      <Tab.Screen name="my" component={My} />
    </Tab.Navigator>
  );
}
```

페이지 별로 제목을 넣는 방법입니다.

```js
function BottomTabs() {
  return (
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: 'blue' }}
      screenOptions={
        {
          // title: "ㅇㅇ"
        }
      }
    >
      <Tab.Screen
        options={{ title: '영화보기' }}
        name="movies"
        component={Movies}
      />
      <Tab.Screen name="my" component={My} />
    </Tab.Navigator>
  );
}
```

하위 라우트 주소 모두에 스타일을 한번에 먹일 수 있습니다.

tabBarLabelPosition는 Tabs를 하단 우측 지정할 수 있습니다.

tabBarLabel은 각각의 tab 문구를 지정해줄 수 있습니다.

```js
function BottomTabs() {
  return (
    <Tab.Navigator sceneContainerStyle={{ backgroundColor: 'blue' }}>
      <Tab.Screen
        options={{
          tabBarLabel: '????',
        }}
      />
      <Tab.Screen name="my" component={My} />
    </Tab.Navigator>
  );
}
```

```js
import { AntDesign } from '@expo/vector-icons';
// ...
function BottomTabs() {
  return (
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: 'blue' }}
      screenOptions={
        {
          // title: "ㅇㅇ"
        }
      }
    >
      <Tab.Screen
        options={{
          tabBarLabel: '????',
          title: '영화보기',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="back" size={size} color={color} />
          ),
        }}
        name="movies"
        component={Movies}
      />
      <Tab.Screen name="my" component={My} />
    </Tab.Navigator>
  );
}
```

tabs의 아이콘을 이렇게 제어할 수 있습니다.

알림기능처럼 뱃지 컴포넌트로 피드백을 줘야 할 때는 아래처럼 옵션을 제어하면 됩니다.

```js
<Tab.Screen
  options={{
    tabBarLabel: '????',
    title: '영화보기',
    tabBarBadge: 5, // 여기입니다.
    tabBarIcon: ({ color, size }) => (
      <AntDesign name="back" size={size} color={color} />
    ),
  }}
  name="movies"
  component={Movies}
/>
```

숫자도 가능하고 문자열도 넣을 수 있습니다.

정렬은 안드로이드와 IOS 각각 다릅니다. 그래서 명시하는 것이 좋습니다.

```js
<Tab.Navigator
  sceneContainerStyle={{ backgroundColor: 'blue' }}
  screenOptions={{
    headerTitleAlign: 'center',
  }}
>
  {/* ... */}
</Tab.Navigator>
```

이런 패턴으로 명시하고 안드로이드와 IOS Header를 모두 통일시켜줍니다.

많은 부분이 커스터마이징이 가능하기 때문에 이번 시간에 조금익숙해지고 필요한 것을 그때그때 찾아보도록 합시다.

## 5 combine navigators

네비게이션을 통합하는 방법입니다. 서로 다른 스크린을 서로 이동시키는 방법입니다. 그리고 파라미터를 넘겨주는 법도 배웁니다.

폴더링입니다.

```txt
navigation/
  Root.jsx
  BottomTabs.jsx
  Stacks.jsx
Screen
  Movies.jsx
  My.jsx
```

```js
// navigation/Root
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Stacks from './Stacks';
import BottomTabs from './BottomTabs';

const Stack = createNativeStackNavigator();

const Root = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tabs" component={BottomTabs} />
      <Stack.Screen name="Stacks" component={Stacks} />
    </Stack.Navigator>
  );
};

export default Root;
```

```js
// App.js
import { NavigationContainer } from '@react-navigation/native';
import Root from './navigation/Root';

export default function App() {
  return (
    <NavigationContainer>
      <Root />
    </NavigationContainer>
  );
}
```

이런 패턴으로 정리하면 더 깔끔해집니다. 하지만 지금은 Header가 2개가 됩니다. 결합 용도는 의도할 수 있지만 감추는 방법이 있습니다.

```js
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Stacks from './Stacks';
import BottomTabs from './BottomTabs';

const Stack = createNativeStackNavigator();

const Root = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={BottomTabs} />
      <Stack.Screen name="Stacks" component={Stacks} />
    </Stack.Navigator>
  );
};

export default Root;
```

`screenOptions={{ headerShown: false }}`으로 설정해서 1개의 header만 보이도록 할 수 있습니다.

```js
import { Text, TouchableOpacity, View } from 'react-native';

const Movies = ({ navigation: { navigate } }) => {
  return (
    <View>
      <Text>Movies</Text>
      <TouchableOpacity onPress={() => navigate('Stacks', { screen: 'one' })}>
        <Text>Go to One Screen</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Movies;
```

다른 컴포넌트로 이동할 때는 `navigate("네비게이션 이름", {screen: "screen이름"})` 패턴으로 작성해주면 됩니다. Root의 `name="Stacks"`속성으로 네비게이션을 선택하고 선택한 네비게이션의 `Screen`을 선택하는 로직입니다.

```js
const Movies = ({ navigation: { navigate } }) => {
  return (
    <View>
      <Text>Movies</Text>
      <TouchableOpacity
        onPress={() =>
          navigate('Stacks', { screen: 'one', params: { id: 789 } })
        }
      >
        <Text>Go to One Screen</Text>
      </TouchableOpacity>
    </View>
  );
};
```

props로 데이터를 전달하고

```js
const One = ({ route: { params }, navigation: { navigate } }) => {
  console.log('params', params); // params { id: 789 }
  return (
    <TouchableOpacity onPress={() => navigate('two')}>
      <Text>One</Text>
      <Text>One</Text>
      <Text>One</Text>
    </TouchableOpacity>
  );
};
```

다른 페이지 컴포넌트에 데이터를 넘겨받습니다.

이런 방식으로 통합 운용할 수 있습니다.

```js
// navigate : 지정한 스크린를 현재 스크린 앞으로 가져오기
navigation.navigate('screenName', { paramName: 'paramValue' });

// goBack : 뒤로가기
navigation.goBack();

// reset : 지정한 대로 navigation state 초기화
navigation.reset({
  index: 1,
  routes: [
    {
      name: 'Detail',
      params: { movieId: review.movieId },
    },
    {
      name: 'Review',
      params: { review: { ...review, ...editingObj }, from },
    },
  ],
});

// setOptions: navigator의 title이나 버튼 등을 변경할 수 있음
navigation.setOptions({
  title: '변경된 제목!',
  headerBackTitle: '백버튼제목',
});
```

네비게이션 props는 잘 외도록 합니다.

https://reactnavigation.org/docs/navigation-prop/

리액트로 웹페이지 이동과 리액트 네이티브 페이지동은 당연히 드릅니다. 플랫폼이 드립니다.

```js
// react-router-dom (React 웹개발 시)
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
	const navigate = useNavigate();
	const goToAnother = () => {
		navigate("/another");
	}
	return (
		<Link to="/another">페이지 이동방법1</Link>
		<button onClick={goToAnother}>페이지 이동방법2</button>
	)
}


// react-navigation (React Native 앱개발 시)
import { Button } from 'react-native';
import { Link } from "@react-navigation/native";

const Home = ({ navigation: { navigate } }) => {
	const goToAnother = () => {
		navigate("another", { paramName: "paramValue" } )
	}
	return (
		<Link to={{ screen: "another", params: { paramName: "paramValue" } }}>페이지 이동방법1</Link>
		<Button onPress={goToAnother}>페이지 이동방법2</button>
	)
}
```

단위가 페이지가 아니라 스크린입니다.

## 6 useFocusEffect

```js
useEffect(() => {
  // 한번만 실행
  return () => {
    // 언마운트 시 실행
  };
}, []); // dependency array가 빈배열이면 컴포넌트 마운트 후 한번만 실행
```

리액트 네이티브는 동작 방식이 다릅니다. 웹에서는 보이는 마운트, state, props가 업데이트 되었을 때의 랜더링 그리고 언마운트 등의 로직입니다.

```js
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

useFocusEffect(
  useCallBack(() => {
    // 컴포넌트가 현재 화면에 있으면 실행: Focus
    return () => {
      // 컴포넌트가 현재 화면에서 벗어나면 실행: Blur
    };
  }, [])
);
```

라이프 사이클 hook에 해당하는 useEffect 로직들을 리액트 네비게이트를 통해서 구현합니다.

https://reactnavigation.org/docs/use-focus-effect/

사용하는 용어가 Focus, Blur입니다.

하지만 특이한 점은 `useCallback` hook도 같이 사용해야 합니다.

네비게이션 stack을 초기화(`reset`)하는 것으로 언마운트를 합니다.

```js
import { Text, TouchableOpacity, View } from 'react-native';
import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

const Movies = ({ navigation: { navigate } }) => {
  useFocusEffect(
    useCallback(() => {
      console.log('Focus');
      return () => {
        console.log('Blur');
      };
    }, [])
  );
  return (
    <View>
      <Text>Movies</Text>
      <TouchableOpacity
        onPress={() =>
          navigate('Stacks', { screen: 'one', params: { id: 789 } })
        }
      >
        <Text>Go to One Screen</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Movies;
```

라이프 사이클 hook 비슷한 로직을 구현합니다.

```js
// My.js
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function My({ navigation: { reset, navigate } }) {
  return (
    <View>
      <Text>My</Text>
      <TouchableOpacity
        onPress={() =>
          reset({
            // 초기화를 시켜서 언마운트가 동작하게 만듭니다.
            index: 0,
            routes: [
              {
                name: 'Stacks',
                params: {
                  screen: 'two',
                },
              },
            ],
          })
        }
      >
        <Text>Try unmounting</Text>
      </TouchableOpacity>
    </View>
  );
}
```

이렇게 해줘야 하는 이유는 실행환경 문제입니다. 브라우저는 언마운트를 알지만 모바일은 모릅니다.

그래서 비슷한 효과를 강제로 만들어내는 것입니다.

## 7 Dark Mode

리액트 네이티브 다크모드 컨트롤하는 패턴입니다.

https://docs.expo.dev/guides/color-schemes/

다크모드를 구현하기 위해서는 `app.json`에서 설정해야 합니다.

```json
{
  "expo": {
    "userInterfaceStyle": "automatic"
  }
}
```

userInterfaceStyle는 automatic으로 설정합니다.

```js
// app.js
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import Root from './navigation/Root';

export default function App() {
  const isDark = useColorScheme() === 'dark';
  console.log(isDark);
  return (
    <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
      <Root />
    </NavigationContainer>
  );
}
```

이렇게 기기의 상태를 접근하고 모드를 지정할 수 있습니다.

`cmd` + `shift` + `a`: 에뮬레이터 라이트모드 다크모드 전환

바로 동작하지 않으면 서버 혹은 에뮬레이터를 껐다가 다시 켜줍니다.

```js
// colors.js
const YELLOW_COLOR = '#fdcb6e';
const GREEN_COLOR = '#00b894';
const DARK_COLOR = '#2d3436';

export { YELLOW_COLOR, GREEN_COLOR, DARK_COLOR };
```

상수로 지정해놓을 파일을 이렇게 둡니다.

```js
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Movies from '../Screen/Movies';
import My from '../Screen/My';
import { AntDesign } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import { DARK_COLOR } from '../colors';

const Tab = createBottomTabNavigator();

function BottomTabs() {
  const isDark = useColorScheme() === 'dark';
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: DARK_COLOR,
        headerStyle: {
          backgroundColor: DARK_COLOR,
        },
        tabBarStyle: {
          backgroundColor: DARK_COLOR,
        },
      }}
      screenOptions={{
        // title: "ㅇㅇ"
        headerTitleAlign: 'center',
      }}
    >
      <Tab.Screen
        options={{
          tabBarLabel: '????',
          title: '영화보기',
          tabBarBadge: 5,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="back" size={size} color={color} />
          ),
        }}
        name="movies"
        component={Movies}
      />
      <Tab.Screen name="my" component={My} />
    </Tab.Navigator>
  );
}

export default BottomTabs;
```

이런식으로 컬러를 지정할 수 있습니다.

그리고 이렇게 지정한 컬러는 알아서 삼항연산자로 처리하면 됩니다.

리액트 네이티브에서 사용하는 스타일드 컴포넌트가 있습니다.

https://emotion.sh/docs/@emotion/native

```sh
npm install @emotion/react @emotion/native
```

emotion은 ThemProvider로 제어할 수 있습니다. props.theme으로 태마를 접근할 수 있습니다.

```js
import { Text, TouchableOpacity, View } from 'react-native';
import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import styled from '@emotion/native';

const SectionTitle = styled.Text`
  font-size: 32px;
  color: ${(props) => props.theme.title};
`;

const Movies = ({ navigation: { navigate } }) => {
  useFocusEffect(
    useCallback(() => {
      console.log('Focus');
      return () => {
        console.log('Blur');
      };
    }, [])
  );
  return (
    <View>
      <SectionTitle>Movies</SectionTitle>
      <TouchableOpacity
        onPress={() =>
          navigate('Stacks', { screen: 'one', params: { id: 789 } })
        }
      >
        <Text>Go to One Screen</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Movies;
```

```js
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import Root from './navigation/Root';
import { ThemeProvider } from '@emotion/react';
import { darkTheme, lightTheme } from './theme';

export default function App() {
  const isDark = useColorScheme() === 'dark';
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
        <Root />
      </NavigationContainer>
    </ThemeProvider>
  );
}
```

자식 컴포넌트에서 부모 컴포넌트 theme에 대한 데이터를 접근할 수 있습니다.

패턴은 2가지가 존재합니다. NavigationContainer를 통할지 emotion을 사용할 수 있습니다. 디바이스의 모드를 접근만 가능하면 그외 다양한패턴들이 있습니다.

emotion을 통해 스타일링을 자주 제어하는 경우가 없으면 네비게이터만으로 해결해도 충분합닏.

## TIL.23.01.04. - 리액트 네이티브 2

## 8 1 UI Homework

https://docs.expo.dev/versions/latest/sdk/linear-gradient/

LinearGradient를 컴포넌트로 활용해서 구현할 수 있습니다.

```sh
npx expo install expo-linear-gradient
```

설치를 먼저 진행해줍니다.

colors는 배열을 인자로 받습니다.

```js
import { LinearGradient } from 'expo-linear-gradient';

const Movies = () => {
  return (
    <ScrollView style={style.page}>
      <Image
        style={style.img}
        source={require(`../assets/Interview-with-Senior-JS-Developer.jpeg`)}
      />
      <Text>Movies</Text>
      <LinearGradient
        style={style.linearGradient}
        colors={['transparent', 'black']}
      />
    </ScrollView>
  );
};
```

이렇게 그레이디언트 컬러를 넣을 수 있습니다.

https://reactnative.dev/docs/stylesheet

absoluteFill은 내장 기능입니다.

...StyleSheet.absoluteFill,

position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 과 동일합니다.

리액트 네이티브 스와이퍼 라이브러리도 존재합니다.

https://github.com/leecade/react-native-swiper

```sh
npm i --save react-native-swiper@next
```

```js
const Movies = () => {
  return (
    <ScrollView>
      <Swiper showsPagination={false} autoplay loop>
        <Image
          style={style.img}
          source={require(`../assets/Interview-with-Senior-JS-Developer.jpeg`)}
        />
        <Image
          style={style.img}
          source={require(`../assets/Interview-with-Senior-JS-Developer.jpeg`)}
        />
        <Image
          style={style.img}
          source={require(`../assets/Interview-with-Senior-JS-Developer.jpeg`)}
        />
      </Swiper>
      <Text>Movies</Text>
      <LinearGradient
        style={style.linearGradient}
        colors={['transparent', 'black']}
      />
    </ScrollView>
  );
};
```

이런 식으로 페이지네이션, 자동 넘김 등을 구현할 수 있습니다.

리액트 네이티브를 개발할 때 자주 사용하는 패턴 중 하나는 화면사이즈에 반응하게 만드는 것입니다. 디바이스의 가로와 세로 값을 구하는 패턴입니다.

```js
import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export { SCREEN_HEIGHT, SCREEN_WIDTH };
```

현재 화면을 기준으로 참고할 때 많이 사용하는 패턴입니다.

## 9 NowPlayings

영화 데이터를 호출하는 법입니다.

이번에는 현재 방영 중인 API만 가져옵니다. TMDB입니다.

개인적으로 회원가입이 필요한 서비스입니다.

API 키는 복사하고 개인적으로 보관해야 합니다.

https://developers.themoviedb.org/3/movies/get-now-playing

여기서 데이터를 가져오고 싶습니다.

```js
const BASE_URL = '???';
const API_KEY = '???';
```

다른 폴더에 넣고 import하도록 합니다. git에 올라가지 않도록 합니다.

```js
const getNowPlayings = async () => {
  const { results } = await fetch(
    `${BASE_URL}/now_playing?api_key=${API_KEY}&language=en-US&page=1`
  ).then((res) => res.json());
  console.log(results);
};
useEffect(() => {
  getNowPlayings();
}, []);
```

이런 패턴으로 데이터를 가져올 수 있습니다.

```js
const [nowPlayings, setNowPlayings] = useState([]);
const [isLoading, setIsLoading] = useState(true); // 마운트하고 요청해야 하기 때문에 true
const getNowPlayings = async () => {
  const { results } = await fetch(
    `${BASE_URL}/now_playing?api_key=${API_KEY}&language=en-US&page=1`
  ).then((res) => res.json());
  console.log(results);
  setNowPlayings(results);
  setIsLoading(false); // 통신 종료
};
useEffect(() => {
  getNowPlayings();
}, []);

if (isLoading) {
  return <ActivityIndicator style={style.loading} />;
}
```

이런 방식으로 로딩 로직을 처리할 수 있습니다.

이미지 컴포넌트를 활용하는 법입니다.

```js
// 전체 url https://image.tmdb.org/t/p/w500/6YRQ8l93ZEs6x4rZojWoHIWdguK.jpg
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500/';
```

공개해도 별 문제없습니다.

```js
<Image
  style={style.img}
  source={require(`../assets/Interview-with-Senior-JS-Developer.jpeg`)}
/>
<Image
  style={style.img}
  source={{url:"https://image.tmdb.org/t/p/w500/6YRQ8l93ZEs6x4rZojWoHIWdguK.jpg"}}
/>
```

파일고 갖고있는 이미지는 require를 넣습니다.

웹에 있는 이미지는 객체 속에 url로 넣습니다.

사용해볼 수 있는 패턴입니다.

```js
// util.js
import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const getImgPath = (path) => {
  return `https://image.tmdb.org/t/p/w500${path}`;
};

export { SCREEN_HEIGHT, SCREEN_WIDTH, getImgPath };
```

```js
<Image
  style={style.img}
  source={{ url: getImgPath('/6YRQ8l93ZEs6x4rZojWoHIWdguK.jpg') }}
/>
```

개별 이미지이지만 순회할 때의 프로퍼티로 동적으로 참조하게 만들면 더욱더 간략해질 것입니다.

## 10 RefreshControl

통신이 완료되었을 때 isLoading 상태를 만들 것입니다. 또 새로고침 기능도 추가할 것입니다.

Promise.all()은 모든 promise가 끝나야 처리하게 만들 수 있습니다.

```js
const getNowPlaying = async () => {
  const { results } = await fetch(
    `${BASE_URL}/now_playing?api_key=${API_KEY}&language=en-US&page=1`
  ).then((res) => res.json());
  setNowPlayings(results);
};
const getTopRated = async () => {
  const { results } = await fetch(
    `${BASE_URL}/top_rated?api_key=${API_KEY}&language=en-US&page=1`
  ).then((res) => res.json());

  setTopRateds(results);
};
const getUpcoming = async () => {
  const { results } = await fetch(
    `${BASE_URL}/upcoming?api_key=${API_KEY}&language=en-US&page=1`
  ).then((res) => res.json());
  setUpcomings(results);
};

const getData = async () => {
  await Promise.all([getNowPlaying(), getTopRated(), getUpcoming()]);
  setIsLoading(false);
};

useEffect(() => {
  getData();
}, []);
```

fetch 로직들을 모두 담는 전략입니다. 모든 로직을 getData에 결합하는 것입니다.

https://reactnative.dev/docs/refreshcontrol#onrefresh

```js
import { RefreshControl } from 'react-native';

const [isRefreshing, setIsRefreshing ] = useState(false)

const onRefresh = async () => {
  setIsRefreshing(true)
  await getData()
  console.log("reload")
  setIsRefreshing(false)

}

<ScrollView refreshControl={
  <RefreshControl
    refreshing={isRefreshing}
    onRefresh={onRefresh}
  />
}>
```

새로고침 기능은 상당히 단순하게 넣을 수 있습니다. 처음에는 false를 두고 통신이 동안에는 true로 설정하고 통신이 끝나면 다시 false로 변형합니다. 앱이 블로킹 동작으로 발생하기 때문에 이렇게 설정합다. 블로킹 문제를 해결하기 위해 비동기함수로 처리합니다.

## 11 FlatList

FlatList컴포넌트를 활용합니다. ScrollView 대신 FlatList를 사용하는 이유입니다. ScrollView는 모든 자식컴포넌트를 한번에 랜더링해야 합니다. FlatList는 화면에 보이는 것만 랜더링합니다. 그래서 성능이 좋습니다. 그래서 목록이 많으면 FlatList를 사용할 수 밖에 없습니다. 무한 스크롤 구현에 적합합니다.

레이지 렌더링입니다. 레이지 로딩의 렌더링 버전 맞습니다. 화면에 안 보이면 지우기까지 합니다.

FlatList는 홀태그입니다. render item으로 map을 순회할 방식을 보여줘야 합니다.

```js
<FlatList
  ItemSeparatorComponent={
    Platform.OS !== 'android' &&
    (({ highlighted }) => (
      <View style={[style.separator, highlighted && { marginLeft: 0 }]} />
    ))
  }
  data={[{ title: 'Title Text', key: 'item1' }]}
  renderItem={({ item, index, separators }) => (
    <TouchableHighlight
      key={item.key}
      onPress={() => this._onPress(item)}
      onShowUnderlay={separators.highlight}
      onHideUnderlay={separators.unhighlight}
    >
      <View style={{ backgroundColor: 'white' }}>
        <Text>{item.title}</Text>
      </View>
    </TouchableHighlight>
  )}
/>
```

공식 홈페이지가 제공하는 예십니다. 참고로 map을 순회할 때 key를 제공해야 하는 것은 동일합니다.

```js
import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);

const App = () => {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default App;
```

keyExtractor에 id를 넣습니다. 콜백함수 자체가 순회한다고 가정합니다.

스타일링 부분 이외 패턴을 외우면 됩니다.

`showsHorizontalScrollIndicator={false}`로 지정해서 가로 스크롤바를 제거할 수 있습니다.

`ItemSeparatorComponent={<View style={{ width: 10 }} />}`처럼 스타일 또 제어할 수 있습니다.

```js
<FlatList
  refreshing={isRefreshing}
  onRefresh={onRefresh}
  ListHeaderComponent={
    <>
      <Swiper height="100%" showsPagination={false} autoplay loop>
        {nowPlayings.map((movie) => (
          <Slide key={movie.id} movie={movie} />
        ))}
      </Swiper>
      <ListTitle>Top Rated Movies</ListTitle>
      <FlatList
        horizontal
        contentContainerStyle={{ paddingHorizontal: 20 }}
        showsHorizontalScrollIndicator={false}
        data={topRateds}
        renderItem={({ item }) => <VCard movie={item} />}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={<View style={{ width: 10 }} />}
      />
      <ListTitle>Upcoming Movies</ListTitle>
    </>
  }
  data={upcomings}
  renderItem={({ item }) => <HCard movie={item} />}
  keyExtractor={(item) => item.id}
  ItemSeparatorComponent={<View style={{ height: 15 }} />}
/>
```

`ListHeaderComponent`는 목록의 제목 성격을 갖는 컴포넌트로 지정할 수 있습니다. `ListHeaderComponent`도 더보기 버튼처럼 사용할 수 있게 존재합니다.

놀랍게도 `onRefresh`가 기본적으로 내장되어 있습니다.

## 12 Detail

상세 페이지 전환입니다.

섹션별로 동적으로 페이지를 이동해야 합니다.

상세 페이지는 Stack에 속합니다.

`headerLeft` 속성값으로 백버튼을 제공하는 것이 더 좋을 것 입니다.

https://github.com/rjc1704/RN-movie-lecture-practical/blob/Detail/navigation/Stacks.js

```js
<Stack.Navigator
      screenOptions={{
        headerTitleAlign: "left",
        headerTintColor: isDark ? YELLOW_COLOR : GREEN_COLOR,
        headerLeft: () => (
          <TouchableOpacity onPress={() => goBack()}>
            <Text style={{ color: YELLOW_COLOR }}>뒤로</Text>
          </TouchableOpacity>
        ),
      }}
    >
```

이렇게 작성하면 백버튼을 구현할 수 있습니다.

https://github.com/rjc1704/RN-movie-lecture-practical/blob/Detail/screen/Detail.js

```js
const getDetail = async () => {
  const response = await fetch(
    `${BASE_URL}/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=videos`
  ).then((res) => res.json());

  setData(response);
  setIsLoading(false);
};
```

서버에서 특정 id를 선택하고 선택한 id의 데이터를 접근하는 로직입니다.

Linking API는 리액트 네이티브에서 기본적으로 제공하는 API 중 하나로 웹 링크로 보내줍니다.

```js
import {
  ActivityIndicator,
  Linking,
  StyleSheet,
  useColorScheme,
} from 'react-native';

const openYoutube = async (key) => {
  const url = `https://www.youtube.com/watch?v=${key}`;
  await Linking.openURL(url);
};
```

이런 방식으로 사용하면 됩니다. 문서가 복잡합니다.

https://reactnative.dev/docs/linking

먼저 로직은 youtube가 앱으로 설치되어 있으면 앱을 먼저 보여줍니다. 앱이 없으면 브라우저 링크로 보냅니다.

내일은 내가 작성한 댓글만 모아보고 댓글을 더보기를 만드는 법을 배웁니다.

## TIL.23.01.06. - 프로젝트 착수

# prettier.config.js

```js
// prettier.config.js or .prettierrc.js
module.exports = {
  trailingComma: 'es5',
  tabWidth: 2,
  semi: false,
  singleQuote: true,
};
```

이런게 있었습니다.

## 리액트 네이티브 폰트 불러오기

엑스포 스플래시, 폰트를 설치해야 전용 서체를 설치할 수 있습니다. 의도적으로 스플레시 시간을 늘릴것입니다. 그래서 가져와서 반영하기 위한 동작입니다.

폰트가져오는 패턴입니다.

```js
import { loadAsync } from 'expo-font';

// 스플레시 스크린은 일부러 늦게 없엤습니다.
SplashScreen.preventAutoHideAsync();

const [appIsReady, setAppIsReady] = useState(false);

useEffect(() => {
  const prepare = async () => {
    // 폰트 불러오기는 여기서 하면 됩니다.
    // loadAsync
    await loadAsync({
      폰트이름: require('../asset에 있는 폰트'),
    });
    setAppIsReady(true);
  };
  prepare();
}, []);

const onLayoutRootView = useCallBack(async () => {
  if (appIsReady) {
    await SplashScreen.hideAsync();
  }
}, [appIsReady]);

useEffect(() => {
  onLayoutRootView();
}, []);

if (!appIsReady) return null;
```

이런 패턴입니다.

## NVM 18.13.0

```sh
nvm install --lts
```

안정 버전 설치입니다.

```sh
nvm list
```

설치 목록을 확인합니다.

```sh
node -v
```

현재 버전을 확입니다. 아마 최근에 안정 버전으로 지정되어 있을 것입니다.

```sh
nvm alias default node
```

이제 중간에 안 바뀌게 고정시킵니다.

nvm 설치는 알아서 하십시오.
