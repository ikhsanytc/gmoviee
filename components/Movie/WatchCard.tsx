import { MoviesModelT } from "@/types/model";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { FC } from "react";

interface Props {
  movie: MoviesModelT;
}

const WatchCard: FC<Props> = ({ movie }) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Watch {movie.title}</CardTitle>
          <CardDescription>Sorry for the ads mwehehhe</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-yellow-500 p-2 w-full rounded-lg dark:bg-blue-600">
            <iframe
              src={movie.emdbed}
              frameBorder={0}
              className="w-full h-[400px] rounded-lg"
              allowFullScreen
            ></iframe>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default WatchCard;
