import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import config from "../config/config"
import user from "../models/user";

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret as string
};

export default new Strategy(opts, async (payload, done) => {
    try {
        const existingUser = await user.findById(payload.id);

        if (existingUser) {
            return done(null, existingUser)
        }
        return done(null, false)
    } catch (error) {
        console.log(error)
    }

});