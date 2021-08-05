export default function oauthSignIn () {
  if (localStorage.getItem('token') !== null && localStorage.getItem('token') !== '') {
    return
  }
  window.location.replace('https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?client_id=730238512168-pgr60ctbsr1nmum9hcp8lh2jmdnhol51.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A8081%2Ftoday&response_type=token&scope=openid%20profile%20email&include_granted_scopes=true&prompt=select_account&flowName=GeneralOAuthFlow')
  const fragmentString = location.hash.substring(1)
  const accessToken = fragmentString.slice(13, 176)
  localStorage.setItem('token', accessToken)
}
