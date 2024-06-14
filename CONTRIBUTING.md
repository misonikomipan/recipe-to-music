# ブランチ

- **main**
    - 本番環境用
    - 直接のコミットは禁止。
- **dev**
    - 開発用
    - 全ての機能ブランチはここから分岐し、ここにマージされる。
- **feature**
    - 各開発者が機能開発やバグ修正用
    - 命名規則は `feature-<機能名>`
        - i.e., `feature-getRecipi`

## ブランチの作成方法

- 最新の`dev`ブランチからブランチを分岐
    
    ```
    git checkout dev
    git pull origin dev
    git checkout -b feature-<your-name>-<feature-name>
    ```

# プルリクエスト（PR）
## PRの作成

- 作業が完了したら、GitHub上で`dev`ブランチに対してPRを作成する
- PRの説明には、変更内容と関連するIssue番号（あれば）を記述する

## コードレビュー

- 各PRは少なくとも1人以上のチームメンバーによるレビューをすること
- コメントに対しては、積極的に対話をしよう
