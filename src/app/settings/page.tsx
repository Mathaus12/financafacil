'use client';

import { AppLayout } from '@/components/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CategoryManager } from '@/components/category-manager';
import { PaymentMethodManager } from '@/components/payment-method-manager';
import { BankManager } from '@/components/bank-manager';

export default function SettingsPage() {
  return (
    <AppLayout>
      <div className="flex-1 space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Cadastros</h1>
        <Tabs defaultValue="categories" className="w-full">
          <TabsList className="flex-wrap justify-start h-auto w-full md:w-auto">
            <TabsTrigger value="categories">Categorias</TabsTrigger>
            <TabsTrigger value="paymentMethods">Formas de Pagamento</TabsTrigger>
            <TabsTrigger value="banks">Bancos</TabsTrigger>
          </TabsList>
          <TabsContent value="categories">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Categorias</CardTitle>
              </CardHeader>
              <CardContent>
                <CategoryManager />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="paymentMethods">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Formas de Pagamento</CardTitle>
              </CardHeader>
              <CardContent>
                <PaymentMethodManager />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="banks">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Bancos</CardTitle>
              </CardHeader>
              <CardContent>
                <BankManager />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
