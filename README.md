# SparkLines - A Music Steaming platform

### TODO:
- ~~ask for language and atleast 3 artists~~
- ~~User auth with (mongodb, jwt, express, mongoose, bcrypt)~~
- ~~profile image uploader (cloudinary)~~
- save languages and artists to database
- add more features in backend like library(liked music, created playlists, saved albums), currently playing music, queue, 10 recently played music(for recommendations later).
- merging with sparklines-backend(JioSaavn Api)
- Homescreen with 3 selected artists, albums, trending, charts, playlists and recently played
- Save 20 recently played music
- Top realtime search bar like in designs
- On search, artist, albums, song and playlist
- Albums and playlist page with like, shuffle, play, sort and save button
- auto play next song with key board shortcuts
- bottom music player (song details, progress bar, play, pause, next, back, shuffle, repeat, volume, queue, like)
- Music Playback (Web music api)
- Full ambient color based on album or music art (color thief)
- library page with liked songs, and albums
- settings page (logout, about, theme, music language)
- queue in right
- Synced lyrics (kinda scroll)
- lots of transparency
- focus on UI responsiveness
- Landing page


### Variables:

`MONGODB_URI`, `SECRET_KEY`, `PORT`, `CLOUDINARY_NAME`,`CLOUDINARY_API`, `CLOUDINARY_API_SECRET`

### Backend Endpoints:

#### Register:
Endpoint: /auth/register

    -Test-

    curl -X POST -H "Content-Type: application/json" -d '{"username":"Test","email":"test@example.com","password":"test12345"}' http://localhost:3000/auth/register


#### Login: 
Endpoint: /auth/login, /user/profile

    -Test-

    curl -X POST -H "Content-Type: application/json" -d '{"email":"test@example.com","password":"test12345"}' http://localhost:3000/auth/login

    curl -X GET -H "Authorization: Bearer {AUTHORIZATION_KEY}" http://localhost:3000/user/profile

#### Update Profile Pic: 
Endpoint: /auth/avatar

    -Test-

    curl -X POST -F 'avatar=@/{LOCATION}' -F 'userId={USER_ID}' http://localhost:3000/user/avatar
