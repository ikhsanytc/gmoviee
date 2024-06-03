"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/navbar";
import Provider from "@/components/provider";
import supabase from "@/lib/supabase";
import { RequestFilmModelT } from "@/types/model";
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

const RequestFilm: React.FC = () => {
  const router = useRouter();
  const [requestFilmList, setRequestFilmList] = useState<
    RequestFilmModelT[] | null
  >(null);

  const fetchRequests = async () => {
    try {
      const { data } = await supabase.from("request").select();
      setRequestFilmList(data);
    } catch (error) {
      console.error("Error fetching requests:", error);
      toast({
        title: "Error fetching requests",
        variant: "destructive",
      });
    }
  };

  const deleteFilm = async (id: number) => {
    try {
      const { error } = await supabase.from("request").delete().eq("id", id);
      if (error) {
        toast({
          title: "Error deleting film request",
          variant: "destructive",
          description: error.message,
        });
      }
      fetchRequests();
    } catch (error) {
      console.error("Error deleting film request:", error);
      toast({
        title: "Error deleting film request",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) router.push("/admin/login");
      else fetchRequests();
    };
    checkUser();
  }, []);

  return (
    <Provider>
      <Navbar />
      <Table>
        <TableCaption>A list of requested films</TableCaption>
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
            <TableRow key={requestFilm.id}>
              <TableCell>{idx + 1}</TableCell>
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
};

export default RequestFilm;
