# Data Model: CI/CDワークフロー

本機能は新たなデータモデルを導入しない。GitHub Actionsのワークフロー定義ファイル（YAML）のみを追加する。

## ワークフロー状態遷移

```
Triggered → Queued → In Progress → Success/Failure/Cancelled
```

- **Triggered**: Push/PR作成イベントにより発火
- **Queued**: 実行待ち（concurrencyグループにより古い実行はキャンセル）
- **In Progress**: ステップ実行中（checkout → setup → install → typecheck → lint → build）
- **Success**: 全ステップ成功
- **Failure**: いずれかのステップで失敗
- **Cancelled**: 同一PRの新しいPushにより自動キャンセル
