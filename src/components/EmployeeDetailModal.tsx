import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, TrendingUp, ArrowUpRight } from "lucide-react";

interface EmployeeStats {
  resolved: number;
  unresolved: number;
  retentions: number;
  upgrades: number;
}

interface EmployeeDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  employeeName: string;
  stats: EmployeeStats;
}

export function EmployeeDetailModal({ 
  isOpen, 
  onClose, 
  employeeName, 
  stats 
}: EmployeeDetailModalProps) {
  const totalCases = stats.resolved + stats.unresolved;
  const resolutionRate = totalCases > 0 ? Math.round((stats.resolved / totalCases) * 100) : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Desempenho de {employeeName}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-1">
              {resolutionRate}%
            </div>
            <p className="text-sm text-muted-foreground">Taxa de resolução</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-success/10 border border-success/20">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-success" />
                <div>
                  <p className="font-medium text-foreground">Casos Solucionados</p>
                  <p className="text-sm text-muted-foreground">Total resolvido</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-success">{stats.resolved}</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-destructive/10 border border-destructive/20">
              <div className="flex items-center gap-3">
                <XCircle className="h-5 w-5 text-destructive" />
                <div>
                  <p className="font-medium text-foreground">Não Solucionados</p>
                  <p className="text-sm text-muted-foreground">Casos pendentes</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-destructive">{stats.unresolved}</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/20">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Retenções</p>
                  <p className="text-sm text-muted-foreground">Clientes retidos</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">{stats.retentions}</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-warning/10 border border-warning/20">
              <div className="flex items-center gap-3">
                <ArrowUpRight className="h-5 w-5 text-warning" />
                <div>
                  <p className="font-medium text-foreground">Upgrades</p>
                  <p className="text-sm text-muted-foreground">Vendas realizadas</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-warning">{stats.upgrades}</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Performance Geral</span>
              <span className="text-sm text-muted-foreground">{resolutionRate}%</span>
            </div>
            <Progress value={resolutionRate} className="h-3" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}