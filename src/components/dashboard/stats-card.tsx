
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isUpward: boolean;
  };
}

export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
}: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
        {trend && (
          <div className="flex items-center pt-1">
            <span
              className={
                trend.isUpward
                  ? "text-emerald-500 text-xs"
                  : "text-rose-500 text-xs"
              }
            >
              {trend.isUpward ? "+" : "-"}
              {trend.value}%
            </span>
            <span className="text-xs text-muted-foreground ml-1">
              em relação ao mês anterior
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
