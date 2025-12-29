export interface SiteData {
  id: string;
  username: string;
  template: string;
  content: {
    headline: string;
    about_text: string;
    service_1: string;
    service_2: string;
    service_3: string;
    cta_button: string;
    contact_email: string;
  };
  settings: {
    primaryColor: string;
    secondaryColor: string;
    font: string;
    logo?: string;
  };
  domain?: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Template {
  id: string;
  name: string;
  preview: string;
  component: React.ComponentType<{ data: SiteData }>;
}