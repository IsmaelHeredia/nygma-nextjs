import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "username" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {

                const res = await fetch(
                  "api/ingreso",
                  {
                    method: "POST",
                    body: JSON.stringify({
                      username: credentials?.username,
                      password: credentials?.password,
                    }),
                    headers: { "Content-Type": "application/json" },
                  }
                );
        
                const user = await res.json();
                
                return user;
            },
        }),
    ],
});

export { handler as GET, handler as POST };