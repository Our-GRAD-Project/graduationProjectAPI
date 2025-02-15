import passport from "passport";


export const requestGoogle =
    passport.authenticate("google", { scope: ["profile", "email"] })


export const googleReturnCallback =
    passport.authenticate("google", { session: false })
