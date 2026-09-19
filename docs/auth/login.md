---
order: 90
icon: lock
---

# Login

### Authenticate user and receive JWT token

Log in an existing user using their email and password to receive an authentication token.

+++ Request

HTTP

```bash
POST https://sparklines-backend.samay15jan.xyz/auth/login
```

CURL

```bash
curl -X POST 'https://sparklines-backend.samay15jan.xyz/auth/login' \
 -H 'Content-Type: application/json' \
 -d '{
   "email": "user@example.com",
   "password": "yourPassword123"
 }'
```

+++ Response

```json
{
  "status": "SUCCESS",
  "message": "Login successful",
  "data": "JWT_TOKEN"
}
```

+++

| Body Parameter                                | Description                | Required                                |
| -------------------------------------------- | -------------------------- | --------------------------------------- |
| [!badge variant="contrast" text="email"]      | Email address of the user  | [!badge variant="primary" text="True"]  |
| [!badge variant="contrast" text="password"]   | Password for the account   | [!badge variant="primary" text="True"]  |
