"use client";
import CardHome from "@/components/Home/Card";
import Provider from "@/components/provider";
import Navbar from "@/components/ui/navbar";
import supabase from "@/lib/supabase";
import { MoviesModelT } from "@/types/model";
import { useEffect, useState } from "react";

async function request() {
  const { data } = await supabase.from("movies").select();
  return data;
}

function Home() {
  const [movies, setMovies] = useState<MoviesModelT[] | null>();
  useEffect(() => {
    request().then((data) => setMovies(data));
  }, []);
  return (
    <Provider>
      <Navbar />
      {!movies && (
        <h1 className="text-center text-2xl font-semibold">Loading...</h1>
      )}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {movies?.map((movie, idx) => (
          <CardHome key={idx} movie={movie} />
        ))}
      </div>
      <div className="p-5 md:p-10"></div>
    </Provider>
  );
}

export default Home;
