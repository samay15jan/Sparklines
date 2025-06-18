---
order: 190
icon: log
---

# Manage Playlists

### Add or remove a playlist from user's collection

This endpoint allows adding or removing playlists.

+++ Request

HTTP

```bash
POST https://sparklines-backend.samay15jan.xyz/user/managePlaylists
```

CURL

```bash
curl -X POST 'https://sparklines-backend.samay15jan.xyz/user/managePlaylists' \
 -H 'Content-Type: application/json' \
 -d '{
   "playlistData": {
     "id": "playlist123",
     "name": "Chill Beats"
   },
   "action": "add",
   "userId": "abc123"
 }'
```

+++ Response

```json
{
  "status": "SUCCESS",
  "message": "Playlist updated successfully",
  "data": {
    ...
  }
}
```

+++

| Body Parameter                                  | Description                                | Required                                |
| ---------------------------------------------- | ------------------------------------------ | --------------------------------------- |
| [!badge variant="contrast" text="playlistData"]| Playlist object                            | [!badge variant="primary" text="True"]  |
| [!badge variant="contrast" text="action"]      | `"add"` or `"remove"`                      | [!badge variant="primary" text="True"]  |
| [!badge variant="contrast" text="userId"]      | Unique user ID                             | [!badge variant="primary" text="True"]  |
