"use client"; 

import { Button } from "@/components/ui/button";
import { signOut } from "../../app/(auth)/login/action";


export default function SignOutButton() {
  return (
    <Button className="flex gap-2" onClick={() => {signOut()}}>
      Sign Out
    </Button>
  );
}
