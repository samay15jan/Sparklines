---
order: 100
icon: lock
---

# Register

### Create a new user

Register a new user using their email and password.

+++ Request

HTTP

```bash
POST https://sparklines-backend.samay15jan.xyz/auth/register
```

CURL

```bash
curl -X POST 'https://sparklines-backend.samay15jan.xyz/auth/register' \
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
  "message": "User registered successfully",
  "data": "null",
}
```

+++

| Body Parameter                                | Description                | Required                                |
| -------------------------------------------- | -------------------------- | --------------------------------------- |
| [!badge variant="contrast" text="email"]      | Email address of the user  | [!badge variant="primary" text="True"]  |
| [!badge variant="contrast" text="password"]   | Password for the account   | [!badge variant="primary" text="True"]  |
