import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";



passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/api/v1/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done)=>{
        try {
            return done(null,profile)
            } catch (error) {
            return done(error, null);
            }
        }    
    )
)

passport.serializeUser((user, done) => {
    done(null, user);
  });
  
passport.deserializeUser((obj, done) => {
    done(null, obj);
  });


export default passport;


