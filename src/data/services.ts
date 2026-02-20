import { Wrench, Shield, Package, Clock, Phone, Settings } from "lucide-react";
import { Service } from "@/types/service";

export const servicesData: Service[] = [
  {
    id: "repair-maintenance",
    icon: Wrench,
    title: "Repair & Maintenance",
    description:
      "Expert repair services for all types of agricultural equipment and machinery",
    features: [
      { id: "on-site-workshop", text: "On-site and workshop repairs" },
      { id: "skilled-tech", text: "Skilled technicians" },
      { id: "quick-turnaround", text: "Quick turnaround time" },
      { id: "preventive-maintenance", text: "Preventive maintenance" },
    ],
  },
  {
    id: "warranty-support",
    icon: Shield,
    title: "Warranty Support",
    description:
      "Comprehensive warranty coverage on all products with dedicated support",
    features: [
      { id: "manufacturer-warranty", text: "Manufacturer warranty" },
      { id: "extended-warranty", text: "Extended warranty options" },
      { id: "hassle-claims", text: "Hassle-free claims" },
      { id: "replacement", text: "Replacement support" },
    ],
  },
  {
    id: "spare-parts",
    icon: Package,
    title: "Genuine Spare Parts",
    description: "Wide range of authentic spare parts for all major brands",
    features: [
      { id: "oem-quality", text: "OEM quality parts" },
      { id: "competitive-pricing", text: "Competitive pricing" },
      { id: "quick-availability", text: "Quick availability" },
      { id: "bulk-ordering", text: "Bulk ordering options" },
    ],
  },
  {
    id: "annual-maintenance",
    icon: Clock,
    title: "Annual Maintenance",
    description:
      "Regular servicing contracts to keep your equipment running smoothly",
    features: [
      { id: "scheduled-maintenance", text: "Scheduled maintenance" },
      { id: "priority-service", text: "Priority service" },
      { id: "cost-effective", text: "Cost-effective plans" },
      { id: "performance-optimization", text: "Performance optimization" },
    ],
  },
  {
    id: "field-support",
    icon: Phone,
    title: "24/7 Field Support",
    description:
      "Round-the-clock support for field operations and equipment issues",
    features: [
      { id: "always-available", text: "Available 24/7 for emergency support" },
      { id: "field-experts", text: "Experienced field technicians" },
      { id: "quick-response", text: "Rapid response to field emergencies" },
      { id: "equipment-troubleshooting", text: "On-site equipment troubleshooting" },
    ],
  },
  {
    id: "installation-setup",
    icon: Settings,
    title: "Equipment Installation & Setup",
    description:
      "Professional installation and setup services for new agricultural equipment",
    features: [
      { id: "professional-install", text: "Professional installation" },
      { id: "equipment-testing", text: "Equipment testing & calibration" },
      { id: "operator-training", text: "Basic operator training" },
      { id: "safety-checks", text: "Safety checks & verification" },
    ],
  },
];
