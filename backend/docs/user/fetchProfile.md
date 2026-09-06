---
order: 150
icon: globe
---

# Get User Data

### Fetch authenticated user's profile

Fetch the profile information of a logged-in user using a valid JWT token.

+++ Request

HTTP

```bash
GET https://sparklines-backend.samay15jan.xyz/user/profile
```

CURL

```bash
curl -X GET 'https://sparklines-backend.samay15jan.xyz/user/profile' \
 -H 'Authorization: Bearer YOUR_JWT_TOKEN' \
 -H 'Content-Type: application/json'
```

+++ Response

```json
{
  "status": "SUCCESS",
  "message": "User profile fetched successfully",
  "data": {
    "id": "abc123",
    "email": "user@example.com",
    "username": "username_here",
    "profilePic": "https://cdn.cloud/image.jpg",
    "languages": ["english", "hindi"]
  }
}
```

+++

| Header Parameter                                   | Description                          | Required                                |
| ------------------------------------------------- | ------------------------------------ | --------------------------------------- |
| [!badge variant="contrast" text="Authorization"]  | Bearer token (JWT)                   | [!badge variant="primary" text="True"]  |
