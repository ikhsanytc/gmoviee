import Provider from "@/components/provider";
import Hr from "@/components/ui/Hr";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Navbar from "@/components/ui/navbar";
import { File } from "lucide-react";
import Link from "next/link";

function NotFound() {
  return (
    <Provider center>
      <Navbar />
      <Card className="w-full md:w-1/2">
        <CardHeader>
          <CardTitle className="flex gap-2 justify-center">
            Not Found
            <File />
          </CardTitle>
        </CardHeader>
        <Hr space />
        <CardContent>
          <p className="text-center dark:text-gray-300">
            The page you are looking for isn&apos;t found
          </p>
        </CardContent>
        <Hr space />
        <CardFooter>
          <Button asChild>
            <Link href="/">Back</Link>
          </Button>
        </CardFooter>
      </Card>
    </Provider>
  );
}

export default NotFound;
