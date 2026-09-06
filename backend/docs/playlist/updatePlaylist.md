---
order: 60
icon: log
---

# Update Playlist Songs

### Add or remove songs in a specific playlist

This endpoint allows modifying songs inside a playlist.

+++ Request

HTTP

```bash
POST https://sparklines-backend.samay15jan.xyz/user/updatePlaylistSongs
```

CURL

```bash
curl -X POST 'https://sparklines-backend.samay15jan.xyz/user/updatePlaylistSongs' \
 -H 'Content-Type: application/json' \
 -d '{
   "data": {
     "id": "song456",
     "title": "Lo-fi Study"
   },
   "action": "add",
   "userId": "abc123"
 }'
```

+++ Response

```json
{
  "status": "SUCCESS",
  "message": "Playlist songs updated",
  "data": {
    ...
  }
}
```

+++

| Body Parameter                                | Description                                | Required                                |
| -------------------------------------------- | ------------------------------------------ | --------------------------------------- |
| [!badge variant="contrast" text="songData"]  | Song object to add/remove                  | [!badge variant="primary" text="True"]  |
| [!badge variant="contrast" text="action"]    | `"add"` or `"remove"`                      | [!badge variant="primary" text="True"]  |
| [!badge variant="contrast" text="userId"]    | Unique user ID                             | [!badge variant="primary" text="True"]  |
