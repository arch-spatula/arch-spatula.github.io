## TIL.23.01.11. - 익스프레스 맛보기

```js
// app.js
const express = require('express');
const app = express();
const port = 3000;

const goodsRouter = require('./routes/goods');

// localhost:3000/api -> goodsRouter
// use함수의 첫번째 인자로 주소 두번째인자로 자원
app.use('/api', goodsRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});
```

```js
// /routes/goods.js
const express = require('express');

const router = express.Router();

const goods = [
  {
    goodsId: 4,
    name: '상품 4',
    thumbnailUrl:
      'https://cdn.pixabay.com/photo/2016/09/07/02/11/frogs-1650657_1280.jpg',
    category: 'drink',
    price: 0.1,
  },
  {
    goodsId: 3,
    name: '상품 3',
    thumbnailUrl:
      'https://cdn.pixabay.com/photo/2016/09/07/02/12/frogs-1650658_1280.jpg',
    category: 'drink',
    price: 2.2,
  },
  {
    goodsId: 2,
    name: '상품 2',
    thumbnailUrl:
      'https://cdn.pixabay.com/photo/2014/08/26/19/19/wine-428316_1280.jpg',
    category: 'drink',
    price: 0.11,
  },
  {
    goodsId: 1,
    name: '상품 1',
    thumbnailUrl:
      'https://cdn.pixabay.com/photo/2016/09/07/19/54/wines-1652455_1280.jpg',
    category: 'drink',
    price: 6.2,
  },
];

//상품 목록 조회 API
router.get('/', (req, res) => {
  res.json({ goods: goods });
});

module.exports = router;
```

이렇게 하면 일단 통신이 성공합니다.
