"use client";
import Provider from "@/components/provider";
import Navbar from "@/components/ui/navbar";
import { ChangeEvent, useEffect, useState } from "react";
import supabase from "@/lib/supabase";
import { useSearchParams, useRouter } from "next/navigation";
import { MoviesModelT } from "@/types/model";
import CardHome from "@/components/Home/Card";
import { Input } from "@/components/ui/input";

function EditMovie() {
  const useParams = useSearchParams();
  const keyword = useParams.get("q") || "";
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
    const { data } = await supabase
      .from("movies")
      .select()
      .ilike("title", `%${keyword}%`);
    return data;
  }

  useEffect(() => {
    request().then((data) => setMovies(data));
  }, [keyword]);
  return (
    <Provider>
      <Navbar />
      {isAdmin && (
        <>
          <Input
            onChange={handleChange}
            placeholder="Search..."
            defaultValue={keyword}
            className="w-1/2 mx-auto mb-10"
          />
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
