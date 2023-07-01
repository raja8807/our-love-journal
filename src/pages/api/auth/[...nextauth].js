import { connectMongoDB } from "@/libs/mongoConnect";
import User from "@/models/UserModel";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        // userName : {label : 'User Name', placeholder:'User Name'},
        // password : {label : 'Password', placeholder:'Password'}
      },
      async authorize(credentials, req) {
        const { userName, password } = credentials;

        try {
          const connection = await connectMongoDB();
          if (connection) {
            const user = await User.findOne({ user_name: userName });
            if (user) {
              if (user.password === password) {
                return user;
              } else {
                throw new Error(JSON.stringify({ password: "Wrong Password" }));
              }
            } else {
              throw new Error(JSON.stringify({ userName: "User Not Found" }));
            }
          } else {
            throw new Error(
              JSON.stringify({ userName: "Something went wrong" })
            );
          }
        } catch (err) {
          //   console.log(Object.keys(err));
          throw new Error(err.message);
        }
      },
    }),
  ],
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin/",
    signOut: "/",
    // error:'/auth/signin'
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  //     async session({ session, token, user }) {
  //       // Send properties to the client, like an access_token and user id from a provider.
  //       session.accessToken = token.accessToken;
  //       session.user.id = token.id;

  //       return session;
  //     },

  //     async jwt({ token, account, profile }) {
  //       // Persist the OAuth access_token and or the user id to the token right after signin
  //       if (account) {
  //         token.accessToken = account.access_token;
  //         token.id = profile.id;
  //       }
  //       return token;
  //     },
  //   },
});
