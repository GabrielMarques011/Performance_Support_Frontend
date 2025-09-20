import { useEffect, useRef, useState } from "react";
import { 
  CheckCircle, 
  XCircle, 
  TrendingUp, 
  ArrowUpRight, 
  MessageSquare,
  Star,
  User,
  Trophy,
  Clock,
  Target,
  Award,
  Activity,
  Calendar,
  BarChart3,
  X,
  Zap,
  Timer,
  ThumbsUp,
  Users,
  ChevronDown,
  Shield,
  UserCheck
} from "lucide-react";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Button } from "@/components/ui/button";
import { createPortal } from "react-dom";

// Mock do usuário atual logado - em produção viria da autenticação
const currentUser = {
  id: "maria-santos",
  name: "Maria Santos", 
  type: "admin", // "admin" ou "user"
  role: "Especialista em Suporte Técnico",
  team: "Suporte Nível 2"
};

// Mock data para todos os funcionários
const allEmployees = {
  "maria-santos": {
    name: "Maria Santos",
    role: "Especialista em Suporte Técnico",
    team: "Suporte Nível 2",
    startDate: "2022-03-15",
    avatar: "MS",
    metrics: {
      resolved: 89,
      unresolved: 3,
      retentions: 18,
      upgrades: 12,
      totalChats: 134,
      avgResponseTime: 2.3,
      customerSatisfaction: 4.8,
      firstCallResolution: 85
    },
    trends: {
      resolved: { value: 15.2, isPositive: true },
      unresolved: { value: -25.0, isPositive: true },
      retentions: { value: 12.5, isPositive: true },
      upgrades: { value: 20.0, isPositive: true },
      totalChats: { value: 8.1, isPositive: true },
      avgResponseTime: { value: -18.5, isPositive: true },
      customerSatisfaction: { value: 4.3, isPositive: true },
      firstCallResolution: { value: 7.6, isPositive: true }
    },
    weeklyPerformance: [
      { day: 'Seg', resolved: 18, unresolved: 1, chats: 25 },
      { day: 'Ter', resolved: 22, unresolved: 0, chats: 28 },
      { day: 'Qua', resolved: 15, unresolved: 1, chats: 22 },
      { day: 'Qui', resolved: 19, unresolved: 1, chats: 26 },
      { day: 'Sex', resolved: 15, unresolved: 0, chats: 21 },
      { day: 'Sáb', resolved: 0, unresolved: 0, chats: 0 },
      { day: 'Dom', resolved: 0, unresolved: 0, chats: 0 }
    ],
    monthlyHistory: [
      { month: 'Jan', resolved: 78, satisfaction: 4.5, responseTime: 2.8 },
      { month: 'Fev', resolved: 82, satisfaction: 4.6, responseTime: 2.5 },
      { month: 'Mar', resolved: 85, satisfaction: 4.7, responseTime: 2.4 },
      { month: 'Abr', resolved: 89, satisfaction: 4.8, responseTime: 2.3 }
    ],
    categoryDistribution: [
      { name: 'Técnico', value: 45, color: '#3b82f6' },
      { name: 'Billing', value: 25, color: '#6366f1' },
      { name: 'Config', value: 20, color: '#8b5cf6' },
      { name: 'Outros', value: 10, color: '#a855f7' }
    ],
    goals: {
      resolved: { current: 89, target: 85, label: 'Casos Resolvidos' },
      satisfaction: { current: 4.8, target: 4.5, label: 'Satisfação' },
      responseTime: { current: 2.3, target: 3.0, label: 'Tempo Resposta (min)' },
      firstCallResolution: { current: 85, target: 80, label: 'Resolução 1ª Chamada (%)' }
    },
    achievements: [
      { title: 'Top Performer', description: 'Melhor performance da equipe em Abril', icon: Trophy, color: 'emerald' },
      { title: 'Cliente Feliz', description: '4.8/5 em satisfação do cliente', icon: ThumbsUp, color: 'blue' },
      { title: 'Resposta Rápida', description: 'Tempo médio abaixo de 2.5min', icon: Zap, color: 'amber' },
      { title: 'Problema Solver', description: '85% de resoluções na primeira chamada', icon: Target, color: 'indigo' }
    ],
    metricDetails: {
      resolved: [
        { name: 'Lentidão/Performance', value: 32, percentage: 36 },
        { name: 'Conectividade', value: 24, percentage: 27 },
        { name: 'Configuração', value: 18, percentage: 20 },
        { name: 'Outros', value: 15, percentage: 17 }
      ],
      unresolved: [
        { name: 'Escalado para Dev', value: 2, percentage: 67 },
        { name: 'Aguardando Cliente', value: 1, percentage: 33 }
      ],
      retentions: [
        { name: 'Desconto Aplicado', value: 10, percentage: 56 },
        { name: 'Upgrade Gratuito', value: 5, percentage: 28 },
        { name: 'Suporte Premium', value: 3, percentage: 16 }
      ],
      upgrades: [
        { name: 'Plano Pro', value: 8, percentage: 67 },
        { name: 'Enterprise', value: 3, percentage: 25 },
        { name: 'Add-ons', value: 1, percentage: 8 }
      ]
    }
  },
  "joao-silva": {
    name: "João Silva",
    role: "Analista de Suporte",
    team: "Suporte Nível 1", 
    startDate: "2021-08-10",
    avatar: "JS",
    metrics: {
      resolved: 81,
      unresolved: 4,
      retentions: 15,
      upgrades: 9,
      totalChats: 125,
      avgResponseTime: 2.8,
      customerSatisfaction: 4.5,
      firstCallResolution: 78
    },
    trends: {
      resolved: { value: 8.5, isPositive: true },
      unresolved: { value: -12.0, isPositive: true },
      retentions: { value: 15.2, isPositive: true },
      upgrades: { value: 25.0, isPositive: true },
      totalChats: { value: 5.2, isPositive: true },
      avgResponseTime: { value: -8.2, isPositive: true },
      customerSatisfaction: { value: 2.1, isPositive: true },
      firstCallResolution: { value: 5.8, isPositive: true }
    },
    weeklyPerformance: [
      { day: 'Seg', resolved: 16, unresolved: 1, chats: 23 },
      { day: 'Ter', resolved: 18, unresolved: 1, chats: 25 },
      { day: 'Qua', resolved: 14, unresolved: 0, chats: 20 },
      { day: 'Qui', resolved: 17, unresolved: 2, chats: 24 },
      { day: 'Sex', resolved: 16, unresolved: 0, chats: 22 },
      { day: 'Sáb', resolved: 0, unresolved: 0, chats: 0 },
      { day: 'Dom', resolved: 0, unresolved: 0, chats: 0 }
    ],
    monthlyHistory: [
      { month: 'Jan', resolved: 72, satisfaction: 4.2, responseTime: 3.2 },
      { month: 'Fev', resolved: 75, satisfaction: 4.3, responseTime: 3.0 },
      { month: 'Mar', resolved: 78, satisfaction: 4.4, responseTime: 2.9 },
      { month: 'Abr', resolved: 81, satisfaction: 4.5, responseTime: 2.8 }
    ],
    categoryDistribution: [
      { name: 'Suporte Básico', value: 35, color: '#3b82f6' },
      { name: 'Billing', value: 27, color: '#6366f1' },
      { name: 'Config', value: 22, color: '#8b5cf6' },
      { name: 'Outros', value: 16, color: '#a855f7' }
    ],
    goals: {
      resolved: { current: 81, target: 75, label: 'Casos Resolvidos' },
      satisfaction: { current: 4.5, target: 4.2, label: 'Satisfação' },
      responseTime: { current: 2.8, target: 3.2, label: 'Tempo Resposta (min)' },
      firstCallResolution: { current: 78, target: 75, label: 'Resolução 1ª Chamada (%)' }
    },
    achievements: [
      { title: 'Crescimento', description: 'Maior evolução do trimestre', icon: TrendingUp, color: 'blue' },
      { title: 'Consistente', description: 'Performance estável durante o mês', icon: Target, color: 'emerald' },
      { title: 'Colaborativo', description: 'Sempre ajuda outros colegas', icon: Users, color: 'indigo' },
      { title: 'Pontual', description: 'Tempo de resposta dentro da meta', icon: Clock, color: 'amber' }
    ],
    metricDetails: {
      resolved: [
        { name: 'Suporte Básico', value: 28, percentage: 35 },
        { name: 'Configuração', value: 22, percentage: 27 },
        { name: 'Billing', value: 18, percentage: 22 },
        { name: 'Outros', value: 13, percentage: 16 }
      ],
      unresolved: [
        { name: 'Escalado Nível 2', value: 3, percentage: 75 },
        { name: 'Aguardando Cliente', value: 1, percentage: 25 }
      ],
      retentions: [
        { name: 'Desconto Básico', value: 8, percentage: 53 },
        { name: 'Plano Adicional', value: 4, percentage: 27 },
        { name: 'Suporte Estendido', value: 3, percentage: 20 }
      ],
      upgrades: [
        { name: 'Plano Básico', value: 6, percentage: 67 },
        { name: 'Features Extras', value: 2, percentage: 22 },
        { name: 'Suporte Premium', value: 1, percentage: 11 }
      ]
    }
  },
  "carlos-rocha": {
    name: "Carlos Rocha",
    role: "Especialista Sênior",
    team: "Suporte Nível 3",
    startDate: "2020-01-15",
    avatar: "CR",
    metrics: {
      resolved: 91,
      unresolved: 4,
      retentions: 20,
      upgrades: 15,
      totalChats: 142,
      avgResponseTime: 2.1,
      customerSatisfaction: 4.9,
      firstCallResolution: 92
    },
    trends: {
      resolved: { value: 18.2, isPositive: true },
      unresolved: { value: -15.0, isPositive: true },
      retentions: { value: 22.5, isPositive: true },
      upgrades: { value: 35.0, isPositive: true },
      totalChats: { value: 12.1, isPositive: true },
      avgResponseTime: { value: -22.5, isPositive: true },
      customerSatisfaction: { value: 8.3, isPositive: true },
      firstCallResolution: { value: 12.6, isPositive: true }
    },
    weeklyPerformance: [
      { day: 'Seg', resolved: 20, unresolved: 1, chats: 28 },
      { day: 'Ter', resolved: 23, unresolved: 0, chats: 30 },
      { day: 'Qua', resolved: 18, unresolved: 1, chats: 25 },
      { day: 'Qui', resolved: 21, unresolved: 2, chats: 29 },
      { day: 'Sex', resolved: 19, unresolved: 0, chats: 26 },
      { day: 'Sáb', resolved: 0, unresolved: 0, chats: 0 },
      { day: 'Dom', resolved: 0, unresolved: 0, chats: 0 }
    ],
    monthlyHistory: [
      { month: 'Jan', resolved: 85, satisfaction: 4.7, responseTime: 2.5 },
      { month: 'Fev', resolved: 87, satisfaction: 4.8, responseTime: 2.3 },
      { month: 'Mar', resolved: 89, satisfaction: 4.8, responseTime: 2.2 },
      { month: 'Abr', resolved: 91, satisfaction: 4.9, responseTime: 2.1 }
    ],
    categoryDistribution: [
      { name: 'Casos Complexos', value: 38, color: '#3b82f6' },
      { name: 'Escalações', value: 31, color: '#6366f1' },
      { name: 'Integrações', value: 20, color: '#8b5cf6' },
      { name: 'Outros', value: 11, color: '#a855f7' }
    ],
    goals: {
      resolved: { current: 91, target: 88, label: 'Casos Resolvidos' },
      satisfaction: { current: 4.9, target: 4.6, label: 'Satisfação' },
      responseTime: { current: 2.1, target: 2.5, label: 'Tempo Resposta (min)' },
      firstCallResolution: { current: 92, target: 85, label: 'Resolução 1ª Chamada (%)' }
    },
    achievements: [
      { title: 'MVP do Mês', description: 'Melhor performance geral em Abril', icon: Award, color: 'emerald' },
      { title: 'Expert', description: 'Maior taxa de resolução da equipe', icon: Trophy, color: 'amber' },
      { title: 'Mentor', description: 'Líder em treinamento de novatos', icon: Users, color: 'indigo' },
      { title: 'Speed Master', description: 'Tempo de resposta mais rápido', icon: Zap, color: 'blue' }
    ],
    metricDetails: {
      resolved: [
        { name: 'Casos Complexos', value: 35, percentage: 38 },
        { name: 'Escalações', value: 28, percentage: 31 },
        { name: 'Integrações', value: 18, percentage: 20 },
        { name: 'Outros', value: 10, percentage: 11 }
      ],
      unresolved: [
        { name: 'Desenvolvimento', value: 3, percentage: 75 },
        { name: 'Terceiros', value: 1, percentage: 25 }
      ],
      retentions: [
        { name: 'Pacote Premium', value: 12, percentage: 60 },
        { name: 'Desconto Especial', value: 5, percentage: 25 },
        { name: 'Consultoria', value: 3, percentage: 15 }
      ],
      upgrades: [
        { name: 'Enterprise', value: 10, percentage: 67 },
        { name: 'Pro Plus', value: 3, percentage: 20 },
        { name: 'Custom', value: 2, percentage: 13 }
      ]
    }
  }
};

