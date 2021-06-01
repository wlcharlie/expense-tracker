# 我的亂花錢 個人記帳本

我的錢自己管，記帳簡單自己來

網址：https://powerful-savannah-25620.herokuapp.com/user

測試帳號：example@email.com
測試密碼：example

## 關於專案

### 專案畫面
<img src="https://i.imgur.com/isQ9FtK.png">
<img src="https://i.imgur.com/zgFnPha.png">

### 功能

* 檢視所有記帳內容
* 檢視記帳總金額
* 篩選記帳內容(分類/時間)
* 新增/編輯/刪除記帳項目
* 使用者註冊/登入/第三方登入

## 開始使用

1. 將專案複製到你的電腦上:
   ```sh
   git clone https://github.com/wlcharlie/expense-tracker
   ```
2. 進入到資料夾:
    ```sh
    cd expense-tracker
    ```
3. 用npm安裝套件 *這邊會安裝package/dependecies下的套件*
   ```sh
   npm install
   ```
4. 安裝(導入)資料 *資料只要導入一次即可*
   ```sh
   npm run seed
   ```
5. 執行
   ```sh
   npm run dev
   ```
6. 確認出現這行提示代表成功：
    ```sh
    app is listening on http://localhost:3000
    ```
    於瀏覽器輸入網址：http://localhost:3000
7. 結束
    * 在終端機上按下Crtl + C


## 開發工具

#### 開發/運行環境
* [Node.js (10.15.0)](https://nodejs.org/en/)
* [Express (4.17.1)](https://expressjs.com/zh-tw/)
* [nodemon (2.0.7)](https://www.npmjs.com/package/nodemon)
* [Method-override (3.0.0)](https://www.npmjs.com/package/method-override)
* [handlebars-helpers(0.10.0)](https://www.npmjs.com/package/handlebars-helpers)
* 基本必備：VSC, Gitbash, Fork

#### 介面/版型相關
* [Bootstrap (4.1)](https://getbootstrap.com/)
* [Express-Handlebars (5.3.2)](https://www.npmjs.com/package/express-handlebars)
* [Fontawesome (kit code 5.15.3)](https://fontawesome.com/)
* [connect-flash (0.1.1)]

#### 資料相關
* [mongodb (4.4)](https://docs.mongodb.com/manual/)
* [mongoose (5.12.7)](https://mongoosejs.com/)
* [bcryptjs (2.4.3)]
* [dotenv (10.0.0)]
* [passport (0.4.1)] (with Strategy Facebook/Local)

## 關於我

Charlie

Last Update: 5/15

