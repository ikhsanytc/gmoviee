"use client";
import { LinkNavbar } from "@/types/main";
import { Menu } from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";
import ToggleTheme from "./toggle-theme";
import { useTheme } from "next-themes";
import { Button } from "./button";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabase";
import { useRouter } from "next/navigation";

function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  const { setTheme, theme } = useTheme();
  const links: LinkNavbar[] = [
    {
      display: "Home",
      link: "/",
    },
    {
      display: "Request film",
      link: "/requestFilm",
    },
    {
      display: "Report Bug",
      link: "/reportBug",
    },
  ];
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setIsAdmin(true);
      }
    });
  }, []);
  async function logout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
  }
  return (
    <>
      <nav className="inset-x-0 bg-white z-40 top-0 fixed shadow dark:bg-gray-900 bg-opacity-90 backdrop-filter backdrop-blur">
        <div className="h-14 dark:text-white flex justify-between items-center px-4">
          <Link href="/">
            <h1 className="text-3xl font-bold border-b-[3px] dark:border-b-blue-800 border-b-yellow-500">
              GMoviee
            </h1>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Menu className="block lg:hidden" />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>GMoviee</SheetTitle>
                <div className="border-b-[3px] dark:border-b-blue-800 border-b-yellow-500"></div>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-3">
                {links.map((link, idx) => (
                  <Button variant="default" key={idx} asChild>
                    <Link href={link.link}>{link.display}</Link>
                  </Button>
                ))}
                {isAdmin && (
                  <>
                    <Button variant="default" asChild>
                      <Link href="/admin">Admin Page</Link>
                    </Button>
                    <Button variant="default" asChild>
                      <a onClick={logout} className="cursor-pointer">
                        Logout
                      </a>
                    </Button>
                  </>
                )}
                <ToggleTheme theme={theme} setTheme={setTheme} />
              </div>
              <div className="fixed bottom-0 right-4">
                <h1 className="font-bold md:text-2xl text-xl">
                  Created By Ikhsan
                </h1>
              </div>
            </SheetContent>
          </Sheet>
          <div className="hidden lg:flex gap-7 items-center">
            {links.map((link, idx) => (
              <Link
                key={idx}
                href={link.link}
                className="font-semibold hover:border-b-2 dark:hover:border-b-blue-500 hover:border-b-yellow-400"
              >
                {link.display}
              </Link>
            ))}
            {isAdmin && (
              <>
                <Link
                  href="/admin"
                  className="font-semibold hover:border-b-2 cursor-pointer dark:hover:border-b-blue-500 hover:border-b-yellow-400"
                >
                  Admin Page
                </Link>
                <a
                  onClick={logout}
                  className="font-semibold hover:border-b-2 cursor-pointer dark:hover:border-b-blue-500 hover:border-b-yellow-400"
                >
                  Logout
                </a>
              </>
            )}
            <ToggleTheme theme={theme} setTheme={setTheme} size="icon" />
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
