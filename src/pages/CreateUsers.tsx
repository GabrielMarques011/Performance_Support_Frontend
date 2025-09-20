import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Mail, 
  Users, 
  Shield, 
  Calendar, 
  Save, 
  ArrowLeft,
  Eye,
  EyeOff,
  UserPlus,
  Building
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const teams = [
  "Suporte Nível 1",
  "Suporte Nível 2", 
  "Suporte Nível 3",
  "Desenvolvimento",
  "Vendas",
  "Marketing",
  "RH",
  "Financeiro"
];

const roles = [
  "Analista de Suporte",
  "Especialista em Suporte Técnico",
  "Especialista Sênior",
  "Supervisor de Suporte",
  "Gerente de Suporte",
  "Desenvolvedor Junior",
  "Desenvolvedor Pleno",
  "Desenvolvedor Senior",
  "Tech Lead",
  "Analista de Vendas",
  "Consultor de Vendas",
  "Gerente de Vendas"
];

const userTypes = [
  { value: "user", label: "Usuário" },
  { value: "admin", label: "Administrador" }
];

export default function CreateUser() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    team: "",
    type: "user",
    startDate: new Date().toISOString().split('T')[0]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    } else if (formData.password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Senhas não coincidem";
    }

    if (!formData.role) {
      newErrors.role = "Cargo é obrigatório";
    }

    if (!formData.team) {
      newErrors.team = "Equipe é obrigatória";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Erro na validação",
        description: "Por favor, corrija os campos com erro.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
    const response = await fetch("http://localhost:3001/api/create-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Erro ao criar usuário.");
    }

    toast({
      title: "Usuário criado com sucesso!",
      description: `${formData.name} foi adicionado ao sistema.`,
    });

    navigate("/manage-users");
  } catch (error) {
    toast({
      title: "Erro ao criar usuário",
      description: error.message || "Tente novamente em alguns instantes.",
      variant: "destructive"
    });
  }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-xl shadow-black/10 p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 ring-1 ring-blue-400/30">
                <UserPlus className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  Criar Novo Usuário
                </h1>
                <p className="text-xl text-muted-foreground mt-2">
                  Adicione um novo membro à sua equipe
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="bg-slate-800/50 border-slate-700/50 hover:bg-slate-700/50 text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Personal Information */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 shadow-xl shadow-black/10">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-xl bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  <User className="w-5 h-5 text-primary" />
                  <span>Informações Pessoais</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-semibold text-slate-300">
                    Nome Completo *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={`bg-slate-700/50 border-slate-600/50 focus:border-primary ${
                      errors.name ? "border-destructive" : ""
                    }`}
                    placeholder="Digite o nome completo"
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold text-slate-300">
                    Email *
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={`pl-10 bg-slate-700/50 border-slate-600/50 focus:border-primary ${
                        errors.email ? "border-destructive" : ""
                      }`}
                      placeholder="usuario@empresa.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-semibold text-slate-300">
                    Senha *
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className={`pr-10 bg-slate-700/50 border-slate-600/50 focus:border-primary ${
                        errors.password ? "border-destructive" : ""
                      }`}
                      placeholder="Mínimo 6 caracteres"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-destructive">{errors.password}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-semibold text-slate-300">
                    Confirmar Senha *
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className={`bg-slate-700/50 border-slate-600/50 focus:border-primary ${
                      errors.confirmPassword ? "border-destructive" : ""
                    }`}
                    placeholder="Digite a senha novamente"
                  />
                  {errors.confirmPassword && (
                    <p className="text-sm text-destructive">{errors.confirmPassword}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Professional Information */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 shadow-xl shadow-black/10">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-xl bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  <Building className="w-5 h-5 text-primary" />
                  <span>Informações Profissionais</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-sm font-semibold text-slate-300">
                    Cargo *
                  </Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) => handleInputChange("role", value)}
                  >
                    <SelectTrigger className={`bg-slate-700/50 border-slate-600/50 focus:border-primary ${
                      errors.role ? "border-destructive" : ""
                    }`}>
                      <SelectValue placeholder="Selecione um cargo" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      {roles.map((role) => (
                        <SelectItem key={role} value={role} className="text-white hover:bg-slate-700">
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.role && (
                    <p className="text-sm text-destructive">{errors.role}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="team" className="text-sm font-semibold text-slate-300">
                    Equipe *
                  </Label>
                  <Select
                    value={formData.team}
                    onValueChange={(value) => handleInputChange("team", value)}
                  >
                    <SelectTrigger className={`bg-slate-700/50 border-slate-600/50 focus:border-primary ${
                      errors.team ? "border-destructive" : ""
                    }`}>
                      <SelectValue placeholder="Selecione uma equipe" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      {teams.map((team) => (
                        <SelectItem key={team} value={team} className="text-white hover:bg-slate-700">
                          {team}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.team && (
                    <p className="text-sm text-destructive">{errors.team}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type" className="text-sm font-semibold text-slate-300">
                    Tipo de Usuário
                  </Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => handleInputChange("type", value)}
                  >
                    <SelectTrigger className="bg-slate-700/50 border-slate-600/50 focus:border-primary">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      {userTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value} className="text-white hover:bg-slate-700">
                          <div className="flex items-center space-x-2">
                            {type.value === "admin" ? (
                              <Shield className="w-4 h-4" />
                            ) : (
                              <User className="w-4 h-4" />
                            )}
                            <span>{type.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startDate" className="text-sm font-semibold text-slate-300">
                    Data de Início
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => handleInputChange("startDate", e.target.value)}
                      className="pl-10 bg-slate-700/50 border-slate-600/50 focus:border-primary"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-4 mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/manage-users")}
              className="bg-slate-800/50 border-slate-700/50 hover:bg-slate-700/50 text-white"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg shadow-blue-500/25"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Criando...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Save className="w-4 h-4" />
                  <span>Criar Usuário</span>
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}