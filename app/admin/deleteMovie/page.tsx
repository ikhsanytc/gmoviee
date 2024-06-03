"use client";
import CardHome from "@/components/Home/Card";
import Provider from "@/components/provider";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/ui/navbar";
import supabase from "@/lib/supabase";
import { MoviesModelT } from "@/types/model";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

function DeletMovie() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("q") || "";
  const [isAdmin, setIsAdmin] = useState(false);
  const [movies, setMovies] = useState<MoviesModelT[] | null>();
  const router = useRouter();
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    router.push(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admin/deleteMovie/?q=${value}`
    );
  }
  async function request() {
    const { data } = await supabase
      .from("movies")
      .select()
      .ilike("title", `%${keyword}%`);
    return data;
  }
  useEffect(() => {
    request().then((data) => setMovies(data));
  }, [keyword]);
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push("/admin/login");
      } else {
        setIsAdmin(true);
      }
    });
  }, []);
  return (
    <Provider>
      <Navbar />
      {isAdmin && (
        <>
          <Input
            className="w-1/2 mx-auto mb-10"
            placeholder="Search Film..."
            onChange={handleChange}
            defaultValue={keyword}
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {movies?.map((movie, idx) => (
              <CardHome key={idx} movie={movie} deleteProp />
            ))}
          </div>
        </>
      )}
      <div className="p-6"></div>
    </Provider>
  );
}

export default DeletMovie;
