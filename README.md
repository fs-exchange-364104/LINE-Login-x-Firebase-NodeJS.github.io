# LINE Login (Web)
使用 web 做 LINE Login 並向 Firebase 註冊取得帳戶。


## 使用方法

### Line登入
流程：首次登入要求取得權限，並且會自動跳轉到 `callback` 路徑並取得 `access_token`


[GET] localhost:5050/line/login

<img src="screenshot/img01.png">

登入成功後會使用 async waterflow 依序執行下列事件。

1. 拿取 code 進入 `callback` 路徑並取得 `access_token`。
- getLineToken()

```js
{
  access_token:"eyJhbGciOiJIUzI1NiJ9e0WP8ttjLNDYwhL1BmcbznoKuKPRjwYDxxy3_w-EkeFaQlIZ9WszGkUkI3PGZQZ8vmrZUjWChLNsI6gXykgQEW0E16651dUYUDDGESZ4zyAp8mJcMIDSp2JnmxtKaWuTQBwb6blbUTIMVUCobcgczoVOcDc9Z_Tezl3dQL78XeA.llhQefBtlqFhPAjXdjqxbkrQ9npNkucIV_cYxFpfMhQ",
  token_type:"Bearer",
  refresh_token:"DI882C9fEGhiLOOZXUtZ",
  expires_in:2592000,
  scope:"openid profile",
  id_token:"eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FjY2Vzcy5saW5lLm1lIiwic3ViIjoiVTliMmZhYWE0M2MxMzE0MzJiNTY3NDdkZGQyOTcxNzVhIiwiYXVkIjoiMTU3MDcyNjE4NCIsImV4cCI6MTUyNjQ1ODUyMCwiaWF0IjoxNTI2NDU0OTIwLCJuYW1lIjoiVHNhaSBZaSBMaW4iLCJwaWN0dXJlIjoiaHR0cHM6Ly9wcm9maWxlLmxpbmUtc2Nkbi5uZXQvMGhRcW1SRjhMMkRsNVFLeUl5V25GeENXeHVBRE1uQlFnV0tFMUdiWGQtV0RsLUVrcGJiRWtWYTMxOFVHd3ZURUFNUHhnVk9pY29CRHQ5In0.V-_Cti85xlR47U4UD5833m3kqkHGvS06f2UL-5L-p-8"
}
```


2. 拿 LINE 的 access_token 取得 userId
- getLineProfile()

```js
{
  userId:"U9b2faaa43c131432b56747ddd297175a",
  displayName:"Tsai Yi Lin",
  pictureUrl:"https://profile.line-scdn.net/0hQqmRF8L2Dl5QKyIyWnFxCWxuADMnBQgWKE1GbXd-WDl-EkpbbEkVa318UGwvTEAMPxgVOicoBDt9"
}
```


3. 拿 LINE 的 userId 去做 Firebase 註冊
- firebaseLogin()

若查無此用戶則新建此用戶

```js
{
  uid:"U9b2faaa43c131432b56747ddd297175a",
  emailVerified:false,
  displayName:"蔡易霖",
  photoURL:"https://profile.line-scdn.net/0hQqmRF8L2Dl5QKyIyWnFxCWxuADMnBQgWKE1GbXd-WDl-EkpbbEkVa318UGwvTEAMPxgVOicoBDt9",
  disabled:false,
  metadata:{
  lastSignInTime:null,
  creationTime:"Thu, 10 May 2018 14:44:06 GMT"
  },
  tokensValidAfterTime:"Thu, 10 May 2018 14:44:06 GMT",
  providerData:[]
}
```

最後完成畫面回傳 Firebase 帳戶資訊
<img src="screenshot/img02.png">