// Individual Metric Card Component
function IndividualMetricCard({ title, value, icon: Icon, trend, onClick, format = "number", suffix = "" }) {
  const formatValue = (val) => {
    if (format === "decimal") return val.toFixed(1);
    if (format === "time") return `${val}min`;
    return val.toLocaleString();
  };

  return (
    <div 
      onClick={onClick}
      className="group relative overflow-hidden bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-xl shadow-black/10 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 ring-1 ring-blue-400/30">
            <Icon className="w-6 h-6 text-blue-400" />
          </div>
          <div className="text-right">
            <div className={`flex items-center space-x-1 text-sm font-semibold ${
              trend.isPositive ? 'text-emerald-400' : 'text-red-400'
            }`}>
              <TrendingUp className={`w-4 h-4 ${trend.isPositive ? 'rotate-0' : 'rotate-180'}`} />
              <span>{trend.isPositive ? '+' : ''}{trend.value}%</span>
            </div>
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-semibold text-slate-400">{title}</p>
          <p className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            {formatValue(value)}{suffix}
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
    </div>
  );
}

// Goal Progress Card Component
function GoalProgressCard({ goal, isReversed = false }) {
  const percentage = isReversed 
    ? Math.min(100, ((goal.target - goal.current) / goal.target * 100) + 100)
    : Math.min(100, (goal.current / goal.target) * 100);
  
  const isAchieved = isReversed ? goal.current <= goal.target : goal.current >= goal.target;

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-xl shadow-black/10 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-300">{goal.label}</h3>
        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
          isAchieved ? 'bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-400/30' : 'bg-amber-500/20 text-amber-400 ring-1 ring-amber-400/30'
        }`}>
          {isAchieved ? 'Meta Atingida' : 'Em Progresso'}
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Atual: <span className="font-bold text-white">{goal.current}{typeof goal.current === 'number' && goal.current < 10 ? '' : ''}</span></span>
          <span className="text-slate-400">Meta: <span className="font-bold text-white">{goal.target}{typeof goal.target === 'number' && goal.target < 10 ? '' : ''}</span></span>
        </div>
        
        <div className="relative h-3 bg-slate-700/50 rounded-full overflow-hidden">
          <div
            className={`absolute inset-y-0 left-0 rounded-full shadow-lg transition-all duration-700 ${
              isAchieved 
                ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-emerald-500/50' 
                : 'bg-gradient-to-r from-amber-500 to-amber-600 shadow-amber-500/50'
            }`}
            style={{ width: `${Math.min(100, percentage)}%` }}
          />
        </div>
        
        <div className="text-center">
          <span className={`text-2xl font-bold ${isAchieved ? 'text-emerald-400' : 'text-amber-400'}`}>
            {Math.round(percentage)}%
          </span>
        </div>
      </div>
    </div>
  );
}

// Achievement Badge Component
function AchievementBadge({ achievement }) {
  const IconComp = achievement.icon;
  const colorClasses = {
    emerald: 'from-emerald-500/20 to-emerald-600/20 ring-emerald-400/30 text-emerald-400',
    blue: 'from-blue-500/20 to-blue-600/20 ring-blue-400/30 text-blue-400',
    amber: 'from-amber-500/20 to-amber-600/20 ring-amber-400/30 text-amber-400',
    indigo: 'from-indigo-500/20 to-indigo-600/20 ring-indigo-400/30 text-indigo-400'
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-xl shadow-black/10 p-6 group hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
      <div className="flex items-start space-x-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ring-1 ${colorClasses[achievement.color]}`}>
          <IconComp className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-1">
            {achievement.title}
          </h3>
          <p className="text-slate-400 text-sm">{achievement.description}</p>
        </div>
      </div>
    </div>
  );
}

