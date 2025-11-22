# ドキュメント

## 開発フロー

### 1. Issue の作成

1. Issue を作成してください。
2. Assignees で担当者を指定してください。
3. Projects で GitHub Projects のタスクに紐付けてください。
4. Issue の対応時期をチームで決定してください。

#### バグ報告の際の注意

- バグや表示崩れに関しては、Issue タイプを「Bug report」としてください。
- 実装途中にバグを発見した場合でも、個別に Issue を作成してください。
- 必要であればミーティングで修正対応を議論します。

### 2. Branch

#### ブランチ命名規則（`プレフィックス/カテゴリ/内容`の形式）

- **プレフィックス（対象）**
  - `fe`: フロントエンド
  - `be`: バックエンド

- **カテゴリ**
  - `feature`: 機能追加
  - `fix`: リファクタリングや軽微な修正
  - `bug`: バグ修正

※ 該当項目がない場合は適宜追加

**＜例＞**

```
git checkout -b 'fe/feature/todotop_layout'
git checkout -b 'fe/fix/todotop_layout'
git checkout -b 'fe/bug/todotop_layout'
```

### 3. Commit

#### コミットメッセージルール

- 日本語もしくは英語で、**何をしたかが明確にわかる内容**にしてください。

**＜例＞**

```
git commit -m 'Top画面を作成'
git commit -m 'Add top page layout'
```

### 4. PullRequest

#### 1. プルリクエスト前に行うこと

- プルリクエストを上げる前に必ず、自分が作業を行なっているブランチで `git pull origin main` を行うこと。
- コンフリクトが発生した場合は、ローカル上で解決してください。解決の仕方がわからない場合は、メンバーに相談する。

#### 2. パッケージ更新の確認

- package に更新がないか、確認するため、 `npm install` コマンドを実行する。<br/>
  `found 0 vulnerabilities` と表示されれば OK。

#### 3. プルリクエスト作成時のルール

- `main` ブランチへのマージを作成してください。
- Issue 番号を必ず紐づけてください（例: `#12`）。
- Assignees にレビュー担当者を指定してください。
- PR 内でメンションし、Slack でレビュー依頼してください。

#### 4. マージルール

- マージ時は **`Squash and merge`** を選択。
- `Merge pull request` は使用しないでください。

## 使用技術

### フロントエンド

- [HTML](https://developer.mozilla.org/ja/docs/Web/HTML)
- [CSS](https://developer.mozilla.org/ja/docs/Web/CSS)
- [JavaScript](https://developer.mozilla.org/ja/docs/Web/JavaScript)
- [TypeScript](https://www.typescriptlang.org)
- [React.js](https://ja.react.dev)
- [Next.js](https://nextjs.org)

### バックエンド

- [Supabase](https://supabase.com)

### インフラ

- [Vercel](https://vercel.com)

### ツール

- [GitHub](https://github.co.jp)

## 言語 / パッケージ

- [Node.js](https://nodejs.org/ja)
- [npm](https://docs.npmjs.com/cli/v10/commands/npm-version)
