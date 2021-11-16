import NextAuth from "next-auth";
import dbConnect from "../../../utils/mongoose";
import User from "../../../models/user";
import Sesion from "../../../models/sesion";
import Providers from "next-auth/providers";

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: "credentials",
      credentials: {
        pass: { label: "pass", type: "text" },
      },
      authorize: async ({ pass }) => {
        if (pass) {
          if (pass == process.env.pass_DJ) {
            await dbConnect()
            let ses = await Sesion.create({user: 'dj', time_started: Date.now()})
            return { email: "dj" };
          }
          if (pass == process.env.pass_VL) {
            await dbConnect()
            let ses = await Sesion.create({user: 'vl', time_started: Date.now()})
            return { email: "vl" };
          }
        } else {
          return false;
        }
      },
    }),
  ],
  session: {
    jwt: true,
    maxAge: 0.5 * 60 * 60, // 6 hours
  },
  callbacks: {
    async jwt(token, user, account, profile, isNewUser) {
      
      if (token.email == "vl") {
        token.admin = true;
      }
      if (token.email == "dj") {
        token.admin = false;
      }

      return token;
    },

    async session(session, token) {
      session.user.admin = token.admin;
      return session;
    },
  },
});
