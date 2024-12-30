const {Strategy:JwtStrategy,ExtractJwt}  = require('passport-jwt');
const passport  = require('passport');
const {User} = require("../models/user");

// Options for JWT Strategy

const options = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey :  process.env.SECRET_KEY
}
// Setting up the JWT strategy for Passport 
// this is uploaeded to the passport middleware
passport.use(
    new JwtStrategy(options,async (jwt_payload,done)=>{
        try{
                const user = await User.findByPk(jwt_payload.id);
                if(user)
                {
                    return done(null,user)
                }
                return done(null,false)
        }
        catch(error)
        {
            return done(error,false)
        }
    })
)

module.exports = passport;
