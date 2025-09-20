import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '../supabaseClient';

export type UserRole = 'admin' | 'user';

interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string; user?: User }>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const currentUser: User = mapUser(session.user);
        setUser(currentUser);
        console.log('Usuário autenticado (onAuthStateChange):', currentUser);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    // Verifica a sessão atual
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const currentUser: User = mapUser(session.user);
        setUser(currentUser);
        console.log('Usuário autenticado (getSession):', currentUser);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return { success: false, error: error.message };
    }

    if (data.user) {
      const loggedUser: User = mapUser(data.user);
      setUser(loggedUser);
      return { success: true, user: loggedUser };
    }

    return { success: false, error: 'Usuário não encontrado' };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  return ctx;
}

// Função utilitária para mapear o usuário do Supabase para o tipo User
function mapUser(supabaseUser: any): User {
  return {
    id: supabaseUser.id,
    email: supabaseUser.email ?? '',
    role: (supabaseUser.user_metadata?.role as UserRole) || 'user',
    name: supabaseUser.user_metadata?.name || supabaseUser.email?.split('@')[0] || '',
  };
}
