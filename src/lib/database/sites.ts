import { SiteData } from '@/types/website';

// Simple localStorage-based database (replace with Supabase in production)
export class SiteDatabase {
  private static SITES_KEY = 'coachlaunch_sites';

  static getAllSites(): SiteData[] {
    if (typeof window === 'undefined') return [];
    const sites = localStorage.getItem(this.SITES_KEY);
    return sites ? JSON.parse(sites) : [];
  }

  static getSiteByUsername(username: string): SiteData | null {
    const sites = this.getAllSites();
    return sites.find(site => site.username === username) || null;
  }

  static saveSite(siteData: SiteData): void {
    const sites = this.getAllSites();
    const existingIndex = sites.findIndex(site => site.id === siteData.id);
    
    if (existingIndex >= 0) {
      sites[existingIndex] = { ...siteData, updatedAt: new Date() };
    } else {
      sites.push({ ...siteData, createdAt: new Date(), updatedAt: new Date() });
    }
    
    localStorage.setItem(this.SITES_KEY, JSON.stringify(sites));
  }

  static deleteSite(siteId: string): void {
    const sites = this.getAllSites();
    const filteredSites = sites.filter(site => site.id !== siteId);
    localStorage.setItem(this.SITES_KEY, JSON.stringify(filteredSites));
  }

  static getUserSites(userId: string): SiteData[] {
    const sites = this.getAllSites();
    return sites.filter(site => site.id.startsWith(userId));
  }
}