import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/ModeToggle";



export default function Home() {
  return (
    <div>
            <SignedOut>
              <SignInButton>
                <Button variant="outline">Sign In</Button>
              </SignInButton>
              <SignUpButton />
            </SignedOut>
            <ModeToggle/>
    </div>
  );
}
