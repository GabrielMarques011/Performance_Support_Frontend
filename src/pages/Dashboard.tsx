import { useState } from "react";
import { 
  CheckCircle, 
  XCircle, 
  TrendingUp, 
  ArrowUpRight, 
  MessageSquare,
  Star,
  Users,
  Eye,
  BarChart3,
  Activity,
  Zap,
  Target,
  Award,
  Clock,
  X
} from "lucide-react";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

// Mock data - in production this would come from your API
const monthlyMetrics = {
  resolved: 324,
  unresolved: 28,
  retentions: 45,
  upgrades: 23,
  totalChats: 892
};

const trends = {
  resolved: { value: 12.5, isPositive: true },
  unresolved: { value: -8.2, isPositive: true },
  retentions: { value: 18.7, isPositive: true },
  upgrades: { value: 5.3, isPositive: true },
  totalChats: { value: 15.2, isPositive: true }
};

const chartData = [
  { name: 'Jan', value: 245, previous: 220 },
  { name: 'Fev', value: 289, previous: 245 },
  { name: 'Mar', value: 312, previous: 289 },
  { name: 'Abr', value: 324, previous: 312 },
];

const teamPerformance = [
  { name: 'João Silva', value: 85 },
  { name: 'Maria Santos', value: 92 },
  { name: 'Pedro Costa', value: 78 },
  { name: 'Ana Lima', value: 88 },
  { name: 'Carlos Rocha', value: 95 },
];

// Mock data for metric details
const metricDetails = {
  resolved: [
    { name: 'Problemas de Lentidão', value: 120, percentage: 37 },
    { name: 'Sem Conexão', value: 85, percentage: 26 },
    { name: 'Configuração', value: 65, percentage: 20 },
    { name: 'Outros', value: 54, percentage: 17 }
  ],
  unresolved: [
    { name: 'Casos Complexos', value: 15, percentage: 54 },
    { name: 'Aguardando Cliente', value: 8, percentage: 29 },
    { name: 'Escalados', value: 5, percentage: 17 }
  ],
  retentions: [
    { name: 'Desconto Oferecido', value: 25, percentage: 56 },
    { name: 'Upgrade Gratuito', value: 12, percentage: 27 },
    { name: 'Suporte Premium', value: 8, percentage: 17 }
  ],
  upgrades: [
    { name: 'Plano Pro', value: 15, percentage: 65 },
    { name: 'Plano Enterprise', value: 5, percentage: 22 },
    { name: 'Add-ons', value: 3, percentage: 13 }
  ],
  totalChats: [
    { name: 'Suporte Técnico', value: 356, percentage: 40 },
    { name: 'Vendas', value: 267, percentage: 30 },
    { name: 'Retenção', value: 178, percentage: 20 },
    { name: 'Outros', value: 89, percentage: 10 }
  ]
};

// Mock data for employee details
const employeeStats = {
  'João Silva': { resolved: 81, unresolved: 4, retentions: 15, upgrades: 9 },
  'Maria Santos': { resolved: 89, unresolved: 3, retentions: 18, upgrades: 12 },
  'Pedro Costa': { resolved: 72, unresolved: 6, retentions: 14, upgrades: 8 },
  'Ana Lima': { resolved: 84, unresolved: 4, retentions: 16, upgrades: 10 },
  'Carlos Rocha': { resolved: 91, unresolved: 4, retentions: 20, upgrades: 15 }
};

// MetricCard Component
function MetricCard({ title, value, icon: Icon, trend, onClick }) {
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
            {value.toLocaleString()}
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
    </div>
  );
}

