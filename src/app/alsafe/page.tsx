import type { Metadata } from 'next';
import AlSafeLanding from '@/components/AlSafeLanding';

export const metadata: Metadata = {
  title: 'AlSafe Browser Downloads | Networkak',
  description: 'Download AlSafe Browser from Networkak.com/alsafe and explore private browsing, secure search, and desktop release targets.',
  alternates: {
    canonical: 'https://networkak.com/alsafe',
  },
};

export default function AlSafePage() {
  return <AlSafeLanding />;
}
