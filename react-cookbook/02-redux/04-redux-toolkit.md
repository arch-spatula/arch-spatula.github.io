# Redux Toolkit

!youtube[bbkBuqC1rU4]

[Redux Toolkit Tutorial – JavaScript State Management Library](https://www.youtube.com/watch?v=bbkBuqC1rU4)

리덕스 툴킷은 베터리 포함 프레임워크입니다. 리덕스의 유용한 패키지를 포함합니다. 보일러 플레이트 셋업이 덜합니다.

store, slice, 비동기 thunk, 액션 생성자 등을 다룹니다.

[레포](https://github.com/john-smilga/redux-toolkit-tutorial)

CRA를 먼저 설치하고 `@reduxjs/toolkit`, `react-redux`, `axios`을 각각 추가하는 방식으로 설치합니다.

```sh
yarn create react-app
```

```sh
yarn add @reduxjs/toolkit react-redux axios
```

리덕스 툴킷을 설치하면 함께 설치되는 것들이 있습니다.

- redux (core library, state management)
- immer (allows to mutate state)
- redux-thunk (handles async actions)
- reselect (simplifies reducer functions)

지금 몰라도 괜찮습니다. 나중에 이해하게 됩니다.

- redux devtools
- combine reducers

위 2가지는 RTK를 설치하면서 생기는 혜택입니다.

리덕스는 다양한 프론트엔드 프레임워크를 사용할 수 있습니다. 하지만 리액트랑 사용하려면 `react-redux`를 설치해야 합니다.

Store까지 설정하는게 설치의 범위입니다. Store는 글로벌 state를 관리하는 곳입니다.

```js
// store.js
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {},
});
```

configureStore에는 객체를 대입합니다. 대입하는 객체의 reducer에 설정합니다.

```js
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import store and provider
import { store } from './store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

`store`를 보면 src에서 접근하는 것을 알 수 있습니다.

slice는 작명이 이상합니다. 일반 리덕스는 기능단위로 설정합니다. RTK도 똑같이 파일링을 합니다. 기능명slice로 작명하는 경우가 많을 것입니다.

- application feature
- create features folder/cart
- create cartSlice.js

```js
// features/cart/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
});

console.log(cartSlice);

// 이름이 가변적이에 reducer 메서드만 유출합니다.
export default cartSlice.reducer;
```

이렇게 slice를 만듭니다. 그리고 store에 연결해주면 됩니다.

```js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice'; // 가변적인 이름으로 reducer만 가져왔습니다.

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
```

이전에 reducer의 값은 비어있는 객체였습니다. 이제는 reducer메서드를 갖은 객체가 되었습니다.

액션을 디스패치할 때마다 devtool에서 관찰하기 쉬워집니다.

useSelector는 store의 모든 state를 접근할 수 있습니다.

```js
import { CartIcon } from '../icons';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const { amount } = useSelector((state) => state.cart);
  return (
    <nav>
      <div className="nav-center">
        <h3>redux toolkit</h3>
        <div className="nav-container">
          <CartIcon />
          <div className="amount-container">
            <p className="total-amount">{amount}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
```

`useSelector` hook을 사용하고 `store`의 `reducer` 객체의 key로 접근합니다. store는 모든 글로벌 state를 접근할 수 있습니다. 하지만 key로 구체적인 slice만 결정하는 것입니다.

```js
export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
```

```js
import { useSelector } from 'react-redux';
import CartItem from './CartItem';

const CartContainer = () => {
  const { amount, total, cartItems } = useSelector((state) => state.cart);
  // 비어있는 경우
  if (amount < 1) {
    return (
      <section className="cart">
        <h2>your bag</h2>
        <h4 className="empty-cart">is currently empty</h4>
      </section>
    );
  }
  //
  return (
    <section className="cart">
      <header>
        <h2>your bag</h2>
      </header>
      <div>
        {cartItems.map((item) => {
          return <CartItem key={item.id} {...item} />;
        })}
      </div>
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total <span>${total}</span>
          </h4>
          <button className="btn clear-btn">clear cart</button>
        </div>
      </footer>
    </section>
  );
};

export default CartContainer;
```

Immer 라이브러리는 state 뮤테이션을 할 수 있습니다.

```js
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  // 아래는 앞으로 리듀서를 작성하는 패턴
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { clearCart } = cartSlice.actions;
```

액션 creator 함수도 필요없어집니다.

```js
// 더이상 필요없는 패턴
const ACTION_TYPE = 'ACTION_TYPE';

const actionCreator = (payload) => {
  return { type: ACTION_TYPE, payload: payload };
};
```

```js
import { createSlice } from '@reduxjs/toolkit';
import cartItems from '../../cartItems';

const initialState = {
  cartItems: cartItems,
  amount: 1,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

// 사용할 리듀서만 유출합니다.
export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;
```

```js
import { useSelector, useDispatch } from 'react-redux';
import CartItem from './CartItem';
import { clearCart } from '../features/cart/cartSlice';

const CartContainer = () => {
  const { amount, total, cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  // 비어있는 경우
  if (amount < 1) {
    return (
      <section className="cart">
        <h2>your bag</h2>
        <h4 className="empty-cart">is currently empty</h4>
      </section>
    );
  }
  //
  return (
    <section className="cart">
      <header>
        <h2>your bag</h2>
      </header>
      <div>
        {cartItems.map((item) => {
          return <CartItem key={item.id} {...item} />;
        })}
      </div>
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total <span>${total}</span>
          </h4>
          <button
            className="btn clear-btn"
            // dispatch에는 리듀서함수를 불러와 대입합니다.
            onClick={() => dispatch(clearCart())}
          >
            clear cart
          </button>
        </div>
      </footer>
    </section>
  );
};

export default CartContainer;
```

```js
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, actions) => {},
  },
});
```

payload를 전달하는 방법입니다. 기존 리덕스랑 동일하게 action의 프로퍼티로 제공하면 됩니다.

여러개의 리듀서를 아래처럼 담을 수 있습니다.

```js
import { createSlice } from '@reduxjs/toolkit';
import cartItems from '../../cartItems';

