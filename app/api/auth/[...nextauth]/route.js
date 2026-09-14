import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
 import { MongoDBAdapter } from "@auth/mongodb-adapter";
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import clientPromise from "../../../services/database/db"; 
import bcrypt from "bcryptjs";
const providers = [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // 1. Establish database connection pool
        const client = await clientPromise;
        const db = client.db();
        
        // 2. Search for the user record by email
        const user = await db.collection("users").findOne({ 
          email: credentials?.email?.toLowerCase() 
        });
        
        // 3. Fail if user does not exist or has no password (e.g. Google-only accounts)
        if (!user || !user.password) {
          throw new Error("No user found with this email.");
        }

        // 4. Compare the submitted password with the hashed database password
        const passwordMatches = await bcrypt.compare(credentials.password, user.password);

        // 5. If it matches, return the user object (this signs them in)
        if (passwordMatches) {
          return { 
            id: user._id.toString(), 
            email: user.email, 
            name: user.name 
          };
        }
        
        // 6. Fail if password is wrong
        throw new Error("Invalid password.");
      }
    })
];

if (process.env.GOOGLE_ID && process.env.GOOGLE_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    })
  );
}

if (process.env.GITHUB_ID && process.env.GITHUB_SECRET) {
  providers.push(
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    })
  );
}

    
export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
  providers,
  pages: {
    signIn: '/login',
  },
  session: {
  strategy: "jwt",
},

callbacks: {
  async jwt({ token, user, trigger, session }) {
    // Runs when the user first signs in
    if (user) {
      token.id = user.id;
      token.name = user.name;
      token.email = user.email;
      token.picture = user.image;
    }

    // Runs when useSession().update() is called
    if (trigger === "update" && session) {
      token.name = session.name ?? token.name;
      token.picture = session.image ?? token.picture;
    }

    return token;
  },

  async session({ session, token }) {
    if (session.user) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.image = token.picture;
    }

    return session;
  },
},

};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
