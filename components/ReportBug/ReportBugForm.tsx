"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import supabase from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Hr from "@/components/ui/Hr";

interface FormT {
  img: FileList;
  why: string;
  email: string;
}

const ReportBugForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormT>();
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit: SubmitHandler<FormT> = async (dataForm) => {
    const formData = new FormData();
    formData.append("files", dataForm.img[0]);

    try {
      const response = await fetch("/api/uploadImg", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        toast({
          title: "Error while report",
          description: `Error: ${response.status}`,
          variant: "destructive",
        });
        return;
      }

      const result = await response.json();
      if (result.status === "success") {
        const { error } = await supabase
          .from("bugs")
          .insert({
            email: dataForm.email,
            img: result.fileName,
            why: dataForm.why,
          })
          .select();

        if (error) {
          toast({
            title: "Error while report",
            description: error.message,
            variant: "destructive",
          });
          return;
        }

        toast({
          title: "Thank you!",
          description: "Admin will fix this bug as soon as possible.",
        });
        router.push("/");
      } else {
        toast({
          title: "Error while report",
          description: result.error,
          variant: "destructive",
        });
        router.refresh();
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardHeader>
        <CardTitle className="text-center">Report Bug</CardTitle>
      </CardHeader>
      <Hr space />
      <CardContent className="flex flex-col gap-4">
        <Input
          type="file"
          className="cursor-pointer"
          accept="image/*"
          {...register("img", { required: "Image is required" })}
        />
        {errors.img && <p className="text-red-500">{errors.img.message}</p>}
        <Input
          placeholder="Why?"
          {...register("why", { required: "Reason is required" })}
        />
        {errors.why && <p className="text-red-500">{errors.why.message}</p>}
        <Input
          placeholder="Email..."
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </CardContent>
      <Hr space />
      <CardFooter>
        <Button type="submit">Submit</Button>
      </CardFooter>
    </form>
  );
};

export default ReportBugForm;
