import type { LandingPageData } from "../models/landing-page";

// Load all development content files from src/developments
const developmentsGrid = import.meta.glob<any>('../developments/*.json', { eager: true });

export function getAllDevelopments(): LandingPageData[] {
  return Object.values(developmentsGrid).map((mod: any) => mod.default || mod);
}

export function getDevelopment(slug: string): LandingPageData | undefined {
  return getAllDevelopments().find(dev => dev.id === slug);
}
