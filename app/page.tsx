"use client";
import CardHome from "@/components/Home/Card";
import Provider from "@/components/provider";
import { Search } from "@/components/ui/Search";
import Navbar from "@/components/ui/navbar";
import supabase from "@/lib/supabase";
import { MoviesModelT } from "@/types/model";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, Suspense, useEffect, useState } from "react";

function Home() {
  const [movies, setMovies] = useState<MoviesModelT[] | null>(null);
  const router = useRouter();
  async function request() {
    const { data } = await supabase.from("movies").select();
    return data;
  }
  useEffect(() => {
    request().then((data) => setMovies(data));
  }, []);
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/?q=${value}`);
  }
  return (
    <Provider>
      <Navbar />

      {!movies ? (
        <h1 className="text-center text-2xl font-semibold">Loading...</h1>
      ) : (
        <>
          <Suspense>
            <Search handleChange={handleChange} setMovies={setMovies} />
          </Suspense>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {movies?.map((movie, idx) => (
              <CardHome key={idx} movie={movie} />
            ))}
          </div>
        </>
      )}
      <div className="p-5 md:p-10"></div>
    </Provider>
  );
}

export default Home;
