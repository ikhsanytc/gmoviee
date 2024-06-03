"use client";
import Provider from "@/components/provider";
import Navbar from "@/components/ui/navbar";
import { ChangeEvent, Suspense, useEffect, useState } from "react";
import supabase from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { MoviesModelT } from "@/types/model";
import CardHome from "@/components/Home/Card";
import { Search } from "../../../components/ui/Search";

function EditMovie() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [movies, setMovies] = useState<MoviesModelT[] | null>();
  const router = useRouter();
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push("/admin/login");
      } else {
        setIsAdmin(true);
      }
    });
  }, []);
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    router.push(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admin/editMovie/?q=${value}`
    );
  }
  async function request() {
    const { data } = await supabase.from("movies").select();
    return data;
  }

  useEffect(() => {
    request().then((data) => setMovies(data));
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
              <CardHome key={idx} movie={movie} editProp />
            ))}
          </div>
        </>
      )}
      <div className="p-5"></div>
    </Provider>
  );
}

export default EditMovie;