// PerformanceChart Component
function PerformanceChart({ title, data, type = "bar", onBarClick = undefined }) {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-xl shadow-black/10 p-6">
      <h3 className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-6">
        {title}
      </h3>

      {type === "column" ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="name" tick={{ fill: "#cbd5e1" }} />
            <YAxis tick={{ fill: "#cbd5e1" }} />
            <Tooltip
              contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: "0.5rem" }}
              itemStyle={{ color: "#fff" }}
            />
            <Bar
              dataKey="value"
              fill="url(#colorGradient)"
              radius={[6, 6, 0, 0]}
              onClick={(data) => onBarClick?.(data)}
            />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.9} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      ) : type === "line" ? (
        // mantém sua versão horizontal antiga
        <div className="space-y-4">
          {data.map((item) => (
            <div key={item.name} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-slate-300">{item.name}</span>
                <span className="font-bold text-white">{item.value}</span>
              </div>
              <div className="relative h-3 bg-slate-700/50 rounded-full overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-lg shadow-blue-500/50 transition-all duration-700"
                  style={{ width: `${(item.value / maxValue) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        // mantém versão horizontal "bar"
        <div className="space-y-3">
          {data.map((item) => (
            <div
              key={item.name}
              onClick={() => onBarClick?.(item)}
              className="group cursor-pointer p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-indigo-500/10 transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-slate-300 group-hover:text-blue-300 transition-colors">
                  {item.name}
                </span>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-white">{item.value}%</span>
                </div>
              </div>
              <div className="relative h-2 bg-slate-700/50 rounded-full overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-lg shadow-blue-500/50 transition-all duration-700 group-hover:shadow-blue-500/70"
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Modal Components
function MetricDetailModal({ isOpen, onClose, title, icon: Icon, totalValue, details }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
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
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-700/50 transition-colors"
          >
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
    </div>
  );
}

function EmployeeDetailModal({ isOpen, onClose, employeeName, stats }) {
  if (!isOpen) return null;

  const statItems = [
    { label: 'Casos Resolvidos', value: stats.resolved, icon: CheckCircle, color: 'emerald' },
    { label: 'Casos Pendentes', value: stats.unresolved, icon: Clock, color: 'amber' },
    { label: 'Retenções', value: stats.retentions, icon: Target, color: 'blue' },
    { label: 'Upgrades', value: stats.upgrades, icon: ArrowUpRight, color: 'indigo' }
  ];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800/95 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-2xl shadow-black/30 w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 ring-1 ring-blue-400/30">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              {employeeName}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-700/50 transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          {statItems.map((item, index) => {
            const IconComp = item.icon;
            return (
              <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-slate-700/30 to-slate-700/20 ring-1 ring-slate-600/30">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-br from-${item.color}-500/20 to-${item.color}-600/20 ring-1 ring-${item.color}-400/30`}>
                    <IconComp className={`w-5 h-5 text-${item.color}-400`} />
                  </div>
                  <span className="font-medium text-slate-300">{item.label}</span>
                </div>
                <span className="text-xl font-bold text-white">{item.value}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  return (
    <div className="min-h-screen bg-background from-slate-900 via-slate-800 to-slate-900">
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-2xl shadow-black/20 p-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Support Performance
              </h1>
              <p className="text-slate-400 text-lg mt-1">
                Dashboard Geral do Suporte - Abril 2024
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-slate-400">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50"></div>
              <span>Em tempo real</span>
            </div>
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4" />
              <span>Última atualização: há 2 min</span>
            </div>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <MetricCard
            title="Casos Solucionados"
            value={monthlyMetrics.resolved}
            icon={CheckCircle}
            trend={trends.resolved}
            onClick={() => setSelectedMetric('resolved')}
          />
          <MetricCard
            title="Casos Não Solucionados"
            value={monthlyMetrics.unresolved}
            icon={XCircle}
            trend={trends.unresolved}
            onClick={() => setSelectedMetric('unresolved')}
          />
          <MetricCard
            title="Retenções Feitas"
            value={monthlyMetrics.retentions}
            icon={TrendingUp}
            trend={trends.retentions}
            onClick={() => setSelectedMetric('retentions')}
          />
          <MetricCard
            title="Upgrades Realizados"
            value={monthlyMetrics.upgrades}
            icon={ArrowUpRight}
            trend={trends.upgrades}
            onClick={() => setSelectedMetric('upgrades')}
          />
          <MetricCard
            title="Total de Chats"
            value={monthlyMetrics.totalChats}
            icon={MessageSquare}
            trend={trends.totalChats}
            onClick={() => setSelectedMetric('totalChats')}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <PerformanceChart
          title="Evolução de Casos Resolvidos Mês a Mês"
          data={chartData}
          type="column"
        />
          <PerformanceChart
            title="Performance Individual da Equipe"
            data={teamPerformance}
            onBarClick={(data) => setSelectedEmployee(data.name)}
          />
        </div>

        {/* Additional Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/30 rounded-2xl shadow-xl shadow-emerald-500/10 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 ring-1 ring-emerald-400/30">
                <Award className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-emerald-400">Destaque do Mês</h3>
            </div>
            <p className="text-slate-300 font-medium">
              Carlos Rocha liderou em resoluções com 95% de taxa de sucesso
            </p>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/30 rounded-2xl shadow-xl shadow-blue-500/10 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 ring-1 ring-blue-400/30">
                <Target className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-blue-400">Meta Alcançada</h3>
            </div>
            <p className="text-slate-300 font-medium">
              324 casos resolvidos superaram a meta mensal de 300
            </p>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm border border-amber-500/30 rounded-2xl shadow-xl shadow-amber-500/10 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 ring-1 ring-amber-400/30">
                <Zap className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-amber-400">Atenção</h3>
            </div>
            <p className="text-slate-300 font-medium">
              28 casos pendentes precisam de acompanhamento
            </p>
          </div>
        </div>
      </div> {/* fecha p-6 space-y-8 */}

      {/* Metric Detail Modal */}
      {selectedMetric && (
        <MetricDetailModal
          isOpen={!!selectedMetric}
          onClose={() => setSelectedMetric(null)}
          title={`Detalhes - ${selectedMetric === 'resolved' ? 'Casos Solucionados' : 
                  selectedMetric === 'unresolved' ? 'Casos Não Solucionados' : 
                  selectedMetric === 'retentions' ? 'Retenções Feitas' : 
                  selectedMetric === 'upgrades' ? 'Upgrades Realizados' : 'Total de Chats'}`}
          icon={selectedMetric === 'resolved' ? CheckCircle : 
                selectedMetric === 'unresolved' ? XCircle : 
                selectedMetric === 'retentions' ? TrendingUp : 
                selectedMetric === 'upgrades' ? ArrowUpRight : MessageSquare}
          totalValue={selectedMetric === 'resolved' ? monthlyMetrics.resolved : 
                      selectedMetric === 'unresolved' ? monthlyMetrics.unresolved : 
                      selectedMetric === 'retentions' ? monthlyMetrics.retentions : 
                      selectedMetric === 'upgrades' ? monthlyMetrics.upgrades : monthlyMetrics.totalChats}
          details={metricDetails[selectedMetric] || []}
        />
      )}

      {/* Employee Detail Modal */}
      {selectedEmployee && employeeStats[selectedEmployee] && (
        <EmployeeDetailModal
          isOpen={!!selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
          employeeName={selectedEmployee}
          stats={employeeStats[selectedEmployee]}
        />
      )}
    </div> /* fecha min-h-screen */
  );
}
