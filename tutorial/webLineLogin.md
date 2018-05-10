# 網頁版 Ling Login
使用 web 做 LINE Login 並取得 access_token

## 使用方法

### Line登入
流程：首次登入要求取得權限，並且會自動跳轉到 `callback` 路徑並取得 `access_token`


[GET] http://localhost:5050/login

<img src="../screenshot/img01.png">

登入成功後會拿取 code 進入 `callback` 路徑並取得 `access_token`。

<img src="../screenshot/img02.png">

