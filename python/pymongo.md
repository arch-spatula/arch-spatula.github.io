---
sidebar_position: 2
tags: ["certifi", "pymongo", "python"]
---

# pymongo 이런저런 에러

## certifi

```py
from pymongo import MongoClient
import certifi

ca = certifi.where()

client = MongoClient('mongodb+srv://???:???@cluster0.?????.mongodb.net/Cluster0?retryWrites=true&w=majority', tlsCAFile=ca)
db = client.test

doc = {
  'name':'bob',
  'age':27
}

db.users.insert_one(doc)
```

협업하는 사람 중 한명이 윈도우 사용하고 있었습니다. 이 패키지까지 설치하니까 문제가 사라졌습니다.

## ObjectId

```py
from pymongo import MongoClient
from bson.objectid import ObjectId

@app.route("/delete", methods=["DELETE"])
def delete():
    _id = request.form['_id']
    db.col.find_one_and_delete({'_id': ObjectId(_id)})
    return jsonify({'msg': '코멘트가 삭제되었습니다.'})
```

pymongo를 설치하면 기본적으로 bson도 같이 자동 설치됩니다.
