export default function userData() {
  const userId = localStorage.getItem('userId')
  const email = localStorage.getItem('email')
  const username = localStorage.getItem('username')
  const profilePic = localStorage.getItem('profilePic')
  const languages = localStorage.getItem('languages')

  return {
    userId: userId,
    email: email,
    username: username,
    profilePic: profilePic,
    languages: languages,
  }
}
