const { OAuth2Client } = require("google-auth-library");
require("dotenv").config()
// const redirect_url="http://localhost:4000/user/auth/google/callback"
const client = new OAuth2Client(process.env.SIGNIN_WITH_GOOGLE_CLIENT_ID);




const verifyGoogleToken = async (googleToken) => {
  
    try {

        const ticket = await client.verifyIdToken({
            idToken: googleToken,
            audience: process.env.SIGNIN_WITH_GOOGLE_CLIENT_ID,
        });

        //    return console.log("helllo",ticket); // user info
        return ticket.getPayload(); // user info

    } catch (error) {
        console.error("Invalid Google Token:", error.message);
        return null
    }
};

module.exports = { verifyGoogleToken }