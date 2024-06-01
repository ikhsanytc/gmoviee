"use client";
import Provider from "@/components/provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Navbar from "@/components/ui/navbar";
import supabase from "@/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Admin() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push("/admin/login");
        return;
      }
      setIsAdmin(true);
    });
  }, []);
  return (
    <Provider>
      <Navbar />
      {isAdmin ? (
        <>
          <h1 className="font-semibold text-2xl">Welcome, admin!</h1>
          <p className="text-lg dark:text-gray-500 text-gray-700">
            This is a feature of admin.
          </p>
          <div className="grid mt-10 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <Card className="shadow">
              <CardHeader>
                <CardTitle>Add movie.</CardTitle>
                <CardDescription>
                  This function is used to add film or movie to the films/movies
                  list.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  You can add films/movies according to what you want, there is
                  an emdbed link taken from{" "}
                  <Link
                    href="https://gdriveplayer.to/"
                    className="hover:underline"
                    target="_blank"
                  >
                    Gdriveplayer.to
                  </Link>
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link href="/admin/addMovie">See</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card className="shadow">
              <CardHeader>
                <CardTitle>Edit movie</CardTitle>
                <CardDescription>
                  This function is used to edit movie.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  You can edit a film/movie based on the slug and film/movie ID
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link href="/admin/editMovie">See</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card className="shadow">
              <CardHeader>
                <CardTitle>Delete movie</CardTitle>
                <CardDescription>
                  This function is used to delete movie by id.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>You can delete movie by it&apos;s id</p>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link href="/admin/deleteMovie">See</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </>
      ) : (
        <h1 className="text-center text-2xl font-semibold">Loading...</h1>
      )}
      <div className="p-5"></div>
    </Provider>
  );
}

export default Admin;
