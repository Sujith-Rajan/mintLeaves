import { PrismaClient, User } from "@prisma/client";
import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";


const prisma = new PrismaClient();

interface ExtendedUser extends User {
    newUser?: User;
  }

const Google_Client_Id = process.env.GOOGLE_CLIENT_ID;
const Google_Client_Secret = process.env.GOOGLE_CLIENT_SECRET;

passport.serializeUser((user: any, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: Google_Client_Id as string,
      clientSecret: Google_Client_Secret as string,
      callbackURL: "http://localhost:8800/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile: Profile, done) => {
        
      try {
        const existingUser = await prisma.user.findUnique({
          where: { id: profile.id },
        });
        if (existingUser) {
          return done(null, {newUser:existingUser} as ExtendedUser);
        }

        const newUser = await prisma.user.create({
          data: {
            id: profile.id,
            email: profile.emails?.[0]?.value || "",
            password: "",
            fullname: profile.displayName || "",
            avatar: profile.photos?.[0]?.value || "",
            phone: "",
            role: "USER",
          },
        });

        done(null,{newUser:newUser} as ExtendedUser );
      } catch (err: any) {
        done(err);
      }
    }
  )
);

export default passport



