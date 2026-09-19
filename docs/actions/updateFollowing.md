---
order: 80
icon: plus
---

# Update Following

### Follow or Unfollow an artist

Used to manage following artists for a user.

+++ Request

HTTP

```bash
POST https://sparklines-backend.samay15jan.xyz/user/updateFollowing
```

CURL

```bash
curl -X POST 'https://sparklines-backend.samay15jan.xyz/user/updateFollowing' \
 -H 'Content-Type: application/json' \
 -d '{
   "data": {
     "id": "id",
     "name": "Sample Name",
     "url": "URL"
   },
   "action": "add",
   "userId": "abc123"
 }'
```

+++ Response

```json
{
  "status": "SUCCESS",
  "message": "Updated Following Artists",
  "data": {
    ...
  }
}
```

+++

| Body Parameter                                | Description                                | Required                                |
| -------------------------------------------- | ------------------------------------------ | --------------------------------------- |
| [!badge variant="contrast" text="songData"]  | Artist object to add or remove               | [!badge variant="primary" text="True"]  |
| [!badge variant="contrast" text="action"]    | `"add"` or `"remove"`                      | [!badge variant="primary" text="True"]  |
| [!badge variant="contrast" text="userId"]    | Unique user ID                             | [!badge variant="primary" text="True"]  |