const initialState = {
  cartItems: cartItems,
  amount: 1,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, actions) => {
      const itemId = actions.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    // action도 객체이기 때문에 구조분해할당이 가능합니다.
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount + 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount - 1;
    },
  },
});

export const { clearCart, removeItem, increase, decrease } = cartSlice.actions;

export default cartSlice.reducer;
```

어떤 기능의 유효성은 로컬에서 먼저 제어하는 것이 좋습니다.

```js
import { ChevronUp, ChevronDown } from '../icons';
import { useDispatch } from 'react-redux';
import { removeItem, increase, decrease } from '../features/cart/cartSlice';

const CartItem = ({ id, img, title, price, amount }) => {
  const dispatch = useDispatch();
  return (
    <article className="cart-item">
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className="item-price">${price}</h4>
        <button className="remove-btn" onClick={() => dispatch(removeItem(id))}>
          remove
        </button>
      </div>
      <div>
        <button
          className="amount-btn"
          onClick={() => dispatch(increase({ id }))}
        >
          <ChevronUp />
        </button>
        <p className="amount">{amount}</p>
        <button
          className="amount-btn"
          onClick={() => {
            // 1미만의 수량을 보유한다는 것은 논리적으로 불가능합니다.
            if (amount === 1) {
              dispatch(removeItem(id));
              return;
            }
            dispatch(decrease({ id }));
          }}
        >
          <ChevronDown />
        </button>
      </div>
    </article>
  );
};

export default CartItem;
```

```js
import { createSlice } from '@reduxjs/toolkit';
import cartItems from '../../cartItems';

const initialState = {
  cartItems: cartItems,
  amount: 0,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, actions) => {
      const itemId = actions.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount + 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount - 1;
    },
    // 전체를 반영하는 리듀서입니다.
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
});

export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
```

```js
// App.js
import Navbar from './components/Navbar';
import CartContainer from './components/CartContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { calculateTotals } from './features/cart/cartSlice';

function App() {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);
  return (
    <main>
      <Navbar />
      <CartContainer />
    </main>
  );
}
export default App;
```

```js
import { useDispatch } from 'react-redux';
import { closeModal } from '../features/modal/modalSlice';
import { clearCart } from '../features/cart/cartSlice';

const Modal = () => {
  const dispatch = useDispatch();
  return (
    <aside className="modal-container">
      <div className="modal">
        <h4>Remove all items from your shopping cart?</h4>
        <div className="btn-container">
          <button
            type="button"
            className="btn confirm-btn"
            onClick={() => {
              dispatch(clearCart());
              dispatch(closeModal());
            }}
          >
            confirm
          </button>
          <button
            type="button"
            className="btn clear-btn"
            onClick={() => dispatch(closeModal())}
          >
            cancel
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Modal;
```

dispatch는 1개만 사용해야 하는 것은 아닙니다. 하나의 동작에 2가지 이상 dispatch를 해도 됩니다.

```js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
};

const modalState = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalState.actions;

export default modalState.reducer;
```

모달를 VM(view-model)방식으로 제어할 수 있습니다.

https://course-api.com/react-useReducer-cart-project

강의용 API입니다. 그냥사용하면 사용이 불가능합니다. 그래서 redux thunk가 필요합니다.

```js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const url = 'https://course-api.com/react-useReducer-cart-project';

export const getCartItems = createAsyncThunk('cart/getCartItems', () => {
  // 이 콜백함수는 Promise를 반환해야 합니다.
  return fetch(url)
    .then((resp) => resp.json())
    .catch((err) => console.log(error));
});

// 라이프사이클 액션을 활용합니다.
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});
```

```js
import { calculateTotals, getCartItems } from './features/cart/cartSlice';

function App() {
  const { cartItems, isLoading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  if (isLoading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
}

export default App;
```

```js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};

const url = 'https://course-api.com/react-useReducer-cart-project';

const getCartItems = createAsyncThunk('cart/getCartItems', () => {
  return (
    fetch(url)
      // 통신에 성공하면 json()형식으로 저장합니다.
      .then((res) => res.json())
      .catch((err) => console.log(err))
  );
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, actions) => {
      const itemId = actions.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount + 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount - 1;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      //cartItems에 서버데이터를 할당합니다.
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export { getCartItems };

export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
```

redux로 이렇게 비동기 통신이 가능합니다.

```js
import Navbar from './components/Navbar';
import Modal from './components/Modal';
import CartContainer from './components/CartContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { calculateTotals, getCartItems } from './features/cart/cartSlice';

function App() {
  const { cartItems, isLoading } = useSelector((state) => state.cart);
  const { isOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);
  useEffect(() => {
    dispatch(getCartItems());
  }, []);
  if (isLoading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
}
export default App;
```

액션 dispatch로 서버에서 데이터를 가져오는 방식입니다.

fetch의 한계는 404 대응이 안됩니다. 하지만 axios는 대응하기 쉽습니다.

```js
export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async (name, thunkAPI) => {
    try {
      // console.log(name);
      // console.log(thunkAPI);
      // console.log(thunkAPI.getState());
      // thunkAPI.dispatch(openModal());
      const resp = await axios(url);

      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);
```

thunkAPI로 다양한 기능을 만들 수 있습니다. 또 액션함수에 payload를 name으로 가져올 수 있습니다.

thunkAPI는 다른 slice에 있는 액션도 접근할 수 있습니다.
