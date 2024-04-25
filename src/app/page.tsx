'use client'
import React, { useState } from 'react';
import Profiles from "@/utils/profiles/profiles";
import LoginForm from '@/utils/forms/login/loginForm';

export default function LoginPage() {
  const [perfilSelecionado, setPerfilSelecionado] = useState('');

  const handlePerfilChange = (perfil: string) => {
    setPerfilSelecionado(perfil);
  }

  return (
    <div className="flex flex-row">
      <div className="w-1/2">
        <img className="h-svh" src="../../../logo.png" alt="logo cantina tech" />
      </div>

      <div className="w-1/2 p-6">
        <Profiles handleFormChange={handlePerfilChange} />
        <LoginForm />
      </div>

    </div>
  );
}
