"use client";
import CardHome from "@/components/Home/Card";
import Provider from "@/components/provider";
import Navbar from "@/components/ui/navbar";
import supabase from "@/lib/supabase";
import { MoviesModelT } from "@/types/model";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "@/components/ui/Search";
import { ChangeEvent, Suspense, useEffect, useState } from "react";

function DeleteMovie() {
  // const searchParams = useSearchParams();
  // const keyword = searchParams.get("q") || "";
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
    const { data } = await supabase.from("movies").select();
    return data;
  }
  useEffect(() => {
    request().then((data) => setMovies(data));
  }, []);
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
          <Suspense>
            <Search handleChange={handleChange} setMovies={setMovies} />
          </Suspense>
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

export default DeleteMovie;
