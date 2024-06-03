"use client";
import { ChangeEvent, useEffect, Dispatch, SetStateAction } from "react";
import supabase from "@/lib/supabase";
import { useSearchParams } from "next/navigation";
import { MoviesModelT } from "@/types/model";
import { Input } from "@/components/ui/input";

export function Search({
  handleChange,
  setMovies,
}: {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setMovies: Dispatch<SetStateAction<MoviesModelT[] | null | undefined>>;
}) {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("q") || "";
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
    <>
      <Input
        className="w-1/2 mx-auto mb-10"
        placeholder="Search Film..."
        onChange={handleChange}
        defaultValue={keyword}
      />
    </>
  );
}
