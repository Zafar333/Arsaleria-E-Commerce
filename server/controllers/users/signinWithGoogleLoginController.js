const { pool } = require("../../database/db");
const { createJwtAccessToken } = require("../../middleware/userJwtTokens/createJwtAccessToken");
const { createJwtRefreshToken } = require("../../middleware/userJwtTokens/createJwtRefreshToken");
const { verifyGoogleToken } = require("../../middleware/verifySigninWithGoogleToken/verifyGoogleToken");
require("dotenv").config()
const signinWithGoogleLoginController = async (req, res) => {
    const { userRefreshtoken, userAccessToken } = req?.cookies

    const client = await pool.connect()
    try {
        await client.query("BEGIN");
        if (userRefreshtoken && userAccessToken) {
            return res.json({ status: 401, message: "you are already login" })
        }
        let { idToken } = req?.body
        // console.log("google token",idToken)
        // if()
        // 1. Verify token with Google
        if (!idToken) {
            return res.send({ status: 400, message: "google token invalid credentials" })
        }
        const payload = await verifyGoogleToken(idToken);
        //  console.log("hello iam google",payload)
        if (!payload) {
            return res.json({ status: 401, message: "payload Invalid credentals" })
        }
        if (!payload?.email_verified) {
            return res.json({
                status: 403,
                message: "Email is not valid",
            });
        }
        // console.log("payload", payload);
        const { email, name, picture, sub: googleId } = payload;


        // 2. Check user in DB
        let user = await client.query("SELECT id, email FROM users WHERE email=$1", [email]);

        if (user?.rows?.length > 0) {

            console.log("email is find")

            // 3. Generate JWT
            const accesstoken = await createJwtAccessToken(user, process.env.USER_JWT_ACCESS_TOKEN_SECRET_KEY)
            const refreshtoken = await createJwtRefreshToken(user, process.env.USER_JWT_REFRESH_TOKEN_SECRET_KEY)
            if (!refreshtoken || !accesstoken) {
                return res.json({ status: 500, message: "server error" })
            }
            // console.log("user is already avialble", user?.rows[0])
            const data = await client.query(`UPDATE users SET image=$1, google_id=$2, user_jwt_refereshToken=$3 WHERE id=$4 `,
                [picture, googleId, refreshtoken, user?.rows[0]?.id])
            // return res.json({ status: 200, message: "user is already login" })
            if (data?.rowCount == 0) {
                return res.json({ status: 500, message: "server error" })

            }

            // 4. Set secure cookies
            res.cookie("userRefreshtoken", refreshtoken, {
                httpOnly: true,   // prevent XSS attacks
                secure: false,    // true in production (HTTPS)
                sameSite: "lax",  // CSRF protection
                // maxAge: 24 * 60 * 60 * 1000 // 1 day
            });
            res.cookie("userAccessToken", accesstoken, {
                httpOnly: true,   // prevent XSS attacks
                secure: false,    // true in production (HTTPS)
                sameSite: "lax",  // CSRF protection
                // maxAge: 24 * 60 * 60 * 1000 // 1 day
            });
            await client.query("COMMIT");
            return res.json({
                status: 200,
                message: "user login succesfully",
            });


        }


            console.log("email is not found")
            
        //  console.log("email not found", email, name, picture,googleId)
        user = await client.query(`INSERT INTO users (name, email, image, google_id) VALUES ($1, $2, $3, $4) RETURNING * `,
            [name, email, picture, googleId])


        // 3. Generate JWT
        const accesstoken = await createJwtAccessToken(user, process.env.USER_JWT_ACCESS_TOKEN_SECRET_KEY)
        const refreshtoken = await createJwtRefreshToken(user, process.env.USER_JWT_REFRESH_TOKEN_SECRET_KEY)
        if (!refreshtoken || !accesstoken) {
            return res.json({ status: 500, message: "server error" })
        }
        // console.log("id", user?.rows)
        const data = await client.query(`UPDATE users SET user_jwt_refereshToken=$1 WHERE id=$2 `,
            [refreshtoken, user?.rows[0]?.id])
        // return res.json({ status: 200, message: "user is already login" })
        if (data?.rowCount == 0) {
            return res.json({ status: 500, message: "server error" })

        }


        // 4. Set secure cookies
        res.cookie("userRefreshtoken", refreshtoken, {
            httpOnly: true,   // prevent XSS attacks
            secure: false,    // true in production (HTTPS)
            sameSite: "lax",  // CSRF protection
            // maxAge: 24 * 60 * 60 * 1000 // 1 day
        });
        res.cookie("userAccessToken", accesstoken, {
            httpOnly: true,   // prevent XSS attacks
            secure: false,    // true in production (HTTPS)
            sameSite: "lax",  // CSRF protection
            // maxAge: 24 * 60 * 60 * 1000 // 1 day
        });
        await client.query("COMMIT");
        return res.json({
            status: 200,
            message: "user login succesfully",
        });

    } catch (error) {
        await client.query("ROLLBACK");
        console.log("catch block", error?.message)
        return res.json({ status: 500, message: "server error" })
    } finally {
        client.release();
    }

}

module.exports = { signinWithGoogleLoginController }