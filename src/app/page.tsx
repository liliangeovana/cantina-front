'use client'
import React, { useState } from 'react';
import Profiles from "@/utils/profiles/profiles";
import LoginForm from '@/utils/forms/login/loginForm';
import Image from 'next/image';
import logo from '../../public/logo.png'

export default function LoginPage() {
  const [perfilSelecionado, setPerfilSelecionado] = useState('');

  const handlePerfilChange = (perfil: string) => {
    setPerfilSelecionado(perfil);
  }

  return (
    <div className="flex flex-row">
      <div className="w-1/2">
        <Image alt="logo" src={logo} style={{ height: '100vh',objectFit: 'fill' }}/>
      </div>

      <div className="flex flex-col justify-center items-center w-1/2 p-6">
        <Profiles handleFormChange={handlePerfilChange} />
        <LoginForm />
      </div>

    </div>
  );
}
