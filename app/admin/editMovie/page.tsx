"use client";
import Provider from "@/components/provider";
import Navbar from "@/components/ui/navbar";
import { useEffect } from "react";
import supabase from "@/lib/supabase";
import { useRouter } from "next/navigation";

function EditMovie() {
  const router = useRouter();
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push("/admin/login");
      }
    });
  }, []);
  return (
    <Provider>
      <Navbar />
      <h1>Lanjut besok gua cape pusing dll</h1>
    </Provider>
  );
}

export default EditMovie;
