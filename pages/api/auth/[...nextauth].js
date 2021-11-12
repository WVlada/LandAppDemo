import NextAuth from "next-auth";
import dbConnect from "../../../utils/mongoose";
import User from "../../../models/user";
import { useEventListenerMap } from "@chakra-ui/hooks";
import Providers from "next-auth/providers";

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: "credentials",
      credentials: {
        pass: { label: "pass", type: "text" },
      },
      authorize: async ({ pass }) => {
        console.log("password from input:", pass);
        if (pass) {
          if (pass == process.env.pass_DJ) {
            return { password: pass };
          }
          if (pass == process.env.pass_VL) {
            return { password: pass };
          }
        } else {
          return false
        }
      },
    }),
  ],
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt(token, user, account, profile, isNewUser) {
      //console.log("jwt called");
      //if (user && user.phone) {
      //  token.phone = user.phone;
      //  await dbConnect();
      //  let u = await User.findOne({ phone: user.phone });
      //  //
      //  let lastPayment;
      //  let lastWaiverSignature = "";
      //  let hasWaivedBefore = false;
      //  let payments = await Payment.find({ user: u });
      //  if (payments.length > 0) {
      //    lastPayment = payments[payments.length - 1];
      //    lastWaiverSignature = lastPayment.waiverSignature;
      //  }
      //  if (lastWaiverSignature.length > 2) {
      //    hasWaivedBefore = true;
      //  }
//
        token.name = "ewew";
      //  token.email = u.email || "";
      //  token.admin = u.admin;
      //  token.agent = u.agent;
      //  token.lastWaiverSignature = lastWaiverSignature;
      //  token.hasWaivedBefore = hasWaivedBefore;
      //  token.locale = u.locale || "en";
      //}
      return token;
    },

    async session(session, token) {
      console.log("session called");
      console.log(session);
      console.log(token);
      console.log("session called");
      //session.user.phone = token.phone;
      //session.user.justLogedIn = token.justLogedIN;
      //// the only way to show edituser changes in same session
      //await dbConnect();
      //let u = await User.findOne({ phone: token.phone });
      //session.user.name = u.name;
      //session.user.lastName = u.lastName;
      session.user = token.name;
      //session.user.agent = u.agent;
      //session.user.lastWaiverSignature = token.lastWaiverSignature;
      //session.user.hasWaivedBefore = token.hasWaivedBefore;
      //session.user.locale = token.locale;
      // the only way to show edituser changes in same session
      //console.log("session:");
      //console.log(session);
      //console.log("session.");
      return session;
    },
  },
});
