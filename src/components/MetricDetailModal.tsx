import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { LucideIcon } from "lucide-react";

interface MetricDetail {
  name: string;
  value: number;
  percentage: number;
}

interface MetricDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  icon: LucideIcon;
  totalValue: number;
  details: MetricDetail[];
}

export function MetricDetailModal({ 
  isOpen, 
  onClose, 
  title, 
  icon: Icon, 
  totalValue, 
  details 
}: MetricDetailModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon className="h-5 w-5 text-primary" />
            {title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-1">
              {totalValue.toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground">Total do mês</p>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Detalhamento por categoria:</h4>
            {details.map((detail, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-foreground">{detail.name}</span>
                  <span className="text-sm font-medium text-primary">
                    {detail.value} ({detail.percentage}%)
                  </span>
                </div>
                <Progress value={detail.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}