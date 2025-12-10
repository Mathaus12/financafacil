'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase/provider';
import { Logo } from '@/components/logo';

export default function Home() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        // Se o usuário estiver logado, redirecione para o dashboard
        router.replace('/dashboard');
      } else {
        // Se não estiver logado, redirecione para a página de login
        router.replace('/login');
      }
    }
  }, [user, loading, router]);

  // Exibe um loader enquanto a verificação de autenticação está em andamento
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
      <Logo />
      <p className="text-muted-foreground">Carregando...</p>
    </div>
  );
}
