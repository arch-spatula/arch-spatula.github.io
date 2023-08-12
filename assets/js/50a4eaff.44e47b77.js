"use strict";(self.webpackChunkarch_spatula_github_io=self.webpackChunkarch_spatula_github_io||[]).push([[79667],{3905:(n,e,t)=>{t.d(e,{Zo:()=>i,kt:()=>g});var o=t(67294);function a(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function r(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(n);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,o)}return t}function s(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?r(Object(t),!0).forEach((function(e){a(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}function l(n,e){if(null==n)return{};var t,o,a=function(n,e){if(null==n)return{};var t,o,a={},r=Object.keys(n);for(o=0;o<r.length;o++)t=r[o],e.indexOf(t)>=0||(a[t]=n[t]);return a}(n,e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);for(o=0;o<r.length;o++)t=r[o],e.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(n,t)&&(a[t]=n[t])}return a}var c=o.createContext({}),d=function(n){var e=o.useContext(c),t=e;return n&&(t="function"==typeof n?n(e):s(s({},e),n)),t},i=function(n){var e=d(n.components);return o.createElement(c.Provider,{value:e},n.children)},u="mdxType",p={inlineCode:"code",wrapper:function(n){var e=n.children;return o.createElement(o.Fragment,{},e)}},m=o.forwardRef((function(n,e){var t=n.components,a=n.mdxType,r=n.originalType,c=n.parentName,i=l(n,["components","mdxType","originalType","parentName"]),u=d(t),m=a,g=u["".concat(c,".").concat(m)]||u[m]||p[m]||r;return t?o.createElement(g,s(s({ref:e},i),{},{components:t})):o.createElement(g,s({ref:e},i))}));function g(n,e){var t=arguments,a=e&&e.mdxType;if("string"==typeof n||a){var r=t.length,s=new Array(r);s[0]=m;var l={};for(var c in e)hasOwnProperty.call(e,c)&&(l[c]=e[c]);l.originalType=n,l[u]="string"==typeof n?n:a,s[1]=l;for(var d=2;d<r;d++)s[d]=t[d];return o.createElement.apply(null,s)}return o.createElement.apply(null,t)}m.displayName="MDXCreateElement"},67439:(n,e,t)=>{t.r(e),t.d(e,{assets:()=>c,contentTitle:()=>s,default:()=>p,frontMatter:()=>r,metadata:()=>l,toc:()=>d});var o=t(87462),a=(t(67294),t(3905));const r={title:"fetch\uc5d0\uc11c mongoose\ub85c \uc804\ud658",authors:["arch-spatula"],tags:["mongoDB","mongoose"],description:"\ube60\ub974\uace0 \ub354\ub7fd\uac8c fetch\ub85c \ub9cc\ub4e4\uc5c8\ub358 API\ub97c mongoose\ub85c \ub9ac\ud329\ud1a0\ub9c1\ud558\ub294 \uacfc\uc815\uc744 \ub2e4\ub8f9\ub2c8\ub2e4.",toc_max_heading_level:6},s="fetch\uc5d0\uc11c mongoose\ub85c \uc804\ud658",l={permalink:"/blog/2023/07/20/mongoose",editUrl:"https://github.com/arch-spatula/arch-spatula.github.io/blob/dev/blog/2023-07-20-mongoose.md",source:"@site/blog/2023-07-20-mongoose.md",title:"fetch\uc5d0\uc11c mongoose\ub85c \uc804\ud658",description:"\ube60\ub974\uace0 \ub354\ub7fd\uac8c fetch\ub85c \ub9cc\ub4e4\uc5c8\ub358 API\ub97c mongoose\ub85c \ub9ac\ud329\ud1a0\ub9c1\ud558\ub294 \uacfc\uc815\uc744 \ub2e4\ub8f9\ub2c8\ub2e4.",date:"2023-07-20T00:00:00.000Z",formattedDate:"2023\ub144 7\uc6d4 20\uc77c",tags:[{label:"mongoDB",permalink:"/blog/tags/mongo-db"},{label:"mongoose",permalink:"/blog/tags/mongoose"}],readingTime:15.05,hasTruncateMarker:!0,authors:[{name:"arch-spatula",title:"Cook-Book \ub9ce\uc774 \ub9cc\ub4ed\ub2c8\ub2e4",url:"https://github.com/arch-spatula",imageURL:"https://github.com/arch-spatula.png",key:"arch-spatula"}],frontMatter:{title:"fetch\uc5d0\uc11c mongoose\ub85c \uc804\ud658",authors:["arch-spatula"],tags:["mongoDB","mongoose"],description:"\ube60\ub974\uace0 \ub354\ub7fd\uac8c fetch\ub85c \ub9cc\ub4e4\uc5c8\ub358 API\ub97c mongoose\ub85c \ub9ac\ud329\ud1a0\ub9c1\ud558\ub294 \uacfc\uc815\uc744 \ub2e4\ub8f9\ub2c8\ub2e4.",toc_max_heading_level:6},prevItem:{title:"Super Oak\ub85c \ud14c\uc2a4\ud2b8 \ucf54\ub4dc \uc791\uc131\ud558\uae30",permalink:"/blog/2023/07/22/superoak"},nextItem:{title:"\ub9ac\uc561\ud2b8 \ucf54\ub529 \ucee8\ubca4\uc158",permalink:"/blog/2023/07/19/coding-convention"}},c={authorsImageUrls:[void 0]},d=[{value:"mongoDB fetch \ub9ac\ud329\ud1a0\ub9c1",id:"mongodb-fetch-\ub9ac\ud329\ud1a0\ub9c1",level:2},{value:"mongoose \uc124\uce58",id:"mongoose-\uc124\uce58",level:3},{value:"\uc5f0\uacb0",id:"\uc5f0\uacb0",level:3},{value:"\ucc38\uace0",id:"\ucc38\uace0",level:3},{value:"MongoDB mongoose\ub294 query\ub97c \uc0dd\uc131\uc790\uc758 \uba54\uc11c\ub4dc\ub85c \ud569\ub2c8\ub2e4.",id:"mongodb-mongoose\ub294-query\ub97c-\uc0dd\uc131\uc790\uc758-\uba54\uc11c\ub4dc\ub85c-\ud569\ub2c8\ub2e4",level:2},{value:"mongoDB \uac1c\ub150",id:"mongodb-\uac1c\ub150",level:2},{value:"dataSource, database, collection \uc124\uc815\ud558\ub294 \ubc95 \ucc3e\uae30",id:"datasource-database-collection-\uc124\uc815\ud558\ub294-\ubc95-\ucc3e\uae30",level:2},{value:"MongoDB mongoose\ub97c \ud65c\uc6a9\ud55c CRUD",id:"mongodb-mongoose\ub97c-\ud65c\uc6a9\ud55c-crud",level:2},{value:"useNewUrlParser\uc640 useUnifiedTopology\ub780?",id:"usenewurlparser\uc640-useunifiedtopology\ub780",level:2},{value:"connection\uc740 \uc5b8\uc81c \ub2eb\uc544\uc57c \ud558\ub294\uac00?",id:"connection\uc740-\uc5b8\uc81c-\ub2eb\uc544\uc57c-\ud558\ub294\uac00",level:2},{value:"mongoDB collection \uc774\ub984 \ubcc0\uacbd",id:"mongodb-collection-\uc774\ub984-\ubcc0\uacbd",level:2},{value:"ObjectId\uc758 \ud0c0\uc785\uc740?",id:"objectid\uc758-\ud0c0\uc785\uc740",level:2},{value:"\uc5d0\ub7ec \ub85c\uadf8 Module not found &quot;npm:mongoose@^7.4.0",id:"\uc5d0\ub7ec-\ub85c\uadf8-module-not-found-npmmongoose740",level:2},{value:"\uc2dc\ub3c4 esm.sh",id:"\uc2dc\ub3c4-esmsh",level:3}],i={toc:d},u="wrapper";function p(n){let{components:e,...t}=n;return(0,a.kt)(u,(0,o.Z)({},i,t,{components:e,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"\ube60\ub974\uace0 \ub354\ub7fd\uac8c fetch\ub85c \ub9cc\ub4e4\uc5c8\ub358 API\ub97c mongoose\ub85c \ub9ac\ud329\ud1a0\ub9c1\ud558\ub294 \uacfc\uc815\uc744 \ub2e4\ub8f9\ub2c8\ub2e4."),(0,a.kt)("p",null,"\ud55c\uac00\uc9c0 \ud568\uc815\uc774 \uc788\uc2b5\ub2c8\ub2e4. \ub610 deno deploy\uc5d0\uc11c \uc0ac\uc6a9\ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4. \uc55e\uc73c\ub85c \uac1c\ubc1c\ud560 \ub54c\ub294 docker image\ubd80\ud130 \ucc3e\uaca0\uc2b5\ub2c8\ub2e4. \u3142\u3137\u3142\u3137"),(0,a.kt)("h2",{id:"mongodb-fetch-\ub9ac\ud329\ud1a0\ub9c1"},"mongoDB fetch \ub9ac\ud329\ud1a0\ub9c1"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"import { config } from 'https://deno.land/x/dotenv@v3.2.2/mod.ts';\nimport CardRecord from '../model/cards.ts';\n\nconst MONGO_URI = Deno.env.get('MONGO_URI') || config()['MONGO_URI'];\nconst CARD_API_KEY = Deno.env.get('CARD_API_KEY') || config()['CARD_API_KEY'];\n\ntype Collection = {\n  dataSource: string;\n  database: string;\n  collection: string;\n};\n\n/**\n * @see https://www.mongodb.com/developer/languages/rust/getting-started-deno-mongodb/\n * \ubaa8\ub4e0 method\uac00 POST\ub85c \uace0\uc815\ub418\uc5b4 \uc788\uc2b5\ub2c8\ub2e4. \ud2b9\uc815 \uba54\uc11c\ub4dc\uc5d0 \ub9de\uac8c \uac31\uc2e0\uc740 \uc5c6\uc2b5\ub2c8\ub2e4.\n */\n\nclass MongoAPI {\n  private static instance: MongoAPI;\n  private baseURL: string;\n  private options: {\n    method: string;\n    headers: { 'Content-Type': string; 'api-key': string };\n    body: BodyInit;\n  };\n  private cardBody: Collection;\n  private userBody: Collection;\n  private constructor() {\n    this.baseURL = MONGO_URI;\n    this.options = {\n      method: 'POST',\n      headers: {\n        'Content-Type': 'application/json',\n        'api-key': CARD_API_KEY,\n      },\n      body: '',\n    };\n    this.cardBody = {\n      dataSource: 'Cluster0',\n      database: 'cards_db',\n      collection: 'cards',\n    };\n    this.userBody = {\n      dataSource: 'Cluster0',\n      database: 'cards_db',\n      collection: 'user',\n    };\n  }\n\n  static getInstance(): MongoAPI {\n    if (!MongoAPI.instance) {\n      MongoAPI.instance = new MongoAPI();\n    }\n    return MongoAPI.instance;\n  }\n\n  async getCards(userId: string) {\n    try {\n      const result = await fetch(`${this.baseURL}/find`, {\n        ...this.options,\n        body: JSON.stringify({ ...this.cardBody, filter: { userId } }),\n      });\n      return result.json();\n    } catch (error) {\n      return error;\n    }\n  }\n\n  async getAllCards() {\n    try {\n      const result = await fetch(`${this.baseURL}/find`, {\n        ...this.options,\n        body: JSON.stringify({ ...this.cardBody }),\n      });\n      return result.json();\n    } catch (error) {\n      return error;\n    }\n  }\n\n  async postCards(document: CardRecord) {\n    try {\n      const result = await fetch(`${this.baseURL}/insertOne`, {\n        ...this.options,\n        body: JSON.stringify({\n          ...this.cardBody,\n          document,\n        }),\n      });\n      return result.json();\n    } catch (error) {\n      return error;\n    }\n  }\n\n  async patchCards(document: CardRecord) {\n    try {\n      const {\n        getQuestion: question,\n        getAnswer: answer,\n        getStackCount: stackCount,\n        getSubmitDate: submitDate,\n        getId: $oid,\n      } = document;\n      const result = await fetch(`${this.baseURL}/updateOne`, {\n        ...this.options,\n        body: JSON.stringify({\n          ...this.cardBody,\n          filter: { _id: { $oid } },\n          update: {\n            $set: {\n              question,\n              answer,\n              stackCount,\n              submitDate,\n            },\n          },\n        }),\n      });\n      return result.json();\n    } catch (error) {\n      return error;\n    }\n  }\n\n  async deleteCards($oid: string) {\n    try {\n      const result = await fetch(`${this.baseURL}/deleteOne`, {\n        ...this.options,\n        body: JSON.stringify({\n          ...this.cardBody,\n          filter: { _id: { $oid } },\n        }),\n      });\n      return result.json();\n    } catch (error) {\n      return error;\n    }\n  }\n\n  async postUser({\n    email,\n    passwordHash,\n    passwordSalt,\n  }: {\n    email: string;\n    passwordHash: string;\n    passwordSalt: string;\n  }) {\n    try {\n      const result = await fetch(`${this.baseURL}/insertOne`, {\n        ...this.options,\n        body: JSON.stringify({\n          ...this.userBody,\n          document: { email, passwordHash, passwordSalt },\n        }),\n      });\n      return result.json();\n    } catch (error) {\n      return error;\n    }\n  }\n\n  async getUser(email: string) {\n    try {\n      const result = await fetch(`${this.baseURL}/findOne`, {\n        ...this.options,\n        body: JSON.stringify({\n          ...this.userBody,\n          filter: { email },\n        }),\n      });\n      const data = await result.json();\n      return data.document;\n    } catch (error) {\n      return error;\n    }\n  }\n}\n\nexport default MongoAPI;\n")),(0,a.kt)("p",null,"\uc704\ub294 \uc804\uccb4 \ucf54\ub4dc\uc785\ub2c8\ub2e4."),(0,a.kt)("p",null,"singleton\uc774 \ub2e8\uc810\uc785\ub2c8\ub2e4. \ub610 \ubaa8\ub450 POST \uc694\uccad\uc744 \ud1b5\ud574 \uc8fc\uace0 \ubc1b\uc544\uc57c \ud569\ub2c8\ub2e4."),(0,a.kt)("p",null,"atlas\uc5d0 \uc5f0\uacb0\ud558\ub294 \ubb38\uc81c\ub3c4 \uac19\uc774 \uc788\uc5c8\uc2b5\ub2c8\ub2e4."),(0,a.kt)("h3",{id:"mongoose-\uc124\uce58"},"mongoose \uc124\uce58"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"import mongoose from 'npm:mongoose';\n")),(0,a.kt)("p",null,"\uc758\ub3c4\uc801\uc73c\ub85c \uc5ec\uae30\uae4c\uc9c0 \uc791\uc131\ud588\uc2b5\ub2c8\ub2e4. \uadf8\ub9ac\uace0 \uce90\uc2f1\ucc98\ub9ac\ud574\uc11c \ucd5c\uc2e0\ubc84\uc804\uc744 \uac00\uc838\uc624\ub3c4\ub85d \ud588\uc2b5\ub2c8\ub2e4."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="deno.lock"',title:'"deno.lock"'},'{\n  "npm": {\n    "specifiers": {\n      "mongoose": "mongoose@7.4.0",\n      "mongoose@7.4.0": "mongoose@7.4.0"\n    }\n  }\n}\n')),(0,a.kt)("p",null,"\uc774\ub807\uac8c \ucd5c\uc2e0\ubc84\uc804\uc744 \ud655\uc778\ud588\uc2b5\ub2c8\ub2e4."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"import mongoose from 'npm:mongoose@^7.4.0';\n")),(0,a.kt)("p",null,"\uc774\ub807\uac8c \ud574\uc11c \ucd5c\uc2e0\ubc84\uc804\uc744 \uc77c\ub2e8 \uba85\uc2dc\ud588\uc2b5\ub2c8\ub2e4."),(0,a.kt)("h3",{id:"\uc5f0\uacb0"},"\uc5f0\uacb0"),(0,a.kt)("p",null,"\uc6d0\ub798 DB\ub791 \ud1b5\uc2e0\ud558\ub294 URL\uc774 \uc788\uace0 \ub2e4\ub978 URL\uc774 \uc788\uc2b5\ub2c8\ub2e4."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-env"},"Mongo_URI=https://data.mongodb-api.com/app/{APP_ID}/endpoint/data/beta\n")),(0,a.kt)("p",null,"data-api \uc5d4\ub4dc\ud3ec\uc778\ud2b8\ub97c \ud1b5\ud574\uc11c \uc9c0\uae08\uae4c\uc9c0 \uc5f0\uacb0\ud588\uc2b5\ub2c8\ub2e4. \uc704\uc640 \uac19\uc740 \uc0dd\uae40\uc0c8\ub97c \uac16\uc2b5\ub2c8\ub2e4."),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://cloud.mongodb.com/v2/(%EB%B3%B8%EC%9D%B8%ED%81%B4%EB%9F%AC%EC%8A%A4%ED%84%B0uuid)#/dataAPI"},"https://cloud.mongodb.com/v2/(\ubcf8\uc778\ud074\ub7ec\uc2a4\ud130uuid)#/dataAPI")),(0,a.kt)("p",null,"\uc704\ub294 Data API \ud0ed \ub9c1\ud06c\uc785\ub2c8\ub2e4."),(0,a.kt)("p",null,"\ud558\uc9c0\ub9cc \uc774\uc81c \uc5f0\uacb0\ud560 \ub54c\ub294 \ub2e4\ub978 mongoDB atlas\uc5d0 API\uac00 \uc544\ub2cc \ub2e4\ub978 \ubc29\uc2dd\uc73c\ub85c \uc5f0\uacb0\ud560 \uac83\uc785\ub2c8\ub2e4."),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://cloud.mongodb.com/v2/(%EB%B3%B8%EC%9D%B8%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8uuid)#/setup/access"},"https://cloud.mongodb.com/v2/(\ubcf8\uc778\ud504\ub85c\uc81d\ud2b8uuid)#/setup/access")),(0,a.kt)("p",null,"\uc704\ub294 SECURITY > Quick Start \ub9c1\ud06c\uc785\ub2c8\ub2e4. \uc5ec\uae30\uc11c \ubcf8\uc778\uc774 \ub9cc\ub4e0 \uc720\uc800\uc758 \ube44\ubc00\ubc88\ud638\ub97c \uc5bb\ub3c4\ub85d \ud569\uc2dc\ub2e4."),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://cloud.mongodb.com/v2/(%EB%B3%B8%EC%9D%B8%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8uuid)#/clusters"},"https://cloud.mongodb.com/v2/(\ubcf8\uc778\ud504\ub85c\uc81d\ud2b8uuid)#/clusters")),(0,a.kt)("p",null,"\uc704\ub294 Database \ud0ed\uc785\ub2c8\ub2e4. Connect\uc5d0\uc11c Driver\ub97c \uc120\ud0dd\ud569\ub2c8\ub2e4."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"mongodb+srv://username:<password>@(\ud074\ub7ec\uc2a4\ud130\uc774\ub984).(\ud074\ub7ec\uc2a4\ud130uuid).mongodb.net/(\uc5ec\uae30\ub294 \uc0dd\ub7b5)\n")),(0,a.kt)("p",null,"\uc704\uc640 \ube44\uc2b7\ud55c \ud615\uc2dd\uc774 \ubcf4\uc77c \uac83\uc785\ub2c8\ub2e4. \uc704 \ubb38\uc790\uc5f4\uc744 ",(0,a.kt)("inlineCode",{parentName:"p"},".env"),"\uc5d0 \uc800\uc7a5\ud569\ub2c8\ub2e4. \uadf8\ub9ac\uace0 ",(0,a.kt)("inlineCode",{parentName:"p"},"password"),"\ub294 \uc544\uae4c \ubcf5\uc0ac\ud55c \ubcf8\uc778 \uc720\uc800 \ube44\ubc00\ubc88\ud638\ub97c \ub123\uc2b5\ub2c8\ub2e4."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:'language-title=".env"'},"MONGO_URL=mongodb+srv://username:<password>@(\ud074\ub7ec\uc2a4\ud130\uc774\ub984).(\ud074\ub7ec\uc2a4\ud130uuid).mongodb.net/(\uc5ec\uae30\ub294 \uc0dd\ub7b5)\n")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"import mongoose from 'npm:mongoose@^7.4.0';\n\nconst MONGO_URL = Deno.env.get('MONGO_URL') || config()['MONGO_URL'];\n\nawait mongoose.connect(MONGO_URL);\n\nconsole.log(mongoose.connection.readyState);\n")),(0,a.kt)("p",null,"\uc774\ub807\uac8c \ud558\uace0 \ub2e4\uc74c\uba85\ub839\uc73c\ub85c \ud655\uc778\ud574\ubd05\ub2c8\ub2e4."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"deno task dev\n")),(0,a.kt)("p",null,"\uba85\ub839 \uacb0\uacfc\uc5d0 1\uc774 \ub098\uc624\uba74 \uc5f0\uacb0 \uc131\uacf5\uc785\ub2c8\ub2e4."),(0,a.kt)("p",null,"\uc774\ub807\uac8c \ud558\uace0 \uc5d0\ub7ec\ub728\uba74 \uc774\uc81c \uc800\ub3c4 \ubaa8\ub985\ub2c8\ub2e4. \ub610 mongoDB\ub294 \uc5c5\ub370\uc774\ud2b8\uac00 \uc7a6\uc740\ud3b8\uc785\ub2c8\ub2e4. \uc774 \uc124\uba85\uc758 \uc218\uba85\uc740 \uc0c1\ub2f9\ud788 \uc9e7\uc2b5\ub2c8\ub2e4."),(0,a.kt)("h3",{id:"\ucc38\uace0"},"\ucc38\uace0"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://www.mongodb.com/developer/languages/rust/getting-started-deno-mongodb/"},"Getting Started with Deno & MongoDB")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://www.mongodb.com/community/forums/t/where-is-the-password-for-the-cluster/112742/3"},"Where is the password for the cluster?")),(0,a.kt)("h2",{id:"mongodb-mongoose\ub294-query\ub97c-\uc0dd\uc131\uc790\uc758-\uba54\uc11c\ub4dc\ub85c-\ud569\ub2c8\ub2e4"},"MongoDB mongoose\ub294 query\ub97c \uc0dd\uc131\uc790\uc758 \uba54\uc11c\ub4dc\ub85c \ud569\ub2c8\ub2e4."),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://www.youtube.com/watch?v=dmZ9Ih0CR9g"},"How to connect Mongoose with Deno")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://mongoosejs.com/"},"mongoosejs \uacf5\uc2dd\ubb38\uc11c")),(0,a.kt)("p",null,"\uc778\uc2a4\ud134\uc2a4\uc640 \uc0dd\uc131\uc790\ub294 \uba54\uc11c\ub4dc\uac00 \ub2e4\ub985\ub2c8\ub2e4. \ubb50 \ub2f9\uc5f0\ud569\ub2c8\ub2e4. \ud558\uc9c0\ub9cc \ucffc\ub9ac\ub97c \ud558\uba74 \uc0dd\uc131\ub41c \uc778\uc2a4\ud134\uc2a4\ub85c \ud560 \uac83\uc774\ub77c\ub294 \uc0dd\uac01\uc744 \ud588\uc2b5\ub2c8\ub2e4."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="mongoApi.ts"',title:'"mongoApi.ts"'},"import mongoose from 'npm:mongoose@^7.4.0';\n\nconst MONGO_URL = Deno.env.get('MONGO_URL') || config()['MONGO_URL'];\n\nawait mongoose.connect(MONGO_URL);\n\nconst card = new Card({\n  userId: '1234',\n  question: 'asdf',\n  answer: 'asdf',\n  submitDate: Date.now(),\n  stackCount: 9999,\n});\n\nconst foo = await card.save(); // \uc778\uc2a4\ud134\uc2a4\ub97c DB\uc5d0 \uc800\uc7a5\n\nconst foo = await Card.findOne({ userId: '1234' }); // \uc0dd\uc131\uc790 \uba54\uc11c\ub4dc\ub85c query\n\nconsole.log(foo);\n")),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"findOne")," \uba54\uc11c\ub4dc \ucc3e\ub2e4\uac00 \uc0dd\uc131\uc790\uc758 \uba54\uc11c\ub4dc\ub294 \uc758\uc2ec\uc744 \uc548\ud574\ubd24\ub124\uc694. \u3142\u3137\u3142\u3137 \uc774\uac70 \ub54c\ubb38\uc5d0 \uc2a4\ud2b8\ub808\uc2a4 \ub9ce\uc774 \ubc1b\uc558\ub124\uc694."),(0,a.kt)("h2",{id:"mongodb-\uac1c\ub150"},"mongoDB \uac1c\ub150"),(0,a.kt)("p",null,"mongoDB\uc5d0\ub294 \uac1c\ub150\uc774 \uc788\uc2b5\ub2c8\ub2e4. \ud504\ub85c\uc81d\ud2b8, \ud074\ub7ec\uc2a4\ud130, \ucf5c\ub809\uc158 \uc785\ub2c8\ub2e4. \ub610 dataSource, database, collection\uc774 \uc788\uc2b5\ub2c8\ub2e4. \uc790\ub8cc\ub97c \uc800\uc7a5\ud558\ub294 \ub2e8\uc704\uc785\ub2c8\ub2e4."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"const cardBody = {\n  dataSource: 'Cluster0',\n  database: 'cards_db',\n  collection: 'cards',\n};\n\nconst userBody = {\n  dataSource: 'Cluster0',\n  database: 'cards_db',\n  collection: 'user',\n};\n")),(0,a.kt)("p",null,"\uc800\uc5d0\uac8c\ub294 \ub2e4\uc74c \ubb38\uc81c\uac00 \uc788\uc2b5\ub2c8\ub2e4. dataSource, database \uc124\uc815\uc744 \uc5b4\ub5bb\uac8c \ud560 \uc218 \uc788\ub294\uc9c0 \uc54c\uc544\ub0b4\uc57c \ud569\ub2c8\ub2e4."),(0,a.kt)("p",null,"\ud604\uc7ac database\ub294 test\ub85c \uae30\ubcf8\uc120\ud0dd\uc774 \ub418\uc5b4 \uc788\uc2b5\ub2c8\ub2e4."),(0,a.kt)("h2",{id:"datasource-database-collection-\uc124\uc815\ud558\ub294-\ubc95-\ucc3e\uae30"},"dataSource, database, collection \uc124\uc815\ud558\ub294 \ubc95 \ucc3e\uae30"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"const foo = {\n  dataSource: 'Cluster0',\n  database: 'cards_db',\n  collection: 'cards',\n};\n")),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"dataSource"),"\ub294 ",(0,a.kt)("inlineCode",{parentName:"p"},".env"),"\ub85c \uc5f0\uacb0\ud55c url\uc5d0\uc11c \uc124\uc815\ub418\uc5b4 \uc788\uc2b5\ub2c8\ub2e4."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:'language-title=".env"'},"MONGO_URL=mongodb+srv://username:<password>@(\ud074\ub7ec\uc2a4\ud130\uc774\ub984).(\ud074\ub7ec\uc2a4\ud130uuid).mongodb.net/\n")),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"database"),"\ub294 url path\ub85c \uc811\uadfc\ud569\ub2c8\ub2e4."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:'language-title=".env"'},"MONGO_URL=mongodb+srv://username:<password>@(\ud074\ub7ec\uc2a4\ud130\uc774\ub984).(\ud074\ub7ec\uc2a4\ud130uuid).mongodb.net/cards_db\n")),(0,a.kt)("p",null,"\uc774\ub807\uac8c \ub418\uba74 ",(0,a.kt)("inlineCode",{parentName:"p"},"database"),"\ub97c ",(0,a.kt)("inlineCode",{parentName:"p"},"cards_db"),"\ub85c \uc124\uc815\ud55c \uac83\uc785\ub2c8\ub2e4."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"import mongoose from 'npm:mongoose@^7.4.0';\n\nconst MONGO_URL = Deno.env.get('MONGO_URL') || config()['MONGO_URL'];\n\nawait mongoose.connect(MONGO_URL);\n\nconsole.log(mongoose.connection.name);\n")),(0,a.kt)("p",null,"\uc774\ub807\uac8c \ud558\uba74 \ud604\uc7ac \uc5f0\uacb0\ud55c ",(0,a.kt)("inlineCode",{parentName:"p"},"database"),"\uc774\ub984\uc744 \uc54c\uc544\ub0bc \uc218 \uc788\uc2b5\ub2c8\ub2e4."),(0,a.kt)("h2",{id:"mongodb-mongoose\ub97c-\ud65c\uc6a9\ud55c-crud"},"MongoDB mongoose\ub97c \ud65c\uc6a9\ud55c CRUD"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"async function getCardNew(userId: string) {\n  try {\n    return await Card.find({ userId });\n  } catch (error) {\n    return error;\n  }\n}\n\nasync function postCardNew(document: Card) {\n  const card = new Card(document);\n  try {\n    return await card.save();\n  } catch (error) {\n    return error;\n  }\n}\n\nasync function patchCardNew({\n  question,\n  answer,\n  stackCount,\n  submitDate,\n  userId,\n  _id,\n}: Card) {\n  try {\n    return await Card.findByIdAndUpdate(_id, {\n      question,\n      answer,\n      stackCount,\n      submitDate,\n      userId,\n    });\n  } catch (error) {\n    return error;\n  }\n}\n\nasync function deleteCardNew(_id: string) {\n  try {\n    return await Card.findByIdAndDelete(_id);\n  } catch (error) {\n    return error;\n  }\n}\n")),(0,a.kt)("p",null,"\ud568\uc218\ub97c \uc815\uc758\ud558\ub294 \ubb38\ubc95\uc774 \uadf9\ub2e8\uc801\uc73c\ub85c \ub2e8\ucd10\ud574\uc84c\uc2b5\ub2c8\ub2e4."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"// \uc0dd\uc131\nconst create = await postCardNew({\n  userId: '1234',\n  question: '\ub3c4\ucee4\ub294 \ub3c5\ud558\ub2e4',\n  answer: '\ub3c4\ud050\uc0ac\uc6b0\ub974\uc2a4\uac00 \ub354 \ub3c5\ud558\ub2e4',\n  stackCount: 9999,\n  submitDate: new Date(),\n});\nconsole.log('create', create, create._id);\n\n// \uc77d\uae30\nconst read = await getCardNew('1234');\nconsole.log('read', read, read?._id);\n\n// \uac31\uc2e0\nconst update = await patchCardNew({\n  _id: create._id,\n  question: '\ub3c4\ucee4\ub294 \ub3da\uac70',\n  answer: '\ub3da\uac70\uac00 \ub3c4\ucee4',\n  stackCount: 0,\n  submitDate: new Date(),\n  userId: '1234',\n});\nconsole.log('update', update);\n\n// \uac31\uc2e0\ud55c\uac70 \uc77d\uae30(\ube7c\ub3c4\ub428)\nconst read2 = await getCardNew('1234');\nconsole.log('read2', read2);\n\n// \uc0ad\uc81c\nconst deleteCard = await deleteCardNew(create._id);\nconsole.log('deleteCard', deleteCard);\n")),(0,a.kt)("p",null,"\ub123\uc740 \ubb38\uc790\uc5f4\uc774 \uc774\uc0c1\ud558\uc9c0\ub9cc \uc798 \uc791\ub3d9\ud569\ub2c8\ub2e4. \uc800\uc7a5\ud558\uace0 \ud130\ubbf8\ub110 console\uc5d0\uc11c \ub3d9\uc791\ud558\ub294 \ud53c\ub4dc\ubc31\uc744 \uc798 \ubd24\uc2b5\ub2c8\ub2e4."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'create {\n  question: "\ub3c4\ucee4\ub294 \ub3c5\ud558\ub2e4",\n  answer: "\ub3c4\ud050\uc0ac\uc6b0\ub974\uc2a4\uac00 \ub354 \ub3c5\ud558\ub2e4",\n  submitDate: 2023-07-20T04:47:36.515Z,\n  stackCount: 9999,\n  userId: "1234",\n  _id: new ObjectId("64b8bc688e8d1c14d26554b1"),\n  __v: 0\n} new ObjectId("64b8bc688e8d1c14d26554b1")\nread [\n  {\n    _id: new ObjectId("64b8bc688e8d1c14d26554b1"),\n    question: "\ub3c4\ucee4\ub294 \ub3c5\ud558\ub2e4",\n    answer: "\ub3c4\ud050\uc0ac\uc6b0\ub974\uc2a4\uac00 \ub354 \ub3c5\ud558\ub2e4",\n    submitDate: 2023-07-20T04:47:36.515Z,\n    stackCount: 9999,\n    userId: "1234",\n    __v: 0\n  }\n] undefined\nread2 [\n  {\n    _id: new ObjectId("64b8bc688e8d1c14d26554b1"),\n    question: "\ub3c4\ucee4\ub294 \ub3da\uac70",\n    answer: "\ub3da\uac70\uac00 \ub3c4\ucee4",\n    submitDate: 2023-07-20T04:47:36.826Z,\n    stackCount: 0,\n    userId: "1234",\n    __v: 0\n  }\n]\nupdate {\n  _id: new ObjectId("64b8bc688e8d1c14d26554b1"),\n  question: "\ub3c4\ucee4\ub294 \ub3c5\ud558\ub2e4",\n  answer: "\ub3c4\ud050\uc0ac\uc6b0\ub974\uc2a4\uac00 \ub354 \ub3c5\ud558\ub2e4",\n  submitDate: 2023-07-20T04:47:36.515Z,\n  stackCount: 9999,\n  userId: "1234",\n  __v: 0\n}\ndeleteCard {\n  _id: new ObjectId("64b8bc688e8d1c14d26554b1"),\n  question: "\ub3c4\ucee4\ub294 \ub3da\uac70",\n  answer: "\ub3da\uac70\uac00 \ub3c4\ucee4",\n  submitDate: 2023-07-20T04:47:36.826Z,\n  stackCount: 0,\n  userId: "1234",\n  __v: 0\n}\n')),(0,a.kt)("p",null,"\uc5ec\uae30\uc11c \uc758\ubb38\uc774 \uc0dd\uacbc\uc2b5\ub2c8\ub2e4. ",(0,a.kt)("inlineCode",{parentName:"p"},"__v"),"\uc774\ub780 \ubb34\uc5c7\uc778\uac00?"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"versionKey"),"\ub77c\uace0 \ud569\ub2c8\ub2e4."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"const cardSchema = new Schema<Card>(\n  {\n    question: { type: String, required: true },\n    answer: { type: String, required: true },\n    submitDate: { type: Date, required: true },\n    stackCount: { type: Number, required: true },\n    userId: { type: String, required: true },\n  },\n  { versionKey: false } // \uc5ec\uae30\n);\n")),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"versionKey: false")," \uc124\uc815\ud558\uba74 \uc548\ubcf4\uc785\ub2c8\ub2e4. \uae30\ubcf8\uc801\uc73c\ub85c \uae30\ub85d\ud574\uc8fc\ub294\uac8c \ud3b8\ub9ac\ud55c \uac83 \uac19\uc2b5\ub2c8\ub2e4."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'create {\n  question: "\ub3c4\ucee4\ub294 \ub3c5\ud558\ub2e4",\n  answer: "\ub3c4\ud050\uc0ac\uc6b0\ub974\uc2a4\uac00 \ub354 \ub3c5\ud558\ub2e4",\n  submitDate: 2023-07-20T05:17:04.002Z,\n  stackCount: 9999,\n  userId: "1234",\n  _id: new ObjectId("64b8c3500484da100f651571")\n} new ObjectId("64b8c3500484da100f651571")\nread [\n  {\n    _id: new ObjectId("64b8c3500484da100f651571"),\n    question: "\ub3c4\ucee4\ub294 \ub3c5\ud558\ub2e4",\n    answer: "\ub3c4\ud050\uc0ac\uc6b0\ub974\uc2a4\uac00 \ub354 \ub3c5\ud558\ub2e4",\n    submitDate: 2023-07-20T05:17:04.002Z,\n    stackCount: 9999,\n    userId: "1234"\n  }\n] undefined\nread2 [\n  {\n    _id: new ObjectId("64b8c3500484da100f651571"),\n    question: "\ub3c4\ucee4\ub294 \ub3da\uac70",\n    answer: "\ub3da\uac70\uac00 \ub3c4\ucee4",\n    submitDate: 2023-07-20T05:17:04.291Z,\n    stackCount: 0,\n    userId: "1234"\n  }\n]\nupdate {\n  _id: new ObjectId("64b8c3500484da100f651571"),\n  question: "\ub3c4\ucee4\ub294 \ub3c5\ud558\ub2e4",\n  answer: "\ub3c4\ud050\uc0ac\uc6b0\ub974\uc2a4\uac00 \ub354 \ub3c5\ud558\ub2e4",\n  submitDate: 2023-07-20T05:17:04.002Z,\n  stackCount: 9999,\n  userId: "1234"\n}\ndeleteCard {\n  _id: new ObjectId("64b8c3500484da100f651571"),\n  question: "\ub3c4\ucee4\ub294 \ub3da\uac70",\n  answer: "\ub3da\uac70\uac00 \ub3c4\ucee4",\n  submitDate: 2023-07-20T05:17:04.291Z,\n  stackCount: 0,\n  userId: "1234"\n}\n')),(0,a.kt)("p",null,"\uc774\uc81c\ub294 \uc0ac\ub77c\uc84c\uc2b5\ub2c8\ub2e4."),(0,a.kt)("h2",{id:"usenewurlparser\uc640-useunifiedtopology\ub780"},"useNewUrlParser\uc640 useUnifiedTopology\ub780?"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://stackoverflow.com/questions/68958221/mongoparseerror-options-usecreateindex-usefindandmodify-are-not-supported"},"MongoParseError: options useCreateIndex, useFindAndModify are not supported")),(0,a.kt)("p",null,"\uad73\uc774 \uc2e0\uacbd\uc4f8 \uc774\uc720\uac00 \uc5c6\uc2b5\ub2c8\ub2e4."),(0,a.kt)("p",null,"mongoose 6.0 \ubc84\uc804\ubd80\ud130 \ubaa8\ub450 \uae30\ubcf8\uc801\uc73c\ub85c ",(0,a.kt)("inlineCode",{parentName:"p"},"true"),"\ub85c \uc124\uc815\ub429\ub2c8\ub2e4."),(0,a.kt)("h2",{id:"connection\uc740-\uc5b8\uc81c-\ub2eb\uc544\uc57c-\ud558\ub294\uac00"},"connection\uc740 \uc5b8\uc81c \ub2eb\uc544\uc57c \ud558\ub294\uac00?"),(0,a.kt)("p",null,"when to open and close mongoose connections \uad6c\uae00\ub9c1\uc744 \ud574\ubd24\uc2b5\ub2c8\ub2e4."),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://stackoverflow.com/questions/14495975/why-is-it-recommended-not-to-close-a-mongodb-connection-anywhere-in-node-js-code"},"https://stackoverflow.com/questions/14495975/why-is-it-recommended-not-to-close-a-mongodb-connection-anywhere-in-node-js-code")),(0,a.kt)("p",null,"\uc61b\ub0a0 \ubb38\uc11c\uc774\uc9c0\ub9cc connection pool\uc744 \uc7ac\uc0ac\uc6a9\ud574\uc11c \uc548 \ub2eb\ub294 \uac83\uc744 \uad8c\uc7a5\ud55c\ub2e4\uace0 \ud569\ub2c8\ub2e4."),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://www.mongodb.com/community/forums/t/general-question-about-opening-and-closing-database-connections/182860"},"https://www.mongodb.com/community/forums/t/general-question-about-opening-and-closing-database-connections/182860")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://www.mongodb.com/community/forums/t/where-to-close-db-connection/1368"},"https://www.mongodb.com/community/forums/t/where-to-close-db-connection/1368")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://stackoverflow.com/questions/52067945/when-to-close-a-mongodb-connection"},"https://stackoverflow.com/questions/52067945/when-to-close-a-mongodb-connection")),(0,a.kt)("p",null,"\uc791\ub144 \uc9c8\ubb38\uc774\uc9c0\ub9cc \ud1b5\uc2e0\ub9c8\ub2e4 \uc5f4\uace0 \ub2eb\uc9c0\ub9d0\uace0 \uc5f4\uc5b4\ub450\ub77c\uace0 \ud569\ub2c8\ub2e4."),(0,a.kt)("h2",{id:"mongodb-collection-\uc774\ub984-\ubcc0\uacbd"},"mongoDB collection \uc774\ub984 \ubcc0\uacbd"),(0,a.kt)("p",null,"\uc774 \uc791\uc5c5\uc744 \uc9c4\ud589\ud560 \ub54c \ud504\ub860\ud2b8\uc5d4\ub4dc\ub294 \uc54c\ud544\uc694 \uc5c6\uc2b5\ub2c8\ub2e4."),(0,a.kt)("p",null,"mongoDB\uc5d0\uc11c \ub9ac\uc18c\uc2a4 \uc774\ub984\uc744 cards\ub77c\uace0 \uba85\uba85\ud588\uc2b5\ub2c8\ub2e4. \uc798\ubabb\ub41c \uad00\ub840\ub77c\uace0 \ud569\ub2c8\ub2e4. \ub9ac\uc18c\uc2a4\uc774\ub984\uc740 \ub2e8\uc218\ud615\uc73c\ub85c \uc791\uc131\ud558\ub294 \uac83\uc774 \uc62c\ubc14\ub985\ub2c8\ub2e4."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"await mongoose\n  .connect(MONGO_URL)\n  .then(() => {\n    console.log('connected');\n    let db = mongoose.connection.db;\n\n    return db.collection('cards').rename('card');\n  })\n  .then(() => {\n    console.log('rename successful');\n  })\n  .catch((e) => {\n    console.log('rename failed:', e.message);\n  });\n")),(0,a.kt)("p",null,"\uc774\ub807\uac8c \uc801\uc6a9\ud560 \uc218 \uc788\uc5c8\uc2b5\ub2c8\ub2e4."),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://stackoverflow.com/questions/43391592/mongoose-rename-collection"},"https://stackoverflow.com/questions/43391592/mongoose-rename-collection")),(0,a.kt)("p",null,"\uc704 \uc9c8\ubb38\uc744 \ucc38\uace0 \ud588\uc2b5\ub2c8\ub2e4."),(0,a.kt)("h2",{id:"objectid\uc758-\ud0c0\uc785\uc740"},"ObjectId\uc758 \ud0c0\uc785\uc740?"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://stackoverflow.com/questions/54743461/how-to-define-mongoose-id-in-typescript-interface"},"https://stackoverflow.com/questions/54743461/how-to-define-mongoose-id-in-typescript-interface")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"import { Types } from 'npm:mongoose@^7.4.0';\ninterface Animal {\n  _id: Types.ObjectId;\n  name: string;\n}\n")),(0,a.kt)("p",null,"\uc774\ub807\uac8c \uc815\uc758\ud558\uace0 \uc0ac\uc6a9\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4. \ubb38\uc81c\ub294 d.ts \ub0b4\uc5d0\uc11c \uc0ac\uc6a9\ud558\ub294 \ubc29\ubc95\uc785\ub2c8\ub2e4."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="types.d.ts"',title:'"types.d.ts"'},"type Card = {\n  _id?: import('npm:mongoose@^7.4.0').Types.ObjectId;\n  question: string;\n  answer: string;\n  submitDate: Date;\n  stackCount: number;\n  userId: string;\n};\n\ntype User = {\n  _id?: import('npm:mongoose@^7.4.0').Types.ObjectId;\n  email: string;\n  passwordHash: string;\n  passwordSalt: string;\n};\n")),(0,a.kt)("p",null,"\uc815\ub9d0 \ucda9\uaca9\uc785\ub2c8\ub2e4. \uc774\ub807\uac8c \uc678\ubd80 \ub77c\uc774\ube0c\ub7ec\ub9ac \ud0c0\uc785\uc744 import\ud558\ub294\uac8c \uac00\ub2a5\ud560 \uc904 \ubab0\ub790\uc2b5\ub2c8\ub2e4."),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://stackoverflow.com/questions/39040108/import-class-in-definition-file-d-ts"},"https://stackoverflow.com/questions/39040108/import-class-in-definition-file-d-ts")),(0,a.kt)("h2",{id:"\uc5d0\ub7ec-\ub85c\uadf8-module-not-found-npmmongoose740"},'\uc5d0\ub7ec \ub85c\uadf8 Module not found \\"npm:mongoose@^7.4.0'),(0,a.kt)("p",null,"\uc774\uac83\uc740 \ubbf8\uc81c\uc0ac\uac74\uc785\ub2c8\ub2e4."),(0,a.kt)("p",null,"git commit\uc744 \ud558\uace0 github\ub97c \ud655\uc778\ud574\ubcf4\ub2c8\uae4c \uc5d0\ub7ec\uac00 \ubc1c\uc0dd\ud588\uc2b5\ub2c8\ub2e4."),(0,a.kt)("p",null,"DB\ub791 \ud1b5\uc2e0\ud560 \ub54c mongoose\ub97c \ud65c\uc6a9\ud574\uc11c CRUD\ub97c \ub354 \uac04\uc18c\ud558\uac8c \uc218\uc815\ud588\uc2b5\ub2c8\ub2e4. \ub85c\uceec \uac1c\ubc1c\ud658\uacbd\uc5d0\uc11c\ub294 \ubb38\uc81c \uc5c6\uc774 \uc0ac\uc6a9\ud560 \uc218 \uc788\uc5c8\uc2b5\ub2c8\ub2e4. \ud558\uc9c0\ub9cc deno deploy \ubc30\ud3ec\ud658\uacbd\uc5d0\uc11c npm \uc2dd\ubcc4\uc790\ub97c \uc778\uc2dd\ud560 \uc218 \uc5c6\ub294 \uac83\uc73c\ub85c \ubcf4\uc785\ub2c8\ub2e4."),(0,a.kt)("p",null,"\uac1c\ubc1c\ud300\uc774 \uc5b8\uc820\uac00 \ubc18\uc601\ud560 \uacc4\ud68d\uc774\ub77c\uace0 \ub9d0\ub9cc\ud588\uc2b5\ub2c8\ub2e4."),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/denoland/deploy_feedback/issues/314"},"Support npm: specifiers #314 - deno deploy feedback")),(0,a.kt)("p",null,"docker\ub97c \ud559\uc2b5\ud574\uc11c \ubc30\ud3ec\ud658\uacbd\uacfc \uac1c\ubc1c\ud658\uacbd\uc758 \uc77c\uad00\uc131\uc744 \ud655\ubcf4\ud558\ub294 \uac83\uc774 \ud544\uc694\ud574\ubcf4\uc785\ub2c8\ub2e4."),(0,a.kt)("p",null,"\uadf8\ub9ac\uace0 \uc774 \ubb38\uc81c\ub294 \ubc30\ud3ec\ud658\uacbd\uc744 \ubc14\uafb8\uae30 \uc804\uae4c\uc9c0 \ud574\uacb0\ud560 \uc218 \uc5c6\ub294 \uac83\uc73c\ub85c \uac04\uc8fc\ud569\ub2c8\ub2e4."),(0,a.kt)("p",null,"\ubc30\ud3ec\ud658\uacbd\uc744 \ubcc0\uacbd\ud558\ub294 \uac83\uc73c\ub85c \ubb38\uc81c\ub97c \ud574\uacb0\ud560 \ub54c\ub294 \uc544\ub798 \ube14\ub85c\uadf8\ub97c \ud65c\uc6a9\ud574\uc57c \ud569\ub2c8\ub2e4."),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://deno.com/blog/npm-and-deno-anywhere#google-cloud-run"},"Run npm and Deno anywhere")),(0,a.kt)("h3",{id:"\uc2dc\ub3c4-esmsh"},"\uc2dc\ub3c4 esm.sh"),(0,a.kt)("p",null,"\ud558\uc9c0\ub9cc esm\uc744 \ud65c\uc6a9\ud560 \uc218 \uc788\ub294 \ubc29\ubc95\uc744 \ubc1c\uacac\ud588\uc2b5\ub2c8\ub2e4."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"import express from 'https://esm.sh/express?target=denonext';\n\nconst app = express();\n\napp.get('/', (req, res) => {\n  res.send('Hello from Deno Deploy!');\n});\n\napp.listen(8080);\n")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://deno.com/blog/node-builtins-on-deploy"},"Node.js built-ins on Deno Deploy")),(0,a.kt)("p",null,"\uc5ec\uae30\uc11c npm\uc744 \uc0ac\uc6a9\ud560 \uc218 \uc788\uac8c \ub3c4\uc785 \uc608\uc815\uc774\ub77c\uace0 \ub9d0\ub9cc\ud569\ub2c8\ub2e4. \uadf8\uac83\ub3c4 5\uc6d4\uc5d0 \ub9d0\ud55c \uac83\uc785\ub2c8\ub2e4."),(0,a.kt)("p",null,"\uc608\uc2dc\ub97c \ubcf4\uace0 ",(0,a.kt)("inlineCode",{parentName:"p"},"esm.sh"),"\ub97c \ubc1c\uacac\ud588\uc2b5\ub2c8\ub2e4."),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://esm.sh/"},"esm.sh")),(0,a.kt)("p",null,"npm package\ub97c CDN\uc73c\ub85c \ubc1b\uc744 \uc218 \uc788\uac8c \ud574\uc8fc\ub294 \uc11c\ube44\uc2a4\ub85c \ubcf4\uc785\ub2c8\ub2e4."),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://dev.to/ije/introducing-esm-cdn-for-npm-deno-1mpo"},"Introducing: ESM CDN for NPM + Deno")),(0,a.kt)("p",null,"\uc704\uc5d0\uc11c cloudflare\uac00 \uc9c0\uc6d0\ud55c\ub2e4\uace0 \ud558\ub124\uc694."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"import { config } from '../deps.ts';\nimport mongoose from 'https://esm.sh/mongoose@7.4.0';\n\nconst MONGO_URL = Deno.env.get('MONGO_URL') || config()['MONGO_URL'];\n\nawait mongoose.connect(MONGO_URL);\n")),(0,a.kt)("p",null,"\uc774\ub807\uac8c \ud574\uc11c \uc2dc\ub3c4\ud558\ub2c8\uae4c \ub2e4\uc74c \uc5d0\ub7ec\uac00 \ubc1c\uc0dd\ud569\ub2c8\ub2e4."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"error: Uncaught TypeError: mongoose.connect is not a function\nawait mongoose.connect(MONGO_URL);\n")),(0,a.kt)("p",null,"\uc774\ub807\uac8c \ub418\uba74 \ubb38\uc81c\ub97c \ud480 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4."))}p.isMDXComponent=!0}}]);