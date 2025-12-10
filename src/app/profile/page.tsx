'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useEffect } from 'react';

import { AppLayout } from '@/components/app-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useData } from '@/context/data-context';
import type { UserProfile } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

const profileSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres.'),
  birthDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Data inválida. Use o formato AAAA-MM-DD.',
  }),
  workplace: z.string().optional(),
  position: z.string().optional(),
  role: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const { userProfile, updateUserProfile, loading } = useData();
  const { toast } = useToast();

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      birthDate: '',
      workplace: '',
      position: '',
      role: '',
    },
  });

  useEffect(() => {
    if (userProfile) {
      form.reset({
        name: userProfile.name || '',
        birthDate: userProfile.birthDate ? userProfile.birthDate.split('T')[0] : '',
        workplace: userProfile.workplace || '',
        position: userProfile.position || '',
        role: userProfile.role || '',
      });
    }
  }, [userProfile, form]);

  const onSubmit = (data: ProfileFormData) => {
    updateUserProfile(data);
    toast({
        title: 'Perfil Atualizado!',
        description: 'Suas informações foram salvas com sucesso.',
    });
  };

  if (loading) {
    return (
        <AppLayout>
            <div className="flex h-full flex-1 items-center justify-center">
              <p>Carregando... Por favor, aguarde!</p>
            </div>
        </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="flex-1 space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Perfil</h1>
        <Card>
          <CardHeader>
            <CardTitle>Informações do Perfil</CardTitle>
            <CardDescription>Atualize suas informações pessoais e profissionais.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <h3 className="text-lg font-bold">Informações Pessoais</h3>
                <div className="space-y-4">
                    <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                            <Input placeholder="Seu nome completo" {...form.register('name')} />
                        </FormControl>
                        <FormMessage>{form.formState.errors.name?.message}</FormMessage>
                    </FormItem>
                    <FormItem>
                        <FormLabel>Data de Nascimento</FormLabel>
                        <FormControl>
                            <Input type="date" {...form.register('birthDate')} />
                        </FormControl>
                        <FormMessage>{form.formState.errors.birthDate?.message}</FormMessage>
                    </FormItem>
                </div>
                
                <Separator />

                <h3 className="text-lg font-bold">Informações Profissionais</h3>
                <div className="space-y-4">
                     <FormItem>
                        <FormLabel>Local de Trabalho</FormLabel>
                        <FormControl>
                            <Input placeholder="Onde você trabalha" {...form.register('workplace')} />
                        </FormControl>
                        <FormMessage>{form.formState.errors.workplace?.message}</FormMessage>
                    </FormItem>
                     <FormItem>
                        <FormLabel>Cargo</FormLabel>
                        <FormControl>
                            <Input placeholder="Seu cargo" {...form.register('position')} />
                        </FormControl>
                        <FormMessage>{form.formState.errors.position?.message}</FormMessage>
                    </FormItem>
                     <FormItem>
                        <FormLabel>Função</FormLabel>
                        <FormControl>
                            <Input placeholder="Sua função" {...form.register('role')} />
                        </FormControl>
                        <FormMessage>{form.formState.errors.role?.message}</FormMessage>
                    </FormItem>
                </div>

                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
