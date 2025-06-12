import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: process.env.NODE_ENV === "production" ? "https://chat-bot-blond-sigma-57.vercel.app/" : "http://localhost:3000"
});

export const {
    signIn,
    signUp,
    signOut,
    useSession,
    getSession
} = authClient
