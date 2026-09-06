# Trại Xanh — Chăn Nuôi

Game chăn nuôi (full engine từ Vườn Xanh), **internal code đã đổi hết** sang thuật ngữ chăn nuôi.

## Firebase

Project: `banhang-f7d5f` — xem `js/firebase-config.js`.

### Rules

Realtime Database → Rules → dán `database.rules.json` → Publish.

### Node RTDB chính

| Node | Mô tả |
|------|--------|
| `animals` | Danh sách động vật (admin seed) |
| `users` / `players` | Người chơi |
| `settings` | Cấu hình server |
| `playLogs`, `friends`, `messages`, `market`, `mail`, `leaderboard`, … | Như bản gốc |

## Internal rename (tóm tắt)

| Cũ (cây) | Mới (chăn nuôi) |
|----------|------------------|
| `DEFAULT_PLANTS` | `DEFAULT_ANIMALS` |
| `currentPlants` / `getPlant` | `currentAnimals` / `getAnimal` |
| `plantId` | `animalId` |
| `plantedAt` | `raisedAt` |
| `seedPrice` | `buyPrice` |
| `growTime` / `growStages` | `raiseTime` / `raiseStages` |
| `plots` / `plot` | `pens` / `pen` |
| `plotCount` / `plotPrice` | `penCount` / `penPrice` |
| `garden` | `farm` |
| `DEFAULT_FERTILIZERS` | `DEFAULT_FEEDS` |
| `fertilizerId` | `feedId` |
| `inventory.seeds` | `inventory.animals` |
| `stats.planted` | `stats.raised` |
| `plantSeed` / `plantMultiple` | `raiseAnimal` / `raiseMultiple` |
| Firebase `plants` | `animals` |

## Level 1–10000

Icon + danh hiệu chăn nuôi (egg → cow → horse → crown → trophy). Chi tiết trong `TREE_TIERS` (`js/app.js`).

## Chạy

```bash
npx serve .
```

Auth: bật Email/Password, thêm authorized domain, set `users/<UID>/role = "admin"` cho admin.
