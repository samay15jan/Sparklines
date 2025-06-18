---
order: 100
icon: key
---

# Generate Token

### Generate API access token

Used to generate a token (e.g., for building Mobile apps, CLI/TUI etc).

+++ Request

HTTP

```bash
POST https://sparklines-backend.samay15jan.xyz/token/generate
```

CURL

```bash
curl -X POST 'https://sparklines-backend.samay15jan.xyz/token/generate' \
 -H 'Content-Type: application/json' \
 -d '{
   "userId": "abc123",
   "expiry": "30d"
 }'
```

+++ Response

```json
{
  "status": "SUCCESS",
  "message": "Token generated successfully",
  "data": {
    "apiKey": "JWT_TOKEN",
    "expiry": "'30d'",
  }
}
```

+++

| Body Parameter                                | Description                          | Required                                |
| -------------------------------------------- | ------------------------------------ | --------------------------------------- |
| [!badge variant="contrast" text="userId"]    | Unique user ID                       | [!badge variant="primary" text="True"]  |
| [!badge variant="contrast" text="expiry"]    | `24h` or `7d` or `30d` or `never` | [!badge variant="primary" text="True"]  |
