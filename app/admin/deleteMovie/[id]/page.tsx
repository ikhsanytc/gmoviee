"use client";
import Provider from "@/components/provider";
import Navbar from "@/components/ui/navbar";
import { useEffect } from "react";
import supabase from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

function DeleteMovie({ params: { id } }: { params: { id: number } }) {
  const router = useRouter();
  const { toast } = useToast();
  async function deleteMovie() {
    try {
      const { error } = await supabase.from("movies").delete().eq("id", id);
      if (error) {
        toast({
          title: "Error while delete",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
        });
        router.push("/admin/deleteMovie");
      }
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) router.push("/admin/login");
      else deleteMovie();
    });
  }, []);
  return (
    <Provider>
      <Navbar />
      <h1 className="text-center text-2xl font-semibold">Loading...</h1>
    </Provider>
  );
}

export default DeleteMovie;
