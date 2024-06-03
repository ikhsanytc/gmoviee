"use client";

import { ChangeEvent, Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CardHome from "@/components/Home/Card";
import Provider from "@/components/provider";
import Navbar from "@/components/ui/navbar";
import supabase from "@/lib/supabase";
import { MoviesModelT } from "@/types/model";
import { Search } from "@/components/ui/Search";

const DeleteMovie: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [movies, setMovies] = useState<MoviesModelT[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAdmin = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/admin/login");
      } else {
        setIsAdmin(true);
      }
    };

    checkAdmin();
  }, [router]);

  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await supabase.from("movies").select();
      setMovies(data);
    };

    fetchMovies();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    router.push(`/admin/deleteMovie/?q=${value}`);
  };

  return (
    <Provider>
      <Navbar />
      {isAdmin && (
        <>
          <Suspense>
            <Search handleChange={handleChange} setMovies={setMovies} />
          </Suspense>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {movies?.map((movie) => (
              <CardHome key={movie.id} movie={movie} deleteProp />
            ))}
          </div>
        </>
      )}
      <div className="p-6"></div>
    </Provider>
  );
};

export default DeleteMovie;
