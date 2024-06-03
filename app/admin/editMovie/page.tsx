"use client";

import { ChangeEvent, Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase";
import { MoviesModelT } from "@/types/model";
import CardHome from "@/components/Home/Card";
import Provider from "@/components/provider";
import Navbar from "@/components/ui/navbar";
import { Search } from "@/components/ui/Search";

const EditMovie: React.FC = () => {
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
    router.push(`/admin/editMovie/?q=${value}`);
  };

  return (
    <Provider>
      <Navbar />
      {isAdmin && (
        <>
          <Suspense fallback={<div>Loading...</div>}>
            <Search handleChange={handleChange} setMovies={setMovies} />
          </Suspense>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {movies?.map((movie) => (
              <CardHome key={movie.id} movie={movie} editProp />
            ))}
          </div>
        </>
      )}
      <div className="p-5"></div>
    </Provider>
  );
};

export default EditMovie;
