"use client";

import { Loader } from "@/components/Layout";
import { ButtonAuth } from "@/components/Button";
import { InputAuth } from "@/components/Input";
import Link from "next/link";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/login/user`, {
          email,
          senha,
        })
        .then((response) => {
          window.localStorage.setItem("token", response.data.token as string);
          setLoading(false);
        });
      router.push("/dashboard");
    } catch (error) {
      toast({
        title: "Erro",
        description: `${error}`,
        variant: "destructive",
        className: "text-white",
      });
      setLoading(false);
    }
  };
  return loading ? (
    <Loader />
  ) : (
    <div className="bg-zinc-700 h-screen flex items-center justify-center">
      <form className="w-[40%] p-10 rounded-xl flex flex-col bg-black/20 text-white items-center gap-5">
        <div className="flex gap-1 text-3xl">
          Finance <p className="text-green-600">App</p>
        </div>
        <InputAuth nome="Email" type="text" value={email} setValue={setEmail} />
        <InputAuth
          nome="Senha"
          type="password"
          value={senha}
          setValue={setSenha}
        />
        <Link
          href="/auth/register"
          className="w-full hover:text-green-600 duration-200"
        >
          Ainda não possui conta? Registre-se
        </Link>
        <ButtonAuth content="Entrar" handleClick={handleSubmit} />
      </form>
    </div>
  );
};

export default Login;
