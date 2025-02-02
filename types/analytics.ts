export interface EmailMetric {
  template: string;
  sent: number;
  opened: number;
  clicked: number;
  openRate: number;
}

export type EmailMetricsProps = {
  data: EmailMetric[];
};
