import { LucideIcon } from "lucide-react";

export interface ServiceFeature {
  id: string;
  text: string;
}

export interface Service {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  features: ServiceFeature[];
}
