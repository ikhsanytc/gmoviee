"use client";
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
import { Input } from "@/components/ui/input";
import Navbar from "@/components/ui/navbar";
import supabase from "@/lib/supabase";
import { MoviesModelT } from "@/types/model";
import { useEffect, useState } from "react";
import { ChangeEvent } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SubmitHandler, useForm } from "react-hook-form";
import { AddMovieT } from "@/types/main";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import createSlug from "@/lib/createSlug";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

function EditMovie({ params: { id } }: { params: { id: number } }) {
  const [isEmpty, setIsEmpty] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  const [movie, setMovie] = useState<MoviesModelT | null>();
  const [img, setImg] = useState("");
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddMovieT>();

  function handleChangeImg(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    if (
      (value !== "" && value.includes("http://")) ||
      value.includes("https://")
    ) {
      setImg(value);
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
  }

  const edit: SubmitHandler<AddMovieT> = async (dataForm) => {
    const slug = createSlug(dataForm.title);
    const { error } = await supabase
      .from("movies")
      .update({
        img: dataForm.img,
        title: dataForm.title,
        slug,
        desc: dataForm.desc,
        emdbed: dataForm.emdbed,
      })
      .eq("id", id)
      .select();
    if (error) {
      toast({
        title: "Error while update",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Success!",
      description: "You'll be redirect.",
    });
    router.push(`/movie/${slug}/${id}`);
  };

  async function request() {
    const { data } = await supabase
      .from("movies")
      .select()
      .eq("id", id)
      .single();
    return data;
  }

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push("/admin/login");
      } else {
        setIsAdmin(true);
      }
    });
    request().then((data) => {
      setMovie(data);
      setImg(data.img);
    });
  }, []);
  return (
    <Provider center>
      <Navbar />
      {movie && isAdmin && (
        <Card className="w-full md:w-1/2 mt-10">
          <form onSubmit={handleSubmit(edit)}>
            <CardHeader>
              <CardTitle className="text-center">Edit Movie</CardTitle>
            </CardHeader>
            <Hr space />
            <CardContent className="flex flex-col gap-4">
              <div className="flex gap-2">
                <div className="flex w-full flex-col gap-1">
                  <Input
                    {...register("img", {
                      required: {
                        value: true,
                        message: "Img is required!",
                      },
                    })}
                    className={`${errors.img && "border-red-600"}`}
                    onChange={handleChangeImg}
                    defaultValue={movie.img}
                    placeholder="Img..."
                  />
                  <p className="text-sm text-red-600">{errors.img?.message}</p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button disabled={isEmpty ? true : false} type="button">
                      Preview
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Preview Image</DialogTitle>
                    </DialogHeader>
                    <div className="flex justify-center">
                      <img
                        src={img}
                        onError={(e) =>
                          (e.currentTarget.src = `${process.env.NEXT_PUBLIC_BASE_URL}/500x750.svg`)
                        }
                        alt=""
                        className="md:w-[50%] w-full border-[7px] rounded-lg border-yellow-500 dark:border-blue-600"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div>
                <Input
                  placeholder="Title..."
                  {...register("title", {
                    required: {
                      value: true,
                      message: "Title is required!",
                    },
                  })}
                  defaultValue={movie.title}
                />
              </div>
              <div>
                <Textarea
                  placeholder="Description..."
                  defaultValue={movie.desc}
                  {...register("desc", {
                    required: {
                      value: true,
                      message: "Description is required!",
                    },
                  })}
                ></Textarea>
              </div>
              <div>
                <Textarea
                  placeholder="Emdbed..."
                  defaultValue={movie.emdbed}
                  {...register("emdbed", {
                    required: {
                      value: true,
                      message: "Emdbed is required!",
                    },
                  })}
                ></Textarea>
              </div>
            </CardContent>
            <Hr space />
            <CardFooter className="flex justify-between">
              <Button type="submit">Submit</Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/admin/editMovie">Back</Link>
              </Button>
            </CardFooter>
          </form>
        </Card>
      )}
    </Provider>
  );
}

export default EditMovie;
