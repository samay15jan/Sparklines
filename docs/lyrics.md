---
order: 210
icon: lyrics
---

# Get Lyrics

### Fetch lyrics for a specific song

Returns the lyrics for a song based on its name and optional artist name.

+++ Request

HTTP

```bash
GET https://sparklines-backend.samay15jan.xyz/lyrics?songName=Kesariya&artistName=Arijit%20Singh
```

CURL

```bash
curl -X GET 'https://sparklines-backend.samay15jan.xyz/lyrics?songName=Kesariya&artistName=Arijit%20Singh' \
 -H 'Content-Type: application/json'
```

+++ Response

```json
{
  "status": "SUCCESS",
  "message": "Lyrics fetched successfully",
  "data": {
    "lyrics": "Kesariya tera ishq hai piya...",
    "songName": "Kesariya",
    "artistName": "Arijit Singh"
  }
}
```

+++

| Query Parameter                                  | Description                          | Required                                |
| ------------------------------------------------ | ------------------------------------ | --------------------------------------- |
| [!badge variant="contrast" text="songName"]      | Name of the song                     | [!badge variant="primary" text="True"]  |
| [!badge variant="contrast" text="artistName"]    | Name of the artist (optional)        | [!badge variant="primary" text="False"] |
