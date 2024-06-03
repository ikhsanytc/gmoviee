"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import supabase from "@/lib/supabase";
import { LoginT } from "@/types/main";
import Provider from "@/components/provider";
import Navbar from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Hr from "@/components/ui/Hr";
import { useToast } from "@/components/ui/use-toast";

const AdminLogin: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        router.back();
      }
    };

    checkUser();
  }, [router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginT>();

  const login: SubmitHandler<LoginT> = async (data) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      toast({
        title: "Error while login!",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success login!",
      description: "Welcome admin!",
    });
    router.push("/admin");
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Provider center>
      <Navbar />
      <Card className="w-full md:w-1/2">
        <form onSubmit={handleSubmit(login)}>
          <CardHeader>
            <CardTitle className="text-center">Admin Login</CardTitle>
          </CardHeader>
          <Hr space />
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <Input
                placeholder="Email..."
                className={errors.email ? "border-red-600" : ""}
                type="email"
                {...register("email", {
                  required: "Email is required!",
                })}
              />
              <p className="text-sm text-red-600">{errors.email?.message}</p>
            </div>
            <div className="flex gap-3 items-center">
              <div className="flex flex-col gap-1 w-full">
                <Input
                  placeholder="Password..."
                  className={errors.password ? "border-red-600" : ""}
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required!",
                  })}
                />
                <p className="text-sm text-red-600">
                  {errors.password?.message}
                </p>
              </div>
              <Button size="icon" type="button" onClick={togglePassword}>
                {showPassword ? <EyeOff /> : <Eye />}
              </Button>
            </div>
          </CardContent>
          <Hr space />
          <CardFooter className="flex justify-between">
            <Button type="submit">Login</Button>
            <Button asChild variant="outline">
              <Link href="/">Back</Link>
            </Button>
          </CardFooter>
        </form>
      </Card>
    </Provider>
  );
};

export default AdminLogin;
