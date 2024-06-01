"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { MoviesModelT } from "@/types/model";
import { FC } from "react";
import { useRouter } from "next/navigation";

interface Props {
  movie: MoviesModelT;
  deleteProp?: boolean;
  edit?: boolean;
}

const CardHome: FC<Props> = ({ movie, deleteProp, edit }) => {
  const router = useRouter();
  return (
    <>
      <Card className="shadow-lg">
        <img src={movie.img} alt="" className="rounded-t-lg" />
        <CardHeader>
          <CardTitle>{movie.title}</CardTitle>
          <CardDescription>{movie.desc}</CardDescription>
        </CardHeader>
        <CardFooter className="flex gap-2">
          <Button asChild>
            <Link href={`/movie/${movie.slug}/${movie.id}`}>See</Link>
          </Button>
          {deleteProp && (
            <Button
              variant="destructive"
              onClick={() => {
                if (confirm("Are you sure?")) {
                  router.push(`/admin/deleteMovie/${movie.id}`);
                }
              }}
            >
              Delete
            </Button>
          )}
        </CardFooter>
      </Card>
    </>
  );
};

export default CardHome;
