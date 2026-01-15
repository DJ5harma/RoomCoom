import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { ENV_CONSTANTS } from "../constants/env.constants";

passport.use(
	new GoogleStrategy(
		{
			clientID: ENV_CONSTANTS.GOOGLE_CLIENT_ID,
			clientSecret: ENV_CONSTANTS.GOOGLE_CLIENT_SECRET,
			callbackURL: `${ENV_CONSTANTS.MY_URL}/api/auth/google/callback`,
		},
		function (accessToken, refreshToken, profile, cb) {
			console.log({ accessToken, refreshToken, profile });
			const { name, email, picture } = profile._json;
			return cb(null, { name, email, pictureUrl: picture });
		}
	)
);
