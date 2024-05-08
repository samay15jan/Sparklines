# :musical_note: Sparklines API

An Unofficial JioSaavn API for downloading songs in 320kbps quality for free.

> NOTE: <https://saavn.me> is only meant to demo the API and has rate-limiting enabled to minimise bandwidth consumption. It is recommended to deploy your own instance on vercel for personal use.

## :sparkles: Features

- :rocket: Blazing fast
- :notes: Download High Quality Songs (320kbps).
- :sunrise: Download High quality song/album thumbnails.
- :mag_right: Search support for songs and albums.
- :musical_score: Lyrics for supported songs.
- :heart: Open-Source
- :cloud: Lightweight and has minimal dependencies.

## :mag_right: Usage

### For usage, see [Documentation](https://docs.saavn.me)

## :construction_worker: Local development

### Prerequisites

- NodeJS v14+
- Vercel CLI : To install Vercel CLI globally use `npm i -g vercel`

### Run locally

- Clone the Repo

  ```sh
  git clone https://github.com/sumitkolhe/jiosaavn-api

  cd jiosaavn-api
  ```

- Install the dependencies

  ```sh
  npm install
  ```

- Start development server

  ```sh
  npm start
  ```

### Variables:

`MONGODB_URI`, `SECRET_KEY`, `PORT`, `CLOUDINARY_NAME`,`CLOUDINARY_API`, `CLOUDINARY_API_SECRET`

### Backend Endpoints:

| Method | Endpoint             | Description                 | Parameters
| ------ | -------------------- | --------------------------- |-------------------
| POST   | /auth/register       | Create a new user           | email, password
| POST   | /auth/login          | Get auth token              | email, password
| GET    | /user/profile        | Authentication              | Authorization header (JWT token)
| POST   | /user/updateData     | Update Username/ProfilePic  | username, profilePic, userId
| POST   | /user/imageUploader  | Cloudinary Image Uploader   | profilePic
| POST   | /user/addLanguages   | Add Languages               | languages[], userId
| POST   | /token/generate      | Generate token for routes   | userId, expiry
| POST   | /user/addLanguages   | Add Languages               | languages[], userId


## ☁️ Host your own instance

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/sumitkolhe/jiosaavn-api)
