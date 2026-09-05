---
order: 70
icon: history
---

# Update Recently Played

### Add a song to user's recently played list

This endpoint adds a song to the user's recently played list.

+++ Request

HTTP

```bash
POST https://sparklines-backend.samay15jan.xyz/user/updateRecentlyPlayed
```

CURL

```bash
curl -X POST 'https://sparklines-backend.samay15jan.xyz/user/updateRecentlyPlayed' \
 -H 'Content-Type: application/json' \
 -d '{
   "data": {
     "id": "song123",
     "title": "Sample Song"
   },
   "action": "add",
   "userId": "abc123"
 }'
```

+++ Response

```json
{
  "status": "SUCCESS",
  "message": "Recently played updated",
  "data": {
    ...
  }
}
```

+++

| Body Parameter                                | Description                          | Required                                |
| -------------------------------------------- | ------------------------------------ | --------------------------------------- |
| [!badge variant="contrast" text="data"]  | Song object to be added              | [!badge variant="primary" text="True"]  |
| [!badge variant="contrast" text="action"]    | Should be `"add"`                    | [!badge variant="primary" text="True"]  |
| [!badge variant="contrast" text="userId"]    | Unique user ID                       | [!badge variant="primary" text="True"]  |
