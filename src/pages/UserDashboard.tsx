import { 
  CheckCircle, 
  XCircle, 
  TrendingUp, 
  ArrowUpRight,
  MessageSquare,
  Target,
  Award,
  Clock
} from "lucide-react";
import { useState } from "react";
import { MetricCard } from "@/components/MetricCard";
import { PerformanceChart } from "@/components/PerformanceChart";
import { MetricDetailModal } from "@/components/MetricDetailModal";
import { useAuth } from "@/hooks/useAuth";

// Mock data specific to the logged-in user
const personalMetrics = {
  resolved: 89,
  unresolved: 6,
  retentions: 12,
  upgrades: 7,
  totalChats: 195
};

const personalTrends = {
  resolved: { value: 15.2, isPositive: true },
  unresolved: { value: -20.0, isPositive: true },
  retentions: { value: 25.0, isPositive: true },
  upgrades: { value: 12.5, isPositive: true },
  totalChats: { value: 8.7, isPositive: true }
};

const monthlyProgress = [
  { name: 'Sem 1', value: 18, previous: 15 },
  { name: 'Sem 2', value: 22, previous: 18 },
  { name: 'Sem 3', value: 25, previous: 22 },
  { name: 'Sem 4', value: 24, previous: 25 },
];

const categoryPerformance = [
  { name: 'Técnico', value: 95 },
  { name: 'Vendas', value: 88 },
  { name: 'Suporte', value: 92 },
  { name: 'Retenção', value: 78 },
];

// Mock data for personal metric details
const personalMetricDetails = {
  resolved: [
    { name: 'Problemas de Lentidão', value: 35, percentage: 39 },
    { name: 'Sem Conexão', value: 22, percentage: 25 },
    { name: 'Configuração', value: 18, percentage: 20 },
    { name: 'Outros', value: 14, percentage: 16 }
  ],
  unresolved: [
    { name: 'Casos Complexos', value: 3, percentage: 50 },
    { name: 'Aguardando Cliente', value: 2, percentage: 33 },
    { name: 'Escalados', value: 1, percentage: 17 }
  ],
  retentions: [
    { name: 'Desconto Oferecido', value: 7, percentage: 58 },
    { name: 'Upgrade Gratuito', value: 3, percentage: 25 },
    { name: 'Suporte Premium', value: 2, percentage: 17 }
  ],
  upgrades: [
    { name: 'Plano Pro', value: 5, percentage: 71 },
    { name: 'Plano Enterprise', value: 1, percentage: 14 },
    { name: 'Add-ons', value: 1, percentage: 15 }
  ]
};

export default function UserDashboard() {
  const { user } = useAuth();
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  
  const performanceScore = Math.round((personalMetrics.resolved / (personalMetrics.resolved + personalMetrics.unresolved)) * 100);
  
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="border-b border-border pb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Meu Desempenho - {user?.name}
        </h1>
        <p className="text-muted-foreground">
          Acompanhe suas métricas pessoais de desempenho - Abril 2024
        </p>
      </div>

      {/* Performance Score */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-1">
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-6 text-center">
            <Target className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-primary mb-1">{performanceScore}%</h3>
            <p className="text-sm text-muted-foreground">Score Geral</p>
          </div>
        </div>
        
        <div className="md:col-span-3 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Casos Resolvidos"
            value={personalMetrics.resolved}
            icon={CheckCircle}
            trend={personalTrends.resolved}
            onClick={() => setSelectedMetric('resolved')}
          />
          <MetricCard
            title="Casos Pendentes"
            value={personalMetrics.unresolved}
            icon={Clock}
            trend={personalTrends.unresolved}
            onClick={() => setSelectedMetric('unresolved')}
          />
          <MetricCard
            title="Retenções"
            value={personalMetrics.retentions}
            icon={TrendingUp}
            trend={personalTrends.retentions}
            onClick={() => setSelectedMetric('retentions')}
          />
          <MetricCard
            title="Upgrades"
            value={personalMetrics.upgrades}
            icon={ArrowUpRight}
            trend={personalTrends.upgrades}
            onClick={() => setSelectedMetric('upgrades')}
          />
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceChart
          title="Evolução Semanal de Casos"
          data={monthlyProgress}
          type="line"
        />
        <PerformanceChart
          title="Performance por Categoria"
          data={categoryPerformance}
          type="bar"
        />
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-r from-success/10 to-success/5 border border-success/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 text-success" />
            <h3 className="font-semibold text-success">Conquista do Mês</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Você superou sua meta mensal de 80 casos resolvidos!
          </p>
        </div>
        
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-primary">Total de Chats</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            {personalMetrics.totalChats} chats atendidos este mês (+{personalTrends.totalChats.value}%)
          </p>
        </div>
      </div>

      {/* Goals and Targets */}
      <div className="bg-gradient-to-r from-card to-secondary/20 border border-border/50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Metas do Próximo Mês</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">95</div>
            <p className="text-sm text-muted-foreground">Casos para resolver</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success mb-1">15</div>
            <p className="text-sm text-muted-foreground">Retenções alvo</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent mb-1">10</div>
            <p className="text-sm text-muted-foreground">Upgrades esperados</p>
          </div>
        </div>
      </div>

      {/* Metric Detail Modal */}
      {selectedMetric && (
        <MetricDetailModal
          isOpen={!!selectedMetric}
          onClose={() => setSelectedMetric(null)}
          title={
            selectedMetric === 'resolved' ? 'Casos Resolvidos' :
            selectedMetric === 'unresolved' ? 'Casos Pendentes' :
            selectedMetric === 'retentions' ? 'Retenções' :
            'Upgrades'
          }
          icon={
            selectedMetric === 'resolved' ? CheckCircle :
            selectedMetric === 'unresolved' ? Clock :
            selectedMetric === 'retentions' ? TrendingUp :
            ArrowUpRight
          }
          totalValue={
            selectedMetric === 'resolved' ? personalMetrics.resolved :
            selectedMetric === 'unresolved' ? personalMetrics.unresolved :
            selectedMetric === 'retentions' ? personalMetrics.retentions :
            personalMetrics.upgrades
          }
          details={personalMetricDetails[selectedMetric as keyof typeof personalMetricDetails]}
        />
      )}
    </div>
  );
}