---
sidebar_position: 4
tags: ['python', 'data structure', 'algorithm', 'queue', 'stack', 'linked list']
---

# 파이썬 기초 자료구조와 알고리즘

## DIY

### Array

DIY할게 없습니다.

### Linked List

```py
class Node:
    def __init__(self, data) -> None:
        self.data = data  # 여기는 필요한 자료를 할당할 수 있습니다.
        self.next = None  # 처음에는 연결할 게 없습니다. 여기 속성값이 포인터 역할을 합니다.

class LinkedList:
    def __init__(self, data):
        self.head = Node(data)  # Head 역할을 할 Node를 할당합니다.

    def append(self, data):
        # 예외처리 Head가 없는 경우 append를 하면 Head로 할당해줍니다.
        if self.head is None:
            self.head = Node(data)
            return  # 메서드의 실행을 종료시킵니다.

        # Tail에 접근(선형탐색)
        cur = self.head
        while cur.next is not None:
            cur = cur.next

        # 추가
        cur.next = Node(data)

    def printAll(self):
        if self.head is None:
            print("empty")

        cur = self.head
        while cur is not None:
            print(cur.data)
            cur = cur.next

    # 인덱스 횟수만큼 이동하기 위해 for문을 사용합니다.
    def getNode(self, index):
        cur = self.head
        if index > 0:
            for idx in range(index):
                cur = cur.next
        return cur

    # 인덱스 번째 원소를 추가합니다.
    def addNode(self, index, value):
        newNode = Node(value)
        # head를 교체할 때
        if index == 0:
            newNode.next = self.head
            self.head = newNode
            return  #실행 종료

        prevNode = self.getNode(index - 1)  # [a] -> [b] -> [c] a랑 b사이 d를 추가할 때 b 이전 a를 선택합니다.
        nextNode = prevNode.next            # [b] 노드를 기록합니다.
        prevNode.next = newNode             # [a]의 다음 노드를 [d]를 바라보게 합니다. [a] -> [b] -> none  & [b] -> [c]
        newNode.next = nextNode             # [d]는 [b]를 바라보게 합니다. [a] -> [b] -> [b] -> [c]
        return  #실행 종료

    def deleteNode(self, index):
        # [a]를 삭제할 때
        if index == 0:
            self.head = self.getNode(index+1)
            return  #실행 종료

        # [d]를 삭제할 때
        if self.getNode(index).next == None:
            self.getNode(index-1).next = None
            return  #실행 종료

        # 유스케이스
        # [a] -> [b] -> [c] -> [d] 중에서 [c]를 삭제하기 위해 [b] 선택합니다.
        prevNode = self.getNode(index-1)
        # [a] -> [b] -> [d]로 포인터를 바꿉니다. [c]는 전후관계가 없어집니다. 메모리 누수가 있는지 모르겠습니다.
        prevNode.next = prevNode.next.next
```

### Stack

```py
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class Stack:
    def __init__(self):
        self.head = None

    def push(self, value):
        newStack = Node(value)
        newStack.next = self.head
        self.head = newStack

    # pop 기능 구현
    def pop(self):
        if self.is_empty(): return 'Stack은 비어있습니다.'
        # self.head를 조회합니다.
        stackPop = self.head
        # self.head를 삭제합니다.
        self.head = self.head.next
        return stackPop

    def peek(self):
        return self.head

    def is_empty(self):
        return self.head is None
```

### Queue

```py
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class Queue:
    def __init__(self):
        self.head = None
        self.tail = None

    def enqueue(self, value):
        newNode = Node(value)
        if self.is_empty():
            self.tail = newNode
            self.head = newNode
            return  # 실행종료

        newNode.next = self.tail
        self.tail = newNode

    def dequeue(self):
        if self.is_empty(): return 'empty'
        queuePop = self.head
        self.head = self.head.next
        return queuePop.data

    def peek(self):
        return self.head.data

    def is_empty(self):
        return self.head == None and self.tail == None
```

## Native

### Linked List

`List`자료형 그냥 쓰세요

### Stack

```py
stack = []            # 빈 스택 초기화
stack.append(4)       # 스택 push(4)
stack.append(3)       # 스택 push(3)
top = stack.pop()     # 스택 pop
print(top)            # 3!
```

### Queue

```py
>>> queue = [4, 5, 6]
>>> queue.insert(0, 3)
>>> queue.insert(0, 2)
>>> queue
[2, 3, 4, 5, 6]
>>> queue.pop()
6
>>> queue.pop()
5
>>> queue
[2, 3, 4]
```

관측하기에도 자연스럽습니다.

```py
>>> from queue import Queue
>>>
>>> que = Queue()
>>> que.put(4)
>>> que.put(5)
>>> que.put(6)
>>> que.get()
4
>>> que.get()
5
>>> que.get()
6
```

바퀴를 다시 만들지 맙시다.
