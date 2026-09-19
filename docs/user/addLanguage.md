---
order: 110
icon: globe
---

# Select Languages

### Save user language preferences

Saves or updates the user's preferred languages.

+++ Request

HTTP

```bash
POST https://sparklines-backend.samay15jan.xyz/user/addLanguages
```

CURL

```bash
curl -X POST 'https://sparklines-backend.samay15jan.xyz/user/addLanguages' \
 -H 'Content-Type: application/json' \
 -d '{
   "languages": ["english", "hindi"],
   "userId": "abc123"
 }'
```

+++ Response

```json
{
  "status": "SUCCESS",
  "message": "Languages added successfully",
  "data": {
    "languages": ["english", "hindi"]
  }
}
```

+++

| Body Parameter                                | Description                         | Required                                |
| -------------------------------------------- | ----------------------------------- | --------------------------------------- |
| [!badge variant="contrast" text="languages"] | Array of selected languages         | [!badge variant="primary" text="True"]  |
| [!badge variant="contrast" text="userId"]    | Unique user ID                      | [!badge variant="primary" text="True"]  |
