import NextAuth from "next-auth";
import KakaoProvider from "next-auth/providers/kakao"


export const {
    handlers: { GET, POST},
    auth,
    signIn
} = NextAuth({
    pages: {
        signIn: "/signin",
      
    },
    providers: [
        KakaoProvider({
            clientId: process.env.KAKAO_CLIENT_ID,
            clientSecret: process.env.KAKAO_CLIENT_SECRET
        })
    ],
    callbacks: {
        async signIn({user, account, profile, email, credentials}) {
            console.log("user", user, account, profile, email, credentials)
            return true
        }
    }
    
})