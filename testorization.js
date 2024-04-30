// the client id from github
const client_id = "9d73905a903015abf5f249a7e899a4ddb725f15d"

// create a CSRF token and store it locally
const state = crypto.randomBytes(16).toString("hex");
localStorage.setItem("latestCSRFToken", state);
    
// redirect the user to github
const link = `https://github.com/login/oauth/authorize?client_id=${client_id}&response_type=code&scope=repo&redirect_uri=${window.location.origin}/integrations/github/oauth2/callback&state=${state}`;
window.location.assign(link);

/////////////////////////

const { code, state: oauthState } = queryString.parse(router.asPath.split("?")[1]);

// validate the state parameter
if (state !== localStorage.getItem("latestCSRFToken")) {
    localStorage.removeItem("latestCSRFToken");
    // send the code to the backend
    const res = await axios.post("/api/oauth-token", {
      code
    });
  }
  

//////////////////////

const res = await axios.get(
    "https://github.com/login/oauth/access_token", 
    {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: code,
        redirect_uri: `http://localhost:8080/integrations/github/oauth2/callback`,
      },
      headers: {
        "Accept": "application/json",
        "Accept-Encoding": "application/json",
      },
    }
  );
  
  const access_token = res.data.access_token;