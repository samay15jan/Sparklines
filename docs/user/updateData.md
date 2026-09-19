---
order: 140
icon: globe
---

# Update User Data

### Update username or profile picture

Allows an authenticated user to update their username or profile picture.

+++ Request

HTTP

```bash
POST https://sparklines-backend.samay15jan.xyz/user/updateData
```

CURL

```bash
curl -X POST 'https://sparklines-backend.samay15jan.xyz/user/updateData' \
 -H 'Authorization: Bearer YOUR_JWT_TOKEN' \
 -H 'Content-Type: application/json' \
 -d '{
   "username": "newUsername",
   "profilePic": "https://cdn.cloud/new-pic.jpg",
   "userId": "abc123"
 }'
```

+++ Response

```json
{
  "status": "SUCCESS",
  "message": "User data updated successfully",
  "data": {
    "username": "newUsername",
    "profilePic": "https://cdn.cloud/new-pic.jpg"
  }
}
```

+++

| Body Parameter                                   | Description                        | Required                                |
| ------------------------------------------------ | ---------------------------------- | --------------------------------------- |
| [!badge variant="contrast" text="username"]      | New username                      | [!badge variant="primary" text="False"] |
| [!badge variant="contrast" text="profilePic"]    | New profile picture URL           | [!badge variant="primary" text="False"] |
| [!badge variant="contrast" text="userId"]        | Unique user ID                    | [!badge variant="primary" text="True"]  |
