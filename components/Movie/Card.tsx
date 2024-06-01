import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { MoviesModelT } from "@/types/model";
import { FC } from "react";

interface Props {
  movie: MoviesModelT;
  toggleShow: () => void;
  show: boolean;
}

const CardMovie: FC<Props> = ({ movie, toggleShow, show }) => {
  return (
    <>
      <Card className="w-full shadow-lg">
        <CardContent className="mt-5 flex flex-col md:flex-row gap-4">
          <div>
            <div className="dark:bg-blue-600 bg-yellow-500 p-2 rounded-lg">
              <img src={movie.img} alt="" className="rounded-lg" />
            </div>
          </div>
          <div className="mb-3">
            <h1 className="mb-3 font-bold text-2xl md:text-3xl">
              {movie.title}
            </h1>
            <p className="dark:text-gray-300 leading-relaxed mb-3">
              {movie.desc}
            </p>
            <div className="flex gap-2 mb-3">
              {show ? (
                <Button onClick={toggleShow}>Close</Button>
              ) : (
                <Button onClick={toggleShow}>Watch</Button>
              )}
              <Button variant="outline" asChild>
                <Link href="/">Back</Link>
              </Button>
            </div>
            {show && (
              <p className="font-semibold text-xl">Watch the film below</p>
            )}
          </div>
        </CardContent>
      </Card>
      <div className="p-5"></div>
    </>
  );
};

export default CardMovie;
