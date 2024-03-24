# SparkLines - A Music Steaming platform

### TODO:
- ~~ask for language and atleast 3 artists~~
- ~~User auth with (mongodb, jwt, express, mongoose, bcrypt)~~
- ~~profile image uploader (cloudinary)~~
- ~~save languages to database~~
- ~~Top realtime search bar like in designs~~
- liked music, playlist, albums, currently playing, queue, recently played schemas(seperate)
- HomePageContent Schema = popular artists, albums, trending, charts, playlists and recently played.

UI DESIGN
- auto play next song with keyboard shortcuts
- bottom music player (song details, progress bar, play, pause, next, back, shuffle, repeat, volume, queue, like)
- full ambient color based on album or music art (color thief)
- home button, liked songs, created/saved playlists and albums, following artist
- profile dropdown (email display, logout, github, dark/light theme switcher, music language changer, username changer)
- Homescreen with popular artists, albums, trending, charts, playlists and recently played
- Albums and playlist page with like, shuffle, play, sort and save button
- currently playing song card with details (right)
- Synced lyrics (kinda scroll)
- Landing page


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
