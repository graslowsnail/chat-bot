"use client";

import { useSession, signIn, signOut} from "@/lib/auth-client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LogIn, Github } from "lucide-react"

export default function LoginPage() {
    const { data: session, isPending } = useSession();

    if(isPending) {
        return <div>Loading...</div>;
    }
    if(!session?.user) {
        return (
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => signIn.social({ provider: "github" })}
                    className="gap-2"
                >
                    <Github className="h-4 w-4" />
                    Sign in with GitHub
                </Button>
                <span className="text-muted-foreground mx-2">or</span>
                <form
                    className="flex flex-col gap-2 w-full max-w-xs"
                >
                    <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        autoComplete="email"
                        className="input input-bordered rounded-md px-3 py-2 border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        autoComplete="current-password"
                        className="input input-bordered rounded-md px-3 py-2 border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Button type="submit" variant="default" className="w-full gap-2">
                        <LogIn className="h-4 w-4" />
                        Sign in with Email
                    </Button>
                </form>
            </div>
        );
    }

}