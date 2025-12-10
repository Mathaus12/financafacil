'use client';

import React, { createContext, useContext, ReactNode, useMemo, useState, useEffect, DependencyList } from 'react';
import { FirebaseApp, getApps, initializeApp, getApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';
import { Auth, User, onAuthStateChanged, getAuth } from 'firebase/auth';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';
import { firebaseConfig } from './config';

// Interface para os serviços Firebase e estado do usuário
interface FirebaseContextValue {
  firebaseApp: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
  user: User | null;
  loading: boolean;
  error: Error | null;
}

// Criação do Context
const FirebaseContext = createContext<FirebaseContextValue | undefined>(undefined);

// Função de inicialização única
let firebaseApp: FirebaseApp;
let auth: Auth;
let firestore: Firestore;

const initializeFirebaseServices = () => {
  if (!getApps().length) {
    firebaseApp = initializeApp(firebaseConfig);
  } else {
    firebaseApp = getApp();
  }
  auth = getAuth(firebaseApp);
  firestore = getFirestore(firebaseApp);
  return { firebaseApp, auth, firestore };
};


// Provedor Principal
interface FirebaseProviderProps {
  children: ReactNode;
}

export function FirebaseProvider({ children }: FirebaseProviderProps) {
  // Inicializa os serviços uma vez
  const services = useMemo(() => initializeFirebaseServices(), []);

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      services.auth,
      (user) => {
        setUser(user);
        setLoading(false);
      },
      (error) => {
        console.error('Auth state change error', error);
        setError(error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [services.auth]);

  const value = useMemo(() => ({
    ...services,
    user,
    loading,
    error,
  }), [services, user, loading, error]);

  return (
    <FirebaseContext.Provider value={value}>
        <FirebaseErrorListener />
        {children}
    </FirebaseContext.Provider>
  );
}

// Hook para acessar todo o contexto
export function useFirebase() {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
}

// Hooks específicos para cada serviço/dado
export const useAuth = (): Auth => {
  const { auth } = useFirebase();
  return auth;
};

export const useFirestore = (): Firestore => {
    const { firestore } = useFirebase();
    return firestore;
};

export const useFirebaseApp = (): FirebaseApp => {
    const { firebaseApp } = useFirebase();
    return firebaseApp;
};

export const useUser = () => {
    const { user, loading, error } = useFirebase();
    return { user, loading, error };
}

// Hook de memoização estável
export function useMemoFirebase<T>(factory: () => T, deps: DependencyList): T {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const memoizedValue = useMemo(factory, deps);
    
    // Adiciona uma propriedade para verificação, útil para debug
    if (memoizedValue && typeof memoizedValue === 'object') {
      (memoizedValue as any).__memo = true;
    }

    return memoizedValue;
}
