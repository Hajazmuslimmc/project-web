import { Template } from '@/types/website';
import CoachTemplate from './CoachTemplate';

export const TEMPLATES: Template[] = [
  {
    id: 'coach-pro',
    name: 'Coach Pro',
    preview: '/templates/coach-pro-preview.jpg',
    component: CoachTemplate,
  },
];

export function getTemplate(templateId: string): Template | null {
  return TEMPLATES.find(template => template.id === templateId) || null;
}

export function getDefaultTemplate(): Template {
  return TEMPLATES[0];
}