"use client";
import Provider from "@/components/provider";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/navbar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import supabase from "@/lib/supabase";
import { RequestFilmT } from "@/types/main";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function RequestFilm() {
  const router = useRouter();
  const [requestFilmList, setRequestFilmList] = useState<
    RequestFilmT[] | null
  >();
  async function request() {
    const { data } = await supabase.from("request").select();
    setRequestFilmList(data);
  }
  async function deleteFilm(id: number) {
    const { error } = await supabase.from("request").delete().eq("id", id);
    if (error) {
      toast({
        title: "Error while delete",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    request();
  }
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) router.push("/admin/login");
      else request();
    });
  }, []);
  return (
    <Provider>
      <Navbar />
      <Table>
        <TableCaption>A list of request film</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Film Name</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requestFilmList?.map((requestFilm, idx) => (
            <TableRow key={idx}>
              <TableCell>{++idx}</TableCell>
              <TableCell>{requestFilm.email}</TableCell>
              <TableCell>{requestFilm.username}</TableCell>
              <TableCell>{requestFilm.filmName}</TableCell>
              <TableCell>{requestFilm.reason}</TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  onClick={() => deleteFilm(requestFilm.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Provider>
  );
}

export default RequestFilm;
