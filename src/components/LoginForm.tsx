import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart3, Lock, Mail, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/supabaseClient"; // seu cliente Supabase
import { useAuth, UserRole } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const { login } = useAuth(); 
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await login(email, password);

    if (!result.success) {
      toast({
        title: 'Erro de Login',
        description: result.error || 'Erro inesperado',
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    const loggedUser = result.user!;
    toast({
      title: 'Login realizado com sucesso!',
      description: `Bem-vindo, ${loggedUser.email}`,
      variant: 'default',
    });

    setTimeout(() => {
      setIsLoading(false);
      if (loggedUser.role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/individual');
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background from-slate-50 via-blue-50/30 to-indigo-100/40 p-4">
      <div className="w-full max-w-md">
        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl shadow-blue-500/10 ring-1 ring-slate-200/50">
          <CardHeader className="text-center space-y-6 pb-8">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Support Performance
              </CardTitle>
              <CardDescription className="text-slate-500 text-base">
                Faça login para acessar seu dashboard
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent className="px-8 pb-8">
            <div className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="email" className="text-sm font-semibold text-slate-700">
                  Email
                </Label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 text-black pr-4 py-3 h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all duration-200 bg-slate-50/50 focus:bg-white"
                    required
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="password" className="text-sm font-semibold text-slate-700">
                  Senha
                </Label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-12 pr-12 py-3 text-black h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all duration-200 bg-slate-50/50 focus:bg-white"
                    required
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              
              <Button 
                onClick={handleSubmit}
                className="w-full h-12 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/30 transition-all duration-200 transform hover:-translate-y-0.5"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Entrando...</span>
                  </div>
                ) : (
                  'Entrar'
                )}
              </Button>
            </div>
            
            <div className="mt-8 text-center">
              <div className="text-xs font-mono text-slate-600 space-y-1">
                <div className="flex items-center justify-center space-x-2 pt-2 border-t border-slate-200/40">
                  <span className="text-slate-400">developed by</span>
                  <span className="text-slate-700 font-bold tracking-wide">Gabriel Marques</span>
                </div>
                <div className="text-slate-400 text-[10px] pt-1">
                  v1.0.0 | @GabrielMarques011
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
