---
order: 130
icon: upload
---

# Image Uploader

## Upload profile picture to Cloudinary

Uploads an image file to Cloudinary and returns the uploaded image URL.

+++ Request

HTTP

```bash
POST https://sparklines-backend.samay15jan.xyz/user/imageUploader
```

CURLstatus: globalConstants.status.success, message: 'Successfully uploaded', data: autoCropUrl

```bash
curl -X POST 'https://sparklines-backend.samay15jan.xyz/user/imageUploader' \
 -H 'Content-Type: application/json' \
 -d '{
   "profilePic": "base64EncodedImageData"
 }'
```

+++ Response

```json
{
  "status": "SUCCESS",
  "message": "Image uploaded successfully",
  "data": {
    "url": "https://cdn.cloudinary.com/image.jpg"
  }
}
```

+++

| Body Parameter                                  | Description                          | Required                                |
| ---------------------------------------------- | ------------------------------------ | --------------------------------------- |
| [!badge variant="contrast" text="profilePic"]  | Base64-encoded image string          | [!badge variant="primary" text="True"]  |
