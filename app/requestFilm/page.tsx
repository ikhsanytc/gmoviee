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
import { useToast } from "@/components/ui/use-toast";
import supabase from "@/lib/supabase";
import { RequestFilmFormT } from "@/types/main";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

function RequestFilm() {
  const router = useRouter();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RequestFilmFormT>();
  const requestFilm: SubmitHandler<RequestFilmFormT> = async (dataForm) => {
    const username = dataForm.username === "" ? "unknown" : dataForm.username;
    const reason = dataForm.reason === "" ? "nothing" : dataForm.reason;
    const { error } = await supabase
      .from("request")
      .insert({
        email: dataForm.email,
        username,
        filmName: dataForm.filmName,
        reason,
      })
      .select();
    if (error) {
      toast({
        title: "Error while add request!",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Success!",
      description: "Thank you for request film!",
    });
    router.push("/");
  };
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) router.push("/admin/requestFilm");
    });
  }, []);
  return (
    <Provider center>
      <Navbar />
      <Card className="w-full md:w-1/2">
        <form onSubmit={handleSubmit(requestFilm)}>
          <CardHeader>
            <CardTitle className="text-center">Request Film</CardTitle>
          </CardHeader>
          <Hr space />
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <Input
                placeholder="Email..."
                className={`${errors.email && "border-red-600"}`}
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required!",
                  },
                })}
              />
              <p className="text-sm text-red-600">{errors.email?.message}</p>
            </div>
            <Input
              placeholder="Username... (optional)"
              {...register("username")}
            />
            <div className="flex flex-col gap-1">
              <Input
                placeholder="Film Name..."
                className={`${errors.filmName && "border-red-600"}`}
                {...register("filmName", {
                  required: {
                    value: true,
                    message: "Film Name is required!",
                  },
                })}
              />
              <p className="text-sm text-red-600">{errors.filmName?.message}</p>
            </div>
            <Input placeholder="Reason... (optional)" {...register("reason")} />
          </CardContent>
          <Hr space />
          <CardFooter>
            <Button type="submit">Submit</Button>
          </CardFooter>
        </form>
      </Card>
    </Provider>
  );
}

export default RequestFilm;
