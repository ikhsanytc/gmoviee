"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import createSlug from "@/lib/createSlug";
import supabase from "@/lib/supabase";
import Link from "next/link";
import { AddMovieT } from "@/types/main";
import Hr from "@/components/ui/Hr";

const AddMovieForm: React.FC = () => {
  const router = useRouter();
  const [img, setImg] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddMovieT>();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push("/admin/login");
      }
    });
  }, [router]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (
      value &&
      (value.startsWith("http://") || value.startsWith("https://"))
    ) {
      setImg(value);
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
  };

  const handleAdd: SubmitHandler<AddMovieT> = async (dataForm) => {
    const slug = createSlug(dataForm.title);
    const { error } = await supabase.from("movies").insert({
      title: dataForm.title,
      slug,
      img: dataForm.img,
      desc: dataForm.desc,
      emdbed: dataForm.emdbed,
    });
    if (error) {
      toast({
        title: "Error while adding movie",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Success",
    });
    const { data } = await supabase
      .from("movies")
      .select()
      .eq("slug", slug)
      .single();
    router.push(`/movie/${slug}/${data.id}`);
  };

  return (
    <Card className="w-full md:w-1/2 mt-20 mb-20">
      <form onSubmit={handleSubmit(handleAdd)}>
        <CardHeader>
          <CardTitle className="text-center">Add Movie</CardTitle>
        </CardHeader>
        <Hr space />
        <CardContent className="flex flex-col gap-4">
          <div className="flex gap-3">
            <div className="flex flex-col gap-1 w-full">
              <Input
                placeholder="Img (width must be 500px)"
                className={errors.img ? "border-red-600" : ""}
                {...register("img", { required: "Image is required!" })}
                onChange={handleChange}
              />
              {errors.img && (
                <p className="text-red-600 text-sm">{errors.img.message}</p>
              )}
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button disabled={isEmpty} type="button">
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
                    alt="Preview"
                    className="md:w-[50%] w-full border-[7px] rounded-lg border-yellow-500 dark:border-blue-600"
                  />
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex flex-col gap-1">
            <Input
              placeholder="Title..."
              className={errors.title ? "border-red-600" : ""}
              {...register("title", { required: "Title is required!" })}
            />
            {errors.title && (
              <p className="text-red-600 text-sm">{errors.title.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <Textarea
              placeholder="Description..."
              className={errors.desc ? "border-red-600" : ""}
              {...register("desc", { required: "Description is required!" })}
            />
            {errors.desc && (
              <p className="text-red-600 text-sm">{errors.desc.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <Textarea
              placeholder="Embed..."
              className={errors.emdbed ? "border-red-600" : ""}
              {...register("emdbed", { required: "Embed is required!" })}
            />
            {errors.emdbed && (
              <p className="text-red-600 text-sm">{errors.emdbed.message}</p>
            )}
          </div>
        </CardContent>
        <Hr space />
        <CardFooter className="flex justify-between">
          <Button type="submit">Add</Button>
          <Button type="button" variant="outline" asChild>
            <Link href="/admin">Back</Link>
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AddMovieForm;
