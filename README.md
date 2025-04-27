# セッション管理・認証まとめ（Auth0 + Passport.js + express-session）

## 📚 使用技術

- **express** … Node.js のサーバーフレームワーク
- **passport.js** … 認証ミドルウェア
- **passport-auth0** … Auth0 との認証連携用 Strategy
- **express-session** … セッションを管理するためのミドルウェア

---

## 1. `express-session` とは？

`express-session` は、**セッションのライフサイクル（発行・保存・更新・削除）を自動管理するミドルウェア**。

具体的な役割は以下：

| 役割                                         | 説明                                           |
| :------------------------------------------- | :--------------------------------------------- |
| セッション ID を作成                         | ユーザーごとにユニークな ID を作成する         |
| セッション ID をブラウザに Cookie として保存 | ユーザーに ID を渡して紐づける                 |
| リクエストごとにセッションデータを復元       | Cookie からセッションをサーバー側で復元する    |
| セッションの保存・更新・削除                 | ログイン・ログアウト時にデータを保存／削除する |

---

## 2. セッションの有効期限（期限切れ設定）

セッションの有効期限は、基本的に **Cookie の設定**で管理。

### 設定方法

```ts
cookie: {
  maxAge: 24 * 60 * 60 * 1000, // 1日（ミリ秒単位）
}
```

## 3. セッションの期限を延長する

ユーザーが操作を行うたびにセッションの有効期限を延長．
今回は 30 分で設定．

```ts
const session = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    path: "/",
    httpOnly: true,
    secure: false,
    maxAge: 24 * 60 * 60 * 1000, // 1日
  },
  resave: false,
  saveUninitialized: false,
  rolling: true, // ★リクエストごとに延長
};
```

## 4. Auth0 と passport.js を使用した認証

- passport の authenticate('auth0') を使って Auth0 にリダイレクト
- 認証後、コールバックエンドポイント（/callback）でログイン処理を行う
- 認証が成功すると、req.user にユーザー情報が入る
- req.logIn(user, callback) を使ってセッションにログイン情報を保存する
- ログアウトは Auth0 のログアウト URL にリダイレクトする

## 5. 参考

- https://github.com/expressjs/session
- http://www.passportjs.org/
