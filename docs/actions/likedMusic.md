---
order: 90
icon: heart
---

# Update Liked Music

### Add or remove a song from user's liked music

Used to manage liked music for a user.

+++ Request

HTTP

```bash
POST https://sparklines-backend.samay15jan.xyz/user/updateLikedMusic
```

CURL

```bash
curl -X POST 'https://sparklines-backend.samay15jan.xyz/user/updateLikedMusic' \
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
  "message": "Liked music updated successfully",
  "data": {
    ...
  }
}
```

+++

| Body Parameter                                | Description                                | Required                                |
| -------------------------------------------- | ------------------------------------------ | --------------------------------------- |
| [!badge variant="contrast" text="data"]  | Song object to add or remove               | [!badge variant="primary" text="True"]  |
| [!badge variant="contrast" text="action"]    | `"add"` or `"remove"`                      | [!badge variant="primary" text="True"]  |
| [!badge variant="contrast" text="userId"]    | Unique user ID                             | [!badge variant="primary" text="True"]  |
