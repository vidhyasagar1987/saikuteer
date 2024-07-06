import { Contact } from "@/components/constants";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SignOutButton from "../ui/SignOutButton";

export default async function Header() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="p-6 px-10 flex justify-between shadow-sm fixed top-0 w-full z-10 bg-white">
      <div className="flex gap-10 items-center">
        <Link href={"/"}>
          <Image src={"/next.svg"} width={150} height={150} alt="logo" />
        </Link>
        <ul className="hidden md:flex gap-10">
          <Link href={"/about-saikuteer"}>
            <li
            // className={`"hover:text-primary font-medium text-sm cursor-pointer" ${
            //   path === "/about-saikuteer" && "text-primary"
            // }`}
            >
              About Us
            </li>
          </Link>

          <Link href={"/listings"}>
            <li
            // className={`"hover:text-primary font-medium text-sm cursor-pointer" ${
            //   path === "/listings" && "text-primary"
            // }`}
            >
              Listings
            </li>
          </Link>
          <Link href={"/contact-saikuteer"}>
            <li
            // className={`"hover:text-primary font-medium text-sm cursor-pointer" ${
            //   path === "/contact-saikuteer" && "text-primary"
            // }`}
            >
              {Contact}
            </li>
          </Link>
        </ul>
      </div>

      <div>
        {user !== null ? (
          <div>
            <p>Admin</p>

            <SignOutButton />
          </div>
        ) : (
          <Link href={"/login"}>
            <Button className="flex gap-2">Login</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
