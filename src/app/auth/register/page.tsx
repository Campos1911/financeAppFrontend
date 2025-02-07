"use client";

import { ButtonAuth } from "@/components/Button";
import { InputAuth } from "@/components/Input";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

const Login = () => {
  const router = useRouter();
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/register/user`, {
          nome,
          email,
          senha,
        })
        .then(() => router.push("/auth/login"));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-zinc-700 h-screen flex items-center justify-center">
      <form className="w-[40%] p-10 rounded-xl flex flex-col bg-black/20 text-white items-center gap-5">
        <div className="flex gap-1 text-3xl">
          Finance <p className="text-green-600">App</p>
        </div>
        <InputAuth nome="Nome" value={nome} setValue={setNome} type="text" />
        <InputAuth nome="Email" value={email} setValue={setEmail} type="text" />
        <InputAuth
          nome="Senha"
          value={senha}
          setValue={setSenha}
          type="password"
        />
        <Link
          href="/auth/login"
          className="w-full hover:text-green-600 duration-200"
        >
          Já possui conta? Entre agora!
        </Link>
        <ButtonAuth handleClick={handleSubmit} content="Registrar" />
      </form>
    </div>
  );
};

export default Login;
