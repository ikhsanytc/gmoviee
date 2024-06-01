"use client";
import CardMovie from "@/components/Movie/Card";
import WatchCard from "@/components/Movie/WatchCard";
import Provider from "@/components/provider";
import Navbar from "@/components/ui/navbar";
import supabase from "@/lib/supabase";
import { MoviesModelT } from "@/types/model";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

async function request(slug: string, id: number) {
  const { data, error } = await supabase
    .from("movies")
    .select()
    .eq("slug", slug)
    .eq("id", id)
    .single();
  if (error) {
    return {
      data: null,
      error,
    };
  }
  return {
    data,
    error: null,
  };
}

function Movie({
  params: { slug, id },
}: {
  params: { slug: string; id: number };
}) {
  const router = useRouter();
  const [movie, setMovie] = useState<MoviesModelT | null>();
  const [show, setShow] = useState(false);
  useEffect(() => {
    request(slug, id).then(({ data, error }) => {
      if (error) {
        router.back();
      } else {
        setMovie(data);
      }
    });
  }, []);
  function toggleShow() {
    setShow(!show);
  }
  return (
    <Provider>
      <Navbar />
      {movie ? (
        <CardMovie movie={movie} toggleShow={toggleShow} show={show} />
      ) : (
        <h1 className="text-center text-2xl font-semibold">Loading...</h1>
      )}

      {show && movie && <WatchCard movie={movie} />}
      <div className="p-10"></div>
    </Provider>
  );
}

export default Movie;