// Chart Components
function WeeklyChart({ data }) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-xl shadow-black/10 p-6">
      <h3 className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-6">
        Performance Semanal
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="day" tick={{ fill: "#cbd5e1" }} />
          <YAxis tick={{ fill: "#cbd5e1" }} />
          <Tooltip
            contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: "0.5rem" }}
            itemStyle={{ color: "#fff" }}
          />
          <Bar dataKey="resolved" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Resolvidos" />
          <Bar dataKey="chats" fill="#6366f1" radius={[4, 4, 0, 0]} name="Total Chats" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function MonthlyTrendChart({ data }) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-xl shadow-black/10 p-6">
      <h3 className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-6">
        Tendência Mensal
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="month" tick={{ fill: "#cbd5e1" }} />
          <YAxis tick={{ fill: "#cbd5e1" }} />
          <Tooltip
            contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: "0.5rem" }}
            itemStyle={{ color: "#fff" }}
          />
          <Line type="monotone" dataKey="resolved" stroke="#3b82f6" strokeWidth={3} dot={{ fill: "#3b82f6", strokeWidth: 2, r: 6 }} name="Casos Resolvidos" />
          <Line type="monotone" dataKey="satisfaction" stroke="#10b981" strokeWidth={3} dot={{ fill: "#10b981", strokeWidth: 2, r: 6 }} name="Satisfação" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function CategoryPieChart({ data }) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-xl shadow-black/10 p-6">
      <h3 className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-6">
        Distribuição por Categoria
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: "0.5rem" }}
            itemStyle={{ color: "#fff" }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-2 gap-3 mt-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-sm text-slate-300">{item.name}: {item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- EmployeeSelector (portal + posicionamento) ---------- */
function EmployeeSelector({ selectedEmployeeId, onEmployeeChange, isAdmin }) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });

  if (!isAdmin) return null;

  const employeeList = Object.keys(allEmployees);
  const selectedEmployee = allEmployees[selectedEmployeeId];

  useEffect(() => {
    function updatePosition() {
      const el = buttonRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 8, // 8px de gap
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }

    if (isOpen) updatePosition();

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isOpen]);

  return (
    <>
      <div ref={buttonRef} className="relative z-40">
        <Button
          onClick={() => setIsOpen(v => !v)}
          variant="outline"
          className="w-64 justify-between bg-slate-800/50 border-slate-700/50 hover:bg-slate-700/50 text-white"
        >
          <div className="flex items-center space-x-2">
            <UserCheck className="w-4 h-4" />
            <span className="truncate">Visualizando: {selectedEmployee.name}</span>
          </div>
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </Button>
      </div>

      {isOpen && typeof document !== "undefined" && createPortal(
        <div
          style={{ top: position.top, left: position.left, width: position.width }}
          className="absolute z-[9999] bg-transparent pointer-events-none"
        >
          {/* wrapper para capturar cliques fora (pointer-events on inner) */}
          <div className="pointer-events-auto">
            <div className="bg-slate-800/95 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-2xl shadow-black/30 overflow-hidden">
              <div className="p-2 space-y-1">
                {employeeList.map((employeeId) => {
                  const employee = allEmployees[employeeId];
                  return (
                    <button
                      key={employeeId}
                      onClick={() => {
                        onEmployeeChange(employeeId);
                        setIsOpen(false);
                      }}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedEmployeeId === employeeId
                          ? 'bg-blue-500/20 text-blue-300'
                          : 'hover:bg-slate-700/50 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-indigo-500/20 ring-1 ring-blue-400/30 flex items-center justify-center">
                          <span className="text-sm font-bold text-blue-400">{employee.avatar}</span>
                        </div>
                        <div className="truncate">
                          <p className="font-medium truncate">{employee.name}</p>
                          <p className="text-xs text-slate-400 truncate">{employee.role}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

/* ---------- IndividualMetricDetailModal (portal) ---------- */
function IndividualMetricDetailModal({ isOpen, onClose, title, icon: Icon, totalValue, details }) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  if (typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-800/95 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-2xl shadow-black/30 w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 ring-1 ring-blue-400/30">
              <Icon className="w-6 h-6 text-blue-400" />
            </div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              {title}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-700/50 transition-colors">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 ring-1 ring-blue-400/20">
            <p className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              {totalValue}
            </p>
            <p className="text-sm text-slate-400 font-medium">Total</p>
          </div>

          <div className="space-y-3">
            {details.map((detail, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-slate-300">{detail.name}</span>
                  <span className="font-bold text-white">{detail.value} ({detail.percentage}%)</span>
                </div>
                <div className="relative h-2 bg-slate-700/50 rounded-full overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-700"
                    style={{ width: `${detail.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function IndividualDashboard() {
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(
    currentUser.type === "admin" ? currentUser.id : currentUser.id
  );

  // Get data for the selected employee
  const selectedEmployee = allEmployees[selectedEmployeeId];
  const isAdmin = currentUser.type === "admin";

  return (
    <div className="min-h-screen bg-background from-slate-900 via-slate-800 to-slate-900">
      <div className="p-6 space-y-8">
        {/* Header with Employee Info */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-2xl shadow-black/20 p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{selectedEmployee.avatar}</span>
                </div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full border-2 border-slate-800 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                </div>
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  {selectedEmployee.name}
                </h1>
                <p className="text-xl text-blue-400 font-semibold mt-1">{selectedEmployee.role}</p>
                <div className="flex items-center space-x-4 mt-3 text-slate-400">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{selectedEmployee.team}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Desde {new Date(selectedEmployee.startDate).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Activity className="w-4 h-4" />
                    <span className="text-sm">Última atualização: há 5 min</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Admin Controls */}
            {isAdmin && (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm">
                  <Shield className="w-4 h-4" />
                  <span>Admin</span>
                </div>
                <EmployeeSelector
                  selectedEmployeeId={selectedEmployeeId}
                  onEmployeeChange={setSelectedEmployeeId}
                  isAdmin={isAdmin}
                />
              </div>
            )}
          </div>
        </div>

        {/* Main Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <IndividualMetricCard
            title="Casos Resolvidos"
            value={selectedEmployee.metrics.resolved}
            icon={CheckCircle}
            trend={selectedEmployee.trends.resolved}
            onClick={() => setSelectedMetric('resolved')}
          />
          <IndividualMetricCard
            title="Casos Pendentes"
            value={selectedEmployee.metrics.unresolved}
            icon={Clock}
            trend={selectedEmployee.trends.unresolved}
            onClick={() => setSelectedMetric('unresolved')}
          />
          <IndividualMetricCard
            title="Retenções"
            value={selectedEmployee.metrics.retentions}
            icon={Target}
            trend={selectedEmployee.trends.retentions}
            onClick={() => setSelectedMetric('retentions')}
          />
          <IndividualMetricCard
            title="Upgrades"
            value={selectedEmployee.metrics.upgrades}
            icon={ArrowUpRight}
            trend={selectedEmployee.trends.upgrades}
            onClick={() => setSelectedMetric('upgrades')}
          />
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <IndividualMetricCard
            title="Total de Chats"
            value={selectedEmployee.metrics.totalChats}
            icon={MessageSquare}
            trend={selectedEmployee.trends.totalChats}
            onClick={() => {}}
          />
          <IndividualMetricCard
            title="Tempo Resposta"
            value={selectedEmployee.metrics.avgResponseTime}
            icon={Timer}
            trend={selectedEmployee.trends.avgResponseTime}
            format="time"
            onClick={() => {}}
          />
          <IndividualMetricCard
            title="Satisfação Cliente"
            value={selectedEmployee.metrics.customerSatisfaction}
            icon={Star}
            trend={selectedEmployee.trends.customerSatisfaction}
            format="decimal"
            suffix="/5"
            onClick={() => {}}
          />
          <IndividualMetricCard
            title="Resolução 1ª Chamada"
            value={selectedEmployee.metrics.firstCallResolution}
            icon={Zap}
            trend={selectedEmployee.trends.firstCallResolution}
            suffix="%"
            onClick={() => {}}
          />
        </div>

        {/* Goals Progress */}
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-6">
            Progresso das Metas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <GoalProgressCard goal={selectedEmployee.goals.resolved} />
            <GoalProgressCard goal={selectedEmployee.goals.satisfaction} />
            <GoalProgressCard goal={selectedEmployee.goals.responseTime} isReversed={true} />
            <GoalProgressCard goal={selectedEmployee.goals.firstCallResolution} />
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <WeeklyChart data={selectedEmployee.weeklyPerformance} />
          <MonthlyTrendChart data={selectedEmployee.monthlyHistory} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <CategoryPieChart data={selectedEmployee.categoryDistribution} />
          </div>
          <div className="lg:col-span-2">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-6">
                Conquistas & Reconhecimentos
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedEmployee.achievements.map((achievement, index) => (
                  <AchievementBadge key={index} achievement={achievement} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metric Detail Modal */}
      {selectedMetric && (
        <IndividualMetricDetailModal
          isOpen={!!selectedMetric}
          onClose={() => setSelectedMetric(null)}
          title={`Detalhes - ${selectedMetric === 'resolved' ? 'Casos Resolvidos' : 
                  selectedMetric === 'unresolved' ? 'Casos Pendentes' : 
                  selectedMetric === 'retentions' ? 'Retenções' : 'Upgrades'}`}
          icon={selectedMetric === 'resolved' ? CheckCircle : 
                selectedMetric === 'unresolved' ? Clock : 
                selectedMetric === 'retentions' ? Target : ArrowUpRight}
          totalValue={selectedMetric === 'resolved' ? selectedEmployee.metrics.resolved : 
                      selectedMetric === 'unresolved' ? selectedEmployee.metrics.unresolved : 
                      selectedMetric === 'retentions' ? selectedEmployee.metrics.retentions : selectedEmployee.metrics.upgrades}
          details={selectedEmployee.metricDetails[selectedMetric] || []}
        />
      )}
    </div>
  );
}